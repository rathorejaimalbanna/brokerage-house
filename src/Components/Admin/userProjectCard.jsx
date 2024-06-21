import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./admin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { userProjectActions } from "../../Redux/userProjectReducer/userProjectReducer";

function UserProjectCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function deleteProject() {
    await deleteDoc(doc(db, "userProjects", props.project.name));
  }

  function handleDelete() {
    if (
      window.confirm(
        `Are you sure you want to delete Project ${props.project.name}?`
      )
    ) {
      dispatch(userProjectActions.removeProject(props.project.name));
      deleteProject();
    }
  }

  function handleProject() {
    navigate(`${props.id}`);
  }
  return (
    <Card style={{ width: "25rem", position: "relative" }}>
      <Card.Img
        variant="top"
        style={{ maxHeight: "30vh", objectFit: "contain" }}
        src={props.project.image}
        alt="Project Image"
      />
      <Card.Body>
        <Card.Title>{props.project.name}</Card.Title>
        <Card.Text>
          <img
            className={styles.asideIcon}
            src="/images/placeholder.png"
            alt="loc"
          />
          {props.project.location}
        </Card.Text>
        <Card.Text>Property Type : {props.project.type || "Colony"}</Card.Text>
        <Card.Text>
          User Contact : {props.project.contact || "Colony"}
        </Card.Text>
        <Button
          style={{ marginRight: "25%", fontSize: "small" }}
          variant="primary"
          onClick={handleProject}
        >
          {props.type === "project" ? "Book Property" : "Edit Property Details"}
        </Button>
        {props.type === "project" && (
          <Link
            style={{ color: "black", textDecoration: "none" }}
            to="/contact"
          >
            <Button variant="info">Contact Us</Button>
          </Link>
        )}

        <Button
          onClick={handleDelete}
          variant="warning"
          style={{ width: "auto", fontSize: "small" }}
        >
          Delete Project
        </Button>

        <Button
          variant={props.project.status === "approved" ? "success" : "danger"}
          className={styles.statusButton}
        >
          {props.project.status}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default UserProjectCard;
