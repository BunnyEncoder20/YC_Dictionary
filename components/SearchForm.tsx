import React from 'react';
import Form from 'next/form';

// components
import SearchFormReset from './SearchFormReset';
import { Search } from 'lucide-react';

const SearchForm = ({ query } : { query?: string }) => {

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
        <button type='submit' className="search-btn text-white"> 
            <Search className='size-5'/>
        </button>
    </Form>
  )
}

export default SearchForm