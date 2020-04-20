import React from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { logoutRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Center,
  Avatar,
  Label,
  Values,
  LogoutButton,
} from './styles';

export default function Profile() {
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutRequest());
  }

  return (
    <Container>
      <Center>
        <Avatar
          source={{
            uri: profile.avatar
              ? `http://10.0.2.2:3333/files/${profile.avatar.path}`
              : `https://ui-avatars.com/api/?name=${profile.name}&rounded=true`,
          }}
        />
      </Center>

      <Label>Nome completo</Label>
      <Values>{profile.name}</Values>
      <Label>Email</Label>
      <Values>{profile.email}</Values>
      <Label>Data de cadastro</Label>
      <Values>{format(new Date(profile.created_at), 'dd/MM/yyyy')}</Values>
      <LogoutButton onPress={() => handleLogout()}>
        <Text>Logout</Text>
      </LogoutButton>
    </Container>
  );
}
