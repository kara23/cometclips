import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Stack,
  Button,
} from "react-bootstrap";
export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [responseStatus, setResponseStatus] = useState(false);
  const [bgResponseColor, setBgResponseColor] = useState();

  const url = process.env.REACT_APP_URL+"newEntry.php";
  function save(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("phone_number", phone);
    data.append("message", message);

    try {
      axios({
        method: "POST",
        url: url,
        data: data,
      })
        .then((res) => {
          setBgResponseColor("bg-success");
          setResponse(res.data.message);
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
        })
        .catch((error) => {
          setBgResponseColor("bg-danger");
          setResponse(error.response.data.message);
        });
    } catch (error) {
      setBgResponseColor("bg-danger");
      setResponse(error.response.data.message);
    }

    setResponseStatus(true);
  }

  function hideResponse() {
    setResponseStatus(false);
  }
  return (
    <Container>
      <form onSubmit={save}>
        <Row className={"justify-content-center mt-5"}>
          <Col lg={12} className="mb-3">
            <div className="w-100 text-center">
              <Link to={"/"} className={"textUnderlineNone"}>
                <h4 className={"color-blue"}>
                  <strong>List entries</strong>
                </h4>
              </Link>
            </div>
          </Col>
          <Col lg={4}>
            <div className={"form-container"}>
                <h4 className={"fontBold"}>New entry</h4>
              <Stack gap={4}>
                <div>
                  <label htmlFor="name" className={"fontBold"}>
                    Name
                  </label>
                  <input
                    className={"form-control"}
                    id="name"
                    placeholder={"Type your name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={"fontBold"}>
                    Email
                  </label>
                  <input
                    className={"form-control"}
                    id="email"
                    placeholder={"Type your email address"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={"fontBold"}>
                    Phone
                  </label>
                  <input
                    className={"form-control"}
                    id="phone"
                    placeholder={"Type your phone number"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={"fontBold"}>
                    Message
                  </label>
                  <textarea
                    className={"form-control"}
                    id="message"
                    placeholder={"Type your message"}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div
                  onClick={hideResponse}
                  className={
                    responseStatus == true
                      ? bgResponseColor + " p-3 text-white rounded"
                      : "d-none"
                  }
                >
                  {response}
                  <span className="float-right fontBold cursorPointer">X</span>
                </div>
                <Button className={"btn btn-primary fontBold"} type={"submit"}>
                  Save
                </Button>
              </Stack>
            </div>
          </Col>
        </Row>
      </form>
    </Container>
  );
}
