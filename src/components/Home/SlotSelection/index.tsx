import styles from "./styles.module.scss";
import { TimeSlotResponse } from "@/actions/Appointo";
import { FC } from "react";
import { formatDateToDayMonth } from "@/components/utils/dateFormat";
import SlotCard from "@/components/Home/SlotCard";
import { useSelector } from "react-redux";
import { RootState } from "@/actions/store";

interface Props {}
const SlotSelection: FC<Props> = ({}) => {
  const availableSlots = useSelector(
    (state: RootState) => state.slot.availableSlots,
  );

  return (
    <div className={styles.wrapper}>
      {availableSlots && availableSlots.length > 0 ? (
        <div className={styles.listContainer}>
          {availableSlots?.map((availableDate, index) => {
            return (
              <div key={index}>
                <h3 className={styles.title}>
                  {formatDateToDayMonth(availableDate.date)} - Available Slots
                </h3>
                {availableDate.slots.length > 0 && (
                  <div className={styles.list}>
                    {availableDate.slots.map((slot, pointer) => {
                      return (
                        <SlotCard
                          key={pointer + index}
                          time={slot}
                          date={availableDate.date}
                        />
                      );
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
