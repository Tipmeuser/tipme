import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useState } from "react";
import { MuiButton, MuiTextInput } from "../../components";
import { useTheme } from "@mui/material/styles";
import { useFormEdit } from "../../hooks/useFormEdit";
import { useNavigate } from "react-router-dom";
import TipmeLogo from "../../assets/TipLogo.png";
import ProfileIcon from "../../assets/ProfileIcon.svg";
import Gpay from "../../assets/Gpay.svg";
import GpayLogo from "../../assets/GpayLogo.svg";
import RevoultLogo from "../../assets/RevoultLogo.svg";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const Dashboard = () => {
  const theme = useTheme();
  const [isError] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    tipAmount: "",
  };

  const edit = useFormEdit(initialValues);
  const RequiredFields = ["tipAmount"];

  const onClickPay = () => {
    if (RequiredFields && edit.allFilled("tipAmount")) {
      navigate("/payment", {
        state: { tipAmount: edit.getValue("tipAmount") },
      });
    }
  };

  return (
    <Container maxWidth={"xs"}>
      <Box
        style={{
          padding: theme.spacingTheme.padding.lg,
          display: "flex",
          flexDirection: "column",
          // rowGap: 20,
          height: "100%",
          alignItems: "center",
          width: 380,
          height: 300,
        }}
      >
        <img
          src={TipmeLogo}
          style={{ marginTop: 30, marginBottom: 30 }}
          alt="logo"
        />
        <img src={ProfileIcon} alt="Profile" />
        <Typography style={{ fontSize: 15, fontWeight: "500" }}>
          Paying Jacob Jones
        </Typography>
        <Typography>********765</Typography>
        <Rating
          name="size-large"
          defaultValue={2}
          style={{ borderRadius: 10 }}
          size="large"
        />
        {/* <Rating
          name="customized-color"
          defaultValue={2}
          getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
          precision={0.5}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        /> */}
        <Typography
          style={{
            marginTop: 10,
            marginBottom: 20,
            fontSize: 13,
            color: "#7C8396",
          }}
        >
          Enter Tip Amount
        </Typography>
        <Grid style={{ width: "150px", marginBottom: 25 }}>
          <MuiTextInput
            value={edit.getValue("tipAmount").toLocaleString("en-IN")}
            onChange={(event) => {
              edit.update({
                tipAmount: event.target.value.replace(/[^0-9]/g, ""),
              });
            }}
            error={isError && !edit.allFilled("tipAmount")}
            inputHeight={35}
            sx={{
              "& fieldset": { border: "none" },
              "& .MuiInput-underline:hover:before": {
                border: "none !important",
              },
            }}
          />
        </Grid>
        <Grid
          container
          gap={2}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginBottom: 15,
          }}
        >
          <Box
            style={{
              border: "1px solid",
              borderRadius: 10,
              height: 45,
              width: 150,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 8,
              paddingLeft: 10,
            }}
          >
            <Typography
              style={{
                fontSize: 13,
                paddingRight: 10,
                fontWeight: "500px",
                alignItems: "center",
              }}
            >
              Pay With {" ,"}
              <span style={{ display: "inline-block", alignItems: "center" }}>
                <img src={GpayLogo} alt="Revoult" height={20} />
              </span>
            </Typography>
          </Box>

          <Box
            style={{
              border: "1px solid",
              borderRadius: 10,
              height: 45,
              width: 150,
              alignItems: "center",
              paddingTop: 12,
              paddingLeft: 10,
            }}
          >
            <Typography
              style={{ fontSize: 13, paddingRight: 10, fontWeight: "500px" }}
            >
              Pay With {" ,"}
              <span style={{ display: "inline-block" }}>
                <img src={RevoultLogo} alt="Revoult" />
              </span>
            </Typography>
          </Box>
        </Grid>

        <Button
          sx={{ textTransform: "none" }}
          size="large"
          disableRipple
          style={{
            width: "90%",
            backgroundColor: "#FF914D",
            borderRadius: 20,
            color: "#FFFFFF",
            fontSize: 16,
            marginBottom: 30,
            fontSize: 12,
            fontWeight: 700,
          }}
          onClick={onClickPay}
        >
          Pay With Card
        </Button>
        <img src={Gpay} alt="logo" />
      </Box>
    </Container>
  );
};

export default memo(Dashboard);
