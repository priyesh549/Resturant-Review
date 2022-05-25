import { FaStar } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
} from "react-bootstrap";
import { MdLocationPin } from "react-icons/md";

function ResturantDetail({
  Name,
  Location,
  AvgRating,
  id,
  setChangeList,
  ListChange,
  CurrentUser,
}) {
  const [hover, setHover] = useState(AvgRating);
  const [currRating, setCurrRating] = useState(AvgRating);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(Name);
  const [location, setLocation] = useState(Location);

  const saveData = async () => {
    await axios
      .put(`http://localhost:3000/Resturants/${id}`, {
        Name: name,
        Location: location,
        AvgRating: currRating,
      })
      // .then((resp) => {
      //   console.log(resp.data);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
  };

  const DeleteData = async () => {
    await axios
      .delete(`http://localhost:3000/Resturants/${id}`)
      // .then((resp) => {
      //   console.log(resp.data);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
  };

  const handleSave = async () => {
    setEdit(false);
    await saveData();
    setChangeList(ListChange + 1);
  };

  const handleDelete = async () => {
    await DeleteData();
    setChangeList(ListChange + 1);
  };
  return (
    <>
      <div className="">
        {edit === false ? (
          <React.Fragment>
            {/* <h1>{Name}</h1>
            <h5>{Location}</h5>
            {[1, 2, 3, 4, 5].map((ele) => {
              return ele <= AvgRating ? (
                <FaStar color="yellow" />
              ) : (
                <FaStar color="black" />
              );
            })}
            <Link to={`/UserComments/${id}`}>View More</Link>

            <button
              onClick={() => setEdit(true)}
              style={
                CurrentUser.Role === "Admin"
                  ? { display: "" }
                  : { display: "none" }
              }
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              style={
                CurrentUser.Role === "Admin"
                  ? { display: "" }
                  : { display: "none" }
              }
            >
              Delete
            </button> */}
            <Card style={{ width: "43rem", margin: "1rem", flexWrap: "wrap" }}>
              <Card.Body>
                <Card.Title>{Name}</Card.Title>
                <Card.Text>
                  <MdLocationPin /> {Location}
                  <br />
                  <strong>Ratings</strong>{" "}
                  {[1, 2, 3, 4, 5].map((ele) => {
                    return ele <= AvgRating ? (
                      <FaStar key={ele} color="yellow" />
                    ) : (
                      <FaStar key={ele} color="black" />
                    );
                  })}
                </Card.Text>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Link to={`/UserComments/${id}`}>FeedBacks</Link>
                  <Button
                    variant="outline-success"
                    onClick={() => setEdit(true)}
                    style={
                      CurrentUser.Role === "Admin"
                        ? { display: "" }
                        : { display: "none" }
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={handleDelete}
                    style={
                      CurrentUser.Role === "Admin"
                        ? { display: "" }
                        : { display: "none" }
                    }
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </React.Fragment>
        ) : (
          <>
            <Card style={{ width: "43rem", margin: "1rem", flexWrap: "wrap" }}>
              <Card.Body>
                <Card.Title>{Name}</Card.Title>
                <Card.Text>
                  <MdLocationPin /> {Location}
                  <br />
                  <strong>Ratings</strong>{" "}
                  {[1, 2, 3, 4, 5].map((ele) => {
                    return ele <= AvgRating ? (
                      <FaStar key={ele} color="yellow" />
                    ) : (
                      <FaStar key={ele} color="black" />
                    );
                  })}
                </Card.Text>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Link to={`/UserComments/${id}`}>FeedBacks</Link>
                  <Button
                    variant="outline-success"
                    onClick={() => setEdit(true)}
                    style={
                      CurrentUser.Role === "Admin"
                        ? { display: "" }
                        : { display: "none" }
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={handleDelete}
                    style={
                      CurrentUser.Role === "Admin"
                        ? { display: "" }
                        : { display: "none" }
                    }
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
            <input
              type="text"
              placeholder="Enter resturant name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter resturant location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{margin:'1rem'}}
            />
            {[1, 2, 3, 4, 5].map((ele) => {
              return (
                <FaStar
                  key={ele}
                  color={ele <= hover ? "yellow" : "black"}
                  size={24}
                  onMouseEnter={() => setHover(ele)}
                  onMouseLeave={() => setHover(currRating)}
                  onClick={() => setCurrRating(ele)}
                />
              );
            })}
            <Button variant="outline-success" onClick={handleSave} style={{margin:'1rem'}}>Save</Button>
            <Button variant="outline-danger" onClick={() => setEdit(false)}>Cancel</Button>
          </>
        )}
      </div>
    </>
  );
}

export default ResturantDetail;
