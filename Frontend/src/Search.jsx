import './Search.css'

function Search({setSearch}){

    const setSearchQuery = (e) =>{
        setSearch(e.target.value)
    }

    

    return (
        <div className='search_container'>
            <input id="search_bar" type='search' onChange={setSearchQuery} placeholder='Search boards...' >

            </input>

        </div>
    )
}

export default Search