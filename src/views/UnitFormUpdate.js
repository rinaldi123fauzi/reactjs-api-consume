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


 
export default function UnitFormUpdate(props) {
    const api = axios.create({
        baseURL: `http://192.168.60.56/api/v1/units`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Api-Key': 'Pg4550Lut1oN!'
       }
    
     })

    const [data, setData] = useState({
        unit_name: ""
    })

    // ---------------------------------------------
    useEffect(
        ()=>{
            const id = props.match.params.id
            api.get('/'+id)
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },[]
    )
    let history = useHistory();

    async function submit(e){
        e.preventDefault()
        const id = props.match.params.id
        await api.put('/'+id,data)
        .then(response => {
            console.log(response.data)
            history.push('../unit-list')
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
                    <CardTitle tag="h5">API DHS Update</CardTitle>
                    </CardHeader>
                    <CardBody>
                    <Form onSubmit={(e) => submit(e)}>
                        <Row>
                        <Col className="pl-1" md="6">
                            <FormGroup>
                            <label>Nama Unit</label>
                            <Input
                                type="text"
                                name="unit_name"
                                onChange={(e) => handle(e)}
                                value={data.unit_name}
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
