import { Suspense } from "react";
import { Outlet } from "react-router";
import { Box } from "@mui/material";
import { Loader } from "../components";

const MainLayout = () => {
  return (
      <Box flex={1}>
        <Suspense fallback={() => <Loader />}>
          <Outlet />
        </Suspense>
      </Box>
  );
};

export default MainLayout;
