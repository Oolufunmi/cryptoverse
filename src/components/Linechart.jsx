import React from 'react';
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';





const Linechart = ({coinHistory}) => {
    const coinPrice = [];
    const coinTimestamp = [];
    for(let i=0;i<coinHistory?.length;i+=1) {
        coinPrice.push(coinHistory[i].price);
        coinTimestamp.push(new Date(coinHistory[i].timestamp*1000).toLocaleDateString());
    }


    console.log(coinHistory);
    const data = {
        labels: coinTimestamp,
        datasets: [
          {
            label: "Coin Price",
            data: coinPrice,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          }
        ]
      };

  return (
    <Line data={data} />
  )
}

export default Linechart