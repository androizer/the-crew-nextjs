import { HTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  return <button {...props}>{props.children}</button>;
};

export default Button;
