import React, {useState, useRef, useCallback} from "react";
import SearchServices from "./SearchServices";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";

export default function InfiniteScroll(){
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

    return(
        <>
        <div className="content">
                <input type="text" value={query} onChange={handleSearch}></input>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">API RFC Get</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                    <tr>
                                        <th>Nama</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {books.map((book, index) => {
                                            if (books.length === index + 1){
                                                return <tr><td ref={lastBookElementRef} key={book}>{book}</td></tr>
                                            } else {
                                                return <tr><td key={book}>{book}</td></tr>
                                            }
                                            
                                        })}
                                        <div>{loading && 'Loading...'}</div>
                                        <div>{error && 'Error'}</div>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}