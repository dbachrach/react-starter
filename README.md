# React Starter
Starterkit for React Redux.

## Requirements

Node 5.0.0+

## Getting Started

1. Run `npm install`.

## Development Build

Development builds can be generated by running:

```
gulp
```

This will watch all project files and rebuild automatically.

You can view the site at:

```
localhost:8000
```

## Production Build

Production builds are minified. To generate a production build, run:

```
gulp build --production
```

## Using POW

We use [Pow](http://pow.cx/) for serving local builds from nice URLs.

To install POW:

```
curl get.pow.cx | sh
```

And now we can configure our hosts:
```
mkdir ~/.pow
echo 8003 > ~/.pow/react-starter
```

You can now access:

```
react-starter.dev
```
