import React from 'react'
import axios from 'axios'

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";

class FieldList extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             posts: [],
             errorMsg: "",
             count: 0
        }
    }

    componentDidMount(){
        axios.get('https://dms.pgn-solution.co.id/api/v1/fields')
        .then(response => {
            console.log(response)
            this.setState({posts: response.data})
        })
        .catch(error => {
            console.log(error)
            this.setState({errorMsg: "Error retreiving data"})
        })
    }
    
    render() {
        const { posts, errorMsg } = this.state
        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">API DMS Get</CardTitle>
                            </CardHeader>
                            <CardBody>
                            <Table responsive>
                                <thead className="text-primary">
                                <tr>
                                    <th>No</th>
                                    <th>Body</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    posts.map(post =>
                                        <tr>
                                            <td>{this.state.count += 1}</td>
                                            <td key={post.id}>{post.description_field}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                            {errorMsg ? <div>{errorMsg}</div> : null}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default FieldList
