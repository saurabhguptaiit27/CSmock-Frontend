import React from "react";
import { MdOutlineSmsFailed } from "react-icons/md";

const SigninFailed = () => {
  return (
    <div class="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div class="flex items-center justify-center w-12 bg-emerald-500">
        <MdOutlineSmsFailed />
      </div>

      <div class="px-4 py-2 -mx-3">
        <div class="mx-3">
          <span class="font-semibold text-red-500">Failed</span>
          <p class="text-sm text-gray-600 ">
            You Are Not Logged In Yet
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninFailed;
