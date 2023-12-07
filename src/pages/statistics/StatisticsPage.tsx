import Period from './Period';

import CommonHeader from '@/components/layout/CommonHeader';
import ChartContainer from '@/pages/statistics/ChartContainer';
// import { useRecoilState } from 'recoil';
// import { modalState } from '@/store/modal';

const StatisticsPage = () => {
  // const [modalInfo, setModalInfo] = useRecoilState(modalState);
  // const handleClickBtn = () => {
  //   setModalInfo({ ...modalInfo, open: true, msg: 'This is a test.' });
  // };

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
