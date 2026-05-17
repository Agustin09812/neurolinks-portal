import clsx from "clsx";
import Link from "next/link";

export default function Button({
  children, href, onClick,
  variant = "primary", size = "md",
  external = false, className = "", ...props
}) {
  const base = "inline-flex items-center justify-center font-heading font-semibold rounded-full transition-all duration-200 cursor-pointer gap-2";

  const variants = {
    primary:   "btn-gradient",
    secondary: "bg-transparent border border-accent/50 text-accent-bright hover:bg-accent/10 hover:border-accent/80",
    whatsapp:  "bg-whatsapp text-white hover:bg-whatsapp-dark shadow-md hover:shadow-lg hover:scale-[1.02]",
    outline:   "bg-white/[0.06] border border-white/[0.12] text-white hover:bg-accent/[0.10] hover:border-accent/25",
    dark:      "bg-white/[0.08] text-white border border-white/[0.10] hover:bg-white/[0.14]",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-sm",
  };

  const classes = clsx(base, variants[variant], sizes[size], className);
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  if (href) return <Link href={href} className={classes} {...linkProps} {...props}>{children}</Link>;
  return <button onClick={onClick} className={classes} {...props}>{children}</button>;
}
