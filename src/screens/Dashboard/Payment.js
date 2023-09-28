import React, { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
// import { useLocation } from "react-router";

const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  // const { state } = useLocation();
  // console.log(state.tipAmount, "state");
  useEffect(() => {
    // Load Stripe with your public key
    setStripePromise(
      loadStripe(
        "pk_test_51NdHL7D8sIpXeskQeT6CpplrqrGVFHb5npUb6p44xjXwavDqBNefgfC9VW4VqTKnFJ7bB5bK0OJOwXFfKBu6O9e4006pkHpPmK"
      )
    );
  }, []);

  useEffect(() => {
    // Fetch client secret from your server
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post(
          "https://tipmeapi.duceapps.com/api/user/createPayment",
          {
            customer_id: "cus_OiHo8MBluC2r1S",
            // amount: Number(state.tipAmount) * 100,
            currency: "USD",
          }
        );
        console.log(response.data.paymentIntent);
        setClientSecret(response?.data?.paymentIntent);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, []);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Payment;
