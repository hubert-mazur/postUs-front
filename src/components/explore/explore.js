import { React, useState, useEffect } from "react";
import { MenuItem, Select, CircularProgress } from "@material-ui/core";
import { PersonAdd, PersonAddDisabled } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import "./explore.css";

function Explore(props) {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("other");

  useEffect(() => {
    getOther();
  }, []);

  const handleSearch = (value) => {
    if (value == "other") getOther();
    else if (value == "mayKnow") getMayKnow();
    else if (value == "followed") getFollowed();
    else if (value == "following") getFollowing();
  };

  const getOther = async () => {
    try {
      if (!search.length) return null;
      const res = await axios.get(`http://localhost:3000/api/people/other`, {});
      setPeople(res.data.body);
    } catch (err) {
      console.error(err.response);
      setError(err.response);
    }
  };

  const getFollowed = async () => {
    try {
      if (!search.length) return null;
      const res = await axios.get(
        `http://localhost:3000/api/people/followed`,
        {}
      );
      setPeople(res.data.body);
    } catch (err) {
      console.error(err.response);
      setError(err.response);
    }
  };

  const getFollowing = async () => {
    try {
      if (!search.length) return null;
      const res = await axios.get(`http://localhost:3000/api/people/following`);

      setPeople(res.data.body);
    } catch (err) {
      console.error(err);
      setError(err.response);
    }
  };

  const getMayKnow = async () => {
    try {
      if (!search.length) return null;
      const res = await axios.get(
        `http://localhost:3000/api/people/mayKnow`,
        {}
      );

      setPeople(res.data.body);
    } catch (err) {
      console.error(err.response);
      setError(err.response);
    }
  };

  const followPerson = async (person_id) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/people/${person_id}/follow`,
        {}
      );
      setPeople([]);
      handleSearch(search);
    } catch (err) {
      console.error(err.response);
      setError(err.response);
    }
  };

  const unfollowPerson = async (person_id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/people/${person_id}/follow`
      );
      setPeople([]);
      handleSearch(search);
    } catch (err) {
      console.error(err.response);
      setError(err.response);
    }
  };

  if (!people) return <CircularProgress></CircularProgress>;
  return (
    <div className="main">
      {error && (
        <Alert
          severity="error"
          onClick={(event) => {
            setError(null);
          }}
        >
          {error.data.body}
        </Alert>
      )}

      <Select
        defaultValue="other"
        onChange={(event) => {
          setPeople([]);
          handleSearch(event.target.value);
          setSearch(event.target.value);
        }}
      >
        <MenuItem value="mayKnow">People You might know</MenuItem>
        <MenuItem value="other">Other people </MenuItem>
        <MenuItem value="followed">People You follow</MenuItem>
        <MenuItem value="following">People that are following You</MenuItem>
      </Select>

      <div className="people">
        {search == "mayKnow" &&
          people.map((person) => (
            <div className="person">
              <h3>
                <PersonAdd
                  onClick={(event) => {
                    followPerson(person["c"].identity);
                  }}
                  style={{ fill: "green" }}
                  className="icon"
                ></PersonAdd>
                {person.c.properties.name} {person["c"].properties.lastName}
                <p style={{ fontSize: "10" }}>Wspólni znajomi: {person.tf}</p>
              </h3>
            </div>
          ))}

        {search == "followed" &&
          people.map((people) => (
            <div className="person">
              <h3>
                <PersonAddDisabled
                  className="icon"
                  style={{ fill: "red" }}
                  onClick={(event) => {
                    unfollowPerson(people["myfriends"].identity);
                  }}
                ></PersonAddDisabled>
                {people["myfriends"].properties.name}{" "}
                {people["myfriends"].properties.lastName}
              </h3>
            </div>
          ))}

        {search == "following" &&
          people.map((people) => (
            <div className="person">
              <h3>
                {people["doIFollow"] && (
                  <PersonAddDisabled
                    className="icon"
                    style={{ fill: "red" }}
                    onClick={(event) => {
                      unfollowPerson(people["following"].identity);
                    }}
                  ></PersonAddDisabled>
                )}
                {!people["doIFollow"] && (
                  <PersonAdd
                    className="icon"
                    style={{ fill: "green" }}
                    onClick={(event) => {
                      followPerson(people["following"].identity);
                    }}
                  ></PersonAdd>
                )}
                {people["following"].properties.name}{" "}
                {people["following"].properties.lastName}
              </h3>
            </div>
          ))}

        {search == "other" &&
          people.map((people) => (
            <div className="person">
              <h3>
                <PersonAdd
                  className="icon"
                  onClick={(event) => {
                    followPerson(people["other"].identity);
                  }}
                  style={{ fill: "green" }}
                ></PersonAdd>{" "}
                {people["other"].properties.name}{" "}
                {people["other"].properties.lastName}
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Explore;
