import { Switch, Route } from "react-router-dom";
import { DashBoard } from "../pages/DashBoard";

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={DashBoard} />
    </Switch>
  );
};
