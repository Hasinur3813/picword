import type { ContainerSize, BaseComponentProps } from '@/types';

interface ContainerProps extends BaseComponentProps {
  /** Max-width variant: sm (640px), md (768px), lg (1024px), xl (1280px), full (100%) */
  size?: ContainerSize;
  /** HTML element to render as */
  as?: 'div' | 'section' | 'main' | 'article' | 'header' | 'footer';
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-full',
};

export default function Container({
  children,
  size = 'xl',
  as: Element = 'div',
  className = '',
}: ContainerProps) {
  return (
    <Element
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </Element>
  );
}
