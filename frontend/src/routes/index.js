import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route'; // validacao de rotas privadas
import SingIn from '~/pages/SingIn';
import Deliveries from '~/pages/Deliveries';
import Deliveryman from '~/pages/Deliveryman';
import Recipient from '~/pages/Recipient';
import Problems from '~/pages/Problems';

import DeliveriesRegister from '~/pages/Deliveries/Register';
import RecipientRegister from '~/pages/Recipient/Register';
import DeliverymanRegister from '~/pages/Deliveryman/Register';

import DeliveriesEdit from '~/pages/Deliveries/Edit';
import RecipientEdit from '~/pages/Recipient/Edit';
import DeliverymanEdit from '~/pages/Deliveryman/Edit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />
      <Route path="/deliveries" exact component={Deliveries} isPrivate />
      <Route path="/deliveryman" exact component={Deliveryman} isPrivate />
      <Route path="/recipient" exact component={Recipient} isPrivate />
      <Route path="/delivery/problems" exact component={Problems} isPrivate />

      <Route
        path="/deliveries/register"
        exact
        component={DeliveriesRegister}
        isPrivate
      />
      <Route
        path="/deliveryman/register"
        exact
        component={DeliverymanRegister}
        isPrivate
      />
      <Route
        path="/recipient/register"
        exact
        component={RecipientRegister}
        isPrivate
      />

      <Route
        path="/deliveries/edit"
        exact
        component={DeliveriesEdit}
        isPrivate
      />
      <Route
        path="/deliveryman/edit"
        exact
        component={DeliverymanEdit}
        isPrivate
      />
      <Route path="/recipient/edit" exact component={RecipientEdit} isPrivate />

      <Route path="/" component={() => <h1>Pagina não encontrada</h1>} />
    </Switch>
  );
}
