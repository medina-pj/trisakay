import Button from '@mui/material/Button';

const ButtonField = ({
  label,
  onClick = () => null,
  style = {},
  variant = 'contained',
  color,
  size,
}) => {
  return (
    <Button
      style={{
        margin: '10px',
        ...style,
      }}
      variant={variant}
      color={color}
      onClick={onClick}
      size={size}
    >
      {label}
    </Button>
  );
};

export default ButtonField;
