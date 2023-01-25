import React from "react";
import { ScaleLoader } from "react-spinners";
import { useSelector } from "react-redux";

const Loadpage = () => {
  const show = useSelector((state) => state.Books.overlaypage);
  return show ? (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScaleLoader size={35} color="white" />
    </div>
  ) : null;
};
export default Loadpage;
