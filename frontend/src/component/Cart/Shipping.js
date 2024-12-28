import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Country, State } from 'country-state-city';

import { saveShippingInfo } from '../../actions/cartAction';
import CheckOutSteps from './CheckOutSteps';


const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector(state => state.cart);

  const [formData, setFormData] = useState({
    address: shippingInfo.address || '',
    city: shippingInfo.city || '',
    state: shippingInfo.state || '',
    country: shippingInfo.country || '',
    pinCode: shippingInfo.pinCode || '',
    phoneNo: shippingInfo.phoneNo || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.phoneNo || formData.phoneNo.length !== 10) {
      newErrors.phoneNo = 'Phone number must be 10 digits';
    }
    
    if (!formData.pinCode || formData.pinCode.length !== 6) {
      newErrors.pinCode = 'PIN code must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    dispatch(saveShippingInfo(formData));
    navigate('/order/confirm');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto">
        <CheckOutSteps activeStep={0} />
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  name="pinCode"
                  placeholder="PIN Code"
                  value={formData.pinCode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.pinCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.pinCode}</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="tel"
                name="phoneNo"
                placeholder="Phone Number"
                value={formData.phoneNo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {errors.phoneNo && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNo}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Country</option>
                {Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>

              {formData.country && (
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select State</option>
                  {State.getStatesOfCountry(formData.country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <button
              type="submit"
              disabled={!formData.state}
              className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                formData.state
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Continue to Order Confirmation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;