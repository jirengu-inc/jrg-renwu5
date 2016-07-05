function ajax(opts) {
    opts.url = opts.url || "";
    opts.type = opts.type || "get";
    opts.data = opts.data || {};
    opts.success = opts.success || function() {};
    opts.error = opts.error || function() {};
    var http = new XMLHttpRequest();
    var input = "";
    for (var key in opts.data) {
        input += (key + "=" + opts.data[key] + "&");
    }
    input = input.replace(/&$/, "");
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            var response = "";
            try {
                response = JSON.parse(http.responseText);
            } catch (e) {
                response = http.responseText;
            };
            opts.success(response);

        };
        if (http.status == 404) {
            opts.error(http.statusText);
        }
    };
    if (opts.type.toLowerCase() == "get") {
        input = opts.url + "?" + input;
        http.open("get", input, true);
        http.send();
    }

    if (opts.type.toLowerCase() == "post") {
        http.open("post", opts.url, true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send(input);
    }
}
