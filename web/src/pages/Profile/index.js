import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth';
import { updateProfileRequest } from '~/store/modules/user';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

function Profile() {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.user);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

        <Input name="name" placeholder="Nome completo" />
        <Input name="email" placeholder="Seu endereço de email" />

        <hr />

        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha antiga"
        />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirme sua nova senha"
        />
        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="button" onClick={handleSignOut}>
        Sair do GoBarber
      </button>
    </Container>
  );
}

export default Profile;
