
var http = require("http");
var q = require("q");
var skip = { exports: {} };

skip.exports.testChain = function(test) {
  var tag = "start";
  var first = function() {
    tag = "first";
    var d = q.defer();
    setTimeout(d.resolve, 1000);
    return d.promise;
  }

  var second = function() {
    tag = "second";
    var d = q.defer();
    setTimeout(d.resolve, 1000);
    return d.promise;
  }

  var third = function() {
  };

  first().then(function(){
    second();
  }).then(function(){
    test.ok(tag, "seond", "Tag should equal to 'second'.");
    test.done();
  });
};

skip.exports.testRequest = function(test) {
  var url = "http://10.0.0.229:8088/user";
  http.get(url, function(res){
    res.setEncoding("utf8");
    res.on("data", function(chunck){
      test.notEqual(chunck, null, "Result should not equal to null.");
      test.done();
    });
  });
};

exports.testQ = function(test) {

  var httpRequest = function(opts) {
    var d = q.defer();
    http.get(opts, d.resolve);
    return d.promise;
  };

  var promise = httpRequest("http://10.0.0.229:8088/user");
  promise.then(function(res){
    res.on("data", function(chunck){
      test.notEqual(chunck, null, "Chunck should not equal to null.");
      test.done();
    });
  });
};
