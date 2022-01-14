import { Navbar, Container, Nav } from "react-bootstrap"

import { useNavigate } from "react-router-dom";

export default function Header (){
    
  const navigate = useNavigate();
   const toFeedback = ()=>{
    navigate("/feedback")
   }
    return (<Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand >To-Do List</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
      <Nav.Link onClick={toFeedback}>Feedback</Nav.Link>

    </Navbar.Collapse>
    </Container>
  </Navbar>)
}