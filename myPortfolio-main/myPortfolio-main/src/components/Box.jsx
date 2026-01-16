import React from 'react';
import { Element } from 'react-scroll';

const Box = ({ title, items, children, id }) => {
  const CornerBorders = () => (
    <>
      <div className="absolute top-0 left-0 h-6 w-6 border-t border-l border-gray-400 rounded-tl-xl" />
      <div className="absolute top-0 right-0 h-6 w-6 border-t border-r border-gray-400 rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-gray-400 rounded-bl-xl" />
      <div className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-gray-400 rounded-br-xl" />
    </>
  );

  return (
    <Element name={id || title.toLowerCase()}>
      <div className="relative bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 shadow-md min-h-[300px]">
        <CornerBorders />
        <h2
          className="text-lg sm:text-xl font-bold mb-4 text-cyan-400 inline-block
          after:content-[''] after:block after:h-[2px] after:bg-cyan-400 after:scale-x-0
          hover:after:scale-x-100 after:transition-transform after:duration-300 origin-left"
        >
          {title}
        </h2>

        {items && items.length > 0 && (
          <ul className="flex flex-wrap gap-3 mt-2">
            {items.map((item) => (
              <li key={item}>
                <span className="border border-gray-600 text-gray-300 hover:border-cyan-400 transition-colors duration-300 px-4 py-2 rounded-md text-sm sm:text-base inline-block">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* If any children are passed, render them (for Contact card etc.) */}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </Element>
  );
};

export default Box;
