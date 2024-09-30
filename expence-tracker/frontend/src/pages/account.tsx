import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import React from "react";
import { Plus } from "lucide-react";
import { AccountAll } from "@/components/accountAll";

export default function Account() {
  return (
    <div>
      <Header />
      <div className="flex  justify-between mt-4">
        <p className="text-lg font-semibold">Accounts Information</p>
        <div className="bg-slate-400 py-1 px-7 rounded-md hover:cursor-pointer">
          <Plus onClick={() => alert("hi developer")} />
        </div>
      </div>
      <AccountAll/>
    </div>
  );
}
