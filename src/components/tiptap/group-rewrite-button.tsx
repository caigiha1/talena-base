import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { Icons } from "@/common/Icon.tsx";

type GroupRewriteButtonProps = Readonly<{
  isPending: boolean;
  handleRewrite: (command: string) => void;
}>;

export default function GroupRewriteButton({
  isPending,
  handleRewrite,
}: GroupRewriteButtonProps) {
  return (
    <div>
      <Button
        variant="ghost"
        type="button"
        disabled={isPending}
        onClick={(e) => {
          e.preventDefault();

          handleRewrite("MAKE_LONGER");
        }}
        className={cn(
          "flex justify-start gap-2 w-full focus:bg-accent focus:text-accent-foreground",
        )}
      >
        <Icons.MakeLongerIcon />
        Make Longer
      </Button>
      <Button
        variant="ghost"
        type="button"
        disabled={isPending}
        onClick={() => handleRewrite("MAKE_SHORTER")}
        className={cn(
          "flex justify-start gap-2 w-full focus:bg-accent focus:text-accent-foreground",
        )}
      >
        <Icons.MakeShorterIcon />
        Make Shorter
      </Button>
      <Button
        variant="ghost"
        type="button"
        disabled={isPending}
        onClick={() => handleRewrite("CORRECT_GRAMMAR")}
        className={cn(
          "flex justify-start gap-2 w-full focus:bg-accent focus:text-accent-foreground",
        )}
      >
        <Icons.FixSpellGrammarIcon />
        Fix spell & grammar
      </Button>
      <Button
        variant="ghost"
        type="button"
        disabled={isPending}
        onClick={() => handleRewrite("MAKE_MORE_PROFESSIONAL")}
        className={cn(
          "flex justify-start gap-2 w-full focus:bg-accent focus:text-accent-foreground",
        )}
      >
        <Icons.BeProfessionalIcon />
        Be more Professional
      </Button>
    </div>
  );
}
