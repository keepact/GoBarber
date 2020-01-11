import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

import {
  redirectConfirm,
  listAvailableRequest,
} from '~/store/modules/provider';

import { Container, Title, HourList, Hour } from './styles';

function SelectDateTime() {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const { hours, provider } = useSelector(state => state.provider);

  useEffect(() => {
    dispatch(listAvailableRequest(provider, date));
  }, [date, dispatch, provider]);

  function handleSelectHour(time) {
    dispatch(redirectConfirm(time));
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />

        <HourList
          data={hours}
          extraData={date}
          keyExtractor={item => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => handleSelectHour(item.value)}
              enabled={item.available}>
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o horário',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

export default SelectDateTime;
