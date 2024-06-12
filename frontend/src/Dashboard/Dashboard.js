import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/system';
import Sidebar from './Sidebar/Sidebar';
import FriendsSidebar from './FriendsSidebar/FriendsSidebar';
import Messenger from './Messenger/Messenger';
import AppBar from './AppBar/AppBar';
import { logout } from '../shared/utils/auth';
const Dashboard = () => {
  // const { userDetails } = useSelector((state) => state.user);
  const Wrapper = styled('div')({
    width: '100%',
    height: '100vh',
    display: 'flex',
  });
  useEffect(() => {
    const userDetails = localStorage.getItem('user');

    if (!userDetails) {
      logout();
    }
    // else {
    //   setUserDetails(JSON.parse(userDetails));
    // }
  }, []);

  return (
    <Wrapper>
      <Sidebar />
      <FriendsSidebar />
      <Messenger />
      <AppBar />
    </Wrapper>
  );
};

export default Dashboard;
