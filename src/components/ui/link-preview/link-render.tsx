import { Skeleton } from "antd";
export type Preview = {
  title: string;
  description: string;
  favicon: string;
};
const LinkPreviewComponent = ({
  loading,
  preview,
  url,
}: {
  loading: boolean;
  preview: Preview;
  url: string;
}) => {
  return (
    <a className="flex  w-full gap-3 p-4 px-5 rounded-lg bg-[#F3F4F6] cursor-pointer truncate text-ellipsis" href={url} target="_blank">
      {loading ? (
        <Skeleton.Avatar active size="small" />
      ) : (
        <img className="h-5.5 w-5.5" src={preview.favicon} />
      )}
      <div>
        {loading ? (
          <Skeleton.Input className="w-[80px]" />
        ) : (
          <p className="text-sm font-semibold mb-2 w-full">{preview?.title ?? url}</p>
        )}
        <div>
          {loading ? (
            <Skeleton.Input className="w-[80px]" />
          ) : (
            <div className="text-xs text-[#6B7280] mb-2 w-full">
              {preview?.description}
            </div>
          )}
          <div className="text-xs text-[#111827]">{url}</div>
        </div>
      </div>
    </a>
  );
};



export default LinkPreviewComponent;
