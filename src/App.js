import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router/router";
import { useReducer } from "react";
import { themeInitialState, themeReducer } from "./store/Theme/reducer";
import { ThemeContext } from "./store/Theme/context";
import { cartInitialState, cartReducer } from "./store/Cart/reducer";
import { CartContext } from "./store/Cart/context";
import {
  favoritesInitialState,
  favoritesReducer,
} from "./store/Favorites/reducer";
import { FavoritesContext } from "./store/Favorites/context";

function App() {
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    themeInitialState
  );
  const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);
  const [favoritesState, favoritesDispatch] = useReducer(
    favoritesReducer,
    favoritesInitialState
  );

  const themeContextValue = {
    themeState,
    themeDispatch,
  };

  const cartContextValue = {
    cartState,
    cartDispatch,
  };

  const favoritesContextValue = {
    favoritesState,
    favoritesDispatch,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <CartContext.Provider value={cartContextValue}>
        <FavoritesContext.Provider value={favoritesContextValue}>
          <div className="App" data-bs-theme={themeState}>
            <RouterProvider router={router} />
          </div>
        </FavoritesContext.Provider>
      </CartContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
