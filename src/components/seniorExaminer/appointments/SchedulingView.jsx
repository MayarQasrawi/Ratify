"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SingleAppointmentForm from "./SingleAppointmentForm";
import MultipleAppointmentsForm from "./MultipleAppointmentsForm";
import { FaUserClock, FaUsers } from "react-icons/fa";
import Lottie from "lottie-react";
import appoinment from "@/assets/img/animation/appointment.json";


export default function SchedulingView() {
  const [activeTab, setActiveTab] = useState("single");



  return (
    <div className="container mx-auto lg:grid grid-cols-2  gap-8 max-w-5xl  font-sans bg-[var(--sidebar-bg)] mt-10 rounded-lg shadow-md  border border-[var(--table-border)]">
      <main className="py-8 px-8">
        <h1 className="text-2xl font-bold mb-6 ">Schedule Appointments</h1>

        <Tabs
          defaultValue="single"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full cursor-pointer   "
        >
          <TabsList className="flex flex-col sm:flex-row w-full mb-8  md:bg-gray-200/40 dark:bg-[var(--sidebar-icon-bg)] space-y-2 sm:space-y-0 sm:space-x-2">
            <TabsTrigger
              value="single"
              className="flex  items-center justify-center space-x-2 "
            >
              Single Appointment
            </TabsTrigger>

            <TabsTrigger
              value="multiple"
              className="flex items-center justify-center space-x-2 cursor-pointer"
            >
              Multiple Appointments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="single">
            <SingleAppointmentForm  />
          </TabsContent>

          <TabsContent value="multiple">
            <MultipleAppointmentsForm />
          </TabsContent>
        </Tabs>
      </main>

      <section className="hidden lg:flex  items-start justify-center bg-gray-200/40  dark:dark:bg-[var(--sidebar-bg)] rounded-r-lg ">
        <Lottie
          animationData={appoinment}
          loop={true}
          style={{ width: "400px", height: "560px" }}
        />
      </section>
    </div>
  );
}
