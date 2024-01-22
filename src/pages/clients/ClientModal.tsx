import { Close } from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Form, Formik } from "formik";

export default function ClientModal(props: { onClose: () => void }) {
  const initialValues = {
    id: null,
    type: "",
    first_name: "",
    last_name: "",
    organization_name: "",
    contact_first_name: "",
    contact_last_name: "",
    currency_code: "",
    language_code: "",
    email: "",
    phone: "",
    address: {
      street_1: "",
      street_2: "",
      city: "",
      state: "",
      postal: "",
      country_code: "",
    },
  };

  return (
    <Modal open={true} onClose={props.onClose}>
      <Paper
        sx={{
          height: "100dvh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: {
            xs: "100dvw", // theme.breakpoints.up('xs')
            sm: "50vw", // theme.breakpoints.up('sm')
          },

          position: "fixed",
          right: "0px",
          top: "0px",
        }}
      >
        <Stack
          justifyContent={"space-between"}
          sx={{
            height: "100%",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Stack
            p={1}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="subtitle1" fontWeight={"bold"}>
              New Client
            </Typography>
            <IconButton onClick={props.onClose} color="error">
              <Close />
            </IconButton>
          </Stack>
          <Divider />

          {/* Modal Body */}
          <Stack p={2} mt={2} flexGrow={1}>
            {/* Filter */}
            <Formik
              initialValues={initialValues}
              onSubmit={() => {
                alert("Submitting,,,");
              }}
            >
              {function (formik) {
                console.log(formik);
                return (
                  <Form>
                    <Stack spacing={4} justifyContent="space-between">
                      <Grid container spacing={1}>
                        {/* First Name */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField size="small" label="First Name" />
                          </FormControl>
                        </Grid>

                        {/* First Name */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField size="small" label="First Name" />
                          </FormControl>
                        </Grid>

                        {/* First Name */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField size="small" label="First Name" />
                          </FormControl>
                        </Grid>

                        {/* First Name */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField size="small" label="First Name" />
                          </FormControl>
                        </Grid>

                        {/* First Name */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField size="small" label="First Name" />
                          </FormControl>
                        </Grid>

                        {/* First Name */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField size="small" label="First Name" />
                          </FormControl>
                        </Grid>

                        {/* First Name */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField size="small" label="First Name" />
                          </FormControl>
                        </Grid>

                        {/* First Name */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField size="small" label="First Name" />
                          </FormControl>
                        </Grid>

                        {/* First Name */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField size="small" label="First Name" />
                          </FormControl>
                        </Grid>

                        {/* First Name */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField size="small" label="First Name" />
                          </FormControl>
                        </Grid>

                        {/* First Name */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField size="small" label="First Name" />
                          </FormControl>
                        </Grid>

                        {/* First Name */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField size="small" label="First Name" />
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Stack>
                        <Button type="submit" variant="contained">
                          Save
                        </Button>
                      </Stack>
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  );
}
