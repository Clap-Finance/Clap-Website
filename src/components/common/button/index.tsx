import React from "react";
import styles from "./Button.module.scss";
import { TbLoader } from "react-icons/tb";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    loading ? styles.loading : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <TbLoader className="animate-spin text-xl" />}

      {!loading && leftIcon && (
        <span className={styles.icon}>{leftIcon}</span>
      )}

      <span className={styles.label}>{children}</span>

      {!loading && rightIcon && (
        <span className={styles.icon}>{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;