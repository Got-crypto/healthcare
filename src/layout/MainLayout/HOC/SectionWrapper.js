import { motion } from 'framer-motion';
import { Box } from '../../../../node_modules/@mui/material/index';

const SectionWrapper = (Component) =>
  function HOC() {
    return (
      <motion.Box whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }} transition={{ duration: 0.5 }}>
        <Box>
          <Component />
        </Box>
      </motion.Box>
    );
  };

export default SectionWrapper;
