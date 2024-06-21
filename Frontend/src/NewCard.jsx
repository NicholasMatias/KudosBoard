import { useState } from "react";
import "./NewCard.css";

export default function NewBoard({ addCard }) {
    const [imgSrc, setImgSrc] = useState('')
    const [gifSearch, setGifSearch] = useState('')
    const [gifs, setGifs] = useState([])

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const handleGifSearch = async(e) => {
        const query = e.target.value
        setGifSearch(query)
        if(query !==''){
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=uumLdOD1R84CdNPUpoWtd5EZuZvxQhVw&q=${query}&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
            const data = await response.json()
            setGifs(data.data)
        }
        else{
            setGifs([])
        }
    }

    const handleGifClick = (gifUrl) =>{
        setImgSrc(gifUrl)
        console.log("Gif url:",gifUrl)
        setGifs([])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target.form
        const cardTitle = form.cardTitle.value
        const cardInfo = form.cardInfo.value
        // const cardImg=  form.imgSrc.value

        if (!cardTitle) {
            alert('Title is required')
            return
        }

        const newCard = {
            cardTitle,
            cardAuthor: form.cardAuthor.value,
            cardInfo,
            cardImg: imgSrc
        }
        console.log(newCard)
        await addCard(newCard)

        toggleModal()
    }

    return (
        <>
            <div className="button_container">
                <button onClick={toggleModal} className="btn-modal">
                    <p className="view-button">Create a New Card</p>
                </button>
            </div>


            {modal && (
                <div className="overlay" onClick={toggleModal}>

                    <div className="modal_content" onClick={e => e.stopPropagation()} >
                        <div className="form_container">
                            <form action="http://localhost:3000/add" method="get">
                                <label htmlFor="cardTitle">Title:</label>
                                <input type="text" id="cardTitle" name="cardTitle" />

                                <label htmlFor="cardAuthor">Author:</label>
                                <input type="text" id="cardAuthor" name="cardAuthor" />

                                <label htmlFor="cardInfo">Description:</label>
                                <input type="text" id="cardInfo" name="cardInfo"/>

                                <label htmlFor="imgSrc">Search GIFS</label>
                                <input type="text" id="imgSrc" name="imgSrc"  value={gifSearch} onChange={handleGifSearch}/>




                                {gifs.length>0 && (
                                    <div className="gif_container">
                                        {gifs.map((gif)=>(
                                            <img src={gif.images.fixed_height.url} alt={gif.title} key={gif.id} onClick={()=> handleGifClick(gif.images.fixed_height.url)} className="gif"/>
                                        ))}
                                    </div>
                                )}


                                

                                <div className="modal_button_container">
                                    <div className="create_close_container">
                                        <input type="button" value="Create Card" onClick={handleSubmit} />


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



