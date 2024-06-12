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
  value?: string;
}
  
const SquareCard: FC<Props> = ({title, value}) => {
    return (
      <Card className="my-4">
        <CardHeader className="pb-2">
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-4xl">{value}</CardTitle>
        </CardHeader>
        {/* <CardContent>
          <div className="text-xs text-muted-foreground">At slot {slotNumber}</div>
        </CardContent>
        <CardFooter>
        </CardFooter> */}
      </Card>
    )
  }

export default SquareCard;
