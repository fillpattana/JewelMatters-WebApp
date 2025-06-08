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
import { DatePicker } from "@/components/ui/datepicker";
import { EmployeeCombobox } from "@/components/ui/employeecombobox";

// Replace with real employee data if needed
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
          {/* Timeline-like vertical form */}
          <div className="flex flex-col gap-5 border-l-2 border-gray-300 pl-4 relative">
            {/* Store name */}
            <StepMarker label="ชื่อร้านค้า">
              <Input
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="กรุณากรอกชื่อร้านค้า"
              />
            </StepMarker>

            {/* Start Date */}
            <StepMarker label="วันที่เริ่มต้น">
              <DatePicker date={startDate} setDate={setStartDate} />
            </StepMarker>

            {/* End Date */}
            <StepMarker label="วันที่สิ้นสุด">
              <DatePicker date={endDate} setDate={setEndDate} />
            </StepMarker>

            {/* Employee */}
            <StepMarker label="พนักงานที่รับผิดชอบ">
              <EmployeeCombobox
                employees={employeeList}
                value={selectedEmployee}
                setValue={setSelectedEmployee}
              />
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
