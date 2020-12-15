import { React, useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { Favorite, Delete } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import "../dashboard/dashboard.css";

function Dashboard(props, state) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [newPost, setNewPost] = useState("");

  const likePost = async (post_id, like) => {

    try {
      if (like) {
        const res = await axios.put(
          `http://localhost:3000/api/post/${post_id}/like`,
          {}
        );
      } else {
        const res = await axios.delete(
          `http://localhost:3000/api/post/${post_id}/like`
        );
      }
      setPosts([]);
      getData();
    } catch (err) {
      setError(err.response);
      console.error(err.response);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/wall", {
      });

      setPosts([res.data.body]);
    } catch (err) {
      console.error(err.response);
      setError(err.reponse);
    }
  };

  const pushComment = async (post_id) => {

    try {
      const res = await axios.post(
        `http://localhost:3000/api/post/${post_id}/comment`,
        { text: comment }
      );
      // console.error(res);
      setComment("");
      setPosts([]);
      getData();
    } catch (err) {
      console.error(err.reponse);
      setError(err.reponse);
    }
  };

  const pushPost = async () => {

    try {
      const res = await axios.post(
        `http://localhost:3000/api/wall`,
        { content: newPost },
      );

      setNewPost("");
      setPosts([]);
      getData();
    } catch (err) {
      console.error(err.response);
      setError(err.response);
    }
  };

  const deletePost = async (post_id) => {

    try {
      const res = await axios.delete(
        `http://localhost:3000/api/wall/${post_id}/post`
      );
      // console.error(res);
      setPosts([]);
      getData();
    } catch (err) {
      setError(err.response);
      console.error(err.response);
    }
  };

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

      <TextField
        placeholder="Type post content"
        rows="10"
        style={{ height: 50, width: 1000 }}
        onChange={(event) => {
          setNewPost(event.target.value);
        }}
      ></TextField>
      <Button
        onClick={(event) => {
          pushPost();
        }}
      >
        POST
      </Button>

      {posts.length &&
        posts[0].map((posts) => (
          <div className="post">
            <h3>
              {posts["me.name"]} {posts["me.lastName"]}
            </h3>
            <h3>
              {posts["n"].properties.timestamp.year}-
              {posts["n"].properties.timestamp.month}-
              {posts["n"].properties.timestamp.day}{" "}
              {posts["n"].properties.timestamp.hour}:
              {posts["n"].properties.timestamp.minute}:
              {posts["n"].properties.timestamp.second}
            </h3>
            <div className="reactions">
              <Favorite
                onClick={(event) => {
                  posts["doILike"]
                    ? likePost(posts["id(n)"], false)
                    : likePost(posts["id(n)"], true);
                }}
                style={{ fill: posts["doILike"] ? "red" : "black" }}
              ></Favorite>{" "}
              <span>{posts.likes}</span>
              <Delete
                onClick={(event) => {
                  deletePost(posts["id(n)"]);
                }}
              ></Delete>
            </div>
            <div className="content">{posts["n"].properties.content}</div>
            <TextField
              placeholder="Type"
              rows="10"
              style={{ height: 50, width: 1000 }}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            ></TextField>
            <Button
              onClick={(event) => {
                pushComment(posts["id(n)"]);
              }}
            >
              Comment
            </Button>
            {posts.comments.map(
              (comment) =>
                comment.com != null && (
                  <div className="comment">
                    <h3>
                      {comment.name} {comment.lastName}
                    </h3>
                    <h6>
                      {comment.com.properties.timestamp.year}-
                      {comment.com.properties.timestamp.month}-
                      {comment.com.properties.timestamp.day}{" "}
                      {comment.com.properties.timestamp.hour}:
                      {comment.com.properties.timestamp.minute}:
                      {comment.com.properties.timestamp.second}
                    </h6>
                    {comment.com.properties.text}
                  </div>
                )
            )}
          </div>
        ))}
    </div>
  );
}

export default Dashboard;
