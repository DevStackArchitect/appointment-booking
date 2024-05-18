import API from "@/actions/API";

interface RequestProps {
  start: string;
  end: string;
}
export interface Slot {
  start_time: string;
  end_time: string;
}

export interface TimeSlotResponse {
  date: string;
  slots: Slot[];
}

export const getTimeSlots = async ({
  start,
  end,
}: RequestProps): Promise<TimeSlotResponse[]> => {
  const response = await API.get(
    `/scripttag/mock_timeslots?start_date=${start}&end_date=${end}`,
  );
  return response.data;
};
