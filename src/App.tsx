import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import RouteApp from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="min-h-screen bg-gray-200 text-gray-800">
          <RouteApp />
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
