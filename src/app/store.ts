import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { townManagerSlice } from 'utils/reducers/townManager'
import { armyManagerSlice } from 'utils/reducers/armyManager'
import { enemyManagerSlice } from 'utils/reducers/enemyManager'


    // const actionCreator = payload => dispatch =>
    //     Promise.resolve(dispatch(action1(payload))).then(
    //     () => dispatch(action2(payload)

export const store = configureStore({
  reducer: {
     town: townManagerSlice.reducer,
     army: armyManagerSlice.reducer,
     enemy: enemyManagerSlice.reducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>