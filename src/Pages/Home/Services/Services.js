import React from 'react';
import fluoride from '../../../assets/images/fluoride.png';
import cavity from '../../../assets/images/cavity.png';
import whitening from '../../../assets/images/whitening.png';
import Service from './Service';

const Services = () => {

    const servicesData = [
        {
            id: 1,
            name: 'Fluoride Treatment',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae non, ab officiis ullam dolores numquam.',
            img: fluoride
        },
        {
            id: 2,
            name: 'Cavity Treatment',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae non, ab officiis ullam dolores numquam.',
            img: cavity
        },
        {
            id: 3,
            name: 'Whitening Treatment',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae non, ab officiis ullam dolores numquam.',
            img: whitening
        },
    ]

    return (
        <div className='mt-16'>
            <div className='text-center'>
                <h4 className='text-xl font-bold text-primary uppercase'>Our Services</h4>
                <h2 className='text-3xl'>Services We Provide</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[34px] '>
                {
                    servicesData.map(service => <Service key={service.id} service={service}></Service>)
                }
            </div>
        </div>
    );
};

export default Services;