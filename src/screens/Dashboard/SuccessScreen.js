import React, { useEffect, useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  Container,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TipmeLogo from "../../assets/TipLogo.png";
import { MuiTextInput } from "../../components";
import Gpay from "../../assets/Gpay.svg";
import AppleStore from "../../assets/appleStore.svg"

const SuccessScreen = () => {
  const theme = useTheme();
  const [isIOS, setIsIOS] = useState(false);

  useEffect(()=>{
    if (
        navigator.platform === "iPad" ||
        navigator.platform === "iPhone" ||
        navigator.platform === "iPod"
      ) {
        setIsIOS(true);
      } else {
        setIsIOS(false);
      }
  },[])

  return (
    <Container maxWidth={"xs"}>
      <Grid
        sx={{
          padding: theme.spacingTheme.padding.lg,
          display: "flex",
          flexDirection: "column",
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
        <CheckCircleRoundedIcon
          style={{
            width: "35%",
            height: "35%",
            color: "#12A35D",
            paddingTop: "40px",
          }}
        />
        <Grid sx={{ width: "35%", paddingTop: "40px" }}>
          <MuiTextInput
            isBorderColor={"transparent"}
            value={123}
            textSize={30}
            textWeight={700}
            //   onChange={(event) => {
            //     edit.update({
            //       tipAmount: event.target.value.replace(/[^0-9]/g, ""),
            //     });
            //   }}
            //   error={isError && !edit.allFilled("tipAmount")}
            inputHeight={40}
            sx={{
              "& fieldset": { border: "none" },
              "& .MuiInput-underline:hover:before": {
                border: "none !important",
              },
            }}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Typography
                    style={{
                      color: "#000000",
                      fontSize: "30px",
                      fontWeight: "700",
                    }}
                  >
                    USD
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid sx={{ paddingTop: 3, textAlign: "center" }}>
          <Typography
            style={{ fontSize: 16, fontWeight: "500", color: "#000000" }}
          >
            Tipped Jacob Jones
          </Typography>
          <Typography
            style={{ fontSize: 13, fontWeight: "500", color: "#7C8396" }}
          >
            ********765
          </Typography>
        </Grid>
        <Grid sx={{ paddingTop: 5, textAlign: "center" }}>
          <Typography style={{ fontSize: 13, fontWeight: "700" }}>
            20 Jan 2023, 7:03 PM
          </Typography>
          <Typography
            style={{ fontSize: 13, fontWeight: "500", color: "#7C8396" }}
          >
            Transaction ID: 427281527182
          </Typography>
        </Grid>
        <Grid sx={{ paddingTop: 7, alignContent: "center" }}>
          <img src={isIOS? AppleStore : Gpay} alt="logo" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SuccessScreen;
