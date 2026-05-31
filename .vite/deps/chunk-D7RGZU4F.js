import {
  require_react_dom
} from "./chunk-R3E4LXVO.js";
import {
  require_react
} from "./chunk-P6RTVJOB.js";
import {
  __commonJS,
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.element");
        var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE2 = /* @__PURE__ */ Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = /* @__PURE__ */ Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
        var REACT_SERVER_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.server_context");
        var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
        var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = /* @__PURE__ */ Symbol.for("react.offscreen");
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = /* @__PURE__ */ Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE2 || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_FRAGMENT_TYPE2:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_SERVER_CONTEXT_TYPE:
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element2 = REACT_ELEMENT_TYPE;
        var ForwardRef2 = REACT_FORWARD_REF_TYPE;
        var Fragment4 = REACT_FRAGMENT_TYPE2;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal2 = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isConcurrentMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
              hasWarnedAboutDeprecatedIsConcurrentMode = true;
              console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment3(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE2;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo2(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        function isSuspenseList(object) {
          return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
        }
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element2;
        exports.ForwardRef = ForwardRef2;
        exports.Fragment = Fragment4;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal2;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.SuspenseList = SuspenseList;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment3;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo2;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isSuspenseList = isSuspenseList;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/react-is/index.js"(exports, module2) {
    "use strict";
    if (false) {
      module2.exports = null;
    } else {
      module2.exports = require_react_is_development();
    }
  }
});

// node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(r2, a) {
  (null == a || a > r2.length) && (a = r2.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r2[e];
  return n;
}

// node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
function _arrayWithoutHoles(r2) {
  if (Array.isArray(r2)) return _arrayLikeToArray(r2);
}

// node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(r2) {
  if ("undefined" != typeof Symbol && null != r2[Symbol.iterator] || null != r2["@@iterator"]) return Array.from(r2);
}

// node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function _unsupportedIterableToArray(r2, a) {
  if (r2) {
    if ("string" == typeof r2) return _arrayLikeToArray(r2, a);
    var t = {}.toString.call(r2).slice(8, -1);
    return "Object" === t && r2.constructor && (t = r2.constructor.name), "Map" === t || "Set" === t ? Array.from(r2) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r2, a) : void 0;
  }
}

// node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
function _toConsumableArray(r2) {
  return _arrayWithoutHoles(r2) || _iterableToArray(r2) || _unsupportedIterableToArray(r2) || _nonIterableSpread();
}

// node_modules/antd/es/layout/layout.js
var React62 = __toESM(require_react());

// node_modules/@rc-component/util/es/hooks/useEvent.js
var React = __toESM(require_react());
function useEvent(callback) {
  const fnRef = React.useRef(callback);
  fnRef.current = callback;
  const memoFn = React.useCallback((...args) => fnRef.current?.(...args), []);
  return memoFn;
}
var useEvent_default = useEvent;

// node_modules/@rc-component/util/es/hooks/useLayoutEffect.js
var React2 = __toESM(require_react());

// node_modules/@rc-component/util/es/Dom/canUseDom.js
function canUseDom() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}

// node_modules/@rc-component/util/es/hooks/useLayoutEffect.js
var useInternalLayoutEffect = canUseDom() ? React2.useLayoutEffect : React2.useEffect;
var useLayoutEffect2 = (callback, deps) => {
  const firstMountRef = React2.useRef(true);
  useInternalLayoutEffect(() => {
    return callback(firstMountRef.current);
  }, deps);
  useInternalLayoutEffect(() => {
    firstMountRef.current = false;
    return () => {
      firstMountRef.current = true;
    };
  }, []);
};
var useLayoutUpdateEffect = (callback, deps) => {
  useLayoutEffect2((firstMount) => {
    if (!firstMount) {
      return callback();
    }
  }, deps);
};
var useLayoutEffect_default = useLayoutEffect2;

// node_modules/@rc-component/util/es/hooks/useState.js
var React3 = __toESM(require_react());
function useSafeState(defaultValue) {
  const destroyRef = React3.useRef(false);
  const [value, setValue] = React3.useState(defaultValue);
  React3.useEffect(() => {
    destroyRef.current = false;
    return () => {
      destroyRef.current = true;
    };
  }, []);
  function safeSetState(updater, ignoreDestroy) {
    if (ignoreDestroy && destroyRef.current) {
      return;
    }
    setValue(updater);
  }
  return [value, safeSetState];
}

// node_modules/@rc-component/util/es/hooks/useControlledState.js
var import_react = __toESM(require_react());
function useControlledState(defaultStateValue, value) {
  const [innerValue, setInnerValue] = (0, import_react.useState)(defaultStateValue);
  const mergedValue = value !== void 0 ? value : innerValue;
  useLayoutEffect_default((mount) => {
    if (!mount) {
      setInnerValue(value);
    }
  }, [value]);
  return [
    // Value
    mergedValue,
    // Update function
    setInnerValue
  ];
}

// node_modules/@rc-component/util/es/ref.js
var import_react2 = __toESM(require_react());
var import_react_is = __toESM(require_react_is());

// node_modules/@rc-component/util/es/hooks/useMemo.js
var React4 = __toESM(require_react());
function useMemo(getValue2, condition, shouldUpdate) {
  const cacheRef = React4.useRef({});
  if (!("value" in cacheRef.current) || shouldUpdate(cacheRef.current.condition, condition)) {
    cacheRef.current.value = getValue2();
    cacheRef.current.condition = condition;
  }
  return cacheRef.current.value;
}

// node_modules/@rc-component/util/es/React/isFragment.js
var REACT_ELEMENT_TYPE_18 = /* @__PURE__ */ Symbol.for("react.element");
var REACT_ELEMENT_TYPE_19 = /* @__PURE__ */ Symbol.for("react.transitional.element");
var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
function isFragment(object) {
  return (
    // Base object type
    object && typeof object === "object" && // React Element type
    (object.$$typeof === REACT_ELEMENT_TYPE_18 || object.$$typeof === REACT_ELEMENT_TYPE_19) && // React Fragment type
    object.type === REACT_FRAGMENT_TYPE
  );
}

// node_modules/@rc-component/util/es/ref.js
var ReactMajorVersion = Number(import_react2.version.split(".")[0]);
var fillRef = (ref, node2) => {
  if (typeof ref === "function") {
    ref(node2);
  } else if (typeof ref === "object" && ref && "current" in ref) {
    ref.current = node2;
  }
};
var composeRef = (...refs) => {
  const refList = refs.filter(Boolean);
  if (refList.length <= 1) {
    return refList[0];
  }
  return (node2) => {
    refs.forEach((ref) => {
      fillRef(ref, node2);
    });
  };
};
var useComposeRef = (...refs) => {
  return useMemo(
    () => composeRef(...refs),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
    (prev2, next2) => prev2.length !== next2.length || prev2.every((ref, i) => ref !== next2[i])
  );
};
var supportRef = (nodeOrComponent) => {
  if (!nodeOrComponent) {
    return false;
  }
  if (isReactElement(nodeOrComponent) && ReactMajorVersion >= 19) {
    return true;
  }
  const type = (0, import_react_is.isMemo)(nodeOrComponent) ? nodeOrComponent.type.type : nodeOrComponent.type;
  if (typeof type === "function" && !type.prototype?.render && type.$$typeof !== import_react_is.ForwardRef) {
    return false;
  }
  if (typeof nodeOrComponent === "function" && !nodeOrComponent.prototype?.render && nodeOrComponent.$$typeof !== import_react_is.ForwardRef) {
    return false;
  }
  return true;
};
function isReactElement(node2) {
  return (0, import_react2.isValidElement)(node2) && !isFragment(node2);
}
var supportNodeRef = (node2) => {
  return isReactElement(node2) && supportRef(node2);
};
var getNodeRef = (node2) => {
  if (node2 && isReactElement(node2)) {
    const ele = node2;
    return ele.props.propertyIsEnumerable("ref") ? ele.props.ref : ele.ref;
  }
  return null;
};

// node_modules/@rc-component/util/es/utils/get.js
function get(entity, path) {
  let current = entity;
  for (let i = 0; i < path.length; i += 1) {
    if (current === null || current === void 0) {
      return void 0;
    }
    current = current[path[i]];
  }
  return current;
}

// node_modules/@rc-component/util/es/utils/set.js
function internalSet(entity, paths, value, removeIfUndefined) {
  if (!paths.length) {
    return value;
  }
  const [path, ...restPath] = paths;
  let clone;
  if (!entity && typeof path === "number") {
    clone = [];
  } else if (Array.isArray(entity)) {
    clone = [...entity];
  } else {
    clone = {
      ...entity
    };
  }
  if (removeIfUndefined && value === void 0 && restPath.length === 1) {
    delete clone[path][restPath[0]];
  } else {
    clone[path] = internalSet(clone[path], restPath, value, removeIfUndefined);
  }
  return clone;
}
function set(entity, paths, value, removeIfUndefined = false) {
  if (paths.length && removeIfUndefined && value === void 0 && !get(entity, paths.slice(0, -1))) {
    return entity;
  }
  return internalSet(entity, paths, value, removeIfUndefined);
}
function isObject(obj) {
  return typeof obj === "object" && obj !== null && Object.getPrototypeOf(obj) === Object.prototype;
}
function createEmpty(source) {
  return Array.isArray(source) ? [] : {};
}
var keys = typeof Reflect === "undefined" ? Object.keys : Reflect.ownKeys;
function mergeWith(sources, config = {}) {
  const {
    prepareArray
  } = config;
  const finalPrepareArray = prepareArray || (() => []);
  let clone = createEmpty(sources[0]);
  sources.forEach((src) => {
    function internalMerge(path, parentLoopSet) {
      const loopSet = new Set(parentLoopSet);
      const value = get(src, path);
      const isArr = Array.isArray(value);
      if (isArr || isObject(value)) {
        if (!loopSet.has(value)) {
          loopSet.add(value);
          const originValue = get(clone, path);
          if (isArr) {
            clone = set(clone, path, finalPrepareArray(originValue, value));
          } else if (!originValue || typeof originValue !== "object") {
            clone = set(clone, path, createEmpty(value));
          }
          keys(value).forEach((key) => {
            if (Object.getOwnPropertyDescriptor(value, key).enumerable) {
              internalMerge([...path, key], loopSet);
            }
          });
        }
      } else {
        clone = set(clone, path, value);
      }
    }
    internalMerge([]);
  });
  return clone;
}
function merge(...sources) {
  return mergeWith(sources);
}

// node_modules/@rc-component/util/es/warning.js
var warned = {};
var preWarningFns = [];
var preMessage = (fn) => {
  preWarningFns.push(fn);
};
function warning(valid, message) {
  if (!valid && console !== void 0) {
    const finalMessage = preWarningFns.reduce((msg, preMessageFn) => preMessageFn(msg ?? "", "warning"), message);
    if (finalMessage) {
      console.error(`Warning: ${finalMessage}`);
    }
  }
}
function note(valid, message) {
  if (!valid && console !== void 0) {
    const finalMessage = preWarningFns.reduce((msg, preMessageFn) => preMessageFn(msg ?? "", "note"), message);
    if (finalMessage) {
      console.warn(`Note: ${finalMessage}`);
    }
  }
}
function resetWarned() {
  warned = {};
}
function call(method, valid, message) {
  if (!valid && !warned[message]) {
    method(false, message);
    warned[message] = true;
  }
}
function warningOnce(valid, message) {
  call(warning, valid, message);
}
function noteOnce(valid, message) {
  call(note, valid, message);
}
warningOnce.preMessage = preMessage;
warningOnce.resetWarned = resetWarned;
warningOnce.noteOnce = noteOnce;
var warning_default = warningOnce;

// node_modules/@rc-component/util/es/omit.js
function omit(obj, fields) {
  const clone = Object.assign({}, obj);
  if (Array.isArray(fields)) {
    fields.forEach((key) => {
      delete clone[key];
    });
  }
  return clone;
}

// node_modules/@rc-component/util/es/Children/toArray.js
var import_react3 = __toESM(require_react());
function toArray(children, option = {}) {
  let ret = [];
  import_react3.default.Children.forEach(children, (child) => {
    if ((child === void 0 || child === null) && !option.keepEmpty) {
      return;
    }
    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child));
    } else if (isFragment(child) && child.props) {
      ret = ret.concat(toArray(child.props.children, option));
    } else {
      ret.push(child);
    }
  });
  return ret;
}

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// node_modules/antd/es/config-provider/index.js
var React53 = __toESM(require_react());

// node_modules/@emotion/hash/dist/hash.browser.esm.js
function murmur2(str) {
  var h = 0;
  var k, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= /* k >>> r: */
    k >>> 24;
    h = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 255;
      h = /* Math.imul(h, m): */
      (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  h ^= h >>> 13;
  h = /* Math.imul(h, m): */
  (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}
var hash_browser_esm_default = murmur2;

// node_modules/@rc-component/util/es/Dom/contains.js
function contains(root, n) {
  if (!root) {
    return false;
  }
  if (root.contains) {
    return root.contains(n);
  }
  let node2 = n;
  while (node2) {
    if (node2 === root) {
      return true;
    }
    node2 = node2.parentNode;
  }
  return false;
}

// node_modules/@rc-component/util/es/Dom/dynamicCSS.js
var APPEND_ORDER = "data-rc-order";
var APPEND_PRIORITY = "data-rc-priority";
var MARK_KEY = `rc-util-key`;
var containerCache = /* @__PURE__ */ new Map();
function getMark({
  mark
} = {}) {
  if (mark) {
    return mark.startsWith("data-") ? mark : `data-${mark}`;
  }
  return MARK_KEY;
}
function getContainer(option) {
  if (option.attachTo) {
    return option.attachTo;
  }
  const head = document.querySelector("head");
  return head || document.body;
}
function getOrder(prepend) {
  if (prepend === "queue") {
    return "prependQueue";
  }
  return prepend ? "prepend" : "append";
}
function findStyles(container) {
  return Array.from((containerCache.get(container) || container).children).filter((node2) => node2.tagName === "STYLE");
}
function injectCSS(css, option = {}) {
  if (!canUseDom()) {
    return null;
  }
  const {
    csp,
    prepend,
    priority = 0
  } = option;
  const mergedOrder = getOrder(prepend);
  const isPrependQueue = mergedOrder === "prependQueue";
  const styleNode = document.createElement("style");
  styleNode.setAttribute(APPEND_ORDER, mergedOrder);
  if (isPrependQueue && priority) {
    styleNode.setAttribute(APPEND_PRIORITY, `${priority}`);
  }
  if (csp?.nonce) {
    styleNode.nonce = csp?.nonce;
  }
  styleNode.innerHTML = css;
  const container = getContainer(option);
  const {
    firstChild
  } = container;
  if (prepend) {
    if (isPrependQueue) {
      const existStyle = (option.styles || findStyles(container)).filter((node2) => {
        if (!["prepend", "prependQueue"].includes(node2.getAttribute(APPEND_ORDER))) {
          return false;
        }
        const nodePriority = Number(node2.getAttribute(APPEND_PRIORITY) || 0);
        return priority >= nodePriority;
      });
      if (existStyle.length) {
        container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
        return styleNode;
      }
    }
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }
  return styleNode;
}
function findExistNode(key, option = {}) {
  let {
    styles
  } = option;
  styles ||= findStyles(getContainer(option));
  return styles.find((node2) => node2.getAttribute(getMark(option)) === key);
}
function removeCSS(key, option = {}) {
  const existNode = findExistNode(key, option);
  if (existNode) {
    const container = getContainer(option);
    container.removeChild(existNode);
  }
}
function syncRealContainer(container, option) {
  const cachedRealContainer = containerCache.get(container);
  if (!cachedRealContainer || !contains(document, cachedRealContainer)) {
    const placeholderStyle = injectCSS("", option);
    const {
      parentNode
    } = placeholderStyle;
    containerCache.set(container, parentNode);
    container.removeChild(placeholderStyle);
  }
}
function updateCSS(css, key, originOption = {}) {
  const container = getContainer(originOption);
  const styles = findStyles(container);
  const option = {
    ...originOption,
    styles
  };
  syncRealContainer(container, option);
  const existNode = findExistNode(key, option);
  if (existNode) {
    if (option.csp?.nonce && existNode.nonce !== option.csp?.nonce) {
      existNode.nonce = option.csp?.nonce;
    }
    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }
    return existNode;
  }
  const newNode = injectCSS(css, option);
  newNode.setAttribute(getMark(option), key);
  return newNode;
}

// node_modules/@ant-design/cssinjs/es/hooks/useCacheToken.js
var import_react5 = __toESM(require_react());

// node_modules/@rc-component/util/es/isEqual.js
function isEqual(obj1, obj2, shallow = false) {
  const refSet = /* @__PURE__ */ new Set();
  function deepEqual(a, b, level = 1) {
    const circular = refSet.has(a);
    warning_default(!circular, "Warning: There may be circular references");
    if (circular) {
      return false;
    }
    if (a === b) {
      return true;
    }
    if (shallow && level > 1) {
      return false;
    }
    refSet.add(a);
    const newLevel = level + 1;
    if (Array.isArray(a)) {
      if (!Array.isArray(b) || a.length !== b.length) {
        return false;
      }
      for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i], newLevel)) {
          return false;
        }
      }
      return true;
    }
    if (a && b && typeof a === "object" && typeof b === "object") {
      const keys2 = Object.keys(a);
      if (keys2.length !== Object.keys(b).length) {
        return false;
      }
      return keys2.every((key) => deepEqual(a[key], b[key], newLevel));
    }
    return false;
  }
  return deepEqual(obj1, obj2);
}
var isEqual_default = isEqual;

// node_modules/@ant-design/cssinjs/es/StyleContext.js
var React6 = __toESM(require_react());

// node_modules/@ant-design/cssinjs/es/Cache.js
var SPLIT = "%";
function pathKey(keys2) {
  return keys2.join(SPLIT);
}
var updateId = 0;
var Entity = class {
  instanceId;
  constructor(instanceId) {
    this.instanceId = instanceId;
  }
  /** @private Internal cache map. Do not access this directly */
  cache = /* @__PURE__ */ new Map();
  /** @private Record update times for each key */
  updateTimes = /* @__PURE__ */ new Map();
  extracted = /* @__PURE__ */ new Set();
  get(keys2) {
    return this.opGet(pathKey(keys2));
  }
  /** A fast get cache with `get` concat. */
  opGet(keyPathStr) {
    return this.cache.get(keyPathStr) || null;
  }
  update(keys2, valueFn) {
    return this.opUpdate(pathKey(keys2), valueFn);
  }
  /** A fast get cache with `get` concat. */
  opUpdate(keyPathStr, valueFn) {
    const prevValue = this.cache.get(keyPathStr);
    const nextValue = valueFn(prevValue);
    if (nextValue === null) {
      this.cache.delete(keyPathStr);
      this.updateTimes.delete(keyPathStr);
    } else {
      this.cache.set(keyPathStr, nextValue);
      this.updateTimes.set(keyPathStr, updateId);
      updateId += 1;
    }
  }
};
var Cache_default = Entity;

// node_modules/@ant-design/cssinjs/es/StyleContext.js
var ATTR_TOKEN = "data-token-hash";
var ATTR_MARK = "data-css-hash";
var ATTR_CACHE_PATH = "data-cache-path";
var CSS_IN_JS_INSTANCE = "__cssinjs_instance__";
function createCache() {
  const cssinjsInstanceId = Math.random().toString(12).slice(2);
  if (typeof document !== "undefined" && document.head && document.body) {
    const styles = document.body.querySelectorAll(`style[${ATTR_MARK}]`) || [];
    const {
      firstChild
    } = document.head;
    Array.from(styles).forEach((style2) => {
      style2[CSS_IN_JS_INSTANCE] ||= cssinjsInstanceId;
      if (style2[CSS_IN_JS_INSTANCE] === cssinjsInstanceId) {
        document.head.insertBefore(style2, firstChild);
      }
    });
    const styleHash = {};
    Array.from(document.querySelectorAll(`style[${ATTR_MARK}]`)).forEach((style2) => {
      const hash2 = style2.getAttribute(ATTR_MARK);
      if (styleHash[hash2]) {
        if (style2[CSS_IN_JS_INSTANCE] === cssinjsInstanceId) {
          style2.parentNode?.removeChild(style2);
        }
      } else {
        styleHash[hash2] = true;
      }
    });
  }
  return new Cache_default(cssinjsInstanceId);
}
var StyleContext = React6.createContext({
  hashPriority: "low",
  cache: createCache(),
  defaultCache: true,
  autoPrefix: false
});
var StyleContext_default = StyleContext;

// node_modules/@ant-design/cssinjs/es/theme/calc/CSSCalculator.js
var CALC_UNIT = "CALC_UNIT";
var regexp = new RegExp(CALC_UNIT, "g");

// node_modules/@ant-design/cssinjs/es/theme/ThemeCache.js
function sameDerivativeOption(left, right) {
  if (left.length !== right.length) {
    return false;
  }
  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) {
      return false;
    }
  }
  return true;
}
var ThemeCache = class _ThemeCache {
  static MAX_CACHE_SIZE = 20;
  static MAX_CACHE_OFFSET = 5;
  cache;
  keys;
  cacheCallTimes;
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
    this.keys = [];
    this.cacheCallTimes = 0;
  }
  size() {
    return this.keys.length;
  }
  internalGet(derivativeOption, updateCallTimes = false) {
    let cache = {
      map: this.cache
    };
    derivativeOption.forEach((derivative2) => {
      if (!cache) {
        cache = void 0;
      } else {
        cache = cache?.map?.get(derivative2);
      }
    });
    if (cache?.value && updateCallTimes) {
      cache.value[1] = this.cacheCallTimes++;
    }
    return cache?.value;
  }
  get(derivativeOption) {
    return this.internalGet(derivativeOption, true)?.[0];
  }
  has(derivativeOption) {
    return !!this.internalGet(derivativeOption);
  }
  set(derivativeOption, value) {
    if (!this.has(derivativeOption)) {
      if (this.size() + 1 > _ThemeCache.MAX_CACHE_SIZE + _ThemeCache.MAX_CACHE_OFFSET) {
        const [targetKey] = this.keys.reduce((result, key) => {
          const [, callTimes] = result;
          if (this.internalGet(key)[1] < callTimes) {
            return [key, this.internalGet(key)[1]];
          }
          return result;
        }, [this.keys[0], this.cacheCallTimes]);
        this.delete(targetKey);
      }
      this.keys.push(derivativeOption);
    }
    let cache = this.cache;
    derivativeOption.forEach((derivative2, index) => {
      if (index === derivativeOption.length - 1) {
        cache.set(derivative2, {
          value: [value, this.cacheCallTimes++]
        });
      } else {
        const cacheValue = cache.get(derivative2);
        if (!cacheValue) {
          cache.set(derivative2, {
            map: /* @__PURE__ */ new Map()
          });
        } else if (!cacheValue.map) {
          cacheValue.map = /* @__PURE__ */ new Map();
        }
        cache = cache.get(derivative2).map;
      }
    });
  }
  deleteByPath(currentCache, derivatives) {
    const cache = currentCache.get(derivatives[0]);
    if (derivatives.length === 1) {
      if (!cache.map) {
        currentCache.delete(derivatives[0]);
      } else {
        currentCache.set(derivatives[0], {
          map: cache.map
        });
      }
      return cache.value?.[0];
    }
    const result = this.deleteByPath(cache.map, derivatives.slice(1));
    if ((!cache.map || cache.map.size === 0) && !cache.value) {
      currentCache.delete(derivatives[0]);
    }
    return result;
  }
  delete(derivativeOption) {
    if (this.has(derivativeOption)) {
      this.keys = this.keys.filter((item) => !sameDerivativeOption(item, derivativeOption));
      return this.deleteByPath(this.cache, derivativeOption);
    }
    return void 0;
  }
};

// node_modules/@ant-design/cssinjs/es/theme/Theme.js
var uuid = 0;
var Theme = class {
  derivatives;
  id;
  constructor(derivatives) {
    this.derivatives = Array.isArray(derivatives) ? derivatives : [derivatives];
    this.id = uuid;
    if (derivatives.length === 0) {
      warning(derivatives.length > 0, "[Ant Design CSS-in-JS] Theme should have at least one derivative function.");
    }
    uuid += 1;
  }
  getDerivativeToken(token2) {
    return this.derivatives.reduce((result, derivative2) => derivative2(token2, result), void 0);
  }
};

// node_modules/@ant-design/cssinjs/es/theme/createTheme.js
var cacheThemes = new ThemeCache();
function createTheme(derivatives) {
  const derivativeArr = Array.isArray(derivatives) ? derivatives : [derivatives];
  if (!cacheThemes.has(derivativeArr)) {
    cacheThemes.set(derivativeArr, new Theme(derivativeArr));
  }
  return cacheThemes.get(derivativeArr);
}

// node_modules/@ant-design/cssinjs/es/util/index.js
var resultCache = /* @__PURE__ */ new WeakMap();
var RESULT_VALUE = {};
function memoResult(callback, deps) {
  let current = resultCache;
  for (let i = 0; i < deps.length; i += 1) {
    const dep = deps[i];
    if (!current.has(dep)) {
      current.set(dep, /* @__PURE__ */ new WeakMap());
    }
    current = current.get(dep);
  }
  if (!current.has(RESULT_VALUE)) {
    current.set(RESULT_VALUE, callback());
  }
  return current.get(RESULT_VALUE);
}
var flattenTokenCache = /* @__PURE__ */ new WeakMap();
function flattenToken(token2) {
  let str = flattenTokenCache.get(token2) || "";
  if (!str) {
    Object.keys(token2).forEach((key) => {
      const value = token2[key];
      str += key;
      if (value instanceof Theme) {
        str += value.id;
      } else if (value && typeof value === "object") {
        str += flattenToken(value);
      } else {
        str += value;
      }
    });
    str = hash_browser_esm_default(str);
    flattenTokenCache.set(token2, str);
  }
  return str;
}
function token2key(token2, salt) {
  return hash_browser_esm_default(`${salt}_${flattenToken(token2)}`);
}
var randomSelectorKey = `random-${Date.now()}-${Math.random()}`.replace(/\./g, "");
var isClientSide = canUseDom();
function unit(num) {
  if (typeof num === "number") {
    return `${num}px`;
  }
  return num;
}
function toStyleStr(style2, tokenKey, styleId, customizeAttrs = {}, plain = false) {
  if (plain) {
    return style2;
  }
  const attrs = {
    ...customizeAttrs,
    [ATTR_TOKEN]: tokenKey,
    [ATTR_MARK]: styleId
  };
  const attrStr = Object.keys(attrs).map((attr) => {
    const val = attrs[attr];
    return val ? `${attr}="${val}"` : null;
  }).filter((v) => v).join(" ");
  return `<style ${attrStr}>${style2}</style>`;
}
function where(options) {
  const {
    hashCls,
    hashPriority = "low"
  } = options || {};
  if (!hashCls) {
    return "";
  }
  const hashSelector = `.${hashCls}`;
  return hashPriority === "low" ? `:where(${hashSelector})` : hashSelector;
}
var isNonNullable = (val) => {
  return val !== void 0 && val !== null;
};

// node_modules/@ant-design/cssinjs/es/util/css-variables.js
var token2CSSVar = (token2, prefix2 = "") => {
  return `--${prefix2 ? `${prefix2}-` : ""}${token2}`.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2").replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();
};
var serializeCSSVar = (cssVars, hashId, options) => {
  const {
    hashCls,
    hashPriority = "low"
  } = options || {};
  if (!Object.keys(cssVars).length) {
    return "";
  }
  return `${where({
    hashCls,
    hashPriority
  })}.${hashId}${options?.scope ? `.${options.scope}` : ""}{${Object.entries(cssVars).map(([key, value]) => `${key}:${value};`).join("")}}`;
};
var transformToken = (token2, themeKey, config) => {
  const {
    hashCls,
    hashPriority = "low",
    prefix: prefix2,
    unitless: unitless2,
    ignore: ignore2,
    preserve: preserve2
  } = config || {};
  const cssVars = {};
  const result = {};
  Object.entries(token2).forEach(([key, value]) => {
    if (preserve2?.[key]) {
      result[key] = value;
    } else if ((typeof value === "string" || typeof value === "number") && !ignore2?.[key]) {
      const cssVar = token2CSSVar(key, prefix2);
      cssVars[cssVar] = typeof value === "number" && !unitless2?.[key] ? `${value}px` : String(value);
      result[key] = `var(${cssVar})`;
    }
  });
  return [result, serializeCSSVar(cssVars, themeKey, {
    scope: config?.scope,
    hashCls,
    hashPriority
  })];
};

// node_modules/@ant-design/cssinjs/es/hooks/useGlobalCache.js
var React7 = __toESM(require_react());
var import_react4 = __toESM(require_react());

// node_modules/@ant-design/cssinjs/es/hooks/useHMR.js
var webpackHMR = false;
function useDevHMR() {
  return webpackHMR;
}
var useHMR_default = false ? useProdHMR : useDevHMR;
if (typeof module !== "undefined" && module && module.hot && typeof window !== "undefined") {
  const win = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : null;
  if (win && typeof win.webpackHotUpdate === "function") {
    const originWebpackHotUpdate = win.webpackHotUpdate;
    win.webpackHotUpdate = (...args) => {
      webpackHMR = true;
      setTimeout(() => {
        webpackHMR = false;
      }, 0);
      return originWebpackHotUpdate(...args);
    };
  }
}

// node_modules/@ant-design/cssinjs/es/hooks/useGlobalCache.js
var effectMap = /* @__PURE__ */ new Map();
function useGlobalCache(prefix2, keyPath, cacheFn, onCacheRemove, onCacheEffect) {
  const {
    cache: globalCache
  } = React7.useContext(StyleContext_default);
  const fullPath = [prefix2, ...keyPath];
  const fullPathStr = pathKey(fullPath);
  const HMRUpdate = useHMR_default();
  const buildCache = (updater) => {
    globalCache.opUpdate(fullPathStr, (prevCache) => {
      const [times = 0, cache] = prevCache || [void 0, void 0];
      let tmpCache = cache;
      if (cache && HMRUpdate) {
        onCacheRemove?.(tmpCache, HMRUpdate);
        tmpCache = null;
      }
      const mergedCache = tmpCache || cacheFn();
      const data = [times, mergedCache];
      return updater ? updater(data) : data;
    });
  };
  React7.useMemo(
    () => {
      buildCache();
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [fullPathStr]
    /* eslint-enable */
  );
  let cacheEntity = globalCache.opGet(fullPathStr);
  if (!cacheEntity) {
    buildCache();
    cacheEntity = globalCache.opGet(fullPathStr);
  }
  const cacheContent = cacheEntity[1];
  (0, import_react4.useInsertionEffect)(() => {
    buildCache(([times, cache]) => [times + 1, cache]);
    if (!effectMap.has(fullPathStr)) {
      onCacheEffect?.(cacheContent);
      effectMap.set(fullPathStr, true);
      Promise.resolve().then(() => {
        effectMap.delete(fullPathStr);
      });
    }
    return () => {
      globalCache.opUpdate(fullPathStr, (prevCache) => {
        const [times = 0, cache] = prevCache || [];
        const nextCount = times - 1;
        if (nextCount === 0) {
          onCacheRemove?.(cache, false);
          effectMap.delete(fullPathStr);
          return null;
        }
        return [times - 1, cache];
      });
    };
  }, [fullPathStr]);
  return cacheContent;
}

// node_modules/@ant-design/cssinjs/es/hooks/useCacheToken.js
var EMPTY_OVERRIDE = {};
var hashPrefix = true ? "css-dev-only-do-not-override" : "css";
var tokenKeys = /* @__PURE__ */ new Map();
function recordCleanToken(tokenKey) {
  tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) + 1);
}
function removeStyleTags(key, instanceId) {
  if (typeof document !== "undefined") {
    const styles = document.querySelectorAll(`style[${ATTR_TOKEN}="${key}"]`);
    styles.forEach((style2) => {
      if (style2[CSS_IN_JS_INSTANCE] === instanceId) {
        style2.parentNode?.removeChild(style2);
      }
    });
  }
}
var TOKEN_THRESHOLD = -1;
function cleanTokenStyle(tokenKey, instanceId) {
  tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) - 1);
  const cleanableKeyList = /* @__PURE__ */ new Set();
  tokenKeys.forEach((value, key) => {
    if (value <= 0) cleanableKeyList.add(key);
  });
  if (tokenKeys.size - cleanableKeyList.size > TOKEN_THRESHOLD) {
    cleanableKeyList.forEach((key) => {
      removeStyleTags(key, instanceId);
      tokenKeys.delete(key);
    });
  }
}
var getComputedToken = (originToken, overrideToken, theme, format) => {
  const derivativeToken = theme.getDerivativeToken(originToken);
  let mergedDerivativeToken = {
    ...derivativeToken,
    ...overrideToken
  };
  if (format) {
    mergedDerivativeToken = format(mergedDerivativeToken);
  }
  return mergedDerivativeToken;
};
var TOKEN_PREFIX = "token";
function useCacheToken(theme, tokens, option) {
  const {
    cache: {
      instanceId
    },
    container,
    hashPriority
  } = (0, import_react5.useContext)(StyleContext_default);
  const {
    salt = "",
    override = EMPTY_OVERRIDE,
    formatToken: formatToken2,
    getComputedToken: compute,
    cssVar
  } = option;
  const mergedToken = memoResult(() => Object.assign({}, ...tokens), tokens);
  const tokenStr = flattenToken(mergedToken);
  const overrideTokenStr = flattenToken(override);
  const cssVarStr = flattenToken(cssVar);
  const cachedToken = useGlobalCache(TOKEN_PREFIX, [salt, theme.id, tokenStr, overrideTokenStr, cssVarStr], () => {
    const mergedDerivativeToken = compute ? compute(mergedToken, override, theme) : getComputedToken(mergedToken, override, theme, formatToken2);
    const actualToken = {
      ...mergedDerivativeToken
    };
    const mergedSalt = `${salt}_${cssVar.prefix}`;
    const hashId = hash_browser_esm_default(mergedSalt);
    const hashCls = `${hashPrefix}-${hashId}`;
    actualToken._tokenKey = token2key(actualToken, mergedSalt);
    const [tokenWithCssVar, cssVarsStr] = transformToken(mergedDerivativeToken, cssVar.key, {
      prefix: cssVar.prefix,
      ignore: cssVar.ignore,
      unitless: cssVar.unitless,
      preserve: cssVar.preserve,
      hashPriority,
      hashCls: cssVar.hashed ? hashCls : void 0
    });
    tokenWithCssVar._hashId = hashId;
    recordCleanToken(cssVar.key);
    return [tokenWithCssVar, hashCls, actualToken, cssVarsStr, cssVar.key];
  }, ([, , , , themeKey]) => {
    cleanTokenStyle(themeKey, instanceId);
  }, ([, , , cssVarsStr, themeKey]) => {
    if (!cssVarsStr) {
      return;
    }
    const style2 = updateCSS(cssVarsStr, hash_browser_esm_default(`css-var-${themeKey}`), {
      mark: ATTR_MARK,
      prepend: "queue",
      attachTo: container,
      priority: -999
    });
    style2[CSS_IN_JS_INSTANCE] = instanceId;
    style2.setAttribute(ATTR_TOKEN, themeKey);
  });
  return cachedToken;
}
var extract = (cache, effectStyles, options) => {
  const [, , realToken, styleStr, cssVarKey] = cache;
  const {
    plain
  } = options || {};
  if (!styleStr) {
    return null;
  }
  const styleId = realToken._tokenKey;
  const order = -999;
  const sharedAttrs = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": `${order}`
  };
  const styleText = toStyleStr(styleStr, cssVarKey, styleId, sharedAttrs, plain);
  return [order, styleId, styleText];
};

// node_modules/@ant-design/cssinjs/es/hooks/useCSSVarRegister.js
var import_react6 = __toESM(require_react());

// node_modules/@ant-design/cssinjs/es/hooks/useStyleRegister.js
var React8 = __toESM(require_react());

// node_modules/@emotion/unitless/dist/unitless.browser.esm.js
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var unitless_browser_esm_default = unitlessKeys;

// node_modules/stylis/src/Enum.js
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var NAMESPACE = "@namespace";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";

// node_modules/stylis/src/Utility.js
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search, position2) {
  return value.indexOf(search, position2);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
function filter(array, pattern) {
  return array.filter(function(value) {
    return !match(value, pattern);
  });
}

// node_modules/stylis/src/Tokenizer.js
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2, siblings) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "", siblings };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0, root.siblings), root, { length: -root.length }, props);
}
function lift(root) {
  while (root.root)
    root = copy(root.root, { children: [root] });
  append(root, root.siblings);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      // ] ) " '
      case type:
        return position;
      // " '
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      // (
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      // \
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}

// node_modules/stylis/src/Parser.js
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      // (
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f", abs(index ? points[index - 1] : 0)) != -1)
            ampersand = -1;
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      // \
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      // /
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
            if ((token(previous || 1) == 5 || token(peek() || 1) == 5) && strlen(characters2) && substr(characters2, -1, void 0) !== " ") characters2 += " ";
            break;
          default:
            characters2 += "/";
        }
        break;
      // {
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      // } ; \0
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          // \0 }
          case 0:
          case 125:
            scanning = 0;
          // ;
          case 59 + offset:
            if (ampersand == -1) characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && (strlen(characters2) - length2 || variable === 0 && previous === 47))
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1, declarations) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2, declarations), declarations);
            break;
          // @ ;
          case 59:
            characters2 += ";";
          // { rule/at-rule
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2, rulesets), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else {
                switch (atrule) {
                  // c(ontainer)
                  case 99:
                    if (charat(characters2, 3) === 110) break;
                  // l(ayer)
                  case 108:
                    if (charat(characters2, 2) === 97) break;
                  default:
                    offset = 0;
                  // d(ocument) m(edia) s(upports)
                  case 100:
                  case 109:
                  case 115:
                }
                if (offset) parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2, children), children), rules, children, length2, points, rule ? props : children);
                else parse(characters2, reference, reference, reference, [""], children, 0, points, children);
              }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      // :
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          // &
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          // ,
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          // @
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          // -
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2, siblings) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2, siblings);
}
function comment(value, root, parent, siblings) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
}
function declaration(value, root, parent, length2, siblings) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2, siblings);
}

