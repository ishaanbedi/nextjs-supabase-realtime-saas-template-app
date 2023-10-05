import * as React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { format } from "date-fns";
import { Check, Loader2 as ReloadIcon } from "lucide-react";
import ConfettiExplosion from "react-confetti-explosion";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Bell, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const user = useUser();
  const { toast } = useToast();
  const { isLoading } = useSessionContext();
  const [sessionActive, setSessionActive] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const supabase = createPagesBrowserClient();
  const router = useRouter();
  const [date, setDate] = React.useState<Date>();
  const [productName, setProductName] = React.useState<string>();
  const [saleAmount, setSaleAmount] = React.useState<number>();
  const [customerName, setCustomerName] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showTick, setShowTick] = useState<boolean>(false);
  useEffect(() => {
    if (user) {
      getNotifications();
      setSessionActive(true);
    }
  }, [user]);
  const getNotifications = async () => {
    const { data, error } = await supabase
      .from("userNotifications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.log(error);
    } else {
      setNotifications(data);
    }
  };
  const supabaseClient = createClientComponentClient();
  useEffect(() => {
    const channel = supabaseClient
      .channel("realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "userNotifications",
        },
        () => {
          getNotifications();
        }
      )
      .subscribe();
    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [getNotifications, supabaseClient]);

  const handleSubmit = async () => {
    if (!productName) {
      toast({
        variant: "destructive",
        title: "Please enter a product name",
      });
      return;
    }
    if (!date) {
      toast({
        variant: "destructive",
        title: "Please select a date",
      });
      return;
    }
    if (!saleAmount) {
      toast({
        variant: "destructive",
        title: "Please enter a sale amount",
      });
      return;
    }
    if (!customerName) {
      toast({
        variant: "destructive",
        title: "Please enter a customer name",
      });
      return;
    }
    setLoading(true);
    var updatedDate = new Date(date);
    updatedDate.setDate(updatedDate.getDate() + 1);
    const { data, error } = await supabase.from("sales").insert([
      {
        product_name: productName,
        sale_date: updatedDate,
        sale_amount: saleAmount,
        customer_name: customerName,
      },
    ]);
    if (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
      setLoading(false);
      return;
    }
    toast({
      title: "Record created",
    });

    setShowTick(true);
    const button = document.getElementById(
      "getTableDataButton"
    ) as HTMLButtonElement;
    button.click();
    setTimeout(() => {
      setLoading(false);
      setShowTick(false);
      const crossButton = document.getElementsByClassName(
        "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
      )[0] as HTMLButtonElement;
      crossButton?.click();
      setDate(undefined);
      setProductName("");
      setSaleAmount(undefined);
      setCustomerName("");
    }, 1000);
  };
  return (
    <nav className="flex justify-between items-center py-4 px-8 text-stone-100">
      <div>
        <h1 className="text-2xl font-bold">
          <Link href="/">SaaS</Link>
        </h1>
      </div>
      <div className={`${sessionActive || isLoading ? "hidden" : "block"}`}>
        <div className={`lg:md:sm:flex space-x-8 hidden`}>
          <Link href="/#features">
            <Button variant="link" className="text-stone-100">
              View Features
            </Button>
          </Link>
          <Link href="#pricing">
            <Button variant="link" className="text-stone-100">
              Pricing
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="link" className="text-stone-100">
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <span className="block lg:md:sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-menu-deep"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 6h16"></path>
                <path d="M7 12h13"></path>
                <path d="M10 18h10"></path>
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sessionActive && (
                <>
                  <DropdownMenuItem
                    onClick={async () => {
                      router.push("/profile");
                    }}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      setLoadingLogout(true);
                      await supabase.auth.signOut();
                      router.reload();
                    }}
                  >
                    Log Out
                  </DropdownMenuItem>
                </>
              )}
              {(!sessionActive || !isLoading) && (
                <DropdownMenuItem>
                  <Link href="/login">Get Started</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
        <span className="hidden lg:md:sm:block">
          {!sessionActive && !isLoading && (
            <Link href="/login">
              <Button>Get Started</Button>
            </Link>
          )}
          {sessionActive && (
            <div className="space-x-4 flex items-center">
              <button>
                <Avatar>
                  <AvatarFallback>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Bell />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <ul>
                          {notifications.map((notification) => (
                            <DropdownMenuItem key={notification.id}>
                              <li className="rounded-md shadow-md py-4 mb-4">
                                <h2 className="font-semibold">
                                  {notification.title}
                                </h2>
                                <p className="text-stone-400 mb-2">
                                  {notification.desc}
                                </p>
                                <p className="text-gray-400">
                                  Posted on:{" "}
                                  {new Date(
                                    notification.created_at
                                  ).toLocaleString()}
                                </p>
                              </li>
                            </DropdownMenuItem>
                          ))}
                        </ul>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </AvatarFallback>
                </Avatar>
              </button>
              {user?.user_metadata.user_role === "member" && (
                <Sheet>
                  <SheetTrigger>
                    <Avatar>
                      <AvatarImage src={"/nonExistingImage.jpg"} />
                      <AvatarFallback>
                        <Plus />
                      </AvatarFallback>
                    </Avatar>
                  </SheetTrigger>
                  <SheetContent className="w-screen">
                    <SheetHeader>
                      <SheetTitle>Add a new record</SheetTitle>
                      <SheetDescription>
                        Add a new record to your database, and populate it with
                        a form, easy peasy.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 mt-4">
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="sale_id">Sale ID</Label>
                          <Input
                            disabled
                            id="width"
                            defaultValue="Auto generated"
                            className="col-span-2 h-8"
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="product_name">Product Name</Label>
                          <Input
                            id="width"
                            placeholder="Product Name"
                            defaultValue=""
                            className="col-span-2 h-8"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="sale_date">Sale Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "justify-start text-left",
                                  !date && "text-muted-foreground",
                                  "col-span-2 h-8"
                                )}
                              >
                                {date ? (
                                  format(date, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="sale_amount">Sale Amount</Label>
                          <Input
                            id="width"
                            placeholder="$120"
                            defaultValue=""
                            className="col-span-2 h-8"
                            value={saleAmount}
                            onChange={(e) => {
                              setSaleAmount(e.target.value as unknown as number);
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="customer_name">Customer</Label>
                          <Input
                            id="width"
                            placeholder="Customer Name"
                            defaultValue=""
                            className="col-span-2 h-8"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                          />
                        </div>
                        <div className="w-full mt-4">
                          <Button
                            disabled={loading}
                            onClick={() => {
                              handleSubmit();
                            }}
                            className="w-full"
                          >
                            {showTick && (
                              <>
                                <Check /> Created
                              </>
                            )}
                            {loading && !showTick ? (
                              <>
                                <ReloadIcon className="animate-spin inline-block mr-2" />
                              </>
                            ) : (
                              ""
                            )}
                            {!loading && !showTick && "Create"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
              <Link href="/profile">
                <button>
                  <Avatar className="">
                    <AvatarImage src={user?.user_metadata.avatar_url} />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                </button>
              </Link>
              <Button
                disabled={loadingLogout}
                onClick={async () => {
                  setLoadingLogout(true);
                  await supabase.auth.signOut();
                  router.reload();
                }}
              >
                Log Out
              </Button>
            </div>
          )}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
