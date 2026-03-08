# tokscore

Token-level precision, recall and F1 for text comparisons.

## Install

```bash
npm install tokscore
```

## Usage

```js
import compare from 'tokscore';

const result = compare('hello world', 'hello world');
// { precision: 1, recall: 1, f1: 1 }

const result = compare('hello world foo', 'hello world');
// { precision: 1, recall: 0.667, f1: 0.8 }
```
