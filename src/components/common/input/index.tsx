import React from "react";
import styles from "./CustomInput.module.scss";

type InputSize = "sm" | "md" | "lg";
type InputVariant = "outlined" | "filled" | "ghost";

interface CustomInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  name: string;
  error?: string;
  helperText?: string;
  size?: InputSize;
  variant?: InputVariant;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      label,
      name,
      error,
      helperText,
      size = "md",
      variant = "outlined",
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const wrapperClasses = [
      styles.wrapper,
      fullWidth ? styles.fullWidth : "",
    ]
      .filter(Boolean)
      .join(" ");

    const fieldClasses = [
      styles.field,
      styles[size],
      styles[variant],
      error ? styles.hasError : "",
      disabled ? styles.disabled : "",
      leftIcon ? styles.hasLeftIcon : "",
      rightIcon ? styles.hasRightIcon : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={wrapperClasses}>
        {label && (
          <label className={styles.label} htmlFor={name}>
            {label}
          </label>
        )}

        <div className={styles.inputWrapper}>
          {leftIcon && (
            <span className={`${styles.icon} ${styles.iconLeft}`}>
              {leftIcon}
            </span>
          )}

          <input
            id={name}
            name={name}
            ref={ref}
            className={fieldClasses}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${name}-error` : helperText ? `${name}-helper` : undefined
            }
            {...props}
          />

          {rightIcon && (
            <span className={`${styles.icon} ${styles.iconRight}`}>
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <span id={`${name}-error`} className={styles.errorText} role="alert">
            {error}
          </span>
        )}

        {!error && helperText && (
          <span id={`${name}-helper`} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;