export const favoritesInitialState = [];

export const favoritesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TO_FAVORITES": {
      const newState = [...state];
      //se verifica daca exista produsul la favorite;
      const favoriteProduct = state.find((el) => el.dealID === payload.dealID);

      if (favoriteProduct) {
        //daca exista nu se mai adauga si se returneaza state-ul anterior
        return newState;
      }

      //daca nu exista atunci se adauga si se returneaza noul state
      newState.push(payload);
      return newState;
    }
    case "REMOVE_FROM_FAVORITES": {
      const newState = [...state];
      return newState.filter((el) => el.dealID !== payload);
    }
    default: {
      return state;
    }
  }
};
