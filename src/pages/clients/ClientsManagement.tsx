import {
  Business,
  CurrencyExchange,
  Email,
  Language,
  MoreHoriz,
  Person,
  Phone,
} from "@mui/icons-material";
import { Chip, Container, IconButton, Stack, Typography } from "@mui/material";
import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions,
} from "mui-datatables";

export default function ClientsManagement() {
  const data: Client[] = [];

  // /////

  function generateDummyData(): Client {
    const currencies: CurrencyCode[] = ["USD", "EUR"];
    const languages: string[] = ["en", "fr", "de", "es"];
    const streetNames: string[] = ["Main", "Park", "Oak", "Cedar"];
    const cities: string[] = ["New York", "London", "Paris", "Tokyo"];
    const firstNames: string[] = ["John", "Jane", "Michael", "Emma"];
    const lastNames: string[] = ["Smith", "Johnson", "Brown", "Davis"];
    const organizationNames: string[] = [
      "Acme Inc",
      "XYZ Corporation",
      "ABC Co",
      "123 Company",
    ];

    const randomCurrency =
      currencies[Math.floor(Math.random() * currencies.length)];
    const randomLanguage =
      languages[Math.floor(Math.random() * languages.length)];
    const randomStreetName =
      streetNames[Math.floor(Math.random() * streetNames.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomFirstName =
      firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName =
      lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomOrganizationName =
      organizationNames[Math.floor(Math.random() * organizationNames.length)];

    const clientType = Math.random() < 0.5 ? "PERSON" : "ORGANIZATION";

    if (clientType === "PERSON") {
      const client: Client = {
        currency_code: randomCurrency,
        language_code: randomLanguage,
        email: `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@example.com`,
        phone: "+1 555-555-5555",
        address: {
          street_1: `${randomStreetName} St`,
          street_2: "",
          city: randomCity,
          state: "NY",
          postal: "10001",
          country_code: "US",
        },
        type: clientType,
        first_name: randomFirstName,
        last_name: randomLastName,
      };
      return client;
    } else {
      const client: Client = {
        currency_code: randomCurrency,
        language_code: randomLanguage,
        email: `${randomOrganizationName
          .replace(/\s/g, "")
          .toLowerCase()}@example.com`,
        phone: "+1 555-555-5555",
        address: {
          street_1: `${randomStreetName} Ave`,
          street_2: "",
          city: randomCity,
          state: "NY",
          postal: "10001",
          country_code: "US",
        },
        type: clientType,
        organization_name: randomOrganizationName,
        contact_first_name: randomFirstName,
        contact_last_name: randomLastName,
      };
      return client;
    }
  }

  for (let i = 0; i < 50; i++) {
    const client = generateDummyData();
    data.push(client);
  }

  /////

  const options: MUIDataTableOptions = {
    filterType: "checkbox",
    selectableRows: "none",
  };

  const columns: MUIDataTableColumn[] = [
    {
      name: "",
      label: "No",
      options: {
        customBodyRenderLite(_dataIndex, rowIndex) {
          return rowIndex + 1;
        },
      },
    },

    {
      name: "",
      label: "Name",
      options: {
        filter: true,
        sort: true,
        customBodyRender(_value, tableMeta) {
          const row: Client = data[tableMeta.rowIndex];

          if (row.type == "ORGANIZATION") {
            return (
              <Stack direction="row" spacing={1}>
                <Business color="info" />
                <Stack>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {row.organization_name}
                  </Typography>
                  <Typography variant="subtitle2">
                    {row.contact_first_name} {row.contact_last_name}
                  </Typography>
                </Stack>
              </Stack>
            );
          } else if (row.type == "PERSON") {
            return (
              <Typography>{`${row.first_name} ${row.last_name}`}</Typography>
            );
          }
        },
      },
    },
    {
      name: "",
      label: "Locale",
      options: {
        filter: true,
        sort: false,
        customBodyRender(_value, tableMeta) {
          const row: Client = data[tableMeta.rowIndex];
          return (
            <Stack>
              <Stack direction="row" spacing={1}>
                <Language color="info" fontSize="small" />
                <Typography>{row.language_code}</Typography>
              </Stack>

              <Stack direction="row" spacing={1}>
                <CurrencyExchange color="info" fontSize="small" />
                <Typography>{row.currency_code}</Typography>
              </Stack>
            </Stack>
          );
        },
      },
    },
    {
      name: "",
      label: "Contact",
      options: {
        filter: true,
        sort: false,
        customBodyRender(_value, tableMeta) {
          const row: Client = data[tableMeta.rowIndex];
          return (
            <Stack>
              <Stack direction="row" spacing={1}>
                <Phone color="info" fontSize="small" />
                <Typography>{row.phone}</Typography>
              </Stack>

              <Stack direction="row" spacing={1}>
                <Email color="info" fontSize="small" />
                <Typography>{row.email}</Typography>
              </Stack>
            </Stack>
          );
        },
      },
    },
    {
      name: "",
      label: "Address",
      options: {
        filter: true,
        sort: false,
        customBodyRender(_value, tableMeta) {
          const row: Client = data[tableMeta.rowIndex];
          return (
            <Stack>
              <Stack direction="row" spacing={1}>
                <Phone color="info" fontSize="small" />
                <Typography>{row.phone}</Typography>
              </Stack>

              <Stack direction="row" spacing={1}>
                <Email color="info" fontSize="small" />
                <Typography>{row.email}</Typography>
              </Stack>
            </Stack>
          );
        },
      },
    },
    {
      name: "",
      label: "Actions",
      options: {
        customBodyRenderLite() {
          return (
            <IconButton>
              <MoreHoriz />
            </IconButton>
          );
        },
      },
    },
  ];

  return (
    <Container maxWidth="xl">
      <MUIDataTable
        title={"Clients"}
        data={data}
        columns={columns}
        options={options}
      />
    </Container>
  );
}
