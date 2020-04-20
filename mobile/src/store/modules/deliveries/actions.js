export function registerRequest(problem, delivery) {
  return {
    type: '@deliveries/REGISTER_REQUEST',
    payload: { problem, delivery },
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
