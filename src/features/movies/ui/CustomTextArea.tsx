import { TextField, FormControl } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";

interface Props {
  label: string;
  helperText?: string;
  error?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextarea = forwardRef<HTMLInputElement, Props>(
  (
    { label, helperText, error, value: externalValue, onChange, ...props },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(externalValue || "");

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
      <FormControl fullWidth error={error}>
        <TextField
          inputRef={ref}
          placeholder={label} // Переносим label в placeholder
          multiline
          minRows={4}
          maxRows={10}
          value={internalValue}
          onChange={handleChange}
          variant="outlined"
          helperText={helperText}
          FormHelperTextProps={{
            sx: {
              padding: "2px 12px 0 0",
              fontSize: "12px",
              color: error ? "#D32F2F" : "#8F92A1",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: "14px",
              fontWeight: "400",
              borderRadius: "16px",
              backgroundColor: "#8F92A10D",
              width: "100%",
              "& fieldset": {
                border: `1px solid ${
                  error
                    ? "#D32F2F"
                    : internalValue
                    ? "#17171799"
                    : "transparent"
                }`,
              },
              "&:hover fieldset": {
                border: "1px solid #17171799",
              },
              "&.Mui-focused fieldset": {
                border: "1px solid #0052CC",
              },
            },
            "& .MuiInputBase-input": {
              padding: "0 12px",
              "&::placeholder": {
                color: error ? "#D32F2F" : "#8F92A1", // Теперь красный при ошибке
                opacity: "1",
                fontWeight: "500",
                fontSize: "14px",
              },
            },
          }}
          {...props}
        />
      </FormControl>
    );
  }
);

export default CustomTextarea;
