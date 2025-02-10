export const themeInitialState = "light";

export const themeReducer = (state, action) => {
  const actionType = action.type;
  const actionPayload = action.payload;

  switch (actionType) {
    case "SWITCH_TO_LIGHT": {
      state = actionPayload;
      return state;
    }
    case "SWITCH_TO_DARK": {
      state = actionPayload;
      return state;
    }
    default:
      return state;
  }
};
