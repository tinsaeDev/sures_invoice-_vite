import {
  Add,
  Anchor,
  Close,
  Delete,
  Home,
  Language,
  QrCode,
  Save,
} from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  Slide,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import {
  createRef,
  forwardRef,
  useCallback,
  useContext,
  useState,
} from "react";
import AdvTextField from "../components/AdvTestField";
import InvoiceTable from "./InvoiceTable";

import { currencies } from "../currencies";
import { FormattedNumber } from "react-intl";
import NumericFormatCustom from "../../../components/NumericFormatCustom";
import { Link, useParams } from "react-router-dom";
import { TransitionProps } from "@mui/material/transitions";
import { AlertContext } from "../components/Alert";
import GenerateButton from "./GenerateButton";
import ImageSelector from "./ImageSelector";

export default function InvoiceForm() {
  // const initialValues: Invoice =

  // Shipping fee
  const [hasDiscount, setHasDiscount] = useState(false);
  const [hasShippingFee, setHasShippingFee] = useState(false);
  const [hasTax, setHasTax] = useState(false);

  const [hasLink, setHasLink] = useState(false);
  const [hasQR, setHasQR] = useState(false);

  const { id } = useParams();
  const invoices: Invoice[] = JSON.parse(
    localStorage.getItem("invoices") || "[]"
  );

  let invoice: Invoice | undefined = undefined;

  if (id) {
    invoice = invoices.find((inv) => {
      return inv.id == Number.parseInt(id);
    });
  }

  const [savingData, setSavingData] = useState(false);
  const formikRef = createRef<FormikProps<Invoice>>();

  const [showTemplateSaveDialog, setShowTemplateSaveDialog] = useState(false);

  const saveData = useCallback(
    function () {
      if (!formikRef.current || !id) {
        alert("Formk is not found ");
        return;
      }
      setSavingData(true);

      const invoices: Invoice[] = JSON.parse(
        localStorage.getItem("invoices") || "[]"
      );
      invoices.splice(
        invoices.findIndex((inv) => inv.id == Number.parseInt(id)),
        1,
        formikRef.current.values
      );

      localStorage.setItem("invoices", JSON.stringify(invoices));

      setTimeout(function () {
        setSavingData(false);
      }, 1000);
    },
    [formikRef, id]
  );

  const alertContext = useContext(AlertContext);



  const clients:Client[] = [

  ];
  return (
    <Container maxWidth="xl">
      <Toolbar color="">
        <Link to="/">
          <IconButton>
            <Home color="primary" />
          </IconButton>
        </Link>
        <IconButton
          disabled={savingData}
          onClick={() => {
            saveData();

            if (alertContext) {
              alertContext.showAlert({
                message: "Invoice has been saved locally!",
                title: "Invoice Saved",
                severity: "info",
              });
            }
          }}
        >
          <Save color="primary" />
        </IconButton>
      </Toolbar>
      {!invoice ? (
        <Typography>Not Found</Typography>
      ) : (
        <Formik
          innerRef={formikRef}
          onSubmit={(values) => {
            console.log(values);
          }}
          initialValues={invoice}
        >
          {function (formik) {
            const {
              handleBlur,
              handleChange,
              setFieldValue,
              values,
              errors,
              touched,
            } = formik;

            const subTotal: number = values.items
              .map((p) => p.qty * p.rate)
              .reduce((p, c) => {
                return p + c;
              });

            const taxAmount = subTotal * (values.tax_rate / 100);

            const discountAmount =
              (subTotal + taxAmount) * (values.discount / 100);
            const total =
              subTotal + taxAmount - discountAmount + values.shipping;
            const balanceDue = total - values.amount_paid;

            return (
              <Form>
                <Stack direction="row" spacing={2}>
                  <Paper sx={{ p: 2 }}>
                    {/* Invoice Header */}
                    <Stack direction="row" justifyContent="space-between">
                      {/* RIght Header*/}

                      <Stack spacing={2}>
                        <ImageSelector
                          value={values.logo}
                          onChange={(value) => {
                            setFieldValue("logo", value);
                          }}
                          placeholder="Company Logo"
                          height="100px"
                          width="auto"
                        />

                        <TextField
                          size="small"
                          name="invoice_from"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.invoice_from}
                          label="From"
                          error={Boolean(
                            errors.invoice_from && touched.invoice_from
                          )}
                          placeholder="Invoice From"
                        />
                        <Stack direction="row" spacing={2}>
                          <Stack>
                            <AdvTextField
                              size="small"
                              inputProps={{
                                style: {
                                  textAlign: "left",
                                },
                              }}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.BILL_TO}
                            />

                            <Autocomplete
                              id="free-solo-demo"
                              freeSolo
                              options={["A","B"]}
                              renderInput={(params) => (
                                <TextField {...params} label="freeSolo" />
                              )}
                            />

                            <TextField
                              name="bill_to"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.bill_to}
                              size="small"
                              error={Boolean(errors.bill_to && touched.bill_to)}
                            />
                          </Stack>

                          {true && (
                            <Stack>
                              <AdvTextField
                                size="small"
                                value={values.SHIPPED_TO}
                                inputProps={{
                                  style: {
                                    textAlign: "left",
                                  },
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <TextField
                                name="shipped_to"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.shipped_to}
                                size="small"
                                error={Boolean(
                                  errors.shipped_to && touched.shipped_to
                                )}
                              />
                            </Stack>
                          )}
                        </Stack>
                      </Stack>
                      {/* Left Header */}

                      <Stack spacing={3}>
                        {/* TItle and Number */}
                        <Stack alignItems="flex-end">
                          <AdvTextField
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.INVOICE}
                            inputProps={{
                              style: {
                                fontSize: "40px",
                              },
                            }}
                          />

                          <Stack direction="row" alignItems="center">
                            <TextField
                              name="id"
                              sx={{
                                mawidth: "min-content",
                                width: "10rem",
                              }}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.id}
                              size="small"
                              error={Boolean(errors.id && touched.id)}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    #
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Stack>
                        </Stack>

                        {/* Fields */}
                        <Stack spacing={0.5}>
                          <Stack direction="row" alignItems="center">
                            <AdvTextField
                              fullWidth
                              value={values.DATE_PREPARED}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <TextField
                              fullWidth
                              type="date"
                              name="date_prepared"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.date_prepared}
                              size="small"
                              error={Boolean(
                                errors.date_prepared && touched.date_prepared
                              )}
                            />
                          </Stack>

                          {/* Fields */}
                          <Stack direction="row" alignItems="center">
                            <AdvTextField
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                              value={values.PAYMENT_TERMS}
                            />

                            <TextField
                              fullWidth
                              name="payment_terms"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.payment_terms}
                              size="small"
                              error={Boolean(
                                errors.payment_terms && touched.payment_terms
                              )}
                              type="number"
                            />
                          </Stack>

                          {/* Fields */}
                          <Stack direction="row" alignItems="center">
                            <AdvTextField
                              fullWidth
                              value={values.DUE_DATE}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <TextField
                              fullWidth
                              type="date"
                              name="due_date"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.due_date}
                              size="small"
                              error={Boolean(
                                errors.due_date && touched.due_date
                              )}
                            />
                          </Stack>

                          {/* Fields */}
                          <Stack direction="row" alignItems="center">
                            <AdvTextField
                              fullWidth
                              onChange={handleChange}
                              onBlur={handleBlur}
                              defaultValue={values.PO}
                            />
                            <TextField
                              fullWidth
                              name="po"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.po}
                              size="small"
                              error={Boolean(errors.po && touched.po)}
                            />
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>

                    {/* Invoice Body */}

                    <InvoiceTable formik={formik} />
                    {/* Invoice Footer */}

                    <Stack
                      mt={2}
                      direction="row"
                      justifyContent="space-between"
                      spacing={1}
                    >
                      <Stack flexGrow={1} spacing={2}>
                        {/* Note */}
                        <Stack>
                          <AdvTextField
                            inputProps={{ style: { textAlign: "left" } }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            defaultValue={values.NOTE}
                          />
                          <TextField
                            fullWidth
                            multiline
                            rows={5}
                            name="note"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.note}
                            size="small"
                            error={Boolean(errors.note && touched.note)}
                            placeholder="Any relevant information not already coverted"
                          />
                        </Stack>

                        {/* Link and QR Cide */}
                        <Stack flexGrow={1} spacing={1}>
                          {/* lINK */}

                          {hasLink && (
                            <Stack spacing={0.5}>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <AdvTextField
                                  inputProps={{ style: { textAlign: "left" } }}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  defaultValue={values.LINK}
                                  name="LINK"
                                />

                                <IconButton color="warning">
                                  <Delete
                                    onClick={() => {
                                      setHasLink(false);
                                      setFieldValue("link", "");
                                    }}
                                  />
                                </IconButton>
                              </Stack>

                              <TextField
                                fullWidth
                                name="link"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.link}
                                size="small"
                                error={Boolean(errors.link && touched.link)}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Language />
                                    </InputAdornment>
                                  ),
                                }}
                                placeholder="Custom link to this invoice"
                              />
                            </Stack>
                          )}

                          {/* QR */}

                          {hasQR && (
                            <Stack spacing={0.5}>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                              >
                                <AdvTextField
                                  inputProps={{ style: { textAlign: "left" } }}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  defaultValue={values.QR}
                                  name="QR"
                                />

                                <IconButton
                                  color="warning"
                                  onClick={() => {
                                    setHasQR(false);
                                    setFieldValue("qr", null);
                                  }}
                                >
                                  <Delete />
                                </IconButton>
                              </Stack>

                              <ImageSelector
                                value={values.qr}
                                onChange={(value) => {
                                  setFieldValue("qr", value);
                                }}
                                placeholder="Add QR Code "
                                height="100px"
                                width="auto"
                              />
                            </Stack>
                          )}

                          {/* QR and Link Controlls */}
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            {!hasLink && (
                              <Button
                                startIcon={<Anchor />}
                                onClick={() => {
                                  setFieldValue("link", "");
                                  setHasLink(true);
                                }}
                              >
                                Add Link
                              </Button>
                            )}

                            {!hasQR && (
                              <Button
                                startIcon={<QrCode />}
                                onClick={() => {
                                  setFieldValue("qr", null);
                                  setHasQR(true);
                                }}
                              >
                                Add QR Code
                              </Button>
                            )}
                          </Stack>
                        </Stack>

                        {/* Terms */}

                        <Stack>
                          <AdvTextField
                            inputProps={{ style: { textAlign: "left" } }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            defaultValue={values.TERMS}
                          />
                          <TextField
                            fullWidth
                            multiline
                            rows={5}
                            name="terms"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.terms}
                            size="small"
                            error={Boolean(errors.terms && touched.terms)}
                            placeholder="Terms and conditions- late fee, paymet methods"
                          />
                        </Stack>
                      </Stack>

                      <Stack spacing={0.5} alignItems="flex-end">
                        <table>
                          <tbody>
                            {/* Sub TOtal */}
                            <tr>
                              <td>
                                <AdvTextField
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </td>
                              <td>
                                <Typography textAlign="right" fontWeight="bold">
                                  <FormattedNumber
                                    value={subTotal}
                                    style="currency"
                                    currency={values.currency_code}
                                  />
                                </Typography>
                              </td>
                            </tr>

                            {/* Discount */}

                            {hasDiscount && (
                              <tr>
                                <td>
                                  <AdvTextField
                                    defaultValue={values.DISCOUNT}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </td>
                                <td>
                                  <TextField
                                    name="discount"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.discount}
                                    size="small"
                                    error={Boolean(
                                      errors.discount && touched.discount
                                    )}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          %
                                        </InputAdornment>
                                      ),
                                    }}
                                    inputProps={{
                                      style: {
                                        textAlign: "right",
                                      },
                                    }}
                                  />
                                </td>
                                <td>
                                  <IconButton
                                    onClick={() => {
                                      setFieldValue("discount", 0);
                                      setHasDiscount(false);
                                    }}
                                    size="small"
                                  >
                                    <Close />
                                  </IconButton>
                                </td>
                              </tr>
                            )}

                            {/* Shipping */}

                            {hasShippingFee && (
                              <tr>
                                <td>
                                  <AdvTextField
                                    defaultValue={values.SHIPPING}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </td>
                                <td>
                                  <TextField
                                    size="small"
                                    name="shipping"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.shipping}
                                    error={Boolean(
                                      errors.shipping && touched.shipping
                                    )}
                                    InputProps={{
                                      inputComponent:
                                        NumericFormatCustom as any,

                                      startAdornment: (
                                        <InputAdornment position="start">
                                          {currencies.find((c) => {
                                            return (
                                              c.code == values.currency_code
                                            );
                                          })?.symboll || "NC"}
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </td>

                                <td>
                                  <IconButton
                                    onClick={() => {
                                      setFieldValue("shipping", 0);
                                      setHasShippingFee(false);
                                    }}
                                    size="small"
                                  >
                                    <Close />
                                  </IconButton>
                                </td>
                              </tr>
                            )}

                            {/* Tax Rate */}
                            {hasTax && (
                              <tr>
                                <td>
                                  <AdvTextField
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </td>
                                <td>
                                  <TextField
                                    size="small"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.tax_rate}
                                    name="tax_rate"
                                    error={Boolean(
                                      errors.tax_rate && touched.tax_rate
                                    )}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          %
                                        </InputAdornment>
                                      ),
                                    }}
                                    inputProps={{
                                      /// <reference path="" />

                                      style: {
                                        textAlign: "right",
                                      },
                                    }}
                                  />
                                </td>

                                <td>
                                  <IconButton
                                    onClick={() => {
                                      setFieldValue("tax_rate", 0);
                                      setHasTax(false);
                                    }}
                                    size="small"
                                  >
                                    <Close />
                                  </IconButton>
                                </td>
                              </tr>
                            )}

                            {/* Optional Field Controlls */}

                            <tr>
                              <td colSpan={2} align="right">
                                {/* Discount */}
                                {!hasDiscount && (
                                  <Button
                                    size="small"
                                    startIcon={<Add />}
                                    onClick={() => {
                                      setFieldValue("discount", 0);
                                      setHasDiscount(true);
                                    }}
                                  >
                                    Discount
                                  </Button>
                                )}
                                {/* Shipping */}
                                {!hasShippingFee && (
                                  <Button
                                    size="small"
                                    startIcon={<Add />}
                                    onClick={() => {
                                      setFieldValue("shipping", 0);
                                      setHasShippingFee(true);
                                    }}
                                  >
                                    Shipping
                                  </Button>
                                )}

                                {/* Tax */}
                                {!hasTax && (
                                  <Button
                                    size="small"
                                    startIcon={<Add />}
                                    onClick={() => {
                                      setFieldValue("tax_rate", 0);
                                      setHasTax(true);
                                    }}
                                  >
                                    Tax
                                  </Button>
                                )}
                              </td>
                            </tr>

                            {/* Total */}
                            <tr>
                              <td>
                                <AdvTextField
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  style={{
                                    fontWeight: "normal",
                                  }}
                                />
                              </td>
                              <td>
                                <Typography textAlign="right">
                                  <FormattedNumber
                                    value={total}
                                    style="currency"
                                    currency={values.currency_code}
                                  />
                                </Typography>
                              </td>
                            </tr>

                            {/* Amount Paid */}
                            <tr>
                              <td>
                                <AdvTextField
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  style={{
                                    fontWeight: "normal",
                                  }}
                                  defaultValue={values.AMOUNT_PAID}
                                />
                              </td>
                              <td>
                                <TextField
                                  size="small"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.amount_paid}
                                  name="amount_paid"
                                  error={Boolean(
                                    errors.amount_paid && touched.amount_paid
                                  )}
                                  InputProps={{
                                    inputComponent: NumericFormatCustom as any,

                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {currencies.find((c) => {
                                          return c.code == values.currency_code;
                                        })?.symboll || "NC"}
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </td>
                            </tr>

                            {/* Balce De */}
                            <tr>
                              <td>
                                <AdvTextField
                                  defaultValue={values.BALANCE_DUE}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </td>
                              <td>
                                <Typography textAlign="right" fontWeight="bold">
                                  <FormattedNumber
                                    value={balanceDue}
                                    style="currency"
                                    currency={values.currency_code}
                                  />
                                </Typography>
                              </td>
                              <td
                                style={{
                                  visibility: "hidden",
                                }}
                              >
                                <IconButton size="small">
                                  <Close />
                                </IconButton>
                              </td>
                            </tr>

                            {/* Signature */}
                            <tr>
                              <td colSpan={3}>
                                <Stack
                                  alignItems={"flex-end"}
                                  sx={
                                    {
                                      // background:"red"
                                    }
                                  }
                                >
                                  <AdvTextField
                                    defaultValue={values.SIGNATURE}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{
                                      style: {
                                        fontWeight: "bold",
                                        textAlign: "center",
                                      },
                                    }}
                                  />

                                  <ImageSelector
                                    onChange={(value) => {
                                      setFieldValue("signature", value);
                                    }}
                                    value={values.signature}
                                    placeholder="Select Signature"
                                    height="100px"
                                    width="auto"
                                  />
                                </Stack>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Stack>
                    </Stack>
                  </Paper>

                  <Paper>
                    <Stack p={2} spacing={2}>
                      <GenerateButton formik={formik} />

                      <Divider />

                      {/* Curremcy */}
                      <FormControl>
                        <Autocomplete
                          disablePortal
                          size="small"
                          options={currencies.map((c) => c.code)}
                          getOptionLabel={(option) => {
                            const i = currencies.find((c) => c.code == option);
                            if (!i) {
                              return "Not FOumd";
                              throw Error();
                            }

                            return i.name;
                          }}
                          sx={{ width: 300 }}
                          value={values.currency_code}
                          onChange={(_e, value) => {
                            setFieldValue("currency_code", value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              name="currency_code"
                              {...params}
                              label="Currency"
                            />
                          )}
                        />
                      </FormControl>

                      {/* Save as default */}
                      <FormControl>
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            setShowTemplateSaveDialog(true);
                          }}
                        >
                          Save Templete
                        </Button>
                      </FormControl>
                    </Stack>
                  </Paper>
                </Stack>

                <SaveTemplateDialog
                  onClose={() => {
                    setShowTemplateSaveDialog(false);
                  }}
                  open={showTemplateSaveDialog}
                  onYes={() => {
                    saveData();
                    const template: Template = {
                      AMOUNT_PAID: values.AMOUNT_PAID,
                      BALANCE_DUE: values.BALANCE_DUE,
                      BILL_TO: values.BILL_TO,

                      DATE_PREPARED: values.DATE_PREPARED,
                      DISCOUNT: values.DISCOUNT,
                      DUE_DATE: values.DUE_DATE,
                      INVOICE: values.INVOICE,

                      logo: values.logo,

                      SIGNATURE: values.SIGNATURE,
                      signature: values.signature,
                      NOTE: values.NOTE,
                      LINK: values.LINK,
                      QR: values.QR,
                      TERMS: values.TERMS,

                      PAYMENT_TERMS: values.PAYMENT_TERMS,
                      PO: values.PO,

                      SHIPPED_TO: values.SHIPPED_TO,
                      SHIPPING: values.SHIPPING,
                      SUB_TOTAL: values.SUB_TOTAL,
                      TABLE_AMOUNT: values.TABLE_AMOUNT,
                      TABLE_ITEM: values.TABLE_ITEM,
                      TABLE_QTY: values.TABLE_QTY,
                      TABLE_RATE: values.TABLE_RATE,
                      TAX_RATE: values.TAX_RATE,
                      TOTAL: values.TOTAL,

                      // Global Values
                      terms: values.terms,
                      currency_code: values.currency_code,
                      tax_rate: values.tax_rate,
                      note: values.note,
                      invoice_from: values.invoice_from,
                    };

                    localStorage.setItem("template", JSON.stringify(template));
                    setShowTemplateSaveDialog(false);

                    if (alertContext) {
                      alertContext.showAlert({
                        message: "Template Saved",
                        title: "Saved",
                        severity: "success",
                      });
                    }
                  }}
                />
              </Form>
            );
          }}
        </Formik>
      )}
    </Container>
  );
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SaveTemplateDialog(props: {
  onClose: () => void;
  open: boolean;
  onYes: () => void;
}) {
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Save as Default Template?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Save the current values as the default values? new Invoices will
          inherit the saved template values.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button size="small" onClick={props.onClose}>
          No
        </Button>
        <Button
          startIcon={<Save />}
          size="small"
          color="primary"
          variant="contained"
          onClick={props.onYes}
        >
          Save Template
        </Button>
      </DialogActions>
    </Dialog>
  );
}
