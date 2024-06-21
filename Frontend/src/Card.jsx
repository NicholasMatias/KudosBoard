import './Card.css';
import { Link } from  'react-router-dom'
function Card({title, imgSrc, info,category,author,cardID,setDelete}){

    const DeleteID = () =>{
        setDelete(cardID)
        // console.log(cardID)
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
                </div>
            </div>
            
        </div>
    )
}


export default Card;