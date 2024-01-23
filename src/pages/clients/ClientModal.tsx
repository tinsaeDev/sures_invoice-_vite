import {
  BusinessCenter,
  
  Close,
  CurrencyLira,
  Email,
  Language,
  LocationCity,
  Person,
  Phone,
  Place,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
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
            sm: "40vw", // theme.breakpoints.up('sm')
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
                const { values, errors, touched, handleChange, handleBlur } =
                  formik;
                return (
                  <Form>
                    <Stack spacing={4} justifyContent="space-between">
                      <Grid container spacing={2}>
                        {/* Client Type */}
                        <Grid xs={12}>
                          <FormControl fullWidth>
                            <InputLabel size="small">Client Type</InputLabel>
                            <Select
                              size="small"
                              name="type"
                              value={values.type}
                              label="Client Type"
                              onChange={handleChange}
                            >
                              <MenuItem value="PERSON">Person</MenuItem>
                              <MenuItem value="ORGANIZATION">
                                Organization
                              </MenuItem>
                            </Select>
                            {errors.type && touched.type && (
                              <FormHelperText error>
                                {errors.type}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {/***
                         * For Person
                         *  */}

                        {values.type == "PERSON" && (
                          <>
                            {/* First Name */}
                            <Grid xs={12} sm={6}>
                              <FormControl fullWidth>
                                <TextField
                                  name="first_name"
                                  value={values.first_name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  size="small"
                                  label="First Name"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Person />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                {touched.first_name && errors.first_name && (
                                  <FormHelperText error>
                                    {errors.first_name}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>

                            {/* First Name */}
                            <Grid xs={12} sm={6}>
                              <FormControl fullWidth>
                                <TextField
                                  name="last_name"
                                  value={values.last_name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  size="small"
                                  label="Last Name"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Person />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                {touched.last_name && errors.last_name && (
                                  <FormHelperText error>
                                    {errors.last_name}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>
                          </>
                        )}

                        {values.type == "ORGANIZATION" && (
                          <>
                            {/* Organization Name */}
                            <Grid xs={12}>
                              <FormControl fullWidth>
                                <TextField
                                  name="organization_name"
                                  value={values.organization_name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  size="small"
                                  label="Organization Name"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <BusinessCenter />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                {touched.organization_name &&
                                  errors.organization_name && (
                                    <FormHelperText error>
                                      {errors.organization_name}
                                    </FormHelperText>
                                  )}
                              </FormControl>
                            </Grid>

                            {/*  Organization Contact First Name */}
                            <Grid xs={12} sm={6}>
                              <FormControl fullWidth>
                                <TextField
                                  name="contact_first_name"
                                  value={values.contact_first_name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  size="small"
                                  label="Contact First Name"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Person />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                {touched.contact_first_name &&
                                  errors.contact_first_name && (
                                    <FormHelperText error>
                                      {errors.contact_first_name}
                                    </FormHelperText>
                                  )}
                              </FormControl>
                            </Grid>

                            {/* Organization Contact Last Name */}
                            <Grid xs={12} sm={6}>
                              <FormControl fullWidth>
                                <TextField
                                  name="contact_last_name"
                                  value={values.contact_last_name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  size="small"
                                  label="Contact Last Name"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Person />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                {touched.contact_last_name &&
                                  errors.contact_last_name && (
                                    <FormHelperText error>
                                      {errors.contact_last_name}
                                    </FormHelperText>
                                  )}
                              </FormControl>
                            </Grid>
                          </>
                        )}

                        {/* Language Code  */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              name="language_code"
                              value={values.language_code}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="small"
                              label="Language"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Language />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {touched.language_code && errors.language_code && (
                              <FormHelperText error>
                                {errors.language_code}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {/* Currency  Code*/}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              name="currency_code"
                              value={values.currency_code}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="small"
                              label="Currency"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <CurrencyLira />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {touched.currency_code && errors.currency_code && (
                              <FormHelperText error>
                                {errors.currency_code}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {/* Phone */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              name="phone"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="small"
                              label="Phone"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Phone />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {touched.phone && errors.phone && (
                              <FormHelperText error>
                                {errors.phone}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {/* EMail */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="small"
                              label="Email"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Email />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {touched.email && errors.email && (
                              <FormHelperText error>
                                {errors.email}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {/* Street Address 1 */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              name="address.street_1"
                              value={values.address.street_1}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="small"
                              label="Street 1"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LocationCity />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {touched.address?.street_1 &&
                              errors.address?.street_1 && (
                                <FormHelperText error>
                                  {errors.address?.street_1}
                                </FormHelperText>
                              )}
                          </FormControl>
                        </Grid>

                        {/* Street Address 2 */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              name="address.street_2"
                              value={values.address.street_2}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="small"
                              label="Street 2"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LocationCity />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {touched.address?.street_2 &&
                              errors.address?.street_2 && (
                                <FormHelperText error>
                                  {errors.address?.street_2}
                                </FormHelperText>
                              )}
                          </FormControl>
                        </Grid>

                        {/* City */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              name="address.city"
                              value={values.address.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="small"
                              label="City"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LocationCity />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {touched.address?.city && errors.address?.city && (
                              <FormHelperText error>
                                {errors.address?.city}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {/* State/Province */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              name="address.state"
                              value={values.address.state}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="small"
                              label="State"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LocationCity />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {touched.address?.state && errors.address?.city && (
                              <FormHelperText error>
                                {errors.address?.state}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {/* State/Province */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              name="address.country_code"
                              value={values.address.country_code}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="small"
                              label="Country"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LocationCity />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {touched.address?.country_code &&
                              errors.address?.country_code && (
                                <FormHelperText error>
                                  {errors.address?.country_code}
                                </FormHelperText>
                              )}
                          </FormControl>
                        </Grid>

                        {/* Posta */}
                        <Grid xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              name="address.postal"
                              value={values.address.postal}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              size="small"
                              label="Postal"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Place />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {touched.address?.postal &&
                              errors.address?.postal && (
                                <FormHelperText error>
                                  {errors.address?.postal}
                                </FormHelperText>
                              )}
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
