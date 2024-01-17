import { Add, Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Divider,
  Fab,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Formik } from "formik";
import { useCallback, useRef, useState } from "react";

const currencies = [
  {
    name: "Ethiopia Birr",
    symboll: "n",
    code: "BIRR",
  },

  {
    name: "USA Dollar",
    symboll: "$",
    code: "US$",
  },

  {
    name: "Indian Ruppe",
    symboll: "₹",
    code: "IN₹",
  },

  {
    name: "Euro",
    symboll: "",
    code: "EUR",
  },
];

enum TemplateInputLabel {
  INVOICE = "Invoiceee",

  //
  BILL_TO = "Bill to",
  SHIPPED_TO = "Shipped to",

  //

  DATE_PREPARED = "Date",
  PAYMENT_TERMS = "Payment Terms",
  DUE_DATE = "Due Date",
  PO = "PO",

  // Table

  TABLE_ITEM = "Item",
  TABLE_QTY = "Quantity",
  TABLE_RATE = "Rate",
  TABLE_AMOUNT = "Amount",

  // Footer

  NOTE = "Note",
  TERMS = "Terms",

  // Total

  SUB_TOTAL = "Sub Total",
  DISCOUNT = "Discount",
  SHIPPING = "Shipping",
  TAX_RATE = "Tax rate",
  TOTAL = "Total",
  AMOUNT_PAID = "Amount Paid",
  BALANCE_DUE = "Balance Due",
}

type UploadedFile = {
  url: string;
};

type TemplateInputLabelKeys = keyof typeof TemplateInputLabel;

function AdvTextField(
  props: TextFieldProps & {
    templateLable: TemplateInputLabelKeys;
  }
) {
  const [focused, setFocused] = useState(false);
  const handleBlur = useCallback(function () {
    setFocused(false);
  }, []);

  const handleFocus = useCallback(function () {
    setFocused(true);
  }, []);
  return (
    <TextField
      {...props}
      size="small"
      defaultValue={TemplateInputLabel[props.templateLable]}
      inputProps={{
        ...props.inputProps,
        style: {
          textAlign: "right",
          fontWeight: "bold",
          ...props.inputProps?.style,
        },
      }}
      sx={{
        textAlign: "right",
        border: "none",
        "& fieldset": { border: focused ? "" : "none" },
        ...props.sx,
      }}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
}

export default function InvoiceForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Container maxWidth="xl">
      <Formik
        onSubmit={(values) => {
          console.log(values);
        }}
        initialValues={
          {
            logo: null,
          } as {
            logo: Blob | null | UploadedFile;
          }
        }
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

                    <TextField size="small" placeholder="Invoice From" />
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
                        />
                        <TextField size="small" label="Bill To(*)" />
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
                        />
                        <TextField size="small" label="Shipped to" />
                      </Stack>
                    </Stack>
                  </Stack>
                  {/* Left Header */}

                  <Stack spacing={0.5}>
                    <AdvTextField
                      templateLable="INVOICE"
                      inputProps={{
                        style: {
                          fontSize: "40px",
                        },
                      }}
                      sx={{}}
                    />

                    {/* Fields */}
                    <Stack direction="row" alignItems="center">
                      <AdvTextField fullWidth templateLable="DATE_PREPARED" />
                      <TextField
                        size="small"
                        label="Date"
                        type="date"
                        fullWidth
                      />
                    </Stack>

                    {/* Fields */}
                    <Stack direction="row" alignItems="center">
                      <AdvTextField fullWidth templateLable="PAYMENT_TERMS" />

                      <TextField
                        fullWidth
                        size="small"
                        label="Payement Terms"
                        type="number"
                      />
                    </Stack>

                    {/* Fields */}
                    <Stack direction="row" alignItems="center">
                      <AdvTextField fullWidth templateLable="DUE_DATE" />
                      <TextField fullWidth size="small" label="Due Date" />
                    </Stack>

                    {/* Fields */}
                    <Stack direction="row" alignItems="center">
                      <AdvTextField fullWidth templateLable="PO" />
                      <TextField fullWidth size="small" label="PO" />
                    </Stack>
                  </Stack>
                </Stack>

                {/* Invoice Body */}
                <TableContainer
                  sx={{
                    mt: 2,
                  }}
                >
                  <Table size="small">
                    <TableHead>
                      <TableCell colSpan={4}>
                        <AdvTextField
                          templateLable="TABLE_ITEM"
                          inputProps={{
                            style: {
                              textAlign: "left",
                            },
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <AdvTextField
                          templateLable="TABLE_QTY"
                          inputProps={{
                            style: {
                              textAlign: "left",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <AdvTextField
                          templateLable="TABLE_RATE"
                          inputProps={{
                            style: {
                              textAlign: "left",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <AdvTextField
                          templateLable="TABLE_AMOUNT"
                          inputProps={{
                            style: {
                              textAlign: "left",
                            },
                          }}
                        />
                      </TableCell>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={4}>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Description of product or service"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField type="number" size="small" />
                        </TableCell>
                        <TableCell>
                          <TextField
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="end">
                                  USD
                                </InputAdornment>
                              ),
                            }}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>ETB 323,23</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={4}>
                          <Button size="small" variant="contained">
                            Add Item
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Invoice Footer */}

                <Stack
                  mt={2}
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Stack flexGrow={1} spacing={2}>
                    {/* Note */}
                    <Stack>
                      <AdvTextField
                        templateLable="NOTE"
                        inputProps={{ style: { textAlign: "left" } }}
                      />
                      <TextField
                        fullWidth
                        multiline
                        rows={5}
                        placeholder="Any relevant information not already coverted"
                      />
                    </Stack>

                    {/* Terms */}

                    <Stack>
                      <AdvTextField
                        templateLable="TERMS"
                        inputProps={{ style: { textAlign: "left" } }}
                      />
                      <TextField
                        fullWidth
                        multiline
                        rows={5}
                        placeholder="Terms and conditions- late fee, paymet methods"
                      />
                    </Stack>
                  </Stack>

                  <Stack flexGrow={1} spacing={0.5} alignItems="flex-end">
                    <Stack direction="row">
                      <AdvTextField templateLable="SUB_TOTAL" />
                      <TextField size="small" label="" />
                    </Stack>

                    <Stack direction="row">
                      <AdvTextField templateLable="DISCOUNT" />
                      <TextField size="small" label="" />
                    </Stack>

                    <Stack direction="row">
                      <AdvTextField templateLable="SHIPPING" />
                      <TextField size="small" label="" />
                    </Stack>

                    <Stack direction="row">
                      <AdvTextField templateLable="TAX_RATE" />
                      <TextField size="small" label="" />
                    </Stack>

                    <Stack direction="row">
                      <AdvTextField templateLable="TOTAL" />
                      <TextField size="small" label="" />
                    </Stack>

                    <Stack direction="row">
                      <AdvTextField templateLable="AMOUNT_PAID" />
                      <TextField size="small" label="" />
                    </Stack>

                    <Stack direction="row">
                      <AdvTextField templateLable="BALANCE_DUE" />
                      <TextField size="small" label="" />
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>

              <Paper>
                <Stack p={2} spacing={2}>
                  <Button size="small" variant="contained">
                    Generate Invoice{" "}
                  </Button>

                  <Divider />

                  {/* Curremcy */}
                  <FormControl>
                    <Autocomplete
                      disablePortal
                      size="small"
                      id="combo-box-demo"
                      options={currencies.map((c) => c.code)}
                      getOptionLabel={(option) =>
                        currencies.find((c) => c.code == option)?.name
                      }
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Currency" />
                      )}
                    />
                  </FormControl>

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
