import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  useTheme,
  Link as MuiLink,
} from "@mui/material";
import { useNavigate, Link } from "react-router";
import supabase from "../../supabase/supabase-client";
import {
  ConfirmSchemaLogin,
  getErrors,
  getLoginFieldError,
} from "../../lib/validationForm";

export default function LoginPage() {
  const theme = useTheme();
  // const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const { error, data } = ConfirmSchemaLogin.safeParse(formState);

    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      return;
    }

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (loginError) {
      alert("Signing in error 👎🏻!");
    } else {
      alert("Signed In 👍🏻!");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/");
    }
  };

  const onBlur = (property) => () => {
    const message = getLoginFieldError(property, formState[property]);
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
      <Container maxWidth="xs">
        <Box sx={{ mb: 2 }}>
          <MuiLink
            component={Link}
            to="/"
            sx={{
              color: theme.palette.primary.main,
              textDecoration: "none",
              fontWeight: 500,
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
            gap: 3,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" component="h1" align="center">
            Login
          </Typography>

          <TextField
            label="Email"
            value={formState.email}
            onChange={setField("email")}
            error={isInvalid("email")}
            helperText={formErrors.email}
            fullWidth
            required
            onBlur={onBlur("email")}
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

          <TextField
            label="Password"
            type="password"
            value={formState.password}
            onChange={setField("password")}
            error={isInvalid("password")}
            helperText={formErrors.password}
            fullWidth
            required
            onBlur={onBlur("password")}
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

          <Typography
            variant="body2"
            sx={{
              fontStyle: "italic",
              color: theme.palette.text.secondary,
              textAlign: "center",
            }}
          >
            Non sei registrato?{" "}
            <MuiLink
              component={Link}
              to="/register"
              sx={{ color: theme.palette.primary.main }}
            >
              registrati
            </MuiLink>
          </Typography>
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
