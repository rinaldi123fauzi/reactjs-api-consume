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

  const api = axios.create({
    baseURL: `http://192.168.60.56/api/v1/units`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Api-Key': 'Pg4550Lut1oN!'
   }
})

class UnitForm extends React.Component {
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
             unit_name: ''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    //versi 1
    // postUnit = async () =>{
    //   let data = await api.post('/', this.state)
    //   .then(response => {
    //       console.log(response)
    //       return this.notify('tl')
    //   })
    //   .catch(error => {
    //       console.log(error)
    //   })
    // }

    //versi 2
    postUnit = async () =>{
      await api.post('/', this.state)
      console.log(this.state)
      return this.notify('tl')
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        this.postUnit()
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
                    <CardTitle tag="h5">API DHS Post</CardTitle>
                    </CardHeader>
                    <CardBody>
                    <Form onSubmit={this.submitHandler}>
                        <Row>
                        <Col className="pl-1" md="6">
                            <FormGroup>
                            <label>Nama Unit</label>
                            <Input
                                defaultValue="Faker"
                                placeholder="Nama Unit"
                                type="text"
                                name="unit_name"
                                value={title}
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

export default UnitForm
