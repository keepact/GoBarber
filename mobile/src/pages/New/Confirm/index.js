import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

import { createAppointmentsRequest } from '~/store/modules/appointment';
import { Container, Avatar, Name, Time, SubmitButton } from './styles';

function Confirm() {
  const dispatch = useDispatch();
  const { time, provider } = useSelector(state => state.provider);

  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: pt }),
    [time]
  );

  function handleAddAppointment() {
    const data = {
      provider,
      time,
    };

    dispatch(createAppointmentsRequest(data));
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url.replace('localhost', '192.168.0.17')
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>

        <Time>{dateFormatted}</Time>
        <SubmitButton onPress={handleAddAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar Agendamento',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

export default Confirm;
