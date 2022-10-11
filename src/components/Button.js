import Button from '@mui/material/Button';

const ButtonField = ({ label, onClick = () => null, style = {} }) => {
  return (
    <Button
      style={{
        margin: '10px',
        ...style,
      }}
      variant='contained'
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default ButtonField;
