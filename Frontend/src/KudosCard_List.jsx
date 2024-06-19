import './KudosCard_List.css';
import KudosCard from './KudosCard';
import Filters from './Filters';
import Search from './Search';
import NewBoard from './NewBoard';
import { useEffect, useState } from 'react';

function KudosCard_List() {
    const [kudosCardsList, setKudosCardsList] = useState([])
    const [newBoard, setNewBoard] = useState([])
    useEffect(()=>{
        const options = {
            method: 'GET',
        }
        fetch(`http://localhost:3000/KudoCards`, options)
        .then(response => response.json())
        .then(response => setKudosCardsList(response))
        .catch(error => console.error("Error fetching the kudos boards:", error)) 
    },[kudosCardsList])



    // useEffect(({newData})=>{
    //     const options = {
    //         method: 'POST',
    //         body: JSON.stringify(
                
    //         )
                
            
    //     }
    //     fetch(`http://localhost:3000/add`,options)
    //         .then(response => response.json())
    //         .then(response => setKudosCardsList(...kudosCardsList,...response))
    //         .catch(error => console.error("Error adding kudo board:", error))

    // }, [newBoard])
    
    
    return(

        <>
        <Search/>
        <Filters/>
        <NewBoard/>
        <div className='KudosCard_list_container'>
    
        {kudosCardsList?.map((kudo, i) => {
                    return (
                        <KudosCard key={i}
                            title={kudo.title}
                            category={kudo.category}
                            imgScr={kudo.imgScr}
                        />)

                })}
        
       

        </div> 
        </>
    )
}

export default KudosCard_List;