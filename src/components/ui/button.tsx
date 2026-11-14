import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg" | "icon";

interface StyleOptions {
  variant?: Variant;
  size?: Size;
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-control border font-sans font-semibold transition-[background-color,border-color,color,transform,opacity] duration-200 disabled:pointer-events-none disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-3 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "border-amber bg-amber text-navy hover:border-[#ffb733] hover:bg-[#ffb733] focus-visible:outline-amber",
  secondary:
    "border-cyan/55 bg-cyan/[0.06] text-cyan hover:border-cyan hover:bg-cyan/[0.13] focus-visible:outline-cyan",
  ghost:
    "border-transparent bg-transparent text-cloud hover:border-line hover:bg-white/[0.04] focus-visible:outline-cyan",
  dark:
    "border-line bg-intelligence text-cloud hover:border-[#38577d] hover:bg-panel focus-visible:outline-cyan",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3 text-xs",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-6 text-sm sm:text-base",
  icon: "size-10 p-0",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: StyleOptions = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}

interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  external?: boolean;
}

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  external,
  ...props
}: ButtonLinkProps) {
  const classes = buttonStyles({ variant, size, className });
  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noreferrer noopener"
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
