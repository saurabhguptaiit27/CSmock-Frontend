import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import Discussions from "./Discussions.jsx";
import Edit from "./Edit.jsx";

const DiscussionsUI = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [editUI, setEditUI] = useState(false);
  const [currentPostId, setCurrentPostId] = useState("");
  const [currentPostContent, setCurrentPostContent] = useState("");

  return (
    <>
      {isLoggedIn && (
        <Discussions
          editUI={editUI}
          setEditUI={setEditUI}
          setCurrentPostId={setCurrentPostId}
          setCurrentPostContent={setCurrentPostContent}
        />
      )}
      {isLoggedIn && editUI && (
        <Edit
          currentPostContent={currentPostContent}
          setEditUI={setEditUI}
          currentPostId={currentPostId}
        />
      )}
    </>
  );
};

export default DiscussionsUI;
