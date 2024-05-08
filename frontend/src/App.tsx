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
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        console.log(e);
    }
    const onClick = async (e : SyntheticEvent) => {
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
      <Search onClick={onClick} search={search} handleChange={handleChange}/>
      {serverError && <div>Unable to connect to API</div>}
      <CardList searchResults={searchResult} />
    </div>
  );
}

export default App;
