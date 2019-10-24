import React, { useState, useEffect } from 'react';
import AuthPresenter from './AuthPresenter';
import { useMutation } from '@apollo/react-hooks';
import useInput from '../../hooks/useInput';
import { REQUEST_TOKEN, LOGIN_QUERY, SIGN_IN_QUERY } from './AuthQueries';
import { toast } from 'react-toastify';
import { parseCookies } from '../../util';

const AuthContainer = () => {
  const [action, setAction] = useState('login');
  const email = useInput('');
  const password = useInput('');
  const password2 = useInput('');
  const name = useInput('');

  const [createTokenMutation] = useMutation(REQUEST_TOKEN, {
    variables: {
      email: email.value,
      password: password.value
    }
  });

  const [loginMutation] = useMutation(LOGIN_QUERY);
  const [signInMutation] = useMutation(SIGN_IN_QUERY, {
    variables: {
      email: email.value,
      password: password.value,
      name: name.value
    }
  });

  const login = async () => {
    if (email.value !== '' && password.value !== '') {
      try {
        const {
          data: { createToken: token }
        } = await createTokenMutation();
        await loginMutation({ variables: { token } });
        window.location = '/'
      } catch (error) {
        toast.error('로그인 실패: 아이디와 비밀번호를 확인해주세요.');
      } finally {
        return;
      }
    }
    toast.error('email과 password를 입력해주세요.');
  };

  const signIn = async () => {
    try {
      if (password.value !== password2.value) {
        throw Error();
      }
      const {
        data: { createUser: token }
      } = await signInMutation();
      await loginMutation({ variables: { token } });
      window.location = '/';
    } catch (error) {
      console.log('error: ', error);
      toast.error('회원가입 실패: 입력값들을 확인해주세요.');
    }
  };

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
        window.location = '/'
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
      password2={password2}
      name={name}
      onSubmit={onSubmit}
      naverLogin={naverLogin}
    />
  );
};

export default AuthContainer;
