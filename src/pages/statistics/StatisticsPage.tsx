import Period from './Period';

import CommonHeader from '@/components/layout/CommonHeader';
import ChartContainer from '@/pages/statistics/ChartContainer';
import { bottomNavigation } from '@/store/common';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
// import { useRecoilState } from 'recoil';
// import { modalState } from '@/store/modal';

const StatisticsPage = () => {
  // const [modalInfo, setModalInfo] = useRecoilState(modalState);
  // const handleClickBtn = () => {
  //   setModalInfo({ ...modalInfo, open: true, msg: 'This is a test.' });
  // };
  const setNavPage = useSetRecoilState(bottomNavigation);

  useEffect(() => {
    setNavPage(1);
  }, []);

  return (
    <>
      <CommonHeader title={'통계'} isShowPrevButton={false} />
      {/* <button onClick={handleClickBtn}>POPUP TEST</button> */}

      <Period />
      <ChartContainer />
    </>
  );
};

export default StatisticsPage;
