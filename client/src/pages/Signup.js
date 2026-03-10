import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import "../components/css/Login.css";
import floodLogo from '../components/logo/f3.png';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="contentL">
      <Container>
        <Row>
          <Col>   
            <div className="card-login">
              <div className="card-login-1">

              <p class="card-titleLogin">Sign Up Here</p>
              {error && <Alert variant="danger">{error}</Alert>}

              <img src={floodLogo} alt="Flood" className='photo-log'/>
              <br/><br/>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="primary" type="Submit">
                      Sign up
                    </Button>
                  </div>
                </Form>
     
                <div className="p-4 box mt-3 text-center">
                <p class="card-signup">Already have an account? <Link to="/">Log In</Link></p>
                </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
  );
};

export default Signup;