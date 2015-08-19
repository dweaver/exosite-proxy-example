$(document).ready(function() {
  var AUTH0_CLIENT_ID = 'dcnod3KP9Hn40y0VWbmKLVRODQ9I12xv';
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
    lock.showSignin({authParams: { scope: 'openid email'}}, function(err, profile, token) {
      if (err) {
        // Error callback
        console.log("There was an error");
        alert("There was an error logging in");
      } else {
        // Success callback

        // Save the JWT token.
        localStorage.setItem('userToken', token);

        // Save the profile
        localStorage.setItem('userProfile', JSON.stringify(profile));

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
    $('.login-box').show();
    $('.logged-in-box').hide();
    $('.nickname').text('');
  }

  $('.btn-api').click(function(e) {
    // Set up Fleet API library
    var token = localStorage.getItem('userToken');
    var fleet = require('exosite-fleet');
    var exo = new fleet(token);
    console.log('Querying fleet API...');
    exo.queryDevices({user: userProfile.email}, ['name', 'sn']).then(function(devices) {
      $('#result').html('Number of devices accessible: ' + devices.length);
    }, function(err) {
      console.log(err);
    });
  });

});

