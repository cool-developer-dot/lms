export default function PageContainer({ children, className = '' }) {
  return (
    <div
      className={`w-full min-w-0 max-w-full overflow-x-hidden p-4 sm:p-6 lg:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
