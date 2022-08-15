import './App.css';
//import './bootstrap.css';
import bootstrap from 'bootstrap'
import React, {useState, useEffect} from 'react';

function PriceItem(props){

  const shippingProps = JSON.parse(props.shipping);
  
  const [country, setCountry] = useState("Canada");
  const [shippingPrices, setPrices] = useState(shippingProps);
  let [shippingPrice, setPrice] = useState(shippingPrices[0].price);

  // Change the price of shipping when you change the country
  const changeShippingPrice = (event) => {
    let price = parseInt(event.target.value)
    setPrice(price);
  };
   
  return(
    <tr key={props.ID}>
      <td>{props.model}</td>
      <td>{props.brand}</td>
      <td>{props.breast}</td>
      <td>{props.material}</td>
      <td>{props.type}</td>
      <td>{props.gender}</td>
      <td>{props.price + "$"}</td>
      <td>
        <div key={props.ID} className="input-group">
        <select defaultValue={shippingPrices[0].country} onChange={changeShippingPrice} className="form-select text-center" aria-label="Shipping selector">       
            {shippingPrices.map((val) => {
            return(
                <option value={val.price}>{val.country}</option>
            );
            })}
        </select>
        <input type="text" value={shippingPrice} disabled className="form-control text-center">
        </input>
        </div>
      </td>
      <td>{props.price + shippingPrice}</td>
    </tr>
  );

}



export default PriceItem;