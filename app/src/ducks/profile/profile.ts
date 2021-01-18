const LOADING_PROFILE_SUCCESS = 'LOGIN_SUCCESS';
const LOADING_PROFILE_FAILURE = 'LOGIN_FAILURE';

const initialState = {};

const profile = (state = initialState, action: { type: string, infopayload: any, imagepayload: any }) => {
  const { type, infopayload, imagepayload } = action;

  switch (type) {
    case LOADING_PROFILE_SUCCESS:
      return {
        profileInfo: infopayload,
        profileImage: imagepayload
      }
    case LOADING_PROFILE_FAILURE:
      return {}
    default:
      return state;
  }
}

export default profile;