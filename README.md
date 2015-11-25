# Proxy API Example

Simple example of using the [Proxy API library](https://github.com/dweaver/exosite-proxy).

## Usage

```
$ git clone git@github.com:dweaver/exosite-proxy-example.git
$ cd exosite-proxy-example
$ bower install
$ python -m SimpleHTTPServer 8005
```

- go to http://localhost:8005 in your browser
- Click "Sign In" and log in with Portals user that is whitelisted for Proxy API access. 
- Press "call API". A response value will appear a moment later

Port must be 8005 or 3000 to make this work from localhost. To host an app somewhere other than localhost:8005 or localhost:3000, contact [Dan Weaver](mailto:danweaver@exosite.com).


## Deploy to Heroku

```
$ heroku buildpacks:set https://github.com/florianheinemann/buildpack-nginx.git
```
