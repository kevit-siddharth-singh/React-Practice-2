/* eslint-disable react/prop-types */
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect } from "react";

export default function Dropdown({ selected, value }) {
  const setSelectedLanguage = (e) => {
    // console.log(e.target.innerText)
    selected(e.target.innerText);
  };

  return (
    <Menu as="div" className="relative inline-block text-left  w-full">
      <div>
        <MenuButton className="inline-flex w-full poppins justify-center gap-x-1.5 rounded-md bg-[#1F2937] px-3 py-[0.6rem] text-sm font-semibold text-white shadow-sm hover:ring-1 ring-inset hover:ring-gray-300 hover:bg-gray-700 ">
          {value || "Language"}
          {/* <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" /> */}
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#1F2937] shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <p
              onClick={setSelectedLanguage}
              className="block px-4 py-2 text-sm text-white data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Javascript
            </p>
          </MenuItem>
          <MenuItem>
            <a
              onClick={setSelectedLanguage}
              href="#"
              className="block px-4 py-2 text-sm text-white data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Python
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
