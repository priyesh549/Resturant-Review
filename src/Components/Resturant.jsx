import React, { useState, useEffect } from "react";
import ResturantDetail from "./ResturantDetail";
import axios from "axios";
import AddHotel from "./AddHotel";
import NavBar from "./NavBar";
import {
  Container,
  Row,
  Col,
  Button,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from 'jwt-decode';

function Resturant() {
  const [List, setList] = useState([]);
  const [ListChange, setChangeList] = useState(1);
  const [addHotel, setaddHotel] = useState(false);
  const [typeSearch, setTypeSearch] = useState("");
  const [filterrate, setFilterRate] = useState(1);
  const [CurrentUser, setCurrentUser] = useState({});
  const [len, setlen] = useState(0);

  // totalItems = 25, page = totalItems / 8,
  const [page, setPage] = useState(0);
  const [currpage, setcurrpage] = useState(1);

  useEffect(() => {
    const data = async () => {
      let resturant = await axios.get("http://localhost:3000/Resturants");
      resturant = await resturant.data;
      setList(resturant);
      setPage(Math.ceil(resturant.length / 8));
      setlen(resturant.length);
    };
    data();
    const getUser = JSON.parse(localStorage.getItem("User"));
    setCurrentUser(jwt_decode(getUser.token));
    console.log(jwt_decode(getUser.token))
  }, [ListChange]);
  
  console.log({ page, len });
  return (
    <div>
      <ToastContainer />
      <NavBar />
      <Container style={{ marginTop: "30px", display: "flex" }}>
        <Container>
          <Row>
            <FormLabel
              size="lg"
              column
              xs={3}
              style={{ fontSize: "22px", color: "orange" }}
            >
              Resturant :
            </FormLabel>
            <Col sm={6}>
              <FormControl
                type="text"
                placeholder="Enter Resturant Name"
                onChange={(e) => {
                  setTypeSearch(e.target.value);
                  const dummy = List.filter((li) =>
                    li.Name.toLowerCase().includes(e.target.value.toLowerCase())
                  ).filter((li) => li.AvgRating >= filterrate);

                  setlen(dummy.length);
                  setPage(Math.ceil(dummy.length / 8));
                  console.log(dummy.length);
                }}
              />
            </Col>
          </Row>

          <Row>
            <FormLabel
              column
              xs={3}
              style={{ fontSize: "22px", color: "orange" }}
            >
              Rating :
            </FormLabel>
            <Col sm={6}>
              <FormControl
                type="text"
                placeholder="Enter Ratings"
                onChange={(e) => {
                  
                  if (
                    parseInt(e.target.value) <= 0 ||
                    parseInt(e.target.value) > 5 || ( isNaN(parseInt(e.target.value)) && e.key !== 'Backspace')
                  ) {
                    toast("Invalid Rating",{alert : 'error'});
                    e.target.value = "";
                    return;
                  }
                  setFilterRate(e.target.value);
                  const dummy = List.filter((li) =>
                    li.Name.toLowerCase().includes(typeSearch.toLowerCase())
                  ).filter((li) => li.AvgRating >= e.target.value);
                  setlen(dummy.length);
                  setPage(Math.ceil(dummy.length / 8));
                  console.log(dummy.length);
                }}
              />
            </Col>
          </Row>
        </Container>
        
        {CurrentUser.Role === "Admin" && (
          <Button variant="success" onClick={() => setaddHotel(true)}>
            Add Resturant
          </Button>
        )}
      </Container>
      {CurrentUser.Role === "Admin" && addHotel === true && (
        <AddHotel
          setaddHotel={setaddHotel}
          setChangeList={setChangeList}
          ListChange={ListChange}
        />
      )}
      <div
        style={{
          display: "flex",
          width: "100vw",
          padding: "2rem",
          flexWrap: "wrap",
        }}
      >
        {List.filter((li) =>
          li.Name.toLowerCase().includes(typeSearch.toLowerCase())
        )
          .filter((li) => li.AvgRating >= filterrate)

          .map((li, index) => {
            return index >= (currpage - 1) * 8 && index < currpage * 8 ? (
              <ResturantDetail
                key={li.id}
                Name={li.Name}
                Location={li.Location}
                AvgRating={li.AvgRating}
                id={li.id}
                setChangeList={setChangeList}
                CurrentUser={CurrentUser}
                ListChange={ListChange}
              />
            ) : (
              <></>
            );
          })}
      </div>
      <span style={{ fontWeight: "54px", marginRight: "3px" }}>
        <strong>Pages-></strong>
      </span>
      {page > 0 &&
        new Array(page).fill(0).map((num, index) => (
          <Button
            variant="outline-primary"
            onClick={() => setcurrpage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
    </div>
  );
}

export default Resturant;
