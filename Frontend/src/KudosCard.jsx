import './KudosCard.css';
import { Link } from  'react-router-dom'
function KudosCard({title, imgSrc, category,author,boardID,setDelete}){

    const DeleteID = () =>{
        setDelete(boardID)
    }


    return (
        <div className='card_container'>
            <div className='card_content'>
                <img className='card_image' src={imgSrc} alt="" />
                <h3 className='card_title'>{title}</h3>
                <p>{category}</p>
                {author? <h5>By: {author}</h5>:<></>}

                <div className='button_container'>
                            <Link to={`/${boardID}`}>  
                                <button id='view_board'>View</button>
                            </Link>
                    
                    <button onClick={DeleteID} id='delete_board'>
                            Delete
                    </button>
                </div>
            </div>
            
        </div>
    )
}


export default KudosCard;