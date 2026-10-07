import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-5 py-20">
      <div className="w-full max-w-lg text-center">
        <p className="font-heading text-[7rem] font-extrabold leading-none tracking-tighter text-accent/20 sm:text-[9rem]">
          404
        </p>
        <h1 className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          This page took a study break.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8">
          <Button href="/" size="lg">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
