import { TextField, FormControl } from "@mui/material";
import { forwardRef, useState, useEffect } from "react";

interface Props {
  label: string;
  type?: string;
  helperText?: string;
  error?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      type = "text",
      error,
      helperText,
      value: externalValue,
      onChange,
      ...props
    },
    ref
  ) => {
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
      <FormControl
        fullWidth
        error={error}
        sx={{ borderRadius: "16px" }}
        className="relative"
      >
        <TextField
          inputRef={ref}
          value={internalValue}
          onChange={handleChange}
          sx={{
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
              {
                appearance: "none",
                margin: 0,
              },
            "& input[type=number]": {
              appearance: "textfield",
            },
            "& .MuiOutlinedInput-root": {
              fontSize: "14px",
              fontWeight: "bold",
              borderRadius: "16px",
              backgroundColor: "#8F92A10D",
              width: "100%",
              "& fieldset": {
                border: internalValue
                  ? "1px solid #17171799"
                  : "1px solid transparent",
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
              height: "24px",
            },
            "& .MuiInputLabel-root": {
              zIndex: 1,
              fontSize: "14px",
              color: "#8F92A1",
              fontWeight: "500",
              transform: "translate(24px, 14px) scale(1)", 
              "&.MuiInputLabel-shrink": {
                transform: "translate(14px, -9px) scale(0.85)",
                backgroundColor: "#FFFFFF",
                padding: "0 4px",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#0052CC", // Синий при фокусе
            },
          }}
          label={label}
          type={type}
          autoComplete={type === "password" ? "current-password" : "off"}
          error={error}
          helperText={helperText}
          FormHelperTextProps={{
            sx: {
              fontSize: "12px",
              color: error ? "#D32F2F" : "#8F92A1",
            },
          }}
          {...props}
        />
        {type === "number" && (
          <div className={`absolute top-[11px] right-[16px]`}>
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.9958 9.00009C16.887 9.00009 17.333 7.9225 16.7026 7.29267L13.1136 3.70688C12.7229 3.31653 12.0897 3.31682 11.6994 3.70752L8.11684 7.2933C7.48732 7.9234 7.93358 9.00009 8.82427 9.00009H15.9958ZM15.9958 15.0001C16.887 15.0001 17.333 16.0777 16.7026 16.7075L13.1136 20.2933C12.7229 20.6837 12.0897 20.6834 11.6994 20.2927L8.11684 16.7069C7.48732 16.0768 7.93358 15.0001 8.82427 15.0001H15.9958Z"
                fill={internalValue ? "#171717" : "#8F92A1"}
                fillOpacity={internalValue ? "1" : "0.4"}
              />
            </svg>
          </div>
        )}
      </FormControl>
    );
  }
);

export default CustomInput;
