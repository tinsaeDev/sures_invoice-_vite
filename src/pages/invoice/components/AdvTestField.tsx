import { TextField, TextFieldProps } from "@mui/material";
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

type TemplateInputLabelKeys = keyof typeof TemplateInputLabel;

export default function AdvTextField(
  props: TextFieldProps & {
    templateLable: TemplateInputLabelKeys;
  }
) {
  const [focused, setFocused] = useState(false);
  const onBlur = useCallback(function () {
    setFocused(false);
  }, []);

  const onFocus = useCallback(function () {
    setFocused(true);
  }, []);
  return (
    <TextField
      {...props}
      size="small"
      name={props.templateLable}
      defaultValue={TemplateInputLabel[props.templateLable]}
      inputProps={{
        ...props.inputProps,
        style: {
          textAlign: "right",
          ...props.inputProps?.style,
        },
      }}
      sx={{
        textAlign: "right",
        border: "none",
        "& fieldset": { border: focused ? "" : "none" },
        ...props.sx,
      }}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
}
