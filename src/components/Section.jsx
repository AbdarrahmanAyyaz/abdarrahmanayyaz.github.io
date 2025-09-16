export default function Section({ id, children, className = "", containerClassName = "" }) {
    return (
      <section 
        id={id} 
        className={`w-full py-16 md:py-24 bg-bg text-text scroll-mt-24 ${className}`}
      >
        <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
          {children}
        </div>
      </section>
    );
  }
  