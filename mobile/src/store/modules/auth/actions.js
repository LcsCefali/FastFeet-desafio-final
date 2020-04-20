export function signInRequest(deliveryman_id) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { deliveryman_id },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function logoutRequest() {
  return {
    type: '@auth/LOGOUT_REQUEST',
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
