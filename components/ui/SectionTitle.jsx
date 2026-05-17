import clsx from "clsx";

export default function SectionTitle({ tag = "", title, subtitle = "", center = true, className = "" }) {
  return (
    <div className={clsx("mb-12 md:mb-14", center && "text-center", className)}>
      {tag && (
        <span className="inline-block text-[10px] font-heading font-semibold tracking-widest uppercase mb-3 px-3 py-1.5 rounded-full bg-accent/[0.1] border border-accent/[0.18] text-accent-subtle">
          {tag}
        </span>
      )}
      <h2 className="font-heading font-extrabold leading-tight text-3xl md:text-4xl lg:text-5xl text-white">
        {title}
      </h2>
      {subtitle && (
        <p className={clsx("mt-4 text-sm md:text-base max-w-2xl leading-relaxed", center && "mx-auto", "text-white/45")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
