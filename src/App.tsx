import { ModalExample } from "./components/ModalExample";
import { ReactModalFacilityProvider } from "./lib/context/ReactModalFacility";
import { Home } from "./pages/Home";

const components2 = {
  ModalExample,
}

export function App() {
  return (
    <ReactModalFacilityProvider components={components2}>
      <Home />
    </ReactModalFacilityProvider>
  )
}