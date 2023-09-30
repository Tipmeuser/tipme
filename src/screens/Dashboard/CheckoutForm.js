import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import API from "../../services";
import CONST from "../../config/constants";
import { useNavigate } from "react-router";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  console.log(props.data, "props.data");
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const randomNum = Math.floor(1000000 + Math.random() * 9000000);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(props.data, "props.data");
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
  
      redirect: "if_required",
    });
    console.log(error, "error");
 
    // if (error?.type === "card_error" || error?.type === "validation_error") {
    //   // setMessage(error.message);
    // } else {
    //   setMessage("An unexpected error occurred.");
    // }

    const { barCodeAccountData,tipAmount,currency, payment } = props.data;
    const piRes = await stripe.retrievePaymentIntent(payment.paymentIntent);
    console.log(piRes, "----piRes-----");

    const netAmount = await API.PaymentServices.getNetAmount({
      paymentIntend: piRes?.paymentIntent?.id,
    });
    console.log(netAmount?.data?.net, "netAmount.data.net");

    console.log(netAmount, "netAmount.data.net");
    // let piAmount = piRes?.paymentIntent?.amount;
    let piAmount = netAmount?.data?.net;
    let destinationTransferData = [];
    let commisionAmount = 0;

    if (barCodeAccountData?.commissionAccounts?.length) {
      barCodeAccountData?.commissionAccounts.forEach((itm) => {
        let rAmount = (itm.commission / 100) * piAmount;
        commisionAmount = commisionAmount + rAmount;
        destinationTransferData.push({
          amount: Number(Math.round(rAmount)),
          currency: "USD",
          destination: itm.connect_id,
        });
      });
    }

    const RemainingAmountAfterCommision = piAmount - commisionAmount;
    const TotalWorkers =
      barCodeAccountData.mainWorkerAccounts.length +
      barCodeAccountData.splitWorkerAccount.length;
    const splitAmountToWorkers = RemainingAmountAfterCommision / TotalWorkers;

    if (barCodeAccountData.mainWorkerAccounts.length) {
      barCodeAccountData.mainWorkerAccounts.forEach((itm) => {
        destinationTransferData.push({
          amount: Number(Math.round(splitAmountToWorkers)),
          currency: "USD",
          destination: itm,
        });
      });
    }
    if (barCodeAccountData.splitWorkerAccount.length) {
      barCodeAccountData.splitWorkerAccount.forEach((itm) => {
        destinationTransferData.push({
          amount: splitAmountToWorkers,
          currency: "USD",
          destination: itm,
        });
      });
    }
    let tData = { destination_accounts: destinationTransferData };
    console.log(tData,'tDatatDatatDatatDatatDatatDatatData')
    const transferRes = await API.PaymentServices.createTransfer(tData);
    console.log(transferRes, "transferRes--------------------------");
    if (transferRes?.code === CONST.STATUS_CODE.CREATED) {
      const tData = transferRes.data.map((itm) => {
        console.log(itm.amount,'itm.amount')
        return {
          ...itm,
          payment_status: "SUCCESS",
          created: new Date(itm.created * 1000).toISOString(),
          // amount: Number(itm.amount / 100),
          amount:Number(Math.round(itm.amount))
          // amount:
          //   'USD' +
          //   ' ' +
          //   Number(itm.amount / 100).toLocaleString('en-IN'),
        };
      });
      let piCreatedTime = piRes?.paymentIntent?.created;
      const transData = {
        user_id: barCodeAccountData?.id || 3,
        worker_id: barCodeAccountData?.workerDetails?.worker_id,
        source_account: "0077",
        payment_tip_type:
          barCodeAccountData?.workerDetails?.payment_tip_type || "QR",
        stripe_transaction: {
          amount: piAmount / 100,
          payment_status: "SUCCESS",
          id: piRes?.paymentIntent?.id,
          created: new Date(piCreatedTime * 1).toISOString(),
          source_type: piRes?.paymentIntent?.payment_method_types[0],
        },
        data: tData,
      };
      console.log(transData, "------transData----------");
      const res = await API.PaymentServices.createTransaction(transData);
      console.log(res, "---------transac history res--------");
      const getMainWorkerTransactionDetail = tData.filter(
        (itm) => itm.destination === barCodeAccountData.mainWorkerAccounts[0]
      );
      let createdDate = getMainWorkerTransactionDetail[0]?.created;
      let mainWorkeramount = getMainWorkerTransactionDetail[0]?.amount;
      let transResDataMainWorker = {
        amount: mainWorkeramount,
        name: barCodeAccountData?.workerDetails?.name,
        mobileNumber: barCodeAccountData?.workerDetails?.mobileNumber,
        date:
          new Date(createdDate).getDate() +
          " " +
          new Date(createdDate).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        transactionId: randomNum,
      };
      console.log(transResDataMainWorker, "transResDataMainWorker");
      // setWorkerTransactionData({
      //   amount: mainWorkeramount,
      //   name: barCodeAccountData?.workerDetails?.name,
      //   mobileNumber: barCodeAccountData?.workerDetails?.mobileNumber,
      //   date:
      //     new Date(createdDate).getDate() +
      //     " " +
      //     new Date(createdDate).toLocaleDateString("en-US", {
      //       month: "short",
      //       year: "numeric",
      //       hour: "2-digit",
      //       minute: "2-digit",
      //     }),
      //   transactionId: randomNum,
      // });

      setIsProcessing(false);
      navigate("/success-screen", {
        state: {
          amount: tipAmount/100 ,
          name: barCodeAccountData?.workerDetails?.name,
          currency:currency,
          mobileNumber: barCodeAccountData?.workerDetails?.mobileNumber,
          date:
            new Date(createdDate).getDate() +
            " " +
            new Date(createdDate).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          transactionId: randomNum,
        },
      });
    } else {
      navigate("/failure-screen", {
        state: {
          amount: tipAmount /100,
          name: barCodeAccountData?.workerDetails?.name,
          currency:currency,
          mobileNumber: barCodeAccountData?.workerDetails?.mobileNumber,
          date:
            new Date().getDate() +
            " " +
            new Date().toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          transactionId: randomNum,
          worker_id: barCodeAccountData?.workerDetails?.worker_id,
        },
      });
    }

    // setIsProcessing(false);
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
