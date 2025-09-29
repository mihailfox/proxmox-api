export function formatCount(value: number): string {
  return Intl.NumberFormat('en-US').format(value);
}

export function setupCounter(element: HTMLButtonElement): void {
  let counter = 0;

  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `Clicked ${formatCount(counter)} time${counter === 1 ? '' : 's'}`;
  };

  element.addEventListener('click', () => {
    setCounter(counter + 1);
  });

  setCounter(counter);
}
