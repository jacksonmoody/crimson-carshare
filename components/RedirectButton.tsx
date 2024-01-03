"use client";

export default function RedirectButton({
  title,
  path,
  className,
}: {
  title: string;
  path: string;
  className?: string;
}) {
  return (
    <a href={path}>
      <button className={`btn btn-primary ${className}`}>{title}</button>
    </a>
  );
}
