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
      baseURL: `https://jsonplaceholder.typicode.com/posts`
  })

class PostList extends React.Component {
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

    getPost = async () => {
        let data = await api.get('/')
        .then(({data}) => data)
        this.setState({posts: data, count:0})
    }

    deletePost = async (id) =>{
        let data = await api.delete(`/${id}`)
        .then(response => {
            return this.notify('tl')
        })
        .catch(error => {
            console.log(error)
        })
        this.getPost()
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
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
                <NotificationAlert ref={this.notificationAlert} />
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Simple API Get</CardTitle>
                            </CardHeader>
                            <CardBody>
                            <Table responsive>
                                <thead className="text-primary">
                                <tr>
                                    <th>No</th>
                                    <th>Title</th>
                                    <th>Body</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    posts.map((post, index) =>
                                        <tr key={index + Math.random()}>
                                            <td key={index + Math.random()}>{this.state.count += 1}</td>
                                            <td key={index + Math.random()}>{post.title}</td>
                                            <td key={index + Math.random()}>{post.body}</td>
                                            <td key={index + Math.random()}>
                                                <button onClick={() => this.deletePost(post.id)}>Delete</button>
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

export default PostList
