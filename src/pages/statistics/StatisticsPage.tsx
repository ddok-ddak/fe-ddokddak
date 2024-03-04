import Period from './Period';

import CommonHeader from '@/components/layout/CommonHeader';
import ChartContainer from '@/pages/statistics/ChartContainer';

const StatisticsPage = () => {
  return (
    <>
      <CommonHeader title={'통계'} isShowPrevButton={false} />
      <Period />
      <ChartContainer />
    </>
  );
};

export default StatisticsPage;
