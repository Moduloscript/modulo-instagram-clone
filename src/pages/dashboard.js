/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Timeline from '../components/Timeline';

export default function Dashboard() {
    useEffect(() => {
        document.title = 'Instagram'
    }, []);

    return (
        <div className='bg-gray-background'>
            <Header />
            <div className='grid'>
                <Timeline />
                <Sidebar />

            </div>
            
       </div> 
    )
}
