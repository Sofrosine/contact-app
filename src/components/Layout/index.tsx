import React, { FC, PropsWithChildren } from "react";
import Header from "../Header";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="hidden md:block md:col-span-2 2xl:col-span-4" />
      <div className="col-span-12 md:col-span-8 2xl:col-span-4 bg-white relative">
        <Header />
        {children}
      </div>
      <div className="hidden md:block md:col-span-2 2xl:col-span-4" />
    </div>
  );
};

export default Layout;
