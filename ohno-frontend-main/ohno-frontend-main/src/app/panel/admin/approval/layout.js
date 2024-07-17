import React, { Suspense } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './Navigation';

function layout({ children }) {
    return (
        <>
            <Suspense>
                <Navigation />
                <div className="approval_wrapper m-0">
                    {children}
                </div>
            </Suspense>
            <ToastContainer />
        </>
    )
}

export default layout