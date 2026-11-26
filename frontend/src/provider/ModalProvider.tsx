import { useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import GlobalModal from '../component/ModalComponent/GlobalModal';

interface ModalStateType {
    modalName: string;
}

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modalState, setModalState] = useState<ModalStateType | null>(null);
    const [modalData, setModalData] = useState(null);

    const openModal = (modalName: string) => {
        if (modalState) {
            setModalState(null);
        }
        setModalState({ modalName });
    };

    const closeModal = () => {
        setModalData(null);
        setModalState(null);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal, setModalData }}>
            {children}
            <GlobalModal modalState={modalState} onClose={closeModal} modalData={modalData}/>
        </ModalContext.Provider>
    );
};

