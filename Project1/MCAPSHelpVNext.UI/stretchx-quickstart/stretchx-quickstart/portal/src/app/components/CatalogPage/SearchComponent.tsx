import React, { useState, useEffect } from 'react';
import { SearchBox, Spinner } from '@fluentui/react';
import "./SearchBox.css";

const SearchComponent = ({ searchValue, setSearchValue, handleSearch, suggestions, handleSuggestionClick, handleSuggestionKeyPress, selectedSuggestion, handleOnSearch,isLoading }) => {
  const [isSearching, setIsSearching] = useState(false);

  const renderSuggestions = () => {
    if(isLoading){
      return(
      <div className="suggestions-container">
        <Spinner label="Loading..." labelPosition="right" />
      </div>
    )}
    else if (searchValue && suggestions.length > 0 && !isSearching && !isLoading) {
      return (
        <div className="suggestions-container">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} onKeyDown={(event) => handleSuggestionKeyPress(event, suggestion)} onClick={() => { handleSuggestionClick(suggestion) }} className="suggestion-item" style={{ cursor: 'pointer' }}>
              <p tabIndex={0}>{suggestion.name}</p>
            </div>
          ))}
        </div>
      );
    }
    else if (searchValue.length>2 && suggestions.length === 0 && !selectedSuggestion && !isSearching &&!isLoading) {
      return (
        <div className="suggestions-container">
          <p>No service found</p>
        </div>
      )
    }
    else {
      return null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.classList.contains('ms-SearchBox-iconContainer')
      ) {
        setIsSearching(true);
        handleOnSearch(searchValue);        
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleOnSearch]);

  useEffect(() => {
      setIsSearching(false);
    }, [searchValue]);

  return (
    <div className='search-container'>
      {/* <h5 className='search-header'>Search</h5> */}
      <SearchBox
        placeholder="Search Help Catalog..."
        onChange={handleSearch}
        onSearch={newValue => {
          setIsSearching(true);
          handleOnSearch(newValue);
        }}
        value={searchValue}
        className='catalogSearch'
        styles={{
          field: {
            padding: '0px 10px',
          },
          root: {
            border: '1px solid #D1D1D1',
            borderRadius: '4px',
            maxWidth: 'calc(25% - 15px)',
            minWidth: '325px',
          },
        }}
      />

      {/* Display suggestions */}
      {renderSuggestions()}
    </div>
  );
};

export default SearchComponent;
