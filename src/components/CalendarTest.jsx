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

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Calendar22() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(undefined);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Date of birth
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <span className="ml-2">▼</span> {/* Simple down arrow */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
