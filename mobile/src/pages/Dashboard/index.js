import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import {
  listAppointmentsRequest,
  cancelAppointmentsRequest,
} from '~/store/modules/appointment';

import { Container, Title, List } from './styles';

function Dashboard({ isFocused }) {
  const { appointments } = useSelector(state => state.appointment);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      dispatch(listAppointmentsRequest());
    }
  }, [dispatch, isFocused, appointments]);

  function handleCancel(id) {
    dispatch(cancelAppointmentsRequest(id));
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

function tabBarIcon({ tintColor }) {
  return <Icon name="event" size={20} color={tintColor} />;
}

Dashboard.navigationOptions = {
  tabBar: {
    label: 'Agendamentos',
    icon: tabBarIcon,
  },
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
