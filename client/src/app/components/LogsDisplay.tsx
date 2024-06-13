import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ApiDataContext } from "../page";

export const LogsDisplay = ({title}) => {
  const data = useContext(ApiDataContext);

  const preconfTxns = data?.preconfTxns;

  return (
    <div className='flex'>
      <Card className="mt-4 h-full">
        <CardHeader>
          <h2 className="text-base font-semibold leading-6 mx-3 my-0 text-gray-200">
            {title} Preconfirmations 
          </h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead className="w-[100px]">Timestamp</TableHead>
                  <TableHead>Txhash</TableHead>
                  <TableHead>Slot</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Included?</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {preconfTxns
                  ? preconfTxns.map((pre, index) => (
                      <TableRow key={index} className="border-zinc-800">
                        <TableCell
                          className={cn("bg-zinc-800 p-2", {
                            "bg-zinc-900": index % 2 === 0,
                          })}
                        >
                           {pre.timestamp ? new Date(pre.timestamp).toLocaleTimeString(): null}
                        </TableCell>
                        <TableCell
                         
                          className={cn("bg-zinc-800 p-2", {
                            "bg-zinc-900": index % 2 === 0,
                          })}
                        >
                          {pre.tx_hash}
                        </TableCell>
                        <TableCell
                          key={'previous' + index}
                          className={cn("bg-zinc-800 p-2", {
                            "bg-zinc-900": index % 2 === 0,
                          })}
                        >
                          {pre.slot}
                        </TableCell>
                        <TableCell
                         
                          className={cn("bg-zinc-800 p-2", {
                            "bg-zinc-900": index % 2 === 0,
                          })}
                        >
                          <Badge variant="outline">
                            {pre.requested
                              ? "Received"
                              : pre.preconfirmed
                              ? "Preconfirmed"
                              : "Unknown"}
                          </Badge>
                        </TableCell>
                        <TableCell
                         
                          className={cn("bg-zinc-800 p-2", {
                            "bg-zinc-900": index % 2 === 0,
                          })}
                        >
                          <Badge
                            variant="default"
                            className={cn({
                              "bg-yellow-400": !pre.included,
                              "bg-green-600": pre.included,
                            })}
                          >
                            {pre.included ? "Included" : "Awaiting"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LogsDisplay;
