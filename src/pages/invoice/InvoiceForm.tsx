import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
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
import { useCallback, useState } from "react";

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
}

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
  return (
    <Container maxWidth="xl">
      <Stack direction="row" spacing={2}>
        <Stack flexGrow={1}>
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
                    // background: "orange",
                  }}
                >
                  <Button
                    sx={{
                      height: "100%",
                      width: "100%",
                    }}
                    startIcon={<Add />}
                  >
                    Add Photo
                  </Button>
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
                  <TextField size="small" label="Date" type="date" fullWidth />
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
                  <TableCell>Item</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Amount</TableCell>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
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
                            <InputAdornment position="end">USD</InputAdornment>
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

            {/* Invoice Body */}

            <Stack
              mt={2}
              direction="row"
              justifyContent="space-between"
              spacing={2}
            >
              <Stack flexGrow={1} spacing={1}>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  label="Note"
                  placeholder="Any relevant information not already coverted"
                />

                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  label="Terms"
                  placeholder="Terms and conditions- late fee, paymet methods"
                />
              </Stack>
              <Stack flexGrow={1} spacing={0.5}>
                <TextField size="small" label="Sub Total" />
                <TextField size="small" label="Discount" />
                <TextField size="small" label="Shipping" />
                <TextField size="small" label="Tax Rate" />
                <TextField size="small" label="Amount Paind" />
                <TextField size="small" label="Balance Due" />
              </Stack>
            </Stack>
          </Paper>
        </Stack>
        <Stack>
          <Button variant="contained"> Generate Invoice </Button>
          <FormControl></FormControl>
        </Stack>
      </Stack>
    </Container>
  );
}
