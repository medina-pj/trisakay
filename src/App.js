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

import Passenger from './pages/Passenger';
import Booking from './pages/Booking';
import Settings from './pages/Settings';

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
    <div style={{ backgroundColor: user ? '#E6E6E6' : '#FFFFFF', height: 'max-content' }}>
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
                    <Booking />
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
              path='/accounts/passenger'
              element={
                <Fragment>
                  <ContentWrapper sidebarIsActive={sidebarIsActive}>
                    <Passenger />
                  </ContentWrapper>

                  {!user && <Navigate to='/login' />}
                </Fragment>
              }
            />

            <Route
              path='/settings'
              element={
                <Fragment>
                  <ContentWrapper sidebarIsActive={sidebarIsActive}>
                    <Settings />
                  </ContentWrapper>

                  {!user && <Navigate to='/login' />}
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
