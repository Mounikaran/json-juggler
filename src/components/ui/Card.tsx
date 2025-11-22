import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  title,
  description,
  action,
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden p-4 ${className}`}
    >
      {(title || action) && (
        <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div>
            {title && (
              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div
        className={`${!title && !action ? "h-full" : ""} ${
          className.includes("flex-col")
            ? "flex-1 min-h-0 overflow-auto"
            : "p-6"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
