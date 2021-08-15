import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
  } from "reactstrap";


 
export default function RfcFormUpdate(props) {
    const api = axios.create({
        baseURL: `https://rfc.pgn-solution.co.id/api/v1/api_tests`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE2MjkwMzY5Nzl9.XmOFL10chq2casbkMvWqjnoKDgAFPuIYQz1wXrZRuXY'
       }
    
     })

    const [data, setData] = useState({
        nama: "",
        alamat: ""
    })

    // ---------------------------------------------
    useEffect(
        ()=>{
            const id = props.match.params.id
            api.get('/'+id)
            .then(response => {
                console.log(response.data)
                setData(response.data.body)
            })
            .catch(error => {
                console.log(error)
            })
        },[]
    )
    let history = useHistory();

    function submit(e){
        e.preventDefault()
        const id = props.match.params.id
        api.put('/'+id,data)
        .then(response => {
            console.log(response.data)
            history.push('../rfc-list')
        })
        .catch(error => {
            console.log(error)
        })
    }

    function handle(e){
        const newdata = {...data}
        newdata[e.target.name] = e.target.value
        setData(newdata)
    }

        return (
            <div className="content">
                <Row>
                    <Col md="8">
                    <Card className="card-user">
                    <CardHeader>
                    <CardTitle tag="h5">API RFC Update</CardTitle>
                    </CardHeader>
                    <CardBody>
                    <Form onSubmit={(e) => submit(e)}>
                        <Row>
                        <Col className="pl-1" md="6">
                            <FormGroup>
                            <label>Nama</label>
                            <Input
                                type="text"
                                name="nama"
                                onChange={(e) => handle(e)}
                                value={data.nama}
                            />
                            </FormGroup>
                            <FormGroup>
                            <label>Alamat</label>
                            <Input
                                type="text"
                                name="alamat"
                                onChange={(e) => handle(e)}
                                value={data.alamat}
                            />
                            </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <div className="update ml-auto mr-auto">
                            <Button
                            className="btn-round"
                            color="primary"
                            type="submit"
                            >
                            Submit
                            </Button>
                        </div>
                        </Row>
                    </Form>
                    </CardBody>
                </Card>
                </Col>
                </Row>
            </div>
        )
}
