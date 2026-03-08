import { createSlice } from '@reduxjs/toolkit';

const tableSlice = createSlice({
  name: 'table',
  initialState: {
    tables: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) { state.loading = action.payload; },
    setError(state, action) { state.error = action.payload; },
    setTables(state, action) { state.tables = action.payload; },
    addTable(state, action) { state.tables.push(action.payload); },
    removeTable(state, action) {
      state.tables = state.tables.filter((t) => t.id !== action.payload);
    },
    updateTableStatus(state, action) {
      const table = state.tables.find((t) => t.id === action.payload.id);
      if (table) table.status = action.payload.status;
    },
  },
});

export const { setLoading, setError, setTables, addTable, removeTable, updateTableStatus } = tableSlice.actions;
export default tableSlice.reducer;
