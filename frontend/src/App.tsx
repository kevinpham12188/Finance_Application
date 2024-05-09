import './App.css';
import CardList from './Components/CardList/CardList';
import Search from './Components/Search/Search';
import React, { useState, ChangeEvent, SyntheticEvent } from 'react'
import { CompanySearch } from './company';
import { searchCompanies } from './api';
import ListPortfolio from './Components/Portfolio/ListPortfolio/ListPortfolio';

function App() {
  // Store input from users
  const [search, setSearch] = useState<string>("");
  // Store output from db
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  // Store users' portfolio
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        console.log(e);
    }
    // Function to handle add and update new stock to portfolio
    const onPortfolioCreate = (e : any) => {
      e.preventDefault();
      const exists = portfolioValues.find((value) => value === e.target[0].value);
      if(exists) return;
      const updatedPortfolio = [...portfolioValues, e.target[0].value];
      setPortfolioValues(updatedPortfolio);
    }
    // Function to handle delete stock in portfolio
    const onPortfolioDelete = (e : any) => {
       e.preventDefault();
       const removed = portfolioValues.filter((value) => {
        return value !== e.target[0].value;
       });
       setPortfolioValues(removed);
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
      <ListPortfolio portfolioValues={portfolioValues} onPortfolioDelete={onPortfolioDelete}/>
      <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate}/>
    </div>
  );
}

export default App;
