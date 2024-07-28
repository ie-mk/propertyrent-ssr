import Immutable from 'seamless-immutable';

export const loadState = persistWhitelist => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);

    const extendedState = {};

    // extend every state entry with immutable merge
    // otherwise when loading the state from the localStorage
    // it will parsed as plain object and will not have the merge method
    // that reducers requires
    Object.keys(state).map(key => {
      if (persistWhitelist[key]) {
        const val = state[key];
        extendedState[key] = typeof val === 'object' ? Immutable(val) : val;
        // it happened when during page refresh page was loading data
        // so the state might be saved as attempting
        // and causing some loading spinners to appear
        // so we want to reset that
        try {
          if (extendedState[key].attempting !== undefined) {
            Immutable.setIn(extendedState[key], ['attempting'], false);
          }
        } catch (err) {
          console.log(err);
        }
      }
    });

    return extendedState;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state, persistWhitelist) => {
  const stateFiltered = {};

  Object.keys(state).map(key => {
    if (persistWhitelist[key]) {
      stateFiltered[key] = state[key].asMutable
        ? state[key].asMutable()
        : state[key];
    }
  });

  try {
    const serializedState = JSON.stringify(stateFiltered);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error('state save failed', err);
  }
};

export const subscribeToSaveOnLocalStorage = (store, persistWhitelist) => {
  store.subscribe(() => {
    const state = store.getState();

    saveState(state, persistWhitelist);
  });
};
