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

                    <div className="modal_content" onClick={e => e.stopPropagation()} >
                        <div className="form_container">
                            <div className="form">
                                <h2>Create New Board</h2>
                                <input className="title" type="text" placeholder="Enter Title..." />
                                <select className="category">
                                    <option value="Default">Select One:</option>
                                    <option value="Recent">Recent</option>
                                    <option value="Celebration">Celebration</option>
                                    <option value="Inspiration">Inspiration</option>
                                    <option value="Thank_you">Thank You</option>
                                </select>
                                <input type="text" className="author" placeholder="Enter Author..." />

                            </div>

                        </div>


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



