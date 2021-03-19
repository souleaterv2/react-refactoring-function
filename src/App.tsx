import React from "react";
import { DashBoard } from "./pages/DashBoard";
import { GlobalStyles } from "./styles/GlobalStyles";

export const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <DashBoard />
    </>
  );
};
