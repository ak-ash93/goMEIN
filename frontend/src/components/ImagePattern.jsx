import React from "react";

const ImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/10 to-base-200 p-12">
      <div className="max-w-md text-center">
        {/* Grid of animated dots */}
        <div className="grid grid-cols-4 gap-3.5 mb-8 ml-10">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full bg-primary/60 animate-pulse"
            />
          ))}
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-2xl font-bold text-base-content mb-2">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default ImagePattern;
