import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { createadminAction } from "../../actions/adminActions";
import { useNavigate } from "react-router-dom";

function CreateUser({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminCreate = useSelector((state) => state.adminCreate);
  const { loading, error, note } = adminCreate;

  console.log(note);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    dispatch(createadminAction(name, email, password));

    navigate("/adminhome");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Add User">
      <Card>
        <Card.Header>Add a User</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="title"
                value={name}
                placeholder="Enter the name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>email</Form.Label>
              <Form.Control
                value={email}
                placeholder="Enter the email"
                rows={4}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {/* {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )} */}

            <Form.Group controlId="content">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="content"
                value={password}
                placeholder="Enter the paswword"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              ADD
            </Button>
            {/* <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button> */}
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateUser;
