import { useContext } from "react";
import Layout from "../components/Layout";
import { FavoritesContext } from "../store/Favorites/context";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { removeFromFavorites } from "../store/Favorites/actions";
import { CartContext } from "../store/Cart/context";
import { addToCart } from "../store/Cart/actions";

const Favorites = () => {
  const { favoritesState, favoritesDispatch } = useContext(FavoritesContext);
  const { cartDispatch } = useContext(CartContext);

  return (
    <Layout>
      {favoritesState.length === 0 ? (
        <h1>Nu ai produse la favorite!</h1>
      ) : (
        <div>
          <h2>Produse favorite</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>Titlu</th>
                <th>Pret/buc</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {favoritesState.map((el) => (
                <tr key={el.dealID}>
                  <td>
                    <img src={el.thumb} height="150px" alt={el.title} />
                  </td>
                  <td>{el.title}</td>
                  <td>{el.salePrice}</td>
                  <td>
                    <Button
                      onClick={() =>
                        favoritesDispatch(removeFromFavorites(el.dealID))
                      }
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => cartDispatch(addToCart(el))}>
                      <i className="bi bi-cart4"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Layout>
  );
};

export default Favorites;
