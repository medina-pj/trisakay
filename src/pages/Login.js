import { useState } from 'react';

import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';

// components
import InputField from '../components/InputField';
import ButtonField from '../components/Button';

// hooks
import useAdmin from '../hooks/useAdmin';
import useAuthContext from '../hooks/useAuthContext';

const Login = () => {
  const [email, setEmail] = useState('admin+01@gmail.com');
  const [password, setPassword] = useState('123456789');

  // hooks
  const { error, login } = useAdmin();
  const { dispatch } = useAuthContext();

  const onLogin = async () => {
    try {
      const res = await login(email, password);
      dispatch({ type: 'LOGIN', payload: res });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        style={{ height: '100%' }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#1976d2' }} style={{ margin: '20px' }}>
          <LockOutlinedIcon />
        </Avatar>

        <InputField
          label='Email Address'
          onChange={e => setEmail(e.target.value)}
          value={email}
          style={{
            width: '100%',
          }}
        />

        <InputField
          label='Password'
          onChange={e => setPassword(e.target.value)}
          value={password}
          type='password'
          style={{
            width: '100%',
          }}
        />

        <ButtonField
          label='Login'
          onClick={onLogin}
          style={{
            width: '100%',
          }}
        />

        <p>{error}</p>
      </Box>
    </Container>
  );
};

export default Login;
