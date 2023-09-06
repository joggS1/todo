import React from "react";
import styles from './Button.module.css'

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
    color: 'black' | 'white' | 'blue'
}

export const Button: React.FC<ButtonProps> = ({children, color, onClick, ...rest}) => {
    const className = `${styles.button} ${styles[`button_${color}`]}`
    return <button className={className} onClick={onClick} {...rest}>{children}</button>
}