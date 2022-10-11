import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: '#E6E6E6',
  borderRadius: '10px',
  boxShadow: 24,
  padding: '10px',
};

const ModalComponent = ({ isActive, setIsActive, children }) => {
  return (
    <div>
      <Modal
        open={isActive}
        onClose={() => setIsActive(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
