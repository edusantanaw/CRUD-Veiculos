import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./shared/context/Auth";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
