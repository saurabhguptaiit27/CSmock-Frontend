import React from "react";

const Home4 = () => {
  return (
    <section class="bg-gray-950">
      <div class="relative flex">
        <div class="min-h-screen lg:w-1/3"></div>
        <div class="hidden w-3/4 min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 h-screen  lg:block"></div>

        <div class="container flex flex-col justify-center w-full min-h-screen px-6 py-10 mx-auto lg:absolute lg:inset-x-0">
          <h1 class="text-2xl font-semibold text-gray-300 capitalize lg:text-3xl dark:text-white">
            What our <span class="text-yellow-500"> Users </span> are saying ...
          </h1>
          <div className="absolute right-10 top-10 font-serif text-9xl text-green-500">
            &#10077;
          </div>

          <div class="mt-10 lg:mt-20 lg:flex lg:items-center">
            <img
              class="object-cover object-center w-full lg:w-[32rem] rounded-lg h-96"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt=""
            />

            <div class="mt-8 lg:px-10 lg:mt-0">
              <h1 class="text-2xl font-semibold text-gray-300 lg:w-72">
                Help us improve our productivity
              </h1>

              <p class="max-w-lg mt-6 text-gray-400 dark:text-gray-400">
                “ Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Tempore quibusdam ducimus libero ad tempora doloribus expedita
                laborum saepe voluptas perferendis delectus assumenda rerum,
                culpa aperiam dolorum, obcaecati corrupti aspernatur a. ”
              </p>

              <h3 class="mt-6 text-lg font-medium text-green-500">
                Ronik Ederson
              </h3>
              <p class="text-gray-400">Marketing Manager at Stech</p>
            </div>
          </div>

          <div class="flex items-center justify-between mt-12 lg:justify-start">
            <button
              title="left arrow"
              class="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-yellow-400 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              title="right arrow"
              class="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100  lg:mx-6 hover:bg-yellow-400 hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home4;
