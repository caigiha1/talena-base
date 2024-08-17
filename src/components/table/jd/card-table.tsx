import { ClockIcon, PersonIcon } from "@/common/Icon";
import "./jd.scss";
import RadarChart from "./radar-chart";
import JdAction from "@/pages/JD/jd-action";
import { JDDetail } from "@/type";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Slideshow2LineIcon from "remixicon-react/Slideshow2LineIcon";

interface MultiRadarChartProps {
  width: string;
  height: string;
  labelEnable?: boolean;
  enabled?: boolean;
  data: JDDetail;
  titleEnabled?: boolean;
}

export default function CardTable({
  width,
  height,
  labelEnable = false,
  enabled = false,
  data,
  titleEnabled,
}: Readonly<MultiRadarChartProps>) {
  const navigate = useNavigate();
  const radarData = data?.radar.skills?.map((item) => item.score);
  const radarCategories = data?.radar.skills?.map((item) => item.name);
  return (
    <div className="flex justify-between gap-4 xl:min-w-[100%] lg:min-w-[300px] md:min-w-[200px] sm:min-w-[100px] p-4 rounded-[16px] border border-lightGrey-200 bg-white">
      <button
        className="flex overflow-hidden text-ellipsis text-lightGrey-900 font-inter text-lg font-bold leading-6 gap-4 md:w-[95%]"
        onClick={() => navigate(`/job-description/detail/${data.id}`)}
      >
        <div className="w-32 h-32 flex-shrink-0 bg-cover bg-no-repeat bg-center">
          <div>
            <RadarChart
              width={width}
              height={height}
              labelEnable={labelEnable}
              enabled={enabled}
              data={radarData}
              categories={radarCategories}
              name={data.title}
              titleEnabled={titleEnabled}
            />
          </div>
        </div>
        <div className="grid gap-y-2 ">
          <div className="ml-1 inline-block w-[100px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-start truncate  text-lightGrey-900 font-inter text-lg font-bold leading-6 line-clamp-1">
                  {data.name}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{data.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex gap-2">
            <div className="flex w-5 h-5 justify-center items-center">
              <Slideshow2LineIcon className="h-5 w-5 text-lightGrey-500" />
            </div>
            <div className="line-clamp-1 overflow-hidden text-info text-ellipsis font-inter text-sm font-normal leading-5 underline">
              8 Campaigns
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex w-5 h-5 justify-center items-center">
              <ClockIcon />
            </div>
            <div className="line-clamp-1 flex overflow-hidden text-lightGrey-600 text-ellipsis font-inter text-sm font-normal leading-5">
              {dayjs(data.created_at).format("DD/MM/YYYY")}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex w-5 h-5 justify-center items-center">
              <PersonIcon />
            </div>
            <div className="line-clamp-1 flex p-1 justify-center items-center gap-1 rounded text-xs bg-primary-100 font-normal">
              {data.owner.first_name + " " + data.owner.last_name}
            </div>
          </div>
        </div>
      </button>
      <div className="flex justify-end md:w-[5%]">
        <JdAction data={data} />
      </div>
    </div>
  );
}
