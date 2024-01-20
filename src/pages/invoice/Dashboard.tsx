import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function InvoiceDashboadPage() {
  const companyInfo = {
    company_name: "Victor General Trading",
    logo_url: "https://sures-invoice-vite.vercel.app/vite.svg",
    tax_rate: 15,
  };

  const invoices = useMemo(function (): Invoice[] {
    return JSON.parse(localStorage.getItem("invoices") || "[]") as Invoice[];
  }, []);

  function createNewInvoice() {
    let templateValues: Template | null = null;
    const savedTemplate = localStorage.getItem("template");
    if (!savedTemplate) {
      templateValues = {
        invoice_from: "",
        logo: null,
        currency_code: "USD",

        note: "",
        terms: "",
        tax_rate: 0,

        //

        INVOICE: "Invoice",
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
      } as Template;
    } else {
      try {
        templateValues = JSON.parse(savedTemplate) as Template;
      } catch (e) {
        throw new Error("Invalid Template");
      }
    }

    let nextIDInvoice = 1;
    const savedInvoices = localStorage.getItem("invoices");
    if (savedInvoices) {
      const data: Invoice[] = JSON.parse(savedInvoices);

      const larget: number = Math.max(
        ...data.map((inv) => {
          return inv.id;
        })
      );

      nextIDInvoice = larget + 1;
    }

    const invoiceValues: InvoiceValue = {
      //
      id: nextIDInvoice,
      bill_to: "Ae Keber",
      shipped_to: "Shipped to",

      date_prepared: "Date",
      payment_terms: "Payment Terms",
      due_date: "",
      po: "PO",

      // Table

      items: [
        {
          description: "",
          qty: 1,
          rate: 0,
        },
      ],

      // Total

      discount: 0,
      shipping: 0,
      amount_paid: 0,
    };

    return {
      ...invoiceValues,
      ...templateValues,
    } as Invoice;
  }

  const navigate = useNavigate();
  return (
    <Container maxWidth="xl">
      <Paper sx={{ p: 3 }}>
        <Stack>
          <Typography variant="subtitle2" fontWeight="bold">
            Welcome, {companyInfo.company_name} 👋
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Create Invoices seamlessly
          </Typography>
        </Stack>
      </Paper>

      <Stack
        mt={1}
        p={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontWeight="bold" variant="subtitle1">
          Invoices
        </Typography>
        <Button
          startIcon={<Add />}
          size="small"
          variant="contained"
          onClick={() => {
            const newInvoice: Invoice = createNewInvoice();
            const invoices: Invoice[] = JSON.parse(
              localStorage.getItem("invoices") || "[]"
            );
            invoices.push(newInvoice);

            localStorage.setItem("invoices", JSON.stringify(invoices));

            //

            navigate(`/invoice/${newInvoice.id}`);
          }}
        >
          New
        </Button>
      </Stack>

      <Grid mt={1} container spacing={2}>
        {invoices.map((inv) => {
          return (
            <Grid key={inv.id} xs={12} sm={4}>
              <InvoiceCard invoice={inv} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

function InvoiceCard(props: { invoice: Invoice }) {
  const { invoice } = props;
  return (
    <Card>
      <CardHeader>{invoice.bill_to}</CardHeader>
      <CardContent>
        <Typography> {invoice.bill_to} </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/invoice/${invoice.id}`}>
          <IconButton>
            <Edit color="info" />
          </IconButton>
        </Link>
        <IconButton
          onClick={() => {
            alert("This will open delete dialog of invoice");
          }}
        >
          <Delete color="error" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
