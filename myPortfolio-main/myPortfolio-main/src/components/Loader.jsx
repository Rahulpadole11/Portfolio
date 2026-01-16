import React from "react";

const Loader = ({ size = 40, color = "purple" }) => {
  return (
    <div className="flex justify-center items-center py-6">
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent`}
        style={{
          width: size,
          height: size,
          borderColor: color,
          borderTopColor: "transparent",
        }}
      />
    </div>
  );
};

export default Loader;
