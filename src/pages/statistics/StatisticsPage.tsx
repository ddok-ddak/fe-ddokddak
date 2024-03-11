import Period from './Period';

import CommonHeader from '@/components/layout/CommonHeader';
import ChartContainer from '@/pages/statistics/ChartContainer';

import { bottomNavigation } from '@/store/common';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const StatisticsPage = () => {
  const setNavPage = useSetRecoilState(bottomNavigation);

  useEffect(() => {
    setNavPage(1);
  }, []);

  return (
    <>
      <CommonHeader title={'통계'} isShowPrevButton={false} />
      <Period />
      <ChartContainer />
    </>
  );
};

export default StatisticsPage;
