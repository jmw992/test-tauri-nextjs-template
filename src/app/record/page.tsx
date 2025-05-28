"use client";
import { FileDialog } from "@/components/FileDialog";
import { RoundedButton } from "@/components/RoundedButton";
import { invoke } from "@tauri-apps/api/core";
import Image from "next/image";
import { useCallback, useState } from "react";

export default function Home() {
  const [greeted, setGreeted] = useState<string | null>(null);
  const [gudgitzed, setGudgitzed] = useState<string | null>(null);
  const greet = useCallback((): void => {
    invoke<string>("greet")
      .then((s) => {
        setGreeted(s);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }, []);
  const gudgitz = useCallback((): void => {
    invoke<string>("gudgitz")
      .then((s) => {
        setGudgitzed(s);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h2>Record</h2>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        <div className="flex flex-col gap-2 items-start">
          <FileDialog title={"Open Me"} />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <RoundedButton onClick={greet} title='Call "greet" from Rust' />
          <p className="break-words w-md">
            {greeted ?? "Click the button to call the Rust function"}
          </p>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <RoundedButton onClick={gudgitz} title='Call "gudgitz" from Rust' />
          <p className="break-words w-md">
            {gudgitzed ?? "Click the button to call the Rust function"}
          </p>
        </div>
      </main>
    </div>
  );
}
