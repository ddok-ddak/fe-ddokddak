import { Container, Box, Typography, LinearProgress } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  registerables,
} from 'chart.js';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Chart, getElementsAtEvent } from 'react-chartjs-2';
import Carousel from 'react-material-ui-carousel';

import Circle from '@/components/common/Circle';
import { useRecoilState } from 'recoil';
import { statisticsResultState } from '@/store/statistics';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { isContext } from 'vm';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, ...registerables);

const hourFormatter = (time: number) => {
  if (!time) {
    return '';
  }
  const h = Math.floor(time / 60);
  return h > 0 ? h : 0;
};

const minuteFormatter = (time: number) => {
  if (!time) {
    return '';
  }
  const m = Math.floor(time % 60);
  return m > 0 ? m : 0;
};

const customBackground = {
  id: 'customBackgroundColor',
  beforeDraw: (chart: any, args: any, options: any) => {
    const { ctx } = chart;
    if (!ctx) {
      return true;
    }
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color;
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

const ChartContainer = () => {
  const [statisticsResult, setStatisticsResult] = useRecoilState(
    statisticsResultState,
  );
  const [totalSum, setTotalSum] = useState(0);
  const [showTotalSum, setShowTotalSum] = useState(true);

  const carouselOption = {
    autoPlay: false,
    duration: 0,
    fullHeightHoverWrapper: {
      height: '100%',
      top: '0',
    },
    indicatorContainerProps: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    indicatorIconButtonProps: {
      style: {
        transform: 'scale(0.8)',
        padding: '3px',
        color: '#FFDCE1',
      },
    },
    activeIndicatorIconButtonProps: {
      style: {
        color: '#FF7184',
      },
    },
  };

  const pieChartRef = useRef<ChartJS>(null);
  const barChartRef = useRef<ChartJS>(null);

  const handleClickPieChart = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = pieChartRef;
    if (!chart) {
      return;
    }
    const target = getElementsAtEvent(chart, event);
    setShowTotalSum(!target.length);

    // TODO: show done list of the selected category below
  };

  const handleClickBarChart = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = pieChartRef;
    if (!chart) {
      return;
    }

    // TODO: show done list of the selected category below
  };

  const resultData = [...statisticsResult.filter((data) => data.timeSum > 0)];
  const chartData = {
    labels: resultData.map((data) => data.categoryName),
    datasets: [
      {
        data: resultData.map((data) => data.timeSum),
        backgroundColor: resultData.map((data) => `${data.categoryColor}`),
        borderWidth: 0,
      },
    ],
  };

  const pieChartOptions = {
    layout: {
      padding: {
        top: 36,
        bottom: 25,
      },
    },
    responsive: true,
    showTooltips: true,
    hoverOffset: 25,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: '#FFFFFF',
        labels: {
          title: {
            formatter: (val: any, ctx: any) => {
              return `${ctx.chart.data.labels[ctx.dataIndex]}\n`;
            },
            font: {
              weight: 'bold',
              size: 17,
            },
          },
          value: {
            formatter: (val: any) => {
              if (!totalSum) {
                return '';
              }
              return `\n${Math.round((val * 100) / totalSum)}%`;
            },
            font: {
              size: 14,
            },
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const rawData = ctx.raw;
            return (
              hourFormatter(rawData) + '시간 ' + minuteFormatter(rawData) + '분'
            );
          },
        },
      },
      customBackgroundColor: {
        color: '#FFF4F6',
      },
    },
  };

  const barChartOptions = {
    layout: {
      padding: {
        top: 80,
        bottom: 15,
        left: 0,
        right: 0,
      },
    },
    responsive: true,
    showTooltips: true,
    hoverOffset: 25,
    aspectRatio: 1,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        color: (context: any) => {
          // TODO: change clicked bar's data label color
          return context.clicked ? '#222222' : '#B7B7B7';
        },
        labels: {
          value: {
            formatter: (val: any) => {
              const hours = Math.floor(val / 60);
              const minutes = val % 60;
              return `${hours}시간\n ${minutes}분`;
            },
            font: {
              weight: 'bold',
              size: 14,
            },
          },
        },
      },
      customBackgroundColor: {
        color: '#FFF4F6',
      },
    },
    barThickness: 'flex',
    maxBarThickness: 20,
    borderRadius: {
      topLeft: 20,
      topRight: 20,
      bottomRight: 20,
      bottomLeft: 20,
    },
    borderSkipped: false,
    scales: {
      x: {
        ticks: {
          color: '#222222',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        display: false,
        min: -5,
      },
    },
  };

  useEffect(() => {
    const total = statisticsResult.reduce(
      (accumulator, currentValue) => accumulator + currentValue.timeSum,
      0,
    );
    setTotalSum(total);
  }, [statisticsResult]);

  return (
    <>
      {
        <Carousel {...carouselOption}>
          <Box
            sx={{
              display: 'flex',
              height: '274px',
              justifyContent: 'center',
              position: 'relative',
              width: '100%',
              backgroundColor: '#FFF4F6',
            }}
          >
            <Box
              sx={{
                display: showTotalSum ? 'flex' : 'none',
                flexDirection: 'column',
                position: 'absolute',
                height: '274px',
                top: '42%',
                textAlign: 'center',
                color: '#FF7184',
                fontSize: '16px',
                fontWeight: '700',
              }}
            >
              <span style={{ color: '#222222' }}>총 </span>
              <Box>
                <span>{hourFormatter(totalSum)}</span>
                <span style={{ color: '#222222' }}> 시간</span>
              </Box>
              <Box>
                <span>{minuteFormatter(totalSum)} </span>
                <span style={{ color: '#222222' }}>분</span>
              </Box>
            </Box>
            <Chart
              ref={pieChartRef}
              type={'doughnut'}
              data={chartData}
              options={pieChartOptions}
              onClick={handleClickPieChart}
              plugins={[ChartDataLabels, customBackground]}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: '#FFF4F6',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '57px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom: '3px solid white',
                color: '#222222',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              <span>총 </span>
              <span
                style={{
                  fontSize: '16px',
                  color: '#FF7184',
                }}
              >
                {hourFormatter(totalSum)}
              </span>
              <span>시간 </span>
              <span
                style={{
                  fontSize: '16px',
                  color: '#FF7184',
                }}
              >
                {minuteFormatter(totalSum)}
              </span>
              <span>분</span>
            </Box>
            <Box
              sx={{
                display: 'flex',
                height: '274px',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <Chart
                ref={barChartRef}
                type={'bar'}
                data={chartData}
                options={barChartOptions}
                onClick={handleClickBarChart}
                plugins={[ChartDataLabels, customBackground]}
              />
            </Box>
          </Box>
        </Carousel>
      }

      {statisticsResult
        .filter((data) => data.timeSum > 0)
        .map((data, idx) => (
          <Box
            key={idx}
            sx={{
              padding: '8px',
              display: 'flex',
              justifyContent: 'flex-start',
              marginTop: '8px',
              marginLeft: '12px',
              alignItems: 'flex-end',
            }}
          >
            <Circle color={data.categoryColor} size={40} />
            <Box sx={{ width: '60%', margin: '0px 10px 3px 10px' }}>
              <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                {data.categoryName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(data.timeSum * 100) / totalSum}
                    sx={{
                      height: 10,
                      '&.MuiLinearProgress-root': {
                        backgroundColor: '#F5F5F5 !important',
                        borderRadius: 5,
                      },
                      '& > .MuiLinearProgress-bar': {
                        backgroundColor: data.categoryColor,
                        borderRadius: 5,
                      },
                    }}
                  />
                </Box>
                {/* <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                  {`${
                    totalSum > 0
                      ? Math.round((data.timeSum / totalSum) * 100)
                      : 0
                  }%`}
                </Typography>
              </Box> */}
              </Box>
            </Box>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'center',
                flex: '8% 1 1',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {data.timeSum % 60 === 0
                ? `${Math.floor(data.timeSum / 60)}시간`
                : `${Math.floor(data.timeSum / 60)}시간 ${data.timeSum % 60}분`}
            </Typography>
          </Box>
        ))}
    </>
  );
};

export default ChartContainer;
