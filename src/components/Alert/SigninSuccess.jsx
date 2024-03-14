import React from "react";

import { MdOutlineCancel } from "react-icons/md";

const SigninSuccess = () => {


  return (
    <div class="fixed top-16 flex left-20 w-auto max-w-lg overflow-hidden bg-white rounded-lg">
      <div class="flex items-center justify-center w-12  bg-emerald-500">
        <svg
          class="w-6 h-6 text-white fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
        </svg>
      </div>
      <div class="w-auto px-4 py-2 -mx-3">
        <div class="mx-3">
          <span class="font-semibold text-emerald-500 dark:text-emerald-400">
            Success
          </span>
          <p class="text-sm text-gray-600 dark:text-gray-200">
            You Are Already Logged In
          </p>
        </div>
      </div>
      <button
        onClick={handleSigninAlertCancelButton}
        className="absolute right-0 items-center text-2xl text-red-900 active:text-black "
      >
        <MdOutlineCancel />
      </button>
    </div>
  );
};

export default SigninSuccess;
