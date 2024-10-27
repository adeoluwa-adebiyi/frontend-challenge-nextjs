# Multiform Frontend Challenge

This is a MultiForm demo application built with Next.js, React, XState, Material-UI & MongoDb.
The project uses XState library to power the state-machines used for tracking the progress in the multiform layout.

## Getting Started

First, start the project by running docker-compose:

```bash
docker-compose up
```

To run tests, run command:
```bash
yarn jest
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Limitations & Assumptions
- No progress for submit success
- No retry logic on both client & server operations
- Form state is totally on device
- Tracking only happens on submit of form
- Simple check using cookies to see if form already filled
- Fill check can be bypassed by client since it makes use of cookies accessible to script (Javascript)
- No error notifications on API failure