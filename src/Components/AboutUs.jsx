import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";

function AboutUs() {
  const [User, setUser] = useState({});
  useEffect(() => {
    const fetch = async () => {
      let du = JSON.parse(localStorage.getItem("User"));
      setUser(du);
    };
    fetch();
  }, []);
  return (
    <>
    <NavBar/>
      <div style={{ marginTop: "12px" }}>
        <h4>Welcome {User.Name}.We provide the best review on Resturant.</h4>
        <li>
          Our Features
          <ul>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis quod ratione maiores temporibus, rem quaerat, tempore
            fugiat ea in et possimus aut, est eveniet quasi nesciunt cumque
            nihil exercitationem corporis.
          </ul>
          <ul>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis quod ratione maiores temporibus, rem quaerat, tempore
            fugiat ea in et possimus aut, est eveniet quasi nesciunt cumque
            nihil exercitationem corporis.
          </ul>
          <ul>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis quod ratione maiores temporibus, rem quaerat, tempore
            fugiat ea in et possimus aut, est eveniet quasi nesciunt cumque
            nihil exercitationem corporis.
          </ul>
          <ul>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis quod ratione maiores temporibus, rem quaerat, tempore
            fugiat ea in et possimus aut, est eveniet quasi nesciunt cumque
            nihil exercitationem corporis.
          </ul>
          <ul>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis quod ratione maiores temporibus, rem quaerat, tempore
            fugiat ea in et possimus aut, est eveniet quasi nesciunt cumque
            nihil exercitationem corporis.
          </ul>
        </li>
        <strong>Please Contribute to make our app better.</strong>
      </div>
    </>
  );
}

export default AboutUs;
