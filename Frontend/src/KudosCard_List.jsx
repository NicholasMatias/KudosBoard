import './KudosCard_List.css';
import KudosCard from './KudosCard';
import Filters from './Filters';
import Search from './Search';
import NewBoard from './NewBoard';

function KudosCard_List() {
    return(

        <>
        <Search/>
        <Filters/>
        <NewBoard/>
        <div className='KudosCard_list_container'>
            <KudosCard/>
            <KudosCard/>
            <KudosCard/>
            <KudosCard/>
            <KudosCard/>
            <KudosCard/>
            <KudosCard/>
            <KudosCard/>
            <KudosCard/>
            <KudosCard/>
            <KudosCard/>
            <KudosCard/>
            <KudosCard/>

        </div> 
        </>
    )
}

export default KudosCard_List;