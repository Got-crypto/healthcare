import { Box, FormControl } from '@mui/material';
import { InputLabel, MenuItem, Select } from '../../../../../node_modules/@mui/material/index';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleGetCustomerOrderById, handleGetCustomerOrders } from 'services/BeOne';
import { getUnlockedSteps, selectOrder, setOrderDetails } from '../../../../store/reducers/main';

const Orders = () => {
  const [order, setOrder] = useState('');
  const [customerOrders, setCustomerOrders] = useState([]);
  const dispatch = useDispatch();
  const { selectedOrder } = useSelector((state) => state.main);

  const handleChange = async (e) => {
    setOrder(e.target.value);
    dispatch(selectOrder(JSON.parse(e.target.value)));
    try {
      console.log('selectedOrder', selectedOrder);
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
      } catch (error) {
        console.log('error', error);
      }
    };

    getOders();
  }, []);
  return (
    <Box sx={{ width: '100%', ml: { xs: 2, md: 1 } }}>
      <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
        <InputLabel id="demo-simple-select-label">{order === '' ? 'Select Order' : 'Selected Order'}</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={order} label="Select Order" onChange={handleChange}>
          {customerOrders.map((order, index) => (
            <MenuItem
              value={JSON.stringify({ orderId: order.orderId, name: `Order ${index + 1}` })}
              key={`${index}-${order.orderId}`}
            >{`Order ${index + 1}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Orders;
