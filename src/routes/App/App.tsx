import "./App.css";
import { AuthProvider } from "../../Contexts/Auth";
import { FirebaseProvider } from "../../Contexts/Firebase";
import { Outlet } from "react-router";

const App = () => {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <div className="Soiree">
          <h1 className="Title">Soiree</h1>
          <div>A place for your parties</div>
          <Outlet />
        </div>
      </AuthProvider>
    </FirebaseProvider>
  );
};

export default App;
