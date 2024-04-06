
import React from 'react'
import { useState,useEffect } from 'react'
import CurrencyDropdown from './dropdown'
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConvertor = () => {
  const [currencies, setcurrencies] = useState([])
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setfromCurrency] = useState("USD")
  const [toCurrency, settoCurrency] = useState("INR")
  const [convertedAmount, setconvertedAmount] = useState(null)
  const [converting, setconverting] = useState(false)
    // Currencies-> https://api.frankfurter.app/currencies

    const fetchCurrencies =async()=>{ 
      try{
        const res= await fetch(" https://api.frankfurter.app/currencies")
        const data= await res.json()

        setcurrencies(Object.keys(data))
      }catch (error){
        console.log("Error fetching",error)
      }
      }

      useEffect(() => {
        fetchCurrencies()  
      }, [])
      console.log(currencies)

      const convertcurrency = async()=>{
        if(!amount) return;
        setconverting(true)

        try{
          const res= await fetch(` https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
          const data= await res.json()
          setconvertedAmount(data.rates[toCurrency]+""+toCurrency)
  
          
        }catch (error){
          console.log("Error fetching",error)
        }finally{setconverting(false)}
      }

      const handleFavorites=(currency)=>{

      }

      const swapcurrency=()=>{
       setfromCurrency(toCurrency)
       settoCurrency(fromCurrency)
      }
      
    // Currencies-> https://api.frankfurter.app/latest?amount=1&from=USD&to=INR

  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
        <h2 className='mb-5 text-2xl font-semibold text-green-700'>Currency Convertor</h2>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
          <CurrencyDropdown currencies={currencies} title="From:" currency={fromCurrency} setCurrency={setfromCurrency} handleFavorites={handleFavorites}/>
         <div className='flex justify-center -mb-5 sm:mb-0'>
          <button onClick={swapcurrency} className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
          <HiArrowsRightLeft className='text-xl text-gray-700' />
          </button>
         </div>
          <CurrencyDropdown currencies={currencies} title="to: " currency={toCurrency} setCurrency={settoCurrency} handleFavorites={handleFavorites}/>


        </div>

        <div className='mt-4'>
            <lable htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount:</lable>
            <input value={amount} onChange={(e)=> setAmount(e.target.value)} type='number' className='w-full p-2 border-grey-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
        </div>
        <div className='felx justify-end mt-6'>

        <button onClick={convertcurrency}className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${converting?"animate-pulse":""}`}>Convert</button>
        </div>

        {convertedAmount && <div className='mt-4 text-lg font-medium text-medium text-right text-green-400'> Converted Amount :{convertedAmount}</div>}
    </div>
  )
}

export default CurrencyConvertor