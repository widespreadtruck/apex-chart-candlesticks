import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        chart: {
          type: 'candlestick',
          height: 350
        },
        title: {
          text: 'CandleStick Chart',
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
      },
    };

  };


  getCoinData = async (numOfDaysBack) => {
    const url = `https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=${numOfDaysBack}`;
    try {
      const coinResponse = await fetch(url);
      const data = await coinResponse.json();
      this.prepData(data);
    } catch (e) {
      prompt(e);
    }
  };
  
  
  prepData = (data) => {
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
    this.setState({
      series: dataArr,
    });
  };

  componentDidMount() {
    this.getCoinData(30);

  }



  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="candlestick"
          height={350} />
      </div>
    )
  };
}
export default App;
