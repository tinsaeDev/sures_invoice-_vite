type CurrencyCode = "USD" | "ETB" | "INR" | "EUR" | "GBP" | "JPY";

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
  LINK: string;
  QR: string;
  TERMS: string;

  // Total

  SUB_TOTAL: string;
  DISCOUNT: string;
  SHIPPING: string;
  TAX_RATE: string;
  TOTAL: string;
  AMOUNT_PAID: string;
  BALANCE_DUE: string;
  SIGNATURE: string;
};

type Template = TemplateLabels & {
  invoice_from: string;
  note: string;
  terms: string;
  currency_code: CurrencyCode;

  tax_rate: number;
  logo: Blob | UploadedFile | null;
  signature: Blob | UploadedFile | null;
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
  link: string;
  qr: Blob | UploadedFile | null;
};

type Invoice = Template & InvoiceValue;

type Product = {
  description: string;
  qty: number;
  rate: number;
};

type Client = {
  currency_code: CurrencyCode;
  language_code: string;
  email: string;
  phone: string;
  address: {
    street_1: string;
    street_2: string;
    city: string;
    state: string;
    postal: string;
    country_code: string;
  };
} & (
  | {
      type: "PERSON";
      first_name: string;
      last_name: string;
    }
  | {
      type: "ORGANIZATION";

      organization_name: string;
      contact_first_name: string;
      contact_last_name: string;
    }
);
