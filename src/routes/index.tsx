import { FC } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AdminRoom } from "../pages/AdminRoom";
import { Home } from "../pages/Home";
import { NewRoom } from "../pages/NewRoom";
import { Room } from "../pages/Room";

export const Routes: FC = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact  component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
        <Route path="/rooms/:room_id" component={Room} />

        <Route path="/admin/rooms/:room_id" component={AdminRoom} />
      </Switch>
    </BrowserRouter>
  );

}