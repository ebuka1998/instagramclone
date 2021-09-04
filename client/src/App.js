import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AUserProfilePage from "./pages/AUserProfilePage";
import ExploreSuggested from "./pages/ExploreSuggested";
import "./App.css";
import EditProfilePage from "./pages/EditProfilePage";
import CreatepostPage from "./pages/CreatepostPage";
import SinglePostPage from "./pages/SinglePostPage";
import AuthProtected from "./utils/AuthProtected";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <AuthProtected exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <AuthProtected path="/post/:id" component={SinglePostPage} />
          <AuthProtected path="/account/edit" component={EditProfilePage} />
          <AuthProtected path="/profile/:name/:id" component={ProfilePage} />
          <AuthProtected path="/:name/:idd" component={AUserProfilePage} />
          <Route
            path="/explore/suggested/people"
            component={ExploreSuggested}
          />
          <Route path="/createpost" component={CreatepostPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
