import * as React from "react";
import { Button, styled } from "@mui/material";
import PropTypes from "prop-types";

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 0,
  color: theme.colors.white.primary,
  marginLeft: "2px",
  textTransform: "none",
  fontSize: 14,
  lineHeight: 0,
}));

const MuiButton = ({ title, endIcon, startIcon, sx, onClick }) => {
  return (
    <StyledButton
      endIcon={endIcon}
      startIcon={startIcon}
      disableRipple
      disableFocusRipple
      sx={{ ...sx }}
      onClick={onClick}
    >
      {title}
    </StyledButton>
  );
};

MuiButton.propTypes = {
  endIcon: PropTypes.element,
  startIcon: PropTypes.element,
  title: PropTypes.string,
  sx: PropTypes.object,
};

export default React.memo(MuiButton);
