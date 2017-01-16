function ajax(opts) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText)
            console.log(json)
            opts.success(json)
        }
        if (xhr.readyState === 4 && xhr.status === 404) {
            opts.error()
        }
    }
    var dataStr = ''
    for (var key in opts.data) {
        dataStr += key + '=' + opts.data[key] + '&'
    }
    dataStr = dataStr.substr(0, dataStr.length - 1)
    if (opts.type.toLowerCase() === 'get') {
        xhr.open(opts.type, opts.url + '?' + dataStr, true)
        xhr.send()
    }
    if (opts.type.toLowerCase() === 'post') {
        xhr.open(opts.type, opts.url, true)
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(dataStr)
    }
}

