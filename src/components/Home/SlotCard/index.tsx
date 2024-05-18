import React, { FC } from "react";
import { Slot } from "@/actions/Appointo";
import { formatTimeRange } from "@/components/utils/dateFormat";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectSlot } from "@/reducers/slotSlice";
import { RootState } from "@/actions/store";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  time: Slot;
  date: string;
}

const SlotCard: FC<Props> = ({ time, date }) => {
  const dispatch = useDispatch();
  const selectedSlot = useSelector(
      (state: RootState) => state.slot.selectedSlot
  );

  const formattedTimeRange = formatTimeRange(time.start_time, time.end_time);

  const handleSlotSelect = () => {
    dispatch(selectSlot({ date, slot: time }));
  };

  const isActive =
      selectedSlot?.date === date &&
      selectedSlot?.slot.start_time === time.start_time;

  return (
      <motion.article
          className={`${styles.wrapper} ${isActive ? styles.active : ""}`}
          onClick={handleSlotSelect}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
      >
        <p>{formattedTimeRange}</p>
        <AnimatePresence>
          {isActive && (
              <motion.img
                  src="/images/circle-check.svg"
                  alt="Selected"
                  className={styles.checkIcon}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
              />
          )}
        </AnimatePresence>
      </motion.article>
  );
};

export default SlotCard;
