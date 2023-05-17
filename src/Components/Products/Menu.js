import homeSvg from "../../assets/home.svg";

const Menu = ({ handlerHome, subCategoriesList, getProducts }) => {
  const img =
    "https://newpublicbucket.s3.us-east-2.amazonaws.com/productListing/categories/category1.png";

  return (
    <div className="footer-menu">
      <div>
        <img src={homeSvg} onClick={handlerHome} />
      </div>
      <div>
        {subCategoriesList?.result.length === 0 ? (
          <p className="empty-text">No sub Categories</p>
        ) : (
          subCategoriesList?.result.map((item, index) => {
            return (
              <img src={img} onClick={() => getProducts(item.subCategoryId)} />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Menu;
