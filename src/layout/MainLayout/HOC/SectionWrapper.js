import { motion } from 'framer-motion';
import { Box, Typography } from '../../../../node_modules/@mui/material/index';

const SectionWrapper = (Component) =>
  function HOC() {
    return (
      <motion.div
        whileInView={{ opacity: [0, 0, 1], y: [100, 50, 0] }}
        initial={{ y: 100, opacity: 0 }}
        layout
        transition={{ duration: 0.7 }}
        style={{ padding: '5vh 0' }}
      >
        <Component />
        <Box
          sx={{
            mt: 5,
            display: 'flex',
            flexDirection: 'center',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <Typography>BeOne</Typography>
          <Typography></Typography>
        </Box>
      </motion.div>
    );
  };

export default SectionWrapper;
