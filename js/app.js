$(document).ready(function() {
  var AUTH0_CLIENT_ID = 'oHrOYaiwy5EhaXXTSHsK7nBiSNeiPpKz';
  var AUTH0_DOMAIN = 'exositeapp.auth0.com';

  var lock = new Auth0Lock(
    AUTH0_CLIENT_ID,
    AUTH0_DOMAIN
  );

  var userProfile = JSON.parse(localStorage.getItem('userProfile'));
  var userToken = localStorage.getItem('userToken');
  if (userProfile) {
    // we're already logged in.
    login();
  }

  $('.btn-login').click(function(e) {
    e.preventDefault();
    lock.showSignin({authParams: { scope: 'openid email domain'}}, function(err, profile, token) {
      if (err) {
        // Error callback
        console.log("There was an error");
        alert("There was an error logging in");
      } else {
        // Success callback
        

        // Save the JWT token.
        localStorage.setItem('userToken', token);
        userToken = token;

        // Save the profile
        localStorage.setItem('userProfile', JSON.stringify(profile));
        userProfile = profile;

        login();
      }
    });
  });

  function login() {
    $('.login-box').hide();
    $('.logged-in-box').show();
    $('.nickname').text(userProfile.name);
  }

  function logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userProfile');
    $('.login-box').show();
    $('.logged-in-box').hide();
    $('.nickname').text('');
  }

  $('.btn-logout').click(function(e) {
    e.preventDefault();
    logout();
  });

  $('.btn-api').click(function(e) {
    // Set up Proxy API library
    var proxy = window.ApiService;
    var exo = new proxy(userToken);
    console.log('Querying proxy API...');
    console.log(userProfile.email);
    exo.getDevices(function(devices) {
        console.log('devices', devices);
    }, function(err) {
        console.log('err', err);
    });
  });

});

