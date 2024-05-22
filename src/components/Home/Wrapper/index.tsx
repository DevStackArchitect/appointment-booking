import styles from "./styles.module.scss";
import PrimaryButton from "@/components/Shared/Button/Primary";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CalenderArea from "@/components/Home/CalenderArea";
import { getTimeSlots, TimeSlotResponse } from "@/actions/Appointo";
import SlotSelection from "@/components/Home/SlotSelection";
import { formatDate } from "@/components/utils/dateFormat";
import { useSelector } from "react-redux";
import { RootState } from "@/actions/store";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const HomeWrapper = () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    today,
    today,
  ]);
  const [startDate, endDate] = dateRange;
  const [availableSlots, setAvailableSlots] = useState<
    TimeSlotResponse[] | null
  >(null);
  const [availableDays, setAvailableDays] = useState<TimeSlotResponse[] | null>(
    null,
  );

  const selectedSlot = useSelector(
    (state: RootState) => state.slot.selectedSlot,
  );

  const getSlotList = async () => {
    try {
      if (startDate && endDate) {
        const formattedStartDate = formatDate(
          startDate.toISOString(),
        ) as string;
        const formattedEndDate = formatDate(endDate.toISOString()) as string;
        const payload = {
          start: formattedStartDate,
          end: formattedEndDate,
        };

        const response = await getTimeSlots(payload);
        if (response) {
          setAvailableSlots(response);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      getSlotList();
    }
    getAvailableDaysForBooking(startOfMonth, endOfMonth);
  }, [dateRange]);

  const getAvailableDaysForBooking = async (start: Date, end: Date) => {
    try {
      const formattedStartDate = formatDate(start.toISOString()) as string;
      const formattedEndDate = formatDate(end.toISOString()) as string;
      const payload = {
        start: formattedStartDate,
        end: formattedEndDate,
      };

      const response = await getTimeSlots(payload);
      if (response) {
        setAvailableDays((prevAvailableDays) => {
          return prevAvailableDays
            ? [...prevAvailableDays, ...response]
            : response;
        });
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
          <CalenderArea
            startDate={startDate}
            endDate={endDate}
            availableDays={availableDays}
            setDateRange={setDateRange}
            onMonthChange={handleMonthChange}
          />
          <SlotSelection availableDates={availableSlots} />
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
