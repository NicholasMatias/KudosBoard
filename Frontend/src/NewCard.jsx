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

    if (modal) { // toggles modal to create a new card. (changes css to make it appear or disappear off the screen)
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const handleGifSearch = async (e) => {  // takes in search query and returns 10 gifs based off of that. API call to giphy. 
        const query = e.target.value
        setGifSearch(query)
        if (query !== '') {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=uumLdOD1R84CdNPUpoWtd5EZuZvxQhVw&q=${query}&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
            const data = await response.json()
            setGifs(data.data)
        }
        else {
            setGifs([]) // if search empty then no gifs will display. 
        }
    }

    const handleGifClick = (gifUrl) => { //sets the url for new card img and sets gifs to []. Will no longer display any gifs within the form as a choice has been made. 
        setImgSrc(gifUrl)
        console.log("Gif url:", gifUrl)
        setGifs([])
    }

    const handleSubmit = async (e) => { // sets the other information for the new card. 
        e.preventDefault()
        const form = e.target.form
        const cardTitle = form.cardTitle.value
        const cardInfo = form.cardInfo.value

        if (!cardTitle) { // ensures user enters a title for the new card. 
            alert('Title is required')
            return
        } 

        if(!cardInfo){  // ensures user enters a description for the new card. 
            alert('Card description is required.')
            return
        }

        const newCard = {   // dictionary that will be used in api call to make new card. 
            cardTitle,  
            cardAuthor: form.cardAuthor.value,
            cardInfo,
            cardImg: imgSrc
        }
        console.log(newCard)
        await addCard(newCard)

        toggleModal() // makes the modal turn off after since the user has submitted the form. 
    }

    return (
        <>
            <button onClick={toggleModal} className="create_button">
                Create Card
            </button>


            {modal && (
                <div className="overlay" onClick={toggleModal}>

                    <div className="modal_content" onClick={e => e.stopPropagation()} >
                        <div className="form_container">
                            <form action="http://localhost:3000/add" method="get">

                                <h1 id="form_title">Create Card</h1>

                                <label className="label_input" htmlFor="cardTitle">Title:</label>
                                <input type="text" id="cardTitle" className="inputs" placeholder="Enter Card Title..." name="cardTitle" />
                                <br></br>
                                <label className="label_input" htmlFor="cardAuthor">Author:</label>
                                <input type="text" id="cardAuthor" className="inputs" placeholder="Enter Author (Optional Sign It)" name="cardAuthor" />
                                <br></br>
                                <label className="label_input" htmlFor="cardInfo">Description:</label>
                                <input type="text" id="cardInfo" className="inputs" placeholder="Enter Card Description..." name="cardInfo" />
                                <br></br>
                                <label className="label_input" htmlFor="imgSrc">Search GIFs:</label>
                                <input type="text" id="imgSrc" className="inputs" name="imgSrc" placeholder="Search and Click to Select" value={gifSearch} onChange={handleGifSearch} />




                                {gifs.length > 0 && (   // this displays the gifs right below the search input tag. Sets up onClick interaction for each gif as well. 
                                    <div className="gif_container">
                                        {gifs.map((gif) => (
                                            <img src={gif.images.fixed_height.url} alt={gif.title} key={gif.id} onClick={() => handleGifClick(gif.images.fixed_height.url)} className="gif" />
                                        ))}
                                    </div>
                                )}




                                <div className="modal_button_container">
                                    <div className="create_close_container">
                                        <button id="create_card" onClick={handleSubmit}>Create Card</button>


                                    </div>
                                </div>

                            </form>

                        </div>





                    </div>
                </div>
            )}
        </>
    );
}



