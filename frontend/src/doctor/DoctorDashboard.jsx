import CreateProfile from "./CreateProfile";
import Availability from "./Availability";

function DoctorDashboard() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Doctor Dashboard</h2>

      <CreateProfile />
      <Availability />
    </div>
  );
}

export default DoctorDashboard;
