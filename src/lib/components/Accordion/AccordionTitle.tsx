import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';
import type { FlowbiteHeadingLevel } from '../Flowbite/FlowbiteTheme';
import { useTheme } from '../Flowbite/ThemeContext';
import { useAccordionContext } from './AccordionPanelContext';

export interface AccordionTitleProps extends ComponentProps<'button'> {
  arrowIcon?: FC<ComponentProps<'svg'>>;
  as?: FlowbiteHeadingLevel;
}

export const AccordionTitle: FC<AccordionTitleProps> = ({
  as: Heading = 'h2',
  children,
  className,
  ...props
}): JSX.Element => {
  const { arrowIcon: ArrowIcon, flush, isOpen, setOpen } = useAccordionContext();
  const theme = useTheme().theme.accordion.title;

  const onClick = () => typeof setOpen !== 'undefined' && setOpen();

  return (
    <button
      className={classNames(
        theme.base,
        theme.flush[flush ? 'on' : 'off'],
        theme.open[isOpen ? 'on' : 'off'],
        className,
      )}
      onClick={onClick}
      type="button"
      {...props}
    >
      <Heading className={theme.heading} data-testid="flowbite-accordion-heading">
        {children}
      </Heading>
      {ArrowIcon && (
        <ArrowIcon
          aria-hidden
          className={classNames(theme.arrow.base, theme.arrow.open[isOpen ? 'on' : 'off'])}
          data-testid="flowbite-accordion-arrow"
        />
      )}
    </button>
  );
};
