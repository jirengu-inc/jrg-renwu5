function ajax (options) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var responseData = JSON.parse(xhr.responseText);
      options.success(responseData);
    }
    if (xhr.readyState === 4 && xhr.status === 404) {
      options.error();
    }
  }

  var dataStr = '';
  for (var key in options.data) {
    dataStr += key + '=' + options.data[key] + '&';
  }
  dataStr = dataStr.substr(0, dataStr.length - 1);

  if (options.type.toLowerCase() === 'get') {
    var url = options.url + '?' + dataStr;
    xhr.open(options.type, url, true);
    xhr.send();
  }
  if (options.type.toLowerCase() === 'post') {
    xhr.open(options.type, options.url, true);
    xhr.setRequestHeader("Content-type", "application/x-www/form-urlencoded");
    xhr.send(dataStr);
  }
}

// BEGIN ** use ajax() ** sample **
  // ajax({
  //   url : 'xxx.php',
  //   type : 'GET',
  //   data : {
  //     key1 : val1,
  //     key2 : val2
  //   },
  //   success : function (data) {
  //     ...code...
  //   },
  //   error : function () {
  //     ...code...
  //   }
  // });
// END   ** use ajax() **