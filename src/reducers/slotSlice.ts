import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Slot {
    start_time: string;
    end_time: string;
}

interface SelectedSlot {
    date: string;
    slot: Slot;
}

interface SlotState {
    selectedSlot: SelectedSlot | null;
}

const initialState: SlotState = {
    selectedSlot: null,
};

const slotSlice = createSlice({
    name: 'slot',
    initialState,
    reducers: {
        selectSlot(state, action: PayloadAction<SelectedSlot>) {
            state.selectedSlot = action.payload;
        },
    },
});

export const { selectSlot } = slotSlice.actions;
export default slotSlice.reducer;
