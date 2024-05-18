import { configureStore } from '@reduxjs/toolkit';
import slotReducer from '@/reducers/slotSlice';


const store = configureStore({
    reducer: {
        slot: slotReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
