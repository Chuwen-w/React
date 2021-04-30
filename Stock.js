import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-grid.css'
import StockData from '/Users/chewie/reactPrac/finalstockweb/src/assets/StockData.json'




// async function getStockRowData(){
//     const url ='https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=Technology&exchange=NASDAQ&dividendMoreThan=0&limit=100&apikey=c24aa10fc85c410a37a66e3624a75557'
//     let res =await fetch(url);
//     let data= await res.json();
//     let stock=data.stock;
//     return data.map((stock)=>({
//         symbol: stock.symbol,
//         name: stock.companyName,
//         industry: stock.sector
//     }))
// }


// function Table() {
//     const [loading,setLoading]=useState(true);
//     const [stockRowData, setStockRowData] = useState([]);
//     const [error,setError] = useState(null);

//     const colums = [
//         { headerName: 'Symbol', field: 'symbol', sortable: true, filter: 'agTextColumnFilter' },
//         { headerName: 'Name', field: 'name', sortable: true, filter: 'agTextColumnFilter' },
//         { headerName: 'Industry', field: 'industry', sortable: true, filter: 'agTextColumnFilter' }
//     ]

//     useEffect(()=>{
//         (async()=>{
//             try{
//                 setStockRowData(await getStockRowData());
//                 setLoading(false);
//             }catch(err){
//                 setError(error);
//                 setLoading(false);
//             }
//         })();
//     },[]);

//     return{
//         loading,
//         stockRowData,
//         error,
//     }
// }





function SearchStock(){
    const [searchTerm,setSearchTerm]=useState('')
    return(
    <div style={{padding:'5px', border:'5px'}}>
           <input type='text' placeholder='Search stock...' onChange={(event) => {setSearchTerm(event.target.value)}}
           />  
           {StockData.filter((val)=>{
               if(searchTerm == ''){
                   return val
               } else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                   return val
               }
           })}
    </div>)
}

function SearchIndustry(){
    const [searchTerm,setSearchTerm]=useState('')
    return(
    <div style={{padding:'5px', border:'5px'}}>
           <input type='text' placeholder='Search industry...' onChange={event => {setSearchTerm(event.target.value)}}
           />  
    </div>)
}





function Table() {
    const [rowData, setRowData] = useState([])
    const [loading, setLoading] =useState(false)
    const [error,setError] = useState()

    const colums = [
        { headerName: 'Symbol', field: 'symbol', sortable: true, filter: 'agTextColumnFilter' },
        { headerName: 'Name', field: 'name', sortable: true, filter: 'agTextColumnFilter' },
        { headerName: 'Industry', field: 'industry', sortable: true, filter: 'agTextColumnFilter' }
    ]

    useEffect(() => {
        setLoading(true)
        fetch('https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=c24aa10fc85c410a37a66e3624a75557')
            .then(res => res.json())
            .then(data =>
                data.map(stock => {
                    return {
                        symbol: stock.symbol,
                        name: stock.name,
                        industry: stock.sector
                    }
                }))
                .then(stocks => setRowData(stocks))
            .catch((err)=>{
                setError(err);
            })    
            .finally(()=>{
                setLoading(false)
            })
    },[])
    if (loading){
        return<p>Loading...</p>
    }
    if(error||!Array.isArray(rowData)){
        return<p style={{}}>There was an error loading the data</p>
    }
    return(
        <div className ='ag-theme-balham'
        style={{
            height:'300px',
            width:'620px',
            padding: "10px"
        }}>
         <AgGridReact columnDefs={colums} rowData={rowData} pagination={true} paginationPageSize={11}/>
        </div>
    )

}

function Stock(){
    return(
        <>
        <SearchStock/>
        <SearchIndustry/>
        <Table/>
        </>
    )
}

export default Stock;