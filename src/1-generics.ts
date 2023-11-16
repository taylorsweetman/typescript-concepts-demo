import axios from 'axios';
import { log } from './x-log-util';

// you've probably seen something like this before
const numbers: Array<Number> = [1, 2, 3];

// or maybe even this
const numbersAfterAwaiting: Promise<Array<Number>> = Promise.resolve([1, 2, 3]);

// but you can take it a step further and use generics in your function signatures
const apiFetcher = async <T>(url: string): Promise<T> => {
  const respData = (await axios.get(url))?.data;
  return respData as T;
};

export type Activity = {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
};

const main = async () => {
  // if you know the API will always return a given type, you can do this
  const activityFromAPI = await apiFetcher<Activity>(
    'http://www.boredapi.com/api/activity'
  );
  const { activity, type } = activityFromAPI;
  log(1, { activity, type });

  // you can also pass multiple generic types
  const getDataOrError = <T, E>(data: T, error: E): T | E =>
    Math.random() > 0.5 ? data : error;

  new Array(5)
    .fill(null)
    .forEach(() => log(2, getDataOrError<string, null>('This is data', null)));
};

main();
