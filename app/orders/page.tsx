"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { dummyOrderData, OrderItem } from "./dummyOrderData";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddOrderForm, {
  AddOrderFormHandle,
} from "@/app/orders/form/addOrder.form";
import { useRef, useState } from "react";
import { capitalize, cn } from "@/lib/utils";
import { useGetOrdersQuery } from "@/features/ApiSlice/orderSlice";

type OrderData = {
  date: String,
  dueDate: String;
  client_name: string;
  status: "COMPLETED" | "PENDING" | "IN-PROCESS";
  candies: [];
  quantity_candies : [];
};

const OrdersPage = () => {
  const addOrderFormRef = useRef<AddOrderFormHandle>(null);

  const {data, isLoading, error}  = useGetOrdersQuery({});
  const orders : OrderData[] = data
  console.log(orders);
  const [orderDetailsDialog, setOrderDetailsDialog] = useState<
    Array<OrderItem> | undefined
  >(undefined);

  return (
    <div className={"flex flex-col w-full gap-2"}>
      <Card className={"w-full"}>
        <CardContent className={"py-2 px-6 flex items-center justify-between"}>

          <div className="relative flex items-center max-w-md rounded-full my-2">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Your search..." className="rounded-full pl-8" />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"secondary"}>Add Item</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Order</DialogTitle>
                <DialogDescription>Add an order to queue</DialogDescription>
              </DialogHeader>
              <AddOrderForm
                ref={addOrderFormRef}
                onSubmit={(values) => {
                  console.log(values);
                }}
              />
              <DialogFooter>
                <DialogClose asChild={true}>
                  <Button variant={"ghost"}>Cancel</Button>
                </DialogClose>
                <Button
                  variant={"secondary"}
                  onClick={(e) => {
                    e.preventDefault();
                    addOrderFormRef.current?.submit();
                  }}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card className={"w-full"}>
        <CardContent className={"p-2"}>
          <Dialog
            open={!!orderDetailsDialog}
            onOpenChange={(open) => !open && setOrderDetailsDialog(undefined)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>
                  <Table className={"w-full"}>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Candy Type</TableHead>
                        <TableHead>Quantity</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {orderDetailsDialog?.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{item.candyType}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Table className={"h-full w-full"}>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order Id</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>

                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((data, index) => (
                <TableRow
                  key={index}
                  onClick={() =>
                    setOrderDetailsDialog(
                      data.candies && data.candies.length > 0
                        ? data.candies
                        : undefined,
                    )
                  }
                >
                  <TableCell className="font-medium">{"7894"}</TableCell>
                  <TableCell>{data.client_name}</TableCell>
                  <TableCell>{`${data.date}`}</TableCell>
                  <TableCell>{`${data.dueDate}`}</TableCell>
                  <TableCell>
                    <div
                      className={cn(
                        "max-w-max px-4 py-0.5 text-white rounded-sm",
                        data.status == "COMPLETED"
                          ? "bg-green-500"
                          : data.status == "IN-PROCESS"
                            ? "bg-orange-500"
                            : "bg-red-500",
                      )}
                    >
                      {capitalize(data.status)}
                    </div>
                  </TableCell>

                  <TableCell>
                    <ArrowRight strokeWidth={1} className={"text-secondary"} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrdersPage;
