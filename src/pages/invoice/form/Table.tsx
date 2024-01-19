import {
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import AdvTextField from "../components/AdvTestField";
import { Close } from "@mui/icons-material";
import { FormikProps } from "formik";

export default function InvoiceTable(props: {
  formik: FormikProps<Invoice & TemplateLabels>;
}) {
  const { handleBlur, handleChange, values, setFieldValue } = props.formik;

  return (
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
              onChange={handleChange}
              onBlur={handleBlur}
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
              onChange={handleChange}
              onBlur={handleBlur}
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
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </TableCell>
          <TableCell align="right">
            <AdvTextField
              templateLable="TABLE_AMOUNT"
              inputProps={{
                style: {
                  textAlign: "right",
                },
              }}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </TableCell>
        </TableHead>
        <TableBody>
          {values.items.map((item, index) => {
            const descriptionName = `items[${index}].description`;
            const qtyName = `items[${index}].qty`;
            const rateName = `items[${index}].rate`;

            return (
              <TableRow
                key={index}
                sx={{
                  position: "relative",
                }}
              >
                <TableCell colSpan={4}>
                  <TextField
                    fullWidth
                    size="small"
                    name={descriptionName}
                    // onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                    }}
                    placeholder="Description of product or service"
                    value={item.description}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    name={qtyName}
                    // onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                    }}
                    value={item.qty}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">USD</InputAdornment>
                      ),
                    }}
                    size="small"
                    name={rateName}
                    // onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleChange(e);
                    }}
                    value={item.rate}
                  />
                </TableCell>
                <TableCell align="right">ETB 323,23</TableCell>

                <IconButton
                  sx={{
                    position: "absolute",
                    right: "-1rem",
                  }}
                  size="small"
                >
                  <Close />
                </IconButton>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell colSpan={4}>
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  values.items.push({
                    description: "",
                    qty: 1,
                    rate: 0,
                  });
                  setFieldValue("items", values.items);
                }}
              >
                Add Item
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
