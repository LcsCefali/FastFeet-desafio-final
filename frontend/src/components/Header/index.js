import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form } from '@rocketseat/unform';
import { logoutRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/fastfeet-logo-dashboard.svg';
import { Container, Content, Profile } from './styles';
import { store } from '~/store';

export default function Header() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutRequest());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FAST FEET" />
          <NavLink to="/deliveries" activeStyle={{ color: '#444' }}>
            ENCOMENDAS
          </NavLink>
          <NavLink to="/deliveryman" activeStyle={{ color: '#444' }}>
            ENTREGADORES
          </NavLink>
          <NavLink to="/recipient" activeStyle={{ color: '#444' }}>
            DESTINATÁRIOS
          </NavLink>
          <NavLink to="/delivery/problems" activeStyle={{ color: '#444' }}>
            PROBLEMAS
          </NavLink>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{store.getState().user.profile.name}</strong>
            </div>
            <Form onSubmit={handleLogout}>
              <button type="submit">sair do sistema</button>
            </Form>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
