# Fleet API Example

Simple example of using the [Fleet API library](https://github.com/dweaver/exosite-fleet).

## Usage

```
$ git clone git@github.com:dweaver/exosite-fleet-example.git
$ cd exosite-fleet-example
$ bower install
$ python -m SimpleHTTPServer 8005
```

- go to http://localhost:8005 in your browser
- Click "Sign In" and log in with an account with Fleet API access. 
- Press "call API". The number of devices should appear a few minutes later.

Port must be 8005 or 3000 to make this work from localhost. To host an app somewhere other than localhost:8005 or localhost:3000, contact [Dan Weaver](mailto:danweaver@exosite.com).
