import { useParams } from 'react-router-dom'
import './CardsList.css'
import { useEffect, useState } from 'react'
import Card from './Card'
import NewCard from './NewCard'

const CardsList=() =>{
    const { id } = useParams()
    const [cards, setCards] = useState([])


    const handleDelete = async (id) => {
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
    const addCard = async (newCard) => {
        try{
            const response = await fetch(`http://localhost:3000/KudoCards/Cards/${id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCard)
            })
            const data = await response.json()
            console.log("This is the data being used:",data)
            setCards([...cards,...data])
        }
        catch(error){
            console.error('Error when adding a new board:', error)
        }
    }


    useEffect (() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(`http://localhost:3000/KudoCards/Cards/${id}`)
                if(!response.ok){
                    throw new Error("Network response was not ok. ")
                }
                // console.log("Board ID:", id)
                const data = await response.json()
                // console.log("Data:",data)
                setCards(data)
            }
            catch (error) {
                console.error("Could not load board cards:", error)
            }
        }
        fetchCards()


    }, [id,cards])

    return (
        <div className='cardList'>

            <NewCard
            addCard = {addCard}
            
            />
            {(cards ? cards : []).map((card,i) => {
                return (
                    <Card key={i}
                    title={card.cardTitle}
                    author={card.cardAuthor}
                    imgSrc={card.cardImg}
                    cardID={card.id}
                    info={card.cardInfo}
                    setDelete={handleDelete}
                    
                    />

                )
            }
                    
                        
                    

            )}
        </div>
    )
}

export default CardsList