import clsx from "clsx";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({
  children,
  loading,
  className,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      data-testid="button"
      disabled={disabled}
      className={clsx(
        loading && "flex justify-center",
        disabled &&
          "bg-orange-200 hover:bg-orange-200 hover:cursor-not-allowed",
        className
      )}
      onClick={(e) => {
        if (!disabled) {
          onClick && onClick(e);
        }
      }}
    >
      {loading ? (
        <div
          className="loader"
          style={{
            border: "3px solid white",
            width: "24px",
            height: "24px",
          }}
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
