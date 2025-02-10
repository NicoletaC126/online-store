import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "../store/Cart/context";
import { addToCart } from "../store/Cart/actions";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { cartDispatch } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://www.cheapshark.com/api/1.0/deals?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("product", data);
        setProduct(data);
      })
      .catch((e) => console.error("Error fetching product", e));
  }, [id]);

  if (product === undefined) return;

  const { retailPrice, salePrice, name, thumb } = product.gameInfo ?? {};
  const customProduct = {
    retailPrice,
    salePrice,
    title: name,
    thumb,
    dealID: id,
  };

  return (
    <Layout>
      <h1>{name}</h1>
      <div className="d-flex justify-content-center align-items-center gap-3">
        <img src={thumb} alt={name} height="200px" />
        <div className="d-flex flex-column align-items-center">
          <p>Pret intreg: {retailPrice} $</p>
          <p className="text-danger fw-bold">Pret redus: {salePrice} $</p>
          <Button
            variant="success"
            style={{ alignItems: "start" }}
            onClick={() => cartDispatch(addToCart(customProduct))}
          >
            Adauga in cos
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
