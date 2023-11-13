type Person = {
  age: number;
  address: string;
  favoriteColour: string;
  name?: string;
};

const bob: Person = {
  age: 25,
  address: '123 fake st',
  favoriteColour: 'blue',
};
const cassandra: Person = {
  age: 30,
  address: '456 fake st',
  name: 'Cassandra',
  favoriteColour: 'red',
};

// Record
const personMap: Record<string, Person> = {
  bob,
  cassandra,
};

// Partial
const peopleToGatherMoreInfoFrom: Partial<Person>[] = [
  { name: 'John' },
  { address: '99 Gretzky St', age: 40 },
];

// Required
const fullPeopleRecords: Required<Person>[] = Object.entries(personMap).map(
  ([recordKey, person]) => ({
    name: person.name ?? recordKey,
    ...person,
  })
);
console.log({ fullPeopleRecords });
console.log('---');

// Pick -> WARNING think of | and & in set theory
const justNamesAndAges: Pick<Person, 'name' | 'age'>[] = fullPeopleRecords.map(
  ({ name, age }) => ({
    name,
    age,
  })
);
console.log({ justNamesAndAges });
console.log('---');

// Pick example 2 -> demonstrate & usage
const namesOrAges: Pick<Person, 'name' & 'age'>[] = fullPeopleRecords.map(
  ({ name, age }, index) => {
    if (index % 2 === 0) {
      return { name };
    }
    return { age };
  }
);
console.log({ namesOrAges });
console.log('---');

// Omit -> WARNING think of | and & in set theory
const piiRedacted: Omit<Person, 'address' | 'name'>[] = fullPeopleRecords.map(
  ({ age, favoriteColour }) => ({ age, favoriteColour })
);
console.log({ piiRedactedPeople: piiRedacted });
