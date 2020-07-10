import React, { StatelessComponent } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography/Typography";

interface Props {
  name: string;
  label: string;
  onChange: any;
  value: string;
  error?: string;
  type?: string;
}

const defaultProps: Partial<Props> = {
  type: "text",
};

const onTextFieldChange = (
  fieldId: string,
  onChange: (fieldId: string, value: string) => void
) => (e: any) => {
  onChange(fieldId, e.target.value);
};

export const TextFieldForm: StatelessComponent<Props> = (props) => {
  const { name, label, onChange, value, error, type } = props;
  return (
    <>
      <TextField
        label={label}
        margin="normal"
        value={value}
        type={type}
        onChange={onTextFieldChange(name, onChange)}
      />
      <Typography variant="caption" color="error" gutterBottom>
        {props.error}
      </Typography>
    </>
  );
};
