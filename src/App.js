import "./App.css";
import Categories from "./Components/Products/Categories";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import Product from "./Components/Products/showProducts";
import Menu from "./Components/Products/Menu";
import ProductDetails from "./Components/Products/ProductDetails";

function App() {
  const [productList, setProductList] = useState();
  const [selectedItem, setSelecteditem] = useState();
  const [showOrderList, setShowOrderlist] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(
    "643e7a9edb684bac5851d8e1"
  );
  const [isActive, setIsActive] = useState(false);
  const [categoriesList, setCategoriesList] = useState();
  const [subCategoriesList, setSubCategoriesList] = useState();

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
      <Navbar />
      <div className="angry-grid">
        <Sidebar />
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
          />
        )}

        <div className="cart"></div>
      </div>
      {isActive && (
        <Menu
          handlerHome={handlerHome}
          subCategoriesList={subCategoriesList}
          getProducts={getProducts}
        />
      )}
      {showOrderList && (
        <ProductDetails
          selectedItem={selectedItem}
          closeModel={handleCloseOrderList}
        />
      )}
    </div>
  );
}

export default App;
// https://elredtest.s3.amazonaws.com/reactAssignment/getSubCategory_643e7a9edb684bac5851d8e1.json
// https://elredtest.s3.amazonaws.com/reactAssignment/getProduct_<subCategoryId>.json
