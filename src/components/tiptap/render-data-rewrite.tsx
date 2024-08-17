import { Button } from "@/components/ui/button.tsx";
import RefreshLineIcon from "remixicon-react/RefreshLineIcon";
import CheckLineIcon from "remixicon-react/CheckLineIcon";
import Forbid2LineIcon from "remixicon-react/Forbid2LineIcon";
import { Editor } from "@tiptap/react";
import { Icons } from "@/common/Icon.tsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type RenderDataRewriteProps = Readonly<{
  dataRewrite: string;
  handleRewriteAgain: () => void;
  editor: Editor;
  reset: () => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  rewriteHistory: string[];
  setRewriteHistory: React.Dispatch<React.SetStateAction<string[]>>;
}>;

export default function RenderDataRewrite({
  dataRewrite,
  editor,
  reset,
  currentIndex,
  setCurrentIndex,
  rewriteHistory,
  handleRewriteAgain,
  setRewriteHistory,
}: RenderDataRewriteProps) {
  const cycleRewrite = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    } else if (direction === "next") {
      if (currentIndex < rewriteHistory.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col max-w-[800px] max-h-[362px] overflow-y-auto">
        <div className="flex flex-row gap-2">
          <div>
            <Icons.ManyStarIcon className="h-6 w-6" />
          </div>
          <div
            className={cn(
              "prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc whitespace-pre-line ",
            )}
          >
            <p className="text-sm">
              {currentIndex === -1 ? dataRewrite : rewriteHistory[currentIndex]}
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-end items-center gap-2">
            <Button
              variant={"ghost"}
              type="button"
              size="sm"
              className="flex items-center justify-center gap-1"
              onClick={() => cycleRewrite("prev")}
              disabled={currentIndex <= 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <p className="text-lightGrey-600 font-semibold">
              {currentIndex + 1} of {rewriteHistory.length}
            </p>
            <Button
              variant={"ghost"}
              type="button"
              size="sm"
              className="flex items-center justify-center gap-1"
              onClick={() => cycleRewrite("next")}
              disabled={
                currentIndex >= rewriteHistory.length - 1 || currentIndex === -1
              }
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2">
        <Button
          variant={"outline"}
          type="button"
          size="sm"
          className="flex items-center justify-center gap-1"
          onClick={handleRewriteAgain}
        >
          <RefreshLineIcon className="h-4 w-4" />
          <p className="font-semibold text-sm">Rewrite</p>
        </Button>
        <div className="flex gap-2">
          <Button
            variant={"default"}
            type="button"
            size="sm"
            className="flex items-center justify-center gap-1 bg-primary-500 text-white hover:bg-primary-600"
            onClick={() => {
              editor.commands.liftListItem("listItem");
              editor
                .chain()
                .focus()
                .insertContent(
                  currentIndex === -1
                    ? dataRewrite
                    : rewriteHistory[currentIndex],
                )
                .run();
            }}
          >
            <CheckLineIcon className="h-4 w-4" />
            <p className="font-semibold text-sm">Apply</p>
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              reset();
              setRewriteHistory([]);
              setCurrentIndex(-1);
            }}
            type="button"
            size="sm"
            className="flex items-center justify-center gap-1"
          >
            <Forbid2LineIcon className="h-4 w-4" />
            <p className="font-semibold text-sm">Discard</p>
          </Button>
        </div>
      </div>
    </>
  );
}
