import TextField from '@mui/material/TextField';

const InputField = ({
  variant = 'outlined',
  label,
  value,
  onChange = () => null,
  style = {},
  type = 'input',
  InputLabelProps = {},
}) => {
  return (
    <TextField
      style={{
        margin: '10px',
        ...style,
      }}
      size='small'
      type={type}
      label={label}
      variant={variant}
      value={value}
      onChange={onChange}
      InputLabelProps={InputLabelProps}
    />
  );
};

export default InputField;
