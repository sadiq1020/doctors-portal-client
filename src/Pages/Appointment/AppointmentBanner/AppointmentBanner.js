import React, { useState } from 'react';
import chair from '../../../assets/images/chair.png'
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
    // const [selectedDate, setSelectedDate] = useState(new Date()); // lift up the state 

    return (
        <header className='my-10'>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} className="max-w-sm rounded-lg shadow-2xl" alt='dentist chair' />
                    <div className='mr-10'>
                        <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                        />
                        {/* <p>You have selected date: {format(selectedDate, 'PP')}</p> */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;