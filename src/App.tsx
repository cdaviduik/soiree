import "./App.css";
import { Home } from "./Components/Home";
import { AuthProvider } from "./Contexts/Auth";
import { FirebaseProvider } from "./Contexts/Firebase";

function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <div className="Soiree">
          <h1 className="Title">Soiree</h1>
          <div>A place for parties</div>
          <Home />
        </div>
      </AuthProvider>
    </FirebaseProvider>
  );
}

export default App;

/*
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
*/
