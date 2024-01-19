type Currency = {
  code: string;
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

type UploadedFile = {
  url: string;
};

type Invoice = {
  /**
   * VALUES
   */

  //
  logo: Blob | UploadedFile | null;
  id: string;

  currency: string;

  invoice_from: string;
  bill_to: string;
  shipped_to: string;
  date_prepared: string;
  payment_terms: string;
  due_date: string;
  po: string;

  // Table

  items: Product[];
  // Footer

  note: string;
  terms: string;

  // Total

  discount: number;
  shipping: number;
  tax_rate: number;
  amount_paid: number;
};

type Product = {
  description: string;
  qty: number;
  rate: number;
};
