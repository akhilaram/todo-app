export type AppDispatch = typeof import('./index').store.dispatch
export type RootState = ReturnType<typeof import('./index').rootReducer>
