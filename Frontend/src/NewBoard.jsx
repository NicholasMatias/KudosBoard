import { useState } from "react";
import "./NewBoard.css";

export default function NewBoard({addBoard}) {
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const form = e.target.form
        const title=form.boardTitle.value
        const category = form.category.value
        
        if(!title){
            alert('Title is required')
            return
        }
        if(category === 'Default'){
            alert('Please select a category')
            return
        }

        const newBoard ={
            title,
            author: form.boardAuthor.value,
            category
        }


        await addBoard(newBoard)

        toggleModal()
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
                            <form action="http://localhost:3000/add" method="get">
                                <label htmlFor="boardTitle">Title:</label>
                                <input type="text" id="boardTitle" name="boardTitle" />


                                <select className="category" name="category" id="category">
                                    <option value="Default">Select One:</option>
                                    <option value="Celebration">Celebration</option>
                                    <option value="Inspiration">Inspiration</option>
                                    <option value="Thank You">Thank You</option>
                                </select>

                                <label htmlFor="boardAuthor">Author:</label>
                                <input type="text" id="boardAuthor" name="boardAuthor" />

                                <div className="modal_button_container">
                                    <div className="create_close_container">
                                        <input type="button" value="Create Board" onClick={handleSubmit}/>


                                    </div>
                                </div>
                                
                            </form>

                        </div>


                        {/* <div className="modal_button_container">
                            <div className="create_close_container">
                                <button className="create_board">
                                    CREATE BOARD
                                </button>
                                <button className="close_modal" onClick={toggleModal}>
                                    CANCEL
                                </button>
                            </div>
                        </div> */}


                    </div>
                </div>
            )}
        </>
    );
}



