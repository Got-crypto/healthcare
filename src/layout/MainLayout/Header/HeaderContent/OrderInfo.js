import { useSelector } from 'react-redux';
import { Box, Paper } from '../../../../../node_modules/@mui/material/index';

export default function OrderInfo() {
  const { selectedOrder } = useSelector((state) => state.main);
  return (
    <Box sx={{ width: '100%'}}>
      {selectedOrder ? (
        <Paper sx={{ p: 1, backgroundColor: 'transparent', color: 'text.primary' }} elevation={1}>
          Selected Order: {selectedOrder}
        </Paper>
      ) : (
        <Paper sx={{ p: 1, backgroundColor: 'transparent', color: 'text.primary' }} elevation={1}>
          Select an order to proceed
        </Paper>
      )}
    </Box>
  );
}
