import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface IReqAddDM {
  inviter: string;
  invited: string;
}

export interface IReqRemoveDM {
  id: string;
}

export interface IDirectMessage {
  id: string;
  members: string[];
}

export type IInitialState = {
  status?: "loading" | "succeeded" | "failed";
  error?: string | null;
  directMessages: IDirectMessage[];
};

const initialState: IInitialState = {
  status: "succeeded",
  error: null,
  directMessages: [],
};

export const getDMs = createAsyncThunk(
  "directMessages/getDMs",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch("/api/link", {
        method: "GET",
        body: null,
        headers: {},
      });

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      const data = await response.json();
      console.log("res getDMs... ", data);

      //dispatch(addDirectMessage(record));
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const setError = (
  state: IInitialState,
  action: PayloadAction<string | null>
) => {
  state.status = "failed";
  state.error = action.payload;
};

export const directMessageSlice = createSlice({
  name: "directMessages",
  initialState,
  reducers: {
    addDirectMessage(state, action: PayloadAction<IDirectMessage>) {
      state.directMessages.push(action.payload);
    },
    // updateDirectMessages(state, action: PayloadAction<DoneTodoPayload>) {
    //   state.directMessages = state.directMessages.map((todo) => {
    //     if (todo.id === action.payload.id) {
    //       return { ...todo, statusDone: action.payload.status };
    //     }
    //     return todo;
    //   });
    // },
    removeDirectMessages(state, action: PayloadAction<IReqRemoveDM>) {
      state.directMessages = state.directMessages.filter((directMessage) => {
        return directMessage.id !== action.payload.id;
      });
    },
    test() {
      console.log("ready test...");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDMs.pending, (state, action) => {
        // both `state` and `action` are now correctly typed
        // based on the slice state and the `pending` action creator
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getDMs.fulfilled,
        (state: IInitialState, action: PayloadAction<IDirectMessage>) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addCase(getDMs.rejected, () => {
        setError;
      });
  },
});

//const {addDirectMessage, removeDirectMessages, test} = directMessageSlice.actions;

export default directMessageSlice.reducer;
