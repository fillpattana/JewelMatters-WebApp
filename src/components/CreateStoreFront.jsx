import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample employees
const employeeList = [
  { value: "john", label: "John" },
  { value: "jane", label: "Jane" },
  { value: "mike", label: "Mike" },
];

export default function CreateStoreFront({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [memo, setMemo] = useState("");
  const [datePopover, setDatePopover] = useState({ start: false, end: false });
  const [employeePopover, setEmployeePopover] = useState(false);

  const handleSubmit = () => {
    onCreate?.({
      name: storeName,
      startDate,
      endDate,
      employee: selectedEmployee,
      memo,
    });
    setOpen(false);
    setStoreName("");
    setStartDate(null);
    setEndDate(null);
    setSelectedEmployee("");
    setMemo("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#192F7B] hover:bg-[#16296b] text-white">
          สร้างหน้าร้านใหม่
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>สร้างหน้าร้านใหม่</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col gap-5 border-l-2 border-gray-300 pl-4 relative">
            {/* Store Name */}
            <StepMarker label="ชื่อร้านค้า">
              <Input
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="กรุณากรอกชื่อร้านค้า"
              />
            </StepMarker>

            {/* Start Date */}
            <StepMarker label="วันที่เริ่มต้น">
              <Popover
                open={datePopover.start}
                onOpenChange={(open) =>
                  setDatePopover((prev) => ({ ...prev, start: open }))
                }
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate
                      ? format(startDate, "yyyy-MM-dd")
                      : "เลือกวันที่เริ่มต้น"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      setStartDate(date);
                      setDatePopover((prev) => ({ ...prev, start: false }));
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </StepMarker>

            {/* End Date */}
            <StepMarker label="วันที่สิ้นสุด">
              <Popover
                open={datePopover.end}
                onOpenChange={(open) =>
                  setDatePopover((prev) => ({ ...prev, end: open }))
                }
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate
                      ? format(endDate, "yyyy-MM-dd")
                      : "เลือกวันที่สิ้นสุด"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => {
                      setEndDate(date);
                      setDatePopover((prev) => ({ ...prev, end: false }));
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </StepMarker>

            {/* Employee */}
            <StepMarker label="พนักงานที่รับผิดชอบ">
              <Popover open={employeePopover} onOpenChange={setEmployeePopover}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {selectedEmployee
                      ? employeeList.find(
                          (emp) => emp.value === selectedEmployee
                        )?.label
                      : "เลือกพนักงาน"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="ค้นหาพนักงาน..." />
                    <CommandEmpty>ไม่พบพนักงาน</CommandEmpty>
                    <CommandGroup>
                      {employeeList.map((emp) => (
                        <CommandItem
                          key={emp.value}
                          value={emp.value}
                          onSelect={(currentValue) => {
                            setSelectedEmployee(currentValue);
                            setEmployeePopover(false);
                          }}
                        >
                          {emp.label}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              selectedEmployee === emp.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </StepMarker>

            {/* Memo */}
            <StepMarker label="บันทึกช่วยจำ">
              <Textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="หมายเหตุเพิ่มเติม"
              />
            </StepMarker>
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button
            onClick={handleSubmit}
            className="w-full bg-[#06C755] text-white hover:bg-green-600"
          >
            สร้างหน้าร้าน
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StepMarker({ label, children }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-[-11px] top-1.5 w-3 h-3 bg-blue-600 rounded-full"></div>
      <Label className="mb-1 block">{label}</Label>
      {children}
    </div>
  );
}
