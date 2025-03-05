import { TextField, InputAdornment, IconButton } from "@mui/material";
import { EyeIcon, EyeOff } from "lucide-react";
import React, { forwardRef, useState, useEffect } from "react";

interface Props {
  label: string;
  error?: boolean;
  helperText?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  ({ label, error, helperText, value: externalValue, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(externalValue || "");

    // Обновляем локальное состояние при изменении внешнего value
    useEffect(() => {
      setInternalValue(externalValue || "");
    }, [externalValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(event.target.value);
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <TextField
        inputRef={ref}
        type={showPassword ? "text" : "password"}
        value={internalValue}
        onChange={handleChange}
        label={label}
        error={error}
        helperText={helperText}
        sx={{
          "& .MuiOutlinedInput-root": {
            fontWeight: "bold",
            borderRadius: "16px",
            backgroundColor: "#f7f7f7",
            width: "100%",
            "& fieldset": {
              border: internalValue ? "1px solid #17171799" : "1px solid transparent",
            },
            "&:hover fieldset": {
              border: "1px solid #17171799",
            },
            "&.Mui-focused fieldset": {
              border: "1px solid #0052CC",
            },
          },
          "& .MuiInputBase-input": {
            padding: "11px 24px",
          },
          "& .MuiInputLabel-root": {
            transform: "translate(24px, 11px) scale(1)",
            "&.MuiInputLabel-shrink": {
              transform: "translate(14px, -9px) scale(0.75)",
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? <EyeOff /> : <EyeIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...props}
      />
    );
  }
);

export default PasswordInput;
