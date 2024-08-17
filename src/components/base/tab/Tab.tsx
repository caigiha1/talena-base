import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ITabs } from "../../../type/index";
import "./tabs.scss";

const Tabs: React.FC<{ tabs: ITabs[] }> = ({ tabs }) => {
  const location = useLocation();

  return (
    <div className="flex text-body-md font-figtree gap-8 border-b-[1px] border-lightGrey-200">
      {tabs.map((tab) => (
        <div key={tab.title} className=" relative">
          <Link
            className={`${
              location.pathname === tab.link
                ? "active-tab text-primary-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            to={tab.link}
          >
            {tab.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
