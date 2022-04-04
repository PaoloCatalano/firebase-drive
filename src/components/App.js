import Dashboard from "./drive/Dashboard";
import Login from "./authentication/Login";
// import Signup from "./authentication/Signup";
import Profile from "./authentication/Profile";
import PrivateRoute from "./authentication/PrivateRoute";
import updateEmail from "./authentication/updateEmail";
import updatePassword from "./authentication/updatePassword";
import ForgotPassword from "./authentication/ForgotPassword";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* Drive */}
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/folder/:folderId" component={Dashboard} />
          {/* Profile */}
          <PrivateRoute path="/user" component={Profile} />
          <PrivateRoute path="/update-email" component={updateEmail} />
          <PrivateRoute path="/update-password" component={updatePassword} />

          {/* Auth */}
          {/* <Route path="/signup" component={Signup} /> */}
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
