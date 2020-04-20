import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';

import Dashboard from '~/pages/Dashboard';
import Deliveries from './deliveries.routes';
import Profile from '~/pages/Profile';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function createRouter(signedIn = false) {
  return !signedIn ? (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  ) : (
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: '#7d40e7',
          inactiveTintColor: '#999',
          style: {
            backgroundColor: '#fff',
            height: 60,
            paddingBottom: 5,
          },
          labelStyle: {
            fontSize: 16,
          },
        }}
      >
        <Tabs.Screen
          name="Dashboard"
          component={Deliveries}
          options={{
            tabBarLabel: 'Entregas',
            tabBarIcon: ({ color }) => (
              <Icon name="menu" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Meu Perfil',
            tabBarIcon: ({ color }) => (
              <Icon name="account-circle" size={24} color={color} />
            ),
          }}
        />
      </Tabs.Navigator>
    );
}
