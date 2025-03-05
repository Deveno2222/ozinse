import { cn } from "@/lib/utils";
import { Button } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const CustomButton = ({ children, disabled, className, onClick, ...props }: Props) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      {...props}
      disabled={disabled}
      className={cn(
        "h-[38px] bg-purpleUsed hover:opacity-90 transition-opacity duration-150 ease-in-out shadow-none rounded-2xl capitalize text-base font-bold font-roboto",
        disabled && "opacity-25 text-white cursor-not-allowed",
        className
      )}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
