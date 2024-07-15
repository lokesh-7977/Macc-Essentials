"use client";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentMethod, setAddress, loadStateFromLocalStorage } from '../../redux/paymentslice';
import { RootState, AppDispatch } from '../../redux/store';
import Image from 'next/image';
import Ima from '../../public/images/payments.png';
interface Address {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
  }
  
  interface PaymentState {
    paymentMethod: string;
    address: Address;
  }
const PaymentPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const paymentMethod = useSelector((state: RootState) => state.payment.paymentMethod);
  const address = useSelector((state: RootState) => state.payment.address);

  useEffect(() => {
    dispatch(loadStateFromLocalStorage());
  }, [dispatch]);

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPaymentMethod(e.target.value));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setAddress({ ...address, [name]: value } as Address));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Payment Method:', paymentMethod);
    console.log('Address:', address);
  };

  return (
    <div className="flex items-center justify-center h-screen p-10">
      <div className="bg-white p-8 max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">PAYMENT</h2>
        <form onSubmit={handleSubmit}>
          {/* Payment Options */}
          <fieldset className="mb-6 border-gray border-2 rounded p-4">
            <div className="space-y-2">
              {['debitCard', 'creditCard', 'paypal', 'bitcoin', 'appleWallet'].map((method) => (
                <label key={method} className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={handlePaymentMethodChange}
                    className="mr-2 border"
                  />
                  {method.charAt(0).toUpperCase() + method.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Delivery Address */}
          <fieldset className="mb-6">
            <legend className="text-lg font-medium mb-2">Delivery Address:</legend>
            <div className="space-y-4">
              <input
                type="text"
                name="addressLine1"
                placeholder="Address Line 1"
                value={address.addressLine1}
                onChange={handleAddressChange}
                className="w-full p-2 border"
                required
              />
              <input
                type="text"
                name="addressLine2"
                placeholder="Address Line 2 (optional)"
                value={address.addressLine2 || ''}
                onChange={handleAddressChange}
                className="w-full p-2 border"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleAddressChange}
                className="w-full p-2 border"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleAddressChange}
                className="w-full p-2 border"
                required
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={address.zipCode}
                onChange={handleAddressChange}
                className="w-full p-2 border"
                required
              />
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Pay
          </button>
        </form>
      </div>
      <div className="relative w-600 h-1200">
      <Image
          src={Ima}
          width={400}
          height={300}
          alt="payments"
          className="w-full h-700 object-cover"
        />
      </div>
    </div>
  );
};

export default PaymentPage;
