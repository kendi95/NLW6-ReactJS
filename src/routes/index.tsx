import { FC } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from "../pages/Home";
import { NewRoom } from "../pages/NewRoom";

export const Routes: FC = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact  component={Home} />
        <Route path="/rooms/new" exact component={NewRoom} />
      </Switch>
    </BrowserRouter>
  );

}