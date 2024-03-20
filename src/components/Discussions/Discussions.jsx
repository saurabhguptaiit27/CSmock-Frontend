import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { CurrentUserContext } from "../Context/CurrentUserProvider";

const Discussions = () => {
  const { currentUser } = useContext(CurrentUserContext);

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
      const response = await fetch(
        "http://localhost:8000/api/v1/creaters/createpost",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      const responseData = await response.json();
      setData(responseData["data"]); //this is done to make fetchData call    when data comes back..as to show post without refresh
      console.log("post created successfully---->", responseData);

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
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        isLoggedIn && "http://localhost:8000/api/v1/creaters/getallposts"
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
          ? `http://localhost:8000/api/v1/users/getuserbyid?string=${encodeURIComponent(
              createrId
            )}`
          : `http://localhost:8000/api/v1/experts/getexpertbyid?string=${encodeURIComponent(
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
        `http://localhost:8000/api/v1/creaters/deletepost?postId=${encodeURIComponent(
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
      console.log("post deleted.....->");
    } catch (error) {
      console.error("Failed to Delete post", data);
    }
  };


  
  return (
    <section class="bg-gray-900/90 mt-16 min-h-screen">
      <div class="flex flex-col mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 class="text-center text-4xl font-bold tracking-tight text-green-500 sm:text-5xl">
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
              class="overflow-hidden md:w-1/2 items-center"
            >
              <textarea
                id="createPost"
                class="w-full bg-gray-900 text-white mt-4 rounded-lg px-4 py-2 align-middle sm:text-sm"
                rows="4"
                wrap="soft"
                maxLength={256}
                required
                value={formData.content}
                placeholder="Create Your Post Here..."
                onChange={(event) => handleTextSelection(event.target.value)}
              ></textarea>

              <div class="flex items-center justify-end gap-2 py-3">
                <button
                  type="submit"
                  class="rounded bg-blue-700 px-3 py-1.5 text-md  font-medium text-white hover:bg-green-700"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        )}

        <div class="mt-10 mb-16 grid grid-cols-1 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 ">
          {allPosts.map((post, index) => (
            <div key={index} class="mb-4 sm:break-inside-avoid">
              <blockquote class="rounded-lg bg-yellow-300/70 hover:bg-yellow-300/95 p-6 shadow-lg hover:shadow-green-400/60 sm:p-8">
                <div class="flex flex-row items-center gap-4">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    class="size-14 rounded-full object-cover"
                  />
                  <div className="flex flex-col w-2/3">
                    <p class="-mb-1 text-lg font-medium text-gray-950">
                      {post.creator.fullname}
                    </p>
                    <p class=" mt-1 text-sm text-gray-900 ">
                      {post.creator.currentPosition}
                    </p>
                  </div>
                  {currentUser._id === post.createrId && (
                    <div className="float-right -mt-6 flex flex-row gap-2">
                      <button
                        onClick={() => handleEditButton()}
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
                        className="text-2xl hover:text-red-600 "
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  )}
                </div>

                <p class="mt-4 text-gray-700 text-justify">{post.content}</p>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Discussions;
