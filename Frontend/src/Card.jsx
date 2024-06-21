import './Card.css';
import { Link } from  'react-router-dom'
function Card({title, imgSrc, info,likes,category,author,cardID,setDelete, updatedCardLikes}){

    const DeleteID = () =>{
        setDelete(cardID)
        // console.log(cardID)
    }

    const handleLike = async() =>{
            console.log("Handling like for card id",cardID)
            try{
                const response = await fetch( `http://localhost:3000/KudoCards/Cards/${cardID}`,
                    {   method: 'PATCH' }
                )
            
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            const updatedCard = await response.json()
            console.log('Updated card:',updatedCard)
            updatedCardLikes(cardID, updatedCard.likes)
        }
        catch(error){
            console.error('Error updating likes', error)
        }
        
    }


    return (
        <div className='card_container'>
            <div className='card_content'>
                <img className='card_image' src={imgSrc} alt="" />
                <h3 className='card_title'>{title}</h3>
                <p>{info}</p>
                {author? <h5>By: {author}</h5>:<></>}
                <div className='button_container'>
                    <button onClick={DeleteID}>
                        <div id='delete_board'>
                            Delete Card
                        </div>
                    </button>
                    <button onClick={handleLike}>
                        {likes} likes
                    </button>
                </div>
            </div>
            
        </div>
    )
}


export default Card;