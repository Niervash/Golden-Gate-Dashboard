import React from "react";

interface props {
  children: any;
}

const LoginLayout: React.FC<props> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
    
      {children}
    </div>
  );
};

export default LoginLayout;
