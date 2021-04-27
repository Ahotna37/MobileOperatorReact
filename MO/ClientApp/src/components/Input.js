import React from "react";
import { Input as MaterialInput } from "@material-ui/core";

export default function Input({ value, onChange, name, onBlur }) {
  /**
   * старый файл - в программе не используется
   */
  return (
    <MaterialInput
      fullWidth
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
    />
  );
}
