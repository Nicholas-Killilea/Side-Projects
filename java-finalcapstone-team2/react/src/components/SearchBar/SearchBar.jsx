import { useState, useEffect } from 'react';
import styles from './SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ setSearch, setSearchCategory, searchCategory }) {
    const [searchText, setSearchText] = useState('');
    const [genreOptions, setGenreOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [hasBeenFocused, setHasBeenFocused] = useState(false);
    
    const executeSearch = () => {
        if (searchCategory === 'Title') {
            setSearch(searchText);
        } else {
            setSearch(selectedValue);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            executeSearch();
        }
    };

    function handleCategoryChange(event) {
        const newCategory = event.target.value;
        setSearchCategory(newCategory);
        setSelectedValue('');
        setSearch('');
        setHasBeenFocused(false);
    }

    const handleSpecializedSelection = (event) => {
        setSelectedValue(event.target.value);
        setSearch(event.target.value);
    };

    const handleFocus = () => {
        if (!hasBeenFocused) {
            setSearchText('');
            setHasBeenFocused(true);
        }
    };

    const handleBlur = () => {
        // Reset the focus state when the field loses focus
        if (searchText === '') {
            setHasBeenFocused(false);
        }
    };

    const handleYearInputClick = () => {
        setSelectedValue('');
    };

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const apiKey = import.meta.env.VITE_API_KEY;
                const apiUrl = import.meta.env.VITE_API_URL;
                
                const genresResponse = await fetch(`${apiUrl}genres?key=${apiKey}`);
                if (genresResponse.ok) {
                    const genresData = await genresResponse.json();
                    setGenreOptions(genresData.results || []);
                }
            } catch (error) {
                console.error("Error fetching search options:", error);
            }
        };
        
        fetchOptions();
    }, []);

    const renderSearchInterface = () => {
        switch(searchCategory) {
            case 'Genre':
                return (
                    <div className={styles.searchElements}>
                        <select 
                            value={selectedValue}
                            onChange={handleSpecializedSelection}
                            className={styles.categorySelect}
                        >
                            <option value="">Select Genre</option>
                            {genreOptions.map(genre => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))}
                        </select>
                    </div>
                );
            case 'Year':
                return (
                    <div className={styles.searchElements}>
                        <input
                            type="number"
                            placeholder="Enter year"
                            value={selectedValue}
                            onChange={(e) => {
                                const yearValue = e.target.value;
                                setSelectedValue(yearValue);
                                if (yearValue.length === 4) {
                                    setSearch(yearValue);
                                }
                            }}
                            className={styles.searchInput}
                            min="1950"
                            max="2030"
                            onKeyPress={handleKeyPress}
                            onClick={handleYearInputClick}
                        />
                        <button 
                            onClick={executeSearch}
                            className={styles.searchButton}
                        >
                            <FontAwesomeIcon 
                                icon={faMagnifyingGlass} 
                                style={{ color: 'white' }} 
                            />
                        </button>
                    </div>
                );
            case 'Title':
            default:
                return (
                    <div className={styles.searchElements}>
                        <input
                            type="text"
                            placeholder="Search by title"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className={styles.searchInput}
                            onKeyPress={handleKeyPress}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <button 
                            onClick={executeSearch}
                            className={styles.searchButton}
                        >
                            <FontAwesomeIcon 
                                icon={faMagnifyingGlass} 
                                style={{ color: 'white' }} 
                            />
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className={styles.searchBar}>
            <select 
                value={searchCategory}
                onChange={handleCategoryChange}
                className={styles.categoryTypeSelect}
            >
                <option className={styles.dropdown} value="Title">Title</option>
                <option className={styles.dropdown} value="Genre">Genre</option>
                <option className={styles.dropdown} value="Year">Year</option>
            </select>

            {renderSearchInterface()}
        </div>
    );
}

export default SearchBar;