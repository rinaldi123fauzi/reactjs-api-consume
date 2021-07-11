import React from 'react'
import axios from 'axios'
import NotificationAlert from "react-notification-alert";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";

  const api = axios.create({
      baseURL: `https://rfc.pgn-solution.co.id/api/v1/api_tests`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Key': 'Pg4550Lut1oN!'
     }
  })

class RfcList extends React.Component {
    state = {
        visible: true,
      };
      notificationAlert = React.createRef();
      notify(place) {
        var color = 2;
        var type;
        switch (color) {
          case 1:
            type = "primary";
            break;
          case 2:
            type = "success";
            break;
          case 3:
            type = "danger";
            break;
          case 4:
            type = "warning";
            break;
          case 5:
            type = "info";
            break;
          default:
            break;
        }
        var options = {};
        options = {
          place: place,
          message: (
            <div>
              <div>
               Data Terhapus
              </div>
            </div>
          ),
          type: type,
          icon: "nc-icon nc-bell-55",
          autoDismiss: 7,
        };
        this.notificationAlert.current.notificationAlert(options);
      }

    constructor(props) {
        super(props)
    
        this.state = {
             posts: [],
             errorMsg: "",
             count:0
        }
    }

    getUnit = async () => {
      let data = await api.get('/')
      .then(response => {
          console.log(response.data)
          this.setState({posts: response.data, count:0})
      })
      .catch(error => {
          console.log(error)
      })
    }

    deleteUnit = async (id) =>{
        let data = await api.delete(`/${id}`)
        .then(response => {
            return this.notify('tl')
        })
        .catch(error => {
            console.log(error)
        })
        this.getUnit()
    }

    updateUnit = (id) =>{
      console.log(id)
      this.props.history.push("rfc-form-update/"+id)
    }

    componentDidMount(){
        this.getUnit()
        setInterval(this.getUnit, 3000); // runs every 1 seconds.
    }
    
    render() {
        const { posts, errorMsg } = this.state
        return (
            <div className="content">
                <NotificationAlert ref={this.notificationAlert} />
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
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Alamat</th>
                                    <th>Updated at</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    posts.map((post, index) =>
                                        <tr key={index + Math.random()}>
                                            <td key={index + Math.random()}>{this.state.count += 1}</td>
                                            <td key={index + Math.random()}>{post.nama}</td>
                                            <td key={index + Math.random()}>{post.alamat}</td>
                                            <td key={index + Math.random()}>{post.updated_at}</td>
                                            <td key={index + Math.random()}>
                                                <button onClick={() => this.updateUnit(post.id)}>Update</button>
                                                <button onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) this.deleteUnit(post.id)}}>Delete</button>
                                            </td>
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

export default RfcList
