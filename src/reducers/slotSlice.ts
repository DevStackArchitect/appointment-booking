import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Slot {
    start_time: string;
    end_time: string;
}

interface SelectedSlot {
    date: string;
    slot: Slot;
}

interface AvailableDay {
    date: string;
    slots: Slot[];
}

interface SlotState {
    selectedDates: SelectedSlot | null;
    availableDays: AvailableDay[];
    selectedSlot: SelectedSlot | null;
    availableSlots:  AvailableDay[]; // Add this line
}

const initialState: SlotState = {
    selectedDates: null,
    availableDays: [],
    selectedSlot: null,
    availableSlots: [], // Add this line
};

const slotSlice = createSlice({
    name: "slot",
    initialState,
    reducers: {
        selectSlot(state, action: PayloadAction<SelectedSlot>) {
            state.selectedDates = action.payload;
        },
        setAvailableDays(state, action: PayloadAction<AvailableDay[]>) {
            state.availableDays = action.payload;
        },
        addAvailableDays(state, action: PayloadAction<AvailableDay[]>) {
            const newDays = action.payload;
            const existingDates = state.availableDays.map(day => day.date);

            const uniqueNewDays = newDays.filter(day => !existingDates.includes(day.date));

            state.availableDays = [...state.availableDays, ...uniqueNewDays];
        },
        setAvailableSlots(state, action: PayloadAction< AvailableDay[]>) { // Add this action
            state.availableSlots = action.payload;
        },
    },
});

export const { selectSlot, setAvailableDays, addAvailableDays, setAvailableSlots } =
    slotSlice.actions;
export default slotSlice.reducer;
