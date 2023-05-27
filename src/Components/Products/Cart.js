import { useState, useEffect } from "react";
import crossSvg from "../../assets/cross.svg";
import emptycart from "../../assets/emptycart.svg";

const Cart = ({
  orderList,
  setCart,
  cart,
  toastDark,
  toastClearCart,
  toastOrderPlaced
}) => {
  const [viewItems, setViewItems] = useState(false);
  let cartData = [];
  cartData = localStorage.getItem("cart");
  cartData = JSON.parse(cartData);

  useEffect(() => {
    cartData = localStorage.getItem("cart");
    cartData = JSON.parse(cartData);
    console.log(cartData);
    if (cartData) {
      setCart(cartData);
    }
  }, []);

  useEffect(() => {
    cartData = localStorage.getItem("cart");
    cartData = JSON.parse(cartData);
    if (cartData) {
      setCart(cartData);
    }
  }, [orderList]);

  let ItemTotal;
  if (cart.lenth>0) {
    ItemTotal = cart.reduce((total, item) => total + item[0].price, 0);
  }
  const SGST = Number((ItemTotal / 100) * 9).toFixed(2);
  const CGST = Number((ItemTotal / 100) * 9).toFixed(2);
  const IGST = Number((ItemTotal / 100) * 9).toFixed(2);
  const taxAmount = Number(SGST) + Number(CGST) + Number(IGST);
  const address = "xyz opposite school partapur";
  const totalPrice = Number(ItemTotal + taxAmount).toFixed(2);

  const handleShowAll = () => {
    console.log("hide");
    setViewItems(!viewItems);
  };

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    toastClearCart();
    setCart([]);
  };
  // const handleEdit = () => {
  //   setShowOrderlist(true);
  //   localStorage.getItem("cart");

  // };

  const handlePlaceOrder = () => {
    localStorage.removeItem("cart");
    toastOrderPlaced();
    setCart([]);
  };

  return (
    <>
      {cart?.length == 0 && (
        <div className="cart-items-all ">
          <table>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </table>
          <div className="cart-empty">
            <img className="cart-image" src={emptycart} alt="cover" />
            <span>items not added yet</span>
          </div>
        </div>
      )}
      {viewItems && (
        <div className="cart-details">
          <div className="cart-items-all">
            <table>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>
                  <img src={crossSvg} onClick={handleShowAll} alt="" />
                </th>
              </tr>
              {cart?.map((order, index) => {
                console.log(order);
                return (
                  <tr key={index}>
                    <td>
                      <div className="orderlist-item--details">
                        <img
                          className="cart-productimage"
                          src={
                            order[0]?.productImages[0] != ""
                              ? order[0]?.productImages[0]
                              : productDefaultImg
                          }
                          alt=""
                        />
                        <div className="orderlist-item--title">
                          <span className="orderlist-item--title-main">
                            {order[0].itemDescription}
                          </span>
                          <span className="orderlist-item--sub-title">
                            {order[0].variants[0].colorDescription} |{" "}
                            {order[0].variants[0].packingDescription}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{order[0].amount}</td>
                    <td>{order[0].variants[0].grossPrice * order[0].amount}</td>
                  </tr>
                );
              })}
            </table>
            <hr className="cart-hr"></hr>
            <button className="cart-other-btn" onClick={handleShowAll}>
              View less
            </button>
          </div>
        </div>
      )}
      {cart?.length > 0 && !viewItems && (
        <div className="cart-details">
          <div className="cart-items">
            <table>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                {/* <th onClick={handleEdit}>Edit</th> */}
              </tr>
              {cart?.map((order, index) => {
                console.log(order);
                return (
                  index < 4 && (
                    <tr key={index}>
                      <td>
                        <div className="orderlist-item--details">
                          <img
                            className="cart-productimage"
                            src={
                              order[0]?.productImages[0] != ""
                                ? order[0]?.productImages[0]
                                : productDefaultImg
                            }
                            alt=""
                          />
                          <div className="orderlist-item--title">
                            <span className="orderlist-item--title-main">
                              {order[0].itemDescription}
                            </span>
                            <span className="orderlist-item--sub-title">
                              {order[0].variants[0].colorDescription} |{" "}
                              {order[0].variants[0].packingDescription}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{order[0].amount}</td>
                      <td>
                        {order[0].variants[0].grossPrice * order[0].amount}
                      </td>
                    </tr>
                  )
                );
              })}
            </table>
            <hr className="cart-hr"></hr>
            <button className="cart-other-btn" onClick={handleShowAll}>
              See all
            </button>
          </div>
          <div className="other-text">
            <span>Other Instruction</span>
            <a className="add-btn" onClick={toastDark}>
              Add
            </a>
          </div>

          <div className="cartInfo">
            <div className="instruction">
              <span className="cart-order-text">Purchase Order Number</span>
              <span className="cart-order-number">1456789098765</span>
            </div>
            <div className="instruction">
              <div className="cart-address">
                <span className="cart-order-text"> Addresses </span>
                <a className="add-btn" onClick={toastDark}>
                  Add
                </a>
              </div>
              {address}
            </div>
            <div>
              <div className="cart-price">
                <span>Items Total</span>
                <span>{ItemTotal}</span>
              </div>
              <div className="cart-price">
                <span>SGST (9%)</span>
                <span>{SGST}</span>
              </div>
              <div className="cart-price">
                <span>CGST (9%)</span>
                <span>{CGST}</span>
              </div>
              <div className="cart-price">
                <span>IGST (9%)</span>
                <span>{IGST}</span>
              </div>
              <div className="cart-price">
                <span>Texabale Amount</span>
                <span>{taxAmount}</span>
              </div>
              <hr className="cart-hr"></hr>
              <div className="cart-price">
                <span>Order Total</span>
                <span>{totalPrice}</span>
              </div>
              <div className="cart-price">
                <button className="add" onClick={handleClearCart}>
                  Clear Cart
                </button>
                <button className="add-to-cart" onClick={handlePlaceOrder}>
                  Place order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
