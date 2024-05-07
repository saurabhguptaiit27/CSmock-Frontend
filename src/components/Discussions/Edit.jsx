import React, { useContext, useLayoutEffect } from "react";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { AuthContext } from "../Context/AuthProvider";

const Edit = ({ setEditUI, currentPostId, currentPostContent }) => {
  const { userType, isLoggedIn } = useContext(AuthContext);
  const [editData, setEditData] = useState({
    postId: "",
    createrType: userType,
    content: currentPostContent,
  });

  useLayoutEffect(() => {
    setEditData({
      ...editData,
      postId: currentPostId,
    });
  }, [currentPostId]);

  const handleEditSubmitButton = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        isLoggedIn &&
          "https://csmock-backend.onrender.com/api/v1/creaters/editpost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // Add any other headers as needed
          },
          body: JSON.stringify(editData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to edit the post");
      }
      const data = await response.json();
      console.log("edit details are----", data);
      setEditUI(false);
    } catch (error) {
      console.error("Error while editing the post", error);
    }
  };

  const handleTextSelection = (text) => {
    setEditData({
      ...editData,
      content: text,
    });
  };

  const handleCrossEditUIButton = () => {
    setEditUI(false);
  };

  /////////////////////////////////////////////

  return (
    <form
      onSubmit={handleEditSubmitButton}
      className="max-w-md mx-auto p-4 bg-gray-600/90 shadow rounded fixed top-20 right-2 z-20 w-[20rem]"
    >
      <h2 className="text-2xl text-green-500 font-bold mb-4">
        Edit Your Post Here ...
      </h2>
      <button
        style={{
          backgroundColor: "#C7505B",
          color: "#000000",
          opacity: 0.8,
          margin: "0 2px",
          padding: "1px 1px",
          fontSize: "25px",
          fontWeight: "bold",
          borderRadius: "15px",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.6)",
          transition: "all 0.3s ease",
        }}
        onClick={() => handleCrossEditUIButton()}
        className="absolute top-2 right-2"
      >
        <MdOutlineCancel />
      </button>

      <div className="mb-4">
        <label for="editpost" className="block mb-1 text-yellow-500">
          Edit Post
        </label>
        <textarea
          id="editpost"
          name="input"
          value={editData.content}
          rows="4"
          wrap="soft"
          maxLength={256}
          placeholder="Edit your post here ..."
          className="w-full py-2 px-4 bg-gray-800 text-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(event) => handleTextSelection(event.target.value)}
        ></textarea>
      </div>

      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md shadow-gray-500"
      >
        Submit
      </button>
    </form>
  );
};

export default Edit;
