import { Delete, Edit } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function Invoice() {
  const companyInfo = {
    company_name: "Victor General Trading",
    logo_url: "https://sures-invoice-vite.vercel.app/vite.svg",
    tax_rate: 15,
  };

  const invoices: Invoice[] = [
    {
      bill_to: "Tesema",
      company_name: "DQI General Trading",
      invoice_id: "SSS",
      shipped_to: "Addis Ababa",
      uuid: "222222222222",
    },
    {
      bill_to: "Jhoneey Deep",
      company_name: "DQI General Trading",
      invoice_id: "SSS",
      shipped_to: "Addis Ababa",
      uuid: "23",
    },

    {
      bill_to: "Long Haul",
      company_name: "DQI General Trading",
      invoice_id: "SSS",
      shipped_to: "Addis Ababa",
      uuid: "q3232",
    },
  ];
  return (
    <Container>
      <Typography variant="h3"> My Invoices</Typography>

      <Grid container spacing={2}>
        {invoices.map((inv) => {
          return (
            <Grid key={inv.uuid} xs={12} sm={4}>
              <InvoiceCard invoice={inv}></InvoiceCard>
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
        <IconButton>
          <Edit color="info" />
        </IconButton>
        <IconButton>
          <Delete color="error" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
