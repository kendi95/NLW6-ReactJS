import { FC, ButtonHTMLAttributes } from "react";

import './styles.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isOutlined?: boolean;
}

export const Button: FC<ButtonProps> = ({ title, isOutlined = false, ...rest }) => {

  return (
    <button className={`button ${isOutlined ? 'outlined' : ''}`} {...rest}>
      {title}
    </button>
  )

}