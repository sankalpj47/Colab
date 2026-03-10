"use client";
import { useToast } from "@/context/ToastContext";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const { error, success } = useToast()
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false })
      success("Logged out successfully.")
      setTimeout(() => {
        router.replace("/auth/login");
      }, 1500);
    } catch {
      error("Error signing out, try again.")
    }
  }
  return (
    <div>
      {session?.user.name}
      {session?.user.image && (
        <Image src={session?.user.image} alt="image" height={50} width={50} />
      )}
      <button className="px-6 py-4 rounded-md text-white" onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default Page;
