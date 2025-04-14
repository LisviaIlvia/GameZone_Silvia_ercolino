import { useEffect, useState } from "react";
import {
  Box,
  Avatar as MUIAvatar,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import supabase from "../../supabase/supabase-client";

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) throw error;

      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  };

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      onUpload(event, filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ textAlign: "center", my: 2 }}>
      <MUIAvatar
        src={avatarUrl}
        alt="Avatar"
        sx={{
          width: size,
          height: size,
          margin: "0 auto",
          boxShadow: 3,
          border: `2px solid ${theme.palette.primary.main}`,
        }}
      />

      <Box mt={2}>
        <Button
          variant="outlined"
          component="label"
          disabled={uploading}
          fullWidth
          sx={{
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
              borderColor: theme.palette.primary.dark,
            },
          }}
        >
          {uploading ? "Caricamento..." : "Carica Avatar"}
          <input type="file" accept="image/*" hidden onChange={uploadAvatar} />
        </Button>
      </Box>

      <Typography
        variant="caption"
        sx={{
          mt: 1,
          display: "block",
          color: theme.palette.text.secondary,
        }}
      >
        Dimensione consigliata: {size}x{size}px
      </Typography>
    </Box>
  );
}