// node_modules/stylis/src/Prefixer.js
function prefix(value, length2, children) {
  switch (hash(value, length2)) {
    // color-adjust
    case 5103:
      return WEBKIT + "print-" + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
      return WEBKIT + value + value;
    // mask-composite
    case 4855:
      return WEBKIT + value.replace("add", "source-over").replace("substract", "source-out").replace("intersect", "source-in").replace("exclude", "xor") + value;
    // tab-size
    case 4789:
      return MOZ + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    // writing-mode
    case 5936:
      switch (charat(value, length2 + 11)) {
        // vertical-l(r)
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        // vertical-r(l)
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        // horizontal(-)tb
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
    // flex, flex-direction, scroll-snap-type, writing-mode
    case 6828:
    case 4268:
    case 2903:
      return WEBKIT + value + MS + value + value;
    // order
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    // align-items
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    // align-self
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/g, "") + (!match(value, /flex-|baseline/) ? MS + "grid-row-" + replace(value, /flex-|-self/g, "") : "") + value;
    // align-content
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/g, "") + value;
    // flex-shrink
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    // flex-basis
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    // flex-grow
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    // transition
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    // cursor
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    // background, background-image
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    // justify-content
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /space-between/, "justify") + WEBKIT + value + value;
    // justify-self
    case 4200:
      if (!match(value, /flex-|baseline/)) return MS + "grid-column-align" + substr(value, length2) + value;
      break;
    // grid-template-(columns|rows)
    case 2592:
    case 3360:
      return MS + replace(value, "template-", "") + value;
    // grid-(row|column)-start
    case 4384:
    case 3616:
      if (children && children.some(function(element, index) {
        return length2 = index, match(element.props, /grid-\w+-end/);
      })) {
        return ~indexof(value + (children = children[length2].value), "span", 0) ? value : MS + replace(value, "-start", "") + value + MS + "grid-row-span:" + (~indexof(children, "span", 0) ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ";";
      }
      return MS + replace(value, "-start", "") + value;
    // grid-(row|column)-end
    case 4896:
    case 4128:
      return children && children.some(function(element) {
        return match(element.props, /grid-\w+-start/);
      }) ? value : MS + replace(replace(value, "-end", "-span"), "span ", "") + value;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          // (m)ax-content, (m)in-content
          case 109:
            if (charat(value, length2 + 4) !== 45)
              break;
          // (f)ill-available, (f)it-content
          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
          // (s)tretch
          case 115:
            return ~indexof(value, "stretch", 0) ? prefix(replace(value, "stretch", "fill-available"), length2, children) + value : value;
        }
      break;
    // grid-(column|row)
    case 5152:
    case 5920:
      return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(_, a, b, c, d, e, f) {
        return MS + a + ":" + b + f + (c ? MS + a + "-span:" + (d ? e : +e - +b) + f : "") + value;
      });
    // position: sticky
    case 4949:
      if (charat(value, length2 + 6) === 121)
        return replace(value, ":", ":" + WEBKIT) + value;
      break;
    // display: (flex|inline-flex|grid|inline-grid)
    case 6444:
      switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
        // (inline-)?fle(x)
        case 120:
          return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
        // (inline-)?gri(d)
        case 100:
          return replace(value, ":", ":" + MS) + value;
      }
      break;
    // scroll-margin, scroll-margin-(top|right|bottom|left)
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return replace(value, "scroll-", "scroll-snap-") + value;
  }
  return value;
}

// node_modules/stylis/src/Serializer.js
function serialize(children, callback) {
  var output = "";
  for (var i = 0; i < children.length; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length) break;
    case IMPORT:
    case NAMESPACE:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      if (!strlen(element.value = element.props.join(","))) return "";
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}

// node_modules/stylis/src/Middleware.js
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || "";
    return output;
  };
}
function prefixer(element, index, children, callback) {
  if (element.length > -1) {
    if (!element.return)
      switch (element.type) {
        case DECLARATION:
          element.return = prefix(element.value, element.length, children);
          return;
        case KEYFRAMES:
          return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
        case RULESET:
          if (element.length)
            return combine(children = element.props, function(value) {
              switch (match(value, callback = /(::plac\w+|:read-\w+)/)) {
                // :read-(only|write)
                case ":read-only":
                case ":read-write":
                  lift(copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] }));
                  lift(copy(element, { props: [value] }));
                  assign(element, { props: filter(children, callback) });
                  break;
                // :placeholder
                case "::placeholder":
                  lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }));
                  lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }));
                  lift(copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] }));
                  lift(copy(element, { props: [value] }));
                  assign(element, { props: filter(children, callback) });
                  break;
              }
              return "";
            });
      }
  }
}

// node_modules/@ant-design/cssinjs/es/linters/utils.js
function lintWarning(message, info) {
  const {
    path,
    parentSelectors
  } = info;
  warning_default(false, `[Ant Design CSS-in-JS] ${path ? `Error in ${path}: ` : ""}${message}${parentSelectors.length ? ` Selector: ${parentSelectors.join(" | ")}` : ""}`);
}

// node_modules/@ant-design/cssinjs/es/linters/contentQuotesLinter.js
var linter = (key, value, info) => {
  if (key === "content") {
    const contentValuePattern = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
    const contentValues = ["normal", "none", "initial", "inherit", "unset"];
    if (typeof value !== "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && !value.startsWith("var(") && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
      lintWarning(`You seem to be using a value for 'content' without quotes, try replacing it with \`content: '"${value}"'\`.`, info);
    }
  }
};
var contentQuotesLinter_default = linter;

// node_modules/@ant-design/cssinjs/es/linters/hashedAnimationLinter.js
var linter2 = (key, value, info) => {
  if (key === "animation") {
    if (info.hashId && value !== "none") {
      lintWarning(`You seem to be using hashed animation '${value}', in which case 'animationName' with Keyframe as value is recommended.`, info);
    }
  }
};
var hashedAnimationLinter_default = linter2;

// node_modules/@ant-design/cssinjs/es/util/cacheMapUtil.js
var ATTR_CACHE_MAP = "data-ant-cssinjs-cache-path";
var CSS_FILE_STYLE = "_FILE_STYLE__";
var cachePathMap;
var fromCSSFile = true;
function prepare() {
  if (!cachePathMap) {
    cachePathMap = {};
    if (canUseDom()) {
      const div = document.createElement("div");
      div.className = ATTR_CACHE_MAP;
      div.style.position = "fixed";
      div.style.visibility = "hidden";
      div.style.top = "-9999px";
      document.body.appendChild(div);
      let content = getComputedStyle(div).content || "";
      content = content.replace(/^"/, "").replace(/"$/, "");
      content.split(";").forEach((item) => {
        const [path, hash2] = item.split(":");
        cachePathMap[path] = hash2;
      });
      const inlineMapStyle = document.querySelector(`style[${ATTR_CACHE_MAP}]`);
      if (inlineMapStyle) {
        fromCSSFile = false;
        inlineMapStyle.parentNode?.removeChild(inlineMapStyle);
      }
      document.body.removeChild(div);
    }
  }
}
function existPath(path) {
  prepare();
  return !!cachePathMap[path];
}
function getStyleAndHash(path) {
  const hash2 = cachePathMap[path];
  let styleStr = null;
  if (hash2 && canUseDom()) {
    if (fromCSSFile) {
      styleStr = CSS_FILE_STYLE;
    } else {
      const style2 = document.querySelector(`style[${ATTR_MARK}="${cachePathMap[path]}"]`);
      if (style2) {
        styleStr = style2.innerHTML;
      } else {
        delete cachePathMap[path];
      }
    }
  }
  return [styleStr, hash2];
}

// node_modules/@ant-design/cssinjs/es/hooks/useStyleRegister.js
var SKIP_CHECK = "_skip_check_";
var MULTI_VALUE = "_multi_value_";
function normalizeStyle(styleStr, autoPrefix) {
  const serialized = autoPrefix ? serialize(compile(styleStr), middleware([prefixer, stringify])) : serialize(compile(styleStr), stringify);
  return serialized.replace(/\{%%%\:[^;];}/g, ";");
}
function isCompoundCSSProperty(value) {
  return typeof value === "object" && value && (SKIP_CHECK in value || MULTI_VALUE in value);
}
function injectSelectorHash(key, hashId, hashPriority = "high") {
  if (!hashId) {
    return key;
  }
  const hashSelector = where({
    hashCls: hashId,
    hashPriority
  });
  const keys2 = key.split(",").map((k) => {
    const fullPath = k.trim().split(/\s+/);
    let firstPath = fullPath[0] || "";
    const htmlElement = firstPath.match(/^\w+/)?.[0] || "";
    firstPath = `${htmlElement}${hashSelector}${firstPath.slice(htmlElement.length)}`;
    return [firstPath, ...fullPath.slice(1)].join(" ");
  });
  return keys2.join(",");
}
var parseStyle = (interpolation, config = {}, {
  root,
  injectHash,
  parentSelectors
} = {
  root: true,
  parentSelectors: []
}) => {
  const {
    hashId,
    layer,
    path,
    hashPriority,
    transformers = [],
    linters = []
  } = config;
  let styleStr = "";
  let effectStyle = {};
  function parseKeyframes(keyframes) {
    const animationName = keyframes.getName(hashId);
    if (!effectStyle[animationName]) {
      const [parsedStr] = parseStyle(keyframes.style, config, {
        root: false,
        parentSelectors
      });
      effectStyle[animationName] = `@keyframes ${keyframes.getName(hashId)}${parsedStr}`;
    }
  }
  function flattenList(list, fullList = []) {
    list.forEach((item) => {
      if (Array.isArray(item)) {
        flattenList(item, fullList);
      } else if (item) {
        fullList.push(item);
      }
    });
    return fullList;
  }
  const flattenStyleList = flattenList(Array.isArray(interpolation) ? interpolation : [interpolation]);
  flattenStyleList.forEach((originStyle) => {
    const style2 = typeof originStyle === "string" && !root ? {} : originStyle;
    if (typeof style2 === "string") {
      styleStr += `${style2}
`;
    } else if (style2._keyframe) {
      parseKeyframes(style2);
    } else {
      const mergedStyle = transformers.reduce((prev2, trans) => trans?.visit?.(prev2) || prev2, style2);
      Object.keys(mergedStyle).forEach((key) => {
        const value = mergedStyle[key];
        if (typeof value === "object" && value && (key !== "animationName" || !value._keyframe) && !isCompoundCSSProperty(value)) {
          let subInjectHash = false;
          let mergedKey = key.trim();
          let nextRoot = false;
          if ((root || injectHash) && hashId) {
            if (mergedKey.startsWith("@")) {
              subInjectHash = true;
            } else if (mergedKey === "&") {
              mergedKey = injectSelectorHash("", hashId, hashPriority);
            } else {
              mergedKey = injectSelectorHash(key, hashId, hashPriority);
            }
          } else if (root && !hashId && (mergedKey === "&" || mergedKey === "")) {
            mergedKey = "";
            nextRoot = true;
          }
          const [parsedStr, childEffectStyle] = parseStyle(value, config, {
            root: nextRoot,
            injectHash: subInjectHash,
            parentSelectors: [...parentSelectors, mergedKey]
          });
          effectStyle = {
            ...effectStyle,
            ...childEffectStyle
          };
          styleStr += `${mergedKey}${parsedStr}`;
        } else {
          let appendStyle = function(cssKey, cssValue) {
            if (typeof value !== "object" || !value?.[SKIP_CHECK]) {
              [contentQuotesLinter_default, hashedAnimationLinter_default, ...linters].forEach((linter3) => linter3(cssKey, cssValue, {
                path,
                hashId,
                parentSelectors
              }));
            }
            const styleName = cssKey.replace(/[A-Z]/g, (match2) => `-${match2.toLowerCase()}`);
            let formatValue = cssValue;
            if (!unitless_browser_esm_default[cssKey] && typeof formatValue === "number" && formatValue !== 0) {
              formatValue = `${formatValue}px`;
            }
            if (cssKey === "animationName" && cssValue?._keyframe) {
              parseKeyframes(cssValue);
              formatValue = cssValue.getName(hashId);
            }
            styleStr += `${styleName}:${formatValue};`;
          };
          const actualValue = value?.value ?? value;
          if (typeof value === "object" && value?.[MULTI_VALUE] && Array.isArray(actualValue)) {
            actualValue.forEach((item) => {
              appendStyle(key, item);
            });
          } else {
            if (isNonNullable(actualValue)) {
              appendStyle(key, actualValue);
            }
          }
        }
      });
    }
  });
  if (!root) {
    styleStr = `{${styleStr}}`;
  } else if (layer) {
    if (styleStr) {
      styleStr = `@layer ${layer.name} {${styleStr}}`;
    }
    if (layer.dependencies) {
      effectStyle[`@layer ${layer.name}`] = layer.dependencies.map((deps) => `@layer ${deps}, ${layer.name};`).join("\n");
    }
  }
  return [styleStr, effectStyle];
};
function uniqueHash(path, styleStr) {
  return hash_browser_esm_default(`${path.join("%")}${styleStr}`);
}
var STYLE_PREFIX = "style";
function useStyleRegister(info, styleFn) {
  const {
    path,
    hashId,
    layer,
    nonce,
    clientOnly,
    order = 0
  } = info;
  const {
    mock,
    hashPriority,
    container,
    transformers,
    linters,
    cache,
    layer: enableLayer,
    autoPrefix
  } = React8.useContext(StyleContext_default);
  const fullPath = [hashId || ""];
  if (enableLayer) {
    fullPath.push("layer");
  }
  fullPath.push(...path);
  let isMergedClientSide = isClientSide;
  if (mock !== void 0) {
    isMergedClientSide = mock === "client";
  }
  useGlobalCache(
    STYLE_PREFIX,
    fullPath,
    // Create cache if needed
    () => {
      const cachePath = fullPath.join("|");
      if (existPath(cachePath)) {
        const [inlineCacheStyleStr, styleHash] = getStyleAndHash(cachePath);
        if (inlineCacheStyleStr) {
          return [inlineCacheStyleStr, styleHash, {}, clientOnly, order];
        }
      }
      const styleObj = styleFn();
      const [parsedStyle, effectStyle] = parseStyle(styleObj, {
        hashId,
        hashPriority,
        layer: enableLayer ? layer : void 0,
        path: path.join("-"),
        transformers,
        linters
      });
      const styleStr = normalizeStyle(parsedStyle, autoPrefix || false);
      const styleId = uniqueHash(fullPath, styleStr);
      return [styleStr, styleId, effectStyle, clientOnly, order];
    },
    // Remove cache if no need
    (cacheValue, fromHMR) => {
      const [, styleId] = cacheValue;
      if (fromHMR && isClientSide) {
        removeCSS(styleId, {
          mark: ATTR_MARK,
          attachTo: container
        });
      }
    },
    // Effect: Inject style here
    (cacheValue) => {
      const [styleStr, styleId, effectStyle, , priority] = cacheValue;
      if (isMergedClientSide && styleStr !== CSS_FILE_STYLE) {
        const mergedCSSConfig = {
          mark: ATTR_MARK,
          prepend: enableLayer ? false : "queue",
          attachTo: container,
          priority
        };
        const nonceStr = typeof nonce === "function" ? nonce() : nonce;
        if (nonceStr) {
          mergedCSSConfig.csp = {
            nonce: nonceStr
          };
        }
        const effectLayerKeys = [];
        const effectRestKeys = [];
        Object.keys(effectStyle).forEach((key) => {
          if (key.startsWith("@layer")) {
            effectLayerKeys.push(key);
          } else {
            effectRestKeys.push(key);
          }
        });
        effectLayerKeys.forEach((effectKey) => {
          updateCSS(normalizeStyle(effectStyle[effectKey], autoPrefix || false), `_layer-${effectKey}`, {
            ...mergedCSSConfig,
            prepend: true
          });
        });
        const style2 = updateCSS(styleStr, styleId, mergedCSSConfig);
        style2[CSS_IN_JS_INSTANCE] = cache.instanceId;
        if (true) {
          style2.setAttribute(ATTR_CACHE_PATH, fullPath.join("|"));
        }
        effectRestKeys.forEach((effectKey) => {
          updateCSS(normalizeStyle(effectStyle[effectKey], autoPrefix || false), `_effect-${effectKey}`, mergedCSSConfig);
        });
      }
    }
  );
}
var extract2 = (cache, effectStyles, options) => {
  const [styleStr, styleId, effectStyle, clientOnly, order] = cache;
  const {
    plain,
    autoPrefix
  } = options || {};
  if (clientOnly) {
    return null;
  }
  let keyStyleText = styleStr;
  const sharedAttrs = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": `${order}`
  };
  keyStyleText = toStyleStr(styleStr, void 0, styleId, sharedAttrs, plain);
  if (effectStyle) {
    Object.keys(effectStyle).forEach((effectKey) => {
      if (!effectStyles[effectKey]) {
        effectStyles[effectKey] = true;
        const effectStyleStr = normalizeStyle(effectStyle[effectKey], autoPrefix || false);
        const effectStyleHTML = toStyleStr(effectStyleStr, void 0, `_effect-${effectKey}`, sharedAttrs, plain);
        if (effectKey.startsWith("@layer")) {
          keyStyleText = effectStyleHTML + keyStyleText;
        } else {
          keyStyleText += effectStyleHTML;
        }
      }
    });
  }
  return [order, styleId, keyStyleText];
};

// node_modules/@ant-design/cssinjs/es/hooks/useCSSVarRegister.js
var CSS_VAR_PREFIX = "cssVar";
var useCSSVarRegister = (config, fn) => {
  const {
    key,
    prefix: prefix2,
    unitless: unitless2,
    ignore: ignore2,
    token: token2,
    hashId,
    scope = ""
  } = config;
  const {
    cache: {
      instanceId
    },
    container,
    hashPriority
  } = (0, import_react6.useContext)(StyleContext_default);
  const {
    _tokenKey: tokenKey
  } = token2;
  const stylePath = [...config.path, key, scope, tokenKey];
  const cache = useGlobalCache(CSS_VAR_PREFIX, stylePath, () => {
    const originToken = fn();
    const [mergedToken, cssVarsStr] = transformToken(originToken, key, {
      prefix: prefix2,
      unitless: unitless2,
      ignore: ignore2,
      scope,
      hashPriority,
      hashCls: hashId
    });
    const styleId = uniqueHash(stylePath, cssVarsStr);
    return [mergedToken, cssVarsStr, styleId, key];
  }, ([, , styleId]) => {
    if (isClientSide) {
      removeCSS(styleId, {
        mark: ATTR_MARK,
        attachTo: container
      });
    }
  }, ([, cssVarsStr, styleId]) => {
    if (!cssVarsStr) {
      return;
    }
    const style2 = updateCSS(cssVarsStr, styleId, {
      mark: ATTR_MARK,
      prepend: "queue",
      attachTo: container,
      priority: -999
    });
    style2[CSS_IN_JS_INSTANCE] = instanceId;
    style2.setAttribute(ATTR_TOKEN, key);
  });
  return cache;
};
var extract3 = (cache, effectStyles, options) => {
  const [, styleStr, styleId, cssVarKey] = cache;
  const {
    plain
  } = options || {};
  if (!styleStr) {
    return null;
  }
  const order = -999;
  const sharedAttrs = {
    "data-rc-order": "prependQueue",
    "data-rc-priority": `${order}`
  };
  const styleText = toStyleStr(styleStr, cssVarKey, styleId, sharedAttrs, plain);
  return [order, styleId, styleText];
};
var useCSSVarRegister_default = useCSSVarRegister;

// node_modules/@ant-design/cssinjs/es/extractStyle.js
var ExtractStyleFns = {
  [STYLE_PREFIX]: extract2,
  [TOKEN_PREFIX]: extract,
  [CSS_VAR_PREFIX]: extract3
};

// node_modules/@ant-design/cssinjs/es/Keyframes.js
var Keyframe = class {
  name;
  style;
  constructor(name, style2) {
    this.name = name;
    this.style = style2;
  }
  getName(hashId = "") {
    return hashId ? `${hashId}-${this.name}` : this.name;
  }
  _keyframe = true;
};
var Keyframes_default = Keyframe;

// node_modules/@ant-design/cssinjs/es/transformers/legacyLogicalProperties.js
function noSplit(list) {
  list.notSplit = true;
  return list;
}
var keyMap = {
  // Inset
  inset: ["top", "right", "bottom", "left"],
  insetBlock: ["top", "bottom"],
  insetBlockStart: ["top"],
  insetBlockEnd: ["bottom"],
  insetInline: ["left", "right"],
  insetInlineStart: ["left"],
  insetInlineEnd: ["right"],
  // Margin
  marginBlock: ["marginTop", "marginBottom"],
  marginBlockStart: ["marginTop"],
  marginBlockEnd: ["marginBottom"],
  marginInline: ["marginLeft", "marginRight"],
  marginInlineStart: ["marginLeft"],
  marginInlineEnd: ["marginRight"],
  // Padding
  paddingBlock: ["paddingTop", "paddingBottom"],
  paddingBlockStart: ["paddingTop"],
  paddingBlockEnd: ["paddingBottom"],
  paddingInline: ["paddingLeft", "paddingRight"],
  paddingInlineStart: ["paddingLeft"],
  paddingInlineEnd: ["paddingRight"],
  // Border
  borderBlock: noSplit(["borderTop", "borderBottom"]),
  borderBlockStart: noSplit(["borderTop"]),
  borderBlockEnd: noSplit(["borderBottom"]),
  borderInline: noSplit(["borderLeft", "borderRight"]),
  borderInlineStart: noSplit(["borderLeft"]),
  borderInlineEnd: noSplit(["borderRight"]),
  // Border width
  borderBlockWidth: ["borderTopWidth", "borderBottomWidth"],
  borderBlockStartWidth: ["borderTopWidth"],
  borderBlockEndWidth: ["borderBottomWidth"],
  borderInlineWidth: ["borderLeftWidth", "borderRightWidth"],
  borderInlineStartWidth: ["borderLeftWidth"],
  borderInlineEndWidth: ["borderRightWidth"],
  // Border style
  borderBlockStyle: ["borderTopStyle", "borderBottomStyle"],
  borderBlockStartStyle: ["borderTopStyle"],
  borderBlockEndStyle: ["borderBottomStyle"],
  borderInlineStyle: ["borderLeftStyle", "borderRightStyle"],
  borderInlineStartStyle: ["borderLeftStyle"],
  borderInlineEndStyle: ["borderRightStyle"],
  // Border color
  borderBlockColor: ["borderTopColor", "borderBottomColor"],
  borderBlockStartColor: ["borderTopColor"],
  borderBlockEndColor: ["borderBottomColor"],
  borderInlineColor: ["borderLeftColor", "borderRightColor"],
  borderInlineStartColor: ["borderLeftColor"],
  borderInlineEndColor: ["borderRightColor"],
  // Border radius
  borderStartStartRadius: ["borderTopLeftRadius"],
  borderStartEndRadius: ["borderTopRightRadius"],
  borderEndStartRadius: ["borderBottomLeftRadius"],
  borderEndEndRadius: ["borderBottomRightRadius"]
};

// node_modules/@ant-design/icons/es/components/Context.js
var import_react7 = __toESM(require_react());
var IconContext = (0, import_react7.createContext)({});
var Context_default = IconContext;

// node_modules/antd/es/_util/warning.js
var React9 = __toESM(require_react());
function noop() {
}
var {
  resetWarned: rcResetWarned
} = warning_default;
var deprecatedWarnList = null;
var _warning = noop;
if (true) {
  _warning = (valid, component, message) => {
    warning_default(valid, `[antd: ${component}] ${message}`);
    if (false) {
      resetWarned();
    }
  };
}
var warning2 = _warning;
var WarningContext = React9.createContext({});
var devUseWarning = true ? (component) => {
  const {
    strict
  } = React9.useContext(WarningContext);
  const typeWarning = (valid, type, message) => {
    if (!valid) {
      if (strict === false && type === "deprecated") {
        const existWarning = deprecatedWarnList;
        if (!deprecatedWarnList) {
          deprecatedWarnList = {};
        }
        deprecatedWarnList[component] = deprecatedWarnList[component] || [];
        if (!deprecatedWarnList[component].includes(message || "")) {
          deprecatedWarnList[component].push(message || "");
        }
        if (!existWarning) {
          console.warn("[antd] There exists deprecated usage in your code:", deprecatedWarnList);
        }
      } else {
        true ? warning2(valid, component, message) : void 0;
      }
    }
  };
  typeWarning.deprecated = (valid, oldProp, newProp, message = "") => {
    typeWarning(valid, "deprecated", `\`${oldProp}\` is deprecated. Please use \`${newProp}\` instead.${message ? ` ${message}` : ""}`);
  };
  return typeWarning;
} : () => {
  const noopWarning = () => {
  };
  noopWarning.deprecated = noop;
  return noopWarning;
};
var warning_default2 = warning2;

// node_modules/antd/es/form/validateMessagesContext.js
var import_react8 = __toESM(require_react());
var validateMessagesContext_default = (0, import_react8.createContext)(void 0);

// node_modules/antd/es/locale/index.js
var React11 = __toESM(require_react());

// node_modules/@rc-component/pagination/es/locale/en_US.js
var locale = {
  // Options
  items_per_page: "/ page",
  jump_to: "Go to",
  jump_to_confirm: "confirm",
  page: "Page",
  // Pagination
  prev_page: "Previous Page",
  next_page: "Next Page",
  prev_5: "Previous 5 Pages",
  next_5: "Next 5 Pages",
  prev_3: "Previous 3 Pages",
  next_3: "Next 3 Pages",
  page_size: "Page Size"
};
var en_US_default = locale;

// node_modules/@rc-component/picker/es/locale/common.js
var commonLocale = {
  yearFormat: "YYYY",
  dayFormat: "D",
  cellMeridiemFormat: "A",
  monthBeforeYear: true
};

// node_modules/@rc-component/picker/es/locale/en_US.js
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function ownKeys(e, r2) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e, r3).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys(Object(t), true).forEach(function(r3) {
      _defineProperty(e, r3, t[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r3) {
      Object.defineProperty(e, r3, Object.getOwnPropertyDescriptor(t, r3));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r2) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r2 || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t);
}
var locale2 = _objectSpread(_objectSpread({}, commonLocale), {}, {
  locale: "en_US",
  today: "Today",
  now: "Now",
  backToToday: "Back to today",
  ok: "OK",
  clear: "Clear",
  week: "Week",
  month: "Month",
  year: "Year",
  timeSelect: "select time",
  dateSelect: "select date",
  weekSelect: "Choose a week",
  monthSelect: "Choose a month",
  yearSelect: "Choose a year",
  decadeSelect: "Choose a decade",
  previousMonth: "Previous month (PageUp)",
  nextMonth: "Next month (PageDown)",
  previousYear: "Last year (Control + left)",
  nextYear: "Next year (Control + right)",
  previousDecade: "Last decade",
  nextDecade: "Next decade",
  previousCentury: "Last century",
  nextCentury: "Next century"
});
var en_US_default2 = locale2;

// node_modules/antd/es/time-picker/locale/en_US.js
var locale3 = {
  placeholder: "Select time",
  rangePlaceholder: ["Start time", "End time"]
};
var en_US_default3 = locale3;

// node_modules/antd/es/date-picker/locale/en_US.js
var locale4 = {
  lang: {
    placeholder: "Select date",
    yearPlaceholder: "Select year",
    quarterPlaceholder: "Select quarter",
    monthPlaceholder: "Select month",
    weekPlaceholder: "Select week",
    rangePlaceholder: ["Start date", "End date"],
    rangeYearPlaceholder: ["Start year", "End year"],
    rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
    rangeMonthPlaceholder: ["Start month", "End month"],
    rangeWeekPlaceholder: ["Start week", "End week"],
    ...en_US_default2
  },
  timePickerLocale: {
    ...en_US_default3
  }
};
var en_US_default4 = locale4;

// node_modules/antd/es/calendar/locale/en_US.js
var en_US_default5 = en_US_default4;

// node_modules/antd/es/locale/en_US.js
var typeTemplate = "${label} is not a valid ${type}";
var localeValues = {
  locale: "en",
  Pagination: en_US_default,
  DatePicker: en_US_default4,
  TimePicker: en_US_default3,
  Calendar: en_US_default5,
  global: {
    placeholder: "Please select",
    close: "Close",
    sortable: "sortable"
  },
  Table: {
    filterTitle: "Filter menu",
    filterConfirm: "OK",
    filterReset: "Reset",
    filterEmptyText: "No filters",
    filterCheckAll: "Select all items",
    filterSearchPlaceholder: "Search in filters",
    emptyText: "No data",
    selectAll: "Select current page",
    selectInvert: "Invert current page",
    selectNone: "Clear all data",
    selectionAll: "Select all data",
    sortTitle: "Sort",
    expand: "Expand row",
    collapse: "Collapse row",
    triggerDesc: "Click to sort descending",
    triggerAsc: "Click to sort ascending",
    cancelSort: "Click to cancel sorting"
  },
  Tour: {
    Next: "Next",
    Previous: "Previous",
    Finish: "Finish"
  },
  Modal: {
    okText: "OK",
    cancelText: "Cancel",
    justOkText: "OK"
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Cancel"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Search here",
    itemUnit: "item",
    itemsUnit: "items",
    remove: "Remove",
    selectCurrent: "Select current page",
    removeCurrent: "Remove current page",
    selectAll: "Select all data",
    deselectAll: "Deselect all data",
    removeAll: "Remove all data",
    selectInvert: "Invert current page"
  },
  Upload: {
    uploading: "Uploading...",
    removeFile: "Remove file",
    uploadError: "Upload error",
    previewFile: "Preview file",
    downloadFile: "Download file"
  },
  Empty: {
    description: "No data"
  },
  Icon: {
    icon: "icon"
  },
  Text: {
    edit: "Edit",
    copy: "Copy",
    copied: "Copied",
    expand: "Expand",
    collapse: "Collapse"
  },
  Form: {
    optional: "(optional)",
    defaultValidateMessages: {
      default: "Field validation error for ${label}",
      required: "Please enter ${label}",
      enum: "${label} must be one of [${enum}]",
      whitespace: "${label} cannot be a blank character",
      date: {
        format: "${label} date format is invalid",
        parse: "${label} cannot be converted to a date",
        invalid: "${label} is an invalid date"
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate
      },
      string: {
        len: "${label} must be ${len} characters",
        min: "${label} must be at least ${min} characters",
        max: "${label} must be up to ${max} characters",
        range: "${label} must be between ${min}-${max} characters"
      },
      number: {
        len: "${label} must be equal to ${len}",
        min: "${label} must be minimum ${min}",
        max: "${label} must be maximum ${max}",
        range: "${label} must be between ${min}-${max}"
      },
      array: {
        len: "Must be ${len} ${label}",
        min: "At least ${min} ${label}",
        max: "At most ${max} ${label}",
        range: "The amount of ${label} must be between ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} does not match the pattern ${pattern}"
      }
    }
  },
  QRCode: {
    expired: "QR code expired",
    refresh: "Refresh",
    scanned: "Scanned"
  },
  ColorPicker: {
    presetEmpty: "Empty",
    transparent: "Transparent",
    singleColor: "Single",
    gradientColor: "Gradient"
  }
};
var en_US_default6 = localeValues;

// node_modules/antd/es/modal/locale.js
var runtimeLocale = {
  ...en_US_default6.Modal
};
var localeList = [];
var generateLocale = () => localeList.reduce((merged, locale5) => ({
  ...merged,
  ...locale5
}), en_US_default6.Modal);
function changeConfirmLocale(newLocale) {
  if (newLocale) {
    const cloneLocale = {
      ...newLocale
    };
    localeList.push(cloneLocale);
    runtimeLocale = generateLocale();
    return () => {
      localeList = localeList.filter((locale5) => locale5 !== cloneLocale);
      runtimeLocale = generateLocale();
    };
  }
  runtimeLocale = {
    ...en_US_default6.Modal
  };
}
function getConfirmLocale() {
  return runtimeLocale;
}

// node_modules/antd/es/locale/context.js
var import_react9 = __toESM(require_react());
var LocaleContext = (0, import_react9.createContext)(void 0);
var context_default = LocaleContext;

// node_modules/antd/es/locale/useLocale.js
var React10 = __toESM(require_react());
var useLocale = (componentName, defaultLocale) => {
  const fullLocale = React10.useContext(context_default);
  const getLocale = React10.useMemo(() => {
    const locale5 = defaultLocale || en_US_default6[componentName];
    const localeFromContext = fullLocale?.[componentName] ?? {};
    return {
      ...typeof locale5 === "function" ? locale5() : locale5,
      ...localeFromContext || {}
    };
  }, [componentName, defaultLocale, fullLocale]);
  const getLocaleCode = React10.useMemo(() => {
    const localeCode = fullLocale?.locale;
    if (fullLocale?.exist && !localeCode) {
      return en_US_default6.locale;
    }
    return localeCode;
  }, [fullLocale]);
  return [getLocale, getLocaleCode];
};
var useLocale_default = useLocale;

// node_modules/antd/es/locale/index.js
var ANT_MARK = "internalMark";
var LocaleProvider = (props) => {
  const {
    locale: locale5 = {},
    children,
    _ANT_MARK__
  } = props;
  if (true) {
    const warning4 = devUseWarning("LocaleProvider");
    true ? warning4(_ANT_MARK__ === ANT_MARK, "deprecated", "`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale") : void 0;
  }
  React11.useEffect(() => {
    const clearLocale = changeConfirmLocale(locale5?.Modal);
    return clearLocale;
  }, [locale5]);
  const getMemoizedContextValue = React11.useMemo(() => ({
    ...locale5,
    exist: true
  }), [locale5]);
  return React11.createElement(context_default.Provider, {
    value: getMemoizedContextValue
  }, children);
};
if (true) {
  LocaleProvider.displayName = "LocaleProvider";
}
var locale_default = LocaleProvider;

// node_modules/antd/es/theme/context.js
var import_react10 = __toESM(require_react());

// node_modules/antd/es/theme/themes/seed.js
var defaultPresetColors = {
  blue: "#1677FF",
  purple: "#722ED1",
  cyan: "#13C2C2",
  green: "#52C41A",
  magenta: "#EB2F96",
  /**
   * @deprecated Use magenta instead
   */
  pink: "#EB2F96",
  red: "#F5222D",
  orange: "#FA8C16",
  yellow: "#FADB14",
  volcano: "#FA541C",
  geekblue: "#2F54EB",
  gold: "#FAAD14",
  lime: "#A0D911"
};
var seedToken = {
  // preset color palettes
  ...defaultPresetColors,
  // Color
  colorPrimary: "#1677ff",
  colorSuccess: "#52c41a",
  colorWarning: "#faad14",
  colorError: "#ff4d4f",
  colorInfo: "#1677ff",
  colorLink: "",
  colorTextBase: "",
  colorBgBase: "",
  // Font
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
  fontFamilyCode: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
  fontSize: 14,
  // Line
  lineWidth: 1,
  lineType: "solid",
  // Motion
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: "cubic-bezier(0.08, 0.82, 0.17, 1)",
  motionEaseInOutCirc: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
  motionEaseOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",
  motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",
  motionEaseInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
  motionEaseOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
  // Radius
  borderRadius: 6,
  // Size
  sizeUnit: 4,
  sizeStep: 4,
  sizePopupArrow: 16,
  // Control Base
  controlHeight: 32,
  // zIndex
  zIndexBase: 0,
  zIndexPopupBase: 1e3,
  // Image
  opacityImage: 1,
  // Wireframe
  wireframe: false,
  // Motion
  motion: true
};
var seed_default = seedToken;

// node_modules/@ant-design/fast-color/es/presetColors.js
var presetColors_default = {
  aliceblue: "9ehhb",
  antiquewhite: "9sgk7",
  aqua: "1ekf",
  aquamarine: "4zsno",
  azure: "9eiv3",
  beige: "9lhp8",
  bisque: "9zg04",
  black: "0",
  blanchedalmond: "9zhe5",
  blue: "73",
  blueviolet: "5e31e",
  brown: "6g016",
  burlywood: "8ouiv",
  cadetblue: "3qba8",
  chartreuse: "4zshs",
  chocolate: "87k0u",
  coral: "9yvyo",
  cornflowerblue: "3xael",
  cornsilk: "9zjz0",
  crimson: "8l4xo",
  cyan: "1ekf",
  darkblue: "3v",
  darkcyan: "rkb",
  darkgoldenrod: "776yz",
  darkgray: "6mbhl",
  darkgreen: "jr4",
  darkgrey: "6mbhl",
  darkkhaki: "7ehkb",
  darkmagenta: "5f91n",
  darkolivegreen: "3bzfz",
  darkorange: "9yygw",
  darkorchid: "5z6x8",
  darkred: "5f8xs",
  darksalmon: "9441m",
  darkseagreen: "5lwgf",
  darkslateblue: "2th1n",
  darkslategray: "1ugcv",
  darkslategrey: "1ugcv",
  darkturquoise: "14up",
  darkviolet: "5rw7n",
  deeppink: "9yavn",
  deepskyblue: "11xb",
  dimgray: "442g9",
  dimgrey: "442g9",
  dodgerblue: "16xof",
  firebrick: "6y7tu",
  floralwhite: "9zkds",
  forestgreen: "1cisi",
  fuchsia: "9y70f",
  gainsboro: "8m8kc",
  ghostwhite: "9pq0v",
  goldenrod: "8j4f4",
  gold: "9zda8",
  gray: "50i2o",
  green: "pa8",
  greenyellow: "6senj",
  grey: "50i2o",
  honeydew: "9eiuo",
  hotpink: "9yrp0",
  indianred: "80gnw",
  indigo: "2xcoy",
  ivory: "9zldc",
  khaki: "9edu4",
  lavenderblush: "9ziet",
  lavender: "90c8q",
  lawngreen: "4vk74",
  lemonchiffon: "9zkct",
  lightblue: "6s73a",
  lightcoral: "9dtog",
  lightcyan: "8s1rz",
  lightgoldenrodyellow: "9sjiq",
  lightgray: "89jo3",
  lightgreen: "5nkwg",
  lightgrey: "89jo3",
  lightpink: "9z6wx",
  lightsalmon: "9z2ii",
  lightseagreen: "19xgq",
  lightskyblue: "5arju",
  lightslategray: "4nwk9",
  lightslategrey: "4nwk9",
  lightsteelblue: "6wau6",
  lightyellow: "9zlcw",
  lime: "1edc",
  limegreen: "1zcxe",
  linen: "9shk6",
  magenta: "9y70f",
  maroon: "4zsow",
  mediumaquamarine: "40eju",
  mediumblue: "5p",
  mediumorchid: "79qkz",
  mediumpurple: "5r3rv",
  mediumseagreen: "2d9ip",
  mediumslateblue: "4tcku",
  mediumspringgreen: "1di2",
  mediumturquoise: "2uabw",
  mediumvioletred: "7rn9h",
  midnightblue: "z980",
  mintcream: "9ljp6",
  mistyrose: "9zg0x",
  moccasin: "9zfzp",
  navajowhite: "9zest",
  navy: "3k",
  oldlace: "9wq92",
  olive: "50hz4",
  olivedrab: "472ub",
  orange: "9z3eo",
  orangered: "9ykg0",
  orchid: "8iu3a",
  palegoldenrod: "9bl4a",
  palegreen: "5yw0o",
  paleturquoise: "6v4ku",
  palevioletred: "8k8lv",
  papayawhip: "9zi6t",
  peachpuff: "9ze0p",
  peru: "80oqn",
  pink: "9z8wb",
  plum: "8nba5",
  powderblue: "6wgdi",
  purple: "4zssg",
  rebeccapurple: "3zk49",
  red: "9y6tc",
  rosybrown: "7cv4f",
  royalblue: "2jvtt",
  saddlebrown: "5fmkz",
  salmon: "9rvci",
  sandybrown: "9jn1c",
  seagreen: "1tdnb",
  seashell: "9zje6",
  sienna: "6973h",
  silver: "7ir40",
  skyblue: "5arjf",
  slateblue: "45e4t",
  slategray: "4e100",
  slategrey: "4e100",
  snow: "9zke2",
  springgreen: "1egv",
  steelblue: "2r1kk",
  tan: "87yx8",
  teal: "pds",
  thistle: "8ggk8",
  tomato: "9yqfb",
  turquoise: "2j4r4",
  violet: "9b10u",
  wheat: "9ld4j",
  white: "9zldr",
  whitesmoke: "9lhpx",
  yellow: "9zl6o",
  yellowgreen: "61fzm"
};

// node_modules/@ant-design/fast-color/es/FastColor.js
var round = Math.round;
function splitColorStr(str, parseNum) {
  const match2 = str.replace(/^[^(]*\((.*)/, "$1").replace(/\).*/, "").match(/\d*\.?\d+%?/g) || [];
  const numList = match2.map((item) => parseFloat(item));
  for (let i = 0; i < 3; i += 1) {
    numList[i] = parseNum(numList[i] || 0, match2[i] || "", i);
  }
  if (match2[3]) {
    numList[3] = match2[3].includes("%") ? numList[3] / 100 : numList[3];
  } else {
    numList[3] = 1;
  }
  return numList;
}
var parseHSVorHSL = (num, _, index) => index === 0 ? num : num / 100;
function limitRange(value, max) {
  const mergedMax = max || 255;
  if (value > mergedMax) {
    return mergedMax;
  }
  if (value < 0) {
    return 0;
  }
  return value;
}
var FastColor = class _FastColor {
  /**
   * All FastColor objects are valid. So isValid is always true. This property is kept to be compatible with TinyColor.
   */
  isValid = true;
  /**
   * Red, R in RGB
   */
  r = 0;
  /**
   * Green, G in RGB
   */
  g = 0;
  /**
   * Blue, B in RGB
   */
  b = 0;
  /**
   * Alpha/Opacity, A in RGBA/HSLA
   */
  a = 1;
  // HSV privates
  _h;
  _hsl_s;
  _hsv_s;
  _l;
  _v;
  // intermediate variables to calculate HSL/HSV
  _max;
  _min;
  _brightness;
  constructor(input) {
    function matchFormat(str) {
      return str[0] in input && str[1] in input && str[2] in input;
    }
    if (!input) {
    } else if (typeof input === "string") {
      let matchPrefix = function(prefix2) {
        return trimStr.startsWith(prefix2);
      };
      const trimStr = input.trim();
      if (/^#?[A-F\d]{3,8}$/i.test(trimStr)) {
        this.fromHexString(trimStr);
      } else if (matchPrefix("rgb")) {
        this.fromRgbString(trimStr);
      } else if (matchPrefix("hsl")) {
        this.fromHslString(trimStr);
      } else if (matchPrefix("hsv") || matchPrefix("hsb")) {
        this.fromHsvString(trimStr);
      } else {
        const presetColor = presetColors_default[trimStr.toLowerCase()];
        if (presetColor) {
          this.fromHexString(
            // Convert 36 hex to 16 hex
            parseInt(presetColor, 36).toString(16).padStart(6, "0")
          );
        }
      }
    } else if (input instanceof _FastColor) {
      this.r = input.r;
      this.g = input.g;
      this.b = input.b;
      this.a = input.a;
      this._h = input._h;
      this._hsl_s = input._hsl_s;
      this._hsv_s = input._hsv_s;
      this._l = input._l;
      this._v = input._v;
    } else if (matchFormat("rgb")) {
      this.r = limitRange(input.r);
      this.g = limitRange(input.g);
      this.b = limitRange(input.b);
      this.a = typeof input.a === "number" ? limitRange(input.a, 1) : 1;
    } else if (matchFormat("hsl")) {
      this.fromHsl(input);
    } else if (matchFormat("hsv")) {
      this.fromHsv(input);
    } else {
      throw new Error("@ant-design/fast-color: unsupported input " + JSON.stringify(input));
    }
  }
  // ======================= Setter =======================
  setR(value) {
    return this._sc("r", value);
  }
  setG(value) {
    return this._sc("g", value);
  }
  setB(value) {
    return this._sc("b", value);
  }
  setA(value) {
    return this._sc("a", value, 1);
  }
  setHue(value) {
    const hsv = this.toHsv();
    hsv.h = value;
    return this._c(hsv);
  }
  // ======================= Getter =======================
  /**
   * Returns the perceived luminance of a color, from 0-1.
   * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   */
  getLuminance() {
    function adjustGamma(raw) {
      const val = raw / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    }
    const R = adjustGamma(this.r);
    const G = adjustGamma(this.g);
    const B = adjustGamma(this.b);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }
  getHue() {
    if (typeof this._h === "undefined") {
      const delta = this.getMax() - this.getMin();
      if (delta === 0) {
        this._h = 0;
      } else {
        this._h = round(60 * (this.r === this.getMax() ? (this.g - this.b) / delta + (this.g < this.b ? 6 : 0) : this.g === this.getMax() ? (this.b - this.r) / delta + 2 : (this.r - this.g) / delta + 4));
      }
    }
    return this._h;
  }
  /**
   * @deprecated should use getHSVSaturation or getHSLSaturation instead
   */
  getSaturation() {
    return this.getHSVSaturation();
  }
  getHSVSaturation() {
    if (typeof this._hsv_s === "undefined") {
      const delta = this.getMax() - this.getMin();
      if (delta === 0) {
        this._hsv_s = 0;
      } else {
        this._hsv_s = delta / this.getMax();
      }
    }
    return this._hsv_s;
  }
  getHSLSaturation() {
    if (typeof this._hsl_s === "undefined") {
      const delta = this.getMax() - this.getMin();
      if (delta === 0) {
        this._hsl_s = 0;
      } else {
        const l = this.getLightness();
        this._hsl_s = delta / 255 / (1 - Math.abs(2 * l - 1));
      }
    }
    return this._hsl_s;
  }
  getLightness() {
    if (typeof this._l === "undefined") {
      this._l = (this.getMax() + this.getMin()) / 510;
    }
    return this._l;
  }
  getValue() {
    if (typeof this._v === "undefined") {
      this._v = this.getMax() / 255;
    }
    return this._v;
  }
  /**
   * Returns the perceived brightness of the color, from 0-255.
   * Note: this is not the b of HSB
   * @see http://www.w3.org/TR/AERT#color-contrast
   */
  getBrightness() {
    if (typeof this._brightness === "undefined") {
      this._brightness = (this.r * 299 + this.g * 587 + this.b * 114) / 1e3;
    }
    return this._brightness;
  }
  // ======================== Func ========================
  darken(amount = 10) {
    const h = this.getHue();
    const s = this.getSaturation();
    let l = this.getLightness() - amount / 100;
    if (l < 0) {
      l = 0;
    }
    return this._c({
      h,
      s,
      l,
      a: this.a
    });
  }
  lighten(amount = 10) {
    const h = this.getHue();
    const s = this.getSaturation();
    let l = this.getLightness() + amount / 100;
    if (l > 1) {
      l = 1;
    }
    return this._c({
      h,
      s,
      l,
      a: this.a
    });
  }
  /**
   * Mix the current color a given amount with another color, from 0 to 100.
   * 0 means no mixing (return current color).
   */
  mix(input, amount = 50) {
    const color = this._c(input);
    const p = amount / 100;
    const calc = (key) => (color[key] - this[key]) * p + this[key];
    const rgba = {
      r: round(calc("r")),
      g: round(calc("g")),
      b: round(calc("b")),
      a: round(calc("a") * 100) / 100
    };
    return this._c(rgba);
  }
  /**
   * Mix the color with pure white, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return white.
   */
  tint(amount = 10) {
    return this.mix({
      r: 255,
      g: 255,
      b: 255,
      a: 1
    }, amount);
  }
  /**
   * Mix the color with pure black, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return black.
   */
  shade(amount = 10) {
    return this.mix({
      r: 0,
      g: 0,
      b: 0,
      a: 1
    }, amount);
  }
  onBackground(background) {
    const bg = this._c(background);
    const alpha = this.a + bg.a * (1 - this.a);
    const calc = (key) => {
      return round((this[key] * this.a + bg[key] * bg.a * (1 - this.a)) / alpha);
    };
    return this._c({
      r: calc("r"),
      g: calc("g"),
      b: calc("b"),
      a: alpha
    });
  }
  // ======================= Status =======================
  isDark() {
    return this.getBrightness() < 128;
  }
  isLight() {
    return this.getBrightness() >= 128;
  }
  // ======================== MISC ========================
  equals(other) {
    return this.r === other.r && this.g === other.g && this.b === other.b && this.a === other.a;
  }
  clone() {
    return this._c(this);
  }
  // ======================= Format =======================
  toHexString() {
    let hex = "#";
    const rHex = (this.r || 0).toString(16);
    hex += rHex.length === 2 ? rHex : "0" + rHex;
    const gHex = (this.g || 0).toString(16);
    hex += gHex.length === 2 ? gHex : "0" + gHex;
    const bHex = (this.b || 0).toString(16);
    hex += bHex.length === 2 ? bHex : "0" + bHex;
    if (typeof this.a === "number" && this.a >= 0 && this.a < 1) {
      const aHex = round(this.a * 255).toString(16);
      hex += aHex.length === 2 ? aHex : "0" + aHex;
    }
    return hex;
  }
  /** CSS support color pattern */
  toHsl() {
    return {
      h: this.getHue(),
      s: this.getHSLSaturation(),
      l: this.getLightness(),
      a: this.a
    };
  }
  /** CSS support color pattern */
  toHslString() {
    const h = this.getHue();
    const s = round(this.getHSLSaturation() * 100);
    const l = round(this.getLightness() * 100);
    return this.a !== 1 ? `hsla(${h},${s}%,${l}%,${this.a})` : `hsl(${h},${s}%,${l}%)`;
  }
  /** Same as toHsb */
  toHsv() {
    return {
      h: this.getHue(),
      s: this.getHSVSaturation(),
      v: this.getValue(),
      a: this.a
    };
  }
  toRgb() {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a
    };
  }
  toRgbString() {
    return this.a !== 1 ? `rgba(${this.r},${this.g},${this.b},${this.a})` : `rgb(${this.r},${this.g},${this.b})`;
  }
  toString() {
    return this.toRgbString();
  }
  // ====================== Privates ======================
  /** Return a new FastColor object with one channel changed */
  _sc(rgb, value, max) {
    const clone = this.clone();
    clone[rgb] = limitRange(value, max);
    return clone;
  }
  _c(input) {
    return new this.constructor(input);
  }
  getMax() {
    if (typeof this._max === "undefined") {
      this._max = Math.max(this.r, this.g, this.b);
    }
    return this._max;
  }
  getMin() {
    if (typeof this._min === "undefined") {
      this._min = Math.min(this.r, this.g, this.b);
    }
    return this._min;
  }
  fromHexString(trimStr) {
    const withoutPrefix = trimStr.replace("#", "");
    function connectNum(index1, index2) {
      return parseInt(withoutPrefix[index1] + withoutPrefix[index2 || index1], 16);
    }
    if (withoutPrefix.length < 6) {
      this.r = connectNum(0);
      this.g = connectNum(1);
      this.b = connectNum(2);
      this.a = withoutPrefix[3] ? connectNum(3) / 255 : 1;
    } else {
      this.r = connectNum(0, 1);
      this.g = connectNum(2, 3);
      this.b = connectNum(4, 5);
      this.a = withoutPrefix[6] ? connectNum(6, 7) / 255 : 1;
    }
  }
  fromHsl({
    h: _h,
    s,
    l,
    a
  }) {
    const h = (_h % 360 + 360) % 360;
    this._h = h;
    this._hsl_s = s;
    this._l = l;
    this.a = typeof a === "number" ? a : 1;
    if (s <= 0) {
      const rgb = round(l * 255);
      this.r = rgb;
      this.g = rgb;
      this.b = rgb;
      return;
    }
    let r2 = 0, g = 0, b = 0;
    const huePrime = h / 60;
    const chroma = (1 - Math.abs(2 * l - 1)) * s;
    const secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
    if (huePrime >= 0 && huePrime < 1) {
      r2 = chroma;
      g = secondComponent;
    } else if (huePrime >= 1 && huePrime < 2) {
      r2 = secondComponent;
      g = chroma;
    } else if (huePrime >= 2 && huePrime < 3) {
      g = chroma;
      b = secondComponent;
    } else if (huePrime >= 3 && huePrime < 4) {
      g = secondComponent;
      b = chroma;
    } else if (huePrime >= 4 && huePrime < 5) {
      r2 = secondComponent;
      b = chroma;
    } else if (huePrime >= 5 && huePrime < 6) {
      r2 = chroma;
      b = secondComponent;
    }
    const lightnessModification = l - chroma / 2;
    this.r = round((r2 + lightnessModification) * 255);
    this.g = round((g + lightnessModification) * 255);
    this.b = round((b + lightnessModification) * 255);
  }
  fromHsv({
    h: _h,
    s,
    v,
    a
  }) {
    const h = (_h % 360 + 360) % 360;
    this._h = h;
    this._hsv_s = s;
    this._v = v;
    this.a = typeof a === "number" ? a : 1;
    const vv = round(v * 255);
    this.r = vv;
    this.g = vv;
    this.b = vv;
    if (s <= 0) {
      return;
    }
    const hh = h / 60;
    const i = Math.floor(hh);
    const ff = hh - i;
    const p = round(v * (1 - s) * 255);
    const q = round(v * (1 - s * ff) * 255);
    const t = round(v * (1 - s * (1 - ff)) * 255);
    switch (i) {
      case 0:
        this.g = t;
        this.b = p;
        break;
      case 1:
        this.r = q;
        this.b = p;
        break;
      case 2:
        this.r = p;
        this.b = t;
        break;
      case 3:
        this.r = p;
        this.g = q;
        break;
      case 4:
        this.r = t;
        this.g = p;
        break;
      case 5:
      default:
        this.g = p;
        this.b = q;
        break;
    }
  }
  fromHsvString(trimStr) {
    const cells = splitColorStr(trimStr, parseHSVorHSL);
    this.fromHsv({
      h: cells[0],
      s: cells[1],
      v: cells[2],
      a: cells[3]
    });
  }
  fromHslString(trimStr) {
    const cells = splitColorStr(trimStr, parseHSVorHSL);
    this.fromHsl({
      h: cells[0],
      s: cells[1],
      l: cells[2],
      a: cells[3]
    });
  }
  fromRgbString(trimStr) {
    const cells = splitColorStr(trimStr, (num, txt) => (
      // Convert percentage to number. e.g. 50% -> 128
      txt.includes("%") ? round(num / 100 * 255) : num
    ));
    this.r = cells[0];
    this.g = cells[1];
    this.b = cells[2];
    this.a = cells[3];
  }
};

// node_modules/@ant-design/colors/es/generate.js
var hueStep = 2;
var saturationStep = 0.16;
var saturationStep2 = 0.05;
var brightnessStep1 = 0.05;
var brightnessStep2 = 0.15;
var lightColorCount = 5;
var darkColorCount = 4;
var darkColorMap = [{
  index: 7,
  amount: 15
}, {
  index: 6,
  amount: 25
}, {
  index: 5,
  amount: 30
}, {
  index: 5,
  amount: 45
}, {
  index: 5,
  amount: 65
}, {
  index: 5,
  amount: 85
}, {
  index: 4,
  amount: 90
}, {
  index: 3,
  amount: 95
}, {
  index: 2,
  amount: 97
}, {
  index: 1,
  amount: 98
}];
function getHue(hsv, i, light) {
  let hue;
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return hue;
}
function getSaturation(hsv, i, light) {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  let saturation;
  if (light) {
    saturation = hsv.s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i;
  }
  if (saturation > 1) {
    saturation = 1;
  }
  if (light && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  return Math.round(saturation * 100) / 100;
}
function getValue(hsv, i, light) {
  let value;
  if (light) {
    value = hsv.v + brightnessStep1 * i;
  } else {
    value = hsv.v - brightnessStep2 * i;
  }
  value = Math.max(0, Math.min(1, value));
  return Math.round(value * 100) / 100;
}
function generate(color, opts = {}) {
  const patterns = [];
  const pColor = new FastColor(color);
  const hsv = pColor.toHsv();
  for (let i = lightColorCount; i > 0; i -= 1) {
    const c = new FastColor({
      h: getHue(hsv, i, true),
      s: getSaturation(hsv, i, true),
      v: getValue(hsv, i, true)
    });
    patterns.push(c);
  }
  patterns.push(pColor);
  for (let i = 1; i <= darkColorCount; i += 1) {
    const c = new FastColor({
      h: getHue(hsv, i),
      s: getSaturation(hsv, i),
      v: getValue(hsv, i)
    });
    patterns.push(c);
  }
  if (opts.theme === "dark") {
    return darkColorMap.map(({
      index,
      amount
    }) => new FastColor(opts.backgroundColor || "#141414").mix(patterns[index], amount).toHexString());
  }
  return patterns.map((c) => c.toHexString());
}

// node_modules/@ant-design/colors/es/presets.js
var presetPrimaryColors = {
  "red": "#F5222D",
  "volcano": "#FA541C",
  "orange": "#FA8C16",
  "gold": "#FAAD14",
  "yellow": "#FADB14",
  "lime": "#A0D911",
  "green": "#52C41A",
  "cyan": "#13C2C2",
  "blue": "#1677FF",
  "geekblue": "#2F54EB",
  "purple": "#722ED1",
  "magenta": "#EB2F96",
  "grey": "#666666"
};
var red = ["#fff1f0", "#ffccc7", "#ffa39e", "#ff7875", "#ff4d4f", "#f5222d", "#cf1322", "#a8071a", "#820014", "#5c0011"];
red.primary = red[5];
var volcano = ["#fff2e8", "#ffd8bf", "#ffbb96", "#ff9c6e", "#ff7a45", "#fa541c", "#d4380d", "#ad2102", "#871400", "#610b00"];
volcano.primary = volcano[5];
var orange = ["#fff7e6", "#ffe7ba", "#ffd591", "#ffc069", "#ffa940", "#fa8c16", "#d46b08", "#ad4e00", "#873800", "#612500"];
orange.primary = orange[5];
var gold = ["#fffbe6", "#fff1b8", "#ffe58f", "#ffd666", "#ffc53d", "#faad14", "#d48806", "#ad6800", "#874d00", "#613400"];
gold.primary = gold[5];
var yellow = ["#feffe6", "#ffffb8", "#fffb8f", "#fff566", "#ffec3d", "#fadb14", "#d4b106", "#ad8b00", "#876800", "#614700"];
yellow.primary = yellow[5];
var lime = ["#fcffe6", "#f4ffb8", "#eaff8f", "#d3f261", "#bae637", "#a0d911", "#7cb305", "#5b8c00", "#3f6600", "#254000"];
lime.primary = lime[5];
var green = ["#f6ffed", "#d9f7be", "#b7eb8f", "#95de64", "#73d13d", "#52c41a", "#389e0d", "#237804", "#135200", "#092b00"];
green.primary = green[5];
var cyan = ["#e6fffb", "#b5f5ec", "#87e8de", "#5cdbd3", "#36cfc9", "#13c2c2", "#08979c", "#006d75", "#00474f", "#002329"];
cyan.primary = cyan[5];
var blue = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
blue.primary = blue[5];
var geekblue = ["#f0f5ff", "#d6e4ff", "#adc6ff", "#85a5ff", "#597ef7", "#2f54eb", "#1d39c4", "#10239e", "#061178", "#030852"];
geekblue.primary = geekblue[5];
var purple = ["#f9f0ff", "#efdbff", "#d3adf7", "#b37feb", "#9254de", "#722ed1", "#531dab", "#391085", "#22075e", "#120338"];
purple.primary = purple[5];
var magenta = ["#fff0f6", "#ffd6e7", "#ffadd2", "#ff85c0", "#f759ab", "#eb2f96", "#c41d7f", "#9e1068", "#780650", "#520339"];
magenta.primary = magenta[5];
var grey = ["#a6a6a6", "#999999", "#8c8c8c", "#808080", "#737373", "#666666", "#404040", "#1a1a1a", "#000000", "#000000"];
grey.primary = grey[5];
var presetPalettes = {
  red,
  volcano,
  orange,
  gold,
  yellow,
  lime,
  green,
  cyan,
  blue,
  geekblue,
  purple,
  magenta,
  grey
};
var redDark = ["#2a1215", "#431418", "#58181c", "#791a1f", "#a61d24", "#d32029", "#e84749", "#f37370", "#f89f9a", "#fac8c3"];
redDark.primary = redDark[5];
var volcanoDark = ["#2b1611", "#441d12", "#592716", "#7c3118", "#aa3e19", "#d84a1b", "#e87040", "#f3956a", "#f8b692", "#fad4bc"];
volcanoDark.primary = volcanoDark[5];
var orangeDark = ["#2b1d11", "#442a11", "#593815", "#7c4a15", "#aa6215", "#d87a16", "#e89a3c", "#f3b765", "#f8cf8d", "#fae3b7"];
orangeDark.primary = orangeDark[5];
var goldDark = ["#2b2111", "#443111", "#594214", "#7c5914", "#aa7714", "#d89614", "#e8b339", "#f3cc62", "#f8df8b", "#faedb5"];
goldDark.primary = goldDark[5];
var yellowDark = ["#2b2611", "#443b11", "#595014", "#7c6e14", "#aa9514", "#d8bd14", "#e8d639", "#f3ea62", "#f8f48b", "#fafab5"];
yellowDark.primary = yellowDark[5];
var limeDark = ["#1f2611", "#2e3c10", "#3e4f13", "#536d13", "#6f9412", "#8bbb11", "#a9d134", "#c9e75d", "#e4f88b", "#f0fab5"];
limeDark.primary = limeDark[5];
var greenDark = ["#162312", "#1d3712", "#274916", "#306317", "#3c8618", "#49aa19", "#6abe39", "#8fd460", "#b2e58b", "#d5f2bb"];
greenDark.primary = greenDark[5];
var cyanDark = ["#112123", "#113536", "#144848", "#146262", "#138585", "#13a8a8", "#33bcb7", "#58d1c9", "#84e2d8", "#b2f1e8"];
cyanDark.primary = cyanDark[5];
var blueDark = ["#111a2c", "#112545", "#15325b", "#15417e", "#1554ad", "#1668dc", "#3c89e8", "#65a9f3", "#8dc5f8", "#b7dcfa"];
blueDark.primary = blueDark[5];
var geekblueDark = ["#131629", "#161d40", "#1c2755", "#203175", "#263ea0", "#2b4acb", "#5273e0", "#7f9ef3", "#a8c1f8", "#d2e0fa"];
geekblueDark.primary = geekblueDark[5];
var purpleDark = ["#1a1325", "#24163a", "#301c4d", "#3e2069", "#51258f", "#642ab5", "#854eca", "#ab7ae0", "#cda8f0", "#ebd7fa"];
purpleDark.primary = purpleDark[5];
var magentaDark = ["#291321", "#40162f", "#551c3b", "#75204f", "#a02669", "#cb2b83", "#e0529c", "#f37fb7", "#f8a8cc", "#fad2e3"];
magentaDark.primary = magentaDark[5];
var greyDark = ["#151515", "#1f1f1f", "#2d2d2d", "#393939", "#494949", "#5a5a5a", "#6a6a6a", "#7b7b7b", "#888888", "#969696"];
greyDark.primary = greyDark[5];

// node_modules/antd/es/theme/themes/shared/genColorMapToken.js
function genColorMapToken(seed, {
  generateColorPalettes: generateColorPalettes2,
  generateNeutralColorPalettes: generateNeutralColorPalettes2
}) {
  const {
    colorSuccess: colorSuccessBase,
    colorWarning: colorWarningBase,
    colorError: colorErrorBase,
    colorInfo: colorInfoBase,
    colorPrimary: colorPrimaryBase,
    colorBgBase,
    colorTextBase
  } = seed;
  const primaryColors = generateColorPalettes2(colorPrimaryBase);
  const successColors = generateColorPalettes2(colorSuccessBase);
  const warningColors = generateColorPalettes2(colorWarningBase);
  const errorColors = generateColorPalettes2(colorErrorBase);
  const infoColors = generateColorPalettes2(colorInfoBase);
  const neutralColors = generateNeutralColorPalettes2(colorBgBase, colorTextBase);
  const colorLink = seed.colorLink || seed.colorInfo;
  const linkColors = generateColorPalettes2(colorLink);
  const colorErrorBgFilledHover = new FastColor(errorColors[1]).mix(new FastColor(errorColors[3]), 50).toHexString();
  return {
    ...neutralColors,
    colorPrimaryBg: primaryColors[1],
    colorPrimaryBgHover: primaryColors[2],
    colorPrimaryBorder: primaryColors[3],
    colorPrimaryBorderHover: primaryColors[4],
    colorPrimaryHover: primaryColors[5],
    colorPrimary: primaryColors[6],
    colorPrimaryActive: primaryColors[7],
    colorPrimaryTextHover: primaryColors[8],
    colorPrimaryText: primaryColors[9],
    colorPrimaryTextActive: primaryColors[10],
    colorSuccessBg: successColors[1],
    colorSuccessBgHover: successColors[2],
    colorSuccessBorder: successColors[3],
    colorSuccessBorderHover: successColors[4],
    colorSuccessHover: successColors[4],
    colorSuccess: successColors[6],
    colorSuccessActive: successColors[7],
    colorSuccessTextHover: successColors[8],
    colorSuccessText: successColors[9],
    colorSuccessTextActive: successColors[10],
    colorErrorBg: errorColors[1],
    colorErrorBgHover: errorColors[2],
    colorErrorBgFilledHover,
    colorErrorBgActive: errorColors[3],
    colorErrorBorder: errorColors[3],
    colorErrorBorderHover: errorColors[4],
    colorErrorHover: errorColors[5],
    colorError: errorColors[6],
    colorErrorActive: errorColors[7],
    colorErrorTextHover: errorColors[8],
    colorErrorText: errorColors[9],
    colorErrorTextActive: errorColors[10],
    colorWarningBg: warningColors[1],
    colorWarningBgHover: warningColors[2],
    colorWarningBorder: warningColors[3],
    colorWarningBorderHover: warningColors[4],
    colorWarningHover: warningColors[4],
    colorWarning: warningColors[6],
    colorWarningActive: warningColors[7],
    colorWarningTextHover: warningColors[8],
    colorWarningText: warningColors[9],
    colorWarningTextActive: warningColors[10],
    colorInfoBg: infoColors[1],
    colorInfoBgHover: infoColors[2],
    colorInfoBorder: infoColors[3],
    colorInfoBorderHover: infoColors[4],
    colorInfoHover: infoColors[4],
    colorInfo: infoColors[6],
    colorInfoActive: infoColors[7],
    colorInfoTextHover: infoColors[8],
    colorInfoText: infoColors[9],
    colorInfoTextActive: infoColors[10],
    colorLinkHover: linkColors[4],
    colorLink: linkColors[6],
    colorLinkActive: linkColors[7],
    colorBgMask: new FastColor("#000").setA(0.45).toRgbString(),
    colorWhite: "#fff"
  };
}

// node_modules/antd/es/theme/themes/shared/genRadius.js
var genRadius = (radiusBase) => {
  let radiusLG = radiusBase;
  let radiusSM = radiusBase;
  let radiusXS = radiusBase;
  let radiusOuter = radiusBase;
  if (radiusBase < 6 && radiusBase >= 5) {
    radiusLG = radiusBase + 1;
  } else if (radiusBase < 16 && radiusBase >= 6) {
    radiusLG = radiusBase + 2;
  } else if (radiusBase >= 16) {
    radiusLG = 16;
  }
  if (radiusBase < 7 && radiusBase >= 5) {
    radiusSM = 4;
  } else if (radiusBase < 8 && radiusBase >= 7) {
    radiusSM = 5;
  } else if (radiusBase < 14 && radiusBase >= 8) {
    radiusSM = 6;
  } else if (radiusBase < 16 && radiusBase >= 14) {
    radiusSM = 7;
  } else if (radiusBase >= 16) {
    radiusSM = 8;
  }
  if (radiusBase < 6 && radiusBase >= 2) {
    radiusXS = 1;
  } else if (radiusBase >= 6) {
    radiusXS = 2;
  }
  if (radiusBase > 4 && radiusBase < 8) {
    radiusOuter = 4;
  } else if (radiusBase >= 8) {
    radiusOuter = 6;
  }
  return {
    borderRadius: radiusBase,
    borderRadiusXS: radiusXS,
    borderRadiusSM: radiusSM,
    borderRadiusLG: radiusLG,
    borderRadiusOuter: radiusOuter
  };
};
var genRadius_default = genRadius;

// node_modules/antd/es/theme/themes/shared/genCommonMapToken.js
function genCommonMapToken(token2) {
  const {
    motionUnit,
    motionBase,
    borderRadius,
    lineWidth
  } = token2;
  return {
    // motion
    motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
    motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
    motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,
    // line
    lineWidthBold: lineWidth + 1,
    // radius
    ...genRadius_default(borderRadius)
  };
}

// node_modules/antd/es/theme/themes/shared/genControlHeight.js
var genControlHeight = (token2) => {
  const {
    controlHeight
  } = token2;
  return {
    controlHeightSM: controlHeight * 0.75,
    controlHeightXS: controlHeight * 0.5,
    controlHeightLG: controlHeight * 1.25
  };
};
var genControlHeight_default = genControlHeight;

// node_modules/antd/es/theme/themes/shared/genFontSizes.js
function getLineHeight(fontSize) {
  return (fontSize + 8) / fontSize;
}
function getFontSizes(base) {
  const fontSizes = Array.from({
    length: 10
  }).map((_, index) => {
    const i = index - 1;
    const baseSize = base * Math.E ** (i / 5);
    const intSize = index > 1 ? Math.floor(baseSize) : Math.ceil(baseSize);
    return Math.floor(intSize / 2) * 2;
  });
  fontSizes[1] = base;
  return fontSizes.map((size) => ({
    size,
    lineHeight: getLineHeight(size)
  }));
}

// node_modules/antd/es/theme/themes/shared/genFontMapToken.js
var genFontMapToken = (fontSize) => {
  const fontSizePairs = getFontSizes(fontSize);
  const fontSizes = fontSizePairs.map((pair) => pair.size);
  const lineHeights = fontSizePairs.map((pair) => pair.lineHeight);
  const fontSizeMD = fontSizes[1];
  const fontSizeSM = fontSizes[0];
  const fontSizeLG = fontSizes[2];
  const lineHeight = lineHeights[1];
  const lineHeightSM = lineHeights[0];
  const lineHeightLG = lineHeights[2];
  return {
    fontSizeSM,
    fontSize: fontSizeMD,
    fontSizeLG,
    fontSizeXL: fontSizes[3],
    fontSizeHeading1: fontSizes[6],
    fontSizeHeading2: fontSizes[5],
    fontSizeHeading3: fontSizes[4],
    fontSizeHeading4: fontSizes[3],
    fontSizeHeading5: fontSizes[2],
    lineHeight,
    lineHeightLG,
    lineHeightSM,
    fontHeight: Math.round(lineHeight * fontSizeMD),
    fontHeightLG: Math.round(lineHeightLG * fontSizeLG),
    fontHeightSM: Math.round(lineHeightSM * fontSizeSM),
    lineHeightHeading1: lineHeights[6],
    lineHeightHeading2: lineHeights[5],
    lineHeightHeading3: lineHeights[4],
    lineHeightHeading4: lineHeights[3],
    lineHeightHeading5: lineHeights[2]
  };
};
var genFontMapToken_default = genFontMapToken;

// node_modules/antd/es/theme/themes/shared/genSizeMapToken.js
function genSizeMapToken(token2) {
  const {
    sizeUnit,
    sizeStep
  } = token2;
  return {
    sizeXXL: sizeUnit * (sizeStep + 8),
    // 48
    sizeXL: sizeUnit * (sizeStep + 4),
    // 32
    sizeLG: sizeUnit * (sizeStep + 2),
    // 24
    sizeMD: sizeUnit * (sizeStep + 1),
    // 20
    sizeMS: sizeUnit * sizeStep,
    // 16
    size: sizeUnit * sizeStep,
    // 16
    sizeSM: sizeUnit * (sizeStep - 1),
    // 12
    sizeXS: sizeUnit * (sizeStep - 2),
    // 8
    sizeXXS: sizeUnit * (sizeStep - 3)
    // 4
  };
}

// node_modules/antd/es/theme/themes/default/colorAlgorithm.js
var getAlphaColor = (baseColor, alpha) => new FastColor(baseColor).setA(alpha).toRgbString();
var getSolidColor = (baseColor, brightness) => {
  const instance = new FastColor(baseColor);
  return instance.darken(brightness).toHexString();
};

// node_modules/antd/es/theme/themes/default/colors.js
var generateColorPalettes = (baseColor) => {
  const colors = generate(baseColor);
  return {
    1: colors[0],
    2: colors[1],
    3: colors[2],
    4: colors[3],
    5: colors[4],
    6: colors[5],
    7: colors[6],
    8: colors[4],
    9: colors[5],
    10: colors[6]
  };
};
var generateNeutralColorPalettes = (bgBaseColor, textBaseColor) => {
  const colorBgBase = bgBaseColor || "#fff";
  const colorTextBase = textBaseColor || "#000";
  return {
    colorBgBase,
    colorTextBase,
    colorText: getAlphaColor(colorTextBase, 0.88),
    colorTextSecondary: getAlphaColor(colorTextBase, 0.65),
    colorTextTertiary: getAlphaColor(colorTextBase, 0.45),
    colorTextQuaternary: getAlphaColor(colorTextBase, 0.25),
    colorFill: getAlphaColor(colorTextBase, 0.15),
    colorFillSecondary: getAlphaColor(colorTextBase, 0.06),
    colorFillTertiary: getAlphaColor(colorTextBase, 0.04),
    colorFillQuaternary: getAlphaColor(colorTextBase, 0.02),
    colorBgSolid: getAlphaColor(colorTextBase, 1),
    colorBgSolidHover: getAlphaColor(colorTextBase, 0.75),
    colorBgSolidActive: getAlphaColor(colorTextBase, 0.95),
    colorBgLayout: getSolidColor(colorBgBase, 4),
    colorBgContainer: getSolidColor(colorBgBase, 0),
    colorBgElevated: getSolidColor(colorBgBase, 0),
    colorBgSpotlight: getAlphaColor(colorTextBase, 0.85),
    colorBgBlur: "transparent",
    colorBorder: getSolidColor(colorBgBase, 15),
    colorBorderDisabled: getSolidColor(colorBgBase, 15),
    colorBorderSecondary: getSolidColor(colorBgBase, 6)
  };
};

// node_modules/antd/es/theme/themes/default/index.js
function derivative(token2) {
  presetPrimaryColors.pink = presetPrimaryColors.magenta;
  presetPalettes.pink = presetPalettes.magenta;
  const colorPalettes = Object.keys(defaultPresetColors).map((colorKey) => {
    const colors = token2[colorKey] === presetPrimaryColors[colorKey] ? presetPalettes[colorKey] : generate(token2[colorKey]);
    return Array.from({
      length: 10
    }, () => 1).reduce((prev2, _, i) => {
      prev2[`${colorKey}-${i + 1}`] = colors[i];
      prev2[`${colorKey}${i + 1}`] = colors[i];
      return prev2;
    }, {});
  }).reduce((prev2, cur) => {
    prev2 = {
      ...prev2,
      ...cur
    };
    return prev2;
  }, {});
  return {
    ...token2,
    ...colorPalettes,
    // Colors
    ...genColorMapToken(token2, {
      generateColorPalettes,
      generateNeutralColorPalettes
    }),
    // Font
    ...genFontMapToken_default(token2.fontSize),
    // Size
    ...genSizeMapToken(token2),
    // Height
    ...genControlHeight_default(token2),
    // Others
    ...genCommonMapToken(token2)
  };
}

// node_modules/antd/es/theme/themes/default/theme.js
var defaultTheme = createTheme(derivative);
var theme_default = defaultTheme;

// node_modules/antd/es/theme/context.js
var defaultConfig = {
  token: seed_default,
  override: {
    override: seed_default
  },
  hashed: true
};
var DesignTokenContext = import_react10.default.createContext(defaultConfig);

// node_modules/antd/es/tooltip/UniqueProvider/index.js
var import_react20 = __toESM(require_react());

// node_modules/@rc-component/portal/es/Portal.js
var React17 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// node_modules/@rc-component/portal/es/Context.js
var React13 = __toESM(require_react());
var OrderContext = React13.createContext(null);
var Context_default2 = OrderContext;

// node_modules/@rc-component/portal/es/mock.js
var inline = false;
function inlineMock(nextInline) {
  if (typeof nextInline === "boolean") {
    inline = nextInline;
  }
  return inline;
}

// node_modules/@rc-component/portal/es/useDom.js
var React14 = __toESM(require_react());
var EMPTY_LIST = [];
function useDom(render, debug) {
  const [ele] = React14.useState(() => {
    if (!canUseDom()) {
      return null;
    }
    const defaultEle = document.createElement("div");
    if (debug) {
      defaultEle.setAttribute("data-debug", debug);
    }
    return defaultEle;
  });
  const appendedRef = React14.useRef(false);
  const queueCreate = React14.useContext(Context_default2);
  const [queue, setQueue] = React14.useState(EMPTY_LIST);
  const mergedQueueCreate = queueCreate || (appendedRef.current ? void 0 : (appendFn) => {
    setQueue((origin) => {
      const newQueue = [appendFn, ...origin];
      return newQueue;
    });
  });
  function append2() {
    if (!ele.parentElement) {
      document.body.appendChild(ele);
    }
    appendedRef.current = true;
  }
  function cleanup2() {
    ele.parentElement?.removeChild(ele);
    appendedRef.current = false;
  }
  useLayoutEffect_default(() => {
    if (render) {
      if (queueCreate) {
        queueCreate(append2);
      } else {
        append2();
      }
    } else {
      cleanup2();
    }
    return cleanup2;
  }, [render]);
  useLayoutEffect_default(() => {
    if (queue.length) {
      queue.forEach((appendFn) => appendFn());
      setQueue(EMPTY_LIST);
    }
  }, [queue]);
  return [ele, mergedQueueCreate];
}

// node_modules/@rc-component/portal/es/useScrollLocker.js
var React15 = __toESM(require_react());

// node_modules/@rc-component/util/es/getScrollBarSize.js
var cached;
function measureScrollbarSize(ele) {
  const randomId = `rc-scrollbar-measure-${Math.random().toString(36).substring(7)}`;
  const measureEle = document.createElement("div");
  measureEle.id = randomId;
  const measureStyle = measureEle.style;
  measureStyle.position = "absolute";
  measureStyle.left = "0";
  measureStyle.top = "0";
  measureStyle.width = "100px";
  measureStyle.height = "100px";
  measureStyle.overflow = "scroll";
  let fallbackWidth;
  let fallbackHeight;
  if (ele) {
    const targetStyle = getComputedStyle(ele);
    measureStyle.scrollbarColor = targetStyle.scrollbarColor;
    measureStyle.scrollbarWidth = targetStyle.scrollbarWidth;
    const webkitScrollbarStyle = getComputedStyle(ele, "::-webkit-scrollbar");
    const width = parseInt(webkitScrollbarStyle.width, 10);
    const height = parseInt(webkitScrollbarStyle.height, 10);
    try {
      const widthStyle = width ? `width: ${webkitScrollbarStyle.width};` : "";
      const heightStyle = height ? `height: ${webkitScrollbarStyle.height};` : "";
      updateCSS(`
#${randomId}::-webkit-scrollbar {
${widthStyle}
${heightStyle}
}`, randomId);
    } catch (e) {
      console.error(e);
      fallbackWidth = width;
      fallbackHeight = height;
    }
  }
  document.body.appendChild(measureEle);
  const scrollWidth = ele && fallbackWidth && !isNaN(fallbackWidth) ? fallbackWidth : measureEle.offsetWidth - measureEle.clientWidth;
  const scrollHeight = ele && fallbackHeight && !isNaN(fallbackHeight) ? fallbackHeight : measureEle.offsetHeight - measureEle.clientHeight;
  document.body.removeChild(measureEle);
  removeCSS(randomId);
  return {
    width: scrollWidth,
    height: scrollHeight
  };
}
function getScrollBarSize(fresh) {
  if (typeof document === "undefined") {
    return 0;
  }
  if (fresh || cached === void 0) {
    cached = measureScrollbarSize();
  }
  return cached.width;
}
function getTargetScrollBarSize(target) {
  if (typeof document === "undefined" || !target || !(target instanceof Element)) {
    return {
      width: 0,
      height: 0
    };
  }
  return measureScrollbarSize(target);
}

// node_modules/@rc-component/portal/es/util.js
function isBodyOverflowing() {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth;
}

// node_modules/@rc-component/portal/es/useScrollLocker.js
var UNIQUE_ID = `rc-util-locker-${Date.now()}`;
var uuid2 = 0;
function useScrollLocker(lock) {
  const mergedLock = !!lock;
  const [id] = React15.useState(() => {
    uuid2 += 1;
    return `${UNIQUE_ID}_${uuid2}`;
  });
  useLayoutEffect_default(() => {
    if (mergedLock) {
      const scrollbarSize = getTargetScrollBarSize(document.body).width;
      const isOverflow = isBodyOverflowing();
      updateCSS(`
html body {
  overflow-y: hidden;
  ${isOverflow ? `width: calc(100% - ${scrollbarSize}px);` : ""}
}`, id);
    } else {
      removeCSS(id);
    }
    return () => {
      removeCSS(id);
    };
  }, [mergedLock, id]);
}

// node_modules/@rc-component/util/es/hooks/useId.js
var React16 = __toESM(require_react());
function getUseId() {
  const fullClone = {
    ...React16
  };
  return fullClone.useId;
}
var uuid3 = 0;
var useOriginId = getUseId();
var useId_default = useOriginId ? (
  // Use React `useId`
  function useId(id) {
    const reactId = useOriginId();
    if (id) {
      return id;
    }
    if (false) {
      return "test-id";
    }
    return reactId;
  }
) : (
  // Use compatible of `useId`
  function useCompatId(id) {
    const [innerId, setInnerId] = React16.useState("ssr-id");
    React16.useEffect(() => {
      const nextId = uuid3;
      uuid3 += 1;
      setInnerId(`rc_unique_${nextId}`);
    }, []);
    if (id) {
      return id;
    }
    if (false) {
      return "test-id";
    }
    return innerId;
  }
);

// node_modules/@rc-component/portal/es/useEscKeyDown.js
var import_react11 = __toESM(require_react());
var stack = [];
var IME_LOCK_DURATION = 200;
var lastCompositionEndTime = 0;
var onGlobalKeyDown = (event) => {
  if (event.key === "Escape" && !event.isComposing) {
    const now = Date.now();
    if (now - lastCompositionEndTime < IME_LOCK_DURATION) {
      return;
    }
    const len = stack.length;
    for (let i = len - 1; i >= 0; i -= 1) {
      stack[i].onEsc({
        top: i === len - 1,
        event
      });
    }
  }
};
var onGlobalCompositionEnd = () => {
  lastCompositionEndTime = Date.now();
};
function attachGlobalEventListeners() {
  window.addEventListener("keydown", onGlobalKeyDown);
  window.addEventListener("compositionend", onGlobalCompositionEnd);
}
function detachGlobalEventListeners() {
  if (stack.length === 0) {
    window.removeEventListener("keydown", onGlobalKeyDown);
    window.removeEventListener("compositionend", onGlobalCompositionEnd);
  }
}
function useEscKeyDown(open, onEsc) {
  const id = useId_default();
  const onEventEsc = useEvent_default(onEsc);
  const ensure = () => {
    if (!stack.find((item) => item.id === id)) {
      stack.push({
        id,
        onEsc: onEventEsc
      });
    }
  };
  const clear = () => {
    stack = stack.filter((item) => item.id !== id);
  };
  (0, import_react11.useMemo)(() => {
    if (open) {
      ensure();
    } else if (!open) {
      clear();
    }
  }, [open]);
  (0, import_react11.useEffect)(() => {
    if (open) {
      ensure();
      attachGlobalEventListeners();
      return () => {
        clear();
        detachGlobalEventListeners();
      };
    }
  }, [open]);
}

// node_modules/@rc-component/portal/es/Portal.js
var getPortalContainer = (getContainer2) => {
  if (getContainer2 === false) {
    return false;
  }
  if (!canUseDom() || !getContainer2) {
    return null;
  }
  if (typeof getContainer2 === "string") {
    return document.querySelector(getContainer2);
  }
  if (typeof getContainer2 === "function") {
    return getContainer2();
  }
  return getContainer2;
};
var Portal = React17.forwardRef((props, ref) => {
  const {
    open,
    autoLock,
    getContainer: getContainer2,
    debug,
    autoDestroy = true,
    children,
    onEsc
  } = props;
  const [shouldRender, setShouldRender] = React17.useState(open);
  const mergedRender = shouldRender || open;
  if (true) {
    warning_default(canUseDom() || !open, `Portal only work in client side. Please call 'useEffect' to show Portal instead default render in SSR.`);
  }
  React17.useEffect(() => {
    if (autoDestroy || open) {
      setShouldRender(open);
    }
  }, [open, autoDestroy]);
  const [innerContainer, setInnerContainer] = React17.useState(() => getPortalContainer(getContainer2));
  React17.useEffect(() => {
    const customizeContainer = getPortalContainer(getContainer2);
    setInnerContainer(() => (
      // React do the state update even the value is the same,
      // Use function call to force React to compare update
      customizeContainer ?? null
    ));
  });
  const [defaultContainer, queueCreate] = useDom(mergedRender && !innerContainer, debug);
  const mergedContainer = innerContainer ?? defaultContainer;
  useScrollLocker(autoLock && open && canUseDom() && (mergedContainer === defaultContainer || mergedContainer === document.body));
  useEscKeyDown(open, onEsc);
  let childRef = null;
  if (children && supportRef(children) && ref) {
    childRef = getNodeRef(children);
  }
  const mergedRef = useComposeRef(childRef, ref);
  if (!mergedRender || !canUseDom() || innerContainer === void 0) {
    return null;
  }
  const renderInline = mergedContainer === false || inlineMock();
  let reffedChildren = children;
  if (ref) {
    reffedChildren = React17.cloneElement(children, {
      ref: mergedRef
    });
  }
  return React17.createElement(Context_default2.Provider, {
    value: queueCreate
  }, renderInline ? reffedChildren : (0, import_react_dom.createPortal)(reffedChildren, mergedContainer));
});
if (true) {
  Portal.displayName = "Portal";
}
var Portal_default = Portal;

// node_modules/@rc-component/portal/es/index.js
var es_default = Portal_default;

// node_modules/@rc-component/resize-observer/es/index.js
var React21 = __toESM(require_react());

// node_modules/@rc-component/util/es/Dom/findDOMNode.js
function isDOM(node2) {
  return node2 instanceof HTMLElement || node2 instanceof SVGElement;
}
function getDOM(node2) {
  if (node2 && typeof node2 === "object" && isDOM(node2.nativeElement)) {
    return node2.nativeElement;
  }
  if (isDOM(node2)) {
    return node2;
  }
  return null;
}

// node_modules/@rc-component/resize-observer/es/SingleObserver/index.js
var React20 = __toESM(require_react());

// node_modules/@rc-component/resize-observer/es/Collection.js
var React18 = __toESM(require_react());
var CollectionContext = React18.createContext(null);
function Collection({
  children,
  onBatchResize
}) {
  const resizeIdRef = React18.useRef(0);
  const resizeInfosRef = React18.useRef([]);
  const onCollectionResize = React18.useContext(CollectionContext);
  const onResize2 = React18.useCallback((size, element, data) => {
    resizeIdRef.current += 1;
    const currentId = resizeIdRef.current;
    resizeInfosRef.current.push({
      size,
      element,
      data
    });
    Promise.resolve().then(() => {
      if (currentId === resizeIdRef.current) {
        onBatchResize?.(resizeInfosRef.current);
        resizeInfosRef.current = [];
      }
    });
    onCollectionResize?.(size, element, data);
  }, [onBatchResize, onCollectionResize]);
  return React18.createElement(CollectionContext.Provider, {
    value: onResize2
  }, children);
}

// node_modules/@rc-component/resize-observer/es/useResizeObserver.js
var React19 = __toESM(require_react());

// node_modules/@rc-component/resize-observer/es/utils/observerUtil.js
var elementListeners = /* @__PURE__ */ new Map();
function onResize(entities) {
  entities.forEach((entity) => {
    const {
      target
    } = entity;
    elementListeners.get(target)?.forEach((listener) => listener(target));
  });
}
var observer;
function ensureResizeObserver() {
  if (!observer) {
    observer = new ResizeObserver(onResize);
  }
  return observer;
}
function observe(element, callback) {
  if (!elementListeners.has(element)) {
    elementListeners.set(element, /* @__PURE__ */ new Set());
    ensureResizeObserver().observe(element);
  }
  elementListeners.get(element).add(callback);
}
function unobserve(element, callback) {
  if (elementListeners.has(element)) {
    elementListeners.get(element).delete(callback);
    if (!elementListeners.get(element).size) {
      ensureResizeObserver().unobserve(element);
      elementListeners.delete(element);
    }
  }
}

// node_modules/@rc-component/resize-observer/es/useResizeObserver.js
function useResizeObserver(enabled, getTarget, onDelayResize, onSyncResize) {
  const sizeRef = React19.useRef({
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1
  });
  const onInternalResize = useEvent_default((target) => {
    const {
      width,
      height
    } = target.getBoundingClientRect();
    const {
      offsetWidth,
      offsetHeight
    } = target;
    const fixedWidth = Math.floor(width);
    const fixedHeight = Math.floor(height);
    if (sizeRef.current.width !== fixedWidth || sizeRef.current.height !== fixedHeight || sizeRef.current.offsetWidth !== offsetWidth || sizeRef.current.offsetHeight !== offsetHeight) {
      const size = {
        width: fixedWidth,
        height: fixedHeight,
        offsetWidth,
        offsetHeight
      };
      sizeRef.current = size;
      const mergedOffsetWidth = offsetWidth === Math.round(width) ? width : offsetWidth;
      const mergedOffsetHeight = offsetHeight === Math.round(height) ? height : offsetHeight;
      const sizeInfo = {
        ...size,
        offsetWidth: mergedOffsetWidth,
        offsetHeight: mergedOffsetHeight
      };
      onSyncResize?.(sizeInfo, target);
      Promise.resolve().then(() => {
        onDelayResize?.(sizeInfo, target);
      });
    }
  });
  const isFuncTarget = typeof getTarget === "function";
  React19.useEffect(() => {
    const target = isFuncTarget ? getTarget() : getTarget;
    if (target && enabled) {
      observe(target, onInternalResize);
    }
    return () => {
      if (target) {
        unobserve(target, onInternalResize);
      }
    };
  }, [
    enabled,
    // When is function, no need to watch it
    isFuncTarget ? 0 : getTarget
  ]);
}

// node_modules/@rc-component/resize-observer/es/SingleObserver/index.js
function SingleObserver(props, ref) {
  const {
    children,
    disabled,
    onResize: onResize2,
    data
  } = props;
  const elementRef = React20.useRef(null);
  const onCollectionResize = React20.useContext(CollectionContext);
  const isRenderProps = typeof children === "function";
  const mergedChildren = isRenderProps ? children(elementRef) : children;
  const canRef = !isRenderProps && React20.isValidElement(mergedChildren) && supportRef(mergedChildren);
  const originRef = canRef ? getNodeRef(mergedChildren) : null;
  const mergedRef = useComposeRef(originRef, elementRef);
  const getDomElement = () => {
    return getDOM(elementRef.current);
  };
  React20.useImperativeHandle(ref, () => getDomElement());
  useResizeObserver(!disabled, getDomElement, onResize2, (sizeInfo, target) => {
    onCollectionResize?.(sizeInfo, target, data);
  });
  return canRef ? React20.cloneElement(mergedChildren, {
    ref: mergedRef
  }) : mergedChildren;
}
var RefSingleObserver = React20.forwardRef(SingleObserver);
if (true) {
  RefSingleObserver.displayName = "SingleObserver";
}
var SingleObserver_default = RefSingleObserver;

// node_modules/@rc-component/resize-observer/es/index.js
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var INTERNAL_PREFIX_KEY = "rc-observer-key";
function ResizeObserver2(props, ref) {
  const {
    children
  } = props;
  const childNodes = typeof children === "function" ? [children] : toArray(children);
  if (true) {
    if (childNodes.length > 1) {
      warning(false, "Find more than one child node with `children` in ResizeObserver. Please use ResizeObserver.Collection instead.");
    } else if (childNodes.length === 0) {
      warning(false, "`children` of ResizeObserver is empty. Nothing is in observe.");
    }
  }
  return childNodes.map((child, index) => {
    const key = child?.key || `${INTERNAL_PREFIX_KEY}-${index}`;
    return React21.createElement(SingleObserver_default, _extends({}, props, {
      key,
      ref: index === 0 ? ref : void 0
    }), child);
  });
}
var RefResizeObserver = React21.forwardRef(ResizeObserver2);
if (true) {
  RefResizeObserver.displayName = "ResizeObserver";
}
RefResizeObserver.Collection = Collection;
var es_default2 = RefResizeObserver;

// node_modules/@rc-component/util/es/Dom/shadow.js
function getRoot(ele) {
  return ele?.getRootNode?.();
}
function inShadow(ele) {
  return getRoot(ele) instanceof ShadowRoot;
}
function getShadowRoot(ele) {
  return inShadow(ele) ? getRoot(ele) : null;
}

// node_modules/@rc-component/trigger/es/index.js
var React42 = __toESM(require_react());

// node_modules/@rc-component/motion/es/CSSMotion.js
var React28 = __toESM(require_react());
var import_react15 = __toESM(require_react());

// node_modules/@rc-component/motion/es/context.js
var React22 = __toESM(require_react());
var Context = React22.createContext({});
function MotionProvider({
  children,
  ...props
}) {
  return React22.createElement(Context.Provider, {
    value: props
  }, children);
}

// node_modules/@rc-component/util/es/hooks/useSyncState.js
var React23 = __toESM(require_react());
function useSyncState(defaultValue) {
  const [, forceUpdate] = React23.useReducer((x) => x + 1, 0);
  const currentValueRef = React23.useRef(defaultValue);
  const getValue2 = useEvent_default(() => {
    return currentValueRef.current;
  });
  const setValue = useEvent_default((updater) => {
    currentValueRef.current = typeof updater === "function" ? updater(currentValueRef.current) : updater;
    forceUpdate();
  });
  return [getValue2, setValue];
}

// node_modules/@rc-component/motion/es/hooks/useStatus.js
var React27 = __toESM(require_react());
var import_react14 = __toESM(require_react());

// node_modules/@rc-component/motion/es/interface.js
var STATUS_NONE = "none";
var STATUS_APPEAR = "appear";
var STATUS_ENTER = "enter";
var STATUS_LEAVE = "leave";
var STEP_NONE = "none";
var STEP_PREPARE = "prepare";
var STEP_START = "start";
var STEP_ACTIVE = "active";
var STEP_ACTIVATED = "end";
var STEP_PREPARED = "prepared";

// node_modules/@rc-component/motion/es/hooks/useDomMotionEvents.js
var React24 = __toESM(require_react());
var import_react12 = __toESM(require_react());

// node_modules/@rc-component/motion/es/util/motion.js
function makePrefixMap(styleProp, eventName) {
  const prefixes = {};
  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes[`Webkit${styleProp}`] = `webkit${eventName}`;
  prefixes[`Moz${styleProp}`] = `moz${eventName}`;
  prefixes[`ms${styleProp}`] = `MS${eventName}`;
  prefixes[`O${styleProp}`] = `o${eventName.toLowerCase()}`;
  return prefixes;
}
function getVendorPrefixes(domSupport, win) {
  const prefixes = {
    animationend: makePrefixMap("Animation", "AnimationEnd"),
    transitionend: makePrefixMap("Transition", "TransitionEnd")
  };
  if (domSupport) {
    if (!("AnimationEvent" in win)) {
      delete prefixes.animationend.animation;
    }
    if (!("TransitionEvent" in win)) {
      delete prefixes.transitionend.transition;
    }
  }
  return prefixes;
}
var vendorPrefixes = getVendorPrefixes(canUseDom(), typeof window !== "undefined" ? window : {});
var style = {};
if (canUseDom()) {
  ({
    style
  } = document.createElement("div"));
}
var prefixedEventNames = {};
function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) {
    return prefixedEventNames[eventName];
  }
  const prefixMap = vendorPrefixes[eventName];
  if (prefixMap) {
    const stylePropList = Object.keys(prefixMap);
    const len = stylePropList.length;
    for (let i = 0; i < len; i += 1) {
      const styleProp = stylePropList[i];
      if (Object.prototype.hasOwnProperty.call(prefixMap, styleProp) && styleProp in style) {
        prefixedEventNames[eventName] = prefixMap[styleProp];
        return prefixedEventNames[eventName];
      }
    }
  }
  return "";
}
var internalAnimationEndName = getVendorPrefixedEventName("animationend");
var internalTransitionEndName = getVendorPrefixedEventName("transitionend");
var supportTransition = !!(internalAnimationEndName && internalTransitionEndName);
var animationEndName = internalAnimationEndName || "animationend";
var transitionEndName = internalTransitionEndName || "transitionend";
function getTransitionName(transitionName, transitionType) {
  if (!transitionName) return null;
  if (typeof transitionName === "object") {
    const type = transitionType.replace(/-\w/g, (match2) => match2[1].toUpperCase());
    return transitionName[type];
  }
  return `${transitionName}-${transitionType}`;
}

