import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SamplePage from './pages/SamplePage';
import RecordPage from './pages/record/RecordPage';
import StatisticsPage from './pages/statistics/StatisticsPage';
import SettingsPage from './pages/settings/SettingsPage';
import BottomNav from './components/layout/BottomNav';
import { Box, ThemeProvider } from '@mui/material';
import { theme } from './styles';
import CreateRecoredPage from './pages/record/CreateRecordPage';
import CategoryPage from './pages/category/CategoryPage';
import CreateCategoryPage from './pages/category/CreateCategoryPage';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box sx={{ paddingBottom: '56px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/record" />} />
            <Route path="/record" element={<RecordPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/record/create" element={<CreateRecoredPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/category/add" element={<CreateCategoryPage />} />
          </Routes>
        </Box>
        <BottomNav />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
