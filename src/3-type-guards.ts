import { omit } from 'lodash';

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
console.log('null isPlace', isPlace(null));
console.log('undefined isPlace', isPlace(undefined));
console.log('empty object isPlace', isPlace({}));
console.log('empty array isPlace', isPlace([]));
console.log('with all fields isPlace', isPlace(examplePlace));
console.log(
  'with all fields except businessName isPlace',
  isPlace(omit(examplePlace, 'businessName'))
);
console.log(
  'missing latitude isPlace',
  isPlace(omit(examplePlace, 'latitude'))
);
console.log('---');

// But the real magic of a type guard is the type narrowing
type LatAndLongResult = {
  latitude: number;
  longitude: number;
} | null;

const getLatAndLong = (maybePlace: unknown): LatAndLongResult => {
  if (!isPlace(maybePlace)) {
    return null;
  }

  // notice that if you hover over maybePlace, it is now a Place type
  const { latitude, longitude } = maybePlace;
  return { latitude, longitude };
};

console.log('not a place - getLatAndLong -', getLatAndLong({}));
console.log('place - getLatAndLong -', getLatAndLong(examplePlace));
