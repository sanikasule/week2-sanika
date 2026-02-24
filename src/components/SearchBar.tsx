import React, { useState } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
    onFilterChange: (sector: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    onFilterChange,
    placeholder = 'Search stocks...',
}) => {
    const [query, setQuery] = useState('');
    
    //change event - typed to specifie HTML element
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    //keyboard event - access s.key safely
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onSearch(query);
        if (e.key === 'Escape') {setQuery(''); onSearch('')};
    };

    //mouse event - access e.currentTarget safely
    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setQuery('');
        onSearch('');
    };

    //change event for select
    const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(e.target.value);
    };

    return (
        <div style={{display: 'flex', gap: 8, marginBottom: 20}}>
            <input value={query} onChange={handleInputChange} onKeyDown={handleKeyDown}
            placeholder={placeholder} style={{flex: 1, padding: 8, border: '2px solid #ababb9',borderRadius: 4, background: '#fff', color: '#000', fontFamily: 'Times New Roman, serif', fontSize: '15px'}}/>
            <button onClick={handleClear} style={{background: '#8236fd', color: '#fff', border: '2px solid #ababb9', borderRadius: 10, fontFamily: 'Times New Roman, serif', fontSize: '15px'}}>Clear</button>
            <select onChange={handleSectorChange} style={{border: '2px solid #ababb9', borderRadius: 10, fontFamily: 'Times New Roman, serif', fontSize: '15px'}}>
                <option value="">All Sectors</option>
                <option value="Technology">Technology</option>
                <option value="Automotive">Automotive</option>
                <option value="Finance">Finance</option>
                <option value="Consumer Discretionary">Consumer Discretionary</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Energy">Energy</option>
                <option value="Entertainment">Entertainment</option>
            </select>
        </div>
    )
}

export default SearchBar;