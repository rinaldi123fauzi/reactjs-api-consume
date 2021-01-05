import React from 'react'
import axios from 'axios'
import NotificationAlert from "react-notification-alert";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
  } from "reactstrap";

class PostForm extends React.Component {
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
               Data Tersimpan
              </div>
            </div>
          ),
          type: type,
          icon: "nc-icon nc-bell-55",
          autoDismiss: 7,
        };
        this.notificationAlert.current.notificationAlert(options);
      }

    // ---------------------------------------------
    constructor(props) {
        super(props)
    
        this.state = {
             userId: '',
             title: '',
             body: ''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)

        axios.post('https://jsonplaceholder.typicode.com/posts', this.state)
        .then(response => {
            console.log(response)
            return this.notify('tl')
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    render() {
        const {userId, title, body} = this.state
        return (
            <div className="content">
                <NotificationAlert ref={this.notificationAlert} />
                <Row>
                    <Col md="8">
                    <Card className="card-user">
                    <CardHeader>
                    <CardTitle tag="h5">Post Form</CardTitle>
                    </CardHeader>
                    <CardBody>
                    <Form onSubmit={this.submitHandler}>
                        <Row>
                        <Col className="pr-1" md="6">
                            <FormGroup>
                            <label>Id</label>
                            <Input
                                defaultValue="Chet"
                                placeholder="Company"
                                type="text"
                                name="userId"
                                value={userId}
                                onChange={this.changeHandler}
                            />
                            </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                            <FormGroup>
                            <label>Title</label>
                            <Input
                                defaultValue="Faker"
                                placeholder="Last Name"
                                type="text"
                                name="title"
                                value={title}
                                onChange={this.changeHandler}
                            />
                            </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <Col md="12">
                            <FormGroup>
                            <label>Body</label>
                            <Input
                                type="textarea"
                                defaultValue="Oh so, your weak rhyme You doubt I'll bother, reading into it"
                                name="body"
                                value={body}
                                onChange={this.changeHandler}
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
}

export default PostForm
