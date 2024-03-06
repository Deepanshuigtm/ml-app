import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import HeadingSection from './HeadingSection';

interface LandingPageProps {
    backendName: string;
}

const LandingPage : React.FC<LandingPageProps> = ({backendName}) => {
    return (
        <>
        <NavBar backendName='flask' />
        <HeadingSection />
        </>
    );
}
export default LandingPage