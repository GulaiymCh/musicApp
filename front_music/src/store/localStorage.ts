export const saveToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.error(e);
  }
};

export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    return serializedState === null ? undefined : JSON.parse(serializedState)
  } catch (e) {
    console.error(e);
    return undefined;
  }
};