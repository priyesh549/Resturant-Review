import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { Form, Col, Row, Button, Container} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddHotel({ setaddHotel, setChangeList, ListChange }) {
  const [name, setName] = useState();
  const [location, setlocation] = useState();
  const [rating, setavgRating] = useState();
  const [currRating, setCurrRating] = useState(0);

  const savedetails = async () => {
    await axios
      .post(`http://localhost:8000/Resturants`, {
        Name: name,
        Location: location,
        AvgRating: currRating,
        Ratings : []
      })
      .then((resp) => {
        toast("Added Successfully",{alert : 'success'})
      })
      .catch((error) => {
        toast("Error adding",{alert : 'failure'})
      });
  };

  const SubmitDetails = async () => {
    if (!name || !location || currRating === 0) {
      return toast('Invalid Data',{alert : 'error'});
    }
    await savedetails();
    setaddHotel(false);
    setChangeList(ListChange + 1);
  };
  return (
    <>
    <ToastContainer/>
    <Container style={{border:'1px solid grey',marginTop:'40px',padding:'10px'}}>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Resturant Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="Please enter name" onChange={(e)=>setName(e.target.value)}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Resturant Location
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="Please enter location" onChange={(e)=>setlocation(e.target.value)}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label as="legend" column sm={2}>
          Resturant Rating
        </Form.Label>
        <Col sm={10}>
          {[1, 2, 3, 4, 5].map((ele) => {
            return (
              <FaStar
                color={ele <= rating ? "yellow" : "black"}
                onMouseEnter={() => setavgRating(ele)}
                onMouseLeave={() => setavgRating(currRating)}
                onClick={() => setCurrRating(ele)}
                size={24}
              />
            );
          })}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
        <Button variant="success" onClick={SubmitDetails}>Submit Details</Button>
        <span>     </span>
        <Button variant='danger' onClick={() => setaddHotel(false)}>Cancel</Button>
        </Col>
      </Form.Group>
    </Container>
    </>
    // <div className="AddHotel">
    //   <label>Resturant Name</label>
    //   <input
    //     type="text"
    //     placeholder="Enter resturant name"
    //     onChange={(e) => setName(e.target.value)}
    //   />
    //   <label>Resturant Location</label>
    //   <input
    //     type="text"
    //     placeholder="Enter Location"
    //     onChange={(e) => setlocation(e.target.value)}
    //   />
    //   <label>Resturant Rating</label>
    //   {[1, 2, 3, 4, 5].map((ele) => {
    //     return (
    //       <FaStar
    //         color={ele <= rating ? "yellow" : "black"}
    //         onMouseEnter={() => setavgRating(ele)}
    //         onMouseLeave={() => setavgRating(currRating)}
    //         onClick={() => setCurrRating(ele)}
    //       />
    //     );
    //   })}
    //   <button onClick={SubmitDetails}>Submit Details</button>
    //   <button onClick={() => setaddHotel(false)}>Cancel</button>
    // </div>
  );
}

export default AddHotel;