// node_modules/@rc-component/motion/es/hooks/useDomMotionEvents.js
var useDomMotionEvents_default = ((onInternalMotionEnd) => {
  const cacheElementRef = (0, import_react12.useRef)();
  function removeMotionEvents(element) {
    if (element) {
      element.removeEventListener(transitionEndName, onInternalMotionEnd);
      element.removeEventListener(animationEndName, onInternalMotionEnd);
    }
  }
  function patchMotionEvents(element) {
    if (cacheElementRef.current && cacheElementRef.current !== element) {
      removeMotionEvents(cacheElementRef.current);
    }
    if (element && element !== cacheElementRef.current) {
      element.addEventListener(transitionEndName, onInternalMotionEnd);
      element.addEventListener(animationEndName, onInternalMotionEnd);
      cacheElementRef.current = element;
    }
  }
  React24.useEffect(() => () => {
    removeMotionEvents(cacheElementRef.current);
    cacheElementRef.current = null;
  }, []);
  return [patchMotionEvents, removeMotionEvents];
});

// node_modules/@rc-component/motion/es/hooks/useIsomorphicLayoutEffect.js
var import_react13 = __toESM(require_react());
var useIsomorphicLayoutEffect = canUseDom() ? import_react13.useLayoutEffect : import_react13.useEffect;
var useIsomorphicLayoutEffect_default = useIsomorphicLayoutEffect;

// node_modules/@rc-component/motion/es/hooks/useStepQueue.js
var React26 = __toESM(require_react());

// node_modules/@rc-component/util/es/raf.js
var raf = (callback) => +setTimeout(callback, 16);
var caf = (num) => clearTimeout(num);
if (typeof window !== "undefined" && "requestAnimationFrame" in window) {
  raf = (callback) => window.requestAnimationFrame(callback);
  caf = (handle) => window.cancelAnimationFrame(handle);
}
var rafUUID = 0;
var rafIds = /* @__PURE__ */ new Map();
function cleanup(id) {
  rafIds.delete(id);
}
var wrapperRaf = (callback, times = 1) => {
  rafUUID += 1;
  const id = rafUUID;
  function callRef(leftTimes) {
    if (leftTimes === 0) {
      cleanup(id);
      callback();
    } else {
      const realId = raf(() => {
        callRef(leftTimes - 1);
      });
      rafIds.set(id, realId);
    }
  }
  callRef(times);
  return id;
};
wrapperRaf.cancel = (id) => {
  const realId = rafIds.get(id);
  cleanup(id);
  return caf(realId);
};
if (true) {
  wrapperRaf.ids = () => rafIds;
}
var raf_default = wrapperRaf;

// node_modules/@rc-component/motion/es/hooks/useNextFrame.js
var React25 = __toESM(require_react());
var useNextFrame_default = (() => {
  const nextFrameRef = React25.useRef(null);
  function cancelNextFrame() {
    raf_default.cancel(nextFrameRef.current);
  }
  function nextFrame(callback, delay = 2) {
    cancelNextFrame();
    const nextFrameId = raf_default(() => {
      if (delay <= 1) {
        callback({
          isCanceled: () => nextFrameId !== nextFrameRef.current
        });
      } else {
        nextFrame(callback, delay - 1);
      }
    });
    nextFrameRef.current = nextFrameId;
  }
  React25.useEffect(() => () => {
    cancelNextFrame();
  }, []);
  return [nextFrame, cancelNextFrame];
});

// node_modules/@rc-component/motion/es/hooks/useStepQueue.js
var FULL_STEP_QUEUE = [STEP_PREPARE, STEP_START, STEP_ACTIVE, STEP_ACTIVATED];
var SIMPLE_STEP_QUEUE = [STEP_PREPARE, STEP_PREPARED];
var SkipStep = false;
var DoStep = true;
function isActive(step) {
  return step === STEP_ACTIVE || step === STEP_ACTIVATED;
}
var useStepQueue_default = ((status, prepareOnly, callback) => {
  const [step, setStep] = useSafeState(STEP_NONE);
  const [nextFrame, cancelNextFrame] = useNextFrame_default();
  function startQueue() {
    setStep(STEP_PREPARE, true);
  }
  const STEP_QUEUE = prepareOnly ? SIMPLE_STEP_QUEUE : FULL_STEP_QUEUE;
  useIsomorphicLayoutEffect_default(() => {
    if (step !== STEP_NONE && step !== STEP_ACTIVATED) {
      const index = STEP_QUEUE.indexOf(step);
      const nextStep = STEP_QUEUE[index + 1];
      const result = callback(step);
      if (result === SkipStep) {
        setStep(nextStep, true);
      } else if (nextStep) {
        nextFrame((info) => {
          function doNext() {
            if (info.isCanceled()) return;
            setStep(nextStep, true);
          }
          if (result === true) {
            doNext();
          } else {
            Promise.resolve(result).then(doNext);
          }
        });
      }
    }
  }, [status, step]);
  React26.useEffect(() => () => {
    cancelNextFrame();
  }, []);
  return [startQueue, step];
});

// node_modules/@rc-component/motion/es/hooks/useStatus.js
function useStatus(supportMotion, visible, getElement, {
  motionEnter = true,
  motionAppear = true,
  motionLeave = true,
  motionDeadline,
  motionLeaveImmediately,
  onAppearPrepare,
  onEnterPrepare,
  onLeavePrepare,
  onAppearStart,
  onEnterStart,
  onLeaveStart,
  onAppearActive,
  onEnterActive,
  onLeaveActive,
  onAppearEnd,
  onEnterEnd,
  onLeaveEnd,
  onVisibleChanged
}) {
  const [asyncVisible, setAsyncVisible] = useSafeState();
  const [getStatus, setStatus] = useSyncState(STATUS_NONE);
  const [style2, setStyle] = useSafeState(null);
  const currentStatus = getStatus();
  const mountedRef = (0, import_react14.useRef)(false);
  const deadlineRef = (0, import_react14.useRef)(null);
  function getDomElement() {
    return getElement();
  }
  const activeRef = (0, import_react14.useRef)(false);
  function updateMotionEndStatus() {
    setStatus(STATUS_NONE);
    setStyle(null, true);
  }
  const onInternalMotionEnd = useEvent_default((event) => {
    const status = getStatus();
    if (status === STATUS_NONE) {
      return;
    }
    const element = getDomElement();
    if (event && !event.deadline && event.target !== element) {
      return;
    }
    const currentActive = activeRef.current;
    let canEnd;
    if (status === STATUS_APPEAR && currentActive) {
      canEnd = onAppearEnd?.(element, event);
    } else if (status === STATUS_ENTER && currentActive) {
      canEnd = onEnterEnd?.(element, event);
    } else if (status === STATUS_LEAVE && currentActive) {
      canEnd = onLeaveEnd?.(element, event);
    }
    if (currentActive && canEnd !== false) {
      updateMotionEndStatus();
    }
  });
  const [patchMotionEvents] = useDomMotionEvents_default(onInternalMotionEnd);
  const getEventHandlers = (targetStatus) => {
    switch (targetStatus) {
      case STATUS_APPEAR:
        return {
          [STEP_PREPARE]: onAppearPrepare,
          [STEP_START]: onAppearStart,
          [STEP_ACTIVE]: onAppearActive
        };
      case STATUS_ENTER:
        return {
          [STEP_PREPARE]: onEnterPrepare,
          [STEP_START]: onEnterStart,
          [STEP_ACTIVE]: onEnterActive
        };
      case STATUS_LEAVE:
        return {
          [STEP_PREPARE]: onLeavePrepare,
          [STEP_START]: onLeaveStart,
          [STEP_ACTIVE]: onLeaveActive
        };
      default:
        return {};
    }
  };
  const eventHandlers = React27.useMemo(() => getEventHandlers(currentStatus), [currentStatus]);
  const [startStep, step] = useStepQueue_default(currentStatus, !supportMotion, (newStep) => {
    if (newStep === STEP_PREPARE) {
      const onPrepare = eventHandlers[STEP_PREPARE];
      if (!onPrepare) {
        return SkipStep;
      }
      return onPrepare(getDomElement());
    }
    if (step in eventHandlers) {
      setStyle(eventHandlers[step]?.(getDomElement(), null) || null);
    }
    if (step === STEP_ACTIVE && currentStatus !== STATUS_NONE) {
      patchMotionEvents(getDomElement());
      if (motionDeadline > 0) {
        clearTimeout(deadlineRef.current);
        deadlineRef.current = setTimeout(() => {
          onInternalMotionEnd({
            deadline: true
          });
        }, motionDeadline);
      }
    }
    if (step === STEP_PREPARED) {
      updateMotionEndStatus();
    }
    return DoStep;
  });
  const active = isActive(step);
  activeRef.current = active;
  const visibleRef = (0, import_react14.useRef)(null);
  useIsomorphicLayoutEffect_default(() => {
    if (mountedRef.current && visibleRef.current === visible) {
      return;
    }
    setAsyncVisible(visible);
    const isMounted = mountedRef.current;
    mountedRef.current = true;
    let nextStatus;
    if (!isMounted && visible && motionAppear) {
      nextStatus = STATUS_APPEAR;
    }
    if (isMounted && visible && motionEnter) {
      nextStatus = STATUS_ENTER;
    }
    if (isMounted && !visible && motionLeave || !isMounted && motionLeaveImmediately && !visible && motionLeave) {
      nextStatus = STATUS_LEAVE;
    }
    const nextEventHandlers = getEventHandlers(nextStatus);
    if (nextStatus && (supportMotion || nextEventHandlers[STEP_PREPARE])) {
      setStatus(nextStatus);
      startStep();
    } else {
      setStatus(STATUS_NONE);
    }
    visibleRef.current = visible;
  }, [visible]);
  (0, import_react14.useEffect)(() => {
    if (
      // Cancel appear
      currentStatus === STATUS_APPEAR && !motionAppear || // Cancel enter
      currentStatus === STATUS_ENTER && !motionEnter || // Cancel leave
      currentStatus === STATUS_LEAVE && !motionLeave
    ) {
      setStatus(STATUS_NONE);
    }
  }, [motionAppear, motionEnter, motionLeave]);
  (0, import_react14.useEffect)(() => () => {
    mountedRef.current = false;
    clearTimeout(deadlineRef.current);
  }, []);
  const firstMountChangeRef = React27.useRef(false);
  (0, import_react14.useEffect)(() => {
    if (asyncVisible) {
      firstMountChangeRef.current = true;
    }
    if (asyncVisible !== void 0 && currentStatus === STATUS_NONE) {
      if (firstMountChangeRef.current || asyncVisible) {
        onVisibleChanged?.(asyncVisible);
      }
      firstMountChangeRef.current = true;
    }
  }, [asyncVisible, currentStatus]);
  let mergedStyle = style2;
  if (eventHandlers[STEP_PREPARE] && step === STEP_START) {
    mergedStyle = {
      transition: "none",
      ...mergedStyle
    };
  }
  return [getStatus, step, mergedStyle, asyncVisible ?? visible];
}

// node_modules/@rc-component/motion/es/CSSMotion.js
function genCSSMotion(config) {
  let transitionSupport = config;
  if (typeof config === "object") {
    ({
      transitionSupport
    } = config);
  }
  function isSupportTransition(props, contextMotion) {
    return !!(props.motionName && transitionSupport && contextMotion !== false);
  }
  const CSSMotion = React28.forwardRef((props, ref) => {
    const {
      // Default config
      visible = true,
      removeOnLeave = true,
      forceRender,
      children,
      motionName,
      leavedClassName,
      eventProps
    } = props;
    const {
      motion: contextMotion
    } = React28.useContext(Context);
    const supportMotion = isSupportTransition(props, contextMotion);
    const nodeRef = (0, import_react15.useRef)();
    function getDomElement() {
      return getDOM(nodeRef.current);
    }
    const [getStatus, statusStep, statusStyle, mergedVisible] = useStatus(supportMotion, visible, getDomElement, props);
    const status = getStatus();
    const renderedRef = React28.useRef(mergedVisible);
    if (mergedVisible) {
      renderedRef.current = true;
    }
    const refObj = React28.useMemo(() => {
      const obj = {};
      Object.defineProperties(obj, {
        nativeElement: {
          enumerable: true,
          get: getDomElement
        },
        inMotion: {
          enumerable: true,
          get: () => () => getStatus() !== STATUS_NONE
        },
        enableMotion: {
          enumerable: true,
          get: () => () => supportMotion
        }
      });
      return obj;
    }, []);
    React28.useImperativeHandle(ref, () => refObj, []);
    let motionChildren;
    const mergedProps = {
      ...eventProps,
      visible
    };
    if (!children) {
      motionChildren = null;
    } else if (status === STATUS_NONE) {
      if (mergedVisible) {
        motionChildren = children({
          ...mergedProps
        }, nodeRef);
      } else if (!removeOnLeave && renderedRef.current && leavedClassName) {
        motionChildren = children({
          ...mergedProps,
          className: leavedClassName
        }, nodeRef);
      } else if (forceRender || !removeOnLeave && !leavedClassName) {
        motionChildren = children({
          ...mergedProps,
          style: {
            display: "none"
          }
        }, nodeRef);
      } else {
        motionChildren = null;
      }
    } else {
      let statusSuffix;
      if (statusStep === STEP_PREPARE) {
        statusSuffix = "prepare";
      } else if (isActive(statusStep)) {
        statusSuffix = "active";
      } else if (statusStep === STEP_START) {
        statusSuffix = "start";
      }
      const motionCls = getTransitionName(motionName, `${status}-${statusSuffix}`);
      motionChildren = children({
        ...mergedProps,
        className: clsx(getTransitionName(motionName, status), {
          [motionCls]: motionCls && statusSuffix,
          [motionName]: typeof motionName === "string"
        }),
        style: statusStyle
      }, nodeRef);
    }
    if (React28.isValidElement(motionChildren) && supportRef(motionChildren)) {
      const originNodeRef = getNodeRef(motionChildren);
      if (!originNodeRef) {
        motionChildren = React28.cloneElement(motionChildren, {
          ref: nodeRef
        });
      }
    }
    return motionChildren;
  });
  CSSMotion.displayName = "CSSMotion";
  return CSSMotion;
}
var CSSMotion_default = genCSSMotion(supportTransition);

// node_modules/@rc-component/motion/es/CSSMotionList.js
var React29 = __toESM(require_react());

// node_modules/@rc-component/motion/es/util/diff.js
var STATUS_ADD = "add";
var STATUS_KEEP = "keep";
var STATUS_REMOVE = "remove";
var STATUS_REMOVED = "removed";
function wrapKeyToObject(key) {
  let keyObj;
  if (key && typeof key === "object" && "key" in key) {
    keyObj = key;
  } else {
    keyObj = {
      key
    };
  }
  return {
    ...keyObj,
    key: String(keyObj.key)
  };
}
function parseKeys(keys2 = []) {
  return keys2.map(wrapKeyToObject);
}
function diffKeys(prevKeys = [], currentKeys = []) {
  let list = [];
  let currentIndex = 0;
  const currentLen = currentKeys.length;
  const prevKeyObjects = parseKeys(prevKeys);
  const currentKeyObjects = parseKeys(currentKeys);
  prevKeyObjects.forEach((keyObj) => {
    let hit = false;
    for (let i = currentIndex; i < currentLen; i += 1) {
      const currentKeyObj = currentKeyObjects[i];
      if (currentKeyObj.key === keyObj.key) {
        if (currentIndex < i) {
          list = list.concat(currentKeyObjects.slice(currentIndex, i).map((obj) => ({
            ...obj,
            status: STATUS_ADD
          })));
          currentIndex = i;
        }
        list.push({
          ...currentKeyObj,
          status: STATUS_KEEP
        });
        currentIndex += 1;
        hit = true;
        break;
      }
    }
    if (!hit) {
      list.push({
        ...keyObj,
        status: STATUS_REMOVE
      });
    }
  });
  if (currentIndex < currentLen) {
    list = list.concat(currentKeyObjects.slice(currentIndex).map((obj) => ({
      ...obj,
      status: STATUS_ADD
    })));
  }
  const keys2 = {};
  list.forEach(({
    key
  }) => {
    keys2[key] = (keys2[key] || 0) + 1;
  });
  const duplicatedKeys = Object.keys(keys2).filter((key) => keys2[key] > 1);
  duplicatedKeys.forEach((matchKey) => {
    list = list.filter(({
      key,
      status
    }) => key !== matchKey || status !== STATUS_REMOVE);
    list.forEach((node2) => {
      if (node2.key === matchKey) {
        node2.status = STATUS_KEEP;
      }
    });
  });
  return list;
}

// node_modules/@rc-component/motion/es/CSSMotionList.js
function _extends2() {
  _extends2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends2.apply(this, arguments);
}
var MOTION_PROP_NAMES = ["eventProps", "visible", "children", "motionName", "motionAppear", "motionEnter", "motionLeave", "motionLeaveImmediately", "motionDeadline", "removeOnLeave", "leavedClassName", "onAppearPrepare", "onAppearStart", "onAppearActive", "onAppearEnd", "onEnterStart", "onEnterActive", "onEnterEnd", "onLeaveStart", "onLeaveActive", "onLeaveEnd"];
function genCSSMotionList(transitionSupport, CSSMotion = CSSMotion_default) {
  class CSSMotionList extends React29.Component {
    static defaultProps = {
      component: "div"
    };
    state = {
      keyEntities: []
    };
    static getDerivedStateFromProps({
      keys: keys2
    }, {
      keyEntities
    }) {
      const parsedKeyObjects = parseKeys(keys2);
      const mixedKeyEntities = diffKeys(keyEntities, parsedKeyObjects);
      return {
        keyEntities: mixedKeyEntities.filter((entity) => {
          const prevEntity = keyEntities.find(({
            key
          }) => entity.key === key);
          if (prevEntity && prevEntity.status === STATUS_REMOVED && entity.status === STATUS_REMOVE) {
            return false;
          }
          return true;
        })
      };
    }
    // ZombieJ: Return the count of rest keys. It's safe to refactor if need more info.
    removeKey = (removeKey) => {
      this.setState((prevState) => {
        const nextKeyEntities = prevState.keyEntities.map((entity) => {
          if (entity.key !== removeKey) return entity;
          return {
            ...entity,
            status: STATUS_REMOVED
          };
        });
        return {
          keyEntities: nextKeyEntities
        };
      }, () => {
        const {
          keyEntities
        } = this.state;
        const restKeysCount = keyEntities.filter(({
          status
        }) => status !== STATUS_REMOVED).length;
        if (restKeysCount === 0 && this.props.onAllRemoved) {
          this.props.onAllRemoved();
        }
      });
    };
    render() {
      const {
        keyEntities
      } = this.state;
      const {
        component,
        children,
        onVisibleChanged,
        onAllRemoved,
        ...restProps
      } = this.props;
      const Component2 = component || React29.Fragment;
      const motionProps = {};
      MOTION_PROP_NAMES.forEach((prop) => {
        motionProps[prop] = restProps[prop];
        delete restProps[prop];
      });
      delete restProps.keys;
      return React29.createElement(Component2, restProps, keyEntities.map(({
        status,
        ...eventProps
      }, index) => {
        const visible = status === STATUS_ADD || status === STATUS_KEEP;
        return React29.createElement(CSSMotion, _extends2({}, motionProps, {
          key: eventProps.key,
          visible,
          eventProps,
          onVisibleChanged: (changedVisible) => {
            onVisibleChanged?.(changedVisible, {
              key: eventProps.key
            });
            if (!changedVisible) {
              this.removeKey(eventProps.key);
            }
          }
        }), (props, ref) => children({
          ...props,
          index
        }, ref));
      }));
    }
  }
  return CSSMotionList;
}
var CSSMotionList_default = genCSSMotionList(supportTransition);

// node_modules/@rc-component/motion/es/index.js
var es_default3 = CSSMotion_default;

// node_modules/@rc-component/trigger/es/Popup/index.js
var React33 = __toESM(require_react());

// node_modules/@rc-component/trigger/es/Popup/Arrow.js
var React30 = __toESM(require_react());
function Arrow(props) {
  const {
    prefixCls,
    align,
    arrow,
    arrowPos
  } = props;
  const {
    className,
    content,
    style: style2
  } = arrow || {};
  const {
    x = 0,
    y = 0
  } = arrowPos;
  const arrowRef = React30.useRef(null);
  if (!align || !align.points) {
    return null;
  }
  const alignStyle = {
    position: "absolute"
  };
  if (align.autoArrow !== false) {
    const popupPoints = align.points[0];
    const targetPoints = align.points[1];
    const popupTB = popupPoints[0];
    const popupLR = popupPoints[1];
    const targetTB = targetPoints[0];
    const targetLR = targetPoints[1];
    if (popupTB === targetTB || !["t", "b"].includes(popupTB)) {
      alignStyle.top = y;
    } else if (popupTB === "t") {
      alignStyle.top = 0;
    } else {
      alignStyle.bottom = 0;
    }
    if (popupLR === targetLR || !["l", "r"].includes(popupLR)) {
      alignStyle.left = x;
    } else if (popupLR === "l") {
      alignStyle.left = 0;
    } else {
      alignStyle.right = 0;
    }
  }
  return React30.createElement("div", {
    ref: arrowRef,
    className: clsx(`${prefixCls}-arrow`, className),
    style: {
      ...alignStyle,
      ...style2
    }
  }, content);
}

// node_modules/@rc-component/trigger/es/Popup/Mask.js
var React31 = __toESM(require_react());
function _extends3() {
  _extends3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends3.apply(this, arguments);
}
function Mask(props) {
  const {
    prefixCls,
    open,
    zIndex,
    mask,
    motion,
    mobile
  } = props;
  if (!mask) {
    return null;
  }
  return React31.createElement(es_default3, _extends3({}, motion, {
    motionAppear: true,
    visible: open,
    removeOnLeave: true
  }), ({
    className
  }) => React31.createElement("div", {
    style: {
      zIndex
    },
    className: clsx(`${prefixCls}-mask`, mobile && `${prefixCls}-mobile-mask`, className)
  }));
}

// node_modules/@rc-component/trigger/es/Popup/PopupContent.js
var React32 = __toESM(require_react());
var PopupContent = React32.memo(({
  children
}) => children, (_, next2) => next2.cache);
if (true) {
  PopupContent.displayName = "PopupContent";
}
var PopupContent_default = PopupContent;

// node_modules/@rc-component/trigger/es/hooks/useOffsetStyle.js
function useOffsetStyle(isMobile, ready, open, align, offsetR, offsetB, offsetX, offsetY) {
  const AUTO = "auto";
  const offsetStyle = isMobile ? {} : {
    left: "-1000vw",
    top: "-1000vh",
    right: AUTO,
    bottom: AUTO
  };
  if (!isMobile && (ready || !open)) {
    const {
      points
    } = align;
    const dynamicInset = align.dynamicInset || align._experimental?.dynamicInset;
    const alignRight = dynamicInset && points[0][1] === "r";
    const alignBottom = dynamicInset && points[0][0] === "b";
    if (alignRight) {
      offsetStyle.right = offsetR;
      offsetStyle.left = AUTO;
    } else {
      offsetStyle.left = offsetX;
      offsetStyle.right = AUTO;
    }
    if (alignBottom) {
      offsetStyle.bottom = offsetB;
      offsetStyle.top = AUTO;
    } else {
      offsetStyle.top = offsetY;
      offsetStyle.bottom = AUTO;
    }
  }
  return offsetStyle;
}

// node_modules/@rc-component/trigger/es/Popup/index.js
function _extends4() {
  _extends4 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends4.apply(this, arguments);
}
var Popup = React33.forwardRef((props, ref) => {
  const {
    onEsc,
    popup,
    className,
    prefixCls,
    style: style2,
    target,
    onVisibleChanged,
    // Open
    open,
    keepDom,
    fresh,
    // Click
    onClick,
    // Mask
    mask,
    // Arrow
    arrow,
    arrowPos,
    align,
    // Motion
    motion,
    maskMotion,
    // Mobile
    mobile,
    // Portal
    forceRender,
    getPopupContainer,
    autoDestroy,
    portal: Portal2,
    children,
    zIndex,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerDownCapture,
    ready,
    offsetX,
    offsetY,
    offsetR,
    offsetB,
    onAlign,
    onPrepare,
    // Resize
    onResize: onResize2,
    stretch,
    targetWidth,
    targetHeight
  } = props;
  const popupContent = typeof popup === "function" ? popup() : popup;
  const isNodeVisible = open || keepDom;
  const isMobile = !!mobile;
  const [mergedMask, mergedMaskMotion, mergedPopupMotion] = React33.useMemo(() => {
    if (mobile) {
      return [mobile.mask, mobile.maskMotion, mobile.motion];
    }
    return [mask, maskMotion, motion];
  }, [mobile, mask, maskMotion, motion]);
  const getPopupContainerNeedParams = getPopupContainer?.length > 0;
  const [show, setShow] = React33.useState(!getPopupContainer || !getPopupContainerNeedParams);
  useLayoutEffect_default(() => {
    if (!show && getPopupContainerNeedParams && target) {
      setShow(true);
    }
  }, [show, getPopupContainerNeedParams, target]);
  const onInternalResize = useEvent_default((size, ele) => {
    onResize2?.(size, ele);
    onAlign();
  });
  const offsetStyle = useOffsetStyle(isMobile, ready, open, align, offsetR, offsetB, offsetX, offsetY);
  if (!show) {
    return null;
  }
  const miscStyle = {};
  if (stretch) {
    if (stretch.includes("height") && targetHeight) {
      miscStyle.height = targetHeight;
    } else if (stretch.includes("minHeight") && targetHeight) {
      miscStyle.minHeight = targetHeight;
    }
    if (stretch.includes("width") && targetWidth) {
      miscStyle.width = targetWidth;
    } else if (stretch.includes("minWidth") && targetWidth) {
      miscStyle.minWidth = targetWidth;
    }
  }
  if (!open) {
    miscStyle.pointerEvents = "none";
  }
  return React33.createElement(Portal2, {
    open: forceRender || isNodeVisible,
    getContainer: getPopupContainer && (() => getPopupContainer(target)),
    autoDestroy,
    onEsc
  }, React33.createElement(Mask, {
    prefixCls,
    open,
    zIndex,
    mask: mergedMask,
    motion: mergedMaskMotion,
    mobile: isMobile
  }), React33.createElement(es_default2, {
    onResize: onInternalResize,
    disabled: !open
  }, (resizeObserverRef) => {
    return React33.createElement(es_default3, _extends4({
      motionAppear: true,
      motionEnter: true,
      motionLeave: true,
      removeOnLeave: false,
      forceRender,
      leavedClassName: `${prefixCls}-hidden`
    }, mergedPopupMotion, {
      onAppearPrepare: onPrepare,
      onEnterPrepare: onPrepare,
      visible: open,
      onVisibleChanged: (nextVisible) => {
        motion?.onVisibleChanged?.(nextVisible);
        onVisibleChanged(nextVisible);
      }
    }), ({
      className: motionClassName,
      style: motionStyle
    }, motionRef) => {
      const cls = clsx(prefixCls, motionClassName, className, {
        [`${prefixCls}-mobile`]: isMobile
      });
      return React33.createElement("div", {
        ref: composeRef(resizeObserverRef, ref, motionRef),
        className: cls,
        style: {
          "--arrow-x": `${arrowPos.x || 0}px`,
          "--arrow-y": `${arrowPos.y || 0}px`,
          ...offsetStyle,
          ...miscStyle,
          ...motionStyle,
          boxSizing: "border-box",
          zIndex,
          ...style2
        },
        onMouseEnter,
        onMouseLeave,
        onPointerEnter,
        onClick,
        onPointerDownCapture
      }, arrow && React33.createElement(Arrow, {
        prefixCls,
        arrow,
        arrowPos,
        align
      }), React33.createElement(PopupContent_default, {
        cache: !open && !fresh
      }, popupContent));
    });
  }), children);
});
if (true) {
  Popup.displayName = "Popup";
}
var Popup_default = Popup;

// node_modules/@rc-component/trigger/es/context.js
var React34 = __toESM(require_react());
var TriggerContext = React34.createContext(null);
var context_default2 = TriggerContext;
var UniqueContext = React34.createContext(null);

// node_modules/@rc-component/trigger/es/hooks/useAction.js
var React35 = __toESM(require_react());
function toArray2(val) {
  return val ? Array.isArray(val) ? val : [val] : [];
}
function useAction(action, showAction, hideAction) {
  return React35.useMemo(() => {
    const mergedShowAction = toArray2(showAction ?? action);
    const mergedHideAction = toArray2(hideAction ?? action);
    const showActionSet = new Set(mergedShowAction);
    const hideActionSet = new Set(mergedHideAction);
    if (showActionSet.has("hover") && !showActionSet.has("click")) {
      showActionSet.add("touch");
    }
    if (hideActionSet.has("hover") && !hideActionSet.has("click")) {
      hideActionSet.add("touch");
    }
    return [showActionSet, hideActionSet];
  }, [action, showAction, hideAction]);
}

// node_modules/@rc-component/util/es/Dom/isVisible.js
var isVisible_default = ((element) => {
  if (!element) {
    return false;
  }
  if (element instanceof Element) {
    if (element.offsetParent) {
      return true;
    }
    if (element.getBBox) {
      const {
        width,
        height
      } = element.getBBox();
      if (width || height) {
        return true;
      }
    }
    if (element.getBoundingClientRect) {
      const {
        width,
        height
      } = element.getBoundingClientRect();
      if (width || height) {
        return true;
      }
    }
  }
  return false;
});

// node_modules/@rc-component/trigger/es/hooks/useAlign.js
var React36 = __toESM(require_react());

// node_modules/@rc-component/trigger/es/util.js
function isPointsEq(a1 = [], a2 = [], isAlignPoint) {
  const getVal = (a, index) => a[index] || "";
  if (isAlignPoint) {
    return getVal(a1, 0) === getVal(a2, 0);
  }
  return getVal(a1, 0) === getVal(a2, 0) && getVal(a1, 1) === getVal(a2, 1);
}
function getAlignPopupClassName(builtinPlacements, prefixCls, align, isAlignPoint) {
  const {
    points
  } = align;
  const placements = Object.keys(builtinPlacements);
  for (let i = 0; i < placements.length; i += 1) {
    const placement = placements[i];
    if (isPointsEq(builtinPlacements[placement]?.points, points, isAlignPoint)) {
      return `${prefixCls}-placement-${placement}`;
    }
  }
  return "";
}
function getWin(ele) {
  return ele.ownerDocument.defaultView;
}
function collectScroller(ele) {
  const scrollerList = [];
  let current = ele?.parentElement;
  const scrollStyle = ["hidden", "scroll", "clip", "auto"];
  while (current) {
    const {
      overflowX,
      overflowY,
      overflow
    } = getWin(current).getComputedStyle(current);
    if ([overflowX, overflowY, overflow].some((o) => scrollStyle.includes(o))) {
      scrollerList.push(current);
    }
    current = current.parentElement;
  }
  return scrollerList;
}
function toNum(num, defaultValue = 1) {
  return Number.isNaN(num) ? defaultValue : num;
}
function getPxValue(val) {
  return toNum(parseFloat(val), 0);
}
function getVisibleArea(initArea, scrollerList) {
  const visibleArea = {
    ...initArea
  };
  (scrollerList || []).forEach((ele) => {
    if (ele instanceof HTMLBodyElement || ele instanceof HTMLHtmlElement) {
      return;
    }
    const {
      overflow,
      overflowClipMargin,
      borderTopWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderRightWidth
    } = getWin(ele).getComputedStyle(ele);
    const eleRect = ele.getBoundingClientRect();
    const {
      offsetHeight: eleOutHeight,
      clientHeight: eleInnerHeight,
      offsetWidth: eleOutWidth,
      clientWidth: eleInnerWidth
    } = ele;
    const borderTopNum = getPxValue(borderTopWidth);
    const borderBottomNum = getPxValue(borderBottomWidth);
    const borderLeftNum = getPxValue(borderLeftWidth);
    const borderRightNum = getPxValue(borderRightWidth);
    const scaleX = toNum(Math.round(eleRect.width / eleOutWidth * 1e3) / 1e3);
    const scaleY = toNum(Math.round(eleRect.height / eleOutHeight * 1e3) / 1e3);
    const eleScrollWidth = (eleOutWidth - eleInnerWidth - borderLeftNum - borderRightNum) * scaleX;
    const eleScrollHeight = (eleOutHeight - eleInnerHeight - borderTopNum - borderBottomNum) * scaleY;
    const scaledBorderTopWidth = borderTopNum * scaleY;
    const scaledBorderBottomWidth = borderBottomNum * scaleY;
    const scaledBorderLeftWidth = borderLeftNum * scaleX;
    const scaledBorderRightWidth = borderRightNum * scaleX;
    let clipMarginWidth = 0;
    let clipMarginHeight = 0;
    if (overflow === "clip") {
      const clipNum = getPxValue(overflowClipMargin);
      clipMarginWidth = clipNum * scaleX;
      clipMarginHeight = clipNum * scaleY;
    }
    const eleLeft = eleRect.x + scaledBorderLeftWidth - clipMarginWidth;
    const eleTop = eleRect.y + scaledBorderTopWidth - clipMarginHeight;
    const eleRight = eleLeft + eleRect.width + 2 * clipMarginWidth - scaledBorderLeftWidth - scaledBorderRightWidth - eleScrollWidth;
    const eleBottom = eleTop + eleRect.height + 2 * clipMarginHeight - scaledBorderTopWidth - scaledBorderBottomWidth - eleScrollHeight;
    visibleArea.left = Math.max(visibleArea.left, eleLeft);
    visibleArea.top = Math.max(visibleArea.top, eleTop);
    visibleArea.right = Math.min(visibleArea.right, eleRight);
    visibleArea.bottom = Math.min(visibleArea.bottom, eleBottom);
  });
  return visibleArea;
}

// node_modules/@rc-component/trigger/es/hooks/useAlign.js
function getUnitOffset(size, offset = 0) {
  const offsetStr = `${offset}`;
  const cells = offsetStr.match(/^(.*)\%$/);
  if (cells) {
    return size * (parseFloat(cells[1]) / 100);
  }
  return parseFloat(offsetStr);
}
function getNumberOffset(rect, offset) {
  const [offsetX, offsetY] = offset || [];
  return [getUnitOffset(rect.width, offsetX), getUnitOffset(rect.height, offsetY)];
}
function splitPoints(points = "") {
  return [points[0], points[1]];
}
function getAlignPoint(rect, points) {
  const topBottom = points[0];
  const leftRight = points[1];
  let x;
  let y;
  if (topBottom === "t") {
    y = rect.y;
  } else if (topBottom === "b") {
    y = rect.y + rect.height;
  } else {
    y = rect.y + rect.height / 2;
  }
  if (leftRight === "l") {
    x = rect.x;
  } else if (leftRight === "r") {
    x = rect.x + rect.width;
  } else {
    x = rect.x + rect.width / 2;
  }
  return {
    x,
    y
  };
}
function reversePoints(points, index) {
  const reverseMap = {
    t: "b",
    b: "t",
    l: "r",
    r: "l"
  };
  const clone = [...points];
  clone[index] = reverseMap[points[index]] || "c";
  return clone;
}
function flatPoints(points) {
  return points.join("");
}
function useAlign(open, popupEle, target, placement, builtinPlacements, popupAlign, onPopupAlign, mobile) {
  const [offsetInfo, setOffsetInfo] = React36.useState({
    ready: false,
    offsetX: 0,
    offsetY: 0,
    offsetR: 0,
    offsetB: 0,
    arrowX: 0,
    arrowY: 0,
    scaleX: 1,
    scaleY: 1,
    align: builtinPlacements[placement] || {}
  });
  const alignCountRef = React36.useRef(0);
  const scrollerList = React36.useMemo(() => {
    if (!popupEle || mobile) {
      return [];
    }
    return collectScroller(popupEle);
  }, [popupEle]);
  const prevFlipRef = React36.useRef({});
  const resetFlipCache = () => {
    prevFlipRef.current = {};
  };
  if (!open) {
    resetFlipCache();
  }
  const onAlign = useEvent_default(() => {
    if (popupEle && target && open && !mobile) {
      let getIntersectionVisibleArea = function(offsetX, offsetY, area = visibleArea) {
        const l = popupRect.x + offsetX;
        const t = popupRect.y + offsetY;
        const r2 = l + popupWidth;
        const b = t + popupHeight;
        const visibleL = Math.max(l, area.left);
        const visibleT = Math.max(t, area.top);
        const visibleR = Math.min(r2, area.right);
        const visibleB = Math.min(b, area.bottom);
        return Math.max(0, (visibleR - visibleL) * (visibleB - visibleT));
      }, syncNextPopupPosition = function() {
        nextPopupY = popupRect.y + nextOffsetY;
        nextPopupBottom = nextPopupY + popupHeight;
        nextPopupX = popupRect.x + nextOffsetX;
        nextPopupRight = nextPopupX + popupWidth;
      };
      const popupElement = popupEle;
      const doc = popupElement.ownerDocument;
      const win = getWin(popupElement);
      const {
        position: popupPosition
      } = win.getComputedStyle(popupElement);
      const originLeft = popupElement.style.left;
      const originTop = popupElement.style.top;
      const originRight = popupElement.style.right;
      const originBottom = popupElement.style.bottom;
      const originOverflow = popupElement.style.overflow;
      const placementInfo = {
        ...builtinPlacements[placement],
        ...popupAlign
      };
      const placeholderElement = doc.createElement("div");
      popupElement.parentElement?.appendChild(placeholderElement);
      placeholderElement.style.left = `${popupElement.offsetLeft}px`;
      placeholderElement.style.top = `${popupElement.offsetTop}px`;
      placeholderElement.style.position = popupPosition;
      placeholderElement.style.height = `${popupElement.offsetHeight}px`;
      placeholderElement.style.width = `${popupElement.offsetWidth}px`;
      popupElement.style.left = "0";
      popupElement.style.top = "0";
      popupElement.style.right = "auto";
      popupElement.style.bottom = "auto";
      popupElement.style.overflow = "hidden";
      let targetRect;
      if (Array.isArray(target)) {
        targetRect = {
          x: target[0],
          y: target[1],
          width: 0,
          height: 0
        };
      } else {
        const rect = target.getBoundingClientRect();
        rect.x = rect.x ?? rect.left;
        rect.y = rect.y ?? rect.top;
        targetRect = {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        };
      }
      const popupRect = popupElement.getBoundingClientRect();
      const {
        height,
        width
      } = win.getComputedStyle(popupElement);
      popupRect.x = popupRect.x ?? popupRect.left;
      popupRect.y = popupRect.y ?? popupRect.top;
      const {
        clientWidth,
        clientHeight,
        scrollWidth,
        scrollHeight,
        scrollTop,
        scrollLeft
      } = doc.documentElement;
      const popupHeight = popupRect.height;
      const popupWidth = popupRect.width;
      const targetHeight = targetRect.height;
      const targetWidth = targetRect.width;
      const visibleRegion = {
        left: 0,
        top: 0,
        right: clientWidth,
        bottom: clientHeight
      };
      const scrollRegion = {
        left: -scrollLeft,
        top: -scrollTop,
        right: scrollWidth - scrollLeft,
        bottom: scrollHeight - scrollTop
      };
      let {
        htmlRegion
      } = placementInfo;
      const VISIBLE = "visible";
      const VISIBLE_FIRST = "visibleFirst";
      if (htmlRegion !== "scroll" && htmlRegion !== VISIBLE_FIRST) {
        htmlRegion = VISIBLE;
      }
      const isVisibleFirst = htmlRegion === VISIBLE_FIRST;
      const scrollRegionArea = getVisibleArea(scrollRegion, scrollerList);
      const visibleRegionArea = getVisibleArea(visibleRegion, scrollerList);
      const visibleArea = htmlRegion === VISIBLE ? visibleRegionArea : scrollRegionArea;
      const adjustCheckVisibleArea = isVisibleFirst ? visibleRegionArea : visibleArea;
      popupElement.style.left = "auto";
      popupElement.style.top = "auto";
      popupElement.style.right = "0";
      popupElement.style.bottom = "0";
      const popupMirrorRect = popupElement.getBoundingClientRect();
      popupElement.style.left = originLeft;
      popupElement.style.top = originTop;
      popupElement.style.right = originRight;
      popupElement.style.bottom = originBottom;
      popupElement.style.overflow = originOverflow;
      popupElement.parentElement?.removeChild(placeholderElement);
      const scaleX = toNum(Math.round(popupWidth / parseFloat(width) * 1e3) / 1e3);
      const scaleY = toNum(Math.round(popupHeight / parseFloat(height) * 1e3) / 1e3);
      if (scaleX === 0 || scaleY === 0 || isDOM(target) && !isVisible_default(target)) {
        return;
      }
      const {
        offset,
        targetOffset
      } = placementInfo;
      let [popupOffsetX, popupOffsetY] = getNumberOffset(popupRect, offset);
      const [targetOffsetX, targetOffsetY] = getNumberOffset(targetRect, targetOffset);
      targetRect.x -= targetOffsetX;
      targetRect.y -= targetOffsetY;
      const [popupPoint, targetPoint] = placementInfo.points || [];
      const targetPoints = splitPoints(targetPoint);
      const popupPoints = splitPoints(popupPoint);
      const targetAlignPoint = getAlignPoint(targetRect, targetPoints);
      const popupAlignPoint = getAlignPoint(popupRect, popupPoints);
      const nextAlignInfo = {
        ...placementInfo
      };
      let nextPoints = [popupPoints, targetPoints];
      let nextOffsetX = targetAlignPoint.x - popupAlignPoint.x + popupOffsetX;
      let nextOffsetY = targetAlignPoint.y - popupAlignPoint.y + popupOffsetY;
      const originIntersectionVisibleArea = getIntersectionVisibleArea(nextOffsetX, nextOffsetY);
      const originIntersectionRecommendArea = getIntersectionVisibleArea(nextOffsetX, nextOffsetY, visibleRegionArea);
      const targetAlignPointTL = getAlignPoint(targetRect, ["t", "l"]);
      const popupAlignPointTL = getAlignPoint(popupRect, ["t", "l"]);
      const targetAlignPointBR = getAlignPoint(targetRect, ["b", "r"]);
      const popupAlignPointBR = getAlignPoint(popupRect, ["b", "r"]);
      const overflow = placementInfo.overflow || {};
      const {
        adjustX,
        adjustY,
        shiftX,
        shiftY
      } = overflow;
      const supportAdjust = (val) => {
        if (typeof val === "boolean") {
          return val;
        }
        return val >= 0;
      };
      let nextPopupY;
      let nextPopupBottom;
      let nextPopupX;
      let nextPopupRight;
      syncNextPopupPosition();
      const needAdjustY = supportAdjust(adjustY);
      const sameTB = popupPoints[0] === targetPoints[0];
      if (needAdjustY && popupPoints[0] === "t" && (nextPopupBottom > adjustCheckVisibleArea.bottom || prevFlipRef.current.bt)) {
        let tmpNextOffsetY = nextOffsetY;
        if (sameTB) {
          tmpNextOffsetY -= popupHeight - targetHeight;
        } else {
          tmpNextOffsetY = targetAlignPointTL.y - popupAlignPointBR.y - popupOffsetY;
        }
        const newVisibleArea = getIntersectionVisibleArea(nextOffsetX, tmpNextOffsetY);
        const newVisibleRecommendArea = getIntersectionVisibleArea(nextOffsetX, tmpNextOffsetY, visibleRegionArea);
        if (
          // Of course use larger one
          newVisibleArea > originIntersectionVisibleArea || newVisibleArea === originIntersectionVisibleArea && (!isVisibleFirst || // Choose recommend one
          newVisibleRecommendArea >= originIntersectionRecommendArea)
        ) {
          prevFlipRef.current.bt = true;
          nextOffsetY = tmpNextOffsetY;
          popupOffsetY = -popupOffsetY;
          nextPoints = [reversePoints(nextPoints[0], 0), reversePoints(nextPoints[1], 0)];
        } else {
          prevFlipRef.current.bt = false;
        }
      }
      if (needAdjustY && popupPoints[0] === "b" && (nextPopupY < adjustCheckVisibleArea.top || prevFlipRef.current.tb)) {
        let tmpNextOffsetY = nextOffsetY;
        if (sameTB) {
          tmpNextOffsetY += popupHeight - targetHeight;
        } else {
          tmpNextOffsetY = targetAlignPointBR.y - popupAlignPointTL.y - popupOffsetY;
        }
        const newVisibleArea = getIntersectionVisibleArea(nextOffsetX, tmpNextOffsetY);
        const newVisibleRecommendArea = getIntersectionVisibleArea(nextOffsetX, tmpNextOffsetY, visibleRegionArea);
        if (
          // Of course use larger one
          newVisibleArea > originIntersectionVisibleArea || newVisibleArea === originIntersectionVisibleArea && (!isVisibleFirst || // Choose recommend one
          newVisibleRecommendArea >= originIntersectionRecommendArea)
        ) {
          prevFlipRef.current.tb = true;
          nextOffsetY = tmpNextOffsetY;
          popupOffsetY = -popupOffsetY;
          nextPoints = [reversePoints(nextPoints[0], 0), reversePoints(nextPoints[1], 0)];
        } else {
          prevFlipRef.current.tb = false;
        }
      }
      const needAdjustX = supportAdjust(adjustX);
      const sameLR = popupPoints[1] === targetPoints[1];
      if (needAdjustX && popupPoints[1] === "l" && (nextPopupRight > adjustCheckVisibleArea.right || prevFlipRef.current.rl)) {
        let tmpNextOffsetX = nextOffsetX;
        if (sameLR) {
          tmpNextOffsetX -= popupWidth - targetWidth;
        } else {
          tmpNextOffsetX = targetAlignPointTL.x - popupAlignPointBR.x - popupOffsetX;
        }
        const newVisibleArea = getIntersectionVisibleArea(tmpNextOffsetX, nextOffsetY);
        const newVisibleRecommendArea = getIntersectionVisibleArea(tmpNextOffsetX, nextOffsetY, visibleRegionArea);
        if (
          // Of course use larger one
          newVisibleArea > originIntersectionVisibleArea || newVisibleArea === originIntersectionVisibleArea && (!isVisibleFirst || // Choose recommend one
          newVisibleRecommendArea >= originIntersectionRecommendArea)
        ) {
          prevFlipRef.current.rl = true;
          nextOffsetX = tmpNextOffsetX;
          popupOffsetX = -popupOffsetX;
          nextPoints = [reversePoints(nextPoints[0], 1), reversePoints(nextPoints[1], 1)];
        } else {
          prevFlipRef.current.rl = false;
        }
      }
      if (needAdjustX && popupPoints[1] === "r" && (nextPopupX < adjustCheckVisibleArea.left || prevFlipRef.current.lr)) {
        let tmpNextOffsetX = nextOffsetX;
        if (sameLR) {
          tmpNextOffsetX += popupWidth - targetWidth;
        } else {
          tmpNextOffsetX = targetAlignPointBR.x - popupAlignPointTL.x - popupOffsetX;
        }
        const newVisibleArea = getIntersectionVisibleArea(tmpNextOffsetX, nextOffsetY);
        const newVisibleRecommendArea = getIntersectionVisibleArea(tmpNextOffsetX, nextOffsetY, visibleRegionArea);
        if (
          // Of course use larger one
          newVisibleArea > originIntersectionVisibleArea || newVisibleArea === originIntersectionVisibleArea && (!isVisibleFirst || // Choose recommend one
          newVisibleRecommendArea >= originIntersectionRecommendArea)
        ) {
          prevFlipRef.current.lr = true;
          nextOffsetX = tmpNextOffsetX;
          popupOffsetX = -popupOffsetX;
          nextPoints = [reversePoints(nextPoints[0], 1), reversePoints(nextPoints[1], 1)];
        } else {
          prevFlipRef.current.lr = false;
        }
      }
      nextAlignInfo.points = [flatPoints(nextPoints[0]), flatPoints(nextPoints[1])];
      syncNextPopupPosition();
      const numShiftX = shiftX === true ? 0 : shiftX;
      if (typeof numShiftX === "number") {
        if (nextPopupX < visibleRegionArea.left) {
          nextOffsetX -= nextPopupX - visibleRegionArea.left - popupOffsetX;
          if (targetRect.x + targetWidth < visibleRegionArea.left + numShiftX) {
            nextOffsetX += targetRect.x - visibleRegionArea.left + targetWidth - numShiftX;
          }
        }
        if (nextPopupRight > visibleRegionArea.right) {
          nextOffsetX -= nextPopupRight - visibleRegionArea.right - popupOffsetX;
          if (targetRect.x > visibleRegionArea.right - numShiftX) {
            nextOffsetX += targetRect.x - visibleRegionArea.right + numShiftX;
          }
        }
      }
      const numShiftY = shiftY === true ? 0 : shiftY;
      if (typeof numShiftY === "number") {
        if (nextPopupY < visibleRegionArea.top) {
          nextOffsetY -= nextPopupY - visibleRegionArea.top - popupOffsetY;
          if (targetRect.y + targetHeight < visibleRegionArea.top + numShiftY) {
            nextOffsetY += targetRect.y - visibleRegionArea.top + targetHeight - numShiftY;
          }
        }
        if (nextPopupBottom > visibleRegionArea.bottom) {
          nextOffsetY -= nextPopupBottom - visibleRegionArea.bottom - popupOffsetY;
          if (targetRect.y > visibleRegionArea.bottom - numShiftY) {
            nextOffsetY += targetRect.y - visibleRegionArea.bottom + numShiftY;
          }
        }
      }
      const popupLeft = popupRect.x + nextOffsetX;
      const popupRight = popupLeft + popupWidth;
      const popupTop = popupRect.y + nextOffsetY;
      const popupBottom = popupTop + popupHeight;
      const targetLeft = targetRect.x;
      const targetRight = targetLeft + targetWidth;
      const targetTop = targetRect.y;
      const targetBottom = targetTop + targetHeight;
      const maxLeft = Math.max(popupLeft, targetLeft);
      const minRight = Math.min(popupRight, targetRight);
      const xCenter = (maxLeft + minRight) / 2;
      const nextArrowX = xCenter - popupLeft;
      const maxTop = Math.max(popupTop, targetTop);
      const minBottom = Math.min(popupBottom, targetBottom);
      const yCenter = (maxTop + minBottom) / 2;
      const nextArrowY = yCenter - popupTop;
      onPopupAlign?.(popupEle, nextAlignInfo);
      let offsetX4Right = popupMirrorRect.right - popupRect.x - (nextOffsetX + popupRect.width);
      let offsetY4Bottom = popupMirrorRect.bottom - popupRect.y - (nextOffsetY + popupRect.height);
      if (scaleX === 1) {
        nextOffsetX = Math.floor(nextOffsetX);
        offsetX4Right = Math.floor(offsetX4Right);
      }
      if (scaleY === 1) {
        nextOffsetY = Math.floor(nextOffsetY);
        offsetY4Bottom = Math.floor(offsetY4Bottom);
      }
      const nextOffsetInfo = {
        ready: true,
        offsetX: nextOffsetX / scaleX,
        offsetY: nextOffsetY / scaleY,
        offsetR: offsetX4Right / scaleX,
        offsetB: offsetY4Bottom / scaleY,
        arrowX: nextArrowX / scaleX,
        arrowY: nextArrowY / scaleY,
        scaleX,
        scaleY,
        align: nextAlignInfo
      };
      setOffsetInfo(nextOffsetInfo);
    }
  });
  const triggerAlign = () => {
    alignCountRef.current += 1;
    const id = alignCountRef.current;
    Promise.resolve().then(() => {
      if (alignCountRef.current === id) {
        onAlign();
      }
    });
  };
  const resetReady = () => {
    setOffsetInfo((ori) => ({
      ...ori,
      ready: false
    }));
  };
  useLayoutEffect_default(resetReady, [placement]);
  useLayoutEffect_default(() => {
    if (!open) {
      resetReady();
    }
  }, [open]);
  return [offsetInfo.ready, offsetInfo.offsetX, offsetInfo.offsetY, offsetInfo.offsetR, offsetInfo.offsetB, offsetInfo.arrowX, offsetInfo.arrowY, offsetInfo.scaleX, offsetInfo.scaleY, offsetInfo.align, triggerAlign];
}

