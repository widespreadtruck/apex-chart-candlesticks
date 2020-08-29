import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Loader from 'react-loader-spinner';
import Button from './Button';

const styles = {
  loader: {
    "width": "100vw",
    "text-align": "center",
    "margin-top": 100,
  }
}
const App = () => {
  const [series, setSeries] = useState([]);
  const [periodToDisplay, setPeriodToDisplay] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
      animations: {
        enabled: false,
        easing: 'easeinout',
        speed: 3000,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        },
      },
      toolbar: {
        show: false,
      }
    },
    title: {
      text: 'BTC/USD Price',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };
  

  // const numOfDaysBack = 365;
  const getCoinData = async (numOfDaysBack) => {
    setIsLoading(true);
    const url = `https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=${numOfDaysBack}`;

    try {
      const coinResponse = await fetch(url);
      const data = await coinResponse.json();
      prepData(data);
      setIsLoading(false);
    } catch (e) {
      prompt(e);
    }
  };
  
  
  const prepData = (data) => {
    let dataArr = [{
      data: []
    }];

    for (let i = 0; i < data.length; i++) {
      const date = new Date(data[i].[0]);
      const singlePrice = data[i];
      const prices = [singlePrice.[1], singlePrice.[2], singlePrice.[3], singlePrice.[4]];
  
      dataArr[0].["data"].push({
          x: date,
          y: prices,
        }
      );
    };

    setSeries(dataArr);
  };

  useEffect( () => {
    getCoinData(periodToDisplay);
  }, [periodToDisplay]);

  const updatePeriod = (days) => {
    console.log(days);
    setPeriodToDisplay(days);
  }



    return (
      <>
        <div id="chart">
        {
          isLoading
              ? <Loader style={styles.loader} type="ThreeDots" color="#009FFF" height={80} width={80} />
          : <ReactApexChart
            options={options}
            series={series}
            type="candlestick"
            height={350} />
        }
        </div>
        {
          isLoading
          ? ''
          : <div>
          <Button setPeriodToDisplay={updatePeriod} period={1}>1 Day</Button>
          <Button setPeriodToDisplay={updatePeriod} period={7}>7 Days</Button>
          <Button setPeriodToDisplay={updatePeriod} period={14}>14 Days</Button>
          <Button setPeriodToDisplay={updatePeriod} period={30}>30 Days</Button>
          <Button setPeriodToDisplay={updatePeriod} period={90}>90 Days</Button>
          <Button setPeriodToDisplay={updatePeriod} period={180}>180 Days</Button>
          <Button setPeriodToDisplay={updatePeriod} period={365}>365 Days</Button>
          <Button setPeriodToDisplay={updatePeriod} period='max'>Max</Button>
        </div>
        }
        
      </>
    )
}
export default App;
