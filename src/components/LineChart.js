import React from 'react'

import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
  datasets: [
    {
      label: "2020-Estimate",
      
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      data: [2361,2572,2730,2617,2702,2348],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "2019",
      data: [2496,2656,2643,2562,2719,2348,2382,2288,2178,2602,2410,2562],
      fill: false,
      borderColor: ""
    },
    {
      label: "2018",
      data: [2479,2675,2859,2521,2641,2444,2504,2641,2300,2634,2537,2549],
      fill: false,
      borderColor: "#742774"
    },
    {
      label: "2017",
      data: [2465,2861,3180,2742,2870,2617,2490,2480,2205,2801,2889,2728],
      fill: false,
      borderColor: "#2ca25f"
    },
    {
      label: "2016",
      data: [2879,3382,3316,3363,3370,3025,3168,3100,2764,3121,3124,3013],
      fill: false,
      borderColor: "#fdae6b"
    },

  ]

  
  
};

const LineChart =()=> {
  return (
    <div className="App">
      <Line data={data} 
      options={{
        interaction: {
          mode: "index",
          intersect: false,
        },

        plugins: {
          legend: {
            display: true,
            position: "right",
            align: "start",
            labels: {
              usePointStyle: true,
              boxWidth: 6,
            },
            title: {
              display: true,
              text: "Accidents Timeline",
            },
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                  var label = context.dataset.label || ' ';

                  if (label) {
                      label += ' Accidents: ';
                  }
                  if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat().format(context.parsed.y);
                  }
                  
                  return label;
              }
            }
          },
          hover: {
            mode: "dataset",
            intersect: true,
          },
        },
        responsive: true,
        title: {
          display: false,
        },

      }}
      
      />
    </div>
  );
}

export default LineChart;