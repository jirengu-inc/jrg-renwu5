;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-tingzhi" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M357.067652 365.861642c0-3.961218 1.510462-7.922437 4.530362-10.942213 3.0199-3.0208 6.981281-4.530177 10.942662-4.530177l278.631088 0c3.961381 0 7.922761 1.5104 10.942662 4.530177 3.020924 3.019777 4.551852 6.980995 4.551852 10.942213L666.666278 644.481314c0 3.961218-1.530929 7.922437-4.551852 10.942213-3.0199 3.019777-6.981281 4.551666-10.942662 4.551666L372.541699 659.975193c-3.961381 0-7.922761-1.5104-10.942662-4.551666-3.020924-3.019777-4.530362-6.980995-4.530362-10.942213L357.068675 365.861642 357.067652 365.861642z"  ></path>' +
    '' +
    '<path d="M511.999488 63.802118c-247.553029 0-448.22648 200.665229-448.22648 448.186625 0 247.543909 200.673451 448.208115 448.22648 448.208115 247.553029 0 448.22648-200.665229 448.22648-448.186625C960.225968 264.467347 759.552517 63.802118 511.999488 63.802118zM511.999488 857.161181c-190.627242 0-345.18658-154.530492-345.18658-345.150948 0-190.641945 154.559338-345.172437 345.18658-345.172437 190.649756 0 345.187603 154.530492 345.187603 345.172437C857.186068 702.630688 702.649244 857.161181 511.999488 857.161181z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xiangyou" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M 512 2.621 c -281.322 0 -509.378 228.057 -509.378 509.379 s 228.058 509.377 509.378 509.377 s 509.378 -228.057 509.378 -509.377 c 0 -281.324 -228.058 -509.379 -509.378 -509.379 v 0 Z M 512.835 926.189 c -228.751 0 -414.189 -185.437 -414.189 -414.188 c 0 -228.752 185.437 -414.19 414.189 -414.19 c 228.747 0 414.189 185.443 414.189 414.19 c 0 228.75 -185.435 414.188 -414.189 414.188 v 0 Z M 670.608 509.472 c -0.005 -0.13 -0.017 -0.258 -0.022 -0.382 c -0.705 -12.131 -5.887 -24.015 -15.456 -32.86 l -186.917 -172.722 c -19.625 -18.128 -50.513 -16.913 -68.647 2.714 c -18.134 19.621 -16.913 50.513 2.708 68.647 l 148.406 137.133 l -148.404 137.135 c -19.621 18.135 -20.841 49.021 -2.708 68.647 c 18.135 19.626 49.028 20.841 68.647 2.708 l 186.917 -172.717 c 9.575 -8.846 14.749 -20.73 15.456 -32.86 c 0.005 -0.123 0.017 -0.253 0.022 -0.382 c 0.028 -0.519 0.038 -1.037 0.05 -1.558 c 0.012 -0.325 0.016 -0.65 0.016 -0.975 c 0 -0.32 -0.004 -0.646 -0.016 -0.97 c -0.014 -0.524 -0.027 -1.044 -0.052 -1.559 v 0 Z M 670.608 509.472 Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-kaishi" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M620.202667 500.394667l-157.696-147.797333c-8.874667-4.437333-19.114667-3.754667-27.648 1.024-8.533333 5.12-13.312 13.994667-13.312 23.552l0 286.72c0 9.557333 5.12 18.432 13.312 23.552 4.437333 2.730667 9.557333 4.096 14.677333 4.096 4.437333 0 8.874667-1.024 12.629333-3.072l157.696-138.922667c8.874667-8.192 15.701333-14.336 15.701333-24.917333C635.562667 514.730667 629.76 508.928 620.202667 500.394667z"  ></path>' +
    '' +
    '<path d="M512 170.666667C323.925333 170.666667 170.666667 323.925333 170.666667 512c0 188.074667 153.258667 341.333333 341.333333 341.333333 188.074667 0 341.333333-153.258667 341.333333-341.333333C853.333333 323.925333 700.074667 170.666667 512 170.666667zM512 810.666667c-164.864 0-298.666667-134.144-298.666667-298.666667 0-164.864 134.144-298.666667 298.666667-298.666667 164.864 0 298.666667 134.144 298.666667 298.666667C810.666667 676.864 676.864 810.666667 512 810.666667z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)