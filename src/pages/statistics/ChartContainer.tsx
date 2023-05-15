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
import { Chart } from 'react-chartjs-2';
import Carousel from 'react-material-ui-carousel';

import Circle from '@/components/common/Circle';
import { useRecoilState } from 'recoil';
import { statisticsResultState } from '@/store/statistics';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, ...registerables);

const options = {
  responsive: true,
  showTooltips: true,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      formatter: (val: any, ctx: any) => {
        if (val === 0) {
          return '';
        }
    
        const hours = Math.floor(val / 60);
        const minutes = val % 60;

        return minutes === 0 ?
          `${ctx.chart.data.labels[ctx.dataIndex]}\n${hours}시간` :
          `${ctx.chart.data.labels[ctx.dataIndex]}\n${hours}시간 ${minutes}분`;
      },
    },
  },
  showToolTip: true,
};

const ChartContainer = () => {
  const [statisticsResult, setStatisticsResult] = useRecoilState(
    statisticsResultState,
  );
  const [totalSum, setTotalSum] = useState(0);
  // const [chartData, setChartData] = useState()

  const carouselOption = {
    autoPlay: false,
    // animation: 'slide',
    duration: 0,
    fullHeightHoverWrapper: {
      height: '100%',
      top: '0',
    },
  };

  const pieChartRef = useRef<ChartJS>(null);
  const handleClickPieChart = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = pieChartRef;

    if (!chart) {
      return;
    }
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
      {/* <Carousel {...carouselOption}> */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '45%',
            textAlign: 'center',
            color: '#FF7184',
            fontSize: '16px',
            fontWeight: '700',
          }}
        >
          총 <br />
          {totalSum % 60 === 0 ? 
            `${Math.floor(totalSum / 60)}시간` :
            `${Math.floor(totalSum / 60)}시간 ${totalSum % 60}분`
          }
        </Box>
        <Chart
          ref={pieChartRef}
          type={'doughnut'}
          data={{
            labels: [...statisticsResult.map((data) => data.categoryName)],
            datasets: [
              {
                data: [...statisticsResult.map((data) => data.timeSum )],
                backgroundColor: [
                  ...statisticsResult.map((data) => `${data.categoryColor}45`),
                ],
                borderColor: [
                  ...statisticsResult.map((data) => `${data.categoryColor}`),
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={options}
          onClick={handleClickPieChart}
          plugins={[ChartDataLabels]}
        />
      </Box>
      {/* <Box
          sx={{ height: '400px', display: 'flex', justifyContent: 'center' }}
        >
          <Chart
            ref={barChartRef}
            type={'bar'}
            data={barData}
            options={options}
            onClick={handleClickBarChart}
          />
        </Box> */}
      {/* </Carousel> */}

      {statisticsResult.map((data, idx) => (
        <Box
          key={idx}
          sx={{
            padding: '8px',
            display: 'flex',
            justifyContent: 'space-evenly',
            marginTop: '8px',
            alignItems: 'flex-end',
          }}
        >
          <Circle color={data.categoryColor} size={40} />
          <Box sx={{ width: '60%' }}>
            <Typography>{data.categoryName}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={data.timeSum }
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    '&.MuiLinearProgress-root': {
                      backgroundColor: '#F5F5F5 !important',
                    },
                    '& > .MuiLinearProgress-bar': {
                      backgroundColor: data.categoryColor,
                    },
                  }}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {`${totalSum > 0 ? Math.round(((data.timeSum) / totalSum) * 100) : 0}%`}
              </Typography>
              </Box>
            </Box>
          </Box>
          <Typography>
            {data.timeSum % 60 === 0 ? 
            `${Math.floor(data.timeSum / 60)}시간` :
            `${Math.floor(data.timeSum / 60)}시간 ${data.timeSum % 60}분`
            }
          </Typography>
        </Box>
      ))}
    </>
  );
};

export default ChartContainer;
