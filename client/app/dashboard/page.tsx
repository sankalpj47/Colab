"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Page = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      {session?.user.name}
      {session?.user.image && (
        <Image src={session?.user.image} alt="image" height={50} width={50} />
      )}
    </div>
  );
};

export default Page;
