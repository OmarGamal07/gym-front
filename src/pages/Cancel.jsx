import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Cookies from "universal-cookie";

function Cancel() {
  const cookies = new Cookies();
  useEffect(() => {
    setTimeout(() => {
      cookies.remove("payment", { path: "/" });
      cookies.remove("subId", { path: "/" });
      window.location.href = "https://main.d1opj2at0btc60.amplifyapp.com/";
    }, 3000);
  }, []);
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
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <img
          width={"810px"}
          height={"450px"}
          src="/assets/PaymentFailure.png"
          alt="PaymentFailure"
        />
      </Box>
    </Box>
  );
}

export default Cancel;
