import React from 'react';
import Chart from 'react-apexcharts';


const AttendanceChart = ({ percentage, totalDays, attendedDays }) => {
  const chartOptions = {
    chart: {
      type: 'radialBar',
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: '24px',
            color: '#22d3ee',
            offsetY: 5,
          },
        },
        track: {
          background: 'hsla(296, 90%, 51%, 1.00)',
        },
      },
    },
    colors: ['#22d3ee'],
    labels: ['Attendance'],
  };

  const chartSeries = [percentage];

  return (
    <div className="attendance-card card p-3 text-white" style={{ background: '#1e2230', borderRadius: '12px' }}>

      <div className="d-flex justify-content-center">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="radialBar"
          height={150}
          width={150}
        />
      </div>

      <div className="attendance-stats mt-3 fw-bold" style={{ fontSize: '0.85rem' }}>
        <div className="d-flex justify-content-between">
          <span>Total Days Conducted</span>
          <span>{totalDays}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Total Days Attended</span>
          <span>{attendedDays}</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
