import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { forwardRef } from "react";

interface Props {
  label: string;
  options: { value: string | number | boolean; label: string }[];
  multiple?: boolean;
  error?: boolean;
  helperText?: string;
  value?: string | number | (string | number)[];
  onChange?: (event: any) => void;
}

const CustomSelect = forwardRef<HTMLSelectElement, Props>(
  (
    {
      label,
      multiple = false,
      options,
      error,
      helperText,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const isFilled = Boolean(
      value && (Array.isArray(value) ? value.length : value)
    );
    return (
      <FormControl
        fullWidth
        error={error}
        sx={{ borderRadius: "16px" }}
        className="relative"
      >
        <InputLabel
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#8F92A1",
            transform: "translate(24px, 14px) scale(1)", // 🔹 Начальная позиция
            "&.MuiInputLabel-shrink": {
              transform: "translate(14px, -9px) scale(0.85)", // 🔹 При фокусе или вводе текста
            },
          }}
        >
          {label}
        </InputLabel>
        <Select
          inputRef={ref}
          multiple={multiple}
          value={value || (multiple ? [] : "")}
          onChange={onChange}
          label={label}
          sx={{
            fontWeight: "bold",
            borderRadius: "16px",
            backgroundColor: "#8F92A10D",
            "& .MuiSelect-select": {
              padding: "11px 24px", // Изменение внутренних отступов (паддинги)
              fontSize: "14px", // Размер текста внутри селекта
              height: "24px",
            },
            "& .MuiSelect-icon": {
              display: "none",
            },
            "& fieldset": {
              border: value ? "1px solid #17171799" : "1px solid transparent",
            },
            "&:hover fieldset": {
              border: "1px solid #17171799",
            },
            "&.Mui-focused fieldset": {
              border: "1px solid #0052CC !important",
            },
          }}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={String(option.value)} value={String(option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        <div className="absolute top-[11px] right-[16px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.291 10.7074C16.9214 10.0776 16.4754 9 15.5842 9H8.41268C7.52199 9 7.07572 10.0767 7.70525 10.7068L11.2878 14.2926C11.6782 14.6833 12.3113 14.6836 12.702 14.2932L16.291 10.7074Z"
              fill={isFilled ? "#171717" : "#8F92A166"}
            />
          </svg>
        </div>
      </FormControl>
    );
  }
);

export default CustomSelect;
