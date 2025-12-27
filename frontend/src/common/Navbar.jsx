function Navbar({ user, logout }) {
    return (
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">
          Smart Healthcare Scheduler
        </h1>
  
        <div className="flex items-center gap-4">
          <span className="text-gray-600 capitalize">
            {user.role}
          </span>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  