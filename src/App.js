import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { Spinner } from "./components/Spinner";
import CurrencySelector from "./components/CurrencySelector";
import SatsDisplay from "./components/SatsDisplay";
import CurrencyInput from 'react-currency-input-field';


function App() {
  const defaultBuckText = 'How many sats in a cuck-buck?';
  const currencies = ["USD", "EUR"];
  const [selectedOption, setSelectedOption] = useState(currencies[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [sats, setSats] = useState(0);
  const [satsPerFiat, setSatsPerFiat] = useState(0);
  const [fiatExchangeRate, setFiatExchangeRate] = useState(0);
  const [fiat, setFiat] = useState(1);
  const [className, setClassName] = useState('');
  const [buckText, setBuckText] = useState(defaultBuckText);

  const limit = 10000000000;
  const prefix = '$'; // '£'

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      let response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=USD`
      );
      setFiatExchangeRate(response.data.bitcoin.usd)
      let numSats = parseInt(100000000 / response.data.bitcoin.usd)
      setSatsPerFiat(numSats);
      setSats(numSats.toLocaleString());
      setIsLoading(false);
    };
    getData();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
  }

  const onBuckChange = (value, _, values) => {
    if (Number.isNaN(Number(value))) {
      setSats(satsPerFiat.toLocaleString());
      setClassName("");
      setBuckText(defaultBuckText);
      return;
    }
    if (Number(value) > limit) {
      setClassName('is-invalid');
      setSats("Error");
      return;
    }
    let numSats = parseInt(value * (100000000 / fiatExchangeRate));
    setSats(numSats.toLocaleString());
    let cuckbuck = (value === 1) ? 'cuck-buck' : 'cuck-bucks';
    setBuckText(`How many sats in ${Number(value).toLocaleString()} ${cuckbuck}?`);
    setClassName("is-valid");
  }

  return (
    <div className="container">
      <div className="row vertical-center">
        <div className="col-12 d-flex justify-content-center">
          <img
            className="center"
            src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
            alt="BTC"
          />
        </div>
        <div className="col">
          {isLoading ? (
              <Spinner />
            ) : (
              <>
                <div className="container-fluid">
                  <div className="row justify-content-center">
                    <div className="col-md text-center display-6">
                      <p>{buckText}</p>
                    </div>
                  </div>
                </div>
                <SatsDisplay
                  sats={sats}
                  msg=""
                />
                <div className="container-fluid">
                  <div className="row justify-content-center">
                    <div className="col-md-4">
                      <form className="needs-validation display-1" onSubmit={onSubmit}>
                        <CurrencyInput
                          prefix={prefix}
                          placeholder="Enter an amount in cuck-bucks"
                          className={`form-control ${className}`}
                          onValueChange={onBuckChange}
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
