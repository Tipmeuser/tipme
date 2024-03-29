import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { memo, useState, useEffect } from "react";
import { Loader, MuiTextInput } from "../../components";
import { useTheme } from "@mui/material/styles";
import { useFormEdit } from "../../hooks/useFormEdit";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TipmeLogo from "../../assets/TipLogo.png";
import ProfileIcon from "../../assets/ProfileIcon.svg";
import Gpay from "../../assets/Gpay.svg";
import ApplePay from "../../assets/applePay.svg";
import AppleStore from "../../assets/appleStore.svg";
import GpayLogo from "../../assets/GpayLogo.svg";
import RevoultLogo from "../../assets/RevoultLogo.svg";
import InputAdornment from "@mui/material/InputAdornment";
import API from "../../services";
import CONST from "../../config/constants";
import { Rating } from "semantic-ui-react";

const Dashboard = () => {
  const theme = useTheme();
  const [isError, setIsError] = useState(false);
  const [barCodeAccountData, setBarCodeAccountData] = useState({});
  const [apiresponse, setApiResponse] = useState();
  const navigate = useNavigate();
  let { id } = useParams();
  const [isIOS, setIsIOS] = useState(false);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  const { search } = useLocation();
  console.log(search, "search");
  console.log(search.substring(1));
  console.log(id, "iddddd");

  const initialValues = {
    tipAmount: "",
    workerName: "",
    mobileNumber: "",
    currency: "",
  };

  const edit = useFormEdit(initialValues);
  const RequiredFields = ["tipAmount"];

  const tipError = isError && !edit.getValue("tipAmount");
  const featch = async () => {
    try {
      setLoading(true)
      const getWorkerDetailsRes = await API.PaymentServices.getUserById(id);
      if (
        getWorkerDetailsRes?.code === CONST.STATUS_CODE.OK &&
        getWorkerDetailsRes?.data?.length
      ) {
        const workerDetails = getWorkerDetailsRes.data[0];
        console.log(workerDetails, "uuuuuu");
        edit.update({
          workerName: workerDetails.name,
          mobileNumber: workerDetails.mobile_number,
          currency: getWorkerDetailsRes?.currencyCode,
        });
        let barCodeAccData = {
          workerDetails: {
            worker_id: workerDetails.id,
            payment_tip_type: "Mobile No",
            name: workerDetails.name,
            mobileNumber: workerDetails.mobile_number,
            image_url: workerDetails.user_image,
          },
          commissionAccounts: [],
          mainWorkerAccounts: [workerDetails.connect_account_id],
          splitWorkerAccount: [],
          customer_id: search.substring(1),
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
        setBarCodeAccountData(barCodeAccData);
        console.log(barCodeAccData, "barCodeAccData");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    featch();
    if (
      navigator.platform === "iPad" ||
      navigator.platform === "iPhone" ||
      navigator.platform === "iPod"
    ) {
      setIsIOS(true);
    } else {
      setIsIOS(false);
    }
  }, []);

  const handleChangeOnRate = (e, { rating }) => {
    e.preventDefault();
    setRating(rating);
  };

  const onClickPay = async () => {
    if (!edit.allFilled(...RequiredFields)) {
      setIsError(true);
    } else {
      setIsError(false);
    }
    if (RequiredFields && edit.allFilled("tipAmount")) {
      let data = {
        customer_id: search.substring(1),
        amount: Number(edit.getValue("tipAmount")) * 100,
        currency: edit.getValue("currency"),
      };
      try {
        if (Object.keys(barCodeAccountData)?.length) {
          const response = await API.PaymentServices.createPaymentIntent(data);
          console.log(Object.keys(barCodeAccountData), "barCodeAccountData");
          console.log(response, "response");
          if (response.code === CONST.STATUS_CODE.CREATED) {
            navigate("/payment", {
              state: {
                barCodeAccountData,
                tipAmount: edit.getValue("tipAmount") * 100,
                payment: response,
                currency: edit.getValue("currency"),
              },
            });
          }
          setApiResponse(response);
        }
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    }
  };
  if (loading) {
    return <Loader />;
  } else {
    return (
      <Container maxWidth={"xs"}>
        <Box
          style={{
            padding: theme.spacingTheme.padding.lg,
            display: "flex",
            flexDirection: "column",
            // rowGap: 20,
            alignItems: "center",
            width: 400,
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
            {`Paying ${edit.getValue("workerName")}`}
          </Typography>
          <Typography>{edit.getValue("mobileNumber")}</Typography>
          {/* <Rating
          name="size-large"
          defaultValue={2}
          style={{ borderRadius: 10 }}
          size="large"
        /> */}
          <Rating
            icon="star"
            size="huge"
            maxRating={5}
            value={rating}
            onRate={handleChangeOnRate}
          />

          <Typography
            style={{
              marginTop: 10,
              marginBottom: 10,
              fontSize: 13,
              color: tipError ? "#EC5C4D" : "#7C8396",
            }}
          >
            {tipError ? "Please Enter Tip Amount" : "Enter Tip Amount"}
          </Typography>
          <Grid style={{ width: "65%", marginBottom: 25 }}>
            <MuiTextInput
              autoFocus
              isBorderColor={"transparent"}
              value={edit.getValue("tipAmount").toLocaleString("en-IN")}
              onChange={(event) => {
                edit.update({
                  tipAmount: event.target.value.replace(/[^0-9]/g, ""),
                });
              }}
              error={isError && !edit.allFilled("tipAmount")}
              inputHeight={40}
              textWeight={700}
              textSize={36}
              sx={{
                "& fieldset": { border: "none" },
                "& .MuiInput-underline:hover:before": {
                  border: "none !important",
                },
              }}
              inputProps={{ inputMode: "numeric" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography
                      style={{
                        color: "#000000",
                        fontSize: "36px",
                        fontWeight: "700",
                      }}
                    >
                      {edit.getValue("currency")}
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
              endIcon={
                <img
                  src={isIOS ? ApplePay : GpayLogo}
                  alt="Revoult"
                  height={20}
                />
              }
              style={{
                borderColor: "#FF914D",
                borderRadius: 20,
                borderWidth: "1px solid ",
                color: "#000000",
                fontSize: 16,
                marginBottom: 5,
                fontWeight: 700,
                fontFamily: "Creato Display",
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
          <img src={isIOS ? AppleStore : Gpay} alt="logo" />
        </Box>
      </Container>
    );
  }
};

export default memo(Dashboard);
