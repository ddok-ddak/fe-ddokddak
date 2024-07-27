import { Box, ThemeProvider } from '@mui/material';
import {
  createBrowserRouter, RouterProvider
} from 'react-router-dom';

import './App.css';
import BottomNav from './components/layout/BottomNav';
import FindID from './pages/auth/findID/FindID';

import Login from './pages/auth/login/Login';
import SignUp from './pages/auth/signup/SignUp';
import CategoryPage from './pages/category/CategoryPage';
import EditCategoryPage from './pages/category/EditCategoryPage';
import RecordPage from './pages/record/RecordPage';
import SettingsPage from './pages/settings/SettingsPage';
import StatisticsPage from './pages/statistics/StatisticsPage';

import Modal from './components/common/Modal';

import EditRecordPage from '@/pages/record/EditRecordPage';

import { theme } from '@/styles';
import ResetPWMode from './pages/auth/resetPW/ResetPWMode';
import ResetPWStep from './pages/auth/resetPW/ResetPWSteps';
import AccountSetting from './pages/settings/AccountSetting';
import FAQPage from './pages/settings/FAQPage';
import PopupMessage from './components/common/PopupMessage';
import LoginRedirect from './pages/auth/login/LoginRedirect';
import { getCookie } from './api/http';

/**
 * dynamically change start page (token)
 * @returns start page
 */
function StartPage() {
  const token = getCookie();
  const page = token ? (
    <>
      <RecordPage />
      <BottomNav />
    </>
  ) : (
    <Login />
  );

  return page;
}

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <StartPage />,
      errorElement: <Login />,
    },
    {
      path: '/login',
      element: <Login />,
      errorElement: <Login />,
    },
    {
      path: '/signin/redirect',
      element: <LoginRedirect />,
      errorElement: <Login />,
    },
    {
      path: '/signUp',
      element: <SignUp />,
      errorElement: <Login />,
    },
    {
      path: '/findID',
      element: <FindID />,
      errorElement: <Login />,
    },
    {
      path: '/resetPW',
      element: <ResetPWStep />,
      errorElement: <Login />,
    },
    {
      path: '/resetPWMode',
      element: <ResetPWMode />,
      errorElement: <Login />,
    },
    {
      path: '/record',
      element: (
        <>
          <RecordPage />
          <BottomNav />
        </>
      ),
      errorElement: <Login />,
    },
    {
      path: '/statistics',
      element: (
        <>
          <StatisticsPage />
          <BottomNav />
        </>
      ),
      errorElement: <Login />,
    },
    {
      path: '/settings',
      element: (
        <>
          <SettingsPage />
          <BottomNav />
        </>
      ),
      errorElement: <Login />,
    },
    {
      path: '/settings/account',
      element: <AccountSetting />,
      errorElement: <Login />,
    },
    {
      path: '/settings/faq',
      element: <FAQPage />,
      errorElement: <Login />,
    },
    {
      path: '/record/edit',
      element: <EditRecordPage />,
      errorElement: <Login />,
    },
    {
      path: '/category',
      element: <CategoryPage />,
      errorElement: <Login />,
    },
    {
      path: '/category/edit',
      element: <EditCategoryPage />,
      errorElement: <Login />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100vw',
          overflowY: 'scroll',
          overflowX: 'hidden',
          m: 0,
          p: 0,
        }}
      >
        <RouterProvider router={router} />
      </Box>
      
      <PopupMessage />
      <Modal />
    </ThemeProvider>
  );
}
export default App;
