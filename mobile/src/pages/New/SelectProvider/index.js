import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import {
  listProvidersRequest,
  redirectSelectDateTime,
} from '~/store/modules/provider';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

export default function SelectProvider() {
  const dispatch = useDispatch();
  const { providers } = useSelector(state => state.provider);

  useEffect(() => {
    dispatch(listProvidersRequest());
  }, [dispatch]);

  function handleNavigate(provider) {
    dispatch(redirectSelectDateTime(provider));
  }

  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({ item: provider }) => (
            <Provider onPress={() => handleNavigate(provider)}>
              <Avatar
                source={{
                  uri: provider.avatar
                    ? provider.avatar.url.replace('localhost', '192.168.0.17')
                    : `https://api.adorable.io/avatar/50/${provider.name}.png`,
                }}
              />
              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}

SelectProvider.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o prestador',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
