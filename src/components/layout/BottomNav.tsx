import { bottomNavigation } from '@/store/common';
import { isDatePickerOpen } from '@/store/statistics';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

const BottomNav = () => {
  const [navPage, setNavPage] = useRecoilState(bottomNavigation);
  const setIsPickerOpen = useSetRecoilState<boolean>(isDatePickerOpen);
  return (
    <BottomNavigation
      sx={{
        display: 'flex',
        height: '6vh',
        position: 'fixed',
        bottom: '0px',
        width: '100vw',
      }}
      showLabels
      value={navPage}
      onChange={(event, newValue) => {
        setNavPage(newValue);
        setIsPickerOpen(false);
      }}
    >
      <BottomNavigationAction
        label="기록"
        // icon={<CreateIcon />}
        component={Link}
        to="/record"
      />
      <BottomNavigationAction
        label="통계"
        // icon={<BarChartIcon />}
        component={Link}
        to="/statistics"
      />
      <BottomNavigationAction
        label="설정"
        // icon={<SettingsIcon />}
        component={Link}
        to="/settings"
      />
    </BottomNavigation>
  );
};

export default BottomNav;
