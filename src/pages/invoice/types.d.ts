type Currency = {
  code: string;
  name: string;
  symboll: string;
};
type Invoice = {
  uuid: string;
  company_name: string;
  invoice_id: string;
  bill_to: string;
  shipped_to: string;
  logo_url?: string;
  tax_rate?: number;

  currency?: Currency;
};
