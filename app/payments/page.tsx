"use client";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentMethod, setAddress, loadStateFromLocalStorage } from '../../redux/paymentslice';
import { RootState, AppDispatch } from '../../redux/store';
import Image from 'next/image';
import Ima from '../../public/images/payments.png';
import Navbar from '@/components/custom/Navbar';
import Footer from '@/components/custom/Footer';
import Modal from '@./../../app/payments/_components/modal';

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

  const [showModal, setShowModal] = useState(false);

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

    // Check if all required fields are filled
    if (
      paymentMethod &&
      address.addressLine1 &&
      address.city &&
      address.state &&
      address.zipCode
    ) {
      setShowModal(true);
    } else {
      alert('Please fill in all required fields.');
    }

    console.log('Payment Method:', paymentMethod);
    console.log('Address:', address);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen p-10">
        <div className="bg-white p-8 max-w-lg w-full">
          <h2 className="text-2xl font-semibold mb-4">PAYMENT</h2>
          <form onSubmit={handleSubmit}>
            <fieldset className="mb-6 border-gray border-2 rounded p-4">
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  {['debitCard/CreditCard', 'paypal', 'bitcoin', 'appleWallet'].map((method) => (
                    <tr key={method} className="border-b border-gray-300">
                      <td className="py-2 px-4">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={handlePaymentMethodChange}
                          className="mr-2"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <label>
                          {method.charAt(0).toUpperCase() + method.slice(1).replace(/([A-Z])/g, ' $1')}
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                <div className="grid grid-cols-2 gap-4">
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
              </div>
            </fieldset>

            <button
              type="submit"
              className="w-[50%] bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition duration-300"
            >
              Pay
            </button>
          </form>
        </div>
        <div className="relative w-1/2 h-auto p-4">
          <Image
            src={Ima}
            width={400}
            height={200}
            alt="payments"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      <Footer />
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        message="Your Order Has Been Placed Successfully"
        imageUrl="https://s3-alpha-sig.figma.com/img/5d8c/c585/7dda1f9cce2a47ba0daf6a6e5785c931?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IB3DDM4vjUkUPX5RH12HP48cVsT2wGuNspok-dYDo8G-uCwGDK1opEOT9DOYxivClSI0LmGfKMKo2FXp~PowW3aDKyYTgbqdgMquufVV00tBd0-nDa3Tw85GHnxzCH0xX~T2h8~SyULgZ3n5sv4asvHptiBvqgfGmYxdH9LybUTPxIeMEe0FFBYOkAIZFcp5PTVJ47nuGcbtS-zAuEECWsEX~bKAahPUnQCpYTkfJGV601fFLWLTVpXnis-7Se7sH~KKfflAWMctIWyIJmF8gllF~5EC4P5PJsfa16vreJwHZiOdTZrgPKW2nccRK82IitqzA1M~JWzc~BRFV3FD-w__"
      />
    </>
  );
};

export default PaymentPage;
