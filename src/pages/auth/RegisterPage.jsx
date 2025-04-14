import { useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  Container,
  Link as MuiLink,
} from "@mui/material";
import {
  ConfirmSchema,
  getErrors,
  getRegisterFieldError,
} from "../../lib/validationForm";
import supabase from "../../supabase/supabase-client";

export default function RegisterPage() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchema.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      console.log(errors);
    } else {
      let { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            username: data.username,
          },
        },
      });
      if (error) {
        alert("Signing up error 👎🏻!");
      } else {
        alert("Signed up 👍🏻!");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/");
      }
    }
  };

  const onBlur = (property) => () => {
    const message = getRegisterFieldError(property, formState[property]);
    setFormErrors((prev) => ({ ...prev, [property]: message }));
    setTouchedFields((prev) => ({ ...prev, [property]: true }));
  };

  const isInvalid = (property) => {
    if (formSubmitted || touchedFields[property]) {
      return !!formErrors[property];
    }
    return false;
  };

  const setField = (property, valueSelector) => (e) => {
    setFormState((prev) => ({
      ...prev,
      [property]: valueSelector ? valueSelector(e) : e.target.value,
    }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mb: 2 }}>
          <MuiLink
            component={Link}
            to="/"
            sx={{
              color: theme.palette.primary.main,
              textDecoration: "none",
              "&:hover": {
                color: theme.palette.primary.light,
              },
            }}
          >
            ← Torna alla Home
          </MuiLink>
        </Box>

        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: theme.palette.background.paper,
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" component="h1" align="center">
            Registrati
          </Typography>

          {[
            { name: "email", label: "Email", type: "email" },
            { name: "firstName", label: "First Name" },
            { name: "lastName", label: "Last Name" },
            { name: "username", label: "Username" },
            { name: "password", label: "Password", type: "password" },
          ].map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type || "text"}
              value={formState[field.name]}
              onChange={setField(field.name)}
              onBlur={onBlur(field.name)}
              error={isInvalid(field.name)}
              helperText={formErrors[field.name]}
              fullWidth
              required
              sx={{
                "& .MuiInputBase-root": {
                  color: theme.palette.text.primary,
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.text.primary,
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.secondary.main,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.dark,
                  },
                },
              }}
            />
          ))}
          <Typography
            variant="body2"
            sx={{
              fontStyle: "italic",
              color: theme.palette.text.secondary,
              textAlign: "center",
            }}
          >
            Sei già registrato?{" "}
            <MuiLink
              component={Link}
              to="/login"
              sx={{ color: theme.palette.primary.main }}
            >
              login
            </MuiLink>
          </Typography>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
