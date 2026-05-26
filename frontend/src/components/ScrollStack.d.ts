import { ReactNode } from 'react';

export interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

export interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

export declare const ScrollStackItem: (props: ScrollStackItemProps) => JSX.Element;
declare const ScrollStack: (props: ScrollStackProps) => JSX.Element;
export default ScrollStack;
