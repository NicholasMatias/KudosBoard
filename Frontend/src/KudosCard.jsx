import './KudosCard.css';

function KudosCard({title, imgSrc, category,author,cardID,setDelete}){

    const DeleteID = () =>{
        setDelete(cardID)
        console.log(cardID)
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
                            View Board
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