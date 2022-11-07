import { useState } from 'react';
import moment from 'moment';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Container, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// components
import ButtonField from '../components/Button';
import InputField from '../components/InputField';
import ModalComponent from '../components/Modal';

// hooks
import useAdmin from '../hooks/useAdmin';

const ManageAccountComponent = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { error, signUp } = useAdmin();

  const onSignup = async () => {
    try {
      // sign up account
      const payload = {
        email,
        password,
        firstname,
        lastname,
        contactNumber,
        userType: 'admin',
      };

      await signUp(payload);

      setFirstname('');
      setLastname('');
      setContactNumber('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={{ paddingLeft: 0 }}>
      <Typography style={{ margin: 10, fontSize: '1.2em' }}>Create Admin Account</Typography>

      <InputField
        label='first name'
        onChange={e => setFirstname(e.target.value)}
        value={firstname}
        style={{ width: '100%' }}
      />

      <InputField
        label='last name'
        onChange={e => setLastname(e.target.value)}
        value={lastname}
        style={{ width: '100%' }}
      />

      <InputField
        label='contact number'
        onChange={e => setContactNumber(e.target.value)}
        value={contactNumber}
        style={{ width: '100%' }}
      />

      <InputField
        label='email address'
        onChange={e => setEmail(e.target.value)}
        value={email}
        style={{ width: '100%' }}
      />

      <InputField
        label='password'
        onChange={e => setPassword(e.target.value)}
        value={password}
        type='password'
        style={{ width: '100%' }}
      />

      <InputField
        label='confirm password'
        onChange={e => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        type='password'
        style={{ width: '100%' }}
      />

      <ButtonField label='Signup' onClick={onSignup} />

      <p>{error}</p>
    </Container>
  );
};

export default function Admin() {
  const [modalIsActive, setModalIsActive] = useState(false);
  const { documents, deleteRecord } = useAdmin();

  const onDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    await deleteRecord(id);
  };

  return (
    <Box>
      <ButtonField
        label='Create'
        onClick={() => setModalIsActive(prevState => !prevState)}
        style={{ marginLeft: '0' }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents &&
              documents.map((data, i) => {
                return (
                  <TableRow
                    key={data.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='data'>
                      {i + 1}
                    </TableCell>
                    <TableCell>
                      {data.firstname} {data.firstname}
                    </TableCell>
                    <TableCell>{data.contactNumber}</TableCell>
                    <TableCell>{data.emailAddress}</TableCell>
                    <TableCell>
                      {moment(new Date(data.createdAt)).format('MMM. DD, YYYY hh:mm a')}
                    </TableCell>
                    <TableCell>
                      <IconButton size='large' onClick={() => onDelete(data.id)}>
                        <DeleteIcon fontSize='inherit' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalComponent isActive={modalIsActive} setIsActive={setModalIsActive}>
        <ManageAccountComponent />
      </ModalComponent>
    </Box>
  );
}