// node_modules/@rc-component/trigger/es/hooks/useDelay.js
var React37 = __toESM(require_react());
function useDelay() {
  const delayRef = React37.useRef(null);
  const clearDelay = () => {
    if (delayRef.current) {
      clearTimeout(delayRef.current);
      delayRef.current = null;
    }
  };
  const delayInvoke = (callback, delay) => {
    clearDelay();
    if (delay === 0) {
      callback();
    } else {
      delayRef.current = setTimeout(() => {
        callback();
      }, delay * 1e3);
    }
  };
  React37.useEffect(() => {
    return () => {
      clearDelay();
    };
  }, []);
  return delayInvoke;
}

// node_modules/@rc-component/trigger/es/hooks/useWatch.js
function useWatch(open, target, popup, onAlign, onScroll) {
  useLayoutEffect_default(() => {
    if (open && target && popup) {
      let notifyScroll = function() {
        onAlign();
        onScroll();
      };
      const targetElement = target;
      const popupElement = popup;
      const targetScrollList = collectScroller(targetElement);
      const popupScrollList = collectScroller(popupElement);
      const win = getWin(popupElement);
      const mergedList = /* @__PURE__ */ new Set([win, ...targetScrollList, ...popupScrollList]);
      mergedList.forEach((scroller) => {
        scroller.addEventListener("scroll", notifyScroll, {
          passive: true
        });
      });
      win.addEventListener("resize", notifyScroll, {
        passive: true
      });
      onAlign();
      return () => {
        mergedList.forEach((scroller) => {
          scroller.removeEventListener("scroll", notifyScroll);
          win.removeEventListener("resize", notifyScroll);
        });
      };
    }
  }, [open, target, popup]);
}

// node_modules/@rc-component/trigger/es/hooks/useWinClick.js
var React38 = __toESM(require_react());
function useWinClick(open, clickToHide, targetEle, popupEle, mask, maskClosable, inPopupOrChild, triggerOpen) {
  const openRef = React38.useRef(open);
  openRef.current = open;
  const popupPointerDownRef = React38.useRef(false);
  React38.useEffect(() => {
    if (clickToHide && popupEle && (!mask || maskClosable)) {
      const onPointerDown = () => {
        popupPointerDownRef.current = false;
      };
      const onTriggerClose = (e) => {
        if (openRef.current && !inPopupOrChild(e.composedPath?.()?.[0] || e.target) && !popupPointerDownRef.current) {
          triggerOpen(false);
        }
      };
      const win = getWin(popupEle);
      win.addEventListener("pointerdown", onPointerDown, true);
      win.addEventListener("mousedown", onTriggerClose, true);
      win.addEventListener("contextmenu", onTriggerClose, true);
      const targetShadowRoot = getShadowRoot(targetEle);
      if (targetShadowRoot) {
        targetShadowRoot.addEventListener("mousedown", onTriggerClose, true);
        targetShadowRoot.addEventListener("contextmenu", onTriggerClose, true);
      }
      if (targetEle) {
        const targetRoot = targetEle.getRootNode?.();
        const popupRoot = popupEle.getRootNode?.();
        warning(targetRoot === popupRoot, `trigger element and popup element should in same shadow root.`);
      }
      return () => {
        win.removeEventListener("pointerdown", onPointerDown, true);
        win.removeEventListener("mousedown", onTriggerClose, true);
        win.removeEventListener("contextmenu", onTriggerClose, true);
        if (targetShadowRoot) {
          targetShadowRoot.removeEventListener("mousedown", onTriggerClose, true);
          targetShadowRoot.removeEventListener("contextmenu", onTriggerClose, true);
        }
      };
    }
  }, [clickToHide, targetEle, popupEle, mask, maskClosable]);
  function onPopupPointerDown() {
    popupPointerDownRef.current = true;
  }
  return onPopupPointerDown;
}

// node_modules/@rc-component/trigger/es/UniqueProvider/index.js
var React41 = __toESM(require_react());

// node_modules/@rc-component/trigger/es/UniqueProvider/useTargetState.js
var import_react16 = __toESM(require_react());
function useTargetState() {
  const [options, setOptions] = import_react16.default.useState(null);
  const [open, setOpen] = import_react16.default.useState(false);
  const [isAnimating, setIsAnimating] = import_react16.default.useState(false);
  const pendingOptionsRef = import_react16.default.useRef(null);
  const trigger = useEvent_default((nextOptions) => {
    if (nextOptions === false) {
      pendingOptionsRef.current = null;
      setOpen(false);
    } else {
      if (isAnimating && open) {
        pendingOptionsRef.current = nextOptions;
      } else {
        setOpen(true);
        setOptions(nextOptions);
        pendingOptionsRef.current = null;
        if (!open) {
          setIsAnimating(true);
        }
      }
    }
  });
  const onVisibleChanged = useEvent_default((visible) => {
    if (visible) {
      setIsAnimating(false);
      if (pendingOptionsRef.current) {
        setOptions(pendingOptionsRef.current);
        pendingOptionsRef.current = null;
      }
    } else {
      setIsAnimating(false);
      pendingOptionsRef.current = null;
    }
  });
  return [trigger, open, options, onVisibleChanged];
}

// node_modules/@rc-component/trigger/es/UniqueProvider/UniqueContainer.js
var import_react17 = __toESM(require_react());
function _extends5() {
  _extends5 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends5.apply(this, arguments);
}
var UniqueContainer = (props) => {
  const {
    prefixCls,
    isMobile,
    ready,
    open,
    align,
    offsetR,
    offsetB,
    offsetX,
    offsetY,
    arrowPos,
    popupSize,
    motion,
    uniqueContainerClassName,
    uniqueContainerStyle
  } = props;
  const containerCls = `${prefixCls}-unique-container`;
  const [motionVisible, setMotionVisible] = import_react17.default.useState(false);
  const offsetStyle = useOffsetStyle(isMobile, ready, open, align, offsetR, offsetB, offsetX, offsetY);
  const cachedOffsetStyleRef = import_react17.default.useRef(offsetStyle);
  if (ready) {
    cachedOffsetStyleRef.current = offsetStyle;
  }
  const sizeStyle = {};
  if (popupSize) {
    sizeStyle.width = popupSize.width;
    sizeStyle.height = popupSize.height;
  }
  return import_react17.default.createElement(es_default3, _extends5({
    motionAppear: true,
    motionEnter: true,
    motionLeave: true,
    removeOnLeave: false,
    leavedClassName: `${containerCls}-hidden`
  }, motion, {
    visible: open,
    onVisibleChanged: (nextVisible) => {
      setMotionVisible(nextVisible);
    }
  }), ({
    className: motionClassName,
    style: motionStyle
  }) => {
    const cls = clsx(containerCls, motionClassName, uniqueContainerClassName, {
      [`${containerCls}-visible`]: motionVisible
    });
    return import_react17.default.createElement("div", {
      className: cls,
      style: {
        "--arrow-x": `${arrowPos?.x || 0}px`,
        "--arrow-y": `${arrowPos?.y || 0}px`,
        ...cachedOffsetStyleRef.current,
        ...sizeStyle,
        ...motionStyle,
        ...uniqueContainerStyle
      }
    });
  });
};
var UniqueContainer_default = UniqueContainer;

// node_modules/@rc-component/trigger/es/UniqueProvider/index.js
var UniqueProvider = ({
  children,
  postTriggerProps
}) => {
  const [trigger, open, options, onTargetVisibleChanged] = useTargetState();
  const mergedOptions = React41.useMemo(() => {
    if (!options || !postTriggerProps) {
      return options;
    }
    return postTriggerProps(options);
  }, [options, postTriggerProps]);
  const [popupEle, setPopupEle] = React41.useState(null);
  const [popupSize, setPopupSize] = React41.useState(null);
  const externalPopupRef = React41.useRef(null);
  const setPopupRef = useEvent_default((node2) => {
    externalPopupRef.current = node2;
    if (isDOM(node2) && popupEle !== node2) {
      setPopupEle(node2);
    }
  });
  const isOpenRef = React41.useRef(null);
  const delayInvoke = useDelay();
  const show = useEvent_default((showOptions, isOpen) => {
    isOpenRef.current = isOpen;
    delayInvoke(() => {
      trigger(showOptions);
    }, showOptions.delay);
  });
  const hide = (delay) => {
    delayInvoke(() => {
      if (isOpenRef.current?.()) {
        return;
      }
      trigger(false);
    }, delay);
  };
  const onVisibleChanged = useEvent_default((visible) => {
    onTargetVisibleChanged(visible);
  });
  const [
    ready,
    offsetX,
    offsetY,
    offsetR,
    offsetB,
    arrowX,
    arrowY,
    // scaleX - not used in UniqueProvider
    ,
    ,
    // scaleY - not used in UniqueProvider
    alignInfo,
    onAlign
  ] = useAlign(
    open,
    popupEle,
    mergedOptions?.target,
    mergedOptions?.popupPlacement,
    mergedOptions?.builtinPlacements || {},
    mergedOptions?.popupAlign,
    void 0,
    // onPopupAlign
    false
    // isMobile
  );
  const alignedClassName = React41.useMemo(() => {
    if (!mergedOptions) {
      return "";
    }
    const baseClassName = getAlignPopupClassName(
      mergedOptions.builtinPlacements || {},
      mergedOptions.prefixCls || "",
      alignInfo,
      false
      // alignPoint is false for UniqueProvider
    );
    return clsx(baseClassName, mergedOptions.getPopupClassNameFromAlign?.(alignInfo));
  }, [alignInfo, mergedOptions?.getPopupClassNameFromAlign, mergedOptions?.builtinPlacements, mergedOptions?.prefixCls]);
  const contextValue = React41.useMemo(() => ({
    show,
    hide
  }), []);
  React41.useEffect(() => {
    onAlign();
  }, [mergedOptions?.target]);
  const onPrepare = useEvent_default(() => {
    onAlign();
    return Promise.resolve();
  });
  const subPopupElements = React41.useRef({});
  const parentContext = React41.useContext(context_default2);
  const triggerContextValue = React41.useMemo(() => ({
    registerSubPopup: (id, subPopupEle) => {
      subPopupElements.current[id] = subPopupEle;
      parentContext?.registerSubPopup(id, subPopupEle);
    }
  }), [parentContext]);
  const prefixCls = mergedOptions?.prefixCls;
  return React41.createElement(UniqueContext.Provider, {
    value: contextValue
  }, children, mergedOptions && React41.createElement(context_default2.Provider, {
    value: triggerContextValue
  }, React41.createElement(Popup_default, {
    ref: setPopupRef,
    portal: es_default,
    onEsc: mergedOptions.onEsc,
    prefixCls,
    popup: mergedOptions.popup,
    className: clsx(mergedOptions.popupClassName, alignedClassName, `${prefixCls}-unique-controlled`),
    style: mergedOptions.popupStyle,
    target: mergedOptions.target,
    open,
    keepDom: true,
    fresh: true,
    autoDestroy: false,
    onVisibleChanged,
    ready,
    offsetX,
    offsetY,
    offsetR,
    offsetB,
    onAlign,
    onPrepare,
    onResize: (size) => setPopupSize({
      width: size.offsetWidth,
      height: size.offsetHeight
    }),
    arrowPos: {
      x: arrowX,
      y: arrowY
    },
    align: alignInfo,
    zIndex: mergedOptions.zIndex,
    mask: mergedOptions.mask,
    arrow: mergedOptions.arrow,
    motion: mergedOptions.popupMotion,
    maskMotion: mergedOptions.maskMotion,
    getPopupContainer: mergedOptions.getPopupContainer
  }, React41.createElement(UniqueContainer_default, {
    prefixCls,
    isMobile: false,
    ready,
    open,
    align: alignInfo,
    offsetR,
    offsetB,
    offsetX,
    offsetY,
    arrowPos: {
      x: arrowX,
      y: arrowY
    },
    popupSize,
    motion: mergedOptions.popupMotion,
    uniqueContainerClassName: clsx(mergedOptions.uniqueContainerClassName, alignedClassName),
    uniqueContainerStyle: mergedOptions.uniqueContainerStyle
  }))));
};
var UniqueProvider_default = UniqueProvider;

// node_modules/@rc-component/trigger/es/index.js
var import_react_dom2 = __toESM(require_react_dom());
function generateTrigger(PortalComponent = es_default) {
  const Trigger = React42.forwardRef((props, ref) => {
    const {
      prefixCls = "rc-trigger-popup",
      children,
      // Action
      action = "hover",
      showAction,
      hideAction,
      // Open
      popupVisible,
      defaultPopupVisible,
      onOpenChange,
      afterOpenChange,
      onPopupVisibleChange,
      afterPopupVisibleChange,
      // Delay
      mouseEnterDelay,
      mouseLeaveDelay = 0.1,
      focusDelay,
      blurDelay,
      // Mask
      mask,
      maskClosable = true,
      // Portal
      getPopupContainer,
      forceRender,
      autoDestroy,
      // Popup
      popup,
      popupClassName,
      uniqueContainerClassName,
      uniqueContainerStyle,
      popupStyle,
      popupPlacement,
      builtinPlacements = {},
      popupAlign,
      zIndex,
      stretch,
      getPopupClassNameFromAlign,
      fresh,
      unique,
      alignPoint,
      onPopupClick,
      onPopupAlign,
      // Arrow
      arrow,
      // Motion
      popupMotion,
      maskMotion,
      // Private
      mobile,
      ...restProps
    } = props;
    const mergedAutoDestroy = autoDestroy || false;
    const openUncontrolled = popupVisible === void 0;
    const isMobile = !!mobile;
    const subPopupElements = React42.useRef({});
    const parentContext = React42.useContext(context_default2);
    const context = React42.useMemo(() => {
      return {
        registerSubPopup: (id2, subPopupEle) => {
          subPopupElements.current[id2] = subPopupEle;
          parentContext?.registerSubPopup(id2, subPopupEle);
        }
      };
    }, [parentContext]);
    const uniqueContext = React42.useContext(UniqueContext);
    const id = useId_default();
    const [popupEle, setPopupEle] = React42.useState(null);
    const externalPopupRef = React42.useRef(null);
    const setPopupRef = useEvent_default((node2) => {
      externalPopupRef.current = node2;
      if (isDOM(node2) && popupEle !== node2) {
        setPopupEle(node2);
      }
      parentContext?.registerSubPopup(id, node2);
    });
    const [targetEle, setTargetEle] = React42.useState(null);
    const externalForwardRef = React42.useRef(null);
    const setTargetRef = useEvent_default((node2) => {
      const domNode = getDOM(node2);
      if (isDOM(domNode) && targetEle !== domNode) {
        setTargetEle(domNode);
        externalForwardRef.current = domNode;
      }
    });
    const cloneProps = {};
    const inPopupOrChild = useEvent_default((ele) => {
      const childDOM = targetEle;
      return childDOM?.contains(ele) || getShadowRoot(childDOM)?.host === ele || ele === childDOM || popupEle?.contains(ele) || getShadowRoot(popupEle)?.host === ele || ele === popupEle || Object.values(subPopupElements.current).some((subPopupEle) => subPopupEle?.contains(ele) || ele === subPopupEle);
    });
    const innerArrow = arrow ? {
      // true and Object likely
      ...arrow !== true ? arrow : {}
    } : null;
    const [internalOpen, setInternalOpen] = useControlledState(defaultPopupVisible || false, popupVisible);
    const mergedOpen = internalOpen || false;
    const child = React42.useMemo(() => {
      const nextChild = typeof children === "function" ? children({
        open: mergedOpen
      }) : children;
      return React42.Children.only(nextChild);
    }, [children, mergedOpen]);
    const originChildProps = child?.props || {};
    const isOpen = useEvent_default(() => mergedOpen);
    const getUniqueOptions = useEvent_default((delay = 0) => ({
      popup,
      target: targetEle,
      delay,
      prefixCls,
      popupClassName,
      uniqueContainerClassName,
      uniqueContainerStyle,
      popupStyle,
      popupPlacement,
      builtinPlacements,
      popupAlign,
      zIndex,
      mask,
      maskClosable,
      popupMotion,
      maskMotion,
      arrow: innerArrow,
      getPopupContainer,
      getPopupClassNameFromAlign,
      id,
      onEsc
    }));
    useLayoutEffect_default(() => {
      if (uniqueContext && unique && targetEle && !openUncontrolled && !parentContext) {
        if (mergedOpen) {
          uniqueContext.show(getUniqueOptions(mouseEnterDelay), isOpen);
        } else {
          uniqueContext.hide(mouseLeaveDelay);
        }
      }
    }, [mergedOpen, targetEle]);
    const openRef = React42.useRef(mergedOpen);
    openRef.current = mergedOpen;
    const internalTriggerOpen = useEvent_default((nextOpen) => {
      (0, import_react_dom2.flushSync)(() => {
        if (mergedOpen !== nextOpen) {
          setInternalOpen(nextOpen);
          onOpenChange?.(nextOpen);
          onPopupVisibleChange?.(nextOpen);
        }
      });
    });
    const delayInvoke = useDelay();
    const triggerOpen = (nextOpen, delay = 0) => {
      if (popupVisible !== void 0) {
        delayInvoke(() => {
          internalTriggerOpen(nextOpen);
        }, delay);
        return;
      }
      if (uniqueContext && unique && openUncontrolled && !parentContext) {
        if (nextOpen) {
          uniqueContext.show(getUniqueOptions(delay), isOpen);
        } else {
          uniqueContext.hide(delay);
        }
        return;
      }
      delayInvoke(() => {
        internalTriggerOpen(nextOpen);
      }, delay);
    };
    function onEsc({
      top
    }) {
      if (top) {
        triggerOpen(false);
      }
    }
    const [inMotion, setInMotion] = React42.useState(false);
    useLayoutEffect_default((firstMount) => {
      if (!firstMount || mergedOpen) {
        setInMotion(true);
      }
    }, [mergedOpen]);
    const [motionPrepareResolve, setMotionPrepareResolve] = React42.useState(null);
    const [mousePos, setMousePos] = React42.useState(null);
    const setMousePosByEvent = (event) => {
      setMousePos([event.clientX, event.clientY]);
    };
    const [ready, offsetX, offsetY, offsetR, offsetB, arrowX, arrowY, scaleX, scaleY, alignInfo, onAlign] = useAlign(mergedOpen, popupEle, alignPoint && mousePos !== null ? mousePos : targetEle, popupPlacement, builtinPlacements, popupAlign, onPopupAlign, isMobile);
    const [showActions, hideActions] = useAction(action, showAction, hideAction);
    const clickToShow = showActions.has("click");
    const clickToHide = hideActions.has("click") || hideActions.has("contextMenu");
    const triggerAlign = useEvent_default(() => {
      if (!inMotion) {
        onAlign();
      }
    });
    const onScroll = () => {
      if (openRef.current && alignPoint && clickToHide) {
        triggerOpen(false);
      }
    };
    useWatch(mergedOpen, targetEle, popupEle, triggerAlign, onScroll);
    useLayoutEffect_default(() => {
      triggerAlign();
    }, [mousePos, popupPlacement]);
    useLayoutEffect_default(() => {
      if (mergedOpen && !builtinPlacements?.[popupPlacement]) {
        triggerAlign();
      }
    }, [JSON.stringify(popupAlign)]);
    const alignedClassName = React42.useMemo(() => {
      const baseClassName = getAlignPopupClassName(builtinPlacements, prefixCls, alignInfo, alignPoint);
      return clsx(baseClassName, getPopupClassNameFromAlign?.(alignInfo));
    }, [alignInfo, getPopupClassNameFromAlign, builtinPlacements, prefixCls, alignPoint]);
    React42.useImperativeHandle(ref, () => ({
      nativeElement: externalForwardRef.current,
      popupElement: externalPopupRef.current,
      forceAlign: triggerAlign
    }));
    const [targetWidth, setTargetWidth] = React42.useState(0);
    const [targetHeight, setTargetHeight] = React42.useState(0);
    const syncTargetSize = () => {
      if (stretch && targetEle) {
        const rect = targetEle.getBoundingClientRect();
        setTargetWidth(rect.width);
        setTargetHeight(rect.height);
      }
    };
    const onTargetResize = () => {
      syncTargetSize();
      triggerAlign();
    };
    const onVisibleChanged = (visible) => {
      setInMotion(false);
      onAlign();
      afterOpenChange?.(visible);
      afterPopupVisibleChange?.(visible);
    };
    const onPrepare = () => new Promise((resolve) => {
      syncTargetSize();
      setMotionPrepareResolve(() => resolve);
    });
    useLayoutEffect_default(() => {
      if (motionPrepareResolve) {
        onAlign();
        motionPrepareResolve();
        setMotionPrepareResolve(null);
      }
    }, [motionPrepareResolve]);
    function wrapperAction(eventName, nextOpen, delay, callback, ignoreCheck) {
      cloneProps[eventName] = (event, ...args) => {
        if (!ignoreCheck || !ignoreCheck()) {
          callback?.(event);
          triggerOpen(nextOpen, delay);
        }
        originChildProps[eventName]?.(event, ...args);
      };
    }
    const touchToShow = showActions.has("touch");
    const touchToHide = hideActions.has("touch");
    const touchedRef = React42.useRef(false);
    if (touchToShow || touchToHide) {
      cloneProps.onTouchStart = (...args) => {
        touchedRef.current = true;
        if (openRef.current && touchToHide) {
          triggerOpen(false);
        } else if (!openRef.current && touchToShow) {
          triggerOpen(true);
        }
        originChildProps.onTouchStart?.(...args);
      };
    }
    if (clickToShow || clickToHide) {
      cloneProps.onClick = (event, ...args) => {
        if (openRef.current && clickToHide) {
          triggerOpen(false);
        } else if (!openRef.current && clickToShow) {
          setMousePosByEvent(event);
          triggerOpen(true);
        }
        originChildProps.onClick?.(event, ...args);
        touchedRef.current = false;
      };
    }
    const onPopupPointerDown = useWinClick(mergedOpen, clickToHide || touchToHide, targetEle, popupEle, mask, maskClosable, inPopupOrChild, triggerOpen);
    const hoverToShow = showActions.has("hover");
    const hoverToHide = hideActions.has("hover");
    let onPopupMouseEnter;
    let onPopupMouseLeave;
    const ignoreMouseTrigger = () => {
      return touchedRef.current;
    };
    if (hoverToShow) {
      const onMouseEnterCallback = (event) => {
        setMousePosByEvent(event);
      };
      wrapperAction("onMouseEnter", true, mouseEnterDelay, onMouseEnterCallback, ignoreMouseTrigger);
      wrapperAction("onPointerEnter", true, mouseEnterDelay, onMouseEnterCallback, ignoreMouseTrigger);
      onPopupMouseEnter = (event) => {
        if ((mergedOpen || inMotion) && popupEle?.contains(event.target)) {
          triggerOpen(true, mouseEnterDelay);
        }
      };
      if (alignPoint) {
        cloneProps.onMouseMove = (event) => {
          originChildProps.onMouseMove?.(event);
        };
      }
    }
    if (hoverToHide) {
      wrapperAction("onMouseLeave", false, mouseLeaveDelay, void 0, ignoreMouseTrigger);
      wrapperAction("onPointerLeave", false, mouseLeaveDelay, void 0, ignoreMouseTrigger);
      onPopupMouseLeave = () => {
        triggerOpen(false, mouseLeaveDelay);
      };
    }
    if (showActions.has("focus")) {
      wrapperAction("onFocus", true, focusDelay);
    }
    if (hideActions.has("focus")) {
      wrapperAction("onBlur", false, blurDelay);
    }
    if (showActions.has("contextMenu")) {
      cloneProps.onContextMenu = (event, ...args) => {
        if (openRef.current && hideActions.has("contextMenu")) {
          triggerOpen(false);
        } else {
          setMousePosByEvent(event);
          triggerOpen(true);
        }
        event.preventDefault();
        originChildProps.onContextMenu?.(event, ...args);
      };
    }
    const rendedRef = React42.useRef(false);
    rendedRef.current ||= forceRender || mergedOpen || inMotion;
    const mergedChildrenProps = {
      ...originChildProps,
      ...cloneProps
    };
    const passedProps = {};
    const passedEventList = ["onContextMenu", "onClick", "onMouseDown", "onTouchStart", "onMouseEnter", "onMouseLeave", "onFocus", "onBlur"];
    passedEventList.forEach((eventName) => {
      if (restProps[eventName]) {
        passedProps[eventName] = (...args) => {
          mergedChildrenProps[eventName]?.(...args);
          restProps[eventName](...args);
        };
      }
    });
    const arrowPos = {
      x: arrowX,
      y: arrowY
    };
    useResizeObserver(mergedOpen, targetEle, onTargetResize);
    const mergedRef = useComposeRef(setTargetRef, getNodeRef(child));
    const triggerNode = React42.cloneElement(child, {
      ...mergedChildrenProps,
      ...passedProps,
      ref: mergedRef
    });
    return React42.createElement(React42.Fragment, null, triggerNode, rendedRef.current && (!uniqueContext || !unique) && React42.createElement(context_default2.Provider, {
      value: context
    }, React42.createElement(Popup_default, {
      portal: PortalComponent,
      ref: setPopupRef,
      prefixCls,
      popup,
      className: clsx(popupClassName, !isMobile && alignedClassName),
      style: popupStyle,
      target: targetEle,
      onMouseEnter: onPopupMouseEnter,
      onMouseLeave: onPopupMouseLeave,
      onPointerEnter: onPopupMouseEnter,
      zIndex,
      open: mergedOpen,
      keepDom: inMotion,
      fresh,
      onClick: onPopupClick,
      onPointerDownCapture: onPopupPointerDown,
      mask,
      motion: popupMotion,
      maskMotion,
      onVisibleChanged,
      onPrepare,
      forceRender,
      autoDestroy: mergedAutoDestroy,
      getPopupContainer,
      onEsc,
      align: alignInfo,
      arrow: innerArrow,
      arrowPos,
      ready,
      offsetX,
      offsetY,
      offsetR,
      offsetB,
      onAlign: triggerAlign,
      stretch,
      targetWidth: targetWidth / scaleX,
      targetHeight: targetHeight / scaleY,
      mobile
    })));
  });
  if (true) {
    Trigger.displayName = "Trigger";
  }
  return Trigger;
}
var es_default4 = generateTrigger(es_default);

// node_modules/antd/es/tooltip/UniqueProvider/MotionContent.js
var import_react19 = __toESM(require_react());

// node_modules/antd/es/_util/reactNode.js
var import_react18 = __toESM(require_react());
function isFragment2(child) {
  return child && import_react18.default.isValidElement(child) && child.type === import_react18.default.Fragment;
}
var replaceElement = (element, replacement, props) => {
  if (!import_react18.default.isValidElement(element)) {
    return replacement;
  }
  return import_react18.default.cloneElement(element, typeof props === "function" ? props(element.props || {}) : props);
};
function cloneElement5(element, props) {
  return replaceElement(element, element, props);
}

// node_modules/antd/es/config-provider/context.js
var React44 = __toESM(require_react());
var defaultPrefixCls = "ant";
var defaultIconPrefixCls = "anticon";
var Variants = ["outlined", "borderless", "filled", "underlined"];
var defaultGetPrefixCls = (suffixCls, customizePrefixCls) => {
  if (customizePrefixCls) {
    return customizePrefixCls;
  }
  return suffixCls ? `${defaultPrefixCls}-${suffixCls}` : defaultPrefixCls;
};
var ConfigContext = React44.createContext({
  // We provide a default function for Context without provider
  getPrefixCls: defaultGetPrefixCls,
  iconPrefixCls: defaultIconPrefixCls
});
var {
  Consumer: ConfigConsumer
} = ConfigContext;
var EMPTY_OBJECT = {};
function useComponentConfig(propName) {
  const context = React44.useContext(ConfigContext);
  const {
    getPrefixCls,
    direction,
    getPopupContainer,
    renderEmpty
  } = context;
  const propValue = context[propName];
  return {
    classNames: EMPTY_OBJECT,
    styles: EMPTY_OBJECT,
    ...propValue,
    getPrefixCls,
    direction,
    getPopupContainer,
    renderEmpty
  };
}

// node_modules/antd/es/tooltip/UniqueProvider/MotionContent.js
var MotionContent = ({
  children
}) => {
  const {
    getPrefixCls
  } = import_react19.default.useContext(ConfigContext);
  const rootPrefixCls = getPrefixCls();
  if (!import_react19.default.isValidElement(children)) {
    return children;
  }
  return import_react19.default.createElement(es_default3, {
    visible: true,
    motionName: `${rootPrefixCls}-fade`,
    motionAppear: true,
    motionEnter: true,
    motionLeave: false,
    removeOnLeave: false
  }, ({
    style: motionStyle,
    className: motionClassName
  }) => {
    return cloneElement5(children, (oriProps) => ({
      className: clsx(oriProps.className, motionClassName),
      style: {
        ...oriProps.style,
        ...motionStyle
      }
    }));
  });
};
var MotionContent_default = MotionContent;

// node_modules/antd/es/tooltip/UniqueProvider/index.js
var cachedPlacements = [null, null];
function uniqueBuiltinPlacements(ori) {
  if (cachedPlacements[0] !== ori) {
    const target = {};
    Object.keys(ori).forEach((placement) => {
      target[placement] = {
        ...ori[placement],
        dynamicInset: false
      };
    });
    cachedPlacements[0] = ori;
    cachedPlacements[1] = target;
  }
  return cachedPlacements[1];
}
var UniqueProvider2 = ({
  children
}) => {
  const renderPopup = (options) => {
    const {
      id,
      builtinPlacements,
      popup
    } = options;
    const popupEle = typeof popup === "function" ? popup() : popup;
    const parsedPlacements = uniqueBuiltinPlacements(builtinPlacements);
    return {
      ...options,
      getPopupContainer: null,
      arrow: false,
      popup: import_react20.default.createElement(MotionContent_default, {
        key: id
      }, popupEle),
      builtinPlacements: parsedPlacements
    };
  };
  return import_react20.default.createElement(UniqueProvider_default, {
    postTriggerProps: renderPopup
  }, children);
};
var UniqueProvider_default2 = UniqueProvider2;

// node_modules/antd/es/config-provider/DisabledContext.js
var React47 = __toESM(require_react());
var DisabledContext = React47.createContext(false);
var DisabledContextProvider = ({
  children,
  disabled
}) => {
  const originDisabled = React47.useContext(DisabledContext);
  return React47.createElement(DisabledContext.Provider, {
    value: disabled ?? originDisabled
  }, children);
};
var DisabledContext_default = DisabledContext;

// node_modules/antd/es/config-provider/hooks/useConfig.js
var import_react21 = __toESM(require_react());

// node_modules/antd/es/config-provider/SizeContext.js
var React48 = __toESM(require_react());
var SizeContext = React48.createContext(void 0);
var SizeContextProvider = ({
  children,
  size
}) => {
  const originSize = React48.useContext(SizeContext);
  return React48.createElement(SizeContext.Provider, {
    value: size || originSize
  }, children);
};
var SizeContext_default = SizeContext;

// node_modules/antd/es/config-provider/hooks/useConfig.js
function useConfig() {
  const componentDisabled = (0, import_react21.useContext)(DisabledContext_default);
  const componentSize = (0, import_react21.useContext)(SizeContext_default);
  return {
    componentDisabled,
    componentSize
  };
}
var useConfig_default = useConfig;

// node_modules/antd/es/config-provider/hooks/useTheme.js
var import_react26 = __toESM(require_react());

// node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof2(o) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof2(o);
}

// node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(r2) {
  if (Array.isArray(r2)) return r2;
}

// node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(r2, l) {
  var t = null == r2 ? null : "undefined" != typeof Symbol && r2[Symbol.iterator] || r2["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r2)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r3) {
      o = true, n = r3;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

// node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// node_modules/@babel/runtime/helpers/esm/slicedToArray.js
function _slicedToArray(r2, e) {
  return _arrayWithHoles(r2) || _iterableToArrayLimit(r2, e) || _unsupportedIterableToArray(r2, e) || _nonIterableRest();
}

// node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive(t, r2) {
  if ("object" != _typeof2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r2 || "default");
    if ("object" != _typeof2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t);
}

// node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof2(i) ? i : i + "";
}

// node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty2(e, r2, t) {
  return (r2 = toPropertyKey(r2)) in e ? Object.defineProperty(e, r2, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r2] = t, e;
}

// node_modules/@babel/runtime/helpers/esm/objectSpread2.js
function ownKeys2(e, r2) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e, r3).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys2(Object(t), true).forEach(function(r3) {
      _defineProperty2(e, r3, t[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys2(Object(t)).forEach(function(r3) {
      Object.defineProperty(e, r3, Object.getOwnPropertyDescriptor(t, r3));
    });
  }
  return e;
}

// node_modules/@ant-design/cssinjs-utils/es/util/genStyleUtils.js
var import_react23 = __toESM(require_react());

// node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}

// node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(e, r2) {
  for (var t = 0; t < r2.length; t++) {
    var o = r2[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r2, t) {
  return r2 && _defineProperties(e.prototype, r2), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}

// node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}

// node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf(t, e);
}

// node_modules/@babel/runtime/helpers/esm/inherits.js
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: true,
      configurable: true
    }
  }), Object.defineProperty(t, "prototype", {
    writable: false
  }), e && _setPrototypeOf(t, e);
}

// node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
    return t2.__proto__ || Object.getPrototypeOf(t2);
  }, _getPrototypeOf(t);
}

// node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}

// node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof2(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}

// node_modules/@babel/runtime/helpers/esm/createSuper.js
function _createSuper(t) {
  var r2 = _isNativeReflectConstruct();
  return function() {
    var e, o = _getPrototypeOf(t);
    if (r2) {
      var s = _getPrototypeOf(this).constructor;
      e = Reflect.construct(o, arguments, s);
    } else e = o.apply(this, arguments);
    return _possibleConstructorReturn(this, e);
  };
}

// node_modules/@ant-design/cssinjs-utils/es/util/calc/calculator.js
var AbstractCalculator = _createClass(function AbstractCalculator2() {
  _classCallCheck(this, AbstractCalculator2);
});
var calculator_default2 = AbstractCalculator;

