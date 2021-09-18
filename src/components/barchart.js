import { Tooltip } from 'chart.js';
import React from 'react'
import {Bar,Chart} from 'react-chartjs-2'
let table=[
  {
    "Day Of Week": "Saturday",
    "Total Persons": 19251,
    "Young Driver": 2238
  },
  {
    "Day Of Week": "Friday",
    "Total Persons": 26380,
    "Young Driver": 3391
  },
  {
    "Day Of Week": "Thursday",
    "Total Persons": 26070,
    "Young Driver": 3357
  },
  {
    "Day Of Week": "Wednesday",
    "Total Persons": 25418,
    "Young Driver": 3273
  },
  {
    "Day Of Week": "Tuesday",
    "Total Persons": 24467,
    "Young Driver": 3103
  },
  {
    "Day Of Week": "Monday",
    "Total Persons": 23205,
    "Young Driver": 2959
  },
  {
    "Day Of Week": "Sunday",
    "Total Persons": 21934,
    "Young Driver": 2764
  }
]
const BarChart =()=>{
    return <div>
        <Bar
            data={{
                labels: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                datasets: [{
                    label: 'Accidents No.',
                    data: table,
                    backgroundColor: 'rgb(44,127,184)',
                    parsing: {
                        xAxisKey: 'Total Persons',
                        yAxisKey: 'Day Of Week'
                      },
                    borderWidth: 1
                    
                }]
            }}

        options={
            {maintainAspectRation: true,
            indexAxis: 'y',
            scales: {
                x: {
                    grid: {
                    },
                    ticks: {
                        callback: value => (value/1000) + 'K'
                    },
                    title: {
                    }
                  },
                  y: {
                    grid: {
                    },
                    ticks: {
                    
                    },
                    title: {
                    }
                  }
                  
    
            },
            
            options: {
                onClick: e => {
                // DEBUG: Send e to the JavaScript console so we can inspect it
                console.log('In onClick', e);
          
                // Find the row corresponding to the bar that was clicked
                let canvasPosition = Chart.helpers.getRelativePosition(e, e.chart);
                let barNumber = e.chart.scales.x.getValueForPixel(canvasPosition.x);
                let row = table[barNumber];
          
                // Determine the URL of the Wikipedia REST API page
                // (Learn more: https://en.wikipedia.org/api/rest_v1/ )
                let Driverno = table[row['Young Driver']];
     
          
              },
              scales: {
          
                x: {
                  grid: {
                  },
                  ticks: {
                  },
                  title: {
                  }
                },
                y: {
                  grid: {
                  },
                  ticks: {
                  callback: value => (value * 100) + '%'
                  },
                  title: {
                  }
                }
              },
              animation: {
              },
              plugins: {
                legend: {
                display: true
                
                },
                title: {
                display: true,
                text:"Accidents No"
                },
                tooltip: {
                callbacks: {
                        label: context => Number(context.parsed.y * 100).toFixed(1) + '%',
                  },
              callbacks: {
                        // title: context => Driverno
                  }
              
              
                }
              }
            }
            ,
            plugins: {
                legend: {
                display: false
                
                },
                title: {
                display: true,
                text:"Accidents by Week"
                },
                tooltip: {
                callbacks: {
                  label: function(context) {
                    var label = ' ';
                    var label2 = ' ';
                    label2 += ' Total Accidents: ' || '\\n';
                    label2+= context.raw['Total Persons'] || ' ';

  
                    if (label) {
                        label += ' Young Drivers: ' || '\\n\\';
                    }
                    if (context.parsed.y !== null) {
                      
                        label += context.raw['Young Driver'];
                    }
                    
                    return [label2,label];
                }
                        
                  }
              
                }
              }
            
        }}
        />
    </div>
}

export default BarChart;