import { Box, Typography, LinearProgress } from '@mui/material';
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
import { useRecoilValue } from 'recoil';
import { periodTypeList, statisticsResultState } from '@/store/statistics';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { selectedPeriodType } from '@/store/statistics';
import DonutIcon from '@/icons/DonutIcon';
import BarIcon from '@/icons/BarIcon';
import { StatisticsDetail } from '@/api/statistics.api';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, ...registerables);

interface formattedTimeObject {
  time: string,
  hour: number, 
  minute: number, 
  hourUnit: string, 
  minuteUnit: string 
}

/**
 * convert time value into format
 * @param timeVal raw time value
 * @returns formatted time
 */
const timeFormatter = (timeVal: number): formattedTimeObject => {
  const hour = timeVal ? Math.floor(timeVal / 60) : 0;
  const minute = timeVal ? Math.floor(timeVal % 60) : 0;
  const hourUnit = '시간';
  const minuteUnit = '분';
  const time = timeVal ? (hour > 0 ? (hour + hourUnit) : '') + ' ' + (minute > 0 ? (minute + minuteUnit) : '') : '0시간';
  return {
    time,
    hour,
    minute,
    hourUnit,
    minuteUnit,
  };
};

/**
 * add postposition to the noun
 * @param noun noun
 * @returns postposition added noun
 */
const addPostposition = (noun: string) => noun + ((noun.charCodeAt(noun.length - 1) - 0xac00) % 28 ? '은' : '는');

/**
 * custom background plugin options
 */
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

let INITIAL_DATA: any[] = [];
let categoryData: any[] = [];

const ChartContainer = () => {
  const statisticsResult = useRecoilValue(statisticsResultState);
  const [categoryDetailData, setCategoryDetailData] = useState(statisticsResult);

  const periodType = useRecoilValue(selectedPeriodType);

  const [totalSum, setTotalSum] = useState(0);
  const [categorySum, setCategorySum] = useState(0);

  const [totalSumTitle, setTotalSumTitle] = useState('');
  const [isFirstPage, setIsFirstPage] = useState(true);

  const [clickedIndex, setClickedIndex] = useState(-1);
  
  const pieChartRef = useRef<ChartJS>(null);
  const barChartRef = useRef<ChartJS>(null);

  const activePageIndicator = useRef(null);
  const inactivePageIndicator = useRef(null);

  const resultData = statisticsResult.length ? [...statisticsResult.filter((data) => data.timeSum > 0)] : [];
  
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

  /**
   * handle chart click event
   * 차트 클릭 이벤트 발생 시 콜백을 정의한다.
   * @param event click event
   * @param elements clicked elements of the chart
   * @param chart react-chartjs
   */
  const chartClickEventHandler = (event: MouseEvent<HTMLCanvasElement>, elements: any, chart: any) => {
    let chartData = statisticsResult.filter(data => data.timeSum > 0);
    const clickedElement = elements[0];
    const periodTypeTitle = periodTypeList.filter(type => type.id === periodType)[0].subTitle;
    if (clickedElement && chartData) {
      const index = clickedElement.index;
      const label = chart.data.labels[index];
      chartData = chartData.filter(data => data.categoryName === label)[0].children?.filter((childData: any) => childData.timeSum > 0)!;
      setTotalSumTitle(addPostposition(`${periodTypeTitle} ${label}`));
      setClickedIndex(index);
    } else {
      setTotalSumTitle(addPostposition(periodTypeTitle));
      setClickedIndex(-1);
    }
    setCategorySum(chartData?.reduce((accu: number, curr: StatisticsDetail) => accu + curr.timeSum, 0) | 0);
    setCategoryDetailData(chartData);
  };

  /**
   * react-mui-caraousel option
   */
  const carouselOption = {
    autoPlay: false,
    duration: 0,
    navButtonsAlwaysInvisible: true,
    onChange: (now?: number | undefined) => {
      setIsFirstPage(!!now);
    },
    fullHeightHoverWrapper: {
      height: '100%',
      top: '0',
    },
    indicatorIconButtonProps: {
      ref: inactivePageIndicator,
      style: {
        display: 'none'
      }
    },
    activeIndicatorIconButtonProps: {
      ref: activePageIndicator,
    },
  };

  /**
   * pie chart options
   */
  const pieChartOptions = {
    onClick: chartClickEventHandler,
    layout: {
      padding: {
        top: 36,
        bottom: 25,
      },
    },
    cutout: '35%',
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
            formatter: (val: any, ctx: any) => `${ctx.chart.data.labels[ctx.dataIndex]}\n`,
            font: {
              fontWeight: 'bold',
              size: 17,
            },
          },
          value: {
            formatter: (val: any) => {
              if (!totalSum) {
                return '';
              }
              return `\n${Math.round((val * 100) / (totalSum || 100))}%`;
            },
            font: {
              size: 14,
            },
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => timeFormatter(ctx.raw).time,
        },
      },
      customBackgroundColor: {
        color: '#FFF4F6',
      },
    },
  };

  /**
   * bar chart options
   */
  const barChartOptions = {
    onClick: chartClickEventHandler,
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
        align: 'start',
        offset: (data: any) => {
          const rawTime = data.dataset.data[data.dataIndex];
          return rawTime % 60 ? -40 : -25;
        },
        color: (context: any) => context.dataIndex === clickedIndex ? 'primary.main' : '#B7B7B7',
        labels: {
          value: {
            formatter: (val: number) => {
              const time = timeFormatter(val);
              return `${time.hour}시간` + (time.minute ? `\n ${time.minute}분` : '');
            },
            font: {
              weight: 'bold',
              size: 14,
            },
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => timeFormatter(ctx.raw).time,
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
          color: (context: any) => context.index === clickedIndex ? 'primary.main' : '#222222',
          font: {
            weight: 'bold',
            size: 14,
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

  /**
   * returns time text of detail data.
   * 선택한 카테고리의 세부 항목별 시간 텍스트를 반환한다.
   * @param timeVal 시간값
   * @returns reactElement
   */
  const setCategoryDetailDataTime = (timeVal: number) => {
    const timeObject = timeFormatter(timeVal);
    return (
      <>
        <Typography sx={{ fontWeight: 'bold', }}>
          {timeObject.hour}
        </Typography>
        <Typography>
          {timeObject.hourUnit}
        </Typography>
        {!!timeVal && !!timeObject.minute && <>
          <Typography sx={{ fontWeight: 'bold', marginLeft: '3px' }}>
            {timeObject.minute}
          </Typography>
          <Typography>
            {timeObject.minuteUnit}
          </Typography>       
        </>}
      </>
    )
  };

  /**
   * returns detail data list of the seleted category
   * 선택한 카테고리의 세부 항목을 반환한다.
   * @param dataArray 
   * @returns reactElement
   */
  const setCategoryDetailDataList = (dataArray: object[]) => (
    <>
      {dataArray.map((data: any, idx) => (
        <Box
          key={idx}
          sx={{
            padding: '8px',
            display: 'flex',
            justifyContent: 'flex-start',
            margin: '13px 12px',
            alignItems: 'flex-end',
          }}
        >
          <Circle 
            color={data.categoryColor} 
            size={40} 
            onClick={() => {
              const subCategoryData = data.children;
              const periodTypeTitle = periodTypeList.filter((type)=> type.id === periodType)[0].subTitle;
              if (subCategoryData) {
                setCategoryDetailData(subCategoryData);
                setTotalSumTitle(addPostposition(`${periodTypeTitle} ${data.categoryName}`));
              } else {
                setCategoryDetailData(statisticsResult);
                setTotalSumTitle(addPostposition(periodTypeTitle));
              }
            }}
          />
            <Box
              sx={{ 
                flex: '1 1 100%',
                margin: '0px 10px 3px 10px', 
              }}
            >
              <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                {data.categoryName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(data.timeSum * 100) / (categorySum || 100)}
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
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flex: '0 0 20%',
                margin: '0px 10px 3px 10px', 
                fontSize: '16px',
              }}
            >
              {setCategoryDetailDataTime(data.timeSum)}
            </Box>
        </Box>
      ))}
    </>
  );

  useEffect(() => {
    const timeSum = statisticsResult?.reduce((accumulator, currentValue) => accumulator + currentValue.timeSum, 0) | 0;
    setTotalSum(() => timeSum);
    setCategorySum(() => timeSum);

    setTotalSumTitle(addPostposition(periodTypeList.filter(type => type.id === periodType)[0].subTitle));
    setCategoryDetailData(statisticsResult.filter(data => data.timeSum > 0));
  }, [statisticsResult, periodType]);

  return (
    <>
      <Box sx={{ backgroundColor: '#FFF4F6' }}>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
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
            <span>{totalSumTitle} {'‎'}</span>
            <span
              style={{
                fontSize: '16px',
                color: 'primary.main',
              }}
            >
              {timeFormatter(categorySum).time}
            </span>
          </Box>
          {!!totalSum && 
            <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              top: 0,
              right: '5%',
              width: '72px',
              height: 'calc(100% - 3px)'
            }}
            >
            <Box
              onClick={() => {
                // first page label is 1
                const indicator: any = activePageIndicator.current;
                if (Number(indicator.getAttribute('aria-label').match(/\d+/)[0]) !== 1) {
                  const inactiveIndicator: any = inactivePageIndicator.current;
                  inactiveIndicator.click();
                  setIsFirstPage(true);
                }
                if (clickedIndex > -1) {
                  const pieChart = pieChartRef.current;
                  pieChart?.setActiveElements([{datasetIndex: 0, index: clickedIndex}]);
                }
              }}
              sx={{
                border: '1px solid',
                borderColor: isFirstPage ? 'primary.main' : '#949494',
                borderRightColor: 'primary.main',
                borderRadius: '3px 0 0 3px',
                flex: '1 1 50%',
                height: '50%',
                padding: 'auto',
                display: 'flex',  
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <DonutIcon iconColor={isFirstPage ? 'primary.main' : '#949494'}/>
            </Box>
            <Box
              onClick={() => {
                // second page label is 2
                const indicator: any = activePageIndicator.current;
                if (Number(indicator.getAttribute('aria-label').match(/\d+/)[0]) !== 2) {
                  const inactiveIndicator: any = inactivePageIndicator.current;
                  inactiveIndicator.click();
                  setIsFirstPage(false);
                }
              }}
              sx={{
                border: `1px solid ${isFirstPage ? '#949494' : 'primary.main'}`,
                borderLeft: 'none',
                borderRadius: '0 3px 3px 0',
                flex: '1 1 50%',
                height: '50%',
                display: 'flex',  
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <BarIcon iconColor={isFirstPage ? '#949494' : 'primary.main'} />
            </Box>
            </Box>
          }
        </Box>
          {!!totalSum && 
            <Carousel
                {...carouselOption} 
            >
              <Box
                sx={{
                  display: 'flex',
                  height: '274px',
                  justifyContent: 'center',
                  position: 'relative',
                  width: '100%',
                }}
              >
                <Chart
                  ref={pieChartRef}
                  type={'doughnut'}
                  data={chartData}
                  options={pieChartOptions}
                  plugins={[ChartDataLabels, customBackground]}
                />
              </Box>
              <Box sx={{ backgroundColor: '#FFF4F6' }}>
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
                    plugins={[ChartDataLabels, customBackground]}
                  />
                </Box>
              </Box>
            </Carousel>
          }
          {!!!totalSum && 
            <Carousel
              {...carouselOption} 
            >
              <Box
                sx={{
                  display: 'flex',
                  height: '278px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  width: '100%',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#B7B7B7'
                  }}
                >
                {'아직 데이터가 없어요'}
                <br/>
                {'기록을 남겨보세요 :)'}
                </Typography>
              </Box>
            </Carousel>
          }
      </Box>
      {setCategoryDetailDataList(totalSum ? categoryDetailData : statisticsResult)}
    </>
  );
};

export default ChartContainer;
