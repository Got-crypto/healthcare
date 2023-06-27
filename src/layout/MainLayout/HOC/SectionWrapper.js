import { motion } from 'framer-motion';
import { Box } from '../../../../node_modules/@mui/material/index';

import Logo from '../../../assets/images/icon.png';

const SectionWrapper = (Component, id, reverse) =>
  function HOC() {
    return (
      <motion.div
        whileInView={{ opacity: [0, 0, 1], y: [80, 30, 0] }}
        initial={{ y: 100, opacity: 0 }}
        layout
        transition={{ duration: 0.3 }}
        style={{ padding: '5vh 0' }}
      >
        <span id={id} />
        <Component />
        <Box
          sx={{
            mt: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: `flex-${reverse ? 'end' : 'start'}`
          }}
        >
          <img src={Logo} alt="beone logo" style={{ width: '30px', height: 'auto' }} />
        </Box>
      </motion.div>
    );
  };

export default SectionWrapper;
