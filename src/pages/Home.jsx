import Layout from "../components/Layout";
import { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { ThemeContext } from "../store/Theme/context";
import { CartContext } from "../store/Cart/context";
import { addToCart } from "../store/Cart/actions";
import { FavoritesContext } from "../store/Favorites/context";
import { addToFavorites } from "../store/Favorites/actions";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { themeState } = useContext(ThemeContext);
  const { cartDispatch } = useContext(CartContext);
  const { favoritesDispatch } = useContext(FavoritesContext);

  useEffect(() => {
    fetch("https://www.cheapshark.com/api/1.0/deals?pageSize=4")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setProducts(data);
      })
      .catch((e) => console.error("Error fetching home products", e));
  }, []);

  return (
    <Layout>
      <div
        className={`d-flex flex-wrap justify-content-between align-items-center bg-${themeState}`}
      >
        {products.map((product) => (
          <Card key={product.dealID} style={{ width: "18rem" }} className="m-3">
            <Link
              to={`/product/${encodeURI(product.dealID)}`}
              className={`text-${themeState === "light" ? "dark" : "light"}`}
              style={{ textDecoration: "none" }}
            >
              <Card.Img
                variant="top"
                className="object-fit-cover"
                height="200px"
                width="200px"
                src={product.thumb}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className="text-danger">
                  {product.salePrice} $
                </Card.Text>
              </Card.Body>
            </Link>
            <Button
              variant="success"
              onClick={() => {
                cartDispatch(addToCart(product));
              }}
            >
              Adauga in cos
            </Button>
            <Button
              variant="warning"
              onClick={() => favoritesDispatch(addToFavorites(product))}
            >
              Adauga la favorite
            </Button>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
