import { useState } from "react";
import "./NewBoard.css";

export default function NewBoard({ addBoard }) {
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {    // changes the css depending on if the modal variable is toggled 
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const handleSubmit = async (e) => { // sets up the dictionary which will passed in the body of the api call. 
        e.preventDefault()
        const form = e.target.form
        const title = form.boardTitle.value
        const category = form.category.value

        if (!title) {   // ensures user enters a title
            alert('Title is required')
            return
        }
        if (category === 'Default') {   //ensures the category has been selected
            alert('Please select a category')
            return
        }

        const newBoard = { //creats the dictionary being used. 
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
                    <p className="view-button">Create Board</p>
                </button>
            </div>


            {modal && (
                <div className="overlay" onClick={toggleModal}>

                    <div className="modal_content" onClick={e => e.stopPropagation()} >
                        <div className="form_container">
                            <form action="http://localhost:3000/add" method="get">
                                <h1 id="form_title">Create Board</h1>

                                <label className="form_labels" htmlFor="boardTitle">Title:</label>
                                <input type="text" id="boardTitle" name="boardTitle" placeholder="Enter Board Title..."/>

                                <label className="form_labels" htmlFor="category">Category:</label>
                                <select className="category" name="category" id="category">
                                    <option value="Default">Select Category</option>
                                    <option value="Celebration">Celebration</option>
                                    <option value="Inspiration">Inspiration</option>
                                    <option value="Thank You">Thank You</option>
                                </select>

                                <label className="form_labels" htmlFor="boardAuthor">Author:</label>
                                <input type="text" id="boardAuthor" name="boardAuthor" placeholder="Enter Author (Optional)"/>

                                <div className="modal_button_container">
                                        <button   onClick={handleSubmit} id="close_button">Create Board</button>
                                </div>

                            </form>

                        </div>


                    </div>
                </div>
            )}
        </>
    );
}



