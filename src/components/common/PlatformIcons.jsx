import React from "react";
import { Box, Typography } from "@mui/material";
import { getPlatformIcon } from "../../utils/platformUtils";
import { normalizePlatformName } from "../../utils/platformUtils";

const PlatformIcons = ({ platforms = [] }) => {
  const shown = new Set();

  const uniquePlatforms = platforms.filter((p) => {
    const normalized = normalizePlatformName(p.platform.name);
    if (shown.has(normalized)) return false;
    shown.add(normalized);
    return true;
  });

  if (!uniquePlatforms.length) {
    return <Typography variant="body2">Nessuna piattaforma disponibile</Typography>;
  }

  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
      {uniquePlatforms.map((p) => {
        const name = normalizePlatformName(p.platform.name);
        return (
          <Box key={name}>
            {getPlatformIcon(name)}
          </Box>
        );
      })}
    </Box>
  );
};

export default PlatformIcons;
