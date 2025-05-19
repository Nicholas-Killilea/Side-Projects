
//GENRE SEARCH URL - https://api.rawg.io/api/games?key=YOUR_API_KEY&genres=ACTION  => you need to use the num value for genre category
    //4 is the slug for action
//YEAR SEARCH URL - https://api.rawg.io/api/games?key=YOUR_API_KEY&dates=2020-01-01,2020-12-31
//PUBLISHER SEARCH URL - https://api.rawg.io/api/games?key=YOUR_API_KEY&publishers=Electronic%20Arts  => make sure the name is url encoded (google it)

export function getCorrectURL({ search, searchCategory }) {
    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;
    let url = `${apiUrl}games?key=${apiKey}`;

    // If no search term, return base URL
    if (!search || search.trim() === '') {
        return url;
    }

    if (searchCategory === "Title") {
        // Simple title search
        url = `${apiUrl}games?key=${apiKey}&search=${encodeURIComponent(search)}`;
    } else if (searchCategory === "Year") {
        // Format for year: needs to be start and end dates
        // If only year is provided (e.g., "2020"), make it a full year range
        if (/^\d{4}$/.test(search)) {
            url = `${apiUrl}games?key=${apiKey}&dates=${search}-01-01,${search}-12-31`;
        } else {
            // If it's already in a date format, use as-is
            url = `${apiUrl}games?key=${apiKey}&dates=${search}`;
        }
    } else if (searchCategory === "Genre") {
        // Genre can be a name or ID
        // If it's a number, treat as ID, otherwise as name
        const isNumeric = /^\d+$/.test(search);
        if (isNumeric) {
            url = `${apiUrl}games?key=${apiKey}&genres=${search}`;
        } else {
            // Convert to lowercase for genre slug
            const genreSlug = search.toLowerCase();
            url = `${apiUrl}games?key=${apiKey}&genres=${genreSlug}`;
        }
    } else if (searchCategory === "Publisher") {
        // Publisher needs URL encoding
        url = `${apiUrl}games?key=${apiKey}&publishers=${encodeURIComponent(search)}`;
    } else {
        // Default search across all fields
        console.log("Using default search method");
        url = `${apiUrl}games?key=${apiKey}&search=${encodeURIComponent(search)}`;
    }

    return url;
}

export default getCorrectURL;