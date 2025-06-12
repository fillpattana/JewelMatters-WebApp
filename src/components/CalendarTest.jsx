import React, { useState } from "react";
export default function CalendarTest() {
  const [date, setDate] = useState(new Date());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{format(date, "PPP", { locale: th })}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50 bg-white">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
