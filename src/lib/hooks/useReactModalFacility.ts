import { useContext } from 'react';
import { ReactModalFacilityContext } from '../context/ReactModalFacility';

export function useReactModalFacility() {
  const context = useContext(ReactModalFacilityContext);
  return context;
}