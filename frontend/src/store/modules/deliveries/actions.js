export function registerRequest(recipient_id, deliveryman_id, product) {
  return {
    type: '@deliveries/REGISTER_REQUEST',
    payload: { recipient_id, deliveryman_id, product },
  };
}

export function registerSuccess() {
  return {
    type: '@deliveries/REGISTER_SUCCESS',
  };
}

export function registerFailure() {
  return {
    type: '@deliveries/REGISTER_FAILURE',
  };
}

export function updateRequest(
  delivery_id,
  recipient_id,
  deliveryman_id,
  product
) {
  return {
    type: '@deliveries/UPDATE_REQUEST',
    payload: { delivery_id, recipient_id, deliveryman_id, product },
  };
}

export function updateSuccess() {
  return {
    type: '@deliveries/UPDATE_SUCCESS',
  };
}

export function updateFailure() {
  return {
    type: '@deliveries/UPDATE_FAILURE',
  };
}

export function deleteRequest(delivery_id) {
  return {
    type: '@deliveries/DELETE_REQUEST',
    payload: { delivery_id },
  };
}

export function deleteSuccess() {
  return {
    type: '@deliveries/DELETE_SUCCESS',
  };
}

export function deleteFailure() {
  return {
    type: '@deliveries/DELETE_FAILURE',
  };
}
