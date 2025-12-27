function Navbar({ user, logout, onRoleClick }) {
  return (
    <nav className="bg-gradient-to-r from-teal-600 to-cyan-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <span className="text-2xl">🏥</span>
            </div>
            <h1 className="text-xl font-bold text-white">
              Smart Healthcare Scheduler
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {user.role === "doctor" ? (
              <button
                onClick={onRoleClick}
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 cursor-pointer"
              >
                <span className="text-white font-medium capitalize flex items-center gap-2">
                  <span className="text-lg">👨‍⚕️</span>
                  {user.role}
                </span>
              </button>
            ) : (
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-white font-medium capitalize flex items-center gap-2">
                  <span className="text-lg">👤</span>
                  {user.role}
                </span>
              </div>
            )}
            <button
              onClick={logout}
              className="bg-white text-teal-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
  