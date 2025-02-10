export const cartInitialState = [];

export const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TO_CART": {
      let updatedCart = [...state];
      //se verifica daca exista produsul in cos
      const product = state.find((el) => el.dealID === payload.dealID);

      if (product) {
        return updatedCart.map((el) => {
          if (product.dealID === el.dealID) {
            const updatedEl = {
              ...el,
              quantity: el.quantity + 1,
            };
            return updatedEl;
          } else {
            return el;
          }
        });
      }

      updatedCart.push({ ...payload, quantity: 1 });
      return updatedCart;
    }
    case "REMOVE_FROM_CART": {
      const newCart = [...state];
      const updatedCart = newCart.filter((el) => el.dealID !== payload);

      return updatedCart;
    }
    default: {
      return state;
    }
  }
};
