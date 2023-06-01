import PropTypes from 'prop-types';

import { motion } from 'framer-motion';
import { Button } from '../../../node_modules/@mui/material/index';

export default function AnimateButton({ children, type }) {
  switch (type) {
    case 'rotate':
    case 'slide':
    case 'scale':
      return <Button>{children}</Button>;
    default:
      return (
        <motion.Button whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
          {children}
        </motion.Button>
      );
  }
}

AnimateButton.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['slide', 'scale', 'rotate'])
};

AnimateButton.defaultProps = {
  type: 'scale'
};
