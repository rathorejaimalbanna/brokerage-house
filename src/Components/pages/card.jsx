import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from "./pages.module.css"
import { Link, useNavigate } from 'react-router-dom';

function ProjectCard(props) {
  const navigate = useNavigate()
  function handleProject()
  {
    navigate(`${props.id}`)
  }
  return (
    <Card style={{ width: '25rem' }}>
      <Card.Img variant="top" style={{maxHeight:"30vh"}} src={props.project.image} />
      <Card.Body>
        <Card.Title>{props.project.name}</Card.Title>
        <Card.Text>
          <img className={styles.asideIcon} src="/images/placeholder.png" alt="loc" />{props.project.location}
        </Card.Text>
        <Button style={{marginRight:"25%"}} variant="primary" onClick={handleProject}>{props.type === "project" ? "Book Property":"Property Details"}</Button>
        {props.type === "project" && <Button variant="info" ><Link style={{color:"black",textDecoration:"none"}} to="/contact">Contact Us</Link></Button>}
      </Card.Body>
    </Card>
  );
}

export default ProjectCard
