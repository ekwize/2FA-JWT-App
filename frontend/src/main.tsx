import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { Provider } from "react-redux"
import store from "./app/store.ts"
import { PersistGate } from "redux-persist/integration/react"
import persistStore from "redux-persist/es/persistStore"

let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
