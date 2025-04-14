import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import SessionContext from "../../context/session/SessionContext";
import supabase from "../../supabase/supabase-client";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link as MuiLink,
  useTheme,
} from "@mui/material";
import RealtimeChat from "../chat/RealtimeChat";

export default function Chatbox({ data }) {
  const { session, profile } = useContext(SessionContext);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const inputMessage = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputMessage));
    if (typeof message === "string" && message.trim().length !== 0) {
      const { error } = await supabase
        .from("messages")
        .insert([
          {
            profile_id: session?.user.id,
            profile_username: profile?.username,
            game_id: data.id,
            content: message,
          },
        ])
        .select();

      if (error) {
        console.log(error);
      } else {
        inputMessage.reset();
      }
    }
  };

  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: isDarkMode
            ? theme.palette.primary.light
            : theme.palette.primary.main,
          fontWeight: "bold",
        }}
      >
        Gamers Chat
      </Typography>

      <Paper
        elevation={2}
        sx={{
          // p: 2,
          // mb: 2,
          bgcolor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <RealtimeChat data={data} />
      </Paper>

      {session ? (
        <Box
          component="form"
          onSubmit={handleMessageSubmit}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mt: 2,
            flexWrap: "wrap",
          }}
        >
          <TextField
            name="message"
            placeholder="Scrivi un messaggio..."
            variant="outlined"
            fullWidth
            size="small"
            sx={{
              backgroundColor: isDarkMode
                ? theme.palette.grey[900]
                : theme.palette.grey[100],
              borderRadius: 1,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ minWidth: 100 }}
          >
            Invia
          </Button>
        </Box>
      ) : (
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            fontStyle: "italic",
            color: theme.palette.text.secondary,
            textAlign: "center",
          }}
        >
          🔒 Per partecipare alla chat,{" "}
          <MuiLink
            component={Link}
            to="/login"
            sx={{ color: theme.palette.primary.main }}
          >
            accedi
          </MuiLink>{" "}
          o{" "}
          <MuiLink
            component={Link}
            to="/register"
            sx={{ color: theme.palette.primary.main }}
          >
            registrati
          </MuiLink>
          .
        </Typography>
      )}
    </>
  );
}
