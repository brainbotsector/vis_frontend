export const getTotalSalesOverTime = async () => {
    const response = await fetch('http://localhost:5000/api/sales-over-time');
    return response.json();
};

export const getSalesGrowthRate = async () => {
    const response = await fetch('http://localhost:5000/api/sales-growth-rate');
    return response.json();
};

export const getNewCustomersOverTime = async () => {
    const response = await fetch('http://localhost:5000/api/new-customers-over-time');
    return response.json();
};

export const getRepeatCustomers = async () => {
    const response = await fetch('http://localhost:5000/api/repeat-customers');
    return response.json();
};

export const getGeographicalDistribution = async () => {
    const response = await fetch('http://localhost:5000/api/geographical-distribution');
    return response.json();
};

export const getCustomerLifetimeValue = async () => {
    const response = await fetch('http://localhost:5000/api/customer-lifetime-value');
    return response.json();
};
