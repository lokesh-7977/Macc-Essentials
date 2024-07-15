"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { saveOrder } from '@/redux/orderslice';
import  Image  from "next/image";
import Im from '../../public/images/checkout-image.png'

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
}> = ({ name, placeholder, type = 'text', register, error }) => (
  <div className="mb-4">
    <input
      id={name}
      type={type}
      placeholder={placeholder}
      {...register(name, { required: `${placeholder} is required` })}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

const CheckoutPage: React.FC = () => {
  const methods = useForm<FormData>();
  const dispatch = useDispatch();

  const onSubmit = (data: FormData) => {
    localStorage.setItem('checkoutData', JSON.stringify(data));
    dispatch(saveOrder(data));
    console.log("Form data submitted:", data);
  };

  return (
    <div className="flex p-6 max-w-4xl mx-auto bg-white gap-10">
      
      <div className="w-1/2 p-6">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className='font-bold mb-4'>Delivery Address</p>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField
              name="address"
              placeholder="Address"
              register={methods.register}
              error={methods.formState.errors.address?.message}
            />
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
            <button
              type="submit"
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-800 transition duration-300"
            >
              Save and Continue
            </button>
          </form>
        </FormProvider>
      </div>
      <div className="flex-shrink-0 w-1/2">
        <Image
          src={Im}
          width={600}
          height={350}
          alt="Checkout"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
