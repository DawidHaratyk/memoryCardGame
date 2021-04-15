// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
var technologyIcons = ['<i class="fab fa-react" data-tech="react" data-id="first"></i>', '<i class="fab fa-react" data-tech="react" data-id="second"></i>', '<i class="fab fa-vuejs" data-tech="vue" data-id="first"></i>', '<i class="fab fa-vuejs" data-tech="vue" data-id="second"></i>', '<i class="fab fa-html5" data-tech="html" data-id="first"></i>', '<i class="fab fa-html5" data-tech="html" data-id="second"></i>', '<i class="fab fa-css3-alt" data-tech="css" data-id="first"></i>', '<i class="fab fa-css3-alt" data-tech="css" data-id="second"></i>', '<i class="fab fa-js-square" data-tech="js" data-id="first"></i>', '<i class="fab fa-js-square" data-tech="js" data-id="second"></i>', '<i class="fab fa-angular" data-tech="angular" data-id="first"></i>', '<i class="fab fa-angular" data-tech="angular" data-id="second"></i>', '<i class="fab fa-python" data-tech="python" data-id="first"></i>', '<i class="fab fa-python" data-tech="python" data-id="second"></i>', '<i class="fab fa-php" data-tech="php" data-id="first"></i>', '<i class="fab fa-php" data-tech="php" data-id="second"></i>']; // Time counter

var minutesElement = document.querySelector('.minutes');
var secondsElement = document.querySelector('.seconds');
var timeElement = document.querySelector('.time');
var minutes = 0;
var seconds = 0;

var timeCounter = function timeCounter() {
  seconds++;

  if (seconds === 60) {
    seconds = 00;
    minutes++;
  }

  if (minutes < 10) {
    minutes = parseInt(minutes, 10);
    minutes = "0".concat(minutes);
  }

  if (seconds < 10) {
    seconds = "0".concat(seconds);
  }

  minutesElement.innerHTML = minutes;
  secondsElement.innerHTML = seconds;
}; // Moves Counter


var movesElement = document.querySelector('.moves-counter');
var movesCounter = 0;
var moves = 0;

var addMove = function addMove() {
  movesCounter++;
  movesElement.innerHTML = movesCounter;
}; // Star Counter


var stars = document.querySelectorAll('.star');
var emptyStars = document.querySelectorAll('.empty-star');
var starIndex = 2; // From nodeList to Array

var starArray = Array.from(stars);

var removeStar = function removeStar() {
  if (starIndex < 0) {
    starIndex = 0;
  }

  starArray[starIndex].style.opacity = '0';
  starIndex -= 1;
};

var addStar = function addStar() {
  starIndex += 1;

  if (starIndex > 2) {
    starIndex = 2;
  }

  starArray[starIndex].style.opacity = '1';
}; // Stop game


var restartBtn = document.querySelector('.restart-btn');
var resultContainer = document.querySelector('.result-container');
var cardsArray = [];

var restartGame = function restartGame() {
  // Restart
  clearInterval(currentTime);

  if (gameStartBtn.innerHTML === 'in game') {
    currentTime = setInterval(timeCounter, 1000);
  }

  document.body.classList.remove('end-game-bgc');
  resultContainer.style.zIndex = '-1';
  resultContainer.innerHTML = '';
  minutesElement.innerHTML = '00';
  secondsElement.innerHTML = '00';
  minutes = 0;
  seconds = 0;
  movesCounter = 0;
  moves = 0;
  movesElement.innerHTML = movesCounter;
  starIndex = 2;
  backCardsCounter = 0;
  cardsArray = [];
  var removingBackCards = document.querySelectorAll('.back-card');
  var cards = document.querySelectorAll('.front-card');
  removingBackCards.forEach(function (card) {
    card.classList.remove('move-back');
    card.style.display = 'block';
  });
  cards.forEach(function (card) {
    card.classList.remove('move-front');
  });
  starArray.forEach(function (star) {
    star.style.opacity = '1';
  });

  if (technologyIcons.length === 0) {
    technologyIcons = ['<i class="fab fa-react" data-tech="react" data-id="first"></i>', '<i class="fab fa-react" data-tech="react" data-id="second"></i>', '<i class="fab fa-vuejs" data-tech="vue" data-id="first"></i>', '<i class="fab fa-vuejs" data-tech="vue" data-id="second"></i>', '<i class="fab fa-html5" data-tech="html" data-id="first"></i>', '<i class="fab fa-html5" data-tech="html" data-id="second"></i>', '<i class="fab fa-css3-alt" data-tech="css" data-id="first"></i>', '<i class="fab fa-css3-alt" data-tech="css" data-id="second"></i>', '<i class="fab fa-js-square" data-tech="js" data-id="first"></i>', '<i class="fab fa-js-square" data-tech="js" data-id="second"></i>', '<i class="fab fa-angular" data-tech="angular" data-id="first"></i>', '<i class="fab fa-angular" data-tech="angular" data-id="second"></i>', '<i class="fab fa-python" data-tech="python" data-id="first"></i>', '<i class="fab fa-python" data-tech="python" data-id="second"></i>', '<i class="fab fa-php" data-tech="php" data-id="first"></i>', '<i class="fab fa-php" data-tech="php" data-id="second"></i>']; // jak przywrócić stan tablicy krótszym zapisem?
  }

  var backCards = document.querySelectorAll('.back-card');
  setTimeout(function () {
    randomPositionOfIcons(backCards);
  }, 1000);
}; // restartBtn.addEventListener('click', restartGame);
// Game logic


var checkTechnology = function checkTechnology(cardsArray) {
  var firstCardDataTech = cardsArray[0].previousElementSibling.querySelector('i').dataset.tech;
  var secondCardDataTech = cardsArray[1].previousElementSibling.querySelector('i').dataset.tech;
  var firstCardDataId = cardsArray[0].previousElementSibling.querySelector('i').dataset.id;
  var secondCardDataId = cardsArray[1].previousElementSibling.querySelector('i').dataset.id;
  var firstCardElement = cardsArray[0].previousElementSibling;
  var secondCardElement = cardsArray[1].previousElementSibling;

  if (firstCardDataTech === secondCardDataTech && !(firstCardDataId === secondCardDataId)) {
    addStar();
    setTimeout(function () {
      firstCardElement.style.display = 'none';
      secondCardElement.style.display = 'none'; // gdy zrestartujemy grę to pokażą się na chwile pozycje ikon z aktualnej gry
    }, 1000);
  } else {
    removeStar();
    setTimeout(function () {
      firstCardElement.classList.remove('move-back');
      secondCardElement.classList.remove('move-back');
      cardsArray[0].classList.remove('move-front');
      cardsArray[1].classList.remove('move-front');
    }, 1000);
  }
}; // Random position of cards


var randomPositionOfIcons = function randomPositionOfIcons(backCards) {
  backCards.forEach(function (card) {
    var randomNumber = Math.floor(Math.random() * technologyIcons.length);
    card.innerHTML = technologyIcons[randomNumber];
    technologyIcons.splice(randomNumber, 1);
  });
}; // Start game


var gameStartBtn = document.querySelector('.play-btn');
var currentTime;
var backCardsCounter = 0;

var startGame = function startGame() {
  restartBtn.addEventListener('click', restartGame);
  gameStartBtn.removeEventListener('click', startGame);
  gameStartBtn.innerHTML = 'in game'; // Time counter

  currentTime = setInterval(timeCounter, 1000); // Add card animation

  var cards = document.querySelectorAll('.front-card'); // Checking moves

  var checkMoves = function checkMoves(e) {
    var activeCard = e.target;
    activeCard.classList.add('move-front');
    activeCard.previousElementSibling.classList.add('move-back');
    cardsArray.push(activeCard);
    moves++;

    if (moves === 2) {
      moves = 0;
      addMove();
      cards.forEach(function (card) {
        card.removeEventListener('click', checkMoves);
      });
      checkTechnology(cardsArray);
      var firstCardTech = cardsArray[0].previousElementSibling.querySelector('i').dataset.tech;
      var secondCardTech = cardsArray[1].previousElementSibling.querySelector('i').dataset.tech;
      var firstCardId = cardsArray[0].previousElementSibling.querySelector('i').dataset.id;
      var secondCardId = cardsArray[1].previousElementSibling.querySelector('i').dataset.id;

      if (firstCardTech === secondCardTech && !(firstCardId === secondCardId)) {
        backCardsCounter += 2;
      }

      if (backCardsCounter === 16) {
        setTimeout(function () {
          document.body.classList.add('end-game-bgc');
          resultContainer.innerHTML = "<h1 class=\"result-headline\">You are a Winner!</h1>\n                        <p class=\"result-text\">You won in ".concat(minutes, "minutes, ").concat(seconds, "seconds , using ").concat(movesCounter, "moves, for ").concat(starIndex + 1, "stars</p>\n                        <button class=\"again-btn\">Play another game!</button>");
          resultContainer.style.zIndex = '6';
          var playAgainBtn = document.querySelector('.again-btn');
          playAgainBtn.addEventListener('click', restartGame);
        }, 1000);
      }

      cardsArray = [];
      setTimeout(function () {
        cards.forEach(function (card) {
          card.addEventListener('click', checkMoves);
        });
      }, 1000);
    }
  };

  cards.forEach(function (card) {
    card.addEventListener('click', checkMoves);
  }); // Selecting a random icon for each card

  var backCards = document.querySelectorAll('.back-card');
  randomPositionOfIcons(backCards);
};

gameStartBtn.addEventListener('click', startGame);
},{}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52819" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map