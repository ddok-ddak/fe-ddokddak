import { showBottomNav } from '@/store/common';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const BottomNav = () => {
  const [value, setValue] = React.useState(0);
  const showNav = useRecoilValue(showBottomNav);

  return (
    <BottomNavigation
      sx={{
        display: showNav ? 'flex' : 'none',
        height: '6vh',
        position: 'fixed',
        bottom: '0px',
        width: '100vw',
      }}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
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
