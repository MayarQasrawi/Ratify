export default function Title({ children }) {
  return (
    <h2 className="sm:text-3xl mb-2 text-2xl font-bold text-[var(--main-color)]">
        {children}
    </h2>
  );
}
