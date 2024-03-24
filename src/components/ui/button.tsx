import React, { ButtonHTMLAttributes } from "react";

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}: any) => {
  return <button {...props}>{children}</button>;
};

export default Button;
