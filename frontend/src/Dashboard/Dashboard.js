import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { userDetails } = useSelector((state) => state.user);
  console.log(userDetails, 'ud');
  console.log(localStorage.getItem('user'), 'ls');
  return <div>dashboard</div>;
};

export default Dashboard;
