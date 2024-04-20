/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public_src/common/includer/html.includer.js":
/*!*****************************************************!*\
  !*** ./public_src/common/includer/html.includer.js ***!
  \*****************************************************/
/***/ (() => {

eval("const includes = document.querySelectorAll(\"include\");\r\nconsole.log(includes);\r\n\r\nincludes.forEach((includer) => {\r\n  fetch(includer.getAttribute(\"src\"))\r\n    .then((res) => {\r\n      if (res.ok) {\r\n        return res.text();\r\n      }\r\n    })\r\n    .then((html) => {\r\n      console.log(includer.parentElement);\r\n      console.log(html);\r\n      var z = document.createElement(\"div\");\r\n      z.innerHTML = html;\r\n      //   includer.parentElement.appendChild(z);\r\n      includer.parentElement.insertBefore(z, includer.nextSibling);\r\n\r\n      //   =============DELETE DOM ===============\r\n      includer.remove();\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://include-html-framework/./public_src/common/includer/html.includer.js?");

/***/ }),

/***/ "./public_src/index/js/index.js":
/*!**************************************!*\
  !*** ./public_src/index/js/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! ../../common/includer/html.includer */ \"./public_src/common/includer/html.includer.js\");\r\n\n\n//# sourceURL=webpack://include-html-framework/./public_src/index/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public_src/index/js/index.js");
/******/ 	
/******/ })()
;