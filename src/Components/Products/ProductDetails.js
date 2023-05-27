import { useState, useEffect } from "react";
import crossSvg from "../../assets/cross.svg";
import productDefaultImg from "../../assets/product-default.svg";
import Cart from "./Cart";
const ProductDetails = ({
  selectedItem,
  closeModel,
  orderList,
  setCart,
  setOrderList,
  toastItemAdded,
  toastRemoveItem
}) => {
  const [quantity, setQuantity] = useState(0);
  const [disabled, setDisabled] = useState(false);
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

  const variants = selectedItem?.variants.filter(
    (obj, index, self) =>
      colorInput === obj.colorCode && packageInput === obj.packingCode
  );

  const handleQuantity = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleOrderList = () => {
    setShowCart(false);
    let obj = Object.assign({}, selectedItem);
    if (variants.length == 0) {
      setDisabled(true);
    }
    obj.variants = [...variants];

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
                amount:
                  Number(cartItem?.amount) + quantity > 100
                    ? 100
                    : Number(cartItem?.amount) + quantity,
                price:
                  Number(cartItem?.amount) + quantity > 100
                    ? 100 * cartItem?.variants[0].grossPrice
                    : (Number(cartItem?.amount) + quantity) *
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
          amount: quantity > 100 ? 100 : quantity < 12 ? 12 : quantity,
          price:
            quantity > 100
              ? 100 * variants[0].grossPrice
              : quantity < 12
              ? 12 * variants[0].grossPrice
              : quantity * variants[0].grossPrice
        } // <-- initial amount 1
      ]);
    }
    setShowCart(false);
  };

  const handleRemove = (id) => {
    const arr = orderList.filter((item) => item.variants[0]._id !== id);
    setOrderList(arr);
    toastRemoveItem();
  };

  useEffect(() => {
    const price = orderList.reduce((total, item) => total + item.price, 0);
  }, [orderList]);

  const handleCart = () => {
    let cartItem = localStorage.getItem("cart");
    if (cartItem) {
      cartItem = JSON.parse(cartItem);
      cartItem.push(orderList);
      localStorage.setItem("cart", JSON.stringify(cartItem));
    } else {
      let cartItem = [];
      cartItem.push(orderList);
      localStorage.setItem("cart", JSON.stringify(cartItem));
    }
    toastItemAdded();
    setShowCart(true);
    setOrderList([]);
    closeModel();
  };

  return (
    <div className="product-details-container">
      <div className="product-details">
        <span> {selectedItem?.itemDescription}</span>
        <img
          src={
            selectedItem?.productImages[0] != null
              ? selectedItem?.productImages[0]
              : productDefaultImg
          }
          alt=""
        />
        <span>#{variants[0]?.bpCatalogNumber}</span>
        <div className="product-title">
          <span>{selectedItem?.itemDescription}</span>
          {variants && (
            <span>
              {selectedItem.currency.symbol}
              {variants[0]?.grossPrice}
            </span>
          )}
        </div>
        <p>Neque porro quisquam est qui dolorem</p>
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
          {variants?.length == 0 ? "Combination is not available" : ""}{" "}
        </span>
        <label>Enter Quantity:</label>
        <input
          className="input-quantity"
          type="number"
          min="1"
          onChange={handleQuantity}
          value={quantity || ""}
        />
        <span className="error">Min. Quantity 12</span>
        <label>
          <input type="checkbox" /> Need Urgent Order
        </label>
        <button
          disabled={
            quantity < 1 || quantity === "" || variants.length === 0
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
                return (
                  <tr>
                    <td>
                      <div className="orderlist-item--details">
                        <img
                          className="cart-productimage"
                          src={
                            order?.productImages != ""
                              ? order?.productImages
                              : productDefaultImg
                          }
                          alt=""
                        />
                        <div className="orderlist-item--title">
                          <span className="orderlist-item--title-main">
                            {order.itemDescription}
                          </span>
                          <span className="orderlist-item--sub-title">
                            {order.variants[0].colorDescription} |{" "}
                            {order.variants[0].packingDescription}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{order.amount}</td>
                    <td>{order.price}</td>
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
              <button className="add-to-cart add-to-list" onClick={handleCart}>
                add to cart{" "}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
