const Cart = () => {
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  const ItemTotal = cart.reduce((total, item) => total + item.price, 0);

  const SGST = (ItemTotal / 100) * 9;
  const CGST = SGST;
  const IGST = SGST;
  const taxAmount = 1000;
  const address = "xyz opposite school partapur";
  const totalPrice = ItemTotal + SGST + CGST + IGST + taxAmount;
  return (
    <div className="cart-details">
      <table>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        {cart.map((order, index) => {
          return (
            <tr key={index}>
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
              <td>{order.variants[0].grossPrice * order.amount}</td>
            </tr>
          );
        })}
      </table>
      <div className="cartInfo">
        <div className="instruction">
          <span>Other Instruction</span>
          <input type="text" />
        </div>
        <div className="instruction">
          <span> Order Number</span>
          1456789098765
        </div>
        <div className="instruction">
          <span> Address </span>
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
          <div className="cart-price">
            <span>Order Total</span>
            <span>{totalPrice}</span>
          </div>
          <div className="cart-price">
            <button className="add">Clear Cart</button>
            <button className="add-to-cart">Place order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
