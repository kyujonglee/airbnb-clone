import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import { useMutation } from '@apollo/react-hooks';
import useInput from '../../hooks/useInput';
import { REQUEST_TOKEN, LOGIN_QUERY } from './AuthQueries';
import { toast } from 'react-toastify';

const AuthContainer = () => {
  const [action, setAction] = useState('login');
  const email = useInput('');
  const password = useInput('');
  const [token, setToken] = useState('');

  const [createTokenMutation] = useMutation(REQUEST_TOKEN, {
    variables: {
      email: email.value,
      password: password.value
    }
  });

  const [loginMutation] = useMutation(LOGIN_QUERY, { variables: { token } });

  const login = async () => {
    if (email !== '' && password !== '') {
      try {
        const {
          data: { createToken: token }
        } = await createTokenMutation();
        setToken(token);
        await loginMutation();
        toast('로그인 되었습니다.');
      } catch (error) {
        toast.error('로그인 실패: 아이디와 비밀번호를 확인해주세요.');
      } finally {
        return;
      }
    }
    toast.error('email과 password를 입력해주세요.');
  };

  const signIn = () => {};

  const onSubmit = async e => {
    e.preventDefault();
    switch (action) {
      case 'login':
        await login();
        break;
      case 'signIn':
        await signIn();
        break;
      default:
    }
  };

  const naverLogin = () => {
    
  }

  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      email={email}
      password={password}
      onSubmit={onSubmit}
      naverLogin={naverLogin}
    />
  );
};

export default AuthContainer;
