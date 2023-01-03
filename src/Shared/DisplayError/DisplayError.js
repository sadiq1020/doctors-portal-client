import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const DisplayError = () => {
    const { logOut } = useContext(AuthContext);
    const error = useRouteError();

    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login')
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <p className='text-error'>Something Went Wrong!</p>
            <p>{error.statusText || error.message}</p>
            <h3 className='text-3xl'>Please <button onClick={handleLogOut}>Sign Out</button></h3>
        </div>
    );
};

export default DisplayError;