import "./Products.css";

const Categories = ({
  categoriesList,
  subCategoriesList,
  getSubCategories,
  getProducts,
  productList
}) => {
  console.log(subCategoriesList?.result);
  const img = categoriesList?.result[1].categoryImageURL;
  return (
    <div className="categories">
      <h2>Print Heads </h2>
      <div className="product-main">
        <div className="product-categories">
          {categoriesList?.result.map((item, index) => {
            const image =
              item.categoryImageURL != "" ? item.categoryImageURL : img;
            return (
              <div className="card">
                <p className="card-title">{item.categoryName}</p>
                <img
                  src={image}
                  onClick={() => getSubCategories(item.categoryId)}
                />
              </div>
            );
          })}
        </div>
        <div className="sub-categories">
          Sub-Categories
          {subCategoriesList?.result.length === 0 ? (
            <p className="empty-text">No sub Categories</p>
          ) : (
            subCategoriesList?.result.map((item, index) => {
              return (
                <div className="card">
                  <p className="card-title">{item.subCategoryName}</p>
                  <img
                    src={img}
                    onClick={() => getProducts(item.subCategoryId)}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
