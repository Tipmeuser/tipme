import { memo } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: 400 }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default memo(Loader);
