import React from 'react';

const TwilioLogo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M16 1a15 15 0 100 30 15 15 0 000-30zm0 26a11 11 0 110-22 11 11 0 010 22zm6.8-14.7a3.1 3.1 0 11-3.1-3.1 3.12 3.12 0 013.1 3.1zm0 7.4a3.1 3.1 0 11-3.1-3.1 3.12 3.12 0 013.1 3.1zm-7.4 0a3.1 3.1 0 11-3.1-3.1 3.12 3.12 0 013.1 3.1zm0-7.4a3.1 3.1 0 11-3.1-3.1 3.12 3.12 0 013.1 3.1z"
        fill="#F22F46"
      />
    </svg>
  );
};

export default TwilioLogo;
