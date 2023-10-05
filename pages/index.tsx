import { Check, Loader2 as ReloadIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenSquare, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import Hero from "@/components/Custom/Hero";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Head from "next/head";
interface SaleItem {
  sale_id: number;
  product_name: string;
  sale_date: string;
  customer_name: string;
  sale_amount: number;
}

const LoginPage = () => {
  const { isLoading } = useSessionContext();
  const user = useUser();
  const { toast } = useToast();
  const [tableData, setTableData] = useState<SaleItem[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [saleAmount, setSaleAmount] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showTick, setShowTick] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState<string>("");
  const getTableData = async () => {
    const { data, error } = await supabase
      .from("sales")
      .select("*")
      .order("sale_id", { ascending: false });
    if (error) console.log(error);
    if (data) setTableData(data);
  };

  useEffect(() => {
    getTableData();
  }, []);
  const supabaseClient = createClientComponentClient();
  useEffect(() => {
    const channel = supabaseClient
      .channel("realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sales",
        },
        () => {
          getTableData();
        }
      )
      .subscribe();
    return () => {
      console.log("unsubscribing");
      supabaseClient.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    setCurrentPlan(user?.user_metadata.user_role);
  }, [user]);
  if (isLoading) return <></>;
  if (!user) return <Hero />;
  return (
    <>
      <Head>
        <title>Dashboard | SaaS Sample App</title>
      </Head>
      <Card>
        <CardHeader>
          <CardTitle>
            Dashboard for{" "}
            {currentPlan === "individual" ? "Individual" : "Member"} Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <>
            {currentPlan === "individual" ? (
              <div>
                <div>
                  <p>
                    Since you are on the individual plan, you do not have access
                    to options like creating, editing and deleting sales.
                    <br /> Please upgrade to the member plan to access these
                    features.
                  </p>
                  <Link href="/profile">
                    <Button className="my-4 ">Upgrade</Button>
                  </Link>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((item) => (
                      <TableRow key={item.sale_id}>
                        <TableCell className="font-medium">
                          {item.sale_id}
                        </TableCell>
                        <TableCell>{item.product_name}</TableCell>
                        <TableCell>
                          {format(new Date(item.sale_date), "PPP")}
                        </TableCell>
                        <TableCell>{item.customer_name}</TableCell>
                        <TableCell>{item.sale_amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((item) => (
                    <TableRow key={item.sale_id}>
                      <TableCell className="font-medium">
                        {item.sale_id}
                      </TableCell>
                      <TableCell>{item.product_name}</TableCell>
                      <TableCell>
                        {format(new Date(item.sale_date), "PPP")}
                      </TableCell>
                      <TableCell>{item.customer_name}</TableCell>
                      <TableCell>{item.sale_amount}</TableCell>

                      <TableCell className="flex justify-end space-x-2 text-stone-400 text-sm">
                        <Dialog>
                          <DialogTrigger>
                            <PenSquare className="cursor-pointer text-stone-600 hover:text-stone-500" />
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                Edit Sale #{item.sale_id}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 mt-4">
                              <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label htmlFor="sale_id">Sale ID</Label>
                                  <Input
                                    defaultValue={item.sale_id}
                                    disabled
                                    id="width"
                                    className="col-span-2 h-8"
                                  />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label htmlFor="product_name">
                                    Product Name
                                  </Label>
                                  <Input
                                    id="width"
                                    className="col-span-2 h-8"
                                    defaultValue={item.product_name}
                                    onChange={(e) =>
                                      setProductName(e.target.value)
                                    }
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
                                          <span>Pick a date </span>
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={date ?? undefined}
                                        onSelect={setDate as any}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label htmlFor="sale_amount">
                                    Sale Amount
                                  </Label>
                                  <Input
                                    id="width"
                                    className="col-span-2 h-8"
                                    defaultValue={item.sale_amount}
                                    onChange={(e) => {
                                      setSaleAmount(e.target.value);
                                    }}
                                  />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <Label htmlFor="customer_name">
                                    Customer
                                  </Label>
                                  <Input
                                    id="width"
                                    className="col-span-2 h-8"
                                    defaultValue={item.customer_name}
                                    onChange={(e) =>
                                      setCustomerName(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                disabled={loading}
                                onClick={async () => {
                                  var updatedDate = null;
                                  if (date !== null) {
                                    updatedDate = new Date(date);
                                    updatedDate.setDate(
                                      updatedDate.getDate() + 1
                                    );
                                  }
                                  const objectToUpload = {
                                    product_name:
                                      productName === ""
                                        ? item.product_name
                                        : productName,
                                    sale_date:
                                      date === null
                                        ? item.sale_date
                                        : updatedDate,
                                    sale_amount:
                                      saleAmount === 0
                                        ? item.sale_amount
                                        : saleAmount,
                                    customer_name:
                                      customerName === ""
                                        ? item.customer_name
                                        : customerName,
                                  };
                                  setLoading(true);
                                  const { error } = await supabase
                                    .from("sales")
                                    .update(objectToUpload)
                                    .match({ sale_id: item.sale_id });
                                  if (error) console.log(error);
                                  setProductName("");
                                  setDate(null);
                                  setSaleAmount(0);
                                  setCustomerName("");
                                  getTableData();
                                  setShowTick(true);
                                  setTimeout(() => {
                                    setLoading(false);
                                    setShowTick(false);
                                    const crossButton =
                                      document.getElementsByClassName(
                                        "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                                      )[0] as HTMLButtonElement;
                                    crossButton?.click();
                                  }, 1000);
                                }}
                                className="w-full"
                              >
                                {showTick && (
                                  <>
                                    <Check /> Updated
                                  </>
                                )}
                                {loading && !showTick ? (
                                  <>
                                    <ReloadIcon className="animate-spin inline-block mr-2" />
                                  </>
                                ) : (
                                  ""
                                )}
                                {!loading && !showTick && "Update"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Trash2 className="cursor-pointer text-red-700 hover:text-red-600" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the record from the database.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={async () => {
                                  const { error } = await supabase
                                    .from("sales")
                                    .delete()
                                    .match({ sale_id: item.sale_id });
                                  if (error) console.log(error);
                                  getTableData();
                                }}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </>
        </CardContent>
      </Card>
      <button id="getTableDataButton" className="hidden" onClick={getTableData}>
        Get Table Data
      </button>
    </>
  );
};

export default LoginPage;
