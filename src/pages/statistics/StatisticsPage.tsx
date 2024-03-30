import Period from './Period';

import CommonHeader from '@/components/layout/CommonHeader';
import ChartContainer from '@/pages/statistics/ChartContainer';

import { bottomNavigation } from '@/store/common';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import Wrapper from '../auth/common/Wrapper';
import { Box } from '@mui/material';

const StatisticsPage = () => {
  const setNavPage = useSetRecoilState(bottomNavigation);

  useEffect(() => {
    setNavPage(1);
  }, []);

  return (
    <Wrapper
      headerComp={<CommonHeader title={'통계'} isShowPrevButton={false} />}
    >
      <Box
        sx={{
          m: 0,
          p: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Period />
        <ChartContainer />
      </Box>
    </Wrapper>
  );
};

export default StatisticsPage;
