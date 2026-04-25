import {
  Checkbox as ChakraCheckbox,
  CheckboxControlProps,
} from "@chakra-ui/react";
import * as React from "react";

export interface CheckboxProps extends ChakraCheckbox.RootProps {
  icon?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  controlProps?: CheckboxControlProps;
  rootRef?: React.Ref<HTMLLabelElement>;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const { icon, children, inputProps, rootRef, controlProps, ...rest } =
      props;
    return (
      <ChakraCheckbox.Root ref={rootRef} {...rest}>
        <ChakraCheckbox.HiddenInput ref={ref} {...inputProps} />
        <ChakraCheckbox.Control {...controlProps}>
          {icon || <ChakraCheckbox.Indicator />}
        </ChakraCheckbox.Control>
        {children !== null && children !== undefined && (
          <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>
        )}
      </ChakraCheckbox.Root>
    );
  },
);
