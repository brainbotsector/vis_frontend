import React, { useState } from 'react';
import TotalSalesChart from './components/TotalSalesChart';

const App = () => {
  const [interval, setInterval] = useState('monthly');

  return (
    <div>
      <h1>Sales Dashboard</h1>
      <div>
        <button onClick={() => setInterval('daily')}>Daily</button>
        <button onClick={() => setInterval('monthly')}>Monthly</button>
        <button onClick={() => setInterval('quarterly')}>Quarterly</button>
        <button onClick={() => setInterval('yearly')}>Yearly</button>
      </div>
      <TotalSalesChart interval={interval} />
    </div>
  );
};

export default App;
