import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";

const Dashboard = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");

  const [users, setUsers] = useState([]);
  useEffect(() => {
    let userToken = localStorage.getItem("userToken");
    const headers = {
      Authorization: userToken,
    };
    axios
      .get("http://localhost:9000/user/userList", {
        headers: headers,
      })
      .then(function (response) {
        if (response.data.status == 0) {
          swal("Oops!", response.data.message.message.toUpperCase(), "error");
        } else {
          setUsers(response.data.data);
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  }, []);

  const loggingout = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/";
  };

  const deletingEntry = (name, email) => {
    // let id = event.target.id;
    console.log("----name, email-----", name, email);

    axios
      .delete("http://localhost:9000/user/delete", {
        params: {
          name: name,
          email: email,
        },
      })
      .then(function (response) {
        if (response.data.status === 1) {
          swal("Success!", "User deleted successfully!", "success");
          setUsers(users.filter((user) => user.name !== name));
        } else {
          swal("Oops!", response.data.message.toUpperCase(), "error");
        }
      })
      .catch(function (error) {
        console.log(error);
        swal("Oops!", error.response.data.error.toUpperCase(), "error");
      });
  };
  return (
    <>
      <h3 className="dashtitle">Employees</h3>
      <nav className="navbar bg-body-tertiary custom-navbar fixed-top">
        <div className="container-fluid d-flex flex-column align-items-start">
          <a className="navbar-brand mb-3" href="#">
            Company
          </a>
          <div className="collapse navbar-collapse show">
            <ul className="navbar-nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/" className="nav-link active" aria-current="page">
                  DashBoard
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/" className="nav-link">
                  Employees
                </Link>
              </li>
              <Button
                className="ButtonWrapper"
                variant="primary"
                onClick={loggingout}
                type="submit"
              >
                Logout
              </Button>
            </ul>
          </div>
        </div>
      </nav>

      {users.map((user, index) => (
        <div className="row employeerow" key={index}>
          <div className="col-8 employeecol1">
            <h6 className="h6name">Name : {user.name}</h6>
            <h6 className="h6name">Email ID:{user.email}</h6>
            <Button
              className="ButtonWrapper deletebtn"
              variant="primary"
              onClick={() => deletingEntry(user.name, user.email)}
              type="submit"
            >
              Delete
            </Button>
            <Button
              className="ButtonWrapper editbtn"
              variant="primary"
              onClick={loggingout}
              type="submit"
            >
              Edit
            </Button>
            <img
              src={user.avatar}
              style={{ float: "right", marginTop: "-59px" }}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Dashboard;
