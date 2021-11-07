import {useEffect, useState} from "react";
import axios from "axios";

export default function SearchServices(query, pageNumber){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [books, setBooks] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setBooks([])
    }, [query])

    useEffect(() =>{
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: `http://localhost:1234/api/v1/api_tests`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE2MzYyOTQ1OTl9.Q7CS6xupDpDvo_A0NaSjMvddELwhFlAb11_Pap1HRL4'
            },
            params:{q: query, page: pageNumber},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setBooks(prevBooks => {
                return [...new Set([...prevBooks, ...res.data.body])]
            })
            setHasMore(res.data.body.length > 0)
            setLoading(false)
            console.log(res.data)
        }).catch(e => {
            if (axios.isCancel(e)) return 
            setError(true)
        })
        return () => cancel()
    },[query, pageNumber])

    return {loading, error, books, hasMore}
}