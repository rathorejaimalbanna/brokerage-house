import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../pages/pages.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { projectActions } from "../../Redux/projectReducer/projectReducer";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

function AdminCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function deleteProject() {
    await deleteDoc(doc(db, "projects", props.project.name));
  }

  function handleDelete() {
    if (
      window.confirm(
        `Are you sure you want to delete Project ${props.project.name}?`
      )
    ) {
      dispatch(projectActions.removeProject(props.project.name));
      deleteProject();
    }
  }

  function handleProject() {
    navigate(`${props.id}`);
  }
  return (
    <Card style={{ width: "25rem" }}>
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
        <Card.Text>
          {/* <img
            className={styles.asideIcon}
            src="/images/placeholder.png"
            alt="loc"
          /> */}
          Property Type : Colony Project
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
        {props.type === "add" && (
          <Button
            onClick={handleDelete}
            variant="warning"
            style={{ width: "auto", fontSize: "small" }}
          >
            Delete Project
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default AdminCard;
