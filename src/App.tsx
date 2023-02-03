import { ModalExample } from "./components/ModalExample";
import { ReactModalFacilityProvider } from "./lib/context/ReactModalFacility";
import { Home } from "./pages/Home";
// import { ReactModalFacilityProvider } from 'react-modal-facility';

const components = {
  ModalExample,
}

declare global {
  namespace ReactModalFacility {
    type ComponentsList = keyof typeof components;
  }
}

export function App() {
  return (
    <ReactModalFacilityProvider components={components}>
      <Home />
    </ReactModalFacilityProvider>
  )
}