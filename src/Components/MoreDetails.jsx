import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import MoreDetailsComments from "./MoreDetailsComments";
import AddReview from "./AddReview";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { MdLocationPin } from "react-icons/md";
import NavBar from "./NavBar";
import jwt_decode from "jwt-decode";

function MoreDetails() {
  const params = useParams();
  const id = params.id;
  const [ResturantReview, setReview] = useState([]);
  const [ResturantDetail, setResturantDetails] = useState({});
  const [addReview, setaddReview] = useState(false);
  const [List, setListChange] = useState(0);
  const [User, setUser] = useState({});

  useEffect(() => {
    const fetchRatings = async () => {
      let RatingDetails = await axios.get(
        `http://localhost:3000/Resturants/${id}`
      );
      RatingDetails = RatingDetails.data;
      let max = 0;
      let min = 6;
      let maxRating;
      let minRating;

      for (let i = 0; i < RatingDetails.Ratings.length; i++) {
        if (RatingDetails.Ratings[i].Rate > max) {
          maxRating = RatingDetails.Ratings[i];
          max = RatingDetails.Ratings[i].Rate;
        }

        if (RatingDetails.Ratings[i].Rate < min) {
          minRating = RatingDetails.Ratings[i];
          min = RatingDetails.Ratings[i].Rate;
        }
      }

      let latestRatings =
        RatingDetails.Ratings[RatingDetails.Ratings.length - 1];

      if (RatingDetails.Ratings.length > 0) {
        setReview([maxRating, minRating, latestRatings]);
      }
      setResturantDetails(RatingDetails);
      const getUser = JSON.parse(localStorage.getItem("User"));
      setUser(jwt_decode(getUser.token));
      console.log(jwt_decode(getUser.token));
    };
    fetchRatings();
  }, [List]);
  // console.log(ResturantReview)

  return (
    <div>
      <NavBar />
      {User.Role !== "Admin" && (
        <Button
          variant="warning"
          onClick={() => setaddReview(true)}
          style={{ marginTop: "6px" }}
        >
          ADD REVIEWS
        </Button>
      )}
      {addReview === true && (
        <AddReview
          setaddReview={setaddReview}
          setListChange={setListChange}
          List={List}
          id={id}
          RatingDetails={ResturantReview}
          setReviews={setReview}
        />
      )}

      <Card
        style={{
          width: "43rem",
          margin: "1rem",
          alignItems: "center",
          height: "11rem",
          marginTop: "14rem",
          border: "1px solid grey",
          position: "absolute",
        }}
      >
        <Card.Body>
          <Card.Title>{ResturantDetail.Name}</Card.Title>
          <Card.Text>
            <MdLocationPin size={24} /> {ResturantDetail.Location}
            <br />
            <strong>Ratings</strong>{" "}
            {[1, 2, 3, 4, 5].map((ele) => {
              return ele <= ResturantDetail.AvgRating ? (
                <FaStar color="yellow" />
              ) : (
                <FaStar color="black" />
              );
            })}
          </Card.Text>
          <Link to="/Resturant">Back</Link>
        </Card.Body>
      </Card>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginLeft: "45rem",
          marginTop: "0px",
        }}
      >
        {ResturantReview &&
          ResturantReview.map((rating) => {
            // console.log('rating',rating);
            return (
              <MoreDetailsComments
                ratings={ResturantReview}
                User={rating.User}
                time={rating.time}
                Comments={rating.Comments}
                Rate={rating.Rate}
                id={id}
                Name={User.Name}
                Role={User.Role}
                List={List}
                setListChange={setListChange}
              />
            );
          })}
      </div>
    </div>
  );
}

export default MoreDetails;
