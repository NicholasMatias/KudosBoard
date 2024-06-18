import { useState } from "react";
import "./NewBoard.css";

export default function NewBoard() {
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            <div className="button_container">
                <button onClick={toggleModal} className="btn-modal">
                    <p className="view-button">Create a New Board</p>
                </button>
            </div>
                

            {modal && (
                <div className="overlay" onClick={toggleModal}>

                    <div className="modal-content" onClick={e => e.stopPropagation()} >


                        <p>Create New Board</p>
                        <div className="modal_button_container">
                            <div className="create_close_container">
                                <button className="create_board">
                                    CREATE BOARD
                                </button>
                                <button className="close_modal" onClick={toggleModal}>
                                    CANCEL
                                </button>
                            </div>
                        </div>
                            
                        
                    </div>
                </div>
            )}
        </>
    );
}



