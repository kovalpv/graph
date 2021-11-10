# Graph

![coverage:statements](./artifacts/badges/badge-statements.svg)
![coverage:functions](./artifacts/badges/badge-functions.svg)
![coverage:lines](./artifacts/badges/badge-lines.svg) 

The project implements graph algorithms in the typescript language and graph display.

## Requirements

- Node > v10.x;
- Yarn > v1.12;

## Commands:

### Run develop mode

```properties
    yarn start
```

### Check types && styles

```properties
    yarn lint
```

### Run tests

To run project tests run the command:

```properties
    yarn test
```

### Build project

```properties
    yarn start
```

### Run application in docker

```properties
    docker build . -t graph-web
    docker run -p 8080:80 -d graph-web
```