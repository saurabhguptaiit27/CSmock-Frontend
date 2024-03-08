import React from "react";

const User = ({ handleLogoutButton }) => {
  return (
    <div class="float-right mt-10">
      <div
        class="bg-white end-0 z-10  w-55 rounded-md border border-black shadow-lg mr-5 text-left fixed"
        role="menu"
      >
        <div class="p-2">
          <a
            href="#"
            class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            View on Storefront
          </a>

          <a
            href="#"
            class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            View Warehouse Info
          </a>

          <a
            href="#"
            class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            Duplicate Product
          </a>

          <a
            href="#"
            class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            Unpublish Product
          </a>

          <form method="POST" action="#">
            <button
              type="submit"
              onClick={() => handleLogoutButton()}
              class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
              role="menuitem"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
