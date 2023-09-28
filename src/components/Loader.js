import { memo } from "react";
import { Box, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box>
      <Typography>Loading...</Typography>
    </Box>
  );
};

export default memo(Loader);
