import { createContext, ReactNode, useState } from "react";
import { v4 as uuid } from 'uuid';

type IComponentsModalProps = {
  [key: string]: () => JSX.Element;
};

type IListModalsIsOpen = {
  id: string;
  key: string;
  Component: () => JSX.Element;
  response: (value: any | PromiseLike<any>) => void;
  error: (error: any) => void;
  props?: any;
}

type IReactModalFacilityContextData = {
  openModal: <T = any> (key: string, props?: any) => Promise<T>;
  getProps: <T = any>(key: string) => T | undefined;
  closeModal: (key: string, result?: any) => void;
  isModalOpen: (key: string) => boolean;
};

type IReactModalFacilityProviderProps = {
  children: ReactNode;
  components: IComponentsModalProps;
}

export const ReactModalFacilityContext = createContext({} as IReactModalFacilityContextData);

export function ReactModalFacilityProvider({ children, components }: IReactModalFacilityProviderProps) {
  const [listModalsIsOpen, setListModalsIsOpen] = useState<IListModalsIsOpen[]>([]);

  function openModal<T = any>(key: string, props?: any) {
    return new Promise<T>((resolve, reject) => {
      const ModalComponent = components[key];

      if (ModalComponent) {
        const newModalInstance: IListModalsIsOpen = {
          id: uuid(),
          key,
          Component: ModalComponent,
          response: resolve,
          error: reject,
          props,
        };

        setListModalsIsOpen(state => [newModalInstance, ...state]);
      } else {
        reject('ModalComponent not found');
      }
    });
  }

  function closeModal(key: string, result?: any) {
    const ModalComponent = listModalsIsOpen.find(modal => modal.key === key);
    if (ModalComponent) {
      setListModalsIsOpen(state => state.filter(item => item.id !== ModalComponent.id));
      ModalComponent.response(result);
    }
  }

  function isModalOpen(key: string) {
    return listModalsIsOpen.some(item => item.key === key)
  }

  function getProps<T = any>(key: string): T | undefined {
    const ModalComponent = listModalsIsOpen.find(modal => modal.key === key);
    if (ModalComponent) return ModalComponent.props;
  }

  return (
    <ReactModalFacilityContext.Provider value={{ closeModal, openModal, isModalOpen, getProps }}>
      {listModalsIsOpen.map(Item => (
        <Item.Component key={Item.id} {...Item.props} />
      ))}
      {children}
    </ReactModalFacilityContext.Provider>
  )
}