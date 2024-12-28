import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Plus, Minus, MessageCircle, X } from 'lucide-react';
import ReviewCard from './ReviewCard';
import { addItemToCart } from '../../actions/cartAction';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import 'swiper/css';
import 'swiper/css/navigation';

// Custom Rating Component
const Rating = ({ value = 0, onChange, className = '' }) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          className={`focus:outline-none ${onChange ? 'cursor-pointer' : 'cursor-default'}`}
        >
          <Star
            className={`w-5 h-5 ${
              star <= value
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

// Custom Dialog Component
const Dialog = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  );
};

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector(state => state.newReview);

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(prev => prev - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemToCart(id, quantity));
    window.alert('Item added to cart!');
  };

  const submitReviewToggle = () => {
    setOpen(prev => !prev);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.append("rating", rating);
    myForm.append("comment", comment);
    myForm.append("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (reviewError) {
      dispatch(clearErrors());
    }

    if (success) {
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-xl p-6">
        {/* Image Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            slidesPerView={1}
            className="rounded-lg overflow-hidden"
          >
            {product.images?.map((item, i) => (
              <SwiperSlide key={i}>
                <img
                  src={item.url}
                  alt={`Product view ${i + 1}`}
                  className="w-full h-96 object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-gray-500 text-sm">Product # {product._id}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Rating value={product.ratings || 0} />
              <span className="text-gray-600">({product.numOfReviews} Reviews)</span>
            </div>
            <div className="font-semibold">
              {product.Stock < 1 ? (
                <span className="text-red-500">Out of Stock</span>
              ) : (
                <span className="text-green-600">In Stock</span>
              )}
            </div>
          </div>

          <div className="text-4xl font-bold text-blue-600">
            ₹{product.price?.toLocaleString()}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button 
                onClick={decreaseQuantity}
                className="px-3 py-2 hover:bg-gray-100"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                value={quantity}
                readOnly
                className="w-16 text-center focus:outline-none"
              />
              <button 
                onClick={increaseQuantity}
                className="px-3 py-2 hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              className={`flex-grow flex items-center justify-center gap-2 py-2 px-4 rounded-lg ${
                product.Stock < 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              disabled={product.Stock < 1}
              onClick={addToCartHandler}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2">Description:</h4>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <button 
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300"
            onClick={submitReviewToggle}
          >
            <MessageCircle className="h-4 w-4" />
            Submit Review
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8 bg-white shadow-md rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h3>

        <Dialog open={open} onClose={submitReviewToggle}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Submit Review</h3>
            <button onClick={submitReviewToggle} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-center">
              <Rating
                value={rating}
                onChange={setRating}
              />
            </div>
            <textarea
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                onClick={submitReviewToggle}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={reviewSubmitHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </Dialog>

        {product.reviews?.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No Reviews Yet</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;