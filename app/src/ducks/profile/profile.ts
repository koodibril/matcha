import { UserInformationData } from '../../components/Profile/components/UserInformation/UserInformation.d';

const LOADING_PROFILE_SUCCESS = 'LOADING_PROFILE_SUCCESS';
const LOADING_PROFILE_FAILURE = 'LOADING_PROFILE_FAILURE';

const initialState = {};


const profile = (state = initialState, action: { type: string, payload: any}) => {
  const { type, payload} = action;

  switch (type) {
    case LOADING_PROFILE_SUCCESS:
      return { payload }
    case LOADING_PROFILE_FAILURE:
      return {}
    default:
      return state;
  }
}

export default profile;