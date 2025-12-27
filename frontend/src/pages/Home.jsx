import { useEffect } from "react";
import api from "../api/axios";

function Home() {
  useEffect(() => {
    api.get("/health")
      .then(res => console.log("Backend connected:", res.data))
      .catch(err => console.error("Backend error:", err));
  }, []);

  return <h2>Frontend connected to backend</h2>;
}

export default Home;
