import { useState } from "react";
import ProductDetails from "./ProductDetails";
const showProducts = ({ productList, handleonClickProduct }) => {
  const img =
    "https://newpublicbucket.s3.us-east-2.amazonaws.com/productListing/categories/category2.png";
  return (
    <div className="products products-all">
      <h3>All Products</h3>
      <div className="cards">
        {productList?.result.length >= 1 &&
          productList?.result.map((item) => {
            console.log(item.itemDescription);
            return (
              <div
                className="product-card"
                data-id={item.itemNumber}
                onClick={(e) => handleonClickProduct(e)}
              >
                <img
                  src={img}
                  data-id={item.itemNumber}
                  onClick={(e) => handleonClickProduct(e)}
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
