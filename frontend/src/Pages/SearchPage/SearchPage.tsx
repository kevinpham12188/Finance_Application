import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { CompanySearch } from '../../company';
import { searchCompanies } from '../../api';
import Navbar from '../../Components/Navbar/Navbar';
import Search from '../../Components/Search/Search';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../Components/CardList/CardList';
import { PortfolioGet } from '../../Models/Portfolio';
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from '../../Services/PortfolioService';
import { toast } from 'react-toastify';

interface Props {}

const SearchPage = (props: Props) => {
    // Store input from users
  const [search, setSearch] = useState<string>("");
  // Store output from db
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  // Store users' portfolio
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);
  const [serverError, setServerError] = useState<string | null>(null);
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
      getPortfolio();
    }, [])

    const getPortfolio = () => {
      portfolioGetAPI().then((res) => {
        if(res?.data) {
          setPortfolioValues(res?.data);
        }
      }).catch((e) => {
        toast.warning("Could not get portfolio values!")
      })
    }
    // Function to handle add and update new stock to portfolio
    const onPortfolioCreate = (e : any) => {
      e.preventDefault();
      portfolioAddAPI(e.target[0].value)
      .then((res) => {
        if(res?.status == 204) {
          toast.success("Stock added to portfolio!");
          getPortfolio();
        }
      }).catch((e) => {
        toast.warning("Could not create portfolio item!");
      })
    }
    // Function to handle delete stock in portfolio
    const onPortfolioDelete = (e : any) => {
       e.preventDefault();
       portfolioDeleteAPI(e.target[0].value)
       .then((res) => {
        if(res?.status == 200) {
          toast.success("Stock deleted from portfolio!");
          getPortfolio();
        }
       })
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
      {/* <Hero /> */}
      <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange}/>
      {serverError && <div>Unable to connect to API</div>}
      <ListPortfolio portfolioValues={portfolioValues!} onPortfolioDelete={onPortfolioDelete}/>
      <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate}/>
    </div>
  )
}

export default SearchPage