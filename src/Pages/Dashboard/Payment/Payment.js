import React from 'react';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';
import Loading from '../../../Shared/Loading/Loading';

// for stripe (payment gateway [Module 77-4])
const stripePromise = loadStripe(process.env.REACT_APP_STRIKE_PK);

const Payment = () => {
    const booking = useLoaderData();

    // const navigation = useNavigation();

    const { slot, treatment, price, appointmentDate } = booking;
    console.log(booking);

    // if (navigation.state === 'loading') {  // 77-9,last moment
    //     return <Loading></Loading>
    // }

    return (
        <div>
            <h3 className="text-3xl text-center">Payment for {treatment}</h3>
            <h3 className="text-xl text-center">Please pay for <strong>$ {price}</strong> for appointment on {appointmentDate} at {slot}</h3>

            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;