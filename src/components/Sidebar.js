import { Fragment } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link } from 'react-router-dom';

const SidebarItems = [
  {
    name: 'Bookings',
    icon: <CalendarMonthIcon />,
    path: '/',
  },
  {
    name: 'Admins',
    icon: <AdminPanelSettingsIcon />,
    path: '/accounts/admin',
  },
  {
    name: 'Riders',
    icon: <GroupIcon />,
    path: '/accounts/rider',
  },
  {
    name: 'Passengers',
    icon: <GroupIcon />,
    path: '/accounts/passenger',
  },
];

const Sidebar = ({ sidebarIsActive, setSidebarIsActive }) => {
  return (
    <Fragment key={'left'}>
      <button onClick={() => setSidebarIsActive(true)}>TOGGLE DRAWER</button>
      <Drawer
        anchor={'left'}
        open={sidebarIsActive}
        onClose={() => setSidebarIsActive(false)}
        variant='persistent'
      >
        <Box
          role='presentation'
          // onClick={() => setSidebarIsActive(false)}
          // onKeyDown={() => setSidebarIsActive(false)}
          style={{ padding: '100px 30px 0 30px' }}
        >
          <List>
            {SidebarItems.map((data, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon style={{ marginRight: '0px', paddingRight: '0px' }}>
                    {data.icon}
                  </ListItemIcon>
                  <Link to={data.path} style={{ textDecoration: 'none', color: 'grey' }}>
                    <ListItemText primary={data.name} style={{ marginLeft: '0px' }} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default Sidebar;
