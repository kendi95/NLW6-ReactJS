import { FC, ButtonHTMLAttributes } from "react";

import './styles.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const Button: FC<ButtonProps> = ({ title, ...rest }) => {

  return (
    <button className="button" {...rest}>
      {title}
    </button>
  )

}