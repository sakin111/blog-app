import Image from 'next/image';
import React from 'react';

const Logo = () => {
    return (
  <Image width={55} height={55} src="/logo.png" alt='my-logo'/>
    );
};

export default Logo;