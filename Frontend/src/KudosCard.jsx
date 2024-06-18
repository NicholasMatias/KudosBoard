import './KudosCard.css';

function KudosCard(){
    return (
        <div className='card_container'>
            <div className='card_content'>
                <img className='card_image' src="" alt="" />
                <h3 className='card_title'>Title</h3>
                <p>Type</p>
                <div className='button_container'>
                    <button>
                        <div id='view_board'>
                            View Board
                        </div>
                    </button>
                    <button>
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