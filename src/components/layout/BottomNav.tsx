import { bottomNavigation } from '@/store/common';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const BottomNav = () => {
  const [navPage, setNavPage] = useRecoilState(bottomNavigation);

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
