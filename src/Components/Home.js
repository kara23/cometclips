import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const url = process.env.REACT_APP_URL+"entries.php";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        if (res.data.users) {
          setUsers(res.data.users);
        } else {
          setUsers([]);
        }
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error.data.message);
      });
  }, []);

  return (
    <Container className={"container pb-5"}>
      <Row className={"align-items-center justify-content-center mt-5"}>
        <Col lg={12} className="mb-3">
          <div className="w-100 text-center">
            <Link to={"/new-entry"} className={"textUnderlineNone"}>
              <h4 className={"color-blue"}>
                <strong>New entry</strong>
              </h4>
            </Link>
          </div>
        </Col>
        <Col lg={6}>
          <Stack gap={3}>
            <div className={spinner == true ? "text-center w-100" : "d-none"}>
                <BeatLoader color={"#3399cc"} size={20} />
                </div>
            {users.length == 0 ? (
              <div className={"user-data-row form-container"}>
                <h4 className={"medium-grey"}>No entry found!</h4>
                <Link
                  to={"/new-entry"}
                  className={"textUnderlineNone color-blue"}
                >
                  New entry
                </Link>
              </div>
            ) : (
              users.map((item, index) => (
                <Col lg={12} key={index}>
                  <div className={"user-data-row form-container"}>
                    <h4 className={"fontBold"}>{item.name}</h4>
                    <div className={"w-100 medium-grey"}>
                      <div className={"hr-line w-100"} />
                      {item.phoneNumber}
                      <br />
                      {item.email}
                      <br />
                      <br />
                      <h5 className={"fontBold"}>Message</h5>
                      {item.message}
                    </div>
                  </div>
                </Col>
              ))
            )}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}
