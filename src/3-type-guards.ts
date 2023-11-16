import { omit } from 'lodash';
import { log } from './x-log-util';

type Place = {
  address: string;
  latitude: number;
  longitude: number;
  businessName?: string;
};

const examplePlace: Place = {
  address: '123 fake st',
  latitude: 123,
  longitude: 123,
  businessName: 'fake business',
};

const isPlace = (maybePlace: unknown): maybePlace is Place => {
  const place = maybePlace as Place;
  return (
    typeof place?.address === 'string' &&
    typeof place?.latitude === 'number' &&
    typeof place?.longitude === 'number' &&
    (typeof place?.businessName === 'string' ||
      place?.businessName === undefined)
  );
};

// Type guards evaluate to a boolean when called
log(1, 'null isPlace', isPlace(null));
log(1, 'undefined isPlace', isPlace(undefined));
log(1, 'empty object isPlace', isPlace({}));
log(1, 'empty array isPlace', isPlace([]));
log(1, 'with all fields isPlace', isPlace(examplePlace));
log(
  1,
  'with all fields except businessName isPlace',
  isPlace(omit(examplePlace, 'businessName'))
);
log(1, 'missing latitude isPlace', isPlace(omit(examplePlace, 'latitude')));

// But the real magic of a type guard is the type narrowing
type LatAndLongResult = {
  latitude: number;
  longitude: number;
} | null;

const getLatAndLong = (maybePlace: unknown): LatAndLongResult => {
  if (!isPlace(maybePlace)) {
    // notice that if you hover over maybePlace, it is still an unknown type since our type guard couldn't narrow it
    log(2, `${maybePlace} is not a place`);
    return null;
  }

  // notice that if you hover over maybePlace, it is now a Place type. The magic of type guards!
  const { latitude, longitude } = maybePlace;
  return { latitude, longitude };
};

log(2, 'not a place - getLatAndLong -', getLatAndLong({}));
log(2, 'place - getLatAndLong -', getLatAndLong(examplePlace));
