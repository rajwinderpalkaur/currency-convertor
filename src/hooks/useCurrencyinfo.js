import { useState, useEffect } from "react";

const useCurrencyInfo = (currency) => {
  const [currencyData, updateCurrencyData] = useState({});

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        updateCurrencyData(data[currency]);
      });
  }, [currency]);
  console.log("Hook is running");
  return currencyData;
};

export default useCurrencyInfo;
