export default function SectionHeader({
  index,
  label,
  title,
  intro,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">
        {index} · {label}
      </p>
      <h2 className="heading">{title}</h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-slate-400">{intro}</p>}
    </div>
  );
}
