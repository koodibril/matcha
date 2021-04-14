const LOADING_PROFILE_SUCCESS = "LOADING_PROFILE_SUCCESS";
const LOADING_PROFILE_FAILURE = "LOADING_PROFILE_FAILURE";
const CLEAR_PROFILE = "CLEAR_PROFILE";
const LOGOUT = "LOGOUT";

const initialState = {};

export interface ProfileType {
  Email: string;
  Username: string;
  Age: any;
  Bio: any;
  Gender: any;
  Sexo: any;
  Interests: any;
  Pictures: any;
  Location: any;
  Distance: any;
  Latitude: any;
  Longitude: any;
  Valid: any;
  payload: any;
}

const profile = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING_PROFILE_SUCCESS:
      return { payload };
    case LOADING_PROFILE_FAILURE:
      return {};
    case LOGOUT:
      return {};
    case CLEAR_PROFILE:
      return {};
    default:
      return state;
  }
};

export default profile;

