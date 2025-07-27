"use client";

import { type ReactNode, forwardRef } from "react";

export type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  icon,
  loading = false,
  fullWidth = false,
}, ref) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    secondary:
      "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700",
    outline:
      "border-2 border-amber-600 hover:bg-amber-600 text-amber-600 hover:text-white transition-colors",
    ghost:
      "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
    gradient:
      "bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-2xl transform hover:scale-105",
  };

  const sizeClasses = {
    sm: "text-sm px-3 py-2 rounded-md",
    md: "text-sm px-4 py-2.5 rounded-lg",
    lg: "text-base px-6 py-3 rounded-lg",
    xl: "text-lg px-8 py-4 rounded-xl",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      ref={ref}
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className={loading ? "opacity-0" : "opacity-100"}>
        {icon && <span className="flex items-center mr-2">{icon}</span>}
        {children}
      </div>
    </button>
  );
});

Button.displayName = "Button";