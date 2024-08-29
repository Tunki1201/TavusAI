"use client"
import { useState } from "react";
import Call from "./components/Call";
import Create from "./components/Create";

export default function Home() {
  const [room, setRoom] = useState<string | null>('')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#2e3e57]">

      {room ? (
        <Call
          room={room}
          setRoom={setRoom}
        />
      ) : (
        <div className="flex flex-col items-center justify-center w-2/4 rounded-xl bg-white px-24 pt-12 pb-24">
          <div className="flex items-center justify-center mb-12">
            <span style={{ fontSize: '24px' }}>
              Talk with SportAI
            </span>
          </div>
          <Create
            setRoom={setRoom}
          />
        </div>
      )}
    </main>
  );
}
