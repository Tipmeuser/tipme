import React, { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router";

const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { state } = useLocation();
  console.log(state.tipAmount, "state");
  useEffect(() => {
    // Load Stripe with your public key
    setStripePromise(loadStripe(""));
  }, []);

  useEffect(() => {
    // Fetch client secret from your server
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post(
          "https://tipmeapi.duceapps.com/api/user/createPayment",
          {
            customer_id: "cus_OiHo8MBluC2r1S",
            amount: Number(state.tipAmount) * 100,
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
