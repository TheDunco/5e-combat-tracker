import clsx from 'clsx';
import { useStateStore } from '../../useStateStore';

interface ButtonProps
  extends Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'onMouseOver'
  > {
  tooltip: string;
  variant?: 'primary' | 'secondary' | 'heal' | 'damage';
  children: React.ReactNode;
  className?: string;
}
export const Button: React.FC<ButtonProps> = ({
  tooltip,
  variant = 'primary',
  children,
  className,
  ...props
}) => {
  const setTooltip = useStateStore((state) => state.setTooltip);
  return (
    <button
      {...props}
      onMouseOver={() => setTooltip(tooltip)}
      className={clsx(
        'h-10 font-bold rounded-full',
        {
          'px-4 bg-white text-gray-800 border-gray-800 hover:shadow-md hover:shadow-pink-500/50 border-2':
            variant === 'secondary',
          'px-4 text-white bg-gray-800 hover:shadow-md hover:shadow-pink-500/50':
            variant === 'primary',
          'flex flex-row items-center max-w-min pl-4 pr-5 text-white bg-gray-800 hover:bg-gradient-to-r hover:from-emerald-400 hover:to-green-500':
            variant === 'heal',
          'flex flex-row items-center max-w-min pl-4 pr-5 text-white bg-gray-800 hover:bg-gradient-to-l hover:from-pink-500 hover:to-rose-500':
            variant === 'damage',
        },
        className
      )}
    >
      {children}
    </button>
  );
};