// node_modules/@ant-design/cssinjs-utils/es/util/calc/CSSCalculator.js
var CALC_UNIT2 = "CALC_UNIT";
var regexp2 = new RegExp(CALC_UNIT2, "g");
function unit2(value) {
  if (typeof value === "number") {
    return "".concat(value).concat(CALC_UNIT2);
  }
  return value;
}
var CSSCalculator2 = (function(_AbstractCalculator) {
  _inherits(CSSCalculator3, _AbstractCalculator);
  var _super = _createSuper(CSSCalculator3);
  function CSSCalculator3(num, unitlessCssVar) {
    var _this;
    _classCallCheck(this, CSSCalculator3);
    _this = _super.call(this);
    _defineProperty2(_assertThisInitialized(_this), "result", "");
    _defineProperty2(_assertThisInitialized(_this), "unitlessCssVar", void 0);
    _defineProperty2(_assertThisInitialized(_this), "lowPriority", void 0);
    var numType = _typeof2(num);
    _this.unitlessCssVar = unitlessCssVar;
    if (num instanceof CSSCalculator3) {
      _this.result = "(".concat(num.result, ")");
    } else if (numType === "number") {
      _this.result = unit2(num);
    } else if (numType === "string") {
      _this.result = num;
    }
    return _this;
  }
  _createClass(CSSCalculator3, [{
    key: "add",
    value: function add(num) {
      if (num instanceof CSSCalculator3) {
        this.result = "".concat(this.result, " + ").concat(num.getResult());
      } else if (typeof num === "number" || typeof num === "string") {
        this.result = "".concat(this.result, " + ").concat(unit2(num));
      }
      this.lowPriority = true;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(num) {
      if (num instanceof CSSCalculator3) {
        this.result = "".concat(this.result, " - ").concat(num.getResult());
      } else if (typeof num === "number" || typeof num === "string") {
        this.result = "".concat(this.result, " - ").concat(unit2(num));
      }
      this.lowPriority = true;
      return this;
    }
  }, {
    key: "mul",
    value: function mul(num) {
      if (this.lowPriority) {
        this.result = "(".concat(this.result, ")");
      }
      if (num instanceof CSSCalculator3) {
        this.result = "".concat(this.result, " * ").concat(num.getResult(true));
      } else if (typeof num === "number" || typeof num === "string") {
        this.result = "".concat(this.result, " * ").concat(num);
      }
      this.lowPriority = false;
      return this;
    }
  }, {
    key: "div",
    value: function div(num) {
      if (this.lowPriority) {
        this.result = "(".concat(this.result, ")");
      }
      if (num instanceof CSSCalculator3) {
        this.result = "".concat(this.result, " / ").concat(num.getResult(true));
      } else if (typeof num === "number" || typeof num === "string") {
        this.result = "".concat(this.result, " / ").concat(num);
      }
      this.lowPriority = false;
      return this;
    }
  }, {
    key: "getResult",
    value: function getResult(force) {
      return this.lowPriority || force ? "(".concat(this.result, ")") : this.result;
    }
  }, {
    key: "equal",
    value: function equal(options) {
      var _this2 = this;
      var _ref = options || {}, cssUnit = _ref.unit;
      var mergedUnit = true;
      if (typeof cssUnit === "boolean") {
        mergedUnit = cssUnit;
      } else if (Array.from(this.unitlessCssVar).some(function(cssVar) {
        return _this2.result.includes(cssVar);
      })) {
        mergedUnit = false;
      }
      this.result = this.result.replace(regexp2, mergedUnit ? "px" : "");
      if (typeof this.lowPriority !== "undefined") {
        return "calc(".concat(this.result, ")");
      }
      return this.result;
    }
  }]);
  return CSSCalculator3;
})(calculator_default2);

// node_modules/@ant-design/cssinjs-utils/es/util/calc/NumCalculator.js
var NumCalculator2 = (function(_AbstractCalculator) {
  _inherits(NumCalculator3, _AbstractCalculator);
  var _super = _createSuper(NumCalculator3);
  function NumCalculator3(num) {
    var _this;
    _classCallCheck(this, NumCalculator3);
    _this = _super.call(this);
    _defineProperty2(_assertThisInitialized(_this), "result", 0);
    if (num instanceof NumCalculator3) {
      _this.result = num.result;
    } else if (typeof num === "number") {
      _this.result = num;
    }
    return _this;
  }
  _createClass(NumCalculator3, [{
    key: "add",
    value: function add(num) {
      if (num instanceof NumCalculator3) {
        this.result += num.result;
      } else if (typeof num === "number") {
        this.result += num;
      }
      return this;
    }
  }, {
    key: "sub",
    value: function sub(num) {
      if (num instanceof NumCalculator3) {
        this.result -= num.result;
      } else if (typeof num === "number") {
        this.result -= num;
      }
      return this;
    }
  }, {
    key: "mul",
    value: function mul(num) {
      if (num instanceof NumCalculator3) {
        this.result *= num.result;
      } else if (typeof num === "number") {
        this.result *= num;
      }
      return this;
    }
  }, {
    key: "div",
    value: function div(num) {
      if (num instanceof NumCalculator3) {
        this.result /= num.result;
      } else if (typeof num === "number") {
        this.result /= num;
      }
      return this;
    }
  }, {
    key: "equal",
    value: function equal() {
      return this.result;
    }
  }]);
  return NumCalculator3;
})(calculator_default2);
var NumCalculator_default = NumCalculator2;

// node_modules/@ant-design/cssinjs-utils/es/util/calc/index.js
var genCalc = function genCalc2(type, unitlessCssVar) {
  var Calculator = type === "css" ? CSSCalculator2 : NumCalculator_default;
  return function(num) {
    return new Calculator(num, unitlessCssVar);
  };
};
var calc_default2 = genCalc;

// node_modules/@ant-design/cssinjs-utils/es/util/getCompVarPrefix.js
var getCompVarPrefix = function getCompVarPrefix2(component, prefix2) {
  return "".concat([prefix2, component.replace(/([A-Z]+)([A-Z][a-z]+)/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2")].filter(Boolean).join("-"));
};
var getCompVarPrefix_default = getCompVarPrefix;

// node_modules/@ant-design/cssinjs-utils/es/util/getComponentToken.js
function getComponentToken(component, token2, defaultToken, options) {
  var customToken = _objectSpread2({}, token2[component]);
  if (options !== null && options !== void 0 && options.deprecatedTokens) {
    var deprecatedTokens = options.deprecatedTokens;
    deprecatedTokens.forEach(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 2), oldTokenKey = _ref2[0], newTokenKey = _ref2[1];
      if (true) {
        warning_default(!(customToken !== null && customToken !== void 0 && customToken[oldTokenKey]), "Component Token `".concat(String(oldTokenKey), "` of ").concat(String(component), " is deprecated. Please use `").concat(String(newTokenKey), "` instead."));
      }
      if (customToken !== null && customToken !== void 0 && customToken[oldTokenKey] || customToken !== null && customToken !== void 0 && customToken[newTokenKey]) {
        var _customToken$newToken;
        (_customToken$newToken = customToken[newTokenKey]) !== null && _customToken$newToken !== void 0 ? _customToken$newToken : customToken[newTokenKey] = customToken === null || customToken === void 0 ? void 0 : customToken[oldTokenKey];
      }
    });
  }
  var mergedToken = _objectSpread2(_objectSpread2({}, defaultToken), customToken);
  Object.keys(mergedToken).forEach(function(key) {
    if (mergedToken[key] === token2[key]) {
      delete mergedToken[key];
    }
  });
  return mergedToken;
}
var getComponentToken_default = getComponentToken;

// node_modules/@ant-design/cssinjs-utils/es/util/statistic.js
var enableStatistic = true;
var recording = true;
function merge2() {
  for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {
    objs[_key] = arguments[_key];
  }
  if (!enableStatistic) {
    return Object.assign.apply(Object, [{}].concat(objs));
  }
  recording = false;
  var ret = {};
  objs.forEach(function(obj) {
    if (_typeof2(obj) !== "object") {
      return;
    }
    var keys2 = Object.keys(obj);
    keys2.forEach(function(key) {
      Object.defineProperty(ret, key, {
        configurable: true,
        enumerable: true,
        get: function get2() {
          return obj[key];
        }
      });
    });
  });
  recording = true;
  return ret;
}
var statistic = {};
function noop2() {
}
var statisticToken = function statisticToken2(token2) {
  var tokenKeys2;
  var proxy = token2;
  var flush = noop2;
  if (enableStatistic && typeof Proxy !== "undefined") {
    tokenKeys2 = /* @__PURE__ */ new Set();
    proxy = new Proxy(token2, {
      get: function get2(obj, prop) {
        if (recording) {
          var _tokenKeys;
          (_tokenKeys = tokenKeys2) === null || _tokenKeys === void 0 || _tokenKeys.add(prop);
        }
        return obj[prop];
      }
    });
    flush = function flush2(componentName, componentToken) {
      var _statistic$componentN;
      statistic[componentName] = {
        global: Array.from(tokenKeys2),
        component: _objectSpread2(_objectSpread2({}, (_statistic$componentN = statistic[componentName]) === null || _statistic$componentN === void 0 ? void 0 : _statistic$componentN.component), componentToken)
      };
    };
  }
  return {
    token: proxy,
    keys: tokenKeys2,
    flush
  };
};
var statistic_default = statisticToken;

// node_modules/@ant-design/cssinjs-utils/es/util/getDefaultComponentToken.js
function getDefaultComponentToken(component, token2, getDefaultToken) {
  if (typeof getDefaultToken === "function") {
    var _token$component;
    return getDefaultToken(merge2(token2, (_token$component = token2[component]) !== null && _token$component !== void 0 ? _token$component : {}));
  }
  return getDefaultToken !== null && getDefaultToken !== void 0 ? getDefaultToken : {};
}
var getDefaultComponentToken_default = getDefaultComponentToken;

// node_modules/@ant-design/cssinjs-utils/es/util/maxmin.js
function genMaxMin(type) {
  if (type === "js") {
    return {
      max: Math.max,
      min: Math.min
    };
  }
  return {
    max: function max() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return "max(".concat(args.map(function(value) {
        return unit(value);
      }).join(","), ")");
    },
    min: function min() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return "min(".concat(args.map(function(value) {
        return unit(value);
      }).join(","), ")");
    }
  };
}
var maxmin_default = genMaxMin;

// node_modules/@ant-design/cssinjs-utils/es/_util/hooks/useUniqueMemo.js
var import_react22 = __toESM(require_react());
var BEAT_LIMIT = 1e3 * 60 * 10;
var ArrayKeyMap = (function() {
  function ArrayKeyMap2() {
    _classCallCheck(this, ArrayKeyMap2);
    _defineProperty2(this, "map", /* @__PURE__ */ new Map());
    _defineProperty2(this, "objectIDMap", /* @__PURE__ */ new WeakMap());
    _defineProperty2(this, "nextID", 0);
    _defineProperty2(this, "lastAccessBeat", /* @__PURE__ */ new Map());
    _defineProperty2(this, "accessBeat", 0);
  }
  _createClass(ArrayKeyMap2, [{
    key: "set",
    value: function set2(keys2, value) {
      this.clear();
      var compositeKey = this.getCompositeKey(keys2);
      this.map.set(compositeKey, value);
      this.lastAccessBeat.set(compositeKey, Date.now());
    }
  }, {
    key: "get",
    value: function get2(keys2) {
      var compositeKey = this.getCompositeKey(keys2);
      var cache = this.map.get(compositeKey);
      this.lastAccessBeat.set(compositeKey, Date.now());
      this.accessBeat += 1;
      return cache;
    }
  }, {
    key: "getCompositeKey",
    value: function getCompositeKey(keys2) {
      var _this = this;
      var ids = keys2.map(function(key) {
        if (key && _typeof2(key) === "object") {
          return "obj_".concat(_this.getObjectID(key));
        }
        return "".concat(_typeof2(key), "_").concat(key);
      });
      return ids.join("|");
    }
  }, {
    key: "getObjectID",
    value: function getObjectID(obj) {
      if (this.objectIDMap.has(obj)) {
        return this.objectIDMap.get(obj);
      }
      var id = this.nextID;
      this.objectIDMap.set(obj, id);
      this.nextID += 1;
      return id;
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this2 = this;
      if (this.accessBeat > 1e4) {
        var now = Date.now();
        this.lastAccessBeat.forEach(function(beat, key) {
          if (now - beat > BEAT_LIMIT) {
            _this2.map.delete(key);
            _this2.lastAccessBeat.delete(key);
          }
        });
        this.accessBeat = 0;
      }
    }
  }]);
  return ArrayKeyMap2;
})();
var uniqueMap = new ArrayKeyMap();
function useUniqueMemo(memoFn, deps) {
  return import_react22.default.useMemo(function() {
    var cachedValue = uniqueMap.get(deps);
    if (cachedValue) {
      return cachedValue;
    }
    var newValue = memoFn();
    uniqueMap.set(deps, newValue);
    return newValue;
  }, deps);
}
var useUniqueMemo_default = useUniqueMemo;

// node_modules/@ant-design/cssinjs-utils/es/hooks/useCSP.js
var useDefaultCSP = function useDefaultCSP2() {
  return {};
};
var useCSP_default = useDefaultCSP;

// node_modules/@ant-design/cssinjs-utils/es/util/genStyleUtils.js
function genStyleUtils(config) {
  var _config$useCSP = config.useCSP, useCSP = _config$useCSP === void 0 ? useCSP_default : _config$useCSP, useToken2 = config.useToken, usePrefix = config.usePrefix, getResetStyles = config.getResetStyles, getCommonStyle = config.getCommonStyle, getCompUnitless = config.getCompUnitless;
  function genStyleHooks2(component, styleFn, getDefaultToken, options) {
    var componentName = Array.isArray(component) ? component[0] : component;
    function prefixToken(key) {
      return "".concat(String(componentName)).concat(key.slice(0, 1).toUpperCase()).concat(key.slice(1));
    }
    var originUnitless = (options === null || options === void 0 ? void 0 : options.unitless) || {};
    var originCompUnitless = typeof getCompUnitless === "function" ? getCompUnitless(component) : {};
    var compUnitless = _objectSpread2(_objectSpread2({}, originCompUnitless), {}, _defineProperty2({}, prefixToken("zIndexPopup"), true));
    Object.keys(originUnitless).forEach(function(key) {
      compUnitless[prefixToken(key)] = originUnitless[key];
    });
    var mergedOptions = _objectSpread2(_objectSpread2({}, options), {}, {
      unitless: compUnitless,
      prefixToken
    });
    var useStyle = genComponentStyleHook2(component, styleFn, getDefaultToken, mergedOptions);
    var useCSSVar = genCSSVarRegister(componentName, getDefaultToken, mergedOptions);
    return function(prefixCls) {
      var rootCls = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : prefixCls;
      var hashId = useStyle(prefixCls, rootCls);
      var cssVarCls = useCSSVar(rootCls);
      return [hashId, cssVarCls];
    };
  }
  function genCSSVarRegister(component, getDefaultToken, options) {
    var compUnitless = options.unitless, prefixToken = options.prefixToken, ignore2 = options.ignore;
    return function(rootCls) {
      var _useToken = useToken2(), cssVar = _useToken.cssVar, realToken = _useToken.realToken;
      useCSSVarRegister_default({
        path: [component],
        prefix: cssVar.prefix,
        key: cssVar.key,
        unitless: compUnitless,
        ignore: ignore2,
        token: realToken,
        scope: rootCls
      }, function() {
        var defaultToken = getDefaultComponentToken_default(component, realToken, getDefaultToken);
        var componentToken = getComponentToken_default(component, realToken, defaultToken, {
          deprecatedTokens: options === null || options === void 0 ? void 0 : options.deprecatedTokens
        });
        if (defaultToken) {
          Object.keys(defaultToken).forEach(function(key) {
            componentToken[prefixToken(key)] = componentToken[key];
            delete componentToken[key];
          });
        }
        return componentToken;
      });
      return cssVar === null || cssVar === void 0 ? void 0 : cssVar.key;
    };
  }
  function genComponentStyleHook2(componentName, styleFn, getDefaultToken) {
    var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    var cells = Array.isArray(componentName) ? componentName : [componentName, componentName];
    var _cells = _slicedToArray(cells, 1), component = _cells[0];
    var concatComponent = cells.join("-");
    var mergedLayer = config.layer || {
      name: "antd"
    };
    return function(prefixCls) {
      var rootCls = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : prefixCls;
      var _useToken2 = useToken2(), theme = _useToken2.theme, realToken = _useToken2.realToken, hashId = _useToken2.hashId, token2 = _useToken2.token, cssVar = _useToken2.cssVar, zeroRuntime = _useToken2.zeroRuntime;
      var memoizedZeroRuntime = (0, import_react23.useMemo)(function() {
        return zeroRuntime;
      }, []);
      if (memoizedZeroRuntime) {
        return hashId;
      }
      var _usePrefix = usePrefix(), rootPrefixCls = _usePrefix.rootPrefixCls, iconPrefixCls = _usePrefix.iconPrefixCls;
      var csp = useCSP();
      var type = "css";
      var calc = useUniqueMemo_default(function() {
        var unitlessCssVar = /* @__PURE__ */ new Set();
        Object.keys(options.unitless || {}).forEach(function(key) {
          unitlessCssVar.add(token2CSSVar(key, cssVar.prefix));
          unitlessCssVar.add(token2CSSVar(key, getCompVarPrefix_default(component, cssVar.prefix)));
        });
        return calc_default2(type, unitlessCssVar);
      }, [type, component, cssVar === null || cssVar === void 0 ? void 0 : cssVar.prefix]);
      var _genMaxMin = maxmin_default(type), max = _genMaxMin.max, min = _genMaxMin.min;
      var sharedConfig = {
        theme,
        token: token2,
        hashId,
        nonce: function nonce() {
          return csp.nonce;
        },
        clientOnly: options.clientOnly,
        layer: mergedLayer,
        // antd is always at top of styles
        order: options.order || -999
      };
      if (typeof getResetStyles === "function") {
        useStyleRegister(_objectSpread2(_objectSpread2({}, sharedConfig), {}, {
          clientOnly: false,
          path: ["Shared", rootPrefixCls]
        }), function() {
          return getResetStyles(token2, {
            prefix: {
              rootPrefixCls,
              iconPrefixCls
            },
            csp
          });
        });
      }
      useStyleRegister(_objectSpread2(_objectSpread2({}, sharedConfig), {}, {
        path: [concatComponent, prefixCls, iconPrefixCls]
      }), function() {
        if (options.injectStyle === false) {
          return [];
        }
        var _statisticToken = statistic_default(token2), proxyToken = _statisticToken.token, flush = _statisticToken.flush;
        var defaultComponentToken = getDefaultComponentToken_default(component, realToken, getDefaultToken);
        var componentCls = ".".concat(prefixCls);
        var componentToken = getComponentToken_default(component, realToken, defaultComponentToken, {
          deprecatedTokens: options.deprecatedTokens
        });
        if (defaultComponentToken && _typeof2(defaultComponentToken) === "object") {
          Object.keys(defaultComponentToken).forEach(function(key) {
            defaultComponentToken[key] = "var(".concat(token2CSSVar(key, getCompVarPrefix_default(component, cssVar.prefix)), ")");
          });
        }
        var mergedToken = merge2(proxyToken, {
          componentCls,
          prefixCls,
          iconCls: ".".concat(iconPrefixCls),
          antCls: ".".concat(rootPrefixCls),
          calc,
          max,
          min
        }, defaultComponentToken);
        var styleInterpolation = styleFn(mergedToken, {
          hashId,
          prefixCls,
          rootPrefixCls,
          iconPrefixCls
        });
        flush(component, componentToken);
        var commonStyle = typeof getCommonStyle === "function" ? getCommonStyle(mergedToken, prefixCls, rootCls, options.resetFont) : null;
        return [options.resetStyle === false ? null : commonStyle, styleInterpolation];
      });
      return hashId;
    };
  }
  function genSubStyleComponent2(componentName, styleFn, getDefaultToken) {
    var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    var useStyle = genComponentStyleHook2(componentName, styleFn, getDefaultToken, _objectSpread2({
      resetStyle: false,
      // Sub Style should default after root one
      order: -998
    }, options));
    var StyledComponent = function StyledComponent2(_ref) {
      var prefixCls = _ref.prefixCls, _ref$rootCls = _ref.rootCls, rootCls = _ref$rootCls === void 0 ? prefixCls : _ref$rootCls;
      useStyle(prefixCls, rootCls);
      return null;
    };
    if (true) {
      StyledComponent.displayName = "SubStyle_".concat(String(Array.isArray(componentName) ? componentName.join(".") : componentName));
    }
    return StyledComponent;
  }
  return {
    genStyleHooks: genStyleHooks2,
    genSubStyleComponent: genSubStyleComponent2,
    genComponentStyleHook: genComponentStyleHook2
  };
}
var genStyleUtils_default = genStyleUtils;

// node_modules/antd/es/theme/interface/presetColors.js
var PresetColors = ["blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"];

// node_modules/antd/es/theme/useToken.js
var import_react24 = __toESM(require_react());

// node_modules/antd/es/version/version.js
var version_default = "6.2.2";

// node_modules/antd/es/version/index.js
var version_default2 = version_default;

// node_modules/antd/es/theme/util/getAlphaColor.js
function isStableColor(color) {
  return color >= 0 && color <= 255;
}
function getAlphaColor2(frontColor, backgroundColor) {
  const {
    r: fR,
    g: fG,
    b: fB,
    a: originAlpha
  } = new FastColor(frontColor).toRgb();
  if (originAlpha < 1) {
    return frontColor;
  }
  const {
    r: bR,
    g: bG,
    b: bB
  } = new FastColor(backgroundColor).toRgb();
  for (let fA = 0.01; fA <= 1; fA += 0.01) {
    const r2 = Math.round((fR - bR * (1 - fA)) / fA);
    const g = Math.round((fG - bG * (1 - fA)) / fA);
    const b = Math.round((fB - bB * (1 - fA)) / fA);
    if (isStableColor(r2) && isStableColor(g) && isStableColor(b)) {
      return new FastColor({
        r: r2,
        g,
        b,
        a: Math.round(fA * 100) / 100
      }).toRgbString();
    }
  }
  return new FastColor({
    r: fR,
    g: fG,
    b: fB,
    a: 1
  }).toRgbString();
}
var getAlphaColor_default = getAlphaColor2;

// node_modules/antd/es/theme/util/alias.js
function formatToken(derivativeToken) {
  const {
    override,
    ...restToken
  } = derivativeToken;
  const overrideTokens = {
    ...override
  };
  Object.keys(seed_default).forEach((token2) => {
    delete overrideTokens[token2];
  });
  const mergedToken = {
    ...restToken,
    ...overrideTokens
  };
  const screenXS = 480;
  const screenSM = 576;
  const screenMD = 768;
  const screenLG = 992;
  const screenXL = 1200;
  const screenXXL = 1600;
  if (mergedToken.motion === false) {
    const fastDuration = "0s";
    mergedToken.motionDurationFast = fastDuration;
    mergedToken.motionDurationMid = fastDuration;
    mergedToken.motionDurationSlow = fastDuration;
  }
  const aliasToken = {
    ...mergedToken,
    // ============== Background ============== //
    colorFillContent: mergedToken.colorFillSecondary,
    colorFillContentHover: mergedToken.colorFill,
    colorFillAlter: mergedToken.colorFillQuaternary,
    colorBgContainerDisabled: mergedToken.colorFillTertiary,
    // ============== Split ============== //
    colorBorderBg: mergedToken.colorBgContainer,
    colorSplit: getAlphaColor_default(mergedToken.colorBorderSecondary, mergedToken.colorBgContainer),
    // ============== Text ============== //
    colorTextPlaceholder: mergedToken.colorTextQuaternary,
    colorTextDisabled: mergedToken.colorTextQuaternary,
    colorTextHeading: mergedToken.colorText,
    colorTextLabel: mergedToken.colorTextSecondary,
    colorTextDescription: mergedToken.colorTextTertiary,
    colorTextLightSolid: mergedToken.colorWhite,
    colorHighlight: mergedToken.colorError,
    colorBgTextHover: mergedToken.colorFillSecondary,
    colorBgTextActive: mergedToken.colorFill,
    colorIcon: mergedToken.colorTextTertiary,
    colorIconHover: mergedToken.colorText,
    colorErrorOutline: getAlphaColor_default(mergedToken.colorErrorBg, mergedToken.colorBgContainer),
    colorWarningOutline: getAlphaColor_default(mergedToken.colorWarningBg, mergedToken.colorBgContainer),
    // Font
    fontSizeIcon: mergedToken.fontSizeSM,
    // Line
    lineWidthFocus: mergedToken.lineWidth * 3,
    // Control
    lineWidth: mergedToken.lineWidth,
    controlOutlineWidth: mergedToken.lineWidth * 2,
    // Checkbox size and expand icon size
    controlInteractiveSize: mergedToken.controlHeight / 2,
    controlItemBgHover: mergedToken.colorFillTertiary,
    controlItemBgActive: mergedToken.colorPrimaryBg,
    controlItemBgActiveHover: mergedToken.colorPrimaryBgHover,
    controlItemBgActiveDisabled: mergedToken.colorFill,
    controlTmpOutline: mergedToken.colorFillQuaternary,
    controlOutline: getAlphaColor_default(mergedToken.colorPrimaryBg, mergedToken.colorBgContainer),
    lineType: mergedToken.lineType,
    borderRadius: mergedToken.borderRadius,
    borderRadiusXS: mergedToken.borderRadiusXS,
    borderRadiusSM: mergedToken.borderRadiusSM,
    borderRadiusLG: mergedToken.borderRadiusLG,
    fontWeightStrong: 600,
    opacityLoading: 0.65,
    linkDecoration: "none",
    linkHoverDecoration: "none",
    linkFocusDecoration: "none",
    controlPaddingHorizontal: 12,
    controlPaddingHorizontalSM: 8,
    paddingXXS: mergedToken.sizeXXS,
    paddingXS: mergedToken.sizeXS,
    paddingSM: mergedToken.sizeSM,
    padding: mergedToken.size,
    paddingMD: mergedToken.sizeMD,
    paddingLG: mergedToken.sizeLG,
    paddingXL: mergedToken.sizeXL,
    paddingContentHorizontalLG: mergedToken.sizeLG,
    paddingContentVerticalLG: mergedToken.sizeMS,
    paddingContentHorizontal: mergedToken.sizeMS,
    paddingContentVertical: mergedToken.sizeSM,
    paddingContentHorizontalSM: mergedToken.size,
    paddingContentVerticalSM: mergedToken.sizeXS,
    marginXXS: mergedToken.sizeXXS,
    marginXS: mergedToken.sizeXS,
    marginSM: mergedToken.sizeSM,
    margin: mergedToken.size,
    marginMD: mergedToken.sizeMD,
    marginLG: mergedToken.sizeLG,
    marginXL: mergedToken.sizeXL,
    marginXXL: mergedToken.sizeXXL,
    boxShadow: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowSecondary: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowTertiary: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
    screenXS,
    screenXSMin: screenXS,
    screenXSMax: screenSM - 1,
    screenSM,
    screenSMMin: screenSM,
    screenSMMax: screenMD - 1,
    screenMD,
    screenMDMin: screenMD,
    screenMDMax: screenLG - 1,
    screenLG,
    screenLGMin: screenLG,
    screenLGMax: screenXL - 1,
    screenXL,
    screenXLMin: screenXL,
    screenXLMax: screenXXL - 1,
    screenXXL,
    screenXXLMin: screenXXL,
    boxShadowPopoverArrow: "2px 2px 5px rgba(0, 0, 0, 0.05)",
    boxShadowCard: `
      0 1px 2px -2px ${new FastColor("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new FastColor("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new FastColor("rgba(0, 0, 0, 0.09)").toRgbString()}
    `,
    boxShadowDrawerRight: `
      -6px 0 16px 0 rgba(0, 0, 0, 0.08),
      -3px 0 6px -4px rgba(0, 0, 0, 0.12),
      -9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerLeft: `
      6px 0 16px 0 rgba(0, 0, 0, 0.08),
      3px 0 6px -4px rgba(0, 0, 0, 0.12),
      9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerUp: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerDown: `
      0 -6px 16px 0 rgba(0, 0, 0, 0.08),
      0 -3px 6px -4px rgba(0, 0, 0, 0.12),
      0 -9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowTabsOverflowLeft: "inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowRight: "inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowTop: "inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowBottom: "inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)",
    // Override AliasToken
    ...overrideTokens
  };
  return aliasToken;
}

// node_modules/antd/es/theme/useToken.js
var unitless = {
  lineHeight: true,
  lineHeightSM: true,
  lineHeightLG: true,
  lineHeightHeading1: true,
  lineHeightHeading2: true,
  lineHeightHeading3: true,
  lineHeightHeading4: true,
  lineHeightHeading5: true,
  opacityLoading: true,
  fontWeightStrong: true,
  zIndexPopupBase: true,
  zIndexBase: true,
  opacityImage: true
};
var ignore = {
  motionBase: true,
  motionUnit: true
};
var preserve = {
  screenXS: true,
  screenXSMin: true,
  screenXSMax: true,
  screenSM: true,
  screenSMMin: true,
  screenSMMax: true,
  screenMD: true,
  screenMDMin: true,
  screenMDMax: true,
  screenLG: true,
  screenLGMin: true,
  screenLGMax: true,
  screenXL: true,
  screenXLMin: true,
  screenXLMax: true,
  screenXXL: true,
  screenXXLMin: true
};
var getComputedToken2 = (originToken, overrideToken, theme) => {
  const derivativeToken = theme.getDerivativeToken(originToken);
  const {
    override,
    ...components
  } = overrideToken;
  let mergedDerivativeToken = {
    ...derivativeToken,
    override
  };
  mergedDerivativeToken = formatToken(mergedDerivativeToken);
  if (components) {
    Object.entries(components).forEach(([key, value]) => {
      const {
        theme: componentTheme,
        ...componentTokens
      } = value;
      let mergedComponentToken = componentTokens;
      if (componentTheme) {
        mergedComponentToken = getComputedToken2({
          ...mergedDerivativeToken,
          ...componentTokens
        }, {
          override: componentTokens
        }, componentTheme);
      }
      mergedDerivativeToken[key] = mergedComponentToken;
    });
  }
  return mergedDerivativeToken;
};
function useToken() {
  const {
    token: rootDesignToken,
    hashed,
    theme,
    override,
    cssVar: ctxCssVar,
    zeroRuntime
  } = import_react24.default.useContext(DesignTokenContext);
  const cssVar = {
    prefix: ctxCssVar?.prefix ?? "ant",
    key: ctxCssVar?.key ?? "css-var-root"
  };
  const salt = `${version_default2}-${hashed || ""}`;
  const mergedTheme = theme || theme_default;
  const [token2, hashId, realToken] = useCacheToken(mergedTheme, [seed_default, rootDesignToken], {
    salt,
    override,
    getComputedToken: getComputedToken2,
    cssVar: {
      ...cssVar,
      unitless,
      ignore,
      preserve
    }
  });
  return [mergedTheme, realToken, hashed ? hashId : "", token2, cssVar, !!zeroRuntime];
}

// node_modules/antd/es/theme/util/genStyleUtils.js
var import_react25 = __toESM(require_react());

// node_modules/antd/es/style/index.js
var textEllipsis = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis"
};
var resetComponent = (token2, needInheritFontFamily = false) => ({
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  color: token2.colorText,
  fontSize: token2.fontSize,
  // font-variant: @font-variant-base;
  lineHeight: token2.lineHeight,
  listStyle: "none",
  // font-feature-settings: @font-feature-settings-base;
  fontFamily: needInheritFontFamily ? "inherit" : token2.fontFamily
});
var resetIcon = () => ({
  display: "inline-flex",
  alignItems: "center",
  color: "inherit",
  fontStyle: "normal",
  lineHeight: 0,
  textAlign: "center",
  textTransform: "none",
  // for SVG icon, see https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
  verticalAlign: "-0.125em",
  textRendering: "optimizeLegibility",
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
  "> *": {
    lineHeight: 1
  },
  svg: {
    display: "inline-block"
  }
});
var clearFix = () => ({
  // https://github.com/ant-design/ant-design/issues/21301#issuecomment-583955229
  "&::before": {
    display: "table",
    content: '""'
  },
  "&::after": {
    // https://github.com/ant-design/ant-design/issues/21864
    display: "table",
    clear: "both",
    content: '""'
  }
});
var genLinkStyle = (token2) => ({
  a: {
    color: token2.colorLink,
    textDecoration: token2.linkDecoration,
    backgroundColor: "transparent",
    // remove the gray background on active links in IE 10.
    outline: "none",
    cursor: "pointer",
    transition: `color ${token2.motionDurationSlow}`,
    "-webkit-text-decoration-skip": "objects",
    // remove gaps in links underline in iOS 8+ and Safari 8+.
    "&:hover": {
      color: token2.colorLinkHover
    },
    "&:active": {
      color: token2.colorLinkActive
    },
    "&:active, &:hover": {
      textDecoration: token2.linkHoverDecoration,
      outline: 0
    },
    // https://github.com/ant-design/ant-design/issues/22503
    "&:focus": {
      textDecoration: token2.linkFocusDecoration,
      outline: 0
    },
    "&[disabled]": {
      color: token2.colorTextDisabled,
      cursor: "not-allowed"
    }
  }
});
var genCommonStyle = (token2, componentPrefixCls, rootCls, resetFont) => {
  const prefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;
  const rootPrefixSelector = rootCls ? `.${rootCls}` : prefixSelector;
  const resetStyle = {
    boxSizing: "border-box",
    "&::before, &::after": {
      boxSizing: "border-box"
    }
  };
  let resetFontStyle = {};
  if (resetFont !== false) {
    resetFontStyle = {
      fontFamily: token2.fontFamily,
      fontSize: token2.fontSize
    };
  }
  return {
    [rootPrefixSelector]: {
      ...resetFontStyle,
      ...resetStyle,
      [prefixSelector]: resetStyle
    }
  };
};
var genFocusOutline = (token2, offset) => ({
  outline: `${unit(token2.lineWidthFocus)} solid ${token2.colorPrimaryBorder}`,
  outlineOffset: offset ?? 1,
  transition: "outline-offset 0s, outline 0s"
});
var genFocusStyle = (token2, offset) => ({
  "&:focus-visible": genFocusOutline(token2, offset)
});
var genIconStyle = (iconPrefixCls) => ({
  [`.${iconPrefixCls}`]: {
    ...resetIcon(),
    [`.${iconPrefixCls} .${iconPrefixCls}-icon`]: {
      display: "block"
    }
  }
});
var operationUnit = (token2) => ({
  // FIXME: This use link but is a operation unit. Seems should be a colorPrimary.
  // And Typography use this to generate link style which should not do this.
  color: token2.colorLink,
  textDecoration: token2.linkDecoration,
  outline: "none",
  cursor: "pointer",
  transition: `all ${token2.motionDurationSlow}`,
  border: 0,
  padding: 0,
  background: "none",
  userSelect: "none",
  ...genFocusStyle(token2),
  "&:hover": {
    color: token2.colorLinkHover,
    textDecoration: token2.linkHoverDecoration
  },
  "&:focus": {
    color: token2.colorLinkHover,
    textDecoration: token2.linkFocusDecoration
  },
  "&:active": {
    color: token2.colorLinkActive,
    textDecoration: token2.linkHoverDecoration
  }
});

// node_modules/antd/es/theme/util/genStyleUtils.js
var {
  genStyleHooks,
  genComponentStyleHook,
  genSubStyleComponent
} = genStyleUtils_default({
  usePrefix: () => {
    const {
      getPrefixCls,
      iconPrefixCls
    } = (0, import_react25.useContext)(ConfigContext);
    const rootPrefixCls = getPrefixCls();
    return {
      rootPrefixCls,
      iconPrefixCls
    };
  },
  useToken: () => {
    const [theme, realToken, hashId, token2, cssVar, zeroRuntime] = useToken();
    return {
      theme,
      realToken,
      hashId,
      token: token2,
      cssVar,
      zeroRuntime
    };
  },
  useCSP: () => {
    const {
      csp
    } = (0, import_react25.useContext)(ConfigContext);
    return csp ?? {};
  },
  getResetStyles: (token2, config) => {
    const linkStyle = genLinkStyle(token2);
    return [linkStyle, {
      "&": linkStyle
    }, genIconStyle(config?.prefix.iconPrefixCls ?? defaultIconPrefixCls)];
  },
  getCommonStyle: genCommonStyle,
  getCompUnitless: () => unitless
});
var genCssVar = (antCls, component) => {
  const cssPrefix = `--${antCls.replace(/\./g, "")}-${component}-`;
  const varName = (name) => {
    return `${cssPrefix}${name}`;
  };
  const varRef = (name, fallback) => {
    return fallback ? `var(${cssPrefix}${name}, ${fallback})` : `var(${cssPrefix}${name})`;
  };
  return [varName, varRef];
};

// node_modules/antd/es/theme/util/genPresetColor.js
function genPresetColor(token2, genCss) {
  return PresetColors.reduce((prev2, colorKey) => {
    const lightColor = token2[`${colorKey}1`];
    const lightBorderColor = token2[`${colorKey}3`];
    const darkColor = token2[`${colorKey}6`];
    const textColor = token2[`${colorKey}7`];
    return {
      ...prev2,
      ...genCss(colorKey, {
        lightColor,
        lightBorderColor,
        darkColor,
        textColor
      })
    };
  }, {});
}

// node_modules/antd/es/theme/util/useResetIconStyle.js
var useResetIconStyle = (iconPrefixCls, csp) => {
  const [theme, token2] = useToken();
  return useStyleRegister({
    theme,
    token: token2,
    hashId: "",
    path: ["ant-design-icons", iconPrefixCls],
    nonce: () => csp?.nonce,
    layer: {
      name: "antd"
    }
  }, () => genIconStyle(iconPrefixCls));
};
var useResetIconStyle_default = useResetIconStyle;

// node_modules/antd/es/config-provider/hooks/useTheme.js
function useTheme(theme, parentTheme, config) {
  const warning4 = devUseWarning("ConfigProvider");
  const themeConfig = theme || {};
  const parentThemeConfig = themeConfig.inherit === false || !parentTheme ? {
    ...defaultConfig,
    hashed: parentTheme?.hashed ?? defaultConfig.hashed,
    cssVar: parentTheme?.cssVar
  } : parentTheme;
  const themeKey = (0, import_react26.useId)();
  if (true) {
    const cssVarEnabled = themeConfig.cssVar || parentThemeConfig.cssVar;
    const validKey = !!(typeof themeConfig.cssVar === "object" && themeConfig.cssVar?.key || themeKey);
    true ? warning4(!cssVarEnabled || validKey, "breaking", "Missing key in `cssVar` config. Please upgrade to React 18 or set `cssVar.key` manually in each ConfigProvider inside `cssVar` enabled ConfigProvider.") : void 0;
  }
  return useMemo(() => {
    if (!theme) {
      return parentTheme;
    }
    const mergedComponents = {
      ...parentThemeConfig.components
    };
    Object.keys(theme.components || {}).forEach((componentName) => {
      mergedComponents[componentName] = {
        ...mergedComponents[componentName],
        ...theme.components[componentName]
      };
    });
    const cssVarKey = `css-var-${themeKey.replace(/:/g, "")}`;
    const mergedCssVar = {
      prefix: config?.prefixCls,
      // Same as prefixCls by default
      ...parentThemeConfig.cssVar,
      ...themeConfig.cssVar,
      key: themeConfig.cssVar?.key || cssVarKey
    };
    return {
      ...parentThemeConfig,
      ...themeConfig,
      token: {
        ...parentThemeConfig.token,
        ...themeConfig.token
      },
      components: mergedComponents,
      cssVar: mergedCssVar
    };
  }, [themeConfig, parentThemeConfig], (prev2, next2) => prev2.some((prevTheme, index) => {
    const nextTheme = next2[index];
    return !isEqual_default(prevTheme, nextTheme, true);
  }));
}

// node_modules/antd/es/config-provider/MotionWrapper.js
var React51 = __toESM(require_react());
var MotionCacheContext = React51.createContext(true);
if (true) {
  MotionCacheContext.displayName = "MotionCacheContext";
}
function MotionWrapper(props) {
  const parentMotion = React51.useContext(MotionCacheContext);
  const {
    children
  } = props;
  const [, token2] = useToken();
  const {
    motion
  } = token2;
  const needWrapMotionProviderRef = React51.useRef(false);
  needWrapMotionProviderRef.current || (needWrapMotionProviderRef.current = parentMotion !== motion);
  if (needWrapMotionProviderRef.current) {
    return React51.createElement(MotionCacheContext.Provider, {
      value: motion
    }, React51.createElement(MotionProvider, {
      motion
    }, children));
  }
  return children;
}

// node_modules/antd/es/config-provider/PropWarning.js
var React52 = __toESM(require_react());
var PropWarning = React52.memo(({
  dropdownMatchSelectWidth
}) => {
  const warning4 = devUseWarning("ConfigProvider");
  warning4.deprecated(dropdownMatchSelectWidth === void 0, "dropdownMatchSelectWidth", "popupMatchSelectWidth");
  return null;
});
if (true) {
  PropWarning.displayName = "PropWarning";
}
var PropWarning_default = true ? PropWarning : () => null;

// node_modules/antd/es/config-provider/index.js
var IconStyle = ({
  iconPrefixCls,
  csp
}) => {
  useResetIconStyle_default(iconPrefixCls, csp);
  return null;
};
var existThemeConfig = false;
var warnContext = true ? (componentName) => {
  true ? warning_default2(!existThemeConfig, componentName, `Static function can not consume context like dynamic theme. Please use 'App' component instead.`) : void 0;
} : (
  /* istanbul ignore next */
  null
);
var PASSED_PROPS = ["getTargetContainer", "getPopupContainer", "renderEmpty", "input", "pagination", "form", "select", "button"];
var globalPrefixCls;
var globalIconPrefixCls;
var globalTheme;
var globalHolderRender;
function getGlobalPrefixCls() {
  return globalPrefixCls || defaultPrefixCls;
}
function getGlobalIconPrefixCls() {
  return globalIconPrefixCls || defaultIconPrefixCls;
}
var setGlobalConfig = (props) => {
  const {
    prefixCls,
    iconPrefixCls,
    theme,
    holderRender
  } = props;
  if (prefixCls !== void 0) {
    globalPrefixCls = prefixCls;
  }
  if (iconPrefixCls !== void 0) {
    globalIconPrefixCls = iconPrefixCls;
  }
  if ("holderRender" in props) {
    globalHolderRender = holderRender;
  }
  if (theme) {
    globalTheme = theme;
  }
};
var globalConfig = () => ({
  getPrefixCls: (suffixCls, customizePrefixCls) => {
    if (customizePrefixCls) {
      return customizePrefixCls;
    }
    return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
  },
  getIconPrefixCls: getGlobalIconPrefixCls,
  getRootPrefixCls: () => {
    if (globalPrefixCls) {
      return globalPrefixCls;
    }
    return getGlobalPrefixCls();
  },
  getTheme: () => globalTheme,
  holderRender: globalHolderRender
});
var ProviderChildren = (props) => {
  const {
    children,
    csp: customCsp,
    autoInsertSpaceInButton,
    alert,
    affix,
    anchor,
    form,
    locale: locale5,
    componentSize,
    direction,
    space,
    splitter,
    virtual,
    dropdownMatchSelectWidth,
    popupMatchSelectWidth,
    popupOverflow,
    legacyLocale,
    parentContext,
    iconPrefixCls: customIconPrefixCls,
    theme,
    componentDisabled,
    segmented,
    statistic: statistic2,
    spin,
    calendar,
    carousel,
    cascader,
    collapse,
    typography,
    checkbox,
    descriptions,
    divider,
    drawer,
    skeleton,
    steps,
    image,
    layout,
    list,
    mentions,
    modal,
    progress,
    result,
    slider,
    breadcrumb,
    masonry,
    menu,
    pagination,
    input,
    textArea,
    otp,
    empty,
    badge,
    radio,
    rate,
    ribbon,
    switch: SWITCH,
    transfer,
    avatar,
    message,
    tag,
    table,
    card,
    cardMeta,
    tabs,
    timeline,
    timePicker,
    upload,
    notification,
    tree,
    colorPicker,
    datePicker,
    rangePicker,
    flex,
    wave,
    dropdown,
    warning: warningConfig,
    tour,
    tooltip,
    popover,
    popconfirm,
    qrcode,
    floatButton,
    floatButtonGroup,
    variant,
    inputNumber,
    treeSelect,
    watermark
  } = props;
  const getPrefixCls = React53.useCallback((suffixCls, customizePrefixCls) => {
    const {
      prefixCls
    } = props;
    if (customizePrefixCls) {
      return customizePrefixCls;
    }
    const mergedPrefixCls = prefixCls || parentContext.getPrefixCls("");
    return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
  }, [parentContext.getPrefixCls, props.prefixCls]);
  const iconPrefixCls = customIconPrefixCls || parentContext.iconPrefixCls || defaultIconPrefixCls;
  const csp = customCsp || parentContext.csp;
  const mergedTheme = useTheme(theme, parentContext.theme, {
    prefixCls: getPrefixCls("")
  });
  if (true) {
    existThemeConfig = existThemeConfig || !!mergedTheme;
  }
  const baseConfig = {
    csp,
    autoInsertSpaceInButton,
    alert,
    affix,
    anchor,
    locale: locale5 || legacyLocale,
    direction,
    space,
    splitter,
    virtual,
    popupMatchSelectWidth: popupMatchSelectWidth ?? dropdownMatchSelectWidth,
    popupOverflow,
    getPrefixCls,
    iconPrefixCls,
    theme: mergedTheme,
    segmented,
    statistic: statistic2,
    spin,
    calendar,
    carousel,
    cascader,
    collapse,
    typography,
    checkbox,
    descriptions,
    divider,
    drawer,
    skeleton,
    steps,
    image,
    input,
    textArea,
    otp,
    layout,
    list,
    mentions,
    modal,
    progress,
    result,
    slider,
    breadcrumb,
    masonry,
    menu,
    pagination,
    empty,
    badge,
    radio,
    rate,
    ribbon,
    switch: SWITCH,
    transfer,
    avatar,
    message,
    tag,
    table,
    card,
    cardMeta,
    tabs,
    timeline,
    timePicker,
    upload,
    notification,
    tree,
    colorPicker,
    datePicker,
    rangePicker,
    flex,
    wave,
    dropdown,
    warning: warningConfig,
    tour,
    tooltip,
    popover,
    popconfirm,
    qrcode,
    floatButton,
    floatButtonGroup,
    variant,
    inputNumber,
    treeSelect,
    watermark
  };
  if (true) {
    const warningFn = devUseWarning("ConfigProvider");
    warningFn(!("autoInsertSpaceInButton" in props), "deprecated", "`autoInsertSpaceInButton` is deprecated. Please use `{ button: { autoInsertSpace: boolean }}` instead.");
  }
  const config = {
    ...parentContext
  };
  Object.keys(baseConfig).forEach((key) => {
    if (baseConfig[key] !== void 0) {
      config[key] = baseConfig[key];
    }
  });
  PASSED_PROPS.forEach((propName) => {
    const propValue = props[propName];
    if (propValue) {
      config[propName] = propValue;
    }
  });
  if (typeof autoInsertSpaceInButton !== "undefined") {
    config.button = {
      autoInsertSpace: autoInsertSpaceInButton,
      ...config.button
    };
  }
  const memoedConfig = useMemo(() => config, config, (prevConfig, currentConfig) => {
    const prevKeys = Object.keys(prevConfig);
    const currentKeys = Object.keys(currentConfig);
    return prevKeys.length !== currentKeys.length || prevKeys.some((key) => prevConfig[key] !== currentConfig[key]);
  });
  const {
    layer
  } = React53.useContext(StyleContext_default);
  const memoIconContextValue = React53.useMemo(() => ({
    prefixCls: iconPrefixCls,
    csp,
    layer: layer ? "antd" : void 0
  }), [iconPrefixCls, csp, layer]);
  let childNode = React53.createElement(React53.Fragment, null, React53.createElement(IconStyle, {
    iconPrefixCls,
    csp
  }), React53.createElement(PropWarning_default, {
    dropdownMatchSelectWidth
  }), children);
  const validateMessages = React53.useMemo(() => merge(en_US_default6.Form?.defaultValidateMessages || {}, memoedConfig.locale?.Form?.defaultValidateMessages || {}, memoedConfig.form?.validateMessages || {}, form?.validateMessages || {}), [memoedConfig, form?.validateMessages]);
  if (Object.keys(validateMessages).length > 0) {
    childNode = React53.createElement(validateMessagesContext_default.Provider, {
      value: validateMessages
    }, childNode);
  }
  if (locale5) {
    childNode = React53.createElement(locale_default, {
      locale: locale5,
      _ANT_MARK__: ANT_MARK
    }, childNode);
  }
  if (iconPrefixCls || csp) {
    childNode = React53.createElement(Context_default.Provider, {
      value: memoIconContextValue
    }, childNode);
  }
  if (componentSize) {
    childNode = React53.createElement(SizeContextProvider, {
      size: componentSize
    }, childNode);
  }
  childNode = React53.createElement(MotionWrapper, null, childNode);
  if (tooltip?.unique) {
    childNode = React53.createElement(UniqueProvider_default2, null, childNode);
  }
  const memoTheme = React53.useMemo(() => {
    const {
      algorithm,
      token: token2,
      components,
      cssVar,
      ...rest
    } = mergedTheme || {};
    const themeObj = algorithm && (!Array.isArray(algorithm) || algorithm.length > 0) ? createTheme(algorithm) : theme_default;
    const parsedComponents = {};
    Object.entries(components || {}).forEach(([componentName, componentToken]) => {
      const parsedToken = {
        ...componentToken
      };
      if ("algorithm" in parsedToken) {
        if (parsedToken.algorithm === true) {
          parsedToken.theme = themeObj;
        } else if (Array.isArray(parsedToken.algorithm) || typeof parsedToken.algorithm === "function") {
          parsedToken.theme = createTheme(parsedToken.algorithm);
        }
        delete parsedToken.algorithm;
      }
      parsedComponents[componentName] = parsedToken;
    });
    const mergedToken = {
      ...seed_default,
      ...token2
    };
    return {
      ...rest,
      theme: themeObj,
      token: mergedToken,
      components: parsedComponents,
      override: {
        override: mergedToken,
        ...parsedComponents
      },
      cssVar
    };
  }, [mergedTheme]);
  if (theme) {
    childNode = React53.createElement(DesignTokenContext.Provider, {
      value: memoTheme
    }, childNode);
  }
  if (memoedConfig.warning) {
    childNode = React53.createElement(WarningContext.Provider, {
      value: memoedConfig.warning
    }, childNode);
  }
  if (componentDisabled !== void 0) {
    childNode = React53.createElement(DisabledContextProvider, {
      disabled: componentDisabled
    }, childNode);
  }
  return React53.createElement(ConfigContext.Provider, {
    value: memoedConfig
  }, childNode);
};
var ConfigProvider = (props) => {
  const context = React53.useContext(ConfigContext);
  const antLocale = React53.useContext(context_default);
  return React53.createElement(ProviderChildren, {
    parentContext: context,
    legacyLocale: antLocale,
    ...props
  });
};
ConfigProvider.ConfigContext = ConfigContext;
ConfigProvider.SizeContext = SizeContext_default;
ConfigProvider.config = setGlobalConfig;
ConfigProvider.useConfig = useConfig_default;
Object.defineProperty(ConfigProvider, "SizeContext", {
  get: () => {
    true ? warning_default2(false, "ConfigProvider", "ConfigProvider.SizeContext is deprecated. Please use `ConfigProvider.useConfig().componentSize` instead.") : void 0;
    return SizeContext_default;
  }
});
if (true) {
  ConfigProvider.displayName = "ConfigProvider";
}
var config_provider_default = ConfigProvider;

// node_modules/antd/es/layout/context.js
var React54 = __toESM(require_react());
var LayoutContext = React54.createContext({
  siderHook: {
    addSider: () => null,
    removeSider: () => null
  }
});

// node_modules/antd/es/layout/Sider.js
var React61 = __toESM(require_react());
var import_react28 = __toESM(require_react());

// node_modules/@ant-design/icons/es/icons/BarsOutlined.js
var React58 = __toESM(require_react());

// node_modules/@ant-design/icons-svg/es/asn/BarsOutlined.js
var BarsOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z" } }] }, "name": "bars", "theme": "outlined" };
var BarsOutlined_default = BarsOutlined;

// node_modules/@ant-design/icons/es/components/AntdIcon.js
var React57 = __toESM(require_react());

// node_modules/@ant-design/icons/es/components/IconBase.js
var React56 = __toESM(require_react());

// node_modules/@ant-design/icons/es/utils.js
var import_react27 = __toESM(require_react());
function camelCase(input) {
  return input.replace(/-(.)/g, (match2, g) => g.toUpperCase());
}
function warning3(valid, message) {
  warningOnce(valid, `[@ant-design/icons] ${message}`);
}
function isIconDefinition(target) {
  return typeof target === "object" && typeof target.name === "string" && typeof target.theme === "string" && (typeof target.icon === "object" || typeof target.icon === "function");
}
function normalizeAttrs(attrs = {}) {
  return Object.keys(attrs).reduce((acc, key) => {
    const val = attrs[key];
    switch (key) {
      case "class":
        acc.className = val;
        delete acc.class;
        break;
      default:
        delete acc[key];
        acc[camelCase(key)] = val;
    }
    return acc;
  }, {});
}
function generate2(node2, key, rootProps) {
  if (!rootProps) {
    return import_react27.default.createElement(node2.tag, {
      key,
      ...normalizeAttrs(node2.attrs)
    }, (node2.children || []).map((child, index) => generate2(child, `${key}-${node2.tag}-${index}`)));
  }
  return import_react27.default.createElement(node2.tag, {
    key,
    ...normalizeAttrs(node2.attrs),
    ...rootProps
  }, (node2.children || []).map((child, index) => generate2(child, `${key}-${node2.tag}-${index}`)));
}
function getSecondaryColor(primaryColor) {
  return generate(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
  if (!twoToneColor) {
    return [];
  }
  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
}
var iconStyles = `
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
  vertical-align: inherit;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`;
var useInsertStyles = (eleRef) => {
  const {
    csp,
    prefixCls,
    layer
  } = (0, import_react27.useContext)(Context_default);
  let mergedStyleStr = iconStyles;
  if (prefixCls) {
    mergedStyleStr = mergedStyleStr.replace(/anticon/g, prefixCls);
  }
  if (layer) {
    mergedStyleStr = `@layer ${layer} {
${mergedStyleStr}
}`;
  }
  (0, import_react27.useEffect)(() => {
    const ele = eleRef.current;
    const shadowRoot = getShadowRoot(ele);
    updateCSS(mergedStyleStr, "@ant-design-icons", {
      prepend: !layer,
      csp,
      attachTo: shadowRoot
    });
  }, []);
};

// node_modules/@ant-design/icons/es/components/IconBase.js
var twoToneColorPalette = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: false
};
function setTwoToneColors({
  primaryColor,
  secondaryColor
}) {
  twoToneColorPalette.primaryColor = primaryColor;
  twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
  twoToneColorPalette.calculated = !!secondaryColor;
}
function getTwoToneColors() {
  return {
    ...twoToneColorPalette
  };
}
var IconBase = (props) => {
  const {
    icon,
    className,
    onClick,
    style: style2,
    primaryColor,
    secondaryColor,
    ...restProps
  } = props;
  const svgRef = React56.useRef(null);
  let colors = twoToneColorPalette;
  if (primaryColor) {
    colors = {
      primaryColor,
      secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
    };
  }
  useInsertStyles(svgRef);
  warning3(isIconDefinition(icon), `icon should be icon definiton, but got ${icon}`);
  if (!isIconDefinition(icon)) {
    return null;
  }
  let target = icon;
  if (target && typeof target.icon === "function") {
    target = {
      ...target,
      icon: target.icon(colors.primaryColor, colors.secondaryColor)
    };
  }
  return generate2(target.icon, `svg-${target.name}`, {
    className,
    onClick,
    style: style2,
    "data-icon": target.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true",
    ...restProps,
    ref: svgRef
  });
};
IconBase.displayName = "IconReact";
IconBase.getTwoToneColors = getTwoToneColors;
IconBase.setTwoToneColors = setTwoToneColors;
var IconBase_default = IconBase;

// node_modules/@ant-design/icons/es/components/twoTonePrimaryColor.js
function setTwoToneColor(twoToneColor) {
  const [primaryColor, secondaryColor] = normalizeTwoToneColors(twoToneColor);
  return IconBase_default.setTwoToneColors({
    primaryColor,
    secondaryColor
  });
}
function getTwoToneColor() {
  const colors = IconBase_default.getTwoToneColors();
  if (!colors.calculated) {
    return colors.primaryColor;
  }
  return [colors.primaryColor, colors.secondaryColor];
}

// node_modules/@ant-design/icons/es/components/AntdIcon.js
function _extends6() {
  _extends6 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends6.apply(this, arguments);
}
setTwoToneColor(blue.primary);
var Icon = React57.forwardRef((props, ref) => {
  const {
    // affect outter <i>...</i>
    className,
    // affect inner <svg>...</svg>
    icon,
    spin,
    rotate,
    tabIndex,
    onClick,
    // other
    twoToneColor,
    ...restProps
  } = props;
  const {
    prefixCls = "anticon",
    rootClassName
  } = React57.useContext(Context_default);
  const classString = clsx(rootClassName, prefixCls, {
    [`${prefixCls}-${icon.name}`]: !!icon.name,
    [`${prefixCls}-spin`]: !!spin || icon.name === "loading"
  }, className);
  let iconTabIndex = tabIndex;
  if (iconTabIndex === void 0 && onClick) {
    iconTabIndex = -1;
  }
  const svgStyle = rotate ? {
    msTransform: `rotate(${rotate}deg)`,
    transform: `rotate(${rotate}deg)`
  } : void 0;
  const [primaryColor, secondaryColor] = normalizeTwoToneColors(twoToneColor);
  return React57.createElement("span", _extends6({
    role: "img",
    "aria-label": icon.name
  }, restProps, {
    ref,
    tabIndex: iconTabIndex,
    onClick,
    className: classString
  }), React57.createElement(IconBase_default, {
    icon,
    primaryColor,
    secondaryColor,
    style: svgStyle
  }));
});
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
if (true) {
  Icon.displayName = "AntdIcon";
}
var AntdIcon_default = Icon;

// node_modules/@ant-design/icons/es/icons/BarsOutlined.js
function _extends7() {
  _extends7 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends7.apply(this, arguments);
}
var BarsOutlined2 = (props, ref) => React58.createElement(AntdIcon_default, _extends7({}, props, {
  ref,
  icon: BarsOutlined_default
}));
var RefIcon = React58.forwardRef(BarsOutlined2);
if (true) {
  RefIcon.displayName = "BarsOutlined";
}
var BarsOutlined_default2 = RefIcon;

// node_modules/@ant-design/icons/es/icons/LeftOutlined.js
var React59 = __toESM(require_react());

// node_modules/@ant-design/icons-svg/es/asn/LeftOutlined.js
var LeftOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" } }] }, "name": "left", "theme": "outlined" };
var LeftOutlined_default = LeftOutlined;

// node_modules/@ant-design/icons/es/icons/LeftOutlined.js
function _extends8() {
  _extends8 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends8.apply(this, arguments);
}
var LeftOutlined2 = (props, ref) => React59.createElement(AntdIcon_default, _extends8({}, props, {
  ref,
  icon: LeftOutlined_default
}));
var RefIcon2 = React59.forwardRef(LeftOutlined2);
if (true) {
  RefIcon2.displayName = "LeftOutlined";
}
var LeftOutlined_default2 = RefIcon2;

// node_modules/@ant-design/icons/es/icons/RightOutlined.js
var React60 = __toESM(require_react());

// node_modules/@ant-design/icons-svg/es/asn/RightOutlined.js
var RightOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" } }] }, "name": "right", "theme": "outlined" };
var RightOutlined_default = RightOutlined;

// node_modules/@ant-design/icons/es/icons/RightOutlined.js
function _extends9() {
  _extends9 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends9.apply(this, arguments);
}
var RightOutlined2 = (props, ref) => React60.createElement(AntdIcon_default, _extends9({}, props, {
  ref,
  icon: RightOutlined_default
}));
var RefIcon3 = React60.forwardRef(RightOutlined2);
if (true) {
  RefIcon3.displayName = "RightOutlined";
}
var RightOutlined_default2 = RefIcon3;

// node_modules/antd/es/layout/style/index.js
var genLayoutStyle = (token2) => {
  const {
    antCls,
    // .ant
    componentCls,
    // .ant-layout
    colorText,
    footerBg,
    headerHeight,
    headerPadding,
    headerColor,
    footerPadding,
    fontSize,
    bodyBg,
    headerBg
  } = token2;
  return {
    [componentCls]: {
      display: "flex",
      flex: "auto",
      flexDirection: "column",
      /* fix firefox can't set height smaller than content on flex item */
      minHeight: 0,
      background: bodyBg,
      "&, *": {
        boxSizing: "border-box"
      },
      [`&${componentCls}-has-sider`]: {
        flexDirection: "row",
        [`> ${componentCls}, > ${componentCls}-content`]: {
          // https://segmentfault.com/a/1190000019498300
          width: 0
        }
      },
      [`${componentCls}-header, &${componentCls}-footer`]: {
        flex: "0 0 auto"
      },
      // RTL
      "&-rtl": {
        direction: "rtl"
      }
    },
    // ==================== Header ====================
    [`${componentCls}-header`]: {
      height: headerHeight,
      padding: headerPadding,
      color: headerColor,
      lineHeight: unit(headerHeight),
      background: headerBg,
      // Other components/menu/style/index.less line:686
      // Integration with header element so menu items have the same height
      [`${antCls}-menu`]: {
        lineHeight: "inherit"
      }
    },
    // ==================== Footer ====================
    [`${componentCls}-footer`]: {
      padding: footerPadding,
      color: colorText,
      fontSize,
      background: footerBg
    },
    // =================== Content ====================
    [`${componentCls}-content`]: {
      flex: "auto",
      color: colorText,
      // fix firefox can't set height smaller than content on flex item
      minHeight: 0
    }
  };
};
var prepareComponentToken = (token2) => {
  const {
    colorBgLayout,
    controlHeight,
    controlHeightLG,
    colorText,
    controlHeightSM,
    marginXXS,
    colorTextLightSolid,
    colorBgContainer
  } = token2;
  const paddingInline = controlHeightLG * 1.25;
  return {
    // Deprecated
    colorBgHeader: "#001529",
    colorBgBody: colorBgLayout,
    colorBgTrigger: "#002140",
    bodyBg: colorBgLayout,
    headerBg: "#001529",
    headerHeight: controlHeight * 2,
    headerPadding: `0 ${paddingInline}px`,
    headerColor: colorText,
    footerPadding: `${controlHeightSM}px ${paddingInline}px`,
    footerBg: colorBgLayout,
    siderBg: "#001529",
    triggerHeight: controlHeightLG + marginXXS * 2,
    triggerBg: "#002140",
    triggerColor: colorTextLightSolid,
    zeroTriggerWidth: controlHeightLG,
    zeroTriggerHeight: controlHeightLG,
    lightSiderBg: colorBgContainer,
    lightTriggerBg: colorBgContainer,
    lightTriggerColor: colorText
  };
};
var DEPRECATED_TOKENS = [["colorBgBody", "bodyBg"], ["colorBgHeader", "headerBg"], ["colorBgTrigger", "triggerBg"]];
var style_default = genStyleHooks("Layout", genLayoutStyle, prepareComponentToken, {
  deprecatedTokens: DEPRECATED_TOKENS
});

// node_modules/antd/es/layout/style/sider.js
var genSiderStyle = (token2) => {
  const {
    componentCls,
    siderBg,
    motionDurationMid,
    motionDurationSlow,
    antCls,
    triggerHeight,
    triggerColor,
    triggerBg,
    headerHeight,
    zeroTriggerWidth,
    zeroTriggerHeight,
    borderRadiusLG,
    lightSiderBg,
    lightTriggerColor,
    lightTriggerBg,
    bodyBg
  } = token2;
  return {
    [componentCls]: {
      position: "relative",
      // fix firefox can't set width smaller than content on flex item
      minWidth: 0,
      background: siderBg,
      transition: `all ${motionDurationMid}, background 0s`,
      "&-has-trigger": {
        paddingBottom: triggerHeight
      },
      "&-right": {
        order: 1
      },
      [`${componentCls}-children`]: {
        height: "100%",
        // Hack for fixing margin collapse bug
        // https://github.com/ant-design/ant-design/issues/7967
        // solution from https://stackoverflow.com/a/33132624/3040605
        marginTop: -0.1,
        paddingTop: 0.1,
        [`${antCls}-menu${antCls}-menu-inline-collapsed`]: {
          width: "auto"
        }
      },
      [`&-zero-width ${componentCls}-children`]: {
        overflow: "hidden"
      },
      [`${componentCls}-trigger`]: {
        position: "fixed",
        bottom: 0,
        zIndex: 1,
        height: triggerHeight,
        color: triggerColor,
        lineHeight: unit(triggerHeight),
        textAlign: "center",
        background: triggerBg,
        cursor: "pointer",
        transition: `all ${motionDurationMid}`
      },
      [`${componentCls}-zero-width-trigger`]: {
        position: "absolute",
        top: headerHeight,
        insetInlineEnd: token2.calc(zeroTriggerWidth).mul(-1).equal(),
        zIndex: 1,
        width: zeroTriggerWidth,
        height: zeroTriggerHeight,
        color: triggerColor,
        fontSize: token2.fontSizeXL,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: siderBg,
        borderRadius: `0 ${unit(borderRadiusLG)} ${unit(borderRadiusLG)} 0`,
        cursor: "pointer",
        transition: `background-color ${motionDurationSlow} ease`,
        "&::after": {
          position: "absolute",
          inset: 0,
          background: "transparent",
          transition: `all ${motionDurationSlow}`,
          content: '""'
        },
        "&:hover::after": {
          background: `rgba(255, 255, 255, 0.2)`
        },
        "&-right": {
          insetInlineStart: token2.calc(zeroTriggerWidth).mul(-1).equal(),
          borderRadius: `${unit(borderRadiusLG)} 0 0 ${unit(borderRadiusLG)}`
        }
      },
      // Light
      "&-light": {
        background: lightSiderBg,
        [`${componentCls}-trigger`]: {
          color: lightTriggerColor,
          background: lightTriggerBg
        },
        [`${componentCls}-zero-width-trigger`]: {
          color: lightTriggerColor,
          background: lightTriggerBg,
          border: `1px solid ${bodyBg}`,
          // Safe to modify to any other color
          borderInlineStart: 0
        }
      }
    }
  };
};
var sider_default = genStyleHooks(["Layout", "Sider"], genSiderStyle, prepareComponentToken, {
  deprecatedTokens: DEPRECATED_TOKENS
});

// node_modules/antd/es/layout/Sider.js
var dimensionMaxMap = {
  xs: "479.98px",
  sm: "575.98px",
  md: "767.98px",
  lg: "991.98px",
  xl: "1199.98px",
  xxl: "1599.98px"
};
var isNumeric = (val) => !Number.isNaN(Number.parseFloat(val)) && Number.isFinite(Number(val));
var SiderContext = React61.createContext({});
var generateId = /* @__PURE__ */ (() => {
  let i = 0;
  return (prefix2 = "") => {
    i += 1;
    return `${prefix2}${i}`;
  };
})();
var Sider = React61.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    trigger,
    children,
    defaultCollapsed = false,
    theme = "dark",
    style: style2 = {},
    collapsible = false,
    reverseArrow = false,
    width = 200,
    collapsedWidth = 80,
    zeroWidthTriggerStyle,
    breakpoint,
    onCollapse,
    onBreakpoint,
    ...otherProps
  } = props;
  const {
    siderHook
  } = (0, import_react28.useContext)(LayoutContext);
  const [collapsed, setCollapsed] = (0, import_react28.useState)("collapsed" in props ? props.collapsed : defaultCollapsed);
  const [below, setBelow] = (0, import_react28.useState)(false);
  (0, import_react28.useEffect)(() => {
    if ("collapsed" in props) {
      setCollapsed(props.collapsed);
    }
  }, [props.collapsed]);
  const handleSetCollapsed = (value, type) => {
    if (!("collapsed" in props)) {
      setCollapsed(value);
    }
    onCollapse?.(value, type);
  };
  const {
    getPrefixCls,
    direction
  } = (0, import_react28.useContext)(ConfigContext);
  const prefixCls = getPrefixCls("layout-sider", customizePrefixCls);
  const [hashId, cssVarCls] = sider_default(prefixCls);
  const responsiveHandlerRef = (0, import_react28.useRef)(null);
  responsiveHandlerRef.current = (mql) => {
    setBelow(mql.matches);
    onBreakpoint?.(mql.matches);
    if (collapsed !== mql.matches) {
      handleSetCollapsed(mql.matches, "responsive");
    }
  };
  (0, import_react28.useEffect)(() => {
    function responsiveHandler(mql2) {
      return responsiveHandlerRef.current?.(mql2);
    }
    let mql;
    if (typeof window?.matchMedia !== "undefined" && breakpoint && breakpoint in dimensionMaxMap) {
      mql = window.matchMedia(`screen and (max-width: ${dimensionMaxMap[breakpoint]})`);
      if (typeof mql?.addEventListener === "function") {
        mql.addEventListener("change", responsiveHandler);
      }
      responsiveHandler(mql);
    }
    return () => {
      if (typeof mql?.removeEventListener === "function") {
        mql.removeEventListener("change", responsiveHandler);
      }
    };
  }, [breakpoint]);
  (0, import_react28.useEffect)(() => {
    const uniqueId = generateId("ant-sider-");
    siderHook.addSider(uniqueId);
    return () => siderHook.removeSider(uniqueId);
  }, []);
  const toggle = () => {
    handleSetCollapsed(!collapsed, "clickTrigger");
  };
  const divProps = omit(otherProps, ["collapsed"]);
  const rawWidth = collapsed ? collapsedWidth : width;
  const siderWidth = isNumeric(rawWidth) ? `${rawWidth}px` : String(rawWidth);
  const zeroWidthTrigger = Number.parseFloat(String(collapsedWidth || 0)) === 0 ? React61.createElement("span", {
    onClick: toggle,
    className: clsx(`${prefixCls}-zero-width-trigger`, `${prefixCls}-zero-width-trigger-${reverseArrow ? "right" : "left"}`),
    style: zeroWidthTriggerStyle
  }, trigger || React61.createElement(BarsOutlined_default2, null)) : null;
  const reverseIcon = direction === "rtl" === !reverseArrow;
  const iconObj = {
    expanded: reverseIcon ? React61.createElement(RightOutlined_default2, null) : React61.createElement(LeftOutlined_default2, null),
    collapsed: reverseIcon ? React61.createElement(LeftOutlined_default2, null) : React61.createElement(RightOutlined_default2, null)
  };
  const status = collapsed ? "collapsed" : "expanded";
  const defaultTrigger = iconObj[status];
  const triggerDom = trigger !== null ? zeroWidthTrigger || React61.createElement("div", {
    className: `${prefixCls}-trigger`,
    onClick: toggle,
    style: {
      width: siderWidth
    }
  }, trigger || defaultTrigger) : null;
  const divStyle = {
    ...style2,
    flex: `0 0 ${siderWidth}`,
    maxWidth: siderWidth,
    // Fix width transition bug in IE11
    minWidth: siderWidth,
    // https://github.com/ant-design/ant-design/issues/6349
    width: siderWidth
  };
  const siderCls = clsx(prefixCls, `${prefixCls}-${theme}`, {
    [`${prefixCls}-collapsed`]: !!collapsed,
    [`${prefixCls}-has-trigger`]: collapsible && trigger !== null && !zeroWidthTrigger,
    [`${prefixCls}-below`]: !!below,
    [`${prefixCls}-zero-width`]: Number.parseFloat(siderWidth) === 0
  }, className, hashId, cssVarCls);
  const contextValue = React61.useMemo(() => ({
    siderCollapsed: collapsed
  }), [collapsed]);
  return React61.createElement(SiderContext.Provider, {
    value: contextValue
  }, React61.createElement("aside", {
    className: siderCls,
    ...divProps,
    style: divStyle,
    ref
  }, React61.createElement("div", {
    className: `${prefixCls}-children`
  }, children), collapsible || below && zeroWidthTrigger ? triggerDom : null));
});
if (true) {
  Sider.displayName = "Sider";
}
var Sider_default = Sider;

// node_modules/antd/es/layout/hooks/useHasSider.js
function useHasSider(siders, children, hasSider) {
  if (typeof hasSider === "boolean") {
    return hasSider;
  }
  if (siders.length) {
    return true;
  }
  const childNodes = toArray(children);
  return childNodes.some((node2) => node2.type === Sider_default);
}

// node_modules/antd/es/layout/layout.js
var generator = ({
  suffixCls,
  tagName,
  displayName
}) => {
  return (Component2) => {
    const Adapter = React62.forwardRef((props, ref) => React62.createElement(Component2, {
      ref,
      suffixCls,
      tagName,
      ...props
    }));
    if (true) {
      Adapter.displayName = displayName;
    }
    return Adapter;
  };
};
var Basic = React62.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    suffixCls,
    className,
    tagName: TagName,
    ...others
  } = props;
  const {
    getPrefixCls
  } = React62.useContext(ConfigContext);
  const prefixCls = getPrefixCls("layout", customizePrefixCls);
  const [hashId] = style_default(prefixCls);
  const prefixWithSuffixCls = suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
  return React62.createElement(TagName, {
    className: clsx(customizePrefixCls || prefixWithSuffixCls, className, hashId),
    ref,
    ...others
  });
});
var BasicLayout = React62.forwardRef((props, ref) => {
  const {
    direction
  } = React62.useContext(ConfigContext);
  const [siders, setSiders] = React62.useState([]);
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    hasSider,
    tagName: Tag,
    style: style2,
    ...others
  } = props;
  const passedProps = omit(others, ["suffixCls"]);
  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle
  } = useComponentConfig("layout");
  const prefixCls = getPrefixCls("layout", customizePrefixCls);
  const mergedHasSider = useHasSider(siders, children, hasSider);
  const [hashId, cssVarCls] = style_default(prefixCls);
  const classString = clsx(prefixCls, {
    [`${prefixCls}-has-sider`]: mergedHasSider,
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, contextClassName, className, rootClassName, hashId, cssVarCls);
  const contextValue = React62.useMemo(() => ({
    siderHook: {
      addSider: (id) => {
        setSiders((prev2) => [].concat(_toConsumableArray(prev2), [id]));
      },
      removeSider: (id) => {
        setSiders((prev2) => prev2.filter((currentId) => currentId !== id));
      }
    }
  }), []);
  return React62.createElement(LayoutContext.Provider, {
    value: contextValue
  }, React62.createElement(Tag, {
    ref,
    className: classString,
    style: {
      ...contextStyle,
      ...style2
    },
    ...passedProps
  }, children));
});
var Layout = generator({
  tagName: "div",
  displayName: "Layout"
})(BasicLayout);
var Header = generator({
  suffixCls: "header",
  tagName: "header",
  displayName: "Header"
})(Basic);
var Footer = generator({
  suffixCls: "footer",
  tagName: "footer",
  displayName: "Footer"
})(Basic);
var Content = generator({
  suffixCls: "content",
  tagName: "main",
  displayName: "Content"
})(Basic);
var layout_default = Layout;

export {
  useEvent_default,
  canUseDom,
  useLayoutUpdateEffect,
  useLayoutEffect_default,
  useSafeState,
  useControlledState,
  useMemo,
  fillRef,
  composeRef,
  useComposeRef,
  supportRef,
  supportNodeRef,
  getNodeRef,
  get,
  set,
  mergeWith,
  merge,
  warning,
  noteOnce,
  warning_default,
  omit,
  toArray,
  devUseWarning,
  warning_default2,
  getDOM,
  es_default2 as es_default,
  clsx,
  clsx_default,
  _unsupportedIterableToArray,
  _toConsumableArray,
  raf_default,
  defaultPrefixCls,
  Variants,
  ConfigContext,
  useComponentConfig,
  contains,
  isEqual_default,
  createTheme,
  unit,
  getComputedToken,
  Keyframes_default,
  _typeof2 as _typeof,
  _slicedToArray,
  _defineProperty2 as _defineProperty,
  _objectSpread2,
  _classCallCheck,
  _createClass,
  _assertThisInitialized,
  _setPrototypeOf,
  _inherits,
  _getPrototypeOf,
  _isNativeReflectConstruct,
  _possibleConstructorReturn,
  _createSuper,
  merge2,
  PresetColors,
  getLineHeight,
  version_default2 as version_default,
  defaultPresetColors,
  seed_default,
  FastColor,
  generate,
  presetPrimaryColors,
  gold,
  blue,
  genColorMapToken,
  genControlHeight_default,
  genFontMapToken_default,
  derivative,
  theme_default,
  defaultConfig,
  DesignTokenContext,
  getAlphaColor_default,
  formatToken,
  useToken,
  textEllipsis,
  resetComponent,
  resetIcon,
  clearFix,
  genFocusOutline,
  genFocusStyle,
  operationUnit,
  genStyleHooks,
  genComponentStyleHook,
  genSubStyleComponent,
  genCssVar,
  genPresetColor,
  AntdIcon_default,
  CSSMotionList_default,
  es_default3 as es_default2,
  en_US_default,
  en_US_default4 as en_US_default2,
  en_US_default5 as en_US_default3,
  en_US_default6 as en_US_default4,
  getConfirmLocale,
  useLocale_default,
  validateMessagesContext_default,
  getScrollBarSize,
  getTargetScrollBarSize,
  useId_default,
  es_default as es_default3,
  isVisible_default,
  es_default4,
  isFragment2 as isFragment,
  replaceElement,
  cloneElement5 as cloneElement,
  UniqueProvider_default2 as UniqueProvider_default,
  DisabledContextProvider,
  DisabledContext_default,
  SizeContext_default,
  warnContext,
  globalConfig,
  config_provider_default,
  RightOutlined_default2 as RightOutlined_default,
  LeftOutlined_default2 as LeftOutlined_default,
  SiderContext,
  Sider_default,
  Header,
  Footer,
  Content,
  layout_default
};
//# sourceMappingURL=chunk-D7RGZU4F.js.map
