/*
Main program logic (API fetching, processing and displaying) lives here.
API key is entered in an input form.

*/


import React, { useState, useEffect } from 'react';
import './CurrencyTable.css';
import CurrencyEntry from './CurrencyEntry';
import CurrencyHeading from './CurrencyHeading';
import axios from 'axios';

function CurrencyTable() {
  const [entryList, setList]          = useState([])
  const [lastUpdate, setLastUpdate]   = useState(0)
  const [pagePos, setPagePos]         = useState(0)
  const [query, setQuery]             = useState("")
  const [sortAscending, setAscending] = useState(true)
  const [sortKey, setSortKey]         = useState("rank")
  const [API_KEY, SET_API_KEY]        = useState("")

  const totalElems  = entryList.length
  const pageElems   = 50
  const headings = ["rank", "name", "symbol", "circ", "total", "price", "cap", "change", "history"]

  // Update data every INTERVAL milliseconds
  // https://stackoverflow.com/questions/39426083/update-react-component-every-second
  const INTERVAL = 10000
  useEffect(() => {
    if (API_KEY != "") {
      const interval = setInterval(() => handleUpdate(), INTERVAL);
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  // Return latest results as list of objects
  const fetchData = async() => {
    const URL: string       = "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
    const CURRENCY: string  = "EUR"
    const AMOUNT: number    = 5000
    var result: any         = {data: []}
    console.log("API_KEY")
    console.log(API_KEY)
  
    const headers = {
      "Accept": "application/json"
    }
    const params = {
      "start": 1,
      "limit": AMOUNT,
      "convert": CURRENCY,
      "CMC_PRO_API_KEY": API_KEY
    }
    // CORS Proxy
    // https://github.com/Rob--W/cors-anywhere
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
  // Handlers 
  const handleUpdate = () => {
    if(Date.now() - lastUpdate >= 5000) {
      fetchData().then(f => setList(sortObjectList(f, sortKey, sortAscending)))
      setLastUpdate(Date.now())
      console.log("Update handled")
    }
    else
      console.log("Update limit")
  }
  const handleNextPage = () => {
    if(pagePos + pageElems < totalElems)
      setPagePos(pagePos+pageElems)
  }
  const handlePrevPage = () => {
    if(pagePos - pageElems >= 0)
      setPagePos(pagePos-pageElems)
  }
  const handleSearch = (e: any) => {
    setPagePos(0)
    setQuery(e.target.value)
  }
  const handleKeyBox = (e: any) => {
    SET_API_KEY(e.target.value)
  }
  const submitKey = (e: any) => {
    e.preventDefault()
    const val = e.target.keyBox.value
    if(val.length != 36) {
      window.alert("Enter a valid API key.")
      return
    }
    SET_API_KEY(e.target.keyBox.value)
    fetchData().then(f => setList(sortObjectList(f, sortKey, sortAscending)))
    e.target.classList.add("submitted")
  }
  const handleSort = (e: any) => {
    const newProp = e.target.id
    console.log("newProp " + newProp)
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
            <input name="submit" type="submit"/>
          </form>
          <input id="searchBox" onChange={handleSearch} placeholder="Search"></input>
          <div className="pageButton" onClick={handlePrevPage}>Previous page</div>
          <div className="pageButton" onClick={handleNextPage}>Next page</div>
          <div id="results">Results: {pagePos + 1} - {totalElems}</div>
        </div>
      </div>
      <div className="headings"> 
        { headings.map(
              (id: string) => 
              (<CurrencyHeading 
              id      = {id} 
              handler = {handleSort} 
              text    = {id} 
              />))
        } 
      </div>    
      <div className="entries">
      { entryList.filter( 
          // Search filter
           (entry: any) => matchSearch(entry.name, query))
          // Entry creation
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
          .slice(pagePos, pagePos+pageElems) 
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
  if(isString(x))
    return x.toUpperCase()
  else return x
}

const sortObjectList = (list: any, newProp: any, ascending: boolean) => { 
  console.log("newProp")
  console.log(newProp)
  if (ascending)
    return (list.concat([]).sort((a: any, b: any) => (toUpper(a[newProp]) > b[newProp]) ? 1 : -1))
  else
    return (list.concat([]).sort((a: any, b: any) => (toUpper(a[newProp]) < b[newProp]) ? 1 : -1))
}

export default CurrencyTable;
