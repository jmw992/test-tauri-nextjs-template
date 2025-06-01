"use client";
import { HISTORY, RECORD, SETTINGS } from "@/constants";
import { useZustandStore } from "@/lib/useZustandStore";
import type { Page } from "@/types";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import {
  Bars3Icon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import RecordingButton from "@/components/RecordingButton";
import { Toaster } from "@/components/ui/sonner";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const page = useZustandStore((state) => state.page);
  const setPage = useZustandStore((state) => state.setPage);

  const navigation: Page[] = [HISTORY, RECORD];

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
                    {navigation.map((name) => (
                      <button
                        key={name}
                        aria-current={name === page ? "page" : undefined}
                        type="button"
                        onClick={() => {
                          setPage(name);
                        }}
                        className={classNames(
                          name === page
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium",
                        )}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <RecordingButton />
                  <button
                    type="button"
                    className={classNames(
                      "relative rounded-full bg-gray-800 p-1 text-gray-400 ",
                      page === SETTINGS
                        ? "text-white ring-white ring-offset-2 ring-offset-gray-800 outline-hidden"
                        : "hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden",
                    )}
                    onClick={() => {
                      setPage(SETTINGS);
                    }}
                  >
                    <span className="absolute -inset-1.5" />
                    <Cog6ToothIcon
                      aria-current={page === SETTINGS ? "page" : undefined}
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
        </Disclosure>

        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <footer />
        <Toaster position="bottom-left" />
      </div>
    </>
  );
}
