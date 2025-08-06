import React from 'react';
import ReactApexChart from 'react-apexcharts';

const SemesterMarksChart = () => {
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
      colors: ['#a78bfa'],
      strokeColors: '#a78bfa',
    },
    xaxis: {
      categories: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
      labels: { style: { colors: '#ccc' } },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: { style: { colors: '#ccc' } },
    },
    tooltip: {
      theme: 'dark',
    },
    colors: ['#a78bfa'],
  };

  const chartSeries = [
    {
      name: 'Marks (%)',
      data: [62, 75, 70, 84, 88, 95],
    },
  ];

  return (
    <div style={{ background: '#1e2230', padding: '1rem', borderRadius: '12px' }}>
      <h5 style={{ color: '#a78bfa', marginBottom: '0.5rem' }}>Semester-wise Marks</h5>
      <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={200} />
    </div>
  );
};

export default SemesterMarksChart;
