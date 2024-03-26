import React, { useLayoutEffect, useState } from "react";

const TopStories = () => {
  const [stories, setStories] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  useLayoutEffect(() => {
    handleTechNewsClick();
  }, []);

  const handleTechNewsClick = async () => {
    try {
      const response = await fetch(
        "https://gnews.io/api/v4/top-headlines?category=technology&lang=en&country=in&max=10&apikey=1225b5c11f26c930e48df91d8222121b"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Tech news");
      }
      const data = await response.json();
      setStories(data["articles"]);
    } catch (error) {
      console.error("Error fetching Tech news:", error);
    }
  };

  const handleScienceNewsClick = async () => {
    try {
      const response = await fetch(
        "https://gnews.io/api/v4/top-headlines?category=science&lang=en&country=in&max=10&apikey=1225b5c11f26c930e48df91d8222121b"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Tech news");
      }
      const data = await response.json();
      setStories(data["articles"]);
    } catch (error) {
      console.error("Error fetching Tech news:", error);
    }
  };

  const handleGeneralNewsClick = async () => {
    try {
      const response = await fetch(
        "https://gnews.io/api/v4/top-headlines?category=science&lang=en&country=us&max=10&apikey=1225b5c11f26c930e48df91d8222121b"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Tech news");
      }
      const data = await response.json();
      setStories(data["articles"]);
    } catch (error) {
      console.error("Error fetching Tech news:", error);
    }
  };

  const handleWorldNewsClick = async () => {
    try {
      const response = await fetch(
        "https://gnews.io/api/v4/top-headlines?category=technology&lang=en&country=us&max=10&apikey=1225b5c11f26c930e48df91d8222121b"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Tech news");
      }
      const data = await response.json();
      setStories(data["articles"]);
    } catch (error) {
      console.error("Error fetching Tech news:", error);
    }
  };


  return (
    <section>
      <div class="bottom-2 flex h-auto min-h-screen w-screen flex-col border-black bg-gray-950/80 p-6 pt-16">
        <div class="my-2 flex h-1/4 w-full flex-col bg-transparent">
          <div class="m-2 min-h-32 bg-transparent">
            <h1 class="text-2xl font-semibold text-center text-gray-100 capitalize lg:text-3xl">
              Here are the <span class="text-green-600">Top Stories</span> for
              today
            </h1>
            <p class="max-w-2xl mx-auto my-6 text-center text-gray-100">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              incidunt ex placeat modi magni quia error alias, adipisci rem
              similique, at omnis eligendi optio eos harum.
            </p>
          </div>
          <div class="m-2 flex min-h-16 flex-col sm:flex-row bg-transparent justify-center">
            <button
              onClick={() => handleTechNewsClick()}
              class="m-2 bg-blue-600 hover:bg-blue-700 rounded-lg sm:w-36"
            >
              Technology
            </button>
            <button
              onClick={() => handleScienceNewsClick()}
              class="m-2 bg-green-500 hover:bg-green-700  rounded-lg sm:w-36"
            >
              Science
            </button>
            <button
              onClick={() => handleWorldNewsClick()}
              class="m-2 bg-yellow-400 hover:bg-yellow-600  rounded-lg sm:w-36"
            >
              World
            </button>
            <button
              onClick={() => handleGeneralNewsClick()}
              class="m-2 bg-gray-950 hover:bg-gray-900  rounded-lg sm:w-36 text-white"
            >
              General
            </button>
          </div>
        </div>

        <div class="min-h-1/4 my-4 flex h-auto w-full flex-col bg-transparent md:flex-row">
          <div class="min-h-48 bg-gray-400/70 border-2 border-yellow-300 rounded-xl p-4 md:w-1/3 text-white">
            <h1>{stories[0]["title"]}</h1>
            <p>{stories[0]["description"]}</p>
            <p>{stories[0]["content"]}</p>
          </div>
          <div class="flex min-h-64 flex-col bg-transparent md:w-2/3">
            <div class="m-2 min-h-28 bg-gray-500/30 border-2 border-yellow-300 text-white rounded-xl p-4">
              <h1>{stories[1]["title"]}</h1>
              <p>{stories[1]["description"]}</p>
              <p>{stories[1]["content"]}</p>
            </div>
            <div class="m-2 min-h-28 bg-gray-500/30 border-2 border-yellow-300 text-white rounded-xl p-4">
              <h1>{stories[2]["title"]}</h1>
              <p>{stories[2]["description"]}</p>
              <p>{stories[2]["content"]}</p>
            </div>
          </div>
        </div>

        <div class="min-h-1/4 my-4 flex h-auto w-full flex-col bg-transparent md:flex-row -mt-4">
          <div class=" flex min-h-64 flex-col bg-transparent md:w-2/3">
            <div class="m-2 min-h-28 bg-gray-500/30 border-2 border-yellow-300 text-white rounded-xl p-4">
              <h1>{stories[3]["title"]}</h1>
              <p>{stories[3]["description"]}</p>
              <p>{stories[3]["content"]}</p>
            </div>
            <div class="m-2 min-h-28 bg-gray-500/30 border-2 border-yellow-300 text-white  rounded-xl p-4">
              <h1>{stories[4]["title"]}</h1>
              <p>{stories[4]["description"]}</p>
              <p>{stories[4]["content"]}</p>
            </div>
          </div>
          <div class="m-2 min-h-48 bg-gray-500/30 border-2 border-yellow-300 text-white rounded-xl md:w-1/3 p-4">
            <h1>{stories[5]["title"]}</h1>
            <p>{stories[5]["description"]}</p>
            <p>{stories[5]["content"]}</p>
          </div>
        </div>

        <div class="m-h-1/4 my-4 flex h-auto w-full flex-col bg-transparent">
          <div class="-mb-2 -mt-8 flex h-2/3 min-h-64 flex-col bg-transparent lg:flex-row">
            <div class="m-2 min-h-44 bg-gray-500/30 border-2 border-yellow-300 text-white rounded-xl p-4 lg:w-1/3">
              <h1>{stories[6]["title"]}</h1>
              <p>{stories[6]["description"]}</p>
              <p>{stories[6]["content"]}</p>
            </div>
            <div class="m-2 min-h-44 bg-gray-500/30 border-2 border-yellow-300 text-white rounded-xl p-4 lg:w-1/3">
              <h1>{stories[7]["title"]}</h1>
              <p>{stories[7]["description"]}</p>
              <p>{stories[7]["content"]}</p>
            </div>
            <div class="m-2 min-h-44 bg-gray-500/30 border-2 border-yellow-300 text-white rounded-xl p-4 lg:w-1/3">
              <h1>{stories[8]["title"]}</h1>
              <p>{stories[8]["description"]}</p>
              <p>{stories[8]["content"]}</p>
            </div>
          </div>
          <div class="m-2 h-1/3 min-h-32 rounded-xl p-4 bg-gray-500/30 border-2 border-yellow-300 text-white">
            <h1>{stories[9]["title"]}</h1>
            <p>{stories[9]["description"]}</p>
            <p>{stories[9]["content"]}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopStories;
