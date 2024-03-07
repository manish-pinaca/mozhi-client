import React from "react";

import { Feature } from "./Features";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ICardProps {
  feature: Feature;
}

const Card: React.FC<ICardProps> = ({ feature }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="transition hover:-translate-y-3 font-medium lg:font-light lg:hover:font-bold cursor-pointer">
            <div className="w-80 h-64 rounded-[20px] bg-white"></div>
            <p className="w-64 m-auto text-xl lg:text-2xl text-center text-[#575757] mt-3">
              {feature.label}
            </p>
          </div>
        </DialogTrigger>
        <DialogContent className="lg:min-w-[1144px] lg:rounded-[25px] rounded-[16px] bg-[#F5F4F8]">
          <div className="mt-4 lg:w-3/4 w-11/12 m-auto flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="flex items-center gap-4">
                <p className="lg:text-2xl text-xl font-medium">
                  Choose Source:
                </p>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="te">te</SelectItem>
                    <SelectItem value="en">en</SelectItem>
                    <SelectItem value="fr">fr</SelectItem>
                    <SelectItem value="pa">pa</SelectItem>
                    <SelectItem value="mr">mr</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <p className="lg:text-2xl text-xl font-medium">
                  Choose Target:
                </p>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English(en)</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                    <SelectItem value="option4">Option 4</SelectItem>
                    <SelectItem value="option5">Option 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {feature.id !== 1 && (
              <>
                <div className="flex items-center gap-4">
                  <p className="lg:text-2xl text-xl font-medium lg:w-1/3 w-[180px]">
                    Upload file:
                  </p>
                  <Input id="file" type="file" />
                </div>

                <div className="flex items-center gap-4">
                  <p className="lg:text-2xl text-xl font-medium lg:w-1/3 w-[180px]">
                    Column Name:
                  </p>
                  <Input
                    type="text"
                    id="columnName"
                    placeholder="Enter column name"
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button className="px-20 py-6 bg-[#D0D0FF] text-[#575757] text-xl m-auto hover:bg-[#8F6EFE] hover:text-white font-bold">
              Next
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Card;
