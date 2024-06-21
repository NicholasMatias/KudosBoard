import './KudosCard.css';
import { Link } from  'react-router-dom'
function KudosCard({title, imgSrc, category,author,boardID,setDelete}){

    const DeleteID = () =>{
        setDelete(boardID)
        // console.log(cardID)
    }


    return (
        <div className='card_container'>
            <div className='card_content'>
                <img className='card_image' src={imgSrc} alt="" />
                <h3 className='card_title'>{title}</h3>
                <p>{category}</p>
                <div className='button_container'>
                    <button>
                        <div id='view_board'>
                            <Link to={`/${boardID}`}>  
                                <button>View Board</button>
                            </Link>
                        </div>
                    </button>
                    <button onClick={DeleteID}>
                        <div id='delete_board'>
                            Delete Board
                        </div>
                    </button>
                </div>
            </div>
            
        </div>
    )
}


export default KudosCard;