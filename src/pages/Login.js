import { useState } from 'react';

import { Box } from '@mui/material';

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
    <Box>
      <InputField label='Email Address' onChange={e => setEmail(e.target.value)} value={email} />

      <InputField
        label='Password'
        onChange={e => setPassword(e.target.value)}
        value={password}
        type='password'
      />

      <p>{error}</p>

      <ButtonField label='Login' onClick={onLogin} />
    </Box>
  );
};

export default Login;
