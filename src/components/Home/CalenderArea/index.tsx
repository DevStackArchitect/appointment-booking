import React, { FC, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/calender.scss";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/actions/store";
import {setAvailableSlots} from "@/reducers/slotSlice";

interface Props {
  onMonthChange: (date: Date) => void;
}

const CalenderArea: FC<Props> = ({ onMonthChange }) => {
  const dispatch = useDispatch();
  const today = new Date();
  const availableDays = useSelector(
      (state: RootState) => state.slot.availableDays,
  );
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    today,
    today,
  ]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (startDate && endDate) {
      const dates = [];
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const slotsByDate = dates.reduce((acc, date) => {
        const day = availableDays.find(day => {
          const availableDate = new Date(day.date);
          return (
              availableDate.getDate() === date.getDate() &&
              availableDate.getMonth() === date.getMonth() &&
              availableDate.getFullYear() === date.getFullYear()
          );
        });

        if (day) {
          acc.push({
            date: day.date,
            slots: day.slots,
          });
        }

        return acc;
      }, [] as { date: string; slots: { start_time: string; end_time: string }[] }[]);

      dispatch(setAvailableSlots(slotsByDate));
    }
  }, [startDate, endDate, availableDays, dispatch]);

  const isDateAvailable = (date: Date) => {
    return availableDays.some(
        (availableDay) => {
          const availableDate = new Date(availableDay.date);
          return (
              availableDate.getDate() === date.getDate() &&
              availableDate.getMonth() === date.getMonth() &&
              availableDate.getFullYear() === date.getFullYear()
          );
        }
    );
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
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
