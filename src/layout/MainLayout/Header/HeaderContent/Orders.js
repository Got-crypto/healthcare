/* eslint-disable prettier/prettier */
import { Box, FormControl } from '@mui/material';
import { InputLabel, MenuItem, Select } from '../../../../../node_modules/@mui/material/index';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { handleGetCustomerOrderById, handleGetCustomerOrders } from 'services/BeOne';
import { getUnlockedSteps, selectOrder, setOrderDetails } from '../../../../store/reducers/main';

const Orders = () => {
  const [order, setOrder] = useState('');
  const [customerOrders, setCustomerOrders] = useState([]);
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    setOrder(e.target.value);
    sessionStorage.setItem('userOrder', e.target.value);
    dispatch(selectOrder(JSON.parse(e.target.value)));
    try {
      const response = await handleGetCustomerOrderById(JSON.parse(e.target.value).orderId);
      dispatch(setOrderDetails(response?.data));
      dispatch(getUnlockedSteps());
    } catch (error) {
      console.log('error fetching order details', error);
    }
  };

  useEffect(() => {
    const getOders = async () => {
      try {
        const response = await handleGetCustomerOrders();
        setCustomerOrders(response?.data);
        const recent = response?.data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const userOrderExist = sessionStorage.getItem('userOrder') || null;
        if (!userOrderExist){
          sessionStorage.setItem('userOrder', JSON.stringify({orderId: recent[0].orderId, createdAt: recent[0].createdAt}));
          dispatch(selectOrder(recent[0]));
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    getOders();
  }, [dispatch]);
  useEffect(() => {
    const selectRecentOrder = async () => {
      const recent = customerOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const userOrderExist = sessionStorage.getItem('userOrder') !== undefined ? true : false;
      if (!userOrderExist){
        sessionStorage.setItem('userOrder', JSON.stringify({orderId: recent[0].orderId, createdAt: recent[0].createdAt}));
        dispatch(selectOrder(recent[0]));
        try {
          const response = await handleGetCustomerOrderById(recent[0]?.orderId);
          dispatch(setOrderDetails(response?.data));
          dispatch(getUnlockedSteps());
        } catch (error) {
          console.log('error', error);
          console.clear()
        } 
      } else {
        try {
          const response = await handleGetCustomerOrderById(JSON.parse(sessionStorage.getItem('userOrder')).orderId);
          dispatch(setOrderDetails(response?.data));
          dispatch(getUnlockedSteps());
        } catch (error) {
          console.log('error', error);
          console.clear()
        }

      }
    };
    selectRecentOrder();
  }, [customerOrders, dispatch]);
  return (
    <Box sx={{ width: '100%', ml: { xs: 2, md: 1 } }}>
      <FormControl variant="filled" sx={{ width: { xs: '100%', md: 224 } }}>
        <InputLabel sx={{ color: 'success.main' }} id="demo-simple-select-label">
          {order === '' ? 'Select Order' : 'Selected Order'}
        </InputLabel>
        <Select
          inputProps={{ 'aria-label': 'Without label' }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={order}
          label="Select Order"
          onChange={handleChange}
          sx={{ backgroundColor: 'linear-gradient(232deg, rgba(247,194,228,1) 12%, rgba(53,192,233,1) 56%)' }}
        >
          {customerOrders?.map((order, index) => (
            <MenuItem value={JSON.stringify({ orderId: order.orderId, date: order.createdAt })} key={`${index}-${order.orderId}`}>
              {order?.orderId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Orders;
