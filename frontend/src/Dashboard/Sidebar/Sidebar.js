import React from 'react';
import { styled } from '@mui/system';
import MainPageButton from './MainPageButton';
const Sidebar = () => {
  const MainContainer = styled('div')({
    width: '72px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#202225',
  });
  return (
    <MainContainer>
      <MainPageButton />
    </MainContainer>
  );
};

export default Sidebar;
