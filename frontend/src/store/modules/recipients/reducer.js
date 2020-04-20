import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  created: false,
};

export default function recipients(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@recipients/REGISTER_REQUEST': {
        draft.loading = true;
        draft.created = false;
        break;
      }
      case '@recipients/REGISTER_SUCCESS': {
        draft.loading = false;
        draft.created = true;
        break;
      }
      case '@recipients/REGISTER_FAILURE': {
        draft.loading = false;
        draft.created = false;
        break;
      }
      case '@recipients/UPDATE_REQUEST': {
        draft.loading = true;
        draft.created = false;
        break;
      }
      case '@recipients/UPDATE_SUCCESS': {
        draft.loading = false;
        draft.created = true;
        break;
      }
      case '@recipients/UPDATE_FAILURE': {
        draft.loading = false;
        draft.created = false;
        break;
      }
      default:
    }
  });
}
