import {
  Button,
  Container,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Form, Formik } from "formik";

export default function SettingsPage() {
  return (
    <Container>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4">Settings</Typography>

        <Formik
          initialValues={{}}
          validationSchema={{}}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {function () {
            return (
              <Form>
                <Grid
                  container
                  spacing={2}
                  sx={
                    {
                      // background: "red",
                    }
                  }
                >
                  <Grid xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField label="Company Name" />
                    </FormControl>
                  </Grid>

                  <Grid xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField label="Default Company Logo" />
                    </FormControl>
                  </Grid>

                  <Grid xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField type="number" label="Default Tax Rate" />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid mt={2} container>
                  <Grid>
                    <Button variant="contained"> Save Changes </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </Container>
  );
}
