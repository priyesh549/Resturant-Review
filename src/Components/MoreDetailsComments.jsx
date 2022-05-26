import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MoreDetailsComments({
  ratings,
  User,
  time,
  Comments,
  Rate,
  Unique,
  id,
  Name,
  Role,
  List,
  setListChange,
}) {
  const [edit, setEdit] = useState(false);
  const [hover, setHover] = useState(Rate);
  const [currRating, setCurrRating] = useState(Rate);
  const [reviewComment, setReviewComment] = useState();

  const handleSubmit = async () => {
    setEdit(false);
    if (!reviewComment && !currRating) {
      return toast("Invalid Review",{alert : 'error'});
    }
    const newRating = ratings.map((rating) => {
      if (rating.User === User) {
        rating.Comments = reviewComment;
        rating.Rate = currRating;
      }
      return rating;
    });
    await SaveAgain(newRating);
    setListChange(List + 1);
  };

  const handleDelete = async () => {
    // console.log('old',ratings)
    const newRating = ratings.filter((rating) => {
      // console.log(rating.User,User)
      if (rating.User !== User ) {
        // console.log('Entered here')
        return true;
      }
      return false;
    });
    await Delete(newRating);
    // console.log('new',newRating);
    setListChange(List + 1);
  };

  const Delete = async (newRating) => {
    await axios
      .patch(`http://localhost:3000/Resturants/${id}`, {
        Ratings: [...newRating],
      })
      .then((resp) => {
        return toast('Deleted Successfully',{alert : 'success'});
      })
      .catch((error) => {
        return toast('Failed Deleting',{alert : 'failure'});
      });
  };

  const SaveAgain = async (newRating) => {
    await axios
      .patch(`http://localhost:3000/Resturants/${id}`, {
        Ratings: [...newRating],
      })
      .then((resp) => {
        return toast('Edited Successfully',{alert : 'success'});
      })
      .catch((error) => {
        return toast('Failed editing',{alert : 'failure'});
      });
  };
  return (
    <>
      <ToastContainer />
      {edit === false ? (
        <Card
          style={{
            width: "43rem",
            margin: "1rem",
            height: "auto",
            border: "1px solid grey",
            padding: "1rem",
          }}
        >
          <Card.Title>{User.toUpperCase()}</Card.Title>
          <Card.Text style={{ color: "#ead7d7" }}>
            {time}
            <p style={{ color: "grey" }}>{Comments}</p>
          </Card.Text>

          <div>
            {User === Name && (
              <Button
                variant="outline-success"
                onClick={() => setEdit(true)}
                style={{ marginRight: "1rem" }}
              >
                Edit
              </Button>
            )}
            {(Role === "Admin" || User === Name) && (
              <Button variant="outline-danger" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </div>
          <br />
          <Card.Text>
            {[1, 2, 3, 4, 5].map((ele) => {
              return ele <= Rate ? (
                <FaStar color="red" size={18} />
              ) : (
                <FaStar color="black" size={18} />
              );
            })}
          </Card.Text>
        </Card>
      ) : (
        <div
          style={{
            margin: "0rem",
            border: "1px solid grey",
            padding: "0.4rem",
          }}
        >
          <textarea
            name=""
            id=""
            cols="60"
            rows="9"
            placeholder="Enter Your Review"
            onChange={(e) => setReviewComment(e.target.value)}
            style={{ margin: "0.1rem" }}
          />
          {[1, 2, 3, 4, 5].map((ele) => {
            return (
              <FaStar
                color={ele <= hover ? "yellow" : "black"}
                size={24}
                onMouseEnter={() => setHover(ele)}
                onMouseLeave={() => setHover(currRating)}
                onClick={() => setCurrRating(ele)}
              />
            );
          })}
          <div>
            <Button
              variant="outline-success"
              onClick={handleSubmit}
              style={{ marginRight: "1rem" }}
            >
              Save Again
            </Button>
            <Button variant="outline-danger" onClick={() => setEdit(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default MoreDetailsComments;
