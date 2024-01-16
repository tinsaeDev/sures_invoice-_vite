import {
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputBase,
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

function AdvTextField(props: TextFieldProps) {
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
      defaultValue="Date"
      inputProps={{
        style: {
          textAlign: "right",
          fontWeight: "bold",
        },
      }}
      sx={{
        p: 1,
        textAlign: "right",
        border: "none",
        "& fieldset": { border: focused ? "" : "none" },
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
                <Button> Add Photo </Button>
                <TextField size="small" placeholder="Invoice From" />
                <Stack direction="row" spacing={2}>
                  <TextField size="small" label="Bill To(*)" />

                  <TextField size="small" label="Shipped to" />
                </Stack>
              </Stack>
              {/* Left Header */}

              <Stack spacing={2}>
                <InputBase
                  defaultValue="INVOICE"
                  inputProps={{}}
                  sx={{
                    fontSize: "28px",
                    fontWeight: "bold",
                  }}
                />

                {/* Fields */}
                <Stack direction="row" alignItems="center">
                  <AdvTextField defaultValue="Date" />
                  <TextField
                    size="small"
                    label="Date"
                    type="date"
                    defaultValue={new Date()}
                  />
                </Stack>

                <TextField size="small" label="Payement Terms" type="number" />
                <TextField size="small" label="Due Date" type="date" />
                <TextField size="small" label="PO" />
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
