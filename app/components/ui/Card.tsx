"use client";

import { type ReactNode, forwardRef } from "react";

export type CardProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  gradient?: boolean;
  icon?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  title,
  subtitle,
  children,
  className = "",
  onClick,
  hover = true,
  gradient = false,
  icon,
}, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  const baseClasses = `
    bg-white/80 dark:bg-gray-900/80 
    backdrop-blur-xl 
    rounded-2xl 
    shadow-lg 
    border border-gray-200/50 dark:border-gray-700/50 
    overflow-hidden 
    transition-all duration-300
    ${hover ? "hover:shadow-2xl hover:scale-105" : ""}
    ${onClick ? "cursor-pointer" : ""}
    ${gradient ? "bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-gray-800/90" : ""}
  `;

  return (
    <div
      ref={ref}
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >
      {(title || subtitle || icon) && (
        <div className="px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
});

Card.displayName = "Card";