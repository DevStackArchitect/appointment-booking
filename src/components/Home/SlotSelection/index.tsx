import styles from "./styles.module.scss";
import { TimeSlotResponse } from "@/actions/Appointo";
import { FC } from "react";
import { formatDateToDayMonth } from "@/components/utils/dateFormat";
import SlotCard from "@/components/Home/SlotCard";

interface Props {
  availableDates: TimeSlotResponse[] | null;
}
const SlotSelection: FC<Props> = ({ availableDates }) => {
  return (
    <div className={styles.wrapper}>
      {availableDates && availableDates.length > 0 ? (
        <div className={styles.listContainer}>
          {availableDates.map((availableDate, index) => {
            return (
              <div key={index}>
                <h3 className={styles.title}>
                  {formatDateToDayMonth(availableDate.date)} - Available Slots
                </h3>
                {availableDate.slots.length > 0 && (
                  <div className={styles.list}>
                    {availableDate.slots.map((slot, pointer) => {
                      return <SlotCard key={pointer + index} time={slot} date={availableDate.date} />;
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          Currently no slot available for selected date, please select another
          range of dates
        </div>
      )}
    </div>
  );
};
export default SlotSelection;
