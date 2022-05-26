import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { Container, Form, Col, Button, Row } from "react-bootstrap";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

function AddReview({ setaddReview, id, RatingDetails, setListChange, List }) {
  const [review, setReview] = useState();
  const [rating, setavgRating] = useState();
  const [currRating, setCurrRating] = useState();

  const getFormatedDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let hh = today.getHours();
    let min = today.getMinutes();
    let ss = today.getSeconds();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    if (hh < 10) hh = "0" + hh;
    if (min < 10) min = "0" + min;
    if (ss < 10) ss = "0" + ss;

    console.log(yyyy + "-" + mm + "-" + dd + " " + hh + ":" + min + ":" + ss);

    return yyyy + "-" + mm + "-" + dd + " " + hh + ":" + min + ":" + ss;
  };

  const handleSubmit = async () => {
    if (!review || !currRating) {
      return toast("Invalid Review",{alert : 'error'});
    }
    setaddReview(false);
    const getUser = JSON.parse(localStorage.getItem("User"));
    const du = jwt_decode(getUser.token)
    await postReview({
      User: du.Name,
      time: getFormatedDate(),
      Comments: review,
      Rate: currRating,
      Unique: v4(),
    });
    setListChange(List + 1);
  };

  const postReview = async (obj) => {
    console.log(RatingDetails);
    const comments = RatingDetails.filter((rating) => {
      if (rating.User === obj.User) {
        return false;
      }
      return true;
    });
    await axios
      .patch(`http://localhost:3000/Resturants/${id}`, {
        Ratings: [...comments, obj],
      })
      .then((resp) => {
        return toast("Review Added",{alert : 'success'});
      })
      .catch((error) => {
        return toast("Review failed",{alert : 'failure'});
      });
  };

  return (
    // <div>
    //   <textarea
    //     name="comment"
    //     id="review"
    //     cols="40"
    //     rows="5"
    //     placeholder="Enter Your Review"
    //     onChange={(e) => setReview(e.target.value)}
    //   />
    //   {[1, 2, 3, 4, 5].map((ele) => {
    //     return (
    //       <FaStar
    //         size={24}
    //         color={ele <= rating ? "yellow" : "black"}
    //         onMouseEnter={() => setavgRating(ele)}
    //         onMouseLeave={() => setavgRating(currRating)}
    //         onClick={() => setCurrRating(ele)}
    //       />
    //     );
    //   })}
    //   <button onClick={handleSubmit}>Submit Review</button>
    // </div>
    <>
      <ToastContainer/>
      <Container
        style={{ border: "1px solid grey", marginTop: "40px", padding: "10px" }}
      >
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Review
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              onChange={(e) => setReview(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            Give Stars
          </Form.Label>
          <Col sm={10}>
            {[1, 2, 3, 4, 5].map((ele) => {
              return (
                <FaStar
                  size={24}
                  color={ele <= rating ? "yellow" : "black"}
                  onMouseEnter={() => setavgRating(ele)}
                  onMouseLeave={() => setavgRating(currRating)}
                  onClick={() => setCurrRating(ele)}
                />
              );
            })}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button variant="success" onClick={handleSubmit}>
              Submit Review
            </Button>
            <span> </span>
            <Button variant="danger" onClick={() => setaddReview(false)}>
              Cancel
            </Button>
          </Col>
        </Form.Group>
      </Container>
    </>
  );
}

export default AddReview;
