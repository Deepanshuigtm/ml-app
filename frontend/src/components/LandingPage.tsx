import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import HeadingSection from './HeadingSection';

interface LandingPageProps {
    backendName: string;
}

const LandingPage : React.FC<LandingPageProps> = ({backendName}) => {
    return (
        <>
        <div className='flex flex-col'>
        <div style={{
            height:'110vh'
        }} className='relative justify-between border-b border-gray-700'>
            <NavBar backendName='flask' />
            <HeadingSection />
        </div>
        <div style={{
            height:'90vh'
        }} className="flex relative bg-gray-950 aspect-square min-h-[16px] min-w-[16px] flex-col overflow-hidden text-gray-10 bg-gray-950">
            <p className="absolute left-1/2 top-20 -translate-x-1/2 whitespace-nowrap text-gray-10 duration-100  opacity-100">Ready to give it a try?</p>
            <div className="absolute left-1/2 top-60 flex w-screen -translate-x-1/2 flex-col items-center gap-6 px-4 text-gray-10 duration-100  opacity-100">
                <h2 className="text-[47px] font-normal leading-[56px]">Get on the list.</h2>
                <div className="w-full max-w-2xl rounded-full border border-gray-10/[.24] bg-gray-10/[.12] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.08)] duration-100 focus-within:bg-gray-10/20 hover:bg-gray-10/20 md:p-1">
                <form className="relative flex w-full items-center">
                    <input className="w-full bg-transparent px-3 py-3 pl-6 text-gray-900 outline-none placeholder:text-gray-600 !text-gray-10/60 !text-gray-10" placeholder="Enter your email to request early access." value="" />
                    <button type="submit" className="peer hidden whitespace-nowrap rounded-full bg-gray-50 px-5 py-3 font-normal text-gray-900 duration-300 hover:cursor-pointer hover:bg-gray-300 md:flex ">Join Waitlist</button>
                    <p className="pointer-events-none absolute right-[148px] top-2.5 hidden text-gray-10/60 duration-100 peer-hover:opacity-0 md:flex">Press Enter</p>
                    <button type="submit" className="absolute left-0 top-12 mt-6 flex w-full justify-center whitespace-nowrap rounded-full bg-gray-10 px-6 py-4 text-center font-medium text-gray-900 duration-100 hover:bg-gray-50 md:hidden ">Join Waitlist</button>
                </form>
                </div>
            </div>
        </div>
        </div>
        </>
    );
}
export default LandingPage