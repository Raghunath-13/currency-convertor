import React from 'react'
import { IoStar } from "react-icons/io5";

const CurrencyDropdown = ({ currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorites,
  title=""}) => {
    
    

  return (
    <div>
        <label htmlFor={title} className="block text-sm font-medium text-gray-700">{title}</label>

        <div><select value={currency} onChange={(e)=>setCurrency(e.target.value)} className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'>
            {currencies.map((currency)=>{
                return ( <option value={currency} key={currency}>
                    {currency}
                </option>)
            })}
            </select>
            <button onClick={handleFavorites(currency)} className='  absolute right-150 inset-y-10 pr-15 flex items-center text-sm leading-5'><IoStar /></button>
            
            </div>
    </div>
  )
}

export default CurrencyDropdown;