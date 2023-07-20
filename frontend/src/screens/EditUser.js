import React, { useEffect, useState } from "react";
import MainScreen from "../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import { updateAdminAction } from "../actions/adminActions";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const dispatch = useDispatch();
  const { id } = useParams();

  const navigate = useNavigate();

  console.log(id);

  const adminUpdate = useSelector((state) => state.adminUpdate);
  const { loading, error } = adminUpdate;

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/admin/${id}`);
      console.log(data);

      setName(data.name);
      setEmail(data.email);
    };

    fetching();
  }, [id]);

  const updateHandler = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    dispatch(updateAdminAction(id, name, email));

    navigate("/adminhome");
  };

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>email</Form.Label>
              <Form.Control
                placeholder="Enter the content"
                rows={4}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </MainScreen>
  );
}

export default EditUser;
