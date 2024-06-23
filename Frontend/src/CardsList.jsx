import { useParams } from 'react-router-dom'
import './CardsList.css'
import { useEffect, useState } from 'react'
import Card from './Card'
import NewCard from './NewCard'
import { Link } from 'react-router-dom'

const CardsList = () => {
    const { id } = useParams()
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(true)
    const [boardData,setBoardData] = useState(null)
    const [trigger, setTrigger] = useState(0)


    const handleDelete = async (id) => { // makes the api call to delete a card. Card determined by card id. 
        try {
            await fetch(`http://localhost:3000/KudoCards/Cards/${id}`, {
                method: 'DELETE'
            })
            setCards(cards.filter((card) => card.id !== id))
        }
        catch (error) {
            console.error('Error when deleting board:', error)
        }
    }
    const addCard = async (newCard) => {    //makes api call to add a card. id is used to determine which board to add the card to. (board id)
        try {
            const response = await fetch(`http://localhost:3000/KudoCards/Cards/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCard)
            })
            const data = await response.json()
            setCards((prevCards) => [...prevCards,data])
            setTrigger(trigger+1)
            console.log("Trigger",trigger)
        }
        catch (error) {
            console.error('Error when adding a new board:', error)
        }


    }


    const updatedCardLikes = (id, newLikes) => {    // updates the card like count 
        setCards(cards.map(card => card.id === id ? { ...card, likes: newLikes } : card))
    }


    useEffect(() => {
        const fetchCards = async () => {    // makes the api call to fetch the cards of a specific board. Uses board id. 
            try {
                const response = await fetch(`http://localhost:3000/KudoCards/Cards/${id}`)
                if (!response.ok) {
                    throw new Error("Network response was not ok. ")
                }
                const data = await response.json()
                setCards(data)


                const board = await fetch(`http://localhost:3000/KudoCards/${id}`)  // used to get the board title, so that the board title can be displayed on its respective card page. 
                const newData = await board.json()
                setBoardData(newData)
                setLoading(false)
            }
            catch (error) {
                console.error("Could not load board cards:", error)
                setLoading(false)
            }
        }
        fetchCards()


    }, [id])

    if(loading){    //added this to reduce errors. Would attempt to fetch before data was finalized by a previous operation. This ensures that the errors do not populate in the console 
                    //
        return<div>Loading...</div>
    }

    

    return (
        <div className='cardList'>
            <header id="title_container">
                {boardData ? <h1>"{boardData.title}" Board Cards</h1> : <h1>Card Page</h1>}
            </header>
            <div className='button_container'>
                <NewCard
                    addCard={addCard}
                />
                <Link to={'/boards'}>
                    <button className='board_page_button'>Board Page</button>
                </Link>
            </div>


            {(cards ? cards : []).map((card, i) => { //maps all of the cards 
                return (
                    <Card key={i}
                        title={card.cardTitle}
                        author={card.cardAuthor}
                        imgSrc={card.cardImg}
                        cardID={card.id}
                        info={card.cardInfo}
                        setDelete={handleDelete}
                        likes={card.likes}
                        updatedCardLikes={updatedCardLikes}

                    />

                )
            }




            )}
        </div>
    )
}

export default CardsList