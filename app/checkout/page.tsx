"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { saveOrder } from '@/redux/orderslice';
import Image from "next/image";
import Link from "next/link";
import Im from '../../public/images/checkout-image.png';
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import { useRouter } from "next/navigation";

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  mobileNumber: string;
}

const FormField: React.FC<{
  name: keyof FormData;
  placeholder: string;
  type?: string;
  register: any;
  error?: string;
  className?: string;
}> = ({ name, placeholder, type = 'text', register, error, className }) => (
  <div className={`mb-4 ${className}`}>
    <input
      id={name}
      type={type}
      placeholder={placeholder}
      {...register(name, { required: `${placeholder} is required` })}
      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const CheckoutPage: React.FC = () => {
  const methods = useForm<FormData>();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    localStorage.setItem('checkoutData', JSON.stringify(data));
    dispatch(saveOrder(data));
    router.push('/payments');
    console.log("Form data submitted:", data);
  };

  return (
    <>
      <Navbar />    
      <div className="flex flex-col lg:flex-row p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md gap-10">
        <div className="w-full lg:w-1/2 p-6 bg-gray-50 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Checkout</h1>
          <p className='text-xl font-semibold mb-6 text-gray-600'>Delivery Address</p>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  name="firstName"
                  placeholder="First Name"
                  register={methods.register}
                  error={methods.formState.errors.firstName?.message}
                />
                <FormField
                  name="lastName"
                  placeholder="Last Name"
                  register={methods.register}
                  error={methods.formState.errors.lastName?.message}
                />
              </div>
              <FormField
                name="address"
                placeholder="Address"
                register={methods.register}
                error={methods.formState.errors.address?.message}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  name="pincode"
                  placeholder="Pincode"
                  register={methods.register}
                  error={methods.formState.errors.pincode?.message}
                />
                <FormField
                  name="city"
                  placeholder="City"
                  register={methods.register}
                  error={methods.formState.errors.city?.message}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  name="state"
                  placeholder="State"
                  register={methods.register}
                  error={methods.formState.errors.state?.message}
                />
                <FormField
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  register={methods.register}
                  error={methods.formState.errors.mobileNumber?.message}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                <Link href="/" className="py-2 px-6 bg-gray-300 text-black font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300 text-center">
                  Back to Home
                </Link>
                <button
                  type="submit"
                  className="py-2 px-6 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 text-center"
                >
                  Save and Continue
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
        <div className="w-full lg:w-1/2">
          <Image
            src={Im}
            width={600}
            height={350}
            alt="Checkout"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
