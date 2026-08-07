import React from "react";
import { UsersLayout } from "../../../layouts";
import { CalendarEvent } from "../../../components";

const PublicCalendarPage: React.FC = () => {
  return (
    <UsersLayout>
      <div className="pt-20">
        <CalendarEvent />
      </div>
    </UsersLayout>
  );
};

export default PublicCalendarPage;
