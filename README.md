# Inverted-Index

## Introduction

An inverted index is an index into a set of documents of the words in the documents. The index is accessed by some search method. Each index entry gives the word and a list of documents, possibly with locations within the documents, where the word occurs. The inverted index data structure is a central component of a typical search engine indexing algorithm. A goal of a search engine implementation is to optimize the speed of the query: find the documents where word X occurs. Once a forward index is developed, which stores lists of words per document, it is next inverted to develop an inverted index.

## Features

- Create indexes from uploaded file.
- Find a particular index.
- Create index for multiple files
- Full text search of created indexes.

## Technologies

- Node.js
- EcmaScript 6 
- Bootstrap
- Angular.js
- Gulp (Task runner)

## Local Development

- Install npm dependencies npm install
- To run the app: gulp watch
- To run the tests run: npm test

## Contributing

1. Fork this repositry to your account.
2. Clone your repositry: git clone git@github.com:your-username/inverted-index.git
3. Create your feature branch: git checkout -b new-feature
4. Commit your changes: git commit -m "did something"
5. Push to the remote branch: git push origin new-feature
6. Open a pull request.