import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { Spinner } from "./components/Spinner";
import CurrencySelector from "./components/CurrencySelector";
import SatsDisplay from "./components/SatsDisplay";
import CurrencyInput from 'react-currency-input-field';


function App() {
  const currencies = ["USD", "EUR"];
  const [selectedOption, setSelectedOption] = useState(currencies[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [sats, setSats] = useState(0);
  const [satsPerFiat, setSatsPerFiat] = useState(0);
  const [fiatExchangeRate, setFiatExchangeRate] = useState(0);
  const [fiat, setFiat] = useState(1);
  const [className, setClassName] = useState('');

  const limit = 100000000;
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
      setSats(numSats);
      setIsLoading(false);
    };
    getData();
  }, []);

  const onBuckChange = (value, _, values) => {
    if (Number.isNaN(Number(value))) {
      setSats(satsPerFiat);
      setClassName("");
      return;
    }
    let price = parseInt(value * fiatExchangeRate);
    if (Number(value) > limit) {
      setClassName('is-invalid');
      setSats("Error");
      return;
    }
    setSats(price);
    setClassName("is-valid");
  }

  return (
    <div className="container-fluid">
      <div className="container mt-4">
        <img
          className="center"
          src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
          alt="BTC"
        />
      </div>
      <div className="container mt-4">
        {isLoading ? (
            <Spinner />
          ) : (
            <>
              <SatsDisplay
                sats={sats}
                //msg="(Sats per cuck-buck)"
                msg=""
              />
              <div className="container-sm">
                <div className="row justify-content-center">
                  <form className="needs-validation col-md-4 text-center display-1">
                    <CurrencyInput
                      prefix={prefix}
                      placeholder="Enter an amount in cuck-bucks"
                      className={`form-control ${className}`}
                      onValueChange={onBuckChange}
                    />
                  </form>
                </div>
              </div>
            </>
        )}
      </div>
    </div>
  );
}

export default App;
