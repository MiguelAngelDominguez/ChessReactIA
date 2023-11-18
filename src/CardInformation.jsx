import React from "react";
import "./CardInformation.css";

export const CardInformation = ({title,text}) => {
  return (
    <div>
      <article className="CardInformation flex max-w-xl flex-col items-start justify-between">
        <div className="relative flex items-center gap-x-4">
          <img
            src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            className="h-10 w-10 rounded-full bg-gray-50"
          />
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <span className="absolute inset-0"></span>
            {title}
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {text}
          </p>
        </div>
      </article>
    </div>
  );
};
