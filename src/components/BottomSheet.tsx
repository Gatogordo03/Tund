import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import "./BottomSheet.css";

interface BottomSheetProps {
  children: React.ReactNode;
  initialHeight: number;
  midHeight: number;
  expandedHeight: number;
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  initialHeight,
  midHeight,
  expandedHeight,
  isOpen,
  onToggle,
}) => {
  const [{ y }, api] = useSpring(() => ({ y: initialHeight }));

  const openSheet = () => {
    api.start({ y: window.innerHeight - expandedHeight });
    onToggle(true);
  };

  const expandToMidHeight = () => {
    api.start({ y: window.innerHeight - midHeight });
  };

  const closeSheet = () => {
    api.start({ y: window.innerHeight - initialHeight });
    onToggle(false);
  };

  const bind = useDrag(({ last, movement: [, my], memo = y.get() }) => {
    if (last) {
      if (my < -50) openSheet();
      else if (my > 50 && memo < window.innerHeight - midHeight) closeSheet();
      else expandToMidHeight();
    } else {
      api.start({
        y: Math.max(
          window.innerHeight - expandedHeight,
          Math.min(window.innerHeight - initialHeight, memo + my)
        ),
      });
    }
    return memo;
  });

  useEffect(() => {
    if (isOpen) {
      expandToMidHeight();
    } else {
      closeSheet();
    }
  }, [isOpen]);

  return (
    <animated.div
      {...bind()}
      className="bottom-sheet"
      style={{
        transform: y.to(
          (y) => `translateY(${y - (window.innerHeight - expandedHeight)}px)`
        ),
        bottom: 0,
        touchAction: "none",
        position: "fixed",
        left: 0,
        right: 0,
        height: "100%",
        background: "white",
        boxShadow: "0px -2px 10px rgba(0,0,0,0.1)",
        borderRadius: "10px 10px 0 0",
        zIndex: 1000,
      }}
    >
      <div className="drag-handle"></div>
      <div className="bottom-sheet-content">{children}</div>
    </animated.div>
  );
};

export default BottomSheet;
