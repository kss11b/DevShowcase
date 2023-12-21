import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classnames from "classnames";

type MenuItem = { name: string; value: T };

const SimpleDropdown = ({
  name,
  options,
  setValue,
}: {
  name: string;
  options: MenuItem[];
  setValue: (value: MenuItem["value"]) => void;
}) => {
  return (
    <Menu as='div' className='relative inline-block text-left mx-2'>
      <div>
        <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
          {name}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {options?.map((option: MenuItem) => (
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <a
                    href='#'
                    className={classnames("block px-4 py-2 text-sm text-gray-700", {
                      "bg-gray-100": active,
                      "text-gray-900": active,
                    })}
                    onClick={() => setValue(option.value)}
                  >
                    {option.name}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SimpleDropdown;
