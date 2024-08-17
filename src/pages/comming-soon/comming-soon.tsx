import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

export default function CommingSoon() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary p-4 text-primary-foreground">
      <div className="container mx-auto max-w-3xl space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
          Coming Soon
        </h1>
        <p className="text-lg text-primary-foreground/80 sm:text-xl md:text-2xl">
          Get ready for the launch of our exciting new product or service. Sign
          up below to be the first to know when we go live.
        </p>
        <form className="flex w-full max-w-md flex-col items-center gap-4 sm:flex-row">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-md border-transparent bg-primary-foreground/10 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary focus:bg-primary-foreground/20 focus:ring-0"
          />
          <Button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Notify Me
          </Button>
        </form>
      </div>
    </div>
  );
}
