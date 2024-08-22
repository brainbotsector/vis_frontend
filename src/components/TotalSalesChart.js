import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const TotalSalesChart = ({ interval }) => {
  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [{
      label: 'Total Sales',
      data: [],
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
    }]
  });

  const chartRef = useRef(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/orders`) // Use environment variable for API base URL
      .then(response => {
        const orders = response.data;
        const processedData = processSalesData(orders, interval);
        setSalesData(processedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    // Use a local variable to store the chart instance
    const chartInstance = chartRef.current?.chartInstance;

    // Cleanup function to avoid canvas reuse issue
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [interval]);

  const processSalesData = (orders, interval) => {
    const sales = {};
    orders.forEach(order => {
      const totalPrice = parseFloat(order.total_price_set.shop_money.amount);
      const date = new Date(order.created_at);
      let key;

      switch (interval) {
        case 'daily':
          key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          break;
        case 'monthly':
          key = `${date.getFullYear()}-${date.getMonth() + 1}`;
          break;
        case 'quarterly':
          key = `${date.getFullYear()}-Q${Math.floor(date.getMonth() / 3) + 1}`;
          break;
        case 'yearly':
          key = `${date.getFullYear()}`;
          break;
        default:
          key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }

      if (!sales[key]) {
        sales[key] = 0;
      }
      sales[key] += totalPrice;
    });

    const labels = Object.keys(sales);
    const data = Object.values(sales);

    return {
      labels,
      datasets: [{
        label: 'Total Sales',
        data,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      }]
    };
  };

  return (
    <div>
      <h2>Total Sales Over Time ({interval})</h2>
      <Line
        ref={chartRef}
        data={salesData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `$${context.raw.toFixed(2)}`;
                }
              }
            }
          }
        }}
      />
    </div>
  );
};

export default TotalSalesChart;



// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// // Register required Chart.js components
// ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// const TotalSalesChart = ({ interval }) => {
//   const [salesData, setSalesData] = useState({
//     labels: [],
//     datasets: [{
//       label: 'Total Sales',
//       data: [],
//       borderColor: 'rgba(75,192,192,1)',
//       backgroundColor: 'rgba(75,192,192,0.2)',
//     }]
//   });

//   const chartRef = useRef(null);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/orders') // Replace with your actual endpoint
//       .then(response => {
//         const orders = response.data;
//         const processedData = processSalesData(orders, interval);
//         setSalesData(processedData);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });

//     // Cleanup function to avoid canvas reuse issue
//     return () => {
//       if (chartRef.current) {
//         const chartInstance = chartRef.current.chartInstance;
//         if (chartInstance) {
//           chartInstance.destroy();
//         }
//       }
//     };
//   }, [interval]);

//   const processSalesData = (orders, interval) => {
//     const sales = {};
//     orders.forEach(order => {
//       const totalPrice = parseFloat(order.total_price_set.shop_money.amount);
//       const date = new Date(order.created_at);
//       let key;

//       switch (interval) {
//         case 'daily':
//           key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
//           break;
//         case 'monthly':
//           key = `${date.getFullYear()}-${date.getMonth() + 1}`;
//           break;
//         case 'quarterly':
//           key = `${date.getFullYear()}-Q${Math.floor(date.getMonth() / 3) + 1}`;
//           break;
//         case 'yearly':
//           key = `${date.getFullYear()}`;
//           break;
//         default:
//           key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
//       }

//       if (!sales[key]) {
//         sales[key] = 0;
//       }
//       sales[key] += totalPrice;
//     });

//     const labels = Object.keys(sales);
//     const data = Object.values(sales);

//     return {
//       labels,
//       datasets: [{
//         label: 'Total Sales',
//         data,
//         borderColor: 'rgba(75,192,192,1)',
//         backgroundColor: 'rgba(75,192,192,0.2)',
//       }]
//     };
//   };

//   return (
//     <div>
//       <h2>Total Sales Over Time ({interval})</h2>
//       <Line
//         ref={chartRef}
//         data={salesData}
//         options={{
//           responsive: true,
//           plugins: {
//             legend: {
//               position: 'top',
//             },
//             tooltip: {
//               callbacks: {
//                 label: function(context) {
//                   return `$${context.raw.toFixed(2)}`;
//                 }
//               }
//             }
//           }
//         }}
//       />
//     </div>
//   );
// };

// export default TotalSalesChart;
