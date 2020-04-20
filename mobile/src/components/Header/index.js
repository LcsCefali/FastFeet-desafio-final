import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '~/store/modules/auth/actions';
import {
  Container,
  ProfileContent,
  Avatar,
  Center,
  WelcomeText,
  Deliveryman,
} from './styles';

export default function Header() {
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutRequest());
  }

  return (
    <Container>
      <ProfileContent>
        <Avatar
          source={{
            uri: profile.avatar
              ? `http://10.0.2.2:3333/files/${profile.avatar.path}`
              : `https://ui-avatars.com/api/?name=${profile.name}&rounded=true`,
          }}
        />
        <Center>
          <WelcomeText>Bem vindo de volta,</WelcomeText>
          <Deliveryman>{profile.name}</Deliveryman>
        </Center>
      </ProfileContent>
      <TouchableOpacity onPress={() => handleLogout()}>
        <Icon name="exit-to-app" size={30} color="#E74040" />
      </TouchableOpacity>
    </Container>
  );
}
