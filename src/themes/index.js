import PropTypes from "prop-types";
import { CssBaseline, StyledEngineProvider, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import breakpoints from "./breakpoints";
import colors from "./colors";
import customProps from "./customProps";
import spacingTheme from "./spacing";

export default function ThemeCustomization({ children }) {
  const theme = createTheme({
    breakpoints,
    colors,
    customProps,
    spacingTheme,
  });
  return (
    <StyledEngineProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box height={"100vh"} display="flex" flexDirection="column">
          {children}
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeCustomization.propTypes = {
  children: PropTypes.node,
};
