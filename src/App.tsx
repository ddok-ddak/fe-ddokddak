import { Box, ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import BottomNav from './components/layout/BottomNav';
import FindID from './pages/auth/FindID';
import ResetPW from './pages/auth/SetPW';

import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/login/Login';
import CategoryPage from './pages/category/CategoryPage';
import CreateCategoryPage from './pages/category/CreateCategoryPage';
import RecordPage from './pages/record/RecordPage';
import SettingsPage from './pages/settings/SettingsPage';
import StatisticsPage from './pages/statistics/StatisticsPage';

import Modal from './components/common/Modal';

import CreateRecoredPage from '@/pages/record/CreateRecordPage';
import { theme } from '@/styles';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box sx={{ paddingBottom: '56px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/record" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/findID" element={<FindID />} />
            <Route path="/resetPW" element={<ResetPW />} />
            <Route path="/record" element={<RecordPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/record/create" element={<CreateRecoredPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/category/add" element={<CreateCategoryPage />} />
          </Routes>
        </Box>

        <BottomNav />
        <Modal />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
