import { useContext } from "react";
import Layout from "../components/Layout";
import { CartContext } from "../store/Cart/context";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { removeFromCart } from "../store/Cart/actions";

const Cart = () => {
  const { cartState, cartDispatch } = useContext(CartContext);
  const total = cartState.reduce((total, el) => {
    return Math.round((total + el.quantity * el.salePrice) * 100) / 100;
  }, 0);

  return (
    <Layout>
      {cartState.length === 0 ? (
        <h1>Nu ai produse in cos!</h1>
      ) : (
        <div>
          <h2>Produse adaugate</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>Titlu</th>
                <th>Pret/buc</th>
                <th>Cantitate</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartState.map((el) => (
                <tr key={el.dealID}>
                  <td>
                    <img src={el.thumb} height="150px" alt={el.title} />
                  </td>
                  <td>{el.title}</td>
                  <td>{el.salePrice}</td>
                  <td>{el.quantity}</td>
                  <td>
                    {Math.round(el.quantity * el.salePrice * 100) / 100} $
                  </td>
                  <td>
                    <Button
                      onClick={() => cartDispatch(removeFromCart(el.dealID))}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={6} className="text-end fw-bold m-2">
                  Total final: {total} $
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </Layout>
  );
};

export default Cart;
