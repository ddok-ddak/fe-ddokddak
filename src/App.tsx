import { Box, ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

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

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
          <Box sx={{height: '94vh'}}>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/findID" element={<FindID />} />

              <Route path="/resetPW" element={<ResetPWStep />} />
              <Route path="/resetPWMode" element={<ResetPWMode />} />

              <Route path="/record" element={<RecordPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/settings/account" element={<AccountSetting />} />

              <Route path="/record/edit" element={<EditRecordPage />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/category/edit" element={<EditCategoryPage />} />
            </Routes>
          </Box>
          <BottomNav />
        </Box>
        <Modal />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
