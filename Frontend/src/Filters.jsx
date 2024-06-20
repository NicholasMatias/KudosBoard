import './Filters.css'
function Filters({setFilter}){


    const callFilters = (e) =>{
        e.stopPropagation()
        const currFilter = e.currentTarget.value
        setFilter(currFilter)
    }


    return(
        <div className='filters_container'>
            <div className='filters'>
                <button className='filter_buttons' value={"All"} onClick={callFilters}>
                    <p className='button_text'>All</p>
                </button>
                <button className='filter_buttons' value="Recent" onClick={callFilters}>
                    <p className='button_text'>Recent</p>
                </button>
                <button className='filter_buttons' value="Celebration" onClick={callFilters}>
                    <p className='button_text'>Celebration</p>
                </button>
                <button className='filter_buttons' value={"Thank You"} onClick={callFilters}>
                    <p className='button_text'>Thank You</p>
                </button>
                <button className='filter_buttons' value={"Inspiration"} onClick={callFilters}>
                    <p className='button_text'>Inspiration</p>
                </button>
            </div>
        </div>
    )
}


export default Filters