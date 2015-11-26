$(document).ready(function() {
  var DEMO_DEVICE_RID = '239f19152a1316ee30d5845f33884d997917475c';

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

  // Set up Proxy API library
  var exo = new window.ApiService(userToken);

  function showResult(result) {
    $('#result').html(JSON.stringify(result, null, 2));
  }

  function showError(err) {
    $('#result').html(err);
  }

  $('#btn-read-dataport').click(function(e) {
    // http://docs.exosite.com/rpc/#read
    exo.rpc(DEMO_DEVICE_RID,
      [{procedure: 'read', 
        arguments: [{alias: 'test_dataport'}, {limit: 10}]}])
      .then(function(response) {
        showResult(response);
      }, function(err) {
        showError(err);
      });
  });

  $('#btn-write-dataport').click(function(e) {
    // http://docs.exosite.com/rpc/#write
    var value = $('#value-to-write').val();
    exo.rpc(DEMO_DEVICE_RID,
      [{procedure: 'write', 
        arguments: [{alias: 'test_dataport'}, value]}])
      .then(function(response) {
        showResult(response);
      }, function(err) {
        showError(err);
      });
  });

  $('#btn-device-info').click(function(e) {
    // http://docs.exosite.com/rpc/#info
    exo.rpc(DEMO_DEVICE_RID,
      [{procedure: 'info', 
        arguments: [{alias: ''}, {}]}])
      .then(function(response) {
        showResult(response);
      }, function(err) {
        showError(err);
      });
  });

  $('#btn-dataport-info').click(function(e) {
    // http://docs.exosite.com/rpc/#info
    exo.rpc(DEMO_DEVICE_RID,
      [{procedure: 'info', 
        arguments: [{alias: 'test_dataport'}, {}]}])
      .then(function(response) {
        showResult(response);
      }, function(err) {
        showError(err);
      });
  });
 
  $('#btn-flush-dataport').click(function(e) {
    // http://docs.exosite.com/rpc/#flush
    exo.rpc(DEMO_DEVICE_RID,
      [{procedure: 'flush', 
        arguments: [{alias: 'test_dataport'}, {}]}])
      .then(function(response) {
        showResult(response);
      }, function(err) {
        showError(err);
      });
  });

  $('#btn-get-devices').click(function(e) {
    // getDevices() internally calls listing and info 
    // to get data for multiple devices under the 
    // application root.
    //
    // http://docs.exosite.com/rpc/#listing
    // http://docs.exosite.com/rpc/#info
    exo.getDevices(function(devices) {
      console.log(devices);
      showResult(devices);
    }, function(err) {
      showError(err);
    });
  });

});

