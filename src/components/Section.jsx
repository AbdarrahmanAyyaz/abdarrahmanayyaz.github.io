export default function Section({ id, children, className = "" }) {
    return (
      <section id={id} className={`w-full py-16 md:py-24 bg-bg text-[color:var(--text,#e5e7eb)] scroll-mt-24 ${className}`}>
        <div className="container">{children}</div>
      </section>
    );
  }
  