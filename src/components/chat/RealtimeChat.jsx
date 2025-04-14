import { useCallback, useEffect, useRef, useState } from "react";
import supabase from "../../supabase/supabase-client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  useTheme,
} from "@mui/material";

dayjs.extend(relativeTime);

export default function RealtimeChat({ data }) {
  const [messages, setMessages] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [error, setError] = useState("");
  const messageRef = useRef(null);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const scrollSmoothToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };

  const getInitialMessage = useCallback(async () => {
    setLoadingInitial(true);
    const { data: messages, error } = await supabase
      .from("messages")
      .select()
      .eq("game_id", data?.id);

    if (error) {
      setError(error.message);
      return;
    }

    setMessages(messages);
    setLoadingInitial(false);
  }, [data?.id]);

  useEffect(() => {
    if (data) getInitialMessage();

    const channel = supabase
      .channel("message")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => getInitialMessage()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [data, getInitialMessage]);

  useEffect(() => {
    scrollSmoothToBottom();
  }, [messages]);

  return (
    <Box
      ref={messageRef}
      sx={{
        mt: 2,
        px: 2,
        py: 1,
        width: "100%",
        minHeight: "5vh",
        maxHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: theme.shadows[1],
      }}
    >
      {loadingInitial && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      {error && (
        <Paper
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
            borderRadius: 2,
          }}
        >
          <Typography variant="body2">{error}</Typography>
        </Paper>
      )}

      {messages.map((message) => (
        <Paper
          key={message.id}
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: isDarkMode
              ? theme.palette.grey[900]
              : theme.palette.grey[100],
            borderRadius: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "bold",
              color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.main,
            }}
          >
            {message.profile_username}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
            {message.content}
          </Typography>
          <Typography variant="caption" sx={{ mt: 1, display: "block", color: theme.palette.text.secondary }}>
            {dayjs().to(dayjs(message.created_at))}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}
