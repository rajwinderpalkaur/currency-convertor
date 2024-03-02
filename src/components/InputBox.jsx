import { useId, useRef } from "react";

function InputBox({
  label = "",
  placeHolder = "",
  amount,
  updateAmount,
  currency,
  updateCurrency,
  options = [],
  onCurrencyChange,
}) {
  const id = useId();
  const currencyInput = useRef(null);
  const selectInput = () => {
    currencyInput.current?.select();
  };
  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex`}>
      <div className="w-1-2">
        <label htmlFor={id} className="text-black/40 mb-2 inline-block">
          {label}
        </label>
        <input
          id={id}
          type="number"
          className="w-full bg-gray-50 p-1.5 rounded"
          placeholder={placeHolder}
          value={amount}
          ref={currencyInput}
          onChange={(e) => {
            updateAmount && updateAmount(Number(e.target.value));
          }}
          onKeyUp={onCurrencyChange}
          onFocus={selectInput}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={currency}
          onChange={(e) => updateCurrency && updateCurrency(e.target.value)}
        >
          {options.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
