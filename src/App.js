import './App.css';
import './bootstrap.css';
import PriceItem from './PriceItem';
import bootstrap from 'bootstrap'
import React, {useState, useEffect, useRef} from 'react';
import Axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearch] = useState("");

  //UseEffect Gets all the prices once you open the site
  useEffect(() => {
    Axios.get("http://localhost:3001/api/getall").then((response) => {
      setResults(response.data)
    })
  },[]);

  //Refresh button function
  const refresh = () =>{
    setResults([]);
    console.log("Getting info...")
    Axios.get("http://localhost:3001/api/getall")
    .then(function(response){
      setResults(response.data)
      console.log("Done!")
    });
  };

  //Search button function
  const search = (e) =>{
    e.preventDefault();
    //setResults([]);
    console.log("Searching for "+searchTerm);
    Axios.post("http://localhost:3001/api/search/"+searchTerm,{searchTerm:searchTerm})
    .then(function(response){
      setResults(response.data)
      console.log("Search Done!")
      console.log(response)
    });
  };

  //Change brand button function
  const changeBrand = (event) => {
    let price = event.target.value
   
  };

  return (
    <div className="App">
     <div className="container mt-3">
      <h1>Price List</h1>
      <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
           {/* Search Bar */} 
          <form className="d-flex" onSubmit={search}>
            <input className="form-control" onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search"></input>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav>
       {/* Refresh Button */} 
      <button onClick={refresh} className='btn btn-primary'>Refresh</button>  
      </div>
      {/* Price Table */} 
      <table className="table">
        <thead>
          <tr>
            <th>Model</th>
            <th>
              <select defaultValue="All Brands" onChange={changeBrand} className="text-center filter-selector" aria-label="Shipping selector">
                <option value="All Brands">All Brands</option>   
                <option value="WM">WM</option>
              </select>
            </th>
            <th>Breast</th>
            <th>Material</th>
            <th>Type</th>
            <th>Gender</th>
            <th>Price</th>
            <th>Shipping</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
        {/* The prices are rendered here, check PriceItem.js to edit how it will look like */}
          {results.map((val) => {
            return(
             <PriceItem
              key={val.id}
              model={val.model} 
              brand={val.brand} 
              breast={val.breast}
              material={val.material}
              type={val.type}
              gender={val.gender}
              price={val.price}
              shipping={val.shipping}
              />
            );
          }
          )}
        </tbody>
      </table>
     </div>
    </div>
  );
}




export default App;
