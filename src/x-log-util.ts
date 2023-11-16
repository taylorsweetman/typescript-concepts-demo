export const log = (example: number, ...itemsToLog: unknown[]): void => {
  const passedNumber = process.argv[2];
  if (!passedNumber) {
    console.log(...itemsToLog);
  }

  if (parseInt(passedNumber) === example) {
    console.log(...itemsToLog);
  }
};
