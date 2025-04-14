import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  useTheme,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/session/SessionContext";
import Avatar from "../../components/common/Avatar";

export default function SettingsPage() {
  const { session, refreshProfile } = useContext(SessionContext);
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    let ignore = false;

    const getProfile = async () => {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select("username, first_name, last_name, avatar_url")
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setAvatarUrl(data.avatar_url);
        }
        setLoading(false);
      }
    };

    if (session) getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url: avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      alert("Profilo aggiornato!");
      if (refreshProfile) {
        await refreshProfile();
      }
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mb: 6 }}>
      <Box sx={{ mt: 2 }}>
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
        onSubmit={updateProfile}
        sx={{
          mt: 6,
          p: 4,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 3,
          boxShadow: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          color: theme.palette.text.primary,
        }}
      >
        <Typography variant="h4" align="center" fontWeight="bold">
          Profilo Utente
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            url={avatar_url}
            size={120}
            onUpload={(event, url) => {
              setAvatarUrl(url);
            }}
          />
        </Box>

        <TextField
          label="Email"
          value={session?.user?.email || ""}
          disabled
          fullWidth
        />

        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              bgcolor: theme.palette.primary.dark,
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Aggiorna"
          )}
        </Button>
      </Box>
    </Container>
  );
}
