# Quick Demo of TypeScript Concepts

## Description

Includes examples of the following TypeScript concepts:

1. Generic Types
2. Utility Types
3. Type Guards

## Installation

- `npm i`

## Usage

Each file in `src` has a number prefix from 1 to 4. To run the examples from that specific file, run `npm run <PREFIX> <EXAMPLE_NUMBER>`. For example, `npm run 1` will log all the examples from `1-generics.ts`.

Additionally, to only log the results of a certain example, I have added a logging util [here](./src/x-log-util.ts) which takes an argument and only logs the result of that argument. For example, to only log the results of the first example in the file `1-generics.ts`, you would run `npm run 1 1`.
