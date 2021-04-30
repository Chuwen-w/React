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
        { headerName: 'Name', field: 'name', sortable: true, filter: 'agTextColumnFilter' },
        { headerName: 'Price', field: 'price', sortable: true, filter: 'agTextColumnFilter' },
        { headerName: 'ChangesPercentage', field: 'changesPercentage', sortable: true, filter: 'agTextColumnFilter' },
        { headerName: 'DayLow', field: 'dayLow', sortable: true, filter: 'agTextColumnFilter' },
        { headerName: 'DayHigh', field: 'dayHigh', sortable: true, filter: 'agTextColumnFilter' },
    ]

    useEffect(() => {
        setLoading(true)
        fetch('https://financialmodelingprep.com/api/v3/quote/%5EGSPC,%5EDJI,%5EIXIC?apikey=c24aa10fc85c410a37a66e3624a75557')
            .then(res => res.json())
            .then(data =>
                data.map(stock => {
                    return {
                        symbol: stock.symbol,
                        name: stock.name,
                        price: stock.price,
                        changesPercentage: stock.changesPercentage,
                        daylow: stock.daylow,
                        dayhigh: stock.dayhigh
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

function Quote() {
    return (
        <>
            <Table />
        </>
    )
}

export default Quote;