type CurrencyCode = "USD" | "ETB" | "INR" | "EUR";
type Currency = {
  code: CurrencyCode;
  name: string;
  symboll: string;
};

type TemplateLabels = {
  INVOICE: string;

  //
  BILL_TO: string;
  SHIPPED_TO: string;

  //

  DATE_PREPARED: string;
  PAYMENT_TERMS: string;
  DUE_DATE: string;
  PO: string;

  // Table

  TABLE_ITEM: string;
  TABLE_QTY: string;
  TABLE_RATE: string;
  TABLE_AMOUNT: string;

  // Footer

  NOTE: string;
  TERMS: string;

  // Total

  SUB_TOTAL: string;
  DISCOUNT: string;
  SHIPPING: string;
  TAX_RATE: string;
  TOTAL: string;
  AMOUNT_PAID: string;
  BALANCE_DUE: string;
};

type Template = TemplateLabels & {
  invoice_from: string;
  note: string;
  terms: string;
  currency_code: CurrencyCode;

  tax_rate: number;
  logo: Blob | UploadedFile | null;
};
type UploadedFile = {
  url: string;
};

type InvoiceValue = {
  /**
   * VALUES
   */

  //
  id: number;

  bill_to: string;
  shipped_to: string;
  date_prepared: string;
  payment_terms: string;
  due_date: string;
  po: string;

  // Table

  items: Product[];

  // Total

  discount: number;
  shipping: number;
  amount_paid: number;
};

type Invoice = Template & InvoiceValue;

type Product = {
  description: string;
  qty: number;
  rate: number;
};
