import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { AiTwotoneLike } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { TfiThought } from "react-icons/tfi";
import { CurrentUserContext } from "../Context/CurrentUserProvider";
import { FaAward } from "react-icons/fa";
import toast from "react-hot-toast";

const Discussions = ({
  editUI,
  setEditUI,
  setCurrentPostId,
  setCurrentPostContent,
}) => {
  const { currentUser, fetchCurrentUser } = useContext(CurrentUserContext);

  const [allPosts, setAllPosts] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    createrId: "",
    createrType: "",
    content: "",
    postedOn: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setFormData({
        ...formData,
        createrId: currentUser._id,
        createrType: currentUser.userType,
      });
    }, 10);
  }, [currentUser]);

  const handleTextSelection = (text) => {
    setFormData({
      ...formData,
      content: text,
      postedOn: new Date(Date.now()).toString(),
    });
  };

  const [data, setData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/v1/creaters/createpost", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      const responseData = await response.json();
      setData(responseData["data"]); //this is done to make fetchData call when data comes back..as to show post without refresh
      toast.success("Posted Successfully");
      // Clear form after successful post
      setFormData({
        ...formData,
        content: "",
        postedOn: "",
      });
    } catch (error) {
      console.error("error occured while posting----- : ", error.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        isLoggedIn && "/api/v1/creaters/getallposts"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch all posts");
      }
      const data = await response.json();
      const postsWithCreators = await Promise.all(
        data.data.map(async (post) => {
          const creator = await fetchCreator(post.createrId, post.createrType);
          return { ...post, creator };
        })
      );
      setAllPosts(postsWithCreators);
    } catch (error) {
      console.error("Error fetching all posts:", error);
    }
  };
  // Function to fetch creator details based on createrId and createrType
  const fetchCreator = async (createrId, createrType) => {
    try {
      const response = await fetch(
        createrType === "User"
          ? `/api/v1/users/getuserbyid?string=${encodeURIComponent(createrId)}`
          : `/api/v1/experts/getexpertbyid?string=${encodeURIComponent(
              createrId
            )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch creator details");
      }
      const creator = await response.json();
      return creator["data"];
    } catch (error) {
      console.error("Error fetching creator details:", error);
      return null;
    }
  };

  const handleDeleteButton = async (postId, createrId, createrType) => {
    try {
      const response = await fetch(
        `/api/v1/creaters/deletepost?postId=${encodeURIComponent(
          postId
        )}&createrId=${encodeURIComponent(
          createrId
        )}&createrType=${encodeURIComponent(createrType)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      const responseData = await response.json();
      setData(responseData["data"]);
      toast.success("Post Deleted Successfully");
    } catch (error) {
      console.error("Failed to Delete post", error);
    }
  };

  const handleEditButton = (postId, postContent) => {
    setEditUI(!editUI);
    setCurrentPostId(postId);
    setCurrentPostContent(postContent);
  };

  const handleUnsavePostButton = async (postId) => {
    try {
      const response = await fetch(
        `/api/v1/creaters/unsavepost?postId=${encodeURIComponent(
          postId
        )}&createrId=${encodeURIComponent(
          currentUser._id
        )}&createrType=${encodeURIComponent(currentUser.userType)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to unsave the post");
      }
      const responseData = await response.json();
      toast.success("Post Unsaved Successfully");
      fetchCurrentUser();
    } catch (error) {
      console.error("Failed to Unsave Post", error);
    }
  };

  const handleSavePostButton = async (postId) => {
    try {
      const response = await fetch(
        `/api/v1/creaters/savepost?postId=${encodeURIComponent(
          postId
        )}&createrId=${encodeURIComponent(
          currentUser._id
        )}&createrType=${encodeURIComponent(currentUser.userType)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save post");
      }
      const responseData = await response.json();
      toast.success("Post Saved Successfully");
      fetchCurrentUser();
    } catch (error) {
      console.error("Failed to Save Post", error);
    }
  };

  const handleUnlikePostButton = async (postId) => {
    try {
      const response = await fetch(
        `/api/v1/creaters/unlikepost?postId=${encodeURIComponent(
          postId
        )}&createrId=${encodeURIComponent(
          currentUser._id
        )}&createrType=${encodeURIComponent(currentUser.userType)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to unlike the post");
      }
      const responseData = await response.json();
      toast.success("Post Unliked Successfully");
      fetchData();
      fetchCurrentUser();
    } catch (error) {
      console.error("Failed to Unlike Post", error);
    }
  };

  const handleLikePostButton = async (postId) => {
    try {
      const response = await fetch(
        `/api/v1/creaters/likepost?postId=${encodeURIComponent(
          postId
        )}&createrId=${encodeURIComponent(
          currentUser._id
        )}&createrType=${encodeURIComponent(currentUser.userType)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to like post");
      }
      const responseData = await response.json();
      toast.success("Post liked Successfully");
      fetchData();
      fetchCurrentUser();
    } catch (error) {
      console.error("Failed to like Post", error);
    }
  };

  const handleYourPostsClick = async () => {
    await fetchData();
    setAllPosts((allPosts) =>
      allPosts.filter((post) => currentUser._id === post.createrId)
    );
  };

  const handleAllPostsClick = () => {
    fetchData();
  };

  const handleExpertsPostsClick = async () => {
    await fetchData();
    setAllPosts((allPosts) =>
      allPosts.filter((post) => post.createrType === "Expert")
    );
  };

  const handleSavedPostsClick = async () => {
    await fetchData();
    setAllPosts((allPosts) =>
      allPosts.filter((post) => post.savedBy.includes(currentUser._id))
    );
  };

  const handleLikedPostsClick = async () => {
    await fetchData();
    setAllPosts((allPosts) =>
      allPosts.filter((post) => post.likedBy.includes(currentUser._id))
    );
  };

  useEffect(() => {
    fetchData();
  }, [data, editUI]);

  return (
    <section className="bg-gray-900/90 mt-6 min-h-screen">
      <div className="flex flex-col mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <TfiThought className="text-white text-9xl" />
        <h2 className="text-center text-4xl font-bold text-gray-500 sm:text-5xl mx-48 -mt-24">
          <span className="text-yellow-400">Thoughts ...</span>
        </h2>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p>

        {isLoggedIn && (
          <div className=" w-full flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden md:w-1/2 items-center"
            >
              <textarea
                id="createPost"
                className="w-full bg-gray-900 text-white mt-4 rounded-lg px-4 py-2 align-middle sm:text-sm "
                rows="4"
                wrap="hard"
                maxLength={256}
                required
                value={formData.content}
                placeholder="Create Your Post Here..."
                onChange={(event) => handleTextSelection(event.target.value)}
              ></textarea>

              <div className="flex items-center justify-end gap-2 py-3">
                <button
                  type="submit"
                  className="rounded bg-blue-700 px-3 py-1.5 text-md  font-medium text-white hover:bg-green-700"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="flex flex-row flex-wrap bg-gray-900/50 py-2 px-4 rounded-lg gap-4 justify-center mx-6 lg:mx-64">
          <button
            onClick={() => handleAllPostsClick()}
            className="bg-gray-950 text-gray-100 px-4 py-1 rounded-lg hover:bg-gray-950/40 hover:text-green-500 focus:bg-green-600 focus:text-black shadow-md shadow-gray-600"
          >
            All Posts
          </button>
          <button
            onClick={() => handleYourPostsClick()}
            className="bg-gray-950 text-gray-100 px-4 py-1 rounded-lg hover:bg-gray-950/40 hover:text-green-500 focus:bg-green-600 focus:text-black shadow-md shadow-gray-600"
          >
            Your Posts
          </button>
          <button
            onClick={() => handleExpertsPostsClick()}
            className="bg-gray-950 text-gray-100 px-4 py-1 rounded-lg hover:bg-gray-950/40 hover:text-green-500 focus:bg-green-600 focus:text-black shadow-md shadow-gray-600"
          >
            Experts' Posts
          </button>
          <button
            onClick={() => handleSavedPostsClick()}
            className="bg-gray-950 text-gray-100 px-4 py-1 rounded-lg hover:bg-gray-950/40 hover:text-green-500 focus:bg-green-600 focus:text-black shadow-md shadow-gray-600"
          >
            Saved Posts
          </button>
          <button
            onClick={() => handleLikedPostsClick()}
            className="bg-gray-950 text-gray-100 px-4 py-1 rounded-lg hover:bg-gray-950/40 hover:text-green-500 focus:bg-green-600 focus:text-black shadow-md shadow-gray-600"
          >
            Liked Posts
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-2 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
          {allPosts.map((post, index) => (
            <div key={index}>
              <blockquote
                className={
                  post.createrType === "User"
                    ? "rounded-lg bg-gray-200/70 hover:bg-gray-300/70 hover:shadow-xl hover:shadow-gray-100/40 hover:border-transparent transition-colors duration-300 transform px-4  "
                    : "rounded-lg bg-red-100/70 hover:bg-red-200/70 hover:shadow-xl hover:shadow-gray-100/40 hover:border-transparent transition-colors duration-300 transform px-4"
                }
              >
                <div className="flex flex-row items-center gap-4 -mt-2 pt-4 relative">
                  <img
                    alt=""
                    src={post.creator.avatar}
                    className="size-14 rounded-full object-cover"
                  />
                  <div className="flex flex-col w-2/3">
                    <p className="-mb-1 text-lg font-medium text-gray-950 flex items-center">
                      <span className="mr-2">{post.creator.fullname}</span>
                      {post.createrType === "Expert" && (
                        <FaAward className="text-sm" />
                      )}
                    </p>

                    <p className=" mt-1 text-sm text-gray-900 ">
                      {post.creator.currentPosition}
                    </p>
                  </div>
                  {currentUser._id === post.createrId && (
                    <div className="float-right -mt-6 flex flex-row gap-2 absolute right-0">
                      <button
                        onClick={() => handleEditButton(post._id, post.content)}
                        className="text-lg hover:text-green-600 "
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteButton(
                            post._id,
                            post.createrId,
                            post.createrType
                          )
                        }
                        className="text-lg hover:text-green-700  border-2 border-red-700 rounded-xl "
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  )}
                </div>

                <p className="mt-4 text-gray-700 text-justify overflow-y-auto">
                  {post.content}
                </p>
                <hr className="border-black mt-4" />
                <div className="flex flex-row gap-4 mt-2 pb-2 -mb-4 relative">
                  <div className="flex flex-row">
                    {currentUser.likedPosts.includes(post._id) ? (
                      <button onClick={() => handleUnlikePostButton(post._id)}>
                        {" "}
                        <AiTwotoneLike className=" text-lg mb-1 bg-blue-600 rounded-md" />
                      </button>
                    ) : (
                      <button onClick={() => handleLikePostButton(post._id)}>
                        <AiOutlineLike className="mb-1" />
                      </button>
                    )}
                    <p className="ml-2 text-sm">{post.likedBy.length} Likes</p>
                  </div>
                  <div className="text-sm">
                    <p>posted on - {post.postedOn.slice(0, 16)}</p>
                  </div>
                  <div className="text-md absolute right-0">
                    {currentUser.savedPosts.includes(post._id) ? (
                      <button onClick={() => handleUnsavePostButton(post._id)}>
                        <FaBookmark />
                      </button>
                    ) : (
                      <button onClick={() => handleSavePostButton(post._id)}>
                        <FaRegBookmark />
                      </button>
                    )}
                  </div>
                </div>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Discussions;
