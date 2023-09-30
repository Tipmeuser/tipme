import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router";

const Payment = () => {
  const { state } = useLocation();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentsendDetails, setPaymentSendDetails] = useState({});

  console.log(state, "statestatestatestatestate");

  useEffect(() => {
    setClientSecret(state?.payment?.paymentIntent);
    setPaymentSendDetails(state);
    const loadStripeClient = async () => {
      const stripe = await loadStripe(
        "pk_test_51NdHL7D8sIpXeskQeT6CpplrqrGVFHb5npUb6p44xjXwavDqBNefgfC9VW4VqTKnFJ7bB5bK0OJOwXFfKBu6O9e4006pkHpPmK"
      );
      console.log(stripe, "strip");
      setStripePromise(stripe);
    };
    loadStripeClient();
  }, []);
  console.log(stripePromise, "stripePromisestripePromise");

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm data={paymentsendDetails} />
        </Elements>
      )}
    </>
  );
};

export default Payment;
