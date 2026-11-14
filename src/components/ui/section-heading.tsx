import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="eyebrow mb-5 flex items-center gap-2">
          <span
            className={cn("h-px w-6 bg-cyan/70", align === "center" && "hidden")}
            aria-hidden="true"
          />
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "display-title text-3xl text-cloud sm:text-4xl lg:text-[44px]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
