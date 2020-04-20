export function registerRequest(avatar_id, name, email) {
  return {
    type: '@deliveryman/REGISTER_REQUEST',
    payload: { avatar_id, name, email },
  };
}

export function registerSuccess() {
  return {
    type: '@deliveryman/REGISTER_SUCCESS',
  };
}

export function registerFailure() {
  return {
    type: '@deliveryman/REGISTER_FAILURE',
  };
}

export function updateRequest(id, avatar_id, name, email) {
  return {
    type: '@deliveryman/UPDATE_REQUEST',
    payload: { id, avatar_id, name, email },
  };
}

export function updateSuccess() {
  return {
    type: '@deliveryman/UPDATE_SUCCESS',
  };
}

export function updateFailure() {
  return {
    type: '@deliveryman/UPDATE_FAILURE',
  };
}

export function deleteRequest(delivery_id) {
  return {
    type: '@deliveryman/DELETE_REQUEST',
    payload: { delivery_id },
  };
}

export function deleteSuccess() {
  return {
    type: '@deliveryman/DELETE_SUCCESS',
  };
}

export function deleteFailure() {
  return {
    type: '@deliveryman/DELETE_FAILURE',
  };
}
