import React from 'react';
import Lottie from 'lottie-react';
import loaderAnimation from '../assets/Loader.json'; 

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie animationData={loaderAnimation} loop={true} />
    </div>
  );
};

export default Loader;
