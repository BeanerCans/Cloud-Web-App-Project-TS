/**
 * Footer component.
 * Displays a horizontal line and copyright.
 */
export default function Footer() {
  const today = new Date();
  const dateString = today.toLocaleDateString();

  return (
    <footer className="mt-8">
      <hr className="border-t-2 border-black mb-2" />
      <div className="text-center text-lg py-2">
        Copyright Matthew James Elliott, 22453699, {dateString}
      </div>
    </footer>
  );
}