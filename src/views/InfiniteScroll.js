import React, {useState, useRef, useCallback} from "react";
import SearchServices from "./SearchServices";

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
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <input type="text" value={query} onChange={handleSearch}></input>
        {books.map((book, index) => {
            if (books.length === index + 1){
                return <div ref={lastBookElementRef} key={book}>{book}</div>
            } else {
                return <div key={book}>{book}</div>
            }
             
        })}
        <div>{loading && 'Loading...'}</div>
        <div>{error && 'Error'}</div>
        </>
    )
}