import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { deleteNoteAction, listUser } from "../../actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function AdminScreen({ search }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminList = useSelector((state) => state.adminList);
  const { loading, error, user } = adminList;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const adminCreate = useSelector((state) => state.adminCreate);
  const { success: successCreate } = adminCreate;

  const adminUpdate = useSelector((state) => state.adminUpdate);
  const { success: successUpdate } = adminUpdate;

  const adminDelete = useSelector((state) => state.adminDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = adminDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  // console.log(user);

  useEffect(() => {
    dispatch(listUser());
    if (!adminInfo) {
      navigate("/admin");
    }
  }, [
    dispatch,
    successCreate,
    navigate,
    adminInfo,
    successUpdate,
    successDelete,
  ]);

  return (
    <MainScreen title={`Welcome back ${adminInfo.name}`}>
      <Link to="/createuser">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Add User
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {user
        ?.filter((filterUser) =>
          filterUser.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((user) => (
          <Accordion key={user._id}>
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: "18",
                  }}
                >
                  <Accordion.Item as={Card.Text} variant="link" eventKey="0">
                    {user.name}
                  </Accordion.Item>
                </span>

                <div>
                  <Button href={`/admin/${user._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(user._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <h4>
                    <Badge variant="warning">Category - {user.email}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{user.name}</p>

                    <footer className="blockquote-footer">
                      Create-On- Date
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
}

export default AdminScreen;
