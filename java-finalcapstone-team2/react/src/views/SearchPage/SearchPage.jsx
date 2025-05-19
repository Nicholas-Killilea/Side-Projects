// SearchPage.jsx
import {useState} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import GameGrid from '../../components/GameGrid/GameGrid';
import './SearchPage.css'

function SearchPage() {
    const [search, setSearch] = useState('');
    const [searchCategory, setSearchCategory] = useState('Title');
   
    return (
        <div className='searchPage'>
            <div className='mainContainer'>
                <div className="searchContent">
                    <div className='welcomeContainer'>
                      <h1 className='welcome'>Search Games</h1>
                    </div>
                    <SearchBar 
                        setSearch={setSearch} 
                        setSearchCategory={setSearchCategory} 
                        searchCategory={searchCategory}
                    />
                    {/* <p>Search term: {search}</p>
                    <p>Search Category: {searchCategory}</p> */}
                    <GameGrid search={search} searchCategory={searchCategory}/>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;