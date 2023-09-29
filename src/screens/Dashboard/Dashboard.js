import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { memo, useState, useEffect } from "react";
import { MuiTextInput } from "../../components";
import { useTheme } from "@mui/material/styles";
import { useFormEdit } from "../../hooks/useFormEdit";
import { useNavigate, useParams } from "react-router-dom";
import TipmeLogo from "../../assets/TipLogo.png";
import ProfileIcon from "../../assets/ProfileIcon.svg";
import Gpay from "../../assets/Gpay.svg";
import GpayLogo from "../../assets/GpayLogo.svg";
import RevoultLogo from "../../assets/RevoultLogo.svg";
import Rating from "@mui/material/Rating";
import InputAdornment from "@mui/material/InputAdornment";
import API from "../../services";
import CONST from "../../config/constants";

const Dashboard = () => {
  const theme = useTheme();
  const [isError] = useState(false);
  const navigate = useNavigate();
  let { id } = useParams();
  console.log(id, "iddddd");
  const initialValues = {
    tipAmount: "",
    workerName:"",
    mobileNumber:""
  };

  const edit = useFormEdit(initialValues);
  const RequiredFields = ["tipAmount"];
  const featch = async () => {
    const getWorkerDetailsRes = await API.PaymentServices.getUserById(id);
    if (
      getWorkerDetailsRes?.code === CONST.STATUS_CODE.OK &&
      getWorkerDetailsRes?.data?.length
    ) {
      const workerDetails = getWorkerDetailsRes.data[0];
      console.log(workerDetails, "uuuuuu");
      edit.update({workerName:workerDetails.name,mobileNumber: workerDetails.mobile_number})
      let barCodeAccData = {
        workerDetails: {
          worker_id: workerDetails.id,
          payment_tip_type: "Mobile No",
          name: workerDetails.name,
          mobileNumber: workerDetails.mobile_number,
          image_url: workerDetails.user_image,
          // dialCode: getWorkerDetailsRes?.dialCode,
        },
        commissionAccounts: [],
        mainWorkerAccounts: [workerDetails.connect_account_id],
        splitWorkerAccount: [],
      };

      const [getSplitWorker, getAdminBankDetailRes] = await Promise.all([
        API.PaymentServices.getSplitWorkersDetails(workerDetails.id),
        API.PaymentServices.getAdminBankDetails(),
      ]);

      if (getSplitWorker?.code === CONST.STATUS_CODE.OK) {
        let employerData = {};
        if (
          getSplitWorker?.connect_account_id &&
          getSplitWorker.employee_commission
        ) {
          employerData = {
            connect_id: getSplitWorker.connect_account_id,
            commission: getSplitWorker.employee_commission,
          };
        }
        let splitWorkerData = [];
        if (getSplitWorker?.data?.length) {
          splitWorkerData = getSplitWorker.data.map(
            (itm) => itm.connect_account_id
          );
        }
        barCodeAccData.commissionAccounts = [
          ...barCodeAccData.commissionAccounts,
          employerData,
        ];
        barCodeAccData.splitWorkerAccount = [
          ...barCodeAccData.splitWorkerAccount,
          ...splitWorkerData,
        ];
      }

      if (
        getAdminBankDetailRes?.code === CONST.STATUS_CODE.OK &&
        getAdminBankDetailRes?.data?.length
      ) {
        const rData = getAdminBankDetailRes.data
          .map((itm) => {
            return {
              connect_id: itm.connected_id,
              commission: itm.commission,
            };
          })
          .filter((itm) => itm.connect_id !== null);
        barCodeAccData.commissionAccounts = [
          ...barCodeAccData.commissionAccounts,
          ...rData,
        ];
      }
      console.log(barCodeAccData, "barCodeAccData");
    }
  };

  useEffect(() => {
    featch();
  }, []);

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
          {`Paying ${edit.getValue('workerName')}`}
        </Typography>
        <Typography>{edit.getValue('mobileNumber')}</Typography>
        <Rating
          name="size-large"
          defaultValue={2}
          style={{ borderRadius: 10 }}
          size="large"
        />

        <Typography
          style={{
            marginTop: 10,
            marginBottom: 10,
            fontSize: 13,
            color: "#7C8396",
          }}
        >
          Enter Tip Amount
        </Typography>
        <Grid style={{ width: "150px", marginBottom: 25 }}>
          <MuiTextInput
            autoFocus
            value={edit.getValue("tipAmount").toLocaleString("en-IN")}
            onChange={(event) => {
              edit.update({
                tipAmount: event.target.value.replace(/[^0-9]/g, ""),
              });
            }}
            error={isError && !edit.allFilled("tipAmount")}
            inputHeight={40}
            sx={{
              "& fieldset": { border: "none" },
              "& .MuiInput-underline:hover:before": {
                border: "none !important",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography
                    style={{
                      color: "#000000",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    USD
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          container
          gap={1}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginBottom: 15,
          }}
        >
          <Button
            sx={{ textTransform: "none" }}
            size="large"
            disableRipple
            variant="outlined"
            endIcon={<img src={GpayLogo} alt="Revoult" height={20} />}
            style={{
              borderColor: "#FF914D",
              borderRadius: 20,
              borderWidth: "1px solid ",
              color: "#000000",
              fontSize: 16,
              marginBottom: 5,
              fontWeight: 700,
            }}
            onClick={onClickPay}
          >
            Pay With
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            size="large"
            disableRipple
            variant="outlined"
            endIcon={<img src={RevoultLogo} alt="Revoult" />}
            style={{
              borderColor: "#FF914D",
              borderRadius: 20,
              color: "#000000",
              fontSize: 16,
              marginBottom: 5,
              fontWeight: 700,
            }}
            onClick={onClickPay}
          >
            Pay With
          </Button>
        </Grid>

        <Button
          sx={{ textTransform: "none" }}
          size="large"
          disableRipple
          style={{
            width: "100%",
            backgroundColor: "#FF914D",
            borderRadius: 20,
            color: "#FFFFFF",
            fontSize: 16,
            marginBottom: 30,
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
