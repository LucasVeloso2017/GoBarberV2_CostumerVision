import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
  item:any
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const nonUserImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUI4ueoXqXOfnVlpC3cXaSM9BEuVni-t7qmQ&usqp=CAU"

  const { user,signOut } = useAuth();
  const { navigate } = useNavigation();
  const theme = useTheme();

  useEffect(() => {
    api.get('/providers?key=1').then(response => {
      setProviders(response.data);
    });
  }, [providers]);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );


  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={signOut}>
          <Icon name="power" size={25} color="red" />
        </TouchableOpacity>
        <HeaderTitle>
          Bem vindo,{'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url ? user.avatar_url :nonUserImage }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={(provider:Provider) => provider.id}
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
        }
        renderItem={({ item: provider }:Provider) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar
              source={{
                uri:
                  provider.avatar_url ? provider.avatar_url : nonUserImage
              }}
            />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color={theme.colors.orange} />
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color={theme.colors.orange} />
                <ProviderMetaText>8h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
