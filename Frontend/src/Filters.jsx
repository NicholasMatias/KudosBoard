import './Filters.css'

function Filters(){
    return(
        <div className='filters_container'>
            <div className='filters'>
                <button className='filter_buttons'>
                    <p className='button_text'>All</p>
                </button>
                <button className='filter_buttons'>
                    <p className='button_text'>Recent</p>
                </button>
                <button className='filter_buttons'>
                    <p className='button_text'>Celebration</p>
                </button>
                <button className='filter_buttons'>
                    <p className='button_text'>Thank You</p>
                </button>
                <button className='filter_buttons'>
                    <p className='button_text'>Inspiration</p>
                </button>
            </div>
        </div>
    )
}


export default Filters