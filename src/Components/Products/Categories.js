import "./Products.css";
import search from "../../assets/search.svg";
const Categories = ({
  categoriesList,
  subCategoriesList,
  getSubCategories,
  getProducts,
  toastDark
}) => {
  console.log(subCategoriesList?.result);
  const img = categoriesList?.result[1].categoryImageURL;
  return (
    <div className="categories">
      <div className="categories-header">
        <h2>Print Heads </h2>
        <div className="search">
          <img className="search-svg" src={search} alt="Checkout button" />
          <input type="Text" placeholder="Search..." onClick={toastDark} />{" "}
        </div>
      </div>
      <div className="product-main">
        <div className="product-categories">
          {categoriesList?.result.map((item, index) => {
            const image =
              item.categoryImageURL != "" ? item.categoryImageURL : img;
            return (
              <div className="card">
                <p className="card-title">{item.categoryName}</p>
                <img
                  alt="categories-cover"
                  src={image}
                  onClick={() => getSubCategories(item.categoryId)}
                />
              </div>
            );
          })}
        </div>
        <hr className="categories-hr"></hr>
        <div className="sub-categories">
          <div className="sub-categories-cards">
            {subCategoriesList?.result.length === 0 ? (
              <p className="empty-text">No sub Categories</p>
            ) : (
              subCategoriesList?.result.map((item, index) => {
                return (
                  <div
                    className="sub-categories-card"
                    onClick={() => getProducts(item.subCategoryId)}
                  >
                    <img
                      className="sub-categories-img"
                      alt="sub-cat"
                      src={img}
                      onClick={() => getProducts(item.subCategoryId)}
                    />
                    <p className="card-title-sub">{item.subCategoryName}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
