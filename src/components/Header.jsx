import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ThemeContext } from "../store/Theme/context";
import { setDarkTheme, setLightTheme } from "../store/Theme/actions";
import { CartContext } from "../store/Cart/context";
import { FavoritesContext } from "../store/Favorites/context";

const navLinks = [
  { path: "/", title: "Acasa" },
  { path: "/products", title: "Products" },
  { path: "/cart", title: "Cos" },
  { path: "/favorites", title: "Favorite" },
];

const Header = () => {
  const { themeState, themeDispatch } = useContext(ThemeContext);
  const { cartState } = useContext(CartContext);
  const { favoritesState } = useContext(FavoritesContext);

  return (
    <header
      className={`d-flex justify-content-between align-items-center p-4 bg-${themeState}`}
    >
      {navLinks.map((navLink) => (
        <Link
          key={navLink.title}
          to={navLink.path}
          className={`text-${
            themeState === "light" ? "dark" : "light"
          } fw-bold`}
          style={{ textDecoration: "none", fontSize: "1.5rem" }}
        >
          {navLink.path === "/cart" ? (
            <>
              {navLink.title}
              <i className="bi bi-cart4 m-1"></i>
              {`(${cartState.length})`}
            </>
          ) : navLink.path === "/favorites" ? (
            <>
              {navLink.title}
              <i className="bi bi-star-fill m-1"></i>
              {`(${favoritesState.length})`}
            </>
          ) : (
            navLink.title
          )}
        </Link>
      ))}

      <Button
        onClick={() =>
          themeState === "light"
            ? themeDispatch(setDarkTheme())
            : themeDispatch(setLightTheme())
        }
      >
        {themeState === "light" ? (
          <i className="bi bi-brightness-high-fill large"></i>
        ) : (
          <i className="bi bi-moon-stars-fill"></i>
        )}
      </Button>
    </header>
  );
};

export default Header;
