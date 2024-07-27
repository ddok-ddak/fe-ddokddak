import { Box, ThemeProvider } from '@mui/material';
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  Routes,
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

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <RecordPage />
          <BottomNav />
        </>
      ),
      errorElement: <Login />,

      loader: async ({ params }) => {
        console.log(params);

        return fetch(`/fake/api/teams/${params.teamId}.json`);
      },
      children: [
        // {
        //   element: <Team />,
        //   path: ":teamId",
        //   loader: async ({ params }) => {
        //     return fetch(`/api/teams/${params.teamId}.json`);
        //   },
        // },
      ],
    },
  ]);

  return <RouterProvider router={router} />;

  // return (
  //   <BrowserRouter>
  //     <ThemeProvider theme={theme}>
  //       <Box
  //         sx={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //           height: '100vh',
  //           width: '100vw',
  //         }}
  //       >
  //         <Box
  //           sx={{
  //             width: '100vw',
  //             flex: '100vh',
  //             overflowY: 'scroll',
  //             overflowX: 'hidden',
  //           }}
  //         >
  //           <Routes>
  //           <Route
  //             path="/"
  //             element={<Login />}

  //             loader={async ({ params }) => {
  //               alert(params)
  //               // return fetch(
  //               //   `/fake/api/teams/${params.teamId}.json`
  //               // );
  //             }}

  //           />
  //             {/* <Route path="/" element={<Navigate to="/record" />} /> */}
  //             <Route path="/login" element={<Login />} />
  //             <Route path="/signin/redirect" element={<LoginRedirect />} />
  //             <Route path="/signUp" element={<SignUp />} />
  //             <Route path="/findID" element={<FindID />} />

  //             <Route path="/resetPW" element={<ResetPWStep />} />
  //             <Route path="/resetPWMode" element={<ResetPWMode />} />

  //             <Route
  //               path="/record"
  //               element={
  //                 <>
  //                   <RecordPage />
  //                   <BottomNav />
  //                 </>
  //               }
  //             />
  //             <Route
  //               path="/statistics"
  //               element={
  //                 <>
  //                   <StatisticsPage />
  //                   <BottomNav />
  //                 </>
  //               }
  //             />
  //             <Route
  //               path="/settings"
  //               element={
  //                 <>
  //                   <SettingsPage />
  //                   <BottomNav />
  //                 </>
  //               }
  //             />
  //             <Route path="/settings/account" element={<AccountSetting />} />
  //             <Route path="/settings/faq" element={<FAQPage />} />
  //             <Route path="/record/edit" element={<EditRecordPage />} />
  //             <Route path="/category" element={<CategoryPage />} />
  //             <Route path="/category/edit" element={<EditCategoryPage />} />
  //           </Routes>
  //         </Box>
  //       </Box>
  //       <PopupMessage />
  //       <Modal />
  //     </ThemeProvider>
  //   </BrowserRouter>
  // );
}

export default App;
