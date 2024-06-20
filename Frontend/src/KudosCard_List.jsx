import './KudosCard_List.css';
import KudosCard from './KudosCard';
import Filters from './Filters';
import Search from './Search';
import NewBoard from './NewBoard';
import { useEffect, useState } from 'react';

function KudosCard_List() {
    const [filter, setQuery] = useState("All")
    

    const handleQuery = (f) =>{
        setQuery(f)
    }

    const [kudosCardsList, setKudosCardsList] = useState([])

    useEffect(()=>{
        const options = {
            method: 'GET',
        }
        fetch(`http://localhost:3000/KudoCards?category=${filter}`, options)
        .then(response => response.json())
        .then(response => setKudosCardsList(response))
        // .then(console.log(kudosCardsList))
        .catch(error => console.error("Error fetching the kudos boards:", error)) 
    },[filter])


    const addBoard = (boardData) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(
                boardData
            )
                
            
        }
        fetch(`http://localhost:3000/add`,options)
            .then(response => response.json())
            .then(response => setKudosCardsList(...kudosCardsList,...response))
            .catch(error => console.error("Error adding kudo board:", error))
    }




        

    

    return(
        <>
        <Search/>
        <Filters setFilter={handleQuery} />
        <NewBoard/>
        <div className='KudosCard_list_container'>
    
        {kudosCardsList?.map((kudo, i) => {
                    return (
                        <KudosCard key={i}
                            title={kudo.title}
                            category={kudo.category}
                            imgSrc={kudo.imgSrc}
                        />)

                })}
        
       

        </div> 
        </>
    )
}

export default KudosCard_List;