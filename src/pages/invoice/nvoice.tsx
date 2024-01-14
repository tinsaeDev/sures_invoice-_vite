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
        <Button startIcon={<Add />} size="small" variant="contained">
          New
        </Button>
      </Stack>

      <Grid mt={1} container spacing={2}>
        {invoices.map((inv) => {
          return (
            <Grid key={inv.uuid} xs={12} sm={4}>
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
