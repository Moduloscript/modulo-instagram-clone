/* eslint-disable prettier/prettier */

import { useEffect } from 'react'


export default function NotFound() {
    useEffect(() => {
        Document.title = 'Not Found!';
    }, []);


    return (
        <div className='bg-gray-background'>
            <div className='mx-auth max-w-screen-lg'>
                <p className='text-center text-x2l'>
                 Not found
                </p>

             </div>

        </div>
    )

}