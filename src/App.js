import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import TodoComponent from "./components/TodoComponent";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TodoComponent />
      </Provider>
    );
  }
}

export default App;
