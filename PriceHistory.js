import styled from 'styled-components'
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-grid.css'
import { AgGridReact } from 'ag-grid-react';
import React, { useState, useEffect } from 'react';



function Table() {
    const [rowData, setRowData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const colums = [
        { headerName: 'Symbol', field: 'symbol', sortable: true, filter: 'agTextColumnFilter' },
        { headerName: 'Date', field: 'date', sortable: true},
        { headerName: 'Open', field: 'price', sortable: true},
        { headerName: 'High', field: 'high', sortable: true},
        { headerName: 'Low', field: 'low', sortable: true},
        { headerName: 'Close', field: 'close', sortable: true },
        { headerName: 'Volume', field: 'volume', sortable: true},
    ]

    useEffect(() => {
        setLoading(true)
        fetch('https://financialmodelingprep.com/api/v3/historical-price-full/index/^DJI?apikey=c24aa10fc85c410a37a66e3624a75557')
            .then(res => res.json())
            .then(data =>
                data.map(stock => {
                    return {
                        symbol: stock.symbol,
                        date: stock.date,
                        price:stock.price,
                        high: stock.high,
                        low: stock.low,
                        close: stock.close,
                        volume: stock.volume
                    }
                }))
            .then(stocks => setRowData(stocks))
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])
    if (loading) {
        return <p>Loading...</p>
    }
    if (error || !Array.isArray(rowData)) {
        return <p style={{}}>There was an error loading the data</p>
    }
    return (
        <div className='ag-theme-balham'
            style={{
                height: '300px',
                width: '1200px',
                padding: "10px"
            }}>
            <AgGridReact columnDefs={colums} rowData={rowData} pagination={true} paginationPageSize={11} />
        </div>
    )

}

function PriceHistory(){
    return(
        <Table/>
    )
}

export default PriceHistory;