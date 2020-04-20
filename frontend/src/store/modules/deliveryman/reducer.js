import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  created: false,
};

export default function deliveryman(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@deliveryman/REGISTER_REQUEST': {
        draft.loading = true;
        draft.created = false;
        break;
      }
      case '@deliveryman/REGISTER_SUCCESS': {
        draft.loading = false;
        draft.created = true;
        break;
      }
      case '@deliveryman/REGISTER_FAILURE': {
        draft.loading = false;
        draft.created = false;
        break;
      }
      default:
    }
  });
}
