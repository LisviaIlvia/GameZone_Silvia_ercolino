import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; 
import { Box } from "@mui/material";

export default function LazyLoadGameImage({ src, alt, height, sx, ...rest }){
  return (
    <Box
      sx={{
        width: "100%",
        height: height || "100%", 
        overflow: "hidden",
        ...sx, 
      }}
    >
      <LazyLoadImage
        src={src}
        alt={alt}
        effect="blur" 
        width="100%"
        height="100%"
        style={{ objectFit: "cover" }}
        {...rest}
      />
    </Box>
  );
}