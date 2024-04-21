
import ImageFortText from '../components/ImageFortText';
import NavBar from '../components/NavBar';
import React, { useState, useEffect } from 'react';


const textGenerations =() => {
    return (
        <>
        <NavBar backendName='flask' />
        <div
        style={{
            backgroundImage: `url(https://uploads-ssl.webflow.com/64c7dd5bd47aab388b54b5ae/64c8db9a51875e9259d3ee09_stars-ok.svg), linear-gradient(transparent 80%, #0b0b15), url(https://uploads-ssl.webflow.com/64c7dd5bd47aab388b54b5ae/64c8c5b75845992f13ad22a0_l2.svg), linear-gradient(#0d0f1a, #0a0a14)`,
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height:'87vh',
          }}
          >
            <h1 className='pt-10 flex h-10 justify-center '></h1>
            <div className="flex h-10 justify-center mt-24">
                <div><ImageFortText/></div>
            </div>
        </div>
        </>
    );
}
export default textGenerations