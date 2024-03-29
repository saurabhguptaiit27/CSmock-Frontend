import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { MdDeleteForever } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { AiTwotoneLike } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { CurrentUserContext } from "../Context/CurrentUserProvider";
import { FaAward } from "react-icons/fa";
import toast from "react-hot-toast";

const Discussions = ({
  editUI,
  setEditUI,
  setCurrentPostId,
  setCurrentPostContent,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  const [allPosts, setAllPosts] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
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

  useEffect(() => {
    fetchData();
  }, [data, editUI]);

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
      console.error("Failed to Delete post", data);
    }
  };

  const handleEditButton = (postId, postContent) => {
    setEditUI(!editUI);
    setCurrentPostId(postId);
    setCurrentPostContent(postContent);
  };

  const handleYourPostsClick = async() => {
    await fetchData()
    setAllPosts((allPosts) =>
      allPosts.filter((post) => currentUser._id === post.createrId)
    );
  };

  const handleAllPostsClick = () => {
    fetchData();
  };
  const handleExpertsPostsClick = async() => {
    await fetchData()
    setAllPosts((allPosts) =>
      allPosts.filter((post) => post.createrType === "Expert")
    );
  };

  return (
    <section className="bg-gray-900/90 mt-16 min-h-screen">
      <div className="flex flex-col mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-center text-4xl font-bold tracking-tight text-green-500 sm:text-5xl">
          Read trusted reviews from our customers
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
                className="w-full bg-gray-900 text-white mt-4 rounded-lg px-4 py-2 align-middle sm:text-sm"
                rows="4"
                wrap="soft"
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

        <div className="flex flex-row bg-gray-900/50 py-2 px-4 rounded-lg gap-4 justify-center">
          <button
            onClick={() => handleAllPostsClick()}
            className="bg-gray-950 text-gray-100 px-4 py-1 rounded-lg hover:bg-gray-950/40 hover:text-green-500 focus:bg-green-600 focus:text-black"
          >
            All Posts
          </button>
          <button
            onClick={() => handleYourPostsClick()}
            className="bg-gray-950 text-gray-100 px-4 py-1 rounded-lg hover:bg-gray-950/40 hover:text-green-500 focus:bg-green-600 focus:text-black"
          >
            Your Posts
          </button>
          <button
            onClick={() => handleExpertsPostsClick()}
            className="bg-gray-950 text-gray-100 px-4 py-1 rounded-lg hover:bg-gray-950/40 hover:text-green-500 focus:bg-green-600 focus:text-black"
          >
            Experts' Posts
          </button>
        </div>

        <div className="mt-10 mb-16 grid grid-cols-1 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 ">
          {allPosts.map((post, index) => (
            <div key={index} className="mb-4 sm:break-inside-avoid">
              <blockquote
                className={
                  post.createrType === "User"
                    ? "rounded-lg bg-yellow-300/70 hover:bg-yellow-300/95 p-6 shadow-lg hover:shadow-green-400/60 sm:p-8"
                    : "rounded-lg bg-red-300/70 hover:bg-red-300/95 p-6 shadow-lg hover:shadow-green-400/60 sm:p-8"
                }
              >
                <div className="flex flex-row items-center gap-4">
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
                    <div className="float-right -mt-6 flex flex-row gap-2">
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
                <div className="flex flex-row gap-4 mt-2 -mb-4">
                  <div className="flex flex-row">
                    <p className="mr-2">2</p>
                    <button>
                      <FaRegCommentDots />
                    </button>
                  </div>
                  <div className="flex flex-row">
                    <p className="mr-2">2</p>
                    {isLiked ? (
                      <button>
                        {" "}
                        <AiTwotoneLike />
                      </button>
                    ) : (
                      <button>
                        <AiOutlineLike />
                      </button>
                    )}
                  </div>
                  <div className="text-sm">
                    <p>posted on - 21/3/2024</p>
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
