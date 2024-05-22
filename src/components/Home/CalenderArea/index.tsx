import React, { FC, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/calender.scss";
import styles from "./styles.module.scss";
import { TimeSlotResponse } from "@/actions/Appointo";

interface Props {
  startDate: Date | null;
  endDate: Date | null;
  setDateRange: React.Dispatch<
    React.SetStateAction<[Date | null, Date | null]>
  >;
  availableDays?: TimeSlotResponse[] | null;
  onMonthChange: (date: Date) => void;
}

const CalenderArea: FC<Props> = ({
  startDate,
  endDate,
  setDateRange,
  availableDays,
  onMonthChange,
}) => {
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  useEffect(() => {
    if (availableDays) {
      const dates = availableDays.map((day) => new Date(day.date));
      setAvailableDates(dates);
    }
  }, [availableDays]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start && end && start.getTime() === end.getTime()) {
      setDateRange([start, start]);
    } else {
      setDateRange(dates);
    }
  };

  const isDateAvailable = (date: Date) => {
    return availableDates.some(
      (availableDate) =>
        availableDate.getDate() === date.getDate() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getFullYear() === date.getFullYear(),
    );
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Test Service</h2>
      <p className={styles.subTitle}>
        Timezone: <span>Asia/Calcutta</span>
      </p>
      <div className={styles.calenderContainer}>
        <DatePicker
          calendarClassName={"custom-calender"}
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          minDate={new Date()}
          filterDate={isDateAvailable}
          inline
          onMonthChange={onMonthChange}
        />
      </div>
    </div>
  );
};

export default CalenderArea;
