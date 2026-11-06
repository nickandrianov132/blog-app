'use client' 
import { useEffect } from 'react';

const ErrorPage = ({
    error, 
    retry}: {
        error: unknown
        retry: () => void
    }) => {
        useEffect(() => {
            console.error(error);
        }, [error])

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button
                className='border border-rose-500/70 bg-rose-400/30 text-slate-800 hover:text-slate-900'
                onClick={() => retry()}
            >
                Try Again
            </button>
        </div>
    );
}

export default Error;
