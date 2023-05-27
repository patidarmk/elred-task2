import "./App.css";
import Categories from "./Components/Products/Categories";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import Product from "./Components/Products/showProducts";
import Menu from "./Components/Products/Menu";
import ProductDetails from "./Components/Products/ProductDetails";
import Cart from "./Components/Products/Cart";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [productList, setProductList] = useState();
  const [selectedItem, setSelecteditem] = useState();
  const [showOrderList, setShowOrderlist] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const toastDark = () => toast.dark("comming soon...");
  const toastItemAdded = () => toast.success("Product Added to Cart");
  const toastRemoveItem = () => toast.info("Item Removed");
  const toastClearCart = () => toast.warn("All Items Removed");
  const toastOrderPlaced = () => toast.success("Order Placed Succesfully");
  const [selectedCategories, setSelectedCategories] = useState(
    "643e7a9edb684bac5851d8e1"
  );
  const [isActive, setIsActive] = useState(false);
  const [categoriesList, setCategoriesList] = useState();
  const [subCategoriesList, setSubCategoriesList] = useState();
  const [cart, setCart] = useState([]);
  const getSubCategories = (categories = "643e7a9edb684bac5851d8e1") => {
    fetch(
      `https://elredtest.s3.amazonaws.com/reactAssignment/getSubCategory_${categories}.json`
    )
      .then((response) => response.json())
      .then((data) => setSubCategoriesList(data));
  };

  const getProducts = (subCategoryId = "643e7a9edb684bac5851d8e2") => {
    fetch(
      `https://elredtest.s3.amazonaws.com/reactAssignment/getProduct_${subCategoryId}.json`
    )
      .then((response) => response.json())
      .then((data) => setProductList(data));
    setIsActive(true);
  };

  const handlerHome = () => {
    setIsActive(false);
  };

  const handleCloseOrderList = () => {
    setShowOrderlist(false);
  };

  const fetchData = () => {
    fetch(
      "https://elredtest.s3.amazonaws.com/reactAssignment/getCategories.json"
    )
      .then((response) => response.json())
      .then((data) => setCategoriesList(data));
    fetch(
      "https://elredtest.s3.amazonaws.com/reactAssignment/getCategories.json"
    )
      .then((response) => response.json())
      .then((data) => setCategoriesList(data));
  };
  const handleonClickProduct = (e) => {
    const itemID = e.currentTarget.getAttribute("data-id");
    const item = productList?.result.filter(
      (item) => item.itemNumber === itemID
    );
    setSelecteditem(item[0]);
    setShowOrderlist(true);
  };

  useEffect(() => {
    fetchData();
    getSubCategories();
  }, []);

  return (
    <div className="wrapper">
      <Navbar
        toastDark={toastDark}
        handleCloseOrderList={handleCloseOrderList}
      />

      <div className="angry-grid">
        <Sidebar handleCloseOrderList={handleCloseOrderList} />
        {isActive == 0 && (
          <Categories
            categoriesList={categoriesList}
            subCategoriesList={subCategoriesList}
            getSubCategories={getSubCategories}
            getProducts={getProducts}
            productList={productList}
          />
        )}
        {isActive == 1 && (
          <Product
            productList={productList}
            handleonClickProduct={handleonClickProduct}
            toastDark={toastDark}
            handleCloseOrderList={handleCloseOrderList}
          />
        )}

        <div className="cart">
          <Cart
            orderList={orderList}
            setCart={setCart}
            cart={cart}
            toastDark={toastDark}
            toastClearCart={toastClearCart}
            toastOrderPlaced={toastOrderPlaced}
          />
        </div>
      </div>
      {isActive && (
        <Menu
          handlerHome={handlerHome}
          subCategoriesList={subCategoriesList}
          getProducts={getProducts}
          handleCloseOrderList={handleCloseOrderList}
        />
      )}
      {showOrderList && (
        <ProductDetails
          selectedItem={selectedItem}
          closeModel={handleCloseOrderList}
          orderList={orderList}
          setCart={setCart}
          setOrderList={setOrderList}
          toastItemAdded={toastItemAdded}
          toastRemoveItem={toastRemoveItem}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
// https://elredtest.s3.amazonaws.com/reactAssignment/getSubCategory_643e7a9edb684bac5851d8e1.json
// https://elredtest.s3.amazonaws.com/reactAssignment/getProduct_<subCategoryId>.json
