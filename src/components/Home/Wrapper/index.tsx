import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import PrimaryButton from "@/components/Shared/Button/Primary";
import CalenderArea from "@/components/Home/CalenderArea";
import { getTimeSlots, TimeSlotResponse } from "@/actions/Appointo";
import SlotSelection from "@/components/Home/SlotSelection";
import { formatDate } from "@/components/utils/dateFormat";
import { RootState } from "@/actions/store";
import { setAvailableDays, addAvailableDays } from "@/reducers/slotSlice";

const HomeWrapper = () => {
  const dispatch = useDispatch();
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const selectedSlot = useSelector(
    (state: RootState) => state.slot.selectedDates,
  );

  const availableDays = useSelector(
    (state: RootState) => state.slot.availableDays,
  );

  useEffect(() => {
    if (startOfMonth && endOfMonth) {
      getAvailableDaysForBooking(startOfMonth, endOfMonth);
    }
  }, []);

  const getAvailableDaysForBooking = async (start: Date, end: Date) => {
    try {
      const formattedStartDate = formatDate(start.toISOString()) as string;
      const formattedEndDate = formatDate(end.toISOString()) as string;
      const payload = { start: formattedStartDate, end: formattedEndDate };

      const response = await getTimeSlots(payload);
      if (response) {
        const formattedResponse = response.map((day) => ({
          date: day.date,
          slots: day.slots,
        }));
        const uniqueDates = formattedResponse.filter(
          (day) =>
            !availableDays.some((existingDay) => existingDay.date === day.date),
        );
        dispatch(addAvailableDays(uniqueDates));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleMonthChange = (date: Date) => {
    const startOfNewMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfNewMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    getAvailableDaysForBooking(startOfNewMonth, endOfNewMonth);
  };

  const handleSlotConfirmation = () => {
    if (!selectedSlot) {
      toast.error("Please select a slot before proceeding.");
    } else {
      toast.success("Slot confirmed");
    }
  };

  return (
    <div className={styles.area}>
      <img src="/images/left-bg.svg" alt="" className={styles.leftUnderlay} />
      <img src="/images/right-bg.svg" alt="" className={styles.rightUnderlay} />
      <div className={styles.rightShadow}></div>
      <motion.div
        className={styles.card}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.topSection}>
          <CalenderArea onMonthChange={handleMonthChange} />
          <SlotSelection />
        </div>
        <div className={styles.banner}>
          <span>
            Powered By
            <Link
              target={"_blank"}
              to={"https://apps.shopify.com/appointo-appointments-and-bookings"}
            >
              Appointo
            </Link>
          </span>
          <PrimaryButton clicked={handleSlotConfirmation} hasArrow>
            Next
          </PrimaryButton>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeWrapper;
