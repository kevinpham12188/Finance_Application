import './App.css';
import CardList from './Components/CardList/CardList';
import Search from './Components/Search/Search';
import React, { useState, ChangeEvent, SyntheticEvent } from 'react'
import { CompanySearch } from './company';
import { searchCompanies } from './api';

function App() {
  // Store input from users
  const [search, setSearch] = useState<string>("");
  // Store output from db
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        console.log(e);
    }
    const onPortfolioCreate = (e : SyntheticEvent) => {
      e.preventDefault();
      console.log(e);
    }
    const onSearchSubmit = async (e : SyntheticEvent) => {
      e.preventDefault();
        const result = await searchCompanies(search);
        // Type narrowing
        if(typeof result === "string") {
           setServerError(result); 
        } else if(Array.isArray(result.data)) {
          setSearchResult(result.data);
        }
        console.log(searchResult);
    };
  return (
    <div className="App">
      <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange}/>
      {serverError && <div>Unable to connect to API</div>}
      <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate}/>
    </div>
  );
}

export default App;
