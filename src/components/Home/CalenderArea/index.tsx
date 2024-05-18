import React, { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/calender.scss";
import styles from "./styles.module.scss";

interface Props {
  startDate: Date | null;
  endDate: Date | null;
  setDateRange: React.Dispatch<
    React.SetStateAction<[Date | null, Date | null]>
  >;
}

const CalenderArea: FC<Props> = ({ startDate, endDate, setDateRange }) => {
    const handleDateChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        if (start && end && start.getTime() === end.getTime()) {
            setDateRange([start, start]);
        } else {
            setDateRange(dates);
        }
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
          inline
        />
      </div>
    </div>
  );
};

export default CalenderArea;
