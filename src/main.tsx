import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Root } from "./routes/Root/Root";
import { FirestoreProvider } from "./Contexts/Firestore";
import { FirebaseProvider } from "./Contexts/Firebase";
import { AuthProvider } from "./Contexts/Auth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FirebaseProvider>
      <AuthProvider>
        <FirestoreProvider>
          <Root />
        </FirestoreProvider>
      </AuthProvider>
    </FirebaseProvider>
  </React.StrictMode>
);
