import React from 'react';
import Form from 'next/form';

// components
import SearchFormReset from './SearchFormReset';

const SearchForm = () => {

    const query = "test";

    

  return (
    <Form action='/' scroll={false} className="search-form">
        <input 
            name='query' 
            defaultValue={query}
            placeholder='Search Startups'
            className="search-input"
        />

        {/* if there is a query , then show a reset button */}
        <div className="flex gap-2">
            { query && <SearchFormReset /> }
        </div>

        {/* Search button */}
        <button type='submit' className="search-btn text-white"> S </button>
    </Form>
  )
}

export default SearchForm