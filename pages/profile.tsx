import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const user = useUser();
  const supabaseClient = createClientComponentClient();

  useEffect(() => {
    if (user) {
      setSessionActive(true);
    }
  }, [user]);
  const router = useRouter();
  if (!sessionActive) {
    return (
      <div className="text-center pt-12">
        <p className="py-3 text-2xl">You are not signed in</p>
        <Button
          onClick={() => {
            router.push("/login");
          }}
        >
          Sign in
        </Button>
      </div>
    );
  } else {
    return (
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <Head>
          <title>Profile | SaaS Sample App</title>
        </Head>
        <h1 className="text-4xl font-bold ">Profile</h1>
        <p className="pt-12">
          You are currently a user on the{" "}
          {user?.user_metadata.user_role === "individual" ? (
            <span className="font-bold text-yellow-500">INDIVIDUAL </span>
          ) : (
            <span className="font-bold text-yellow-500">MEMBER </span>
          )}
          plan.
        </p>
        <Button
          className="mt-4"
          onClick={async () => {
            const { data, error } = await supabaseClient.auth.updateUser({
              data: {
                user_role:
                  user?.user_metadata.user_role === "individual"
                    ? "member"
                    : "individual",
              },
            });
            if (error) {
              console.log(error);
            } else {
              console.log(data);
            }
          }}
        >
          Switch to{" "}
          {user?.user_metadata.user_role === "individual"
            ? "member"
            : "individual"}
        </Button>
      </div>
    );
  }
};

export default Profile;