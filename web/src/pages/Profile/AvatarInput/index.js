import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useField } from '@rocketseat/unform';

import { showAvatarRequest, updateAvatarRequest } from '~/store/modules/user';

import { Container } from './styles';

function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar');

  const dispatch = useDispatch();
  const { avatar } = useSelector(state => state.user);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
    dispatch(showAvatarRequest(defaultValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, ref.current]);

  function handleChange(e) {
    dispatch(updateAvatarRequest(e.target.files[0]));
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            avatar
              ? avatar.url
              : 'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
          alt="avatar ou foto do usuário"
        />

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={avatar && avatar.id}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

export default AvatarInput;
