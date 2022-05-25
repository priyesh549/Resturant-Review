import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

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
  setListChange
}) {
  const [edit, setEdit] = useState(false);
  const [hover, setHover] = useState(Rate);
  const [currRating, setCurrRating] = useState(Rate);
  const [reviewComment, setReviewComment] = useState();

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
    setEdit(false);
    if (!reviewComment || !currRating) {
      alert("Invalid Review");
      return;
    }
    const newRating = ratings.map((rating) => {
      if (rating.User === User) {
        rating.Comments = reviewComment;
        rating.time = getFormatedDate();
        rating.Rate = currRating;
      }
      return rating;
    });
    await SaveAgain(newRating);
    setListChange(List+1);
  };

  const handleDelete = async () => {
    const newRating = ratings.filter((rating) => {
      if (rating.Unique !== Unique) {
        return true;
      }
      return false;
    });
    console.log(newRating);
    await Delete(newRating);
    setListChange(List+1);
  };

  const Delete = async (newRating) => {
    await axios
      .patch(`http://localhost:3000/Resturants/${id}`, {
        Ratings: [...newRating],
      })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SaveAgain = async (newRating) => {
    await axios
      .patch(`http://localhost:3000/Resturants/${id}`, {
        Ratings: [...newRating],
      })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
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
