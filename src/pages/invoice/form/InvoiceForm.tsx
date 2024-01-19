import { Add, Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Divider,
  Fab,
  FormControl,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useRef } from "react";
import AdvTextField from "../components/AdvTestField";
import InvoiceTable from "./InvoiceTable";

import { currencies } from "../currencies";
import { FormattedNumber } from "react-intl";

export default function InvoiceForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialValues: Invoice & TemplateLabels = {
    // Label Keys

    INVOICE: "Invoiceee",
    BILL_TO: "Bill to",
    SHIPPED_TO: "Shipped to",

    //

    DATE_PREPARED: "Date",
    PAYMENT_TERMS: "Payment Terms",
    DUE_DATE: "Due Date",
    PO: "PO",

    // Table

    TABLE_ITEM: "Item",
    TABLE_QTY: "Quantity",
    TABLE_RATE: "Rate",
    TABLE_AMOUNT: "Amount",

    // Footer

    NOTE: "Note",
    TERMS: "Terms",

    // Total

    SUB_TOTAL: "Sub Total",
    DISCOUNT: "Discount",
    SHIPPING: "Shipping",
    TAX_RATE: "Tax rate",
    TOTAL: "Total",
    AMOUNT_PAID: "Amount Paid",
    BALANCE_DUE: "Balance Due",

    /**
     * VALUES
     */

    //
    id: "INV_001",
    currency_code: "INR",
    logo: null,
    invoice_from: "L nad H",
    bill_to: "Ae Keber",
    shipped_to: "Shipped to",

    date_prepared: "Date",
    payment_terms: "Payment Terms",
    due_date: "Due Date",
    po: "PO",

    // Table

    items: [
      {
        description: "",
        qty: 1,
        rate: 0,
      },
    ],
    // Footer

    note: "Note",
    terms: "Terms",

    // Total

    discount: 0,
    shipping: 0,
    tax_rate: 10,
    amount_paid: 0,
  };
  return (
    <Container maxWidth="xl">
      <Formik
        onSubmit={(values) => {
          console.log(values);
        }}
        initialValues={initialValues}
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
          const total = subTotal + taxAmount - discountAmount + values.shipping;
          const balanceDue = total - values.amount_paid;

          return (
            <Stack direction="row" spacing={2}>
              <Paper sx={{ p: 2 }}>
                {/* Invoice Header */}
                <Stack direction="row" justifyContent="space-between">
                  {/* RIght Header*/}

                  <Stack spacing={2}>
                    <Box
                      sx={{
                        height: "10rem",
                        width: "10rem",
                        border: "solid 1px",
                        position: "relative",
                        // background: "orange",
                      }}
                    >
                      <input
                        hidden
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        name="logo"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          setFieldValue("logo", file);
                        }}
                      />

                      {values.logo ? (
                        <Box>
                          <img
                            style={{
                              height: "100%",
                              width: "100%",
                              position: "absolute",
                              top: 0,
                              left: 0,
                            }}
                            src={
                              values.logo instanceof Blob
                                ? URL.createObjectURL(values.logo)
                                : values.logo.url
                            }
                          />

                          <Fab
                            onClick={() => {
                              setFieldValue("logo", null);
                            }}
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                            }}
                          >
                            <Close color="error" />
                          </Fab>
                        </Box>
                      ) : (
                        <Button
                          onClick={() => {
                            if (!fileInputRef.current) return;
                            fileInputRef.current?.click();
                          }}
                          sx={{
                            height: "100%",
                            width: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                          }}
                          startIcon={<Add />}
                        >
                          Add Photo
                        </Button>
                      )}
                    </Box>

                    <TextField
                      size="small"
                      name="invoice_from"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.invoice_from}
                      label="Bill To(*)"
                      error={Boolean(
                        errors.invoice_from && touched.invoice_from
                      )}
                      placeholder="Invoice From"
                    />
                    <Stack direction="row" spacing={2}>
                      <Stack>
                        <AdvTextField
                          size="small"
                          templateLable="BILL_TO"
                          inputProps={{
                            style: {
                              textAlign: "left",
                            },
                          }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <TextField
                          name="bill_to"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.bill_to}
                          size="small"
                          label="Bill To(*)"
                          error={Boolean(errors.bill_to && touched.bill_to)}
                        />
                      </Stack>

                      <Stack>
                        <AdvTextField
                          size="small"
                          templateLable="SHIPPED_TO"
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
                          label="Shipped to"
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                  {/* Left Header */}

                  <Stack spacing={0.5}>
                    <AdvTextField
                      templateLable="INVOICE"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{
                        style: {
                          fontSize: "40px",
                        },
                      }}
                      sx={{}}
                    />

                    {/* Fields */}
                    <Stack direction="row" alignItems="center">
                      <AdvTextField
                        fullWidth
                        templateLable="DATE_PREPARED"
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
                        templateLable="PAYMENT_TERMS"
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
                        templateLable="DUE_DATE"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <TextField
                        fullWidth
                        name="due_date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.due_date}
                        size="small"
                        error={Boolean(errors.due_date && touched.due_date)}
                      />
                    </Stack>

                    {/* Fields */}
                    <Stack direction="row" alignItems="center">
                      <AdvTextField
                        fullWidth
                        templateLable="PO"
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        templateLable="NOTE"
                        inputProps={{ style: { textAlign: "left" } }}
                        onChange={handleChange}
                        onBlur={handleBlur}
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

                    {/* Terms */}

                    <Stack>
                      <AdvTextField
                        templateLable="TERMS"
                        inputProps={{ style: { textAlign: "left" } }}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                              templateLable="SUB_TOTAL"
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
                        <tr>
                          <td>
                            <AdvTextField
                              templateLable="DISCOUNT"
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
                        </tr>
                        {/* Shipping */}
                        <tr>
                          <td>
                            <AdvTextField
                              templateLable="SHIPPING"
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

                        {/* Tax Rate */}
                        <tr>
                          <td>
                            <AdvTextField
                              templateLable="TAX_RATE"
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
                                style: {
                                  textAlign: "right",
                                },
                              }}
                            />
                          </td>
                        </tr>

                        {/* Total */}
                        <tr>
                          <td>
                            <AdvTextField
                              templateLable="TOTAL"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              style={{
                                fontWeight: "normal",
                              }}
                            />
                          </td>
                          <td>
                            <Typography textAlign="right" variant="caption">
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
                              templateLable="AMOUNT_PAID"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              style={{
                                fontWeight: "normal",
                              }}
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
                              templateLable="BALANCE_DUE"
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
                        </tr>
                      </tbody>
                    </table>
                  </Stack>
                </Stack>
              </Paper>

              <Paper>
                <Stack p={2} spacing={2}>
                  <Button size="small" variant="contained">
                    Generate Invoice
                  </Button>

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

                  <Typography variant="h4">{values.currency_code}</Typography>

                  {/* Save as default */}

                  <FormControl>
                    <Button size="small" variant="contained" color="secondary">
                      Save Templete
                    </Button>
                  </FormControl>
                </Stack>
              </Paper>
            </Stack>
          );
        }}
      </Formik>
    </Container>
  );
}
