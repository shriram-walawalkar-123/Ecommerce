import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearErrors,
  deleteReviews,
  getAllReviews,
} from "../../actions/productAction";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error: deleteError, isDeleted } = useSelector((state) => state.review);
  const { error, reviews, loading } = useSelector((state) => state.productReviews);

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
  };

  useEffect(() => {
    if (error) 
    dispatch(clearErrors());

    if (deleteError) 
    dispatch(clearErrors());

    if (isDeleted) {
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
    
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    { field: "user", headerName: "User", minWidth: 200, flex: 0.6 },
    { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => (params.row.rating >= 3 ? "text-green-500" : "text-red-500"),
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => deleteReviewHandler(params.row.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-1 1v1H5a1 1 0 000 2h10a1 1 0 100-2h-3V3a1 1 0 00-1-1H9zM4 7a1 1 0 011 1v7a2 2 0 002 2h6a2 2 0 002-2V8a1 1 0 112 0v7a4 4 0 01-4 4H7a4 4 0 01-4-4V8a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ),
    },
  ];

  const rows = reviews?.map((item) => ({
    id: item._id,
    rating: item.rating,
    comment: item.comment,
    user: item.name,
  }));

  return (
    <Fragment>
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto py-10">
          <form
            className="bg-white p-6 rounded-lg shadow-md mb-6"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">Product Reviews</h1>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Enter Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                required
              />
              <button
                type="submit"
                disabled={loading || productId === ""}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              >
                Search
              </button>
            </div>
          </form>
          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="bg-white shadow-md rounded-lg"
            />
          ) : (
            <div className="text-center py-10">
              <h2 className="text-lg text-gray-600">No Reviews Found</h2>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
