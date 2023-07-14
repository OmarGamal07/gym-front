import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { Box } from "@mui/material";
import Cookies from "universal-cookie";
import { ConfirmPaymentHandler } from "./../apis/user/ConfirmPayment";

function Success() {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const [error, setError] = useState();
  const paymentId = queryParam.get("paymentId");
  const PayerID = queryParam.get("PayerID");
  const dispatch = useDispatch();
  const cookies = new Cookies();
  useEffect(() => {
    dispatch(
      ConfirmPaymentHandler({
        subId: cookies.get("subId"),
        paymentId,
        payerId: PayerID,
      })
    ).then((res) => {
      if (res.payload.data) {
        switch (res.payload.status) {
          case 200:
            setError(200);
            setTimeout(() => {
              cookies.remove("payment");
              cookies.remove("subId");
              window.location.href = "https://appgyms.com/";
            }, 3000);
            break;
          case 500 || 401:
            setError(500);
            cookies.remove("payment");
            cookies.remove("subId");
            window.location.href = "https://appgyms.com/";

            localStorage.removeItem("amount");
            break;
          case 400:
            cookies.remove("payment");
            cookies.remove("subId");
            setError(400);
            window.location.href = "https://appgyms.com/";
            localStorage.removeItem("amount");
          default:
            break;
        }
      }
    });
  }, [dispatch]);
  // paypal.payment.execute();
  return (
    <Box
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error === 200 ? (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <img
            width={"256px"}
            height={"256px"}
            src="/assets/PaymentSuccess.png"
            alt="PaymentSuccessful"
          />
          تمت العمليه بنجاح
        </Box>
      ) : error === 500 ? (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <img
            width={"810px"}
            height={"450px"}
            src="/assets/PaymentFailure.png"
            alt="PaymentFailure"
          />
          فشلت العمليه
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}

export default Success;
