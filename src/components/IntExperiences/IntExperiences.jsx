import React from "react";

const IntExperiences = () => {
  return (
    <section class="bg-gray-950/95 mt-10">
      <div class="container px-6 py-10 mx-auto">
        <h1 class="text-2xl font-semibold text-center text-gray-300 capitalize lg:text-3xl ">
          What our <span class="text-green-500 ">clients</span> say
        </h1>

        <p class="max-w-2xl mx-auto mt-6 text-center text-gray-300 dark:text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt
          ex placeat modi magni quia error alias, adipisci rem similique, at
          omnis eligendi optio eos harum.
        </p>

        <section class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3">
          <div class="p-8 border rounded-lg hover:bg-green-700">
            <p class="leading-loose text-gray-300 ">
              “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
              quibusdam ducimus libero ad tempora doloribus expedita laborum
              saepe voluptas perferendis delectus assumenda rerum, culpa aperiam
              dolorum, obcaecati corrupti aspernatur a.”.
            </p>

            <div class="flex items-center mt-8 -mx-2">
              <img
                class="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt=""
              />

              <div class="mx-2">
                <h1 class="font-semibold text-yellow-500 ">Robert</h1>
                <span class="text-sm text-gray-400">
                  CTO, Robert Consultency
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default IntExperiences;
