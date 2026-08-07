import React from "react";
import { AdminLayout } from "../../../layouts";
import { AdminCalendarEvent } from "../../../components";

const CalendarEventPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminCalendarEvent />
    </AdminLayout>
  );
};

export default CalendarEventPage;
