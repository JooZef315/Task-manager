export default function Navbar() {
  return (
    <nav className="bg-blue-900 shadow-md sticky top-0 z-50 mx-auto w-full text-white px-3">
      <div className="flex items-center p-6 py-8">
        <div>
          <h1 className="text-2xl font-bold">Customer Transaction Tracker</h1>
          <p className="text-sm">
            Track and manage customer transactions easily.
          </p>
        </div>
      </div>
    </nav>
  );
}
