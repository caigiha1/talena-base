import { ITabs } from "../../../type";
import Tabs from "../tab/Tab";
import "./Card.scss";
import LoadingCard from "./LoadingCard";
import React from "react";

interface IProps {
  tabs: ITabs[];
  loading: boolean;
}

const Card: React.FC<IProps> = ({ tabs, loading }) => {
  return (
    <>
      {loading ? (
        <LoadingCard />
      ) : (
        <div className=" px-6 pt-1 mb-5 ">
          <div className="bg-white underline-offset-1 dark:border-strokedark dark:bg-boxdark underline-offset-8">
            <div className="pt-3 pb-0">
              <Tabs tabs={tabs} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
