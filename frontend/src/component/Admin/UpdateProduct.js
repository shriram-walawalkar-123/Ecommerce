import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  editProduct,
  getAdminProductDetails,
} from "../../actions/productAction";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = window.location.pathname;
  const productId = location.split("/").pop(); 

  const { loading: productLoading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];



  useEffect(() => {
    dispatch(getAdminProductDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product && product._id === productId) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Product updated successfully!");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, isUpdated, productId, product, updateError, navigate]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(editProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        {productLoading ? (
          <h2 className="text-2xl font-bold">Loading...</h2>
        ) : (
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-lg"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1 className="text-2xl font-bold mb-4 text-gray-700">
              Update Product
            </h1>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Product Name
              </label>
              <p className="text-sm text-gray-500 mb-1">
                Previous: {product?.name || "N/A"}
              </p>
              <input
                type="text"
                placeholder="Product Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price
              </label>
              <p className="text-sm text-gray-500 mb-1">
                Previous: {product?.price || 0}
              </p>
              <input
                type="number"
                placeholder="Price"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Stock
              </label>
              <p className="text-sm text-gray-500 mb-1">
                Previous: {product?.Stock || 0}
              </p>
              <input
                type="number"
                placeholder="Stock"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
                value={Stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <p className="text-sm text-gray-500 mb-1">
                Previous: {product?.description || "N/A"}
              </p>
              <textarea
                placeholder="Product Description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="3"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <p className="text-sm text-gray-500 mb-1">
                Previous: {product?.category || "N/A"}
              </p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Product Images
              </label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div className="mb-4 flex">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt="Old Product Preview"
                    className="h-20 w-20 object-cover mr-2"
                  />
                ))}
            </div>

            <div className="mb-4 flex">
              {imagesPreview.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Product Preview"
                  className="h-20 w-20 object-cover mr-2"
                />
              ))}
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded ${
                loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
              } text-white`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        )}
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
