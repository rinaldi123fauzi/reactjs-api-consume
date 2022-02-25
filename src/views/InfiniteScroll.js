import React, {useState, useRef, useCallback} from "react";
import SearchServices from "services/SearchServices";
import axios from "axios";
import { useHistory } from "react-router-dom";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Input,
    Col,
  } from "reactstrap";

const api = axios.create({
    baseURL: `http://localhost:1234/api/v1/api_tests`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE2Mzc1MTAxNzl9.atIXT4Z2BNC0NBzk-GygiDcgYNlANQWlXydu83wMrwY'
   }
})

export default function InfiniteScroll(){
    let history = useHistory();
    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
  
    const {books, hasMore, loading, error} = SearchServices(query, pageNumber)

    const observer = useRef()
    const lastBookElementRef = useCallback(node => {
        if (loading) return 
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore){
                setPageNumber(prevPageNumber => prevPageNumber + 1)
                console.log('visible')
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    function handleSearch(e) { 
        setQuery(e.target.value)
        setPageNumber(1)
    }
  
    function deleteService(id){
        let data = api.delete(`/${id}`)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        window.location.reload()
    }

    function updateUnit(id){
        console.log(id)
        history.push("rfc-form-update/"+id)
    }

    return(
        <>
        <div className="content">
                <Input
                    placeholder="Search Data"
                    type="text"
                    value={query}
                    onChange={handleSearch}
                />
                <br/>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">API Lazy Load Data</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                    <tr>
                                        <th>Nama</th>
                                        <th>Alamat</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {books.map((book, index) => {
                                            if (books.length === index + 1){
                                                return  <tr key={index}>
                                                            <td key={index + 1} ref={lastBookElementRef}>{book.nama}</td>
                                                            <td key={index + 2} ref={lastBookElementRef}>{book.alamat}</td>
                                                            <td key={index + 3} ref={lastBookElementRef}>
                                                                <button onClick={() => updateUnit(book.id)}>Update</button>
                                                                <button onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) deleteService(book.id)}}>Delete</button>
                                                            </td>
                                                        </tr>
                                            } else {
                                                return  <tr key={index}>
                                                            <td key={index + 1}>{book.nama}</td>
                                                            <td key={index + 2}>{book.alamat}</td>
                                                            <td key={index + 3}>
                                                                <button onClick={() => updateUnit(book.id)}>Update</button>
                                                                <button onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) deleteService(book.id)}}>Delete</button>
                                                            </td>
                                                        </tr>
                                            }
                                            
                                        })}
                                    </tbody>
                                </Table>
                                <div key={Math.random()}>{loading && 'Loading...'}</div>
                                <div key={Math.random()}>{error && 'Error'}</div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}