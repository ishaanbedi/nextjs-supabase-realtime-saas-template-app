import { useToast } from "@/components/ui/use-toast";
import { Github, Loader2, Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import Head from "next/head";
const LoginPage = () => {
  const user = useUser();
  const supabase = createPagesBrowserClient();
  const [sessionActive, setSessionActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typedEmail, setTypedEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      setSessionActive(true);
    }
  }, [user]);
  const handleLogin = async () => {
    if (typedEmail === "") {
      toast({
        variant: "destructive",
        title: "Please fill in your email.",
      });
    }
    if (resendCooldown > 0) {
      toast({
        variant: "destructive",
        title: `Please wait ${resendCooldown} seconds before resending.`,
      });
      return;
    }
    setLoading(true);
    const regex = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    if (!regex.test(typedEmail)) {
      toast({
        variant: "destructive",
        title: "Please enter a valid email.",
      });
      setLoading(false);
      return;
    }
    const { data, error } = await supabase.auth.signInWithOtp({
      email: typedEmail,
      options: {
        data: {
          user_role: "individual",
        },
      },
    });

    if (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "An error occurred. Please try again.",
      });
    } else {
      setResendCooldown(30);
      const countdownInterval = setInterval(() => {
        setResendCooldown((prevCooldown) => prevCooldown - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdownInterval);
        setResendCooldown(0);
      }, 30000);

      toast({
        title: "Email sent.",
        description: "Check your email for the login link.",
      });
    }
    setLoading(false);
  };
  if (!sessionActive) {
    return (
      <div>
        <Head>
          <title>Login | SaaS Sample App</title>
        </Head>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <form
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>
                    Get started today, for free.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Input
                      className="border-stone-500 active:border-stone-500 outline-none ring-0"
                      type="email"
                      placeholder="Email"
                      value={typedEmail}
                      onChange={(e) => setTypedEmail(e.target.value)}
                    />

                    <Button
                      disabled={loading || resendCooldown > 0}
                      className="w-full my-3"
                      onClick={handleLogin}
                    >
                      {resendCooldown ? (
                        `Resend in ${resendCooldown}s`
                      ) : (
                        <>
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            </>
                          ) : (
                            <>
                              Send me a Magic Link{" "}
                              <Send className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    router.push("/");
  }
};

export default LoginPage;
