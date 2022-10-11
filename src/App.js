import { useState, Fragment } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Box } from '@mui/material';

// components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Admin from './pages/Admin';

// pages
import Login from './pages/Login';

// hooks
import useAuthContext from './hooks/useAuthContext';
import Rider from './pages/Rider';

const ContentWrapper = ({ children, sidebarIsActive }) => {
  return (
    <Box
      style={{
        marginLeft: sidebarIsActive ? '250px' : '20px',
        marginRight: '20px',
        padding: '100px 20px 20px 20px',
        height: '100vh',
      }}
    >
      {children}
    </Box>
  );
};

function App() {
  const [sidebarIsActive, setSidebarIsActive] = useState(true);
  const { user, authIsReady } = useAuthContext();

  return (
    <div style={{ backgroundColor: '#E6E6E6', height: 'max-content' }}>
      {authIsReady && (
        <BrowserRouter>
          {user && authIsReady && (
            <Box>
              <Navbar toggleSidebar={setSidebarIsActive} />
              <Sidebar sidebarIsActive={sidebarIsActive} setSidebarIsActive={setSidebarIsActive} />
            </Box>
          )}

          <Routes>
            <Route path='*' element={!user && <Navigate to='/login' />} />

            <Route
              path='/'
              element={
                <Fragment>
                  <ContentWrapper sidebarIsActive={sidebarIsActive}>
                    <div>DASHBOARD</div>
                  </ContentWrapper>

                  {!user && <Navigate to='/login' />}
                </Fragment>
              }
            />

            <Route
              path='/accounts/admin'
              element={
                <Fragment>
                  <ContentWrapper sidebarIsActive={sidebarIsActive}>
                    <Admin />
                  </ContentWrapper>

                  {!user && <Navigate to='/login' />}
                </Fragment>
              }
            />

            <Route
              path='/accounts/rider'
              element={
                <Fragment>
                  <ContentWrapper sidebarIsActive={sidebarIsActive}>
                    <Rider />
                  </ContentWrapper>

                  {!user && <Navigate to='/login' />}
                </Fragment>
              }
            />

            <Route
              path='/login'
              element={
                <Fragment>
                  <Login />
                  {user && <Navigate to='/' />}
                </Fragment>
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
