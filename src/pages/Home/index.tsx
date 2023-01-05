// import { useReactModalFacility } from "../../lib/hooks/useReactModalFacility";
import { useReactModalFacility} from 'react-modal-facility';

export function Home() {
  const { openModal } = useReactModalFacility();

  function handleOpenModal() {
    openModal('ModalExample', { title: 'MODAL EXAMPLE' }).then(response => {
      console.log(response);
    }).catch(console.log);
  }

  return (
    <div>
      <h1>ReactModalFacilityProvider</h1>
      <button onClick={handleOpenModal}>Abrir modal</button>
    </div>
  )
}