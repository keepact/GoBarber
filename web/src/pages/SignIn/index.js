import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

import { singInValidation } from '~/util/validation';
import { signInRequest } from '~/store/modules/auth';

function SignIn() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={singInValidation} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-email" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">{loading ? 'Carregando' : 'Acessar'}</button>
        <Link to="register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}

export default SignIn;
