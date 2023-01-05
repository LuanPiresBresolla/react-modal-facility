import ReactModal from 'react-modal'
import { useReactModalFacility } from 'react-modal-facility';
// import { useReactModalFacility } from '../../lib/hooks/useReactModalFacility';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .7)'
  },
};

type IProps = {
  title: string;
}

export function ModalExample() {
  const { isModalOpen, closeModal, openModal, getProps } = useReactModalFacility();
  const isOpen = isModalOpen('ModalExample');
  const props = getProps('ModalExample');

  console.log(props);

  // console.log('render ModalExample')
  const title = props.title;

  function handleCloseModal() {
    closeModal('ModalExample', { title });
  }

  function handleOpenNewModal() {
    openModal('ModalExample', { title: 'NEW MODAL EXAMPLE', batata: true }).then(response => {
      console.log(response);
    }).catch(console.log);
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={() => {}}
      onRequestClose={() => closeModal('ModalExample')}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <h2>{title}</h2>
      <button onClick={handleCloseModal}>Close {title}</button>
      <button onClick={handleOpenNewModal}>Open New Modal</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </ReactModal>
  )
}