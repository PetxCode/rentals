import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Component/StateFile/Home";
import "antd/dist/antd.css";
import Registeration from "./Component/StateFile/Registeration";
import { AuthProvider } from "./Component/AuthUser";
import PostHome from "./Component/StateFile/PostHome";
import DetailPage from "./Component/StateFile/DetailPage";
import ImagePreview from "./Component/imagePreview/ImagePreview";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/image" component={ImagePreview} />
            <Route exact path="/detail/:id" component={DetailPage} />
            <Route exact path="/post" component={PostHome} />
            <Route exact path="/reg" component={Registeration} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
