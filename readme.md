# depaginate [![Build Status](https://travis-ci.org/RichardLitt/depaginate.svg?branch=master)](https://travis-ci.org/RichardLitt/depaginate)

> Consume paginated APIs and return a giant array

This is a helper function which works best with the GitHub v3 api. I am more than happy to extend it to other APIs as needed.

## Install

```
$ npm install --save depaginate
```


## Usage

```js
const Octo = require('octokat')
const octo = new Octo()
const depaginate = require('depaginate');

function test () {
  var inputArray = []
  return depaginate(inputArray, function (opts) {
    return octo.repos(opts.org, opts.repo).branches.fetch({
      per_page: 100,
      page: opts.page
    })
  }, {
    org: opts.org,
    repo: repo.name
  })
}
```


## API

### depaginate(array, callFx, [options])

#### array

Type: `array`

This is the array that will be returned. It needs to be set outside of the callFx, hence passing it in.

#### callFx

Type: `function`

This is the function to call the API again.

#### options

Type: `object`

This is specifically for `page`, but also for any options required by the call function.

## License

MIT © [Richard Littauer](http://burntfen.com)
