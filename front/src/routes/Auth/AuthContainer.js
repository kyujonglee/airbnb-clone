import React, { useState, useEffect } from 'react';
import AuthPresenter from './AuthPresenter';
import { useMutation } from '@apollo/react-hooks';
import useInput from '../../hooks/useInput';
import { REQUEST_TOKEN, LOGIN_QUERY } from './AuthQueries';
import { toast } from 'react-toastify';
import { parseCookies } from '../../util';

const AuthContainer = () => {
  const [action, setAction] = useState('login');
  const email = useInput('');
  const password = useInput('');

  const [createTokenMutation] = useMutation(REQUEST_TOKEN, {
    variables: {
      email: email.value,
      password: password.value
    }
  });

  const [loginMutation] = useMutation(LOGIN_QUERY);

  const login = async () => {
    if (email !== '' && password !== '') {
      try {
        const {
          data: { createToken: token }
        } = await createTokenMutation();
        await loginMutation({ variables: { token } });
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

  const onSubmit = e => {
    e.preventDefault();
    switch (action) {
      case 'login':
        login();
        break;
      case 'signIn':
        signIn();
        break;
      default:
    }
  };

  const naverLogin = () => {
    window.location = 'http://localhost:4000/auth/naver';
  };

  const socialLogin = async () => {
    try {
      let cookies = document.cookie;
      cookies = parseCookies(cookies);
      const token = cookies['token'].trim();
      if (token) {
        await loginMutation({ variables: { token } });
        toast('로그인 되었습니다.');
      }
    } catch (error) {}
  };

  useEffect(() => {
    socialLogin();
    return () => {
      document.cookie = 'token=; expires=Thu, 18 Dec 2013 12:00:00 UTC';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
