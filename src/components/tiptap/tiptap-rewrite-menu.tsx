import { useState } from "react";
import { Icons } from "@/common/Icon.tsx";
import { useGetRewriteContent } from "@/service/react-query-hooks.ts";
import useDebounce from "@/hooks/use-debounce.tsx";
import { Editor } from "@tiptap/react";
import GroupRewriteButton from "@/components/tiptap/group-rewrite-button.tsx";
import RenderDataRewrite from "@/components/tiptap/render-data-rewrite.tsx";
import CrazySpinner from "@/common/crazy-spinner.tsx";

type PropsRewriteMenu = Readonly<{
  editor: Editor;
  text: string;
}>;

export function TiptapRewriteMenu({ editor, text }: PropsRewriteMenu) {
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  const [rewriteHistory, setRewriteHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const {
    mutate: mutateRewrite,
    reset,
    data: dataRewrite,
    isPending,
  } = useGetRewriteContent({
    onSuccess: (data) => {
      const data_tmp = data.replace(/\n/g, "\n\n");
      setRewriteHistory((prev) => [...prev, data_tmp]);
      setCurrentIndex(rewriteHistory.length);
    },
  });
  const debounceText = useDebounce(text, 100);

  const handleRewrite = (command: string) => {
    setLastCommand(command);
    mutateRewrite({ command, text: debounceText });
  };

  const handleRewriteAgain = () => {
    if (lastCommand) {
      mutateRewrite({ command: lastCommand, text: debounceText });
    }
  };

  return (
    <div className="min-w-[275px] overflow">
      <div className="grid w-full gap-2 mb-1">
        {isPending && (
          <div className="flex h-12 w-full items-center px-4 text-sm font-medium text-muted-foreground text-primary-500">
            <Icons.ManyStarIcon className="mr-2 h-4 w-4 shrink-0  " />
            AI is thinking
            <div className="ml-2 mt-1">
              <CrazySpinner />
            </div>
          </div>
        )}
        {dataRewrite ? (
          <RenderDataRewrite
            dataRewrite={dataRewrite as string}
            editor={editor}
            handleRewriteAgain={handleRewriteAgain}
            reset={reset}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            rewriteHistory={rewriteHistory}
            setRewriteHistory={setRewriteHistory}
          />
        ) : (
          <GroupRewriteButton
            handleRewrite={handleRewrite}
            isPending={isPending}
          />
        )}
      </div>
    </div>
  );
}
