import { useState } from "react";
import "./App.css";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyinfo";

function App() { 
  const [amountS, updateAmountS] = useState(0);
  const [currencyS, updateCurrencyS] = useState("usd");
  const [amountD, updateAmountD] = useState(0);
  const [currencyD, updateCurrencyD] = useState("inr");

  const currencyInfo = useCurrencyInfo(currencyS);
  const options = currencyInfo && Object.keys(currencyInfo);

  const swap = () => {
    updateAmountS(amountD);
    updateAmountD(amountS);
    updateCurrencyS(currencyD);
    updateCurrencyD(currencyS);
  };

  const convertSTOD = () => {
    updateAmountD(amountS * currencyInfo[currencyD]);
  };

  // conversion for desinationAmount to SourceAmount
  const currencyInfoDestination = useCurrencyInfo(currencyD);
  const convertDTOS = () => {
    updateAmountS(amountD * currencyInfoDestination[currencyS]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-lg mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="w-full mb-1 p-2 bg-gray-200 text-red-500 font-light text-sm rounded">
              <span className="font-medium">Note:</span> Currency Amount will
              not update upon change of currency type, you will need to click
              convert button to re-calculate values.
            </div>
            <div className="w-full mb-1.5">
              <InputBox
                label={"Source Currency"}
                placeHolder={"Amount"}
                amount={amountS}
                updateAmount={(amountS) => {
                  updateAmountS(amountS);
                }}
                currency={currencyS}
                updateCurrency={(currencyS) => updateCurrencyS(currencyS)}
                options={options}
                onCurrencyChange={convertSTOD}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                onClick={swap}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              >
                Swap
              </button>
            </div>
            <div className="w-full mb-1">
              <InputBox
                label={"Destination Currency"}
                placeHolder={"Amount"}
                amount={amountD}
                updateAmount={(amountD) => updateAmountD(amountD)}
                currency={currencyD}
                updateCurrency={(currencyD) => updateCurrencyD(currencyD)}
                options={options}
                onCurrencyChange={convertDTOS}
              />
            </div>
            <button
              type="submit"
              onClick={convertSTOD}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              {" "}
              Convert {currencyS.toUpperCase()} to {currencyD.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
