// import React, { useState } from "react";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { Button } from "@/components/ui/button";
// import { format } from "date-fns";
// import { th } from "date-fns/locale";

// export default function CalendarTest() {
// const [date, setDate] = useState(new Date());
// const [open, setOpen] = useState(false);
// const handleSelect = (selectedDate) => {
//   if (selectedDate) {
//     setDate(selectedDate);
//     setOpen(false); // Close popover only after a date is selected
//   }
// };
// return (
//   <Popover open={open} onOpenChange={setOpen}>
//     <PopoverTrigger asChild>
//       <Button variant="outline" onClick={() => setOpen(!open)}>
//         {format(date, "PPP", { locale: th })}
//       </Button>
//     </PopoverTrigger>
//     <PopoverContent className="w-auto p-0 z-50 bg-white">
//       <Calendar
//         mode="single"
//         selected={date}
//         onSelect={handleSelect}
//         initialFocus
//       />
//     </PopoverContent>
//   </Popover>
// );
// }

//installed new dependencies

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
