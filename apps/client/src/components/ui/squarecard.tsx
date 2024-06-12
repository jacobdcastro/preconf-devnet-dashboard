import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Preconf } from "@/models/preconf"
import { FC } from "react"


interface Props extends Preconf {}
  
const SquareCard: FC<Props> = ({proposerPubKey = "0x123ab...4567c", slotNumber = 43}) => {
    return (
      <Card className="my-4">
        <CardHeader className="pb-2">
          <CardDescription>Proposer</CardDescription>
          <CardTitle className="text-4xl">{proposerPubKey}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">At slot {slotNumber}</div>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    )
  }

export default SquareCard;
