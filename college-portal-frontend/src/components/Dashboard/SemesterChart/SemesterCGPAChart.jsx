import React from 'react';
import ReactApexChart from 'react-apexcharts';

const SemesterCGPAChart = () => {
  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      zoom: { enabled: false },
      background: 'transparent',
    },
    theme: {
      mode: 'dark',
    },
    grid: {
      borderColor: 'rgba(255,255,255,0.1)',
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 5,
      colors: ['#22d3ee'],
      strokeColors: '#22d3ee',
    },
    xaxis: {
      categories: ['1', '2', '3', '4', '5', '6','7','8'],
      labels: { style: { colors: '#ccc' } },
    },
    yaxis: {
      min: 0,
      max: 10,
      tickAmount: 5,
      labels: { style: { colors: '#ccc' } },
    },
    tooltip: {
      theme: 'dark',
    },
    colors: ['#22d3ee'],
  };

  const chartSeries = [
    {
      name: 'CGPA',
      data: [6.8, 7.2, 7.0, 8.1, 8.4, 9.0],
    },
  ];

  return (
    <div style={{ background: '#1e2230', padding: '1rem', borderRadius: '12px' }}>
      <h5 style={{ color: '#22d3ee', marginBottom: '0.5rem' }}>Semester-wise CGPA</h5>
      <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={200} />
    </div>
  );
};

export default SemesterCGPAChart;
