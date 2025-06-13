import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { th } from "date-fns/locale";

export default function CalendarTest() {
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
  return (
    <PopoverTrigger asChild>
      <Button>Click</Button>
    </PopoverTrigger>
  );
}
