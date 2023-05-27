import productDefaultImg from "../../assets/product-default.svg";
import search from "../../assets/search.svg";
const showProducts = ({
  productList,
  handleonClickProduct,
  toastDark,
  handleCloseOrderList
}) => {
  const img =
    "https://newpublicbucket.s3.us-east-2.amazonaws.com/productListing/categories/category2.png";
  return (
    <div className="products products-all">
      <div className="categories-header" onClick={handleCloseOrderList}>
        <h2>All Products</h2>
        <div onClick={toastDark} className="search">
          <img className="search-svg" src={search} alt="Checkout button" />
          <input type="Text" placeholder="Search..." />{" "}
        </div>
      </div>
      <div className="cards">
        {productList?.result.length >= 1 &&
          productList?.result.map((item) => {
            return (
              <div
                className="product-card"
                data-id={item.itemNumber}
                onClick={(e) => handleonClickProduct(e)}
              >
                <img
                  src={
                    item?.productImages[0] != null
                      ? item?.productImages[0]
                      : productDefaultImg
                  }
                  data-id={item.itemNumber}
                  onClick={(e) => handleonClickProduct(e)}
                  alt=""
                />
                <p
                  className="product-card--title"
                  data-id={item.itemNumber}
                  onClick={(e) => handleonClickProduct(e)}
                >
                  {item.itemDescription}
                </p>
                <p
                  className="product-card--description"
                  data-id={item.itemNumber}
                  onClick={(e) => handleonClickProduct(e)}
                >
                  Neque porro quisquam est qui dolorem{" "}
                </p>
              </div>
            );
          })}
        {productList?.result.length === 0 && <div> Products Not Available</div>}
      </div>
    </div>
  );
};

export default showProducts;
