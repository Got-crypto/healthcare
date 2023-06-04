import { useSelector } from 'react-redux';
import { Box, Paper } from '../../../../../node_modules/@mui/material/index';

export default function OrderInfo() {
  const { selectedOrder } = useSelector((state) => state.main);
  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      {selectedOrder ? (
        <Paper sx={{ p: 1 }} elevation={1}>
          Selected Order: {selectedOrder?.name}
        </Paper>
      ) : (
        <Paper sx={{ p: 1 }} elevation={1}>
          Select an order to proceed
        </Paper>
      )}
    </Box>
  );
}
