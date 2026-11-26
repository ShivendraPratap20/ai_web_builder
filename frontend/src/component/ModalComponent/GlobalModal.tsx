import LoginModal from "./LoginSignUpModal";


interface PropsTypes {
    modalState: {
        modalName: string | null;
    } | null;
    onClose: () => void;
    modalData?: any;
}

const GlobalModal = ({ modalState, onClose }: PropsTypes) => {
    switch (modalState?.modalName) {
        case 'login':
            return <LoginModal isOpen={true} onClose={onClose} />;
        default:
            return null;
    }
};

export default GlobalModal;