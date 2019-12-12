import React from "react";
import { Route, Switch } from "react-router-dom";

import Index from './rooms/index.jsx';
import New from './rooms/new.jsx';
import View from './rooms/view.jsx';
import Edit from './rooms/edit.jsx';

export default function Room() {
    return (
      <Switch>
        <Route path="/rooms" exact component={Index}/>
        <Route path="/rooms/new" component={New}/>
        <Route path="/rooms/:rid" exact component={View}/>
        <Route path="/rooms/:rid/edit" component={Edit}/>
      </Switch>
    );
};