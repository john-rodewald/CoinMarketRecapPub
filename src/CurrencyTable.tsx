/*
Main program logic (API fetching, processing and displaying) lives here.
API key is entered in an input form.

For local testing, a CORS Proxy was in place.
(https://github.com/Rob--W/cors-anywhere)

*/


import React, { useState } from 'react';
import axios from 'axios';
import CurrencyEntry from './CurrencyEntry';
import CurrencyHeading from './CurrencyHeading';
import './CurrencyTable.css';

function CurrencyTable() {
  const [entryList, setList]          = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [lastUpdate, setLastUpdate]   = useState(0)
  const [pagePos, setPagePos]         = useState(0)
  const [sortAscending, setAscending] = useState(true)
  const [sortKey, setSortKey]         = useState("rank")
  const [API_KEY, SET_API_KEY]        = useState("")
  
  const CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com/"
  const ELEMS_PER_PAGE   = 50
  const HEADINGS = ["rank", "name", "symbol", "circ", "total", "price", "cap", "change", "history"]

  // Update data every INTERVAL milliseconds
  // https://stackoverflow.com/questions/39426083/update-react-component-every-second
  const INTERVAL = 10000

  // Return latest results as list of objects
  const fetchData = async() => {
    console.log("Updated")
    const URL: string       = CORS_ANYWHERE + "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
    const CURRENCY: string  = "EUR"
    const AMOUNT: number    = 5000
    var result: any         = {data: []}
  
    const headers = {
      "Accept": "application/json",
      "X-CMC_PRO_API_KEY": API_KEY
    }
    const params = {
      "start": 1,
      "limit": AMOUNT,
      "convert": CURRENCY
    }
    await axios.get(URL, {headers, params})
         .then(r => {result = r.data})
         .catch((err) => {console.log("ERROR (Axios): "); console.log(err);})

    // Convert Axios promise to list of objects
    return result.data.map((e: any) => { return {
      "id" :    e.id,
      "rank" :  e.cmc_rank,
      "name" :  e.name,
      "symbol": e.symbol,
      "circ":   e.circulating_supply,
      "total":  e.total_supply,
      "price":  e.quote.EUR.price,
      "cap":    e.quote.EUR.market_cap,
      "change": e.quote.EUR.percent_change_24h }
      })

  }
  // Set API key and start updating in interval
  const submitKey = (e: any) => {
    e.preventDefault()
    const val = e.target.keyBox.value
    if (val.length !== 36) {
      window.alert("Enter a valid API key.")
      return
    }
    SET_API_KEY(e.target.keyBox.value)
    handleUpdate()
    e.target.classList.add("submitted")
    const interval = setInterval(() => handleUpdate(), INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }
  // Handlers 
  const handleUpdate = () => {
    if (Date.now() - lastUpdate >= 5000) {
      fetchData().then(f => { 
        const sorted = sortObjectList(f, sortKey, sortAscending);
        setList(sorted);
        setFilteredList(sorted);})
      setLastUpdate(Date.now())
    }
  }
  const handleNextPage = () => {
    if (pagePos + ELEMS_PER_PAGE < filteredList.length)
      setPagePos(pagePos+ELEMS_PER_PAGE)
  }
  const handlePrevPage = () => {
    if (pagePos - ELEMS_PER_PAGE >= 0)
      setPagePos(pagePos-ELEMS_PER_PAGE)
  }
  const handleSearch = (e: any) => {
    setPagePos(0)
    const query = e.target.value
    setFilteredList(entryList.filter((entry: any) => 
        matchSearch(entry.name, query) || matchSearch(entry.symbol, query)))
  }
  const handleKeyBox = (e: any) => {
    SET_API_KEY(e.target.value)
  }
  const handleSort = (e: any) => {
    const newProp = e.target.id
    setList(sortObjectList(entryList, newProp, sortAscending))
    setAscending(!sortAscending)
    setSortKey(newProp)
  }
  // TODO: Improve readability
  return (
    <div className="currencyTable">
      <div className="navigation">
        <div className="pageDisplay">
          <form id="keyForm" onSubmit={submitKey}>
            <input name="keyBox" id="keyBox" placeholder="Enter API key" onChange={handleKeyBox}></input>
            <input name="submit" id="keySubmit" type="submit"/>
          </form>
          <input id="searchBox" onChange={handleSearch} placeholder="Search"></input>
          <button className="pageButton" onClick={handlePrevPage}>Previous page</button>
          <button className="pageButton" onClick={handleNextPage}>Next page</button>
          <div id="results">Results: {pagePos + 1} - {filteredList.length}</div>
        </div>
      </div>
      <div className="headings"> 
        { HEADINGS.map(
              (id: string, i: number) => 
              (<CurrencyHeading 
              id      = {id} 
              handler = {handleSort} 
              text    = {id}
              key     = {i}
              />))
        } 
      </div>    
      <div className="entries">
      { filteredList         // Entry creation
          .map( 
           (entry: any, i: number) => 
           (<CurrencyEntry 
           id     = {entry.id}
           rank   = {entry.rank}
           name   = {entry.name} 
           symbol = {entry.symbol} 
           circ   = {entry.circ} 
           total  = {entry.total} 
           price  = {entry.price}
           cap    = {entry.cap} 
           change = {entry.change} 
           key    = {i}
           />))
          // Pagination 
          .slice(pagePos, pagePos+ELEMS_PER_PAGE) 
      }
      </div>
    </div>
  )
}

// Helper functions
const matchSearch = (str: string, query: string) => {
  return str.toUpperCase().startsWith(query.toUpperCase()) 
}

const isString = (s: string) => {
  return (typeof s == "string")
}

const toUpper = (x: any) => {
  if (isString(x))
    return x.toUpperCase()
  else return x
}

const sortObjectList = (list: any, newProp: any, ascending: boolean) => { 
  if (ascending)
    return (list.concat([]).sort((a: any, b: any) => (toUpper(a[newProp]) > b[newProp]) ? 1 : -1))
  else
    return (list.concat([]).sort((a: any, b: any) => (toUpper(a[newProp]) < b[newProp]) ? 1 : -1))
}

export default CurrencyTable;
