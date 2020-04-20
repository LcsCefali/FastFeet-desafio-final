export function registerRequest(
  name_destiny,
  street,
  number,
  city,
  state,
  complement,
  zip_code
) {
  return {
    type: '@recipients/REGISTER_REQUEST',
    payload: {
      name_destiny,
      street,
      number,
      city,
      state,
      complement,
      zip_code,
    },
  };
}

export function registerSuccess() {
  return {
    type: '@recipients/REGISTER_SUCCESS',
  };
}

export function registerFailure() {
  return {
    type: '@recipients/REGISTER_FAILURE',
  };
}

export function updateRequest(
  recipient_id,
  name_destiny,
  street,
  number,
  city,
  state,
  complement,
  zip_code
) {
  return {
    type: '@recipients/UPDATE_REQUEST',
    payload: {
      recipient_id,
      name_destiny,
      street,
      number,
      city,
      state,
      complement,
      zip_code,
    },
  };
}

export function updateSuccess() {
  return {
    type: '@recipients/UPDATE_SUCCESS',
  };
}

export function updateFailure() {
  return {
    type: '@recipients/UPDATE_FAILURE',
  };
}

export function deleteRequest(recipient_id) {
  return {
    type: '@recipients/DELETE_REQUEST',
    payload: recipient_id,
  };
}

export function deleteSuccess() {
  return {
    type: '@recipients/DELETE_REQUEST',
  };
}

export function deleteFailure() {
  return {
    type: '@recipients/DELETE_REQUEST',
  };
}
