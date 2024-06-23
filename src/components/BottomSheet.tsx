import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import './BottomSheet.css';

interface BottomSheetProps {
  children: React.ReactNode;
  height: number; // Altura máxima del BottomSheet
}

const BottomSheet: React.FC<BottomSheetProps> = ({ children, height }) => {
    const [{ y }, api] = useSpring(() => ({ y: height }));
  
    const openSheet = () => {
      api.start({ y: 0 });
    };
  
    const closeSheet = () => {
      api.start({ y: height });
    };
  
    const bind = useDrag(({ last, movement: [, my], memo = y.get() }) => {
      if (last) {
        if (my < -50) openSheet();
        else closeSheet();
      } else {
        api.start({ y: Math.min(height, memo + my) });
      }
      return memo;
    });
  
    return (
      <animated.div
        {...bind()}
        style={{
          transform: y.to((y) => `translateY(${y}px)`),
          bottom: `calc(-100% + ${height}px)`,
          touchAction: 'none',
          position: 'fixed',
          left: 0,
          right: 0,
          height: '100%',
          background: 'white',
          boxShadow: '0px -2px 10px rgba(0,0,0,0.1)',
          borderRadius: '10px 10px 0 0',
          zIndex: 1000,
        }}
      >
        {children}
      </animated.div>
    );
  };

export default BottomSheet;