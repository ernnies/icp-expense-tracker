import Modal from 'react-modal';

Modal.setAppElement('#root');

const ModalApp=({isModalOpen,setIsOpen,children})=>{
    // console.log(isModalOpen);
    const handleModalClose=()=>{
        setIsOpen(false);
    }
    const customStyles={
        content:{
            width:"95%",
            maxWidth:"600px",
            top:"50%",
            left:"50%",
            height:"fit-content",
            maxHeight:"90vh",
            background:"rgba(239,239,239,0.85)",
            border:"0",
            borderRadius:"15px",
            padding:"2rem",
            transform:"translateX(-50%) translateY(-50%)",
        }
    };
    return(
        <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        shouldCloseOnOverlayClick={true}
        style={customStyles}
        >
            {children}

        </Modal>
    )
}

export default ModalApp;