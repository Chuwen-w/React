import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-grid.css'






//  function getStockRowData(){
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






// function SearchStock(){
//     const [searchTerm,setSearchTerm]=useState('')
//     return(
//     <div style={{padding:'5px', border:'5px'}}>
//            <input type='text' placeholder='Search stock...' onChange={(event) => {setSearchTerm(event.target.value)}}
//            />  
//            {StockData.filter((val)=>{
//                if(searchTerm == ''){
//                    return val
//                } else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
//                    return val
//                }
//            })}
//     </div>)
// }





function Table() {
    const [rowData, setRowData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [search, setSearch] = useState({ name: '', industry: '' });
    const [dataSource, setDataSource] = useState(rowData);

    const colums = [
        { headerName: 'Symbol', field: 'symbol', key: 'symbol', sortable: true, filter: 'agTextColumnFilter' },
        { headerName: 'Name', field: 'name', key: 'name', sortable: true, filter: 'agTextColumnFilter' },
        { headerName: 'Industry', field: 'industry', key: 'industry', sortable: true, filter: 'agTextColumnFilter' }
    ]

    const searchChange = (ev, key) => {
        const newValue = ev.target && ev.target.value;
        search[key] = newValue;
        setSearch(Object.assign({}, search));
    }


    const fetchData = (search) => {
        let result = rowData;
        if (search.name!== '') {
            result = result.filter((item) => {
                return item.name.indexOf(search.name) > -1;
            });
        }
        if (search.address!== '') {
            result = result.filter((item) => {
                return item.industry.indexOf(search.industry) > -1;
            });
        }
        return result;
    }

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
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false)

            })
            
            
  const newData = fetchData(search);
        setDataSource(newData);
    }, [search])


    return (
        <div className='stockTable'>
            <div className='inline' style={{ padding: '10px' }}>
                <label>Stock:
                     <input value={search.name} onChange={(ev)=> searchChange(ev, 'name')}/>
                </label>
                <label>Industry:
                     <input value={search.industry} onChange={(ev)=> searchChange(ev, 'industry')}/>
                </label>
            </div>
            <div className='ag-theme-balham'
                style={{
                    height: '300px',
                    width: '620px',
                    padding: "10px"
                }}>
                <AgGridReact columnDefs={colums} rowData={dataSource} pagination={true} paginationPageSize={11} />
            </div>
        </div>
    )

}


function Stock() {
    return (
        <>
            <Table />
        </>
    )
}

export default Stock;