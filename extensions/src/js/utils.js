/*
 * Copyright (C) 2017 eschao <esc.chao@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ColorUtils = (function() {
  "use strict";

  return {
    /**
     * Convert RGB attribute value of HTML element to HEX
     *
     * @return HEX format value
     */
    rgb2hex: function(rgb) {
      if (/^#[0-9A-F]{6}$/i.test(rgb)) {
        return rgb;
      }

      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
      }

      return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
  }
})();

var StrUtils = (function() {
  "use strict";

  return {
    /**
     * Compare string with ignore case
     */
    compareIgnoreCase: function(a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    }
  }
})();

var DomUtils = (function() {
  "use strict";

  return {
    /**
     * Get screen rect of element
     */
    getElementScreenRect: function(el) {
      let c = {
        left: el.offsetLeft,
        top: el.offsetTop,
        width: el.offsetWidth,
        height: el.offsetHeight
      }

      while (el.offsetParent && el.offsetParent != document.body) {
        c.left += el.offsetParent.offsetLeft;
        c.top += el.offsetParent.offsetTop;
        el = el.offsetParent;
      }

      c.bottom = c.top + c.height;
      c.right = c.left + c.width;
      return c;
    },

    createStylesheet: function(name) {
      var style = document.createElement("style");
      style.title = name;
      document.head.appendChild(style);
      return style.sheet;
    },

    addCSSRule: function(sheet, selector, rules, index) {
      if ("insertRule" in sheet) {
        return sheet.insertRule(selector + "{" + rules + "}", index);
      }
      else if ("addRule" in sheet) {
        return sheet.addRule(selector, rules, index);
      }

      return -1;
    },

    cleanStylesheet: function(sheet) {
      while (sheet.rules.length > 0) {
        sheet.deleteRule(0);
      }
    }
  }
})();
