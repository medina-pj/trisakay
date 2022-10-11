import { useState } from 'react';

import { Box } from '@mui/material';

// components
import InputField from '../components/InputField';
import ButtonField from '../components/Button';

// hooks
import useAccount from '../hooks/useAccount';
import useAuthContext from '../hooks/useAuthContext';

const Login = () => {
  const [email, setEmail] = useState('test+6@gmail.com');
  const [password, setPassword] = useState('123123123');

  // hooks
  const { error, login } = useAccount();
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
