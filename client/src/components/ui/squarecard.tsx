import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { FC } from "react"
import { ISlot } from "@/models/preconf"

interface Props extends ISlot {
  title?: string;
  value?: any;
}
  
const SquareCard: FC<Props> = ({title, value}) => {
    return (
      <Card className="p-2">
        <CardHeader className="py-2">
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl">{value}</CardTitle>
        </CardHeader>
  
      </Card>
    )
  }

export default SquareCard;
