"use client";

import { HISTORY, RECORD, SETTINGS } from "@/constants";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  Cog6ToothIcon,
  XMarkIcon,
  PlayIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(
    false,
  );

  useEffect(() => {
    setIsRecording(window && window?.localStorage?.getItem("isRecording") === "true");
  }, []);
  const navigation = [
    {
      name: HISTORY,
      href: `/${HISTORY.toLowerCase()}`,
      current: pathname.endsWith(HISTORY.toLowerCase()),
    },
    {
      name: RECORD,
      href: `/${RECORD.toLowerCase()}`,
      current: pathname.endsWith(RECORD.toLowerCase()),
    },
  ];
  const settings = {
    name: SETTINGS,
    href: `/${SETTINGS.toLowerCase()}`,
    current: pathname.endsWith(SETTINGS.toLowerCase()),
  };

  const recordingHandler = () => {
    setIsRecording((current) => {
      window.localStorage.setItem("isRecording", `${current}`);
      return !current;
    });
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="size-8"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium",
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                    onClick={recordingHandler}
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    {isRecording ? <StopIcon className="size-6 text-red-500" /> : <PlayIcon stroke="green" className="size-6" /> }
                  </button>
                  <button
                    type="button"
                    className={classNames(
                      "relative rounded-full bg-gray-800 p-1 text-gray-400 ",
                      settings.current
                        ? "text-white ring-white ring-offset-2 ring-offset-gray-800 outline-hidden"
                        : "hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden",
                    )}
                    onClick={() => {
                      router.push(settings.href);
                    }}
                  >
                    <span className="absolute -inset-1.5" />
                    <Cog6ToothIcon
                      aria-current={settings.current ? "page" : undefined}
                      aria-label={SETTINGS}
                      className="size-6"
                    />
                  </button>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-open:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-open:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium",
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
              <DisclosureButton
                as="a"
                href={"#"}
                aria-current={settings.current ? "page" : undefined}
                className={classNames(
                  settings.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium",
                )}
              >
                {SETTINGS}
              </DisclosureButton>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
