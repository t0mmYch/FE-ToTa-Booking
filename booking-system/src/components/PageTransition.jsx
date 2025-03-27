import { motion } from 'framer-motion';
import styled from 'styled-components';

const PageTransitionWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const PageTransition = ({ children }) => {
  return (
    <PageTransitionWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </PageTransitionWrapper>
  );
};

export default PageTransition; 