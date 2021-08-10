import React, { useState, } from 'react';
import './LoginPage.css'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import userService from '../../utils/userService';
import { useHistory, Link } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
} from "semantic-ui-react";


export default function LoginPage(props){

  const [error, setError] = useState("");
  const [state, setState] = useState({
    email: "",
    password: ""
  })

  const history = useHistory();

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e){
    e.preventDefault();
    try {
      await userService.login(state);
      props.handleSignUpOrLogin();
      history.push("/")
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="login-signup">
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Segment raised>
              <Header as="h2" color="blue" textAlign="center" inverted>
                <Icon name="plane" /> Log in to your account
              </Header>
            </Segment>
            <Segment stacked>
              <Form.Input
                type="email"
                name="email"
                placeholder="email"
                value={state.email}
                onChange={handleChange}
                required
              />
              <Form.Input
                name="password"
                type="password"
                placeholder="password"
                value={state.password}
                onChange={handleChange}
                required
              />
              <Button
                color="blue"
                fluid
                size="large"
                type="submit"
                className="btn"
                inverted
              >
                Log In
              </Button>
            </Segment>
          </Form>
          <Message>
            <p>New to us? <Link to="/signup">Sign Up</Link></p>
          </Message>
          {error ? <Segment className="errorMsg" color="red" style={{backgroundColor: '#FFF1F1'}}><ErrorMessage error={error} /></Segment> : null}
        </Grid.Column>
      </Grid>
    </div>    
  );
}

