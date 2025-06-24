// src/hooks/useRazorpay.js
import { useState, useCallback } from "react";
import { createRechargeOrder, confirmRechargeSuccess } from "../services/centralApi";

const useRazorpay = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiatePayment = useCallback(async (amount, onSuccess) => {
    setLoading(true);

    setError(null);

    try {
      // Load Razorpay script dynamically
      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    console.log(script)

      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
      });

      // Create order

      const orderResponse = await createRechargeOrder(amount);
const data = await orderResponse.json();    
console.log(data)  
const orderId  =data.data.orderId; // Expect { data: { orderId: "order_xxx" } }
console.log("orderId passed to Razorpay:", orderId);

      // Initialize Razorpay
      const options = {
        key: "rzp_live_k3WJT9MLidyt3i",
        amount: amount * 100, // Convert to paise
        currency: "INR",
        order_id: orderId,
        handler: async (response) => {
          try {
console.log(response,orderId)
            const paymentData = {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              amount,
            };
            const result = await confirmRechargeSuccess(paymentData);
            onSuccess(result.data); // Pass updated wallet data to callback
          } catch (err) {
            setError(err.message || "Payment confirmation failed");
          }
        },
        prefill: {
          name: "User Name", // Replace with user data from fetchMyProfile if available
          email: "user@example.com",
          contact: "+919837960625",
        },
        theme: {
          color: "#FF9933",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        setError(response.error.description || "Payment failed");
      });
      rzp.open();
    } catch (err) {
      setError(err.message || "Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  }, []);

  return { initiatePayment, loading, error };
};

export default useRazorpay;