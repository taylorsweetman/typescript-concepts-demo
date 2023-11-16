import axios from 'axios';
import { Activity } from './1-generics';
import { log } from './x-log-util';

// Generics
type Maybe<T> = T | null;

// Type Guards and Generics
const isPresent = <T>(maybeValue: Maybe<T>): maybeValue is T => {
  return maybeValue !== null;
};

// Utility Types
type ActivityMap = Record<string, Omit<Activity, 'key'>>;

// Putting it all together
const apiFetcher = async <T>(minPrice: number): Promise<Maybe<T>> => {
  const respData = (
    await axios.get(`http://www.boredapi.com/api/activity?minprice=${minPrice}`)
  )?.data;

  if (respData == null || respData?.error) {
    return null;
  }

  return respData;
};

const main = async () => {
  const minimumPrices = [0.2, 0.6, 1];

  const maybeActivityPromises = minimumPrices.map(apiFetcher<Activity>);
  const maybeActivities = await Promise.all(maybeActivityPromises);
  const activities = maybeActivities.filter(isPresent);

  const activityMap = activities.reduce(
    (acc, { key, ...rest }) => ({ ...acc, [key]: rest }),
    {} as ActivityMap
  );

  log(1, { maybeActivities });
  log(2, { activities });
  log(3, { activityMap });
};

main();
