import { useState, useEffect } from "react";
import crossSvg from "../../assets/cross.svg";
import Cart from "./Cart";
const ProductDetails = ({ selectedItem, closeModel }) => {
  const [orderList, setOrderList] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [varient, setVarients] = useState(selectedItem?.variants[0].colorCode);
  const [cartPrice, setCartPrice] = useState(0);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const [colorInput, setColorInput] = useState(
    selectedItem?.variants[0].colorCode
  );
  const [packageInput, setPackageInput] = useState(
    selectedItem?.variants[0].packingCode
  );

  const handleSelectColor = (e) => {
    const colorID = e.currentTarget.getAttribute("data-id");
    setColorInput(colorID);
  };

  const handleSelectPackage = (e) => {
    const packageID = e.currentTarget.getAttribute("data-id");
    setPackageInput(packageID);
  };

  const colorVarients = selectedItem?.variants.filter(
    (obj, index, self) =>
      index === self.findIndex((o) => o.colorCode === obj.colorCode)
  );
  const packingVarients = selectedItem?.variants.filter(
    (obj, index, self) =>
      index === self.findIndex((o) => o.packingCode === obj.packingCode)
  );

  const getselectedVarient = selectedItem?.variants.filter(
    (obj, index, self) =>
      colorInput === obj.colorCode && packageInput === obj.packingCode
  );

  const handleQuantity = (e) => {
    // if (Number(e.target.value) >= 1) {
    setQuantity(Number(e.target.value));
    // }
    console.log(quantity);
    // handleCheckAvail();
  };

  const handleOrderList = () => {
    setShowCart(false);
    let obj = Object.assign({}, selectedItem);
    if (getselectedVarient.length == 0) {
      setDisabled(true);
    }
    obj.variants = [...getselectedVarient];

    // Update cart item quantity if already in cart
    if (
      orderList.some(
        (cartItem) => cartItem?.variants[0]?._id === obj.variants[0]._id
      )
    ) {
      setOrderList((orderList) =>
        orderList.map((cartItem) =>
          cartItem?.variants[0]?._id === obj.variants[0]._id
            ? {
                ...cartItem,
                amount: Number(cartItem.amount) + quantity,
                price:
                  (Number(cartItem.amount) + quantity) *
                  cartItem?.variants[0].grossPrice
              }
            : cartItem
        )
      );
    }

    // Add to cart
    else {
      setOrderList((orderList) => [
        ...orderList,
        {
          ...obj,
          amount: quantity,
          price: quantity * getselectedVarient[0].grossPrice
        } // <-- initial amount 1
      ]);
    }
    setShowCart(false);
  };

  const handleRemove = (id) => {
    const arr = orderList.filter((item) => item.variants[0]._id !== id);
    setOrderList(arr);
  };

  useEffect(() => {
    const price = orderList.reduce((total, item) => total + item.price, 0);
    console.log(price);
  }, [orderList]);

  const handleCart = () => {
    console.log("orderList");
    console.log(orderList);
    localStorage.setItem("cart", JSON.stringify(orderList));
    setShowCart(true);
    setOrderList([]);
  };

  return (
    <div className="product-details-container">
      <div className="product-details">
        <span> {selectedItem?.itemDescription}</span>
        <img src="https://newpublicbucket.s3.us-east-2.amazonaws.com/productListing/categories/category2.png" />
        <span></span>
        <div className="about-product">
          <span>{selectedItem?.itemDescription}</span>
          <span>{getselectedVarient[0].grossPrice}</span>
        </div>
        <p>Description</p>
        <span>Please Select Color Description </span>
        <ul>
          {colorVarients?.map((varient) => {
            return (
              <li
                className={colorInput === varient.colorCode ? "selected" : ""}
                data-id={varient.colorCode}
                onClick={handleSelectColor}
              >
                {varient.colorDescription}
              </li>
            );
          })}
        </ul>
        <span>Please Select Packaging Description </span>
        <ul>
          {" "}
          {packingVarients?.map((varient) => {
            return (
              <li
                className={
                  packageInput === varient.packingCode ? "selected" : ""
                }
                data-id={varient.packingCode}
                onClick={handleSelectPackage}
              >
                {varient.packingDescription}
              </li>
            );
          })}
        </ul>
        <span className="error">
          {getselectedVarient?.length === "0"
            ? "Combination is not available"
            : ""}{" "}
        </span>
        <label>Enter Quantity:</label>
        <input
          className="input-quantity"
          type="number"
          min="1"
          onChange={handleQuantity}
        />
        <span className="error">
          {quantity === 0 ? "min. quantity 1" : ""}{" "}
        </span>
        <button
          disabled={
            quantity < 1 || quantity === "" || getselectedVarient.length === 0
              ? true
              : false
          }
          onClick={handleOrderList}
          className="add"
        >
          Add
        </button>
      </div>
      {!showCart && (
        <div className="orderlist">
          <div>
            <div className="orderList-header">
              <p>Ordered List</p>
              <img
                className="orderlist-close"
                src={crossSvg}
                onClick={closeModel}
              />
            </div>
            <table>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
              {orderList.map((order) => {
                console.log(order);
                return (
                  <tr>
                    <td>
                      <div className="orderlist-item--title">
                        <span className="orderlist-item--title-main">
                          {order.itemDescription}
                        </span>
                        <span className="orderlist-item--sub-title">
                          {order.variants[0].colorDescription} |{" "}
                          {order.variants[0].packingDescription}
                        </span>
                      </div>
                    </td>
                    <td>{order.amount}</td>
                    <td>{order.variants[0].grossPrice + "*" + order.amount}</td>
                    <td>
                      <img
                        className="orderlist-delete"
                        src={crossSvg}
                        onClick={() => handleRemove(order.variants[0]._id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </table>
            {orderList.length >= 1 && (
              <button className="add-to-cart" onClick={handleCart}>
                add to cart{" "}
              </button>
            )}
          </div>
        </div>
      )}
      {showCart && <Cart cart={cart} />}
    </div>
  );
};

export default ProductDetails;
