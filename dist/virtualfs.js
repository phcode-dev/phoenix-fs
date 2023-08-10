(() => {
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
/*global globalObject, virtualfs*/ var $8adf1cfaed2eb5b1$exports = {};
parcelRequire = function(e, r, t, n) {
    var i, o = "function" == typeof parcelRequire && parcelRequire, u = undefined;
    function f(t, n) {
        if (!r[t]) {
            if (!e[t]) {
                var i = "function" == typeof parcelRequire && parcelRequire;
                if (!n && i) return i(t, !0);
                if (o) return o(t, !0);
                if (u && "string" == typeof t) return u(t);
                var c = new Error("Cannot find module '" + t + "'");
                throw c.code = "MODULE_NOT_FOUND", c;
            }
            p.resolve = function(r) {
                return e[t][1][r] || r;
            }, p.cache = {};
            var l = r[t] = new f.Module(t);
            e[t][0].call(l.exports, p, l, l.exports, this);
        }
        return r[t].exports;
        function p(e) {
            return f(p.resolve(e));
        }
    }
    f.isParcelRequire = !0, f.Module = function(e) {
        this.id = e, this.bundle = f, this.exports = {};
    }, f.modules = e, f.cache = r, f.parent = o, f.register = function(r, t) {
        e[r] = [
            function(e, r) {
                r.exports = t;
            },
            {}
        ];
    };
    for(var c = 0; c < t.length; c++)try {
        f(t[c]);
    } catch (e) {
        i || (i = e);
    }
    if (t.length) {
        var l = f(t[t.length - 1]);
        $8adf1cfaed2eb5b1$exports = l;
    }
    if (parcelRequire = f, i) throw i;
    return f;
}({
    "b1ZG": [
        function(require1, module1, exports) {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.promisify = e;
            var r = "__ES6-PROMISIFY--CUSTOM-ARGUMENTS__";
            function e(o) {
                if ("function" != typeof o) throw new TypeError("Argument to promisify must be a function");
                var n = o[r], t = e.Promise || Promise;
                if ("function" != typeof t) throw new Error("No Promise implementation found; do you need a polyfill?");
                return function() {
                    for(var r = this, e = arguments.length, i = Array(e), f = 0; f < e; f++)i[f] = arguments[f];
                    return new t(function(e, t) {
                        i.push(function(r) {
                            if (r) return t(r);
                            for(var o = arguments.length, i = Array(1 < o ? o - 1 : 0), f = 1; f < o; f++)i[f - 1] = arguments[f];
                            if (1 === i.length || !n) return e(i[0]);
                            var u = {};
                            i.forEach(function(r, e) {
                                var o = n[e];
                                o && (u[o] = r);
                            }), e(u);
                        }), o.apply(r, i);
                    });
                };
            }
            e.argumentNames = "__ES6-PROMISIFY--CUSTOM-ARGUMENTS__", e.Promise = void 0;
        },
        {}
    ],
    "pBGv": [
        function(require1, module1, exports) {
            var t, e, n = module1.exports = {};
            function r() {
                throw new Error("setTimeout has not been defined");
            }
            function o() {
                throw new Error("clearTimeout has not been defined");
            }
            function i(e) {
                if (t === setTimeout) return setTimeout(e, 0);
                if ((t === r || !t) && setTimeout) return t = setTimeout, setTimeout(e, 0);
                try {
                    return t(e, 0);
                } catch (n) {
                    try {
                        return t.call(null, e, 0);
                    } catch (n) {
                        return t.call(this, e, 0);
                    }
                }
            }
            function u(t) {
                if (e === clearTimeout) return clearTimeout(t);
                if ((e === o || !e) && clearTimeout) return e = clearTimeout, clearTimeout(t);
                try {
                    return e(t);
                } catch (n) {
                    try {
                        return e.call(null, t);
                    } catch (n) {
                        return e.call(this, t);
                    }
                }
            }
            !function() {
                try {
                    t = "function" == typeof setTimeout ? setTimeout : r;
                } catch (n) {
                    t = r;
                }
                try {
                    e = "function" == typeof clearTimeout ? clearTimeout : o;
                } catch (n) {
                    e = o;
                }
            }();
            var c, s = [], l = !1, a = -1;
            function f() {
                l && c && (l = !1, c.length ? s = c.concat(s) : a = -1, s.length && h());
            }
            function h() {
                if (!l) {
                    var t = i(f);
                    l = !0;
                    for(var e = s.length; e;){
                        for(c = s, s = []; ++a < e;)c && c[a].run();
                        a = -1, e = s.length;
                    }
                    c = null, l = !1, u(t);
                }
            }
            function m(t, e) {
                this.fun = t, this.array = e;
            }
            function p() {}
            n.nextTick = function(t) {
                var e = new Array(arguments.length - 1);
                if (arguments.length > 1) for(var n = 1; n < arguments.length; n++)e[n - 1] = arguments[n];
                s.push(new m(t, e)), 1 !== s.length || l || i(h);
            }, m.prototype.run = function() {
                this.fun.apply(null, this.array);
            }, n.title = "browser", n.env = {}, n.argv = [], n.version = "", n.versions = {}, n.on = p, n.addListener = p, n.once = p, n.off = p, n.removeListener = p, n.removeAllListeners = p, n.emit = p, n.prependListener = p, n.prependOnceListener = p, n.listeners = function(t) {
                return [];
            }, n.binding = function(t) {
                throw new Error("process.binding is not supported");
            }, n.cwd = function() {
                return "/";
            }, n.chdir = function(t) {
                throw new Error("process.chdir is not supported");
            }, n.umask = function() {
                return 0;
            };
        },
        {}
    ],
    "UUq2": [
        function(require1, module1, exports) {
            var process = require1("process");
            var r = require1("process");
            function t(r, t) {
                for(var e = 0, n = r.length - 1; n >= 0; n--){
                    var o = r[n];
                    "." === o ? r.splice(n, 1) : ".." === o ? (r.splice(n, 1), e++) : e && (r.splice(n, 1), e--);
                }
                if (t) for(; e--; e)r.unshift("..");
                return r;
            }
            function e(r) {
                "string" != typeof r && (r += "");
                var t, e = 0, n = -1, o = !0;
                for(t = r.length - 1; t >= 0; --t)if (47 === r.charCodeAt(t)) {
                    if (!o) {
                        e = t + 1;
                        break;
                    }
                } else -1 === n && (o = !1, n = t + 1);
                return -1 === n ? "" : r.slice(e, n);
            }
            function n(r, t) {
                if (r.filter) return r.filter(t);
                for(var e = [], n = 0; n < r.length; n++)t(r[n], n, r) && e.push(r[n]);
                return e;
            }
            exports.resolve = function() {
                for(var e = "", o = !1, s = arguments.length - 1; s >= -1 && !o; s--){
                    var i = s >= 0 ? arguments[s] : r.cwd();
                    if ("string" != typeof i) throw new TypeError("Arguments to path.resolve must be strings");
                    i && (e = i + "/" + e, o = "/" === i.charAt(0));
                }
                return (o ? "/" : "") + (e = t(n(e.split("/"), function(r) {
                    return !!r;
                }), !o).join("/")) || ".";
            }, exports.normalize = function(r) {
                var e = exports.isAbsolute(r), s = "/" === o(r, -1);
                return (r = t(n(r.split("/"), function(r) {
                    return !!r;
                }), !e).join("/")) || e || (r = "."), r && s && (r += "/"), (e ? "/" : "") + r;
            }, exports.isAbsolute = function(r) {
                return "/" === r.charAt(0);
            }, exports.join = function() {
                var r = Array.prototype.slice.call(arguments, 0);
                return exports.normalize(n(r, function(r, t) {
                    if ("string" != typeof r) throw new TypeError("Arguments to path.join must be strings");
                    return r;
                }).join("/"));
            }, exports.relative = function(r, t) {
                function e(r) {
                    for(var t = 0; t < r.length && "" === r[t]; t++);
                    for(var e = r.length - 1; e >= 0 && "" === r[e]; e--);
                    return t > e ? [] : r.slice(t, e - t + 1);
                }
                r = exports.resolve(r).substr(1), t = exports.resolve(t).substr(1);
                for(var n = e(r.split("/")), o = e(t.split("/")), s = Math.min(n.length, o.length), i = s, u = 0; u < s; u++)if (n[u] !== o[u]) {
                    i = u;
                    break;
                }
                var f = [];
                for(u = i; u < n.length; u++)f.push("..");
                return (f = f.concat(o.slice(i))).join("/");
            }, exports.sep = "/", exports.delimiter = ":", exports.dirname = function(r) {
                if ("string" != typeof r && (r += ""), 0 === r.length) return ".";
                for(var t = r.charCodeAt(0), e = 47 === t, n = -1, o = !0, s = r.length - 1; s >= 1; --s)if (47 === (t = r.charCodeAt(s))) {
                    if (!o) {
                        n = s;
                        break;
                    }
                } else o = !1;
                return -1 === n ? e ? "/" : "." : e && 1 === n ? "/" : r.slice(0, n);
            }, exports.basename = function(r, t) {
                var n = e(r);
                return t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)), n;
            }, exports.extname = function(r) {
                "string" != typeof r && (r += "");
                for(var t = -1, e = 0, n = -1, o = !0, s = 0, i = r.length - 1; i >= 0; --i){
                    var u = r.charCodeAt(i);
                    if (47 !== u) -1 === n && (o = !1, n = i + 1), 46 === u ? -1 === t ? t = i : 1 !== s && (s = 1) : -1 !== t && (s = -1);
                    else if (!o) {
                        e = i + 1;
                        break;
                    }
                }
                return -1 === t || -1 === n || 0 === s || 1 === s && t === n - 1 && t === e + 1 ? "" : r.slice(t, n);
            };
            var o = "b" === "ab".substr(-1) ? function(r, t, e) {
                return r.substr(t, e);
            } : function(r, t, e) {
                return t < 0 && (t = r.length + t), r.substr(t, e);
            };
        },
        {
            "process": "pBGv"
        }
    ],
    "UzoP": [
        function(require1, module1, exports) {
            var process = require1("process");
            var r = require1("process");
            r.cwd = function() {
                return "/";
            };
            var e = require1("path"), n = Object.assign({}, e);
            n.basename = function(r, n) {
                var i = e.basename(r, n);
                return "" === i ? "/" : i;
            }, n.normalize = function(r) {
                return "/" === (r = e.normalize(r)) ? r : n.removeTrailing(r);
            }, n.isNull = function(r) {
                return -1 !== ("" + r).indexOf("\x00");
            }, n.addTrailing = function(r) {
                return r.replace(/\/*$/, "/");
            }, n.removeTrailing = function(r) {
                return "" === (r = r.replace(/\/*$/, "")) ? "/" : r;
            }, module1.exports = n;
        },
        {
            "path": "UUq2",
            "process": "pBGv"
        }
    ],
    "iJA9": [
        function(require1, module1, exports) {
            var _ = "READ", E = "WRITE", O = "CREATE", R = "EXCLUSIVE", I = "TRUNCATE", S = "APPEND", T = "CREATE", N = "REPLACE";
            module1.exports = {
                FILE_SYSTEM_NAME: "local",
                FILE_STORE_NAME: "files",
                IDB_RO: "readonly",
                IDB_RW: "readwrite",
                WSQL_VERSION: "1",
                WSQL_SIZE: 5242880,
                WSQL_DESC: "FileSystem Storage",
                NODE_TYPE_FILE: "FILE",
                NODE_TYPE_DIRECTORY: "DIRECTORY",
                NODE_TYPE_SYMBOLIC_LINK: "SYMLINK",
                NODE_TYPE_META: "META",
                DEFAULT_DIR_PERMISSIONS: 493,
                DEFAULT_FILE_PERMISSIONS: 420,
                FULL_READ_WRITE_EXEC_PERMISSIONS: 511,
                READ_WRITE_PERMISSIONS: 438,
                SYMLOOP_MAX: 10,
                BINARY_MIME_TYPE: "application/octet-stream",
                JSON_MIME_TYPE: "application/json",
                ROOT_DIRECTORY_NAME: "/",
                FS_FORMAT: "FORMAT",
                FS_NOCTIME: "NOCTIME",
                FS_NOMTIME: "NOMTIME",
                FS_NODUPEIDCHECK: "FS_NODUPEIDCHECK",
                O_READ: _,
                O_WRITE: E,
                O_CREATE: O,
                O_EXCLUSIVE: R,
                O_TRUNCATE: I,
                O_APPEND: S,
                O_FLAGS: {
                    r: [
                        _
                    ],
                    "r+": [
                        _,
                        E
                    ],
                    w: [
                        E,
                        O,
                        I
                    ],
                    "w+": [
                        E,
                        _,
                        O,
                        I
                    ],
                    wx: [
                        E,
                        O,
                        R,
                        I
                    ],
                    "wx+": [
                        E,
                        _,
                        O,
                        R,
                        I
                    ],
                    a: [
                        E,
                        O,
                        S
                    ],
                    "a+": [
                        E,
                        _,
                        O,
                        S
                    ],
                    ax: [
                        E,
                        O,
                        R,
                        S
                    ],
                    "ax+": [
                        E,
                        _,
                        O,
                        R,
                        S
                    ]
                },
                XATTR_CREATE: T,
                XATTR_REPLACE: N,
                FS_READY: "READY",
                FS_PENDING: "PENDING",
                FS_ERROR: "ERROR",
                SUPER_NODE_ID: "00000000-0000-0000-0000-000000000000",
                STDIN: 0,
                STDOUT: 1,
                STDERR: 2,
                FIRST_DESCRIPTOR: 3,
                ENVIRONMENT: {
                    TMP: "/tmp",
                    PATH: ""
                },
                fsConstants: {
                    O_RDONLY: 0,
                    O_WRONLY: 1,
                    O_RDWR: 2,
                    S_IFMT: 61440,
                    S_IFREG: 32768,
                    S_IFDIR: 16384,
                    S_IFCHR: 8192,
                    S_IFBLK: 24576,
                    S_IFIFO: 4096,
                    S_IFLNK: 40960,
                    S_IFSOCK: 49152,
                    O_CREAT: 512,
                    O_EXCL: 2048,
                    O_NOCTTY: 131072,
                    O_TRUNC: 1024,
                    O_APPEND: 8,
                    O_DIRECTORY: 1048576,
                    O_NOFOLLOW: 256,
                    O_SYNC: 128,
                    O_DSYNC: 4194304,
                    O_SYMLINK: 2097152,
                    O_NONBLOCK: 4,
                    S_IRWXU: 448,
                    S_IRUSR: 256,
                    S_IWUSR: 128,
                    S_IXUSR: 64,
                    S_IRWXG: 56,
                    S_IRGRP: 32,
                    S_IWGRP: 16,
                    S_IXGRP: 8,
                    S_IRWXO: 7,
                    S_IROTH: 4,
                    S_IWOTH: 2,
                    S_IXOTH: 1,
                    F_OK: 0,
                    R_OK: 4,
                    W_OK: 2,
                    X_OK: 1,
                    UV_FS_COPYFILE_EXCL: 1,
                    COPYFILE_EXCL: 1
                }
            };
        },
        {}
    ],
    "yh9p": [
        function(require1, module1, exports) {
            "use strict";
            exports.byteLength = u, exports.toByteArray = i, exports.fromByteArray = d;
            for(var r = [], t = [], e = "undefined" != typeof Uint8Array ? Uint8Array : Array, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, a = n.length; o < a; ++o)r[o] = n[o], t[n.charCodeAt(o)] = o;
            function h(r) {
                var t = r.length;
                if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var e = r.indexOf("=");
                return -1 === e && (e = t), [
                    e,
                    e === t ? 0 : 4 - e % 4
                ];
            }
            function u(r) {
                var t = h(r), e = t[0], n = t[1];
                return 3 * (e + n) / 4 - n;
            }
            function c(r, t, e) {
                return 3 * (t + e) / 4 - e;
            }
            function i(r) {
                var n, o, a = h(r), u = a[0], i = a[1], f = new e(c(r, u, i)), A = 0, d = i > 0 ? u - 4 : u;
                for(o = 0; o < d; o += 4)n = t[r.charCodeAt(o)] << 18 | t[r.charCodeAt(o + 1)] << 12 | t[r.charCodeAt(o + 2)] << 6 | t[r.charCodeAt(o + 3)], f[A++] = n >> 16 & 255, f[A++] = n >> 8 & 255, f[A++] = 255 & n;
                return 2 === i && (n = t[r.charCodeAt(o)] << 2 | t[r.charCodeAt(o + 1)] >> 4, f[A++] = 255 & n), 1 === i && (n = t[r.charCodeAt(o)] << 10 | t[r.charCodeAt(o + 1)] << 4 | t[r.charCodeAt(o + 2)] >> 2, f[A++] = n >> 8 & 255, f[A++] = 255 & n), f;
            }
            function f(t) {
                return r[t >> 18 & 63] + r[t >> 12 & 63] + r[t >> 6 & 63] + r[63 & t];
            }
            function A(r, t, e) {
                for(var n, o = [], a = t; a < e; a += 3)n = (r[a] << 16 & 16711680) + (r[a + 1] << 8 & 65280) + (255 & r[a + 2]), o.push(f(n));
                return o.join("");
            }
            function d(t) {
                for(var e, n = t.length, o = n % 3, a = [], h = 0, u = n - o; h < u; h += 16383)a.push(A(t, h, h + 16383 > u ? u : h + 16383));
                return 1 === o ? (e = t[n - 1], a.push(r[e >> 2] + r[e << 4 & 63] + "==")) : 2 === o && (e = (t[n - 2] << 8) + t[n - 1], a.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "=")), a.join("");
            }
            t["-".charCodeAt(0)] = 62, t["_".charCodeAt(0)] = 63;
        },
        {}
    ],
    "JgNJ": [
        function(require1, module1, exports) {
            exports.read = function(a, o, t, r, h) {
                var M, p, w = 8 * h - r - 1, f = (1 << w) - 1, e = f >> 1, i = -7, N = t ? h - 1 : 0, n = t ? -1 : 1, s = a[o + N];
                for(N += n, M = s & (1 << -i) - 1, s >>= -i, i += w; i > 0; M = 256 * M + a[o + N], N += n, i -= 8);
                for(p = M & (1 << -i) - 1, M >>= -i, i += r; i > 0; p = 256 * p + a[o + N], N += n, i -= 8);
                if (0 === M) M = 1 - e;
                else {
                    if (M === f) return p ? NaN : 1 / 0 * (s ? -1 : 1);
                    p += Math.pow(2, r), M -= e;
                }
                return (s ? -1 : 1) * p * Math.pow(2, M - r);
            }, exports.write = function(a, o, t, r, h, M) {
                var p, w, f, e = 8 * M - h - 1, i = (1 << e) - 1, N = i >> 1, n = 23 === h ? Math.pow(2, -24) - Math.pow(2, -77) : 0, s = r ? 0 : M - 1, u = r ? 1 : -1, l = o < 0 || 0 === o && 1 / o < 0 ? 1 : 0;
                for(o = Math.abs(o), isNaN(o) || o === 1 / 0 ? (w = isNaN(o) ? 1 : 0, p = i) : (p = Math.floor(Math.log(o) / Math.LN2), o * (f = Math.pow(2, -p)) < 1 && (p--, f *= 2), (o += p + N >= 1 ? n / f : n * Math.pow(2, 1 - N)) * f >= 2 && (p++, f /= 2), p + N >= i ? (w = 0, p = i) : p + N >= 1 ? (w = (o * f - 1) * Math.pow(2, h), p += N) : (w = o * Math.pow(2, N - 1) * Math.pow(2, h), p = 0)); h >= 8; a[t + s] = 255 & w, s += u, w /= 256, h -= 8);
                for(p = p << h | w, e += h; e > 0; a[t + s] = 255 & p, s += u, p /= 256, e -= 8);
                a[t + s - u] |= 128 * l;
            };
        },
        {}
    ],
    "REa7": [
        function(require1, module1, exports) {
            var r = {}.toString;
            module1.exports = Array.isArray || function(t) {
                return "[object Array]" == r.call(t);
            };
        },
        {}
    ],
    "dskh": [
        function(require1, module1, exports) {
            var global = arguments[3];
            var t = arguments[3], r = require1("base64-js"), e = require1("ieee754"), n = require1("isarray");
            function i() {
                try {
                    var t = new Uint8Array(1);
                    return t.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42;
                        }
                    }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength;
                } catch (r) {
                    return !1;
                }
            }
            function o() {
                return f.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
            }
            function u(t, r) {
                if (o() < r) throw new RangeError("Invalid typed array length");
                return f.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(r)).__proto__ = f.prototype : (null === t && (t = new f(r)), t.length = r), t;
            }
            function f(t, r, e) {
                if (!(f.TYPED_ARRAY_SUPPORT || this instanceof f)) return new f(t, r, e);
                if ("number" == typeof t) {
                    if ("string" == typeof r) throw new Error("If encoding is specified then the first argument must be a string");
                    return c(this, t);
                }
                return s(this, t, r, e);
            }
            function s(t, r, e, n) {
                if ("number" == typeof r) throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && r instanceof ArrayBuffer ? g(t, r, e, n) : "string" == typeof r ? l(t, r, e) : y(t, r);
            }
            function h(t) {
                if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                if (t < 0) throw new RangeError('"size" argument must not be negative');
            }
            function a(t, r, e, n) {
                return h(r), r <= 0 ? u(t, r) : void 0 !== e ? "string" == typeof n ? u(t, r).fill(e, n) : u(t, r).fill(e) : u(t, r);
            }
            function c(t, r) {
                if (h(r), t = u(t, r < 0 ? 0 : 0 | w(r)), !f.TYPED_ARRAY_SUPPORT) for(var e = 0; e < r; ++e)t[e] = 0;
                return t;
            }
            function l(t, r, e) {
                if ("string" == typeof e && "" !== e || (e = "utf8"), !f.isEncoding(e)) throw new TypeError('"encoding" must be a valid string encoding');
                var n = 0 | v(r, e), i = (t = u(t, n)).write(r, e);
                return i !== n && (t = t.slice(0, i)), t;
            }
            function p(t, r) {
                var e = r.length < 0 ? 0 : 0 | w(r.length);
                t = u(t, e);
                for(var n = 0; n < e; n += 1)t[n] = 255 & r[n];
                return t;
            }
            function g(t, r, e, n) {
                if (r.byteLength, e < 0 || r.byteLength < e) throw new RangeError("'offset' is out of bounds");
                if (r.byteLength < e + (n || 0)) throw new RangeError("'length' is out of bounds");
                return r = void 0 === e && void 0 === n ? new Uint8Array(r) : void 0 === n ? new Uint8Array(r, e) : new Uint8Array(r, e, n), f.TYPED_ARRAY_SUPPORT ? (t = r).__proto__ = f.prototype : t = p(t, r), t;
            }
            function y(t, r) {
                if (f.isBuffer(r)) {
                    var e = 0 | w(r.length);
                    return 0 === (t = u(t, e)).length ? t : (r.copy(t, 0, 0, e), t);
                }
                if (r) {
                    if ("undefined" != typeof ArrayBuffer && r.buffer instanceof ArrayBuffer || "length" in r) return "number" != typeof r.length || W(r.length) ? u(t, 0) : p(t, r);
                    if ("Buffer" === r.type && n(r.data)) return p(t, r.data);
                }
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
            }
            function w(t) {
                if (t >= o()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
                return 0 | t;
            }
            function d(t) {
                return +t != t && (t = 0), f.alloc(+t);
            }
            function v(t, r) {
                if (f.isBuffer(t)) return t.length;
                if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                "string" != typeof t && (t = "" + t);
                var e = t.length;
                if (0 === e) return 0;
                for(var n = !1;;)switch(r){
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return e;
                    case "utf8":
                    case "utf-8":
                    case void 0:
                        return $(t).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * e;
                    case "hex":
                        return e >>> 1;
                    case "base64":
                        return K(t).length;
                    default:
                        if (n) return $(t).length;
                        r = ("" + r).toLowerCase(), n = !0;
                }
            }
            function E(t, r, e) {
                var n = !1;
                if ((void 0 === r || r < 0) && (r = 0), r > this.length) return "";
                if ((void 0 === e || e > this.length) && (e = this.length), e <= 0) return "";
                if ((e >>>= 0) <= (r >>>= 0)) return "";
                for(t || (t = "utf8");;)switch(t){
                    case "hex":
                        return x(this, r, e);
                    case "utf8":
                    case "utf-8":
                        return Y(this, r, e);
                    case "ascii":
                        return L(this, r, e);
                    case "latin1":
                    case "binary":
                        return D(this, r, e);
                    case "base64":
                        return S(this, r, e);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return C(this, r, e);
                    default:
                        if (n) throw new TypeError("Unknown encoding: " + t);
                        t = (t + "").toLowerCase(), n = !0;
                }
            }
            function b(t, r, e) {
                var n = t[r];
                t[r] = t[e], t[e] = n;
            }
            function R(t, r, e, n, i) {
                if (0 === t.length) return -1;
                if ("string" == typeof e ? (n = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, isNaN(e) && (e = i ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
                    if (i) return -1;
                    e = t.length - 1;
                } else if (e < 0) {
                    if (!i) return -1;
                    e = 0;
                }
                if ("string" == typeof r && (r = f.from(r, n)), f.isBuffer(r)) return 0 === r.length ? -1 : _(t, r, e, n, i);
                if ("number" == typeof r) return r &= 255, f.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : _(t, [
                    r
                ], e, n, i);
                throw new TypeError("val must be string, number or Buffer");
            }
            function _(t, r, e, n, i) {
                var o, u = 1, f = t.length, s = r.length;
                if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                    if (t.length < 2 || r.length < 2) return -1;
                    u = 2, f /= 2, s /= 2, e /= 2;
                }
                function h(t, r) {
                    return 1 === u ? t[r] : t.readUInt16BE(r * u);
                }
                if (i) {
                    var a = -1;
                    for(o = e; o < f; o++)if (h(t, o) === h(r, -1 === a ? 0 : o - a)) {
                        if (-1 === a && (a = o), o - a + 1 === s) return a * u;
                    } else -1 !== a && (o -= o - a), a = -1;
                } else for(e + s > f && (e = f - s), o = e; o >= 0; o--){
                    for(var c = !0, l = 0; l < s; l++)if (h(t, o + l) !== h(r, l)) {
                        c = !1;
                        break;
                    }
                    if (c) return o;
                }
                return -1;
            }
            function A(t, r, e, n) {
                e = Number(e) || 0;
                var i = t.length - e;
                n ? (n = Number(n)) > i && (n = i) : n = i;
                var o = r.length;
                if (o % 2 != 0) throw new TypeError("Invalid hex string");
                n > o / 2 && (n = o / 2);
                for(var u = 0; u < n; ++u){
                    var f = parseInt(r.substr(2 * u, 2), 16);
                    if (isNaN(f)) return u;
                    t[e + u] = f;
                }
                return u;
            }
            function m(t, r, e, n) {
                return Q($(r, t.length - e), t, e, n);
            }
            function P(t, r, e, n) {
                return Q(G(r), t, e, n);
            }
            function T(t, r, e, n) {
                return P(t, r, e, n);
            }
            function B(t, r, e, n) {
                return Q(K(r), t, e, n);
            }
            function U(t, r, e, n) {
                return Q(H(r, t.length - e), t, e, n);
            }
            function S(t, e, n) {
                return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n));
            }
            function Y(t, r, e) {
                e = Math.min(t.length, e);
                for(var n = [], i = r; i < e;){
                    var o, u, f, s, h = t[i], a = null, c = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
                    if (i + c <= e) switch(c){
                        case 1:
                            h < 128 && (a = h);
                            break;
                        case 2:
                            128 == (192 & (o = t[i + 1])) && (s = (31 & h) << 6 | 63 & o) > 127 && (a = s);
                            break;
                        case 3:
                            o = t[i + 1], u = t[i + 2], 128 == (192 & o) && 128 == (192 & u) && (s = (15 & h) << 12 | (63 & o) << 6 | 63 & u) > 2047 && (s < 55296 || s > 57343) && (a = s);
                            break;
                        case 4:
                            o = t[i + 1], u = t[i + 2], f = t[i + 3], 128 == (192 & o) && 128 == (192 & u) && 128 == (192 & f) && (s = (15 & h) << 18 | (63 & o) << 12 | (63 & u) << 6 | 63 & f) > 65535 && s < 1114112 && (a = s);
                    }
                    null === a ? (a = 65533, c = 1) : a > 65535 && (a -= 65536, n.push(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), n.push(a), i += c;
                }
                return O(n);
            }
            exports.Buffer = f, exports.SlowBuffer = d, exports.INSPECT_MAX_BYTES = 50, f.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : i(), exports.kMaxLength = o(), f.poolSize = 8192, f._augment = function(t) {
                return t.__proto__ = f.prototype, t;
            }, f.from = function(t, r, e) {
                return s(null, t, r, e);
            }, f.TYPED_ARRAY_SUPPORT && (f.prototype.__proto__ = Uint8Array.prototype, f.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && f[Symbol.species] === f && Object.defineProperty(f, Symbol.species, {
                value: null,
                configurable: !0
            })), f.alloc = function(t, r, e) {
                return a(null, t, r, e);
            }, f.allocUnsafe = function(t) {
                return c(null, t);
            }, f.allocUnsafeSlow = function(t) {
                return c(null, t);
            }, f.isBuffer = function(t) {
                return !(null == t || !t._isBuffer);
            }, f.compare = function(t, r) {
                if (!f.isBuffer(t) || !f.isBuffer(r)) throw new TypeError("Arguments must be Buffers");
                if (t === r) return 0;
                for(var e = t.length, n = r.length, i = 0, o = Math.min(e, n); i < o; ++i)if (t[i] !== r[i]) {
                    e = t[i], n = r[i];
                    break;
                }
                return e < n ? -1 : n < e ? 1 : 0;
            }, f.isEncoding = function(t) {
                switch(String(t).toLowerCase()){
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1;
                }
            }, f.concat = function(t, r) {
                if (!n(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === t.length) return f.alloc(0);
                var e;
                if (void 0 === r) for(r = 0, e = 0; e < t.length; ++e)r += t[e].length;
                var i = f.allocUnsafe(r), o = 0;
                for(e = 0; e < t.length; ++e){
                    var u = t[e];
                    if (!f.isBuffer(u)) throw new TypeError('"list" argument must be an Array of Buffers');
                    u.copy(i, o), o += u.length;
                }
                return i;
            }, f.byteLength = v, f.prototype._isBuffer = !0, f.prototype.swap16 = function() {
                var t = this.length;
                if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for(var r = 0; r < t; r += 2)b(this, r, r + 1);
                return this;
            }, f.prototype.swap32 = function() {
                var t = this.length;
                if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for(var r = 0; r < t; r += 4)b(this, r, r + 3), b(this, r + 1, r + 2);
                return this;
            }, f.prototype.swap64 = function() {
                var t = this.length;
                if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for(var r = 0; r < t; r += 8)b(this, r, r + 7), b(this, r + 1, r + 6), b(this, r + 2, r + 5), b(this, r + 3, r + 4);
                return this;
            }, f.prototype.toString = function() {
                var t = 0 | this.length;
                return 0 === t ? "" : 0 === arguments.length ? Y(this, 0, t) : E.apply(this, arguments);
            }, f.prototype.equals = function(t) {
                if (!f.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                return this === t || 0 === f.compare(this, t);
            }, f.prototype.inspect = function() {
                var t = "", r = exports.INSPECT_MAX_BYTES;
                return this.length > 0 && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (t += " ... ")), "<Buffer " + t + ">";
            }, f.prototype.compare = function(t, r, e, n, i) {
                if (!f.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                if (void 0 === r && (r = 0), void 0 === e && (e = t ? t.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), r < 0 || e > t.length || n < 0 || i > this.length) throw new RangeError("out of range index");
                if (n >= i && r >= e) return 0;
                if (n >= i) return -1;
                if (r >= e) return 1;
                if (this === t) return 0;
                for(var o = (i >>>= 0) - (n >>>= 0), u = (e >>>= 0) - (r >>>= 0), s = Math.min(o, u), h = this.slice(n, i), a = t.slice(r, e), c = 0; c < s; ++c)if (h[c] !== a[c]) {
                    o = h[c], u = a[c];
                    break;
                }
                return o < u ? -1 : u < o ? 1 : 0;
            }, f.prototype.includes = function(t, r, e) {
                return -1 !== this.indexOf(t, r, e);
            }, f.prototype.indexOf = function(t, r, e) {
                return R(this, t, r, e, !0);
            }, f.prototype.lastIndexOf = function(t, r, e) {
                return R(this, t, r, e, !1);
            }, f.prototype.write = function(t, r, e, n) {
                if (void 0 === r) n = "utf8", e = this.length, r = 0;
                else if (void 0 === e && "string" == typeof r) n = r, e = this.length, r = 0;
                else {
                    if (!isFinite(r)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    r |= 0, isFinite(e) ? (e |= 0, void 0 === n && (n = "utf8")) : (n = e, e = void 0);
                }
                var i = this.length - r;
                if ((void 0 === e || e > i) && (e = i), t.length > 0 && (e < 0 || r < 0) || r > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                n || (n = "utf8");
                for(var o = !1;;)switch(n){
                    case "hex":
                        return A(this, t, r, e);
                    case "utf8":
                    case "utf-8":
                        return m(this, t, r, e);
                    case "ascii":
                        return P(this, t, r, e);
                    case "latin1":
                    case "binary":
                        return T(this, t, r, e);
                    case "base64":
                        return B(this, t, r, e);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return U(this, t, r, e);
                    default:
                        if (o) throw new TypeError("Unknown encoding: " + n);
                        n = ("" + n).toLowerCase(), o = !0;
                }
            }, f.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                };
            };
            var I = 4096;
            function O(t) {
                var r = t.length;
                if (r <= I) return String.fromCharCode.apply(String, t);
                for(var e = "", n = 0; n < r;)e += String.fromCharCode.apply(String, t.slice(n, n += I));
                return e;
            }
            function L(t, r, e) {
                var n = "";
                e = Math.min(t.length, e);
                for(var i = r; i < e; ++i)n += String.fromCharCode(127 & t[i]);
                return n;
            }
            function D(t, r, e) {
                var n = "";
                e = Math.min(t.length, e);
                for(var i = r; i < e; ++i)n += String.fromCharCode(t[i]);
                return n;
            }
            function x(t, r, e) {
                var n = t.length;
                (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
                for(var i = "", o = r; o < e; ++o)i += Z(t[o]);
                return i;
            }
            function C(t, r, e) {
                for(var n = t.slice(r, e), i = "", o = 0; o < n.length; o += 2)i += String.fromCharCode(n[o] + 256 * n[o + 1]);
                return i;
            }
            function M(t, r, e) {
                if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                if (t + r > e) throw new RangeError("Trying to access beyond buffer length");
            }
            function k(t, r, e, n, i, o) {
                if (!f.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (r > i || r < o) throw new RangeError('"value" argument is out of bounds');
                if (e + n > t.length) throw new RangeError("Index out of range");
            }
            function N(t, r, e, n) {
                r < 0 && (r = 65535 + r + 1);
                for(var i = 0, o = Math.min(t.length - e, 2); i < o; ++i)t[e + i] = (r & 255 << 8 * (n ? i : 1 - i)) >>> 8 * (n ? i : 1 - i);
            }
            function z(t, r, e, n) {
                r < 0 && (r = 4294967295 + r + 1);
                for(var i = 0, o = Math.min(t.length - e, 4); i < o; ++i)t[e + i] = r >>> 8 * (n ? i : 3 - i) & 255;
            }
            function F(t, r, e, n, i, o) {
                if (e + n > t.length) throw new RangeError("Index out of range");
                if (e < 0) throw new RangeError("Index out of range");
            }
            function j(t, r, n, i, o) {
                return o || F(t, r, n, 4, 3.4028234663852886e38, -340282346638528860000000000000000000000), e.write(t, r, n, i, 23, 4), n + 4;
            }
            function q(t, r, n, i, o) {
                return o || F(t, r, n, 8, 1.7976931348623157e308, -179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000), e.write(t, r, n, i, 52, 8), n + 8;
            }
            f.prototype.slice = function(t, r) {
                var e, n = this.length;
                if ((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), (r = void 0 === r ? n : ~~r) < 0 ? (r += n) < 0 && (r = 0) : r > n && (r = n), r < t && (r = t), f.TYPED_ARRAY_SUPPORT) (e = this.subarray(t, r)).__proto__ = f.prototype;
                else {
                    var i = r - t;
                    e = new f(i, void 0);
                    for(var o = 0; o < i; ++o)e[o] = this[o + t];
                }
                return e;
            }, f.prototype.readUIntLE = function(t, r, e) {
                t |= 0, r |= 0, e || M(t, r, this.length);
                for(var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);)n += this[t + o] * i;
                return n;
            }, f.prototype.readUIntBE = function(t, r, e) {
                t |= 0, r |= 0, e || M(t, r, this.length);
                for(var n = this[t + --r], i = 1; r > 0 && (i *= 256);)n += this[t + --r] * i;
                return n;
            }, f.prototype.readUInt8 = function(t, r) {
                return r || M(t, 1, this.length), this[t];
            }, f.prototype.readUInt16LE = function(t, r) {
                return r || M(t, 2, this.length), this[t] | this[t + 1] << 8;
            }, f.prototype.readUInt16BE = function(t, r) {
                return r || M(t, 2, this.length), this[t] << 8 | this[t + 1];
            }, f.prototype.readUInt32LE = function(t, r) {
                return r || M(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
            }, f.prototype.readUInt32BE = function(t, r) {
                return r || M(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
            }, f.prototype.readIntLE = function(t, r, e) {
                t |= 0, r |= 0, e || M(t, r, this.length);
                for(var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);)n += this[t + o] * i;
                return n >= (i *= 128) && (n -= Math.pow(2, 8 * r)), n;
            }, f.prototype.readIntBE = function(t, r, e) {
                t |= 0, r |= 0, e || M(t, r, this.length);
                for(var n = r, i = 1, o = this[t + --n]; n > 0 && (i *= 256);)o += this[t + --n] * i;
                return o >= (i *= 128) && (o -= Math.pow(2, 8 * r)), o;
            }, f.prototype.readInt8 = function(t, r) {
                return r || M(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
            }, f.prototype.readInt16LE = function(t, r) {
                r || M(t, 2, this.length);
                var e = this[t] | this[t + 1] << 8;
                return 32768 & e ? 4294901760 | e : e;
            }, f.prototype.readInt16BE = function(t, r) {
                r || M(t, 2, this.length);
                var e = this[t + 1] | this[t] << 8;
                return 32768 & e ? 4294901760 | e : e;
            }, f.prototype.readInt32LE = function(t, r) {
                return r || M(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
            }, f.prototype.readInt32BE = function(t, r) {
                return r || M(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
            }, f.prototype.readFloatLE = function(t, r) {
                return r || M(t, 4, this.length), e.read(this, t, !0, 23, 4);
            }, f.prototype.readFloatBE = function(t, r) {
                return r || M(t, 4, this.length), e.read(this, t, !1, 23, 4);
            }, f.prototype.readDoubleLE = function(t, r) {
                return r || M(t, 8, this.length), e.read(this, t, !0, 52, 8);
            }, f.prototype.readDoubleBE = function(t, r) {
                return r || M(t, 8, this.length), e.read(this, t, !1, 52, 8);
            }, f.prototype.writeUIntLE = function(t, r, e, n) {
                (t = +t, r |= 0, e |= 0, n) || k(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
                var i = 1, o = 0;
                for(this[r] = 255 & t; ++o < e && (i *= 256);)this[r + o] = t / i & 255;
                return r + e;
            }, f.prototype.writeUIntBE = function(t, r, e, n) {
                (t = +t, r |= 0, e |= 0, n) || k(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
                var i = e - 1, o = 1;
                for(this[r + i] = 255 & t; --i >= 0 && (o *= 256);)this[r + i] = t / o & 255;
                return r + e;
            }, f.prototype.writeUInt8 = function(t, r, e) {
                return t = +t, r |= 0, e || k(this, t, r, 1, 255, 0), f.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[r] = 255 & t, r + 1;
            }, f.prototype.writeUInt16LE = function(t, r, e) {
                return t = +t, r |= 0, e || k(this, t, r, 2, 65535, 0), f.TYPED_ARRAY_SUPPORT ? (this[r] = 255 & t, this[r + 1] = t >>> 8) : N(this, t, r, !0), r + 2;
            }, f.prototype.writeUInt16BE = function(t, r, e) {
                return t = +t, r |= 0, e || k(this, t, r, 2, 65535, 0), f.TYPED_ARRAY_SUPPORT ? (this[r] = t >>> 8, this[r + 1] = 255 & t) : N(this, t, r, !1), r + 2;
            }, f.prototype.writeUInt32LE = function(t, r, e) {
                return t = +t, r |= 0, e || k(this, t, r, 4, 4294967295, 0), f.TYPED_ARRAY_SUPPORT ? (this[r + 3] = t >>> 24, this[r + 2] = t >>> 16, this[r + 1] = t >>> 8, this[r] = 255 & t) : z(this, t, r, !0), r + 4;
            }, f.prototype.writeUInt32BE = function(t, r, e) {
                return t = +t, r |= 0, e || k(this, t, r, 4, 4294967295, 0), f.TYPED_ARRAY_SUPPORT ? (this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t) : z(this, t, r, !1), r + 4;
            }, f.prototype.writeIntLE = function(t, r, e, n) {
                if (t = +t, r |= 0, !n) {
                    var i = Math.pow(2, 8 * e - 1);
                    k(this, t, r, e, i - 1, -i);
                }
                var o = 0, u = 1, f = 0;
                for(this[r] = 255 & t; ++o < e && (u *= 256);)t < 0 && 0 === f && 0 !== this[r + o - 1] && (f = 1), this[r + o] = (t / u >> 0) - f & 255;
                return r + e;
            }, f.prototype.writeIntBE = function(t, r, e, n) {
                if (t = +t, r |= 0, !n) {
                    var i = Math.pow(2, 8 * e - 1);
                    k(this, t, r, e, i - 1, -i);
                }
                var o = e - 1, u = 1, f = 0;
                for(this[r + o] = 255 & t; --o >= 0 && (u *= 256);)t < 0 && 0 === f && 0 !== this[r + o + 1] && (f = 1), this[r + o] = (t / u >> 0) - f & 255;
                return r + e;
            }, f.prototype.writeInt8 = function(t, r, e) {
                return t = +t, r |= 0, e || k(this, t, r, 1, 127, -128), f.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[r] = 255 & t, r + 1;
            }, f.prototype.writeInt16LE = function(t, r, e) {
                return t = +t, r |= 0, e || k(this, t, r, 2, 32767, -32768), f.TYPED_ARRAY_SUPPORT ? (this[r] = 255 & t, this[r + 1] = t >>> 8) : N(this, t, r, !0), r + 2;
            }, f.prototype.writeInt16BE = function(t, r, e) {
                return t = +t, r |= 0, e || k(this, t, r, 2, 32767, -32768), f.TYPED_ARRAY_SUPPORT ? (this[r] = t >>> 8, this[r + 1] = 255 & t) : N(this, t, r, !1), r + 2;
            }, f.prototype.writeInt32LE = function(t, r, e) {
                return t = +t, r |= 0, e || k(this, t, r, 4, 2147483647, -2147483648), f.TYPED_ARRAY_SUPPORT ? (this[r] = 255 & t, this[r + 1] = t >>> 8, this[r + 2] = t >>> 16, this[r + 3] = t >>> 24) : z(this, t, r, !0), r + 4;
            }, f.prototype.writeInt32BE = function(t, r, e) {
                return t = +t, r |= 0, e || k(this, t, r, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), f.TYPED_ARRAY_SUPPORT ? (this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t) : z(this, t, r, !1), r + 4;
            }, f.prototype.writeFloatLE = function(t, r, e) {
                return j(this, t, r, !0, e);
            }, f.prototype.writeFloatBE = function(t, r, e) {
                return j(this, t, r, !1, e);
            }, f.prototype.writeDoubleLE = function(t, r, e) {
                return q(this, t, r, !0, e);
            }, f.prototype.writeDoubleBE = function(t, r, e) {
                return q(this, t, r, !1, e);
            }, f.prototype.copy = function(t, r, e, n) {
                if (e || (e = 0), n || 0 === n || (n = this.length), r >= t.length && (r = t.length), r || (r = 0), n > 0 && n < e && (n = e), n === e) return 0;
                if (0 === t.length || 0 === this.length) return 0;
                if (r < 0) throw new RangeError("targetStart out of bounds");
                if (e < 0 || e >= this.length) throw new RangeError("sourceStart out of bounds");
                if (n < 0) throw new RangeError("sourceEnd out of bounds");
                n > this.length && (n = this.length), t.length - r < n - e && (n = t.length - r + e);
                var i, o = n - e;
                if (this === t && e < r && r < n) for(i = o - 1; i >= 0; --i)t[i + r] = this[i + e];
                else if (o < 1e3 || !f.TYPED_ARRAY_SUPPORT) for(i = 0; i < o; ++i)t[i + r] = this[i + e];
                else Uint8Array.prototype.set.call(t, this.subarray(e, e + o), r);
                return o;
            }, f.prototype.fill = function(t, r, e, n) {
                if ("string" == typeof t) {
                    if ("string" == typeof r ? (n = r, r = 0, e = this.length) : "string" == typeof e && (n = e, e = this.length), 1 === t.length) {
                        var i = t.charCodeAt(0);
                        i < 256 && (t = i);
                    }
                    if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                    if ("string" == typeof n && !f.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                } else "number" == typeof t && (t &= 255);
                if (r < 0 || this.length < r || this.length < e) throw new RangeError("Out of range index");
                if (e <= r) return this;
                var o;
                if (r >>>= 0, e = void 0 === e ? this.length : e >>> 0, t || (t = 0), "number" == typeof t) for(o = r; o < e; ++o)this[o] = t;
                else {
                    var u = f.isBuffer(t) ? t : $(new f(t, n).toString()), s = u.length;
                    for(o = 0; o < e - r; ++o)this[o + r] = u[o % s];
                }
                return this;
            };
            var V = /[^+\/0-9A-Za-z-_]/g;
            function X(t) {
                if ((t = J(t).replace(V, "")).length < 2) return "";
                for(; t.length % 4 != 0;)t += "=";
                return t;
            }
            function J(t) {
                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
            }
            function Z(t) {
                return t < 16 ? "0" + t.toString(16) : t.toString(16);
            }
            function $(t, r) {
                var e;
                r = r || 1 / 0;
                for(var n = t.length, i = null, o = [], u = 0; u < n; ++u){
                    if ((e = t.charCodeAt(u)) > 55295 && e < 57344) {
                        if (!i) {
                            if (e > 56319) {
                                (r -= 3) > -1 && o.push(239, 191, 189);
                                continue;
                            }
                            if (u + 1 === n) {
                                (r -= 3) > -1 && o.push(239, 191, 189);
                                continue;
                            }
                            i = e;
                            continue;
                        }
                        if (e < 56320) {
                            (r -= 3) > -1 && o.push(239, 191, 189), i = e;
                            continue;
                        }
                        e = 65536 + (i - 55296 << 10 | e - 56320);
                    } else i && (r -= 3) > -1 && o.push(239, 191, 189);
                    if (i = null, e < 128) {
                        if ((r -= 1) < 0) break;
                        o.push(e);
                    } else if (e < 2048) {
                        if ((r -= 2) < 0) break;
                        o.push(e >> 6 | 192, 63 & e | 128);
                    } else if (e < 65536) {
                        if ((r -= 3) < 0) break;
                        o.push(e >> 12 | 224, e >> 6 & 63 | 128, 63 & e | 128);
                    } else {
                        if (!(e < 1114112)) throw new Error("Invalid code point");
                        if ((r -= 4) < 0) break;
                        o.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, 63 & e | 128);
                    }
                }
                return o;
            }
            function G(t) {
                for(var r = [], e = 0; e < t.length; ++e)r.push(255 & t.charCodeAt(e));
                return r;
            }
            function H(t, r) {
                for(var e, n, i, o = [], u = 0; u < t.length && !((r -= 2) < 0); ++u)n = (e = t.charCodeAt(u)) >> 8, i = e % 256, o.push(i), o.push(n);
                return o;
            }
            function K(t) {
                return r.toByteArray(X(t));
            }
            function Q(t, r, e, n) {
                for(var i = 0; i < n && !(i + e >= r.length || i >= t.length); ++i)r[i + e] = t[i];
                return i;
            }
            function W(t) {
                return t != t;
            }
        },
        {
            "base64-js": "yh9p",
            "ieee754": "JgNJ",
            "isarray": "REa7",
            "buffer": "dskh"
        }
    ],
    "QO4x": [
        function(require1, module1, exports) {
            var Buffer = require1("buffer").Buffer;
            var global = arguments[3];
            var t = require1("buffer").Buffer, e = arguments[3], r = require1("../constants.js").FILE_SYSTEM_NAME, n = require1("../constants.js").FILE_STORE_NAME, o = require1("../constants.js").IDB_RW, u = require1("../constants.js").IDB_RO;
            function c(t, e) {
                this.db = t, this.mode = e;
            }
            function i(t) {
                this.name = t || r, this.db = null;
            }
            c.prototype._getObjectStore = function() {
                if (this.objectStore) return this.objectStore;
                var t = this.db.transaction(n, this.mode);
                return this.objectStore = t.objectStore(n), this.objectStore;
            }, c.prototype.clear = function(t) {
                try {
                    var e = this._getObjectStore().clear();
                    e.onsuccess = function() {
                        t();
                    }, e.onerror = function(e) {
                        e.preventDefault(), t(e.error);
                    };
                } catch (r) {
                    t(r);
                }
            }, c.prototype._get = function(t, e) {
                try {
                    var r = this._getObjectStore().get(t);
                    r.onsuccess = function(t) {
                        var r = t.target.result;
                        e(null, r);
                    }, r.onerror = function(t) {
                        t.preventDefault(), e(t.error);
                    };
                } catch (n) {
                    e(n);
                }
            }, c.prototype.getObject = function(t, e) {
                this._get(t, e);
            }, c.prototype.getBuffer = function(e, r) {
                this._get(e, function(e, n) {
                    if (e) return r(e);
                    r(null, t.from(n));
                });
            }, c.prototype._put = function(t, e, r) {
                try {
                    var n = this._getObjectStore().put(e, t);
                    n.onsuccess = function(t) {
                        var e = t.target.result;
                        r(null, e);
                    }, n.onerror = function(t) {
                        t.preventDefault(), r(t.error);
                    };
                } catch (o) {
                    r(o);
                }
            }, c.prototype.putObject = function(t, e, r) {
                this._put(t, e, r);
            }, c.prototype.putBuffer = function(t, e, r) {
                var n = e.buffer;
                this._put(t, n, r);
            }, c.prototype.delete = function(t, e) {
                try {
                    var r = this._getObjectStore().delete(t);
                    r.onsuccess = function(t) {
                        var r = t.target.result;
                        e(null, r);
                    }, r.onerror = function(t) {
                        t.preventDefault(), e(t.error);
                    };
                } catch (n) {
                    e(n);
                }
            }, i.isSupported = function() {
                return !!(e.indexedDB || e.mozIndexedDB || e.webkitIndexedDB || e.msIndexedDB);
            }, i.prototype.open = function(t) {
                var r = this;
                if (r.db) return t();
                try {
                    var o = (e.indexedDB || e.mozIndexedDB || e.webkitIndexedDB || e.msIndexedDB).open(r.name);
                    o.onupgradeneeded = function(t) {
                        var e = t.target.result;
                        e.objectStoreNames.contains(n) && e.deleteObjectStore(n), e.createObjectStore(n);
                    }, o.onsuccess = function(e) {
                        r.db = e.target.result, t();
                    }, o.onerror = function(e) {
                        e.preventDefault(), t(e.error);
                    };
                } catch (u) {
                    t(u);
                }
            }, i.prototype.getReadOnlyContext = function() {
                return new c(this.db, u);
            }, i.prototype.getReadWriteContext = function() {
                return new c(this.db, o);
            }, module1.exports = i;
        },
        {
            "../constants.js": "iJA9",
            "buffer": "dskh"
        }
    ],
    "u4Zs": [
        function(require1, module1, exports) {
            var process = require1("process");
            var define;
            var e, t = require1("process");
            !function() {
                var n = {};
                void 0 !== t && t.nextTick ? (n.nextTick = t.nextTick, "undefined" != typeof setImmediate ? n.setImmediate = function(e) {
                    setImmediate(e);
                } : n.setImmediate = n.nextTick) : "function" == typeof setImmediate ? (n.nextTick = function(e) {
                    setImmediate(e);
                }, n.setImmediate = n.nextTick) : (n.nextTick = function(e) {
                    setTimeout(e, 0);
                }, n.setImmediate = n.nextTick), n.eachSeries = function(e, t, n) {
                    if (n = n || function() {}, !e.length) return n();
                    var i = 0;
                    !function o() {
                        t(e[i], function(t) {
                            t ? (n(t), n = function() {}) : (i += 1) >= e.length ? n() : o();
                        });
                    }();
                }, n.forEachSeries = n.eachSeries, void 0 !== e && e.amd ? e([], function() {
                    return n;
                }) : "undefined" != typeof module1 && module1.exports ? module1.exports = n : root.async = n;
            }();
        },
        {
            "process": "pBGv"
        }
    ],
    "OWym": [
        function(require1, module1, exports) {
            var t = require1("../constants.js").FILE_SYSTEM_NAME, e = require1("../../lib/async.js").setImmediate, o = function() {
                var t = {};
                return function(e) {
                    return Object.prototype.hasOwnProperty.call(t, e) || (t[e] = {}), t[e];
                };
            }();
            function n(t, e) {
                this.readOnly = e, this.objectStore = t;
            }
            function r(e) {
                this.name = e || t;
            }
            n.prototype.clear = function(t) {
                if (this.readOnly) e(function() {
                    t("[MemoryContext] Error: write operation on read only context");
                });
                else {
                    var o = this.objectStore;
                    Object.keys(o).forEach(function(t) {
                        delete o[t];
                    }), e(t);
                }
            }, n.prototype.getObject = n.prototype.getBuffer = function(t, o) {
                var n = this;
                e(function() {
                    o(null, n.objectStore[t]);
                });
            }, n.prototype.putObject = n.prototype.putBuffer = function(t, o, n) {
                this.readOnly ? e(function() {
                    n("[MemoryContext] Error: write operation on read only context");
                }) : (this.objectStore[t] = o, e(n));
            }, n.prototype.delete = function(t, o) {
                this.readOnly ? e(function() {
                    o("[MemoryContext] Error: write operation on read only context");
                }) : (delete this.objectStore[t], e(o));
            }, r.isSupported = function() {
                return !0;
            }, r.prototype.open = function(t) {
                this.db = o(this.name), e(t);
            }, r.prototype.getReadOnlyContext = function() {
                return new n(this.db, !0);
            }, r.prototype.getReadWriteContext = function() {
                return new n(this.db, !1);
            }, module1.exports = r;
        },
        {
            "../constants.js": "iJA9",
            "../../lib/async.js": "u4Zs"
        }
    ],
    "AiW7": [
        function(require1, module1, exports) {
            var e = require1("./indexeddb.js"), r = require1("./memory.js");
            module1.exports = {
                IndexedDB: e,
                Default: e,
                Memory: r
            };
        },
        {
            "./indexeddb.js": "QO4x",
            "./memory.js": "OWym"
        }
    ],
    "p8GN": [
        function(require1, module1, exports) {
            var t = {};
            [
                "3:EACCES:permission denied",
                "9:EBADF:bad file descriptor",
                "10:EBUSY:resource busy or locked",
                "18:EINVAL:invalid argument",
                "27:ENOTDIR:not a directory",
                "28:EISDIR:illegal operation on a directory",
                "34:ENOENT:no such file or directory",
                "47:EEXIST:file already exists",
                "50:EPERM:operation not permitted",
                "51:ELOOP:too many symbolic links encountered",
                "53:ENOTEMPTY:directory not empty",
                "55:EIO:i/o error",
                "1000:ENOTMOUNTED:not mounted",
                "1001:EFILESYSTEMERROR:missing super node, use 'FORMAT' flag to format filesystem.",
                "1002:ENOATTR:attribute does not exist"
            ].forEach(function(e) {
                var o = +(e = e.split(":"))[0], r = e[1], i = e[2];
                function s(t, e) {
                    Error.call(this), this.name = r, this.code = r, this.errno = o, this.message = t || i, e && (this.path = e), this.stack = new Error(this.message).stack;
                }
                s.prototype = Object.create(Error.prototype), s.prototype.constructor = s, s.prototype.toString = function() {
                    var t = this.path ? ", '" + this.path + "'" : "";
                    return this.name + ": " + this.message + t;
                }, t[r] = t[o] = s;
            }), module1.exports = t;
        },
        {}
    ],
    "QMiB": [
        function(require1, module1, exports) {
            "use strict";
            var t = require1("../constants.js").ENVIRONMENT;
            module1.exports = function(n) {
                (n = n || {}).TMP = n.TMP || t.TMP, n.PATH = n.PATH || t.PATH, this.get = function(t) {
                    return n[t];
                }, this.set = function(t, s) {
                    n[t] = s;
                };
            };
        },
        {
            "../constants.js": "iJA9"
        }
    ],
    "bQx9": [
        function(require1, module1, exports) {
            module1.exports = function(t, o) {
                for(var a = [], e = 0; e < t.length; e++){
                    var n = o(t[e], e);
                    r(n) ? a.push.apply(a, n) : a.push(n);
                }
                return a;
            };
            var r = Array.isArray || function(r) {
                return "[object Array]" === Object.prototype.toString.call(r);
            };
        },
        {}
    ],
    "D9yG": [
        function(require1, module1, exports) {
            "use strict";
            function e(e, r, i) {
                e instanceof RegExp && (e = n(e, i)), r instanceof RegExp && (r = n(r, i));
                var o = t(e, r, i);
                return o && {
                    start: o[0],
                    end: o[1],
                    pre: i.slice(0, o[0]),
                    body: i.slice(o[0] + e.length, o[1]),
                    post: i.slice(o[1] + r.length)
                };
            }
            function n(e, n) {
                var t = n.match(e);
                return t ? t[0] : null;
            }
            function t(e, n, t) {
                var r, i, o, f, l, s = t.indexOf(e), c = t.indexOf(n, s + 1), p = s;
                if (s >= 0 && c > 0) {
                    for(r = [], o = t.length; p >= 0 && !l;)p == s ? (r.push(p), s = t.indexOf(e, p + 1)) : 1 == r.length ? l = [
                        r.pop(),
                        c
                    ] : ((i = r.pop()) < o && (o = i, f = c), c = t.indexOf(n, p + 1)), p = s < c && s >= 0 ? s : c;
                    r.length && (l = [
                        o,
                        f
                    ]);
                }
                return l;
            }
            module1.exports = e, e.range = t;
        },
        {}
    ],
    "dwXQ": [
        function(require1, module1, exports) {
            var t = require1("concat-map"), r = require1("balanced-match");
            module1.exports = f;
            var n = "\x00SLASH" + Math.random() + "\x00", e = "\x00OPEN" + Math.random() + "\x00", i = "\x00CLOSE" + Math.random() + "\x00", o = "\x00COMMA" + Math.random() + "\x00", a = "\x00PERIOD" + Math.random() + "\x00";
            function s(t) {
                return parseInt(t, 10) == t ? parseInt(t, 10) : t.charCodeAt(0);
            }
            function p(t) {
                return t.split("\\\\").join(n).split("\\{").join(e).split("\\}").join(i).split("\\,").join(o).split("\\.").join(a);
            }
            function u(t) {
                return t.split(n).join("\\").split(e).join("{").split(i).join("}").split(o).join(",").split(a).join(".");
            }
            function l(t) {
                if (!t) return [
                    ""
                ];
                var n = [], e = r("{", "}", t);
                if (!e) return t.split(",");
                var i = e.pre, o = e.body, a = e.post, s = i.split(",");
                s[s.length - 1] += "{" + o + "}";
                var p = l(a);
                return a.length && (s[s.length - 1] += p.shift(), s.push.apply(s, p)), n.push.apply(n, s), n;
            }
            function f(t) {
                return t ? ("{}" === t.substr(0, 2) && (t = "\\{\\}" + t.substr(2)), m(p(t), !0).map(u)) : [];
            }
            function h(t) {
                return t;
            }
            function d(t) {
                return "{" + t + "}";
            }
            function c(t) {
                return /^-?0\d/.test(t);
            }
            function v(t, r) {
                return t <= r;
            }
            function g(t, r) {
                return t >= r;
            }
            function m(n, e) {
                var o = [], a = r("{", "}", n);
                if (!a || /\$$/.test(a.pre)) return [
                    n
                ];
                var p, u = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(a.body), f = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(a.body), h = u || f, b = a.body.indexOf(",") >= 0;
                if (!h && !b) return a.post.match(/,.*\}/) ? m(n = a.pre + "{" + a.body + i + a.post) : [
                    n
                ];
                if (h) p = a.body.split(/\.\./);
                else if (1 === (p = l(a.body)).length && 1 === (p = m(p[0], !1).map(d)).length) return (M = a.post.length ? m(a.post, !1) : [
                    ""
                ]).map(function(t) {
                    return a.pre + p[0] + t;
                });
                var j, y = a.pre, M = a.post.length ? m(a.post, !1) : [
                    ""
                ];
                if (h) {
                    var A = s(p[0]), C = s(p[1]), O = Math.max(p[0].length, p[1].length), S = 3 == p.length ? Math.abs(s(p[2])) : 1, $ = v;
                    C < A && (S *= -1, $ = g);
                    var x = p.some(c);
                    j = [];
                    for(var E = A; $(E, C); E += S){
                        var I;
                        if (f) "\\" === (I = String.fromCharCode(E)) && (I = "");
                        else if (I = String(E), x) {
                            var q = O - I.length;
                            if (q > 0) {
                                var z = new Array(q + 1).join("0");
                                I = E < 0 ? "-" + z + I.slice(1) : z + I;
                            }
                        }
                        j.push(I);
                    }
                } else j = t(p, function(t) {
                    return m(t, !1);
                });
                for(var L = 0; L < j.length; L++)for(var P = 0; P < M.length; P++){
                    var Z = y + j[L] + M[P];
                    (!e || h || Z) && o.push(Z);
                }
                return o;
            }
        },
        {
            "concat-map": "bQx9",
            "balanced-match": "D9yG"
        }
    ],
    "NtKi": [
        function(require1, module1, exports) {
            module1.exports = g, g.Minimatch = l;
            var t = {
                sep: "/"
            };
            try {
                t = require1("path");
            } catch (O) {}
            var e = g.GLOBSTAR = l.GLOBSTAR = {}, n = require1("brace-expansion"), r = {
                "!": {
                    open: "(?:(?!(?:",
                    close: "))[^/]*?)"
                },
                "?": {
                    open: "(?:",
                    close: ")?"
                },
                "+": {
                    open: "(?:",
                    close: ")+"
                },
                "*": {
                    open: "(?:",
                    close: ")*"
                },
                "@": {
                    open: "(?:",
                    close: ")"
                }
            }, i = "[^/]", s = i + "*?", a = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?", o = "(?:(?!(?:\\/|^)\\.).)*?", h = c("().*{}+?[]^$\\!");
            function c(t) {
                return t.split("").reduce(function(t, e) {
                    return t[e] = !0, t;
                }, {});
            }
            var u = /\/+/;
            function p(t, e) {
                return e = e || {}, function(n, r, i) {
                    return g(n, t, e);
                };
            }
            function f(t, e) {
                t = t || {}, e = e || {};
                var n = {};
                return Object.keys(e).forEach(function(t) {
                    n[t] = e[t];
                }), Object.keys(t).forEach(function(e) {
                    n[e] = t[e];
                }), n;
            }
            function g(t, e, n) {
                if ("string" != typeof e) throw new TypeError("glob pattern string required");
                return n || (n = {}), !(!n.nocomment && "#" === e.charAt(0)) && ("" === e.trim() ? "" === t : new l(e, n).match(t));
            }
            function l(e, n) {
                if (!(this instanceof l)) return new l(e, n);
                if ("string" != typeof e) throw new TypeError("glob pattern string required");
                n || (n = {}), e = e.trim(), "/" !== t.sep && (e = e.split(t.sep).join("/")), this.options = n, this.set = [], this.pattern = e, this.regexp = null, this.negate = !1, this.comment = !1, this.empty = !1, this.make();
            }
            function d() {
                if (!this._made) {
                    var t = this.pattern, e = this.options;
                    if (e.nocomment || "#" !== t.charAt(0)) {
                        if (t) {
                            this.parseNegate();
                            var n = this.globSet = this.braceExpand();
                            e.debug && (this.debug = console.error), this.debug(this.pattern, n), n = this.globParts = n.map(function(t) {
                                return t.split(u);
                            }), this.debug(this.pattern, n), n = n.map(function(t, e, n) {
                                return t.map(this.parse, this);
                            }, this), this.debug(this.pattern, n), n = n.filter(function(t) {
                                return -1 === t.indexOf(!1);
                            }), this.debug(this.pattern, n), this.set = n;
                        } else this.empty = !0;
                    } else this.comment = !0;
                }
            }
            function b() {
                var t = this.pattern, e = !1, n = 0;
                if (!this.options.nonegate) {
                    for(var r = 0, i = t.length; r < i && "!" === t.charAt(r); r++)e = !e, n++;
                    n && (this.pattern = t.substr(n)), this.negate = e;
                }
            }
            function m(t, e) {
                if (e || (e = this instanceof l ? this.options : {}), void 0 === (t = void 0 === t ? this.pattern : t)) throw new TypeError("undefined pattern");
                return e.nobrace || !t.match(/\{.*\}/) ? [
                    t
                ] : n(t);
            }
            g.filter = p, g.defaults = function(t) {
                if (!t || !Object.keys(t).length) return g;
                var e = g, n = function(n, r, i) {
                    return e.minimatch(n, r, f(t, i));
                };
                return n.Minimatch = function(n, r) {
                    return new e.Minimatch(n, f(t, r));
                }, n;
            }, l.defaults = function(t) {
                return t && Object.keys(t).length ? g.defaults(t).Minimatch : l;
            }, l.prototype.debug = function() {}, l.prototype.make = d, l.prototype.parseNegate = b, g.braceExpand = function(t, e) {
                return m(t, e);
            }, l.prototype.braceExpand = m, l.prototype.parse = y;
            var v = {};
            function y(t, n) {
                if (t.length > 65536) throw new TypeError("pattern is too long");
                var a = this.options;
                if (!a.noglobstar && "**" === t) return e;
                if ("" === t) return "";
                var o, c = "", u = !!a.nocase, p = !1, f = [], g = [], l = !1, d = -1, b = -1, m = "." === t.charAt(0) ? "" : a.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)", y = this;
                function w() {
                    if (o) {
                        switch(o){
                            case "*":
                                c += s, u = !0;
                                break;
                            case "?":
                                c += i, u = !0;
                                break;
                            default:
                                c += "\\" + o;
                        }
                        y.debug("clearStateChar %j %j", o, c), o = !1;
                    }
                }
                for(var x, j = 0, k = t.length; j < k && (x = t.charAt(j)); j++)if (this.debug("%s	%s %s %j", t, j, c, x), p && h[x]) c += "\\" + x, p = !1;
                else switch(x){
                    case "/":
                        return !1;
                    case "\\":
                        w(), p = !0;
                        continue;
                    case "?":
                    case "*":
                    case "+":
                    case "@":
                    case "!":
                        if (this.debug("%s	%s %s %j <-- stateChar", t, j, c, x), l) {
                            this.debug("  in class"), "!" === x && j === b + 1 && (x = "^"), c += x;
                            continue;
                        }
                        y.debug("call clearStateChar %j", o), w(), o = x, a.noext && w();
                        continue;
                    case "(":
                        if (l) {
                            c += "(";
                            continue;
                        }
                        if (!o) {
                            c += "\\(";
                            continue;
                        }
                        f.push({
                            type: o,
                            start: j - 1,
                            reStart: c.length,
                            open: r[o].open,
                            close: r[o].close
                        }), c += "!" === o ? "(?:(?!(?:" : "(?:", this.debug("plType %j %j", o, c), o = !1;
                        continue;
                    case ")":
                        if (l || !f.length) {
                            c += "\\)";
                            continue;
                        }
                        w(), u = !0;
                        var A = f.pop();
                        c += A.close, "!" === A.type && g.push(A), A.reEnd = c.length;
                        continue;
                    case "|":
                        if (l || !f.length || p) {
                            c += "\\|", p = !1;
                            continue;
                        }
                        w(), c += "|";
                        continue;
                    case "[":
                        if (w(), l) {
                            c += "\\" + x;
                            continue;
                        }
                        l = !0, b = j, d = c.length, c += x;
                        continue;
                    case "]":
                        if (j === b + 1 || !l) {
                            c += "\\" + x, p = !1;
                            continue;
                        }
                        if (l) {
                            var S = t.substring(b + 1, j);
                            try {
                                RegExp("[" + S + "]");
                            } catch (O) {
                                var $ = this.parse(S, v);
                                c = c.substr(0, d) + "\\[" + $[0] + "\\]", u = u || $[1], l = !1;
                                continue;
                            }
                        }
                        u = !0, l = !1, c += x;
                        continue;
                    default:
                        w(), p ? p = !1 : !h[x] || "^" === x && l || (c += "\\"), c += x;
                }
                for(l && (S = t.substr(b + 1), $ = this.parse(S, v), c = c.substr(0, d) + "\\[" + $[0], u = u || $[1]), A = f.pop(); A; A = f.pop()){
                    var R = c.slice(A.reStart + A.open.length);
                    this.debug("setting tail", c, A), R = R.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(t, e, n) {
                        return n || (n = "\\"), e + e + n + "|";
                    }), this.debug("tail=%j\n   %s", R, R, A, c);
                    var T = "*" === A.type ? s : "?" === A.type ? i : "\\" + A.type;
                    u = !0, c = c.slice(0, A.reStart) + T + "\\(" + R;
                }
                w(), p && (c += "\\\\");
                var C = !1;
                switch(c.charAt(0)){
                    case ".":
                    case "[":
                    case "(":
                        C = !0;
                }
                for(var L = g.length - 1; L > -1; L--){
                    var q = g[L], B = c.slice(0, q.reStart), M = c.slice(q.reStart, q.reEnd - 8), N = c.slice(q.reEnd - 8, q.reEnd), _ = c.slice(q.reEnd);
                    N += _;
                    var G = B.split("(").length - 1, P = _;
                    for(j = 0; j < G; j++)P = P.replace(/\)[+*?]?/, "");
                    var z = "";
                    "" === (_ = P) && n !== v && (z = "$"), c = B + M + _ + z + N;
                }
                if ("" !== c && u && (c = "(?=.)" + c), C && (c = m + c), n === v) return [
                    c,
                    u
                ];
                if (!u) return E(t);
                var D = a.nocase ? "i" : "";
                try {
                    var F = new RegExp("^" + c + "$", D);
                } catch (O) {
                    return new RegExp("$.");
                }
                return F._glob = t, F._src = c, F;
            }
            function w() {
                if (this.regexp || !1 === this.regexp) return this.regexp;
                var t = this.set;
                if (!t.length) return this.regexp = !1, this.regexp;
                var n = this.options, r = n.noglobstar ? s : n.dot ? a : o, i = n.nocase ? "i" : "", h = t.map(function(t) {
                    return t.map(function(t) {
                        return t === e ? r : "string" == typeof t ? j(t) : t._src;
                    }).join("\\/");
                }).join("|");
                h = "^(?:" + h + ")$", this.negate && (h = "^(?!" + h + ").*$");
                try {
                    this.regexp = new RegExp(h, i);
                } catch (c) {
                    this.regexp = !1;
                }
                return this.regexp;
            }
            function x(e, n) {
                if (this.debug("match", e, this.pattern), this.comment) return !1;
                if (this.empty) return "" === e;
                if ("/" === e && n) return !0;
                var r = this.options;
                "/" !== t.sep && (e = e.split(t.sep).join("/")), e = e.split(u), this.debug(this.pattern, "split", e);
                var i, s, a = this.set;
                for(this.debug(this.pattern, "set", a), s = e.length - 1; s >= 0 && !(i = e[s]); s--);
                for(s = 0; s < a.length; s++){
                    var o = a[s], h = e;
                    if (r.matchBase && 1 === o.length && (h = [
                        i
                    ]), this.matchOne(h, o, n)) return !!r.flipNegate || !this.negate;
                }
                return !r.flipNegate && this.negate;
            }
            function E(t) {
                return t.replace(/\\(.)/g, "$1");
            }
            function j(t) {
                return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            }
            g.makeRe = function(t, e) {
                return new l(t, e || {}).makeRe();
            }, l.prototype.makeRe = w, g.match = function(t, e, n) {
                var r = new l(e, n = n || {});
                return t = t.filter(function(t) {
                    return r.match(t);
                }), r.options.nonull && !t.length && t.push(e), t;
            }, l.prototype.match = x, l.prototype.matchOne = function(t, n, r) {
                var i = this.options;
                this.debug("matchOne", {
                    this: this,
                    file: t,
                    pattern: n
                }), this.debug("matchOne", t.length, n.length);
                for(var s = 0, a = 0, o = t.length, h = n.length; s < o && a < h; s++, a++){
                    this.debug("matchOne loop");
                    var c, u = n[a], p = t[s];
                    if (this.debug(n, u, p), !1 === u) return !1;
                    if (u === e) {
                        this.debug("GLOBSTAR", [
                            n,
                            u,
                            p
                        ]);
                        var f = s, g = a + 1;
                        if (g === h) {
                            for(this.debug("** at the end"); s < o; s++)if ("." === t[s] || ".." === t[s] || !i.dot && "." === t[s].charAt(0)) return !1;
                            return !0;
                        }
                        for(; f < o;){
                            var l = t[f];
                            if (this.debug("\nglobstar while", t, f, n, g, l), this.matchOne(t.slice(f), n.slice(g), r)) return this.debug("globstar found match!", f, o, l), !0;
                            if ("." === l || ".." === l || !i.dot && "." === l.charAt(0)) {
                                this.debug("dot detected!", t, f, n, g);
                                break;
                            }
                            this.debug("globstar swallow a segment, and continue"), f++;
                        }
                        return !(!r || (this.debug("\n>>> no match, partial?", t, f, n, g), f !== o));
                    }
                    if ("string" == typeof u ? (c = i.nocase ? p.toLowerCase() === u.toLowerCase() : p === u, this.debug("string match", u, p, c)) : (c = p.match(u), this.debug("pattern match", u, p, c)), !c) return !1;
                }
                if (s === o && a === h) return !0;
                if (s === o) return r;
                if (a === h) return s === o - 1 && "" === t[s];
                throw new Error("wtf?");
            };
        },
        {
            "path": "UUq2",
            "brace-expansion": "dwXQ"
        }
    ],
    "D1Ra": [
        function(require1, module1, exports) {
            var n = require1("es6-promisify"), t = n.promisify, e = require1("../path.js"), i = require1("../errors.js"), r = require1("./environment.js"), o = require1("../../lib/async.js"), u = require1("minimatch");
            function c(n, o) {
                var u = this, c = new r((o = o || {}).env), f = "/";
                Object.defineProperty(this, "fs", {
                    get: function() {
                        return n;
                    },
                    enumerable: !0
                }), Object.defineProperty(this, "env", {
                    get: function() {
                        return c;
                    },
                    enumerable: !0
                }), this.cd = function(t, r) {
                    t = e.resolve(f, t), n.stat(t, function(n, e) {
                        n ? r(new i.ENOTDIR(null, t)) : "DIRECTORY" === e.type ? (f = t, r()) : r(new i.ENOTDIR(null, t));
                    });
                }, this.pwd = function() {
                    return f;
                }, this.promises = {}, [
                    "cd",
                    "exec",
                    "touch",
                    "cat",
                    "ls",
                    "rm",
                    "tempDir",
                    "mkdirp",
                    "find"
                ].forEach(function(n) {
                    u.promises[n] = t(u[n].bind(u));
                });
            }
            c.prototype.exec = function(n, t, i) {
                var r = this.fs;
                "function" == typeof t && (i = t, t = []), t = t || [], i = i || function() {}, n = e.resolve(this.pwd(), n), r.readFile(n, "utf8", function(n, e) {
                    if (n) i(n);
                    else try {
                        new Function("fs", "args", "callback", e)(r, t, i);
                    } catch (o) {
                        i(o);
                    }
                });
            }, c.prototype.touch = function(n, t, i) {
                var r = this.fs;
                "function" == typeof t && (i = t, t = {}), t = t || {}, i = i || function() {}, n = e.resolve(this.pwd(), n), r.stat(n, function(e) {
                    e ? !0 === t.updateOnly ? i() : function(n) {
                        r.writeFile(n, "", i);
                    }(n) : function(n) {
                        var e = Date.now(), o = t.date || e, u = t.date || e;
                        r.utimes(n, o, u, i);
                    }(n);
                });
            }, c.prototype.cat = function(n, t) {
                var r = this, u = r.fs, c = "";
                t = t || function() {}, n ? (n = "string" == typeof n ? [
                    n
                ] : n, o.eachSeries(n, function(n, t) {
                    var i = e.resolve(r.pwd(), n);
                    u.readFile(i, "utf8", function(n, e) {
                        n ? t(n) : (c += e + "\n", t());
                    });
                }, function(n) {
                    n ? t(n) : t(null, c.replace(/\n$/, ""));
                })) : t(new i.EINVAL("Missing files argument"));
            }, c.prototype.ls = function(n, t, r) {
                var u = this, c = u.fs;
                "function" == typeof t && (r = t, t = {}), t = t || {}, r = r || function() {}, n ? function n(i, r) {
                    var f = e.resolve(u.pwd(), i), s = [];
                    c.readdir(f, function(i, u) {
                        i ? r(i) : o.eachSeries(u, function(i, r) {
                            i = e.join(f, i), c.stat(i, function(i, o) {
                                if (i) r(i);
                                else {
                                    var u = o;
                                    t.recursive && "DIRECTORY" === o.type ? n(e.join(f, u.name), function(n, t) {
                                        n ? r(n) : (u.contents = t, s.push(u), r());
                                    }) : (s.push(u), r());
                                }
                            });
                        }, function(n) {
                            r(n, s);
                        });
                    });
                }(n, r) : r(new i.EINVAL("Missing dir argument"));
            }, c.prototype.rm = function(n, t, r) {
                var u = this, c = u.fs;
                "function" == typeof t && (r = t, t = {}), t = t || {}, r = r || function() {}, n ? function n(r, f) {
                    r = e.resolve(u.pwd(), r), c.stat(r, function(u, s) {
                        u ? f(u) : "FILE" !== s.type ? c.readdir(r, function(u, s) {
                            u ? f(u) : 0 !== s.length ? t.recursive ? (s = s.map(function(n) {
                                return e.join(r, n);
                            }), o.eachSeries(s, n, function(n) {
                                n ? f(n) : c.rmdir(r, f);
                            })) : f(new i.ENOTEMPTY(null, r)) : c.rmdir(r, f);
                        }) : c.unlink(r, f);
                    });
                }(n, r) : r(new i.EINVAL("Missing path argument"));
            }, c.prototype.tempDir = function(n) {
                var t = this.fs, e = this.env.get("TMP");
                n = n || function() {}, t.mkdir(e, function() {
                    n(null, e);
                });
            }, c.prototype.mkdirp = function(n, t) {
                var r = this.fs;
                t = t || function() {}, n ? "/" !== (n = e.resolve(this.pwd(), n)) ? function n(t, o) {
                    r.stat(t, function(u, c) {
                        if (c) {
                            if (c.isDirectory()) return void o();
                            if (c.isFile()) return void o(new i.ENOTDIR(null, t));
                        } else {
                            if (u && "ENOENT" !== u.code) return void o(u);
                            var f = e.dirname(t);
                            "/" === f ? r.mkdir(t, function(n) {
                                n && "EEXIST" !== n.code ? o(n) : o();
                            }) : n(f, function(n) {
                                if (n) return o(n);
                                r.mkdir(t, function(n) {
                                    n && "EEXIST" !== n.code ? o(n) : o();
                                });
                            });
                        }
                    });
                }(n, t) : t() : t(new i.EINVAL("Missing path argument"));
            }, c.prototype.find = function(n, t, r) {
                var c = this, f = c.fs;
                "function" == typeof t && (r = t, t = {}), r = r || function() {};
                var s = (t = t || {}).exec || function(n, t) {
                    t();
                }, a = [];
                function p(n, i) {
                    var r = e.removeTrailing(n);
                    !t.regex || t.regex.test(r) ? t.name && !u(e.basename(r), t.name) || t.path && !u(e.dirname(r), t.path) ? i() : function(n, t) {
                        s(n, function(e) {
                            e ? t(e) : (a.push(n), t());
                        });
                    }(n, i) : i();
                }
                function d(n, t) {
                    n = e.resolve(c.pwd(), n), f.readdir(n, function(i, r) {
                        i ? "ENOTDIR" === i.code ? p(n, t) : t(i) : p(e.addTrailing(n), function(i) {
                            i ? t(i) : (r = r.map(function(t) {
                                return e.join(n, t);
                            }), o.eachSeries(r, d, function(n) {
                                t(n, a);
                            }));
                        });
                    });
                }
                n ? f.stat(n, function(t, e) {
                    t ? r(t) : e.isDirectory() ? d(n, r) : r(new i.ENOTDIR(null, n));
                }) : r(new i.EINVAL("Missing path argument"));
            }, module1.exports = c;
        },
        {
            "es6-promisify": "b1ZG",
            "../path.js": "UzoP",
            "../errors.js": "p8GN",
            "./environment.js": "QMiB",
            "../../lib/async.js": "u4Zs",
            "minimatch": "NtKi"
        }
    ],
    "J4Qg": [
        function(require1, module1, exports) {
            function t(t, r) {
                for(var o = r.length - 1; o >= 0; o--)r[o] === t && r.splice(o, 1);
                return r;
            }
            var r = function() {};
            r.createInterface = function(r) {
                var o = {
                    on: function(t, o) {
                        void 0 === this[r] && (this[r] = {}), this[r].hasOwnProperty(t) || (this[r][t] = []), this[r][t].push(o);
                    },
                    off: function(o, e) {
                        void 0 !== this[r] && this[r].hasOwnProperty(o) && t(e, this[r][o]);
                    },
                    trigger: function(t) {
                        if (void 0 !== this[r] && this[r].hasOwnProperty(t)) for(var o = Array.prototype.slice.call(arguments, 1), e = 0; e < this[r][t].length; e++)this[r][t][e].apply(this[r][t][e], o);
                    },
                    removeAllListeners: function(t) {
                        if (void 0 !== this[r]) {
                            var o = this;
                            o[r][t].forEach(function(r) {
                                o.off(t, r);
                            });
                        }
                    }
                };
                return o;
            };
            var o = r.createInterface("_handlers");
            r.prototype._on = o.on, r.prototype._off = o.off, r.prototype._trigger = o.trigger;
            var e = r.createInterface("handlers");
            r.prototype.on = function() {
                e.on.apply(this, arguments), Array.prototype.unshift.call(arguments, "on"), this._trigger.apply(this, arguments);
            }, r.prototype.off = e.off, r.prototype.trigger = e.trigger, r.prototype.removeAllListeners = e.removeAllListeners, module1.exports = r;
        },
        {}
    ],
    "zBMa": [
        function(require1, module1, exports) {
            function x(x) {
                return x.replace(/[xy]/g, function(x) {
                    var n = 16 * Math.random() | 0;
                    return ("x" === x ? n : 3 & n | 8).toString(16);
                });
            }
            function n() {
                return x("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").toUpperCase();
            }
            function r(n) {
                return x("x".repeat(n = n || 6));
            }
            function t() {}
            module1.exports = {
                guid: n,
                nop: t,
                randomChars: r
            };
        },
        {}
    ],
    "u7Jv": [
        function(require1, module1, exports) {
            var global = arguments[3];
            var t = arguments[3];
            function e(t) {
                return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t;
                } : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                })(t);
            }
            var n = require1("./eventemitter.js"), o = require1("../src/shared.js").guid;
            function r(t, e) {
                var n = 0;
                return function() {
                    var o = Date.now();
                    o - n > t && (n = o, e.apply(this, arguments));
                };
            }
            function i(t, n) {
                if (void 0 !== t && t || (t = {}), "object" === e(n)) for(var o in n)n.hasOwnProperty(o) && (t[o] = n[o]);
                return t;
            }
            var a = function(t) {
                return void 0 === t || void 0 === t.localStorage ? {
                    getItem: function() {},
                    setItem: function() {},
                    removeItem: function() {}
                } : t.localStorage;
            }(t);
            function s() {
                var e = this, n = Date.now();
                this.origin = o(), this.lastMessage = n, this.receivedIDs = {}, this.previousValues = {};
                var r = function() {
                    e._onStorageEvent.apply(e, arguments);
                };
                "undefined" != typeof document && (document.attachEvent ? document.attachEvent("onstorage", r) : t.addEventListener("storage", r, !1));
            }
            s.prototype._transaction = function(t) {
                var e = 1e3, n = 20, o = this, r = !1, i = !1, s = null;
                function c() {
                    if (!r) {
                        var u = Date.now(), f = 0 | a.getItem(p);
                        if (f && u - f < e) return i || (o._on("storage", c), i = !0), void (s = setTimeout(c, n));
                        r = !0, a.setItem(p, u), t(), function() {
                            i && o._off("storage", c);
                            s && clearTimeout(s);
                            a.removeItem(p);
                        }();
                    }
                }
                c();
            }, s.prototype._cleanup_emit = r(100, function() {
                this._transaction(function() {
                    var t, e = Date.now() - f, n = 0;
                    try {
                        t = JSON.parse(a.getItem(c) || "[]");
                    } catch (r) {
                        t = [];
                    }
                    for(var o = t.length - 1; o >= 0; o--)t[o].timestamp < e && (t.splice(o, 1), n++);
                    n > 0 && a.setItem(c, JSON.stringify(t));
                });
            }), s.prototype._cleanup_once = r(100, function() {
                var t = this;
                t._transaction(function() {
                    Date.now();
                    var e, n, o = 0;
                    try {
                        n = JSON.parse(a.getItem(u) || "{}");
                    } catch (r) {
                        n = {};
                    }
                    for(e in n)t._once_expired(e, n) && (delete n[e], o++);
                    o > 0 && a.setItem(u, JSON.stringify(n));
                });
            }), s.prototype._once_expired = function(t, n) {
                if (!n) return !0;
                if (!n.hasOwnProperty(t)) return !0;
                if ("object" !== e(n[t])) return !0;
                var o = n[t].ttl || m, r = Date.now();
                return n[t].timestamp < r - o;
            }, s.prototype._localStorageChanged = function(t, e) {
                if (t && t.key) return t.key === e;
                var n = a.getItem(e);
                return n !== this.previousValues[e] && (this.previousValues[e] = n, !0);
            }, s.prototype._onStorageEvent = function(e) {
                e = e || t.event;
                var n = this;
                this._localStorageChanged(e, c) && this._transaction(function() {
                    var t, e = Date.now(), o = a.getItem(c);
                    try {
                        t = JSON.parse(o || "[]");
                    } catch (i) {
                        t = [];
                    }
                    for(var r = 0; r < t.length; r++)if (t[r].origin !== n.origin && !(t[r].timestamp < n.lastMessage)) {
                        if (t[r].id) {
                            if (n.receivedIDs.hasOwnProperty(t[r].id)) continue;
                            n.receivedIDs[t[r].id] = !0;
                        }
                        n.trigger(t[r].name, t[r].payload);
                    }
                    n.lastMessage = e;
                }), this._trigger("storage", e);
            }, s.prototype._emit = function(t, e, n) {
                if ((n = "string" == typeof n || "number" == typeof n ? String(n) : null) && n.length) {
                    if (this.receivedIDs.hasOwnProperty(n)) return;
                    this.receivedIDs[n] = !0;
                }
                var o = {
                    id: n,
                    name: t,
                    origin: this.origin,
                    timestamp: Date.now(),
                    payload: e
                }, r = this;
                this._transaction(function() {
                    var n = a.getItem(c) || "[]", i = "[]" === n ? "" : ",";
                    n = [
                        n.substring(0, n.length - 1),
                        i,
                        JSON.stringify(o),
                        "]"
                    ].join(""), a.setItem(c, n), r.trigger(t, e), setTimeout(function() {
                        r._cleanup_emit();
                    }, 50);
                });
            }, s.prototype.emit = function(t, e) {
                this._emit.apply(this, arguments), this._trigger("emit", t, e);
            }, s.prototype.once = function(t, e, n) {
                if (s.supported) {
                    var o = this;
                    this._transaction(function() {
                        var r;
                        try {
                            r = JSON.parse(a.getItem(u) || "{}");
                        } catch (i) {
                            r = {};
                        }
                        o._once_expired(t, r) && (r[t] = {}, r[t].timestamp = Date.now(), "number" == typeof n && (r[t].ttl = 1e3 * n), a.setItem(u, JSON.stringify(r)), e(), setTimeout(function() {
                            o._cleanup_once();
                        }, 50));
                    });
                }
            }, i(s.prototype, n.prototype), s.supported = void 0 !== a;
            var c = "intercom", u = "intercom_once", p = "intercom_lock", f = 5e4, m = 36e5;
            s.destroy = function() {
                a.removeItem(p), a.removeItem(c), a.removeItem(u);
            }, s.getInstance = function() {
                var t;
                return function() {
                    return t || (t = new s), t;
                };
            }(), module1.exports = s;
        },
        {
            "./eventemitter.js": "J4Qg",
            "../src/shared.js": "zBMa"
        }
    ],
    "VLEe": [
        function(require1, module1, exports) {
            var e = require1("../lib/eventemitter.js"), t = require1("./path.js"), n = require1("../lib/intercom.js");
            function r() {
                e.call(this);
                var r, i, o = this, s = !1;
                function c(e) {
                    (i === e || s && 0 === e.indexOf(r)) && o.trigger("change", "change", e);
                }
                o.start = function(e, o, a) {
                    if (!i) {
                        if (t.isNull(e)) throw new Error("Path must be a string without null bytes.");
                        i = t.normalize(e), (s = !0 === a) && (r = "/" === i ? "/" : i + "/"), n.getInstance().on("change", c);
                    }
                }, o.close = function() {
                    n.getInstance().off("change", c), o.removeAllListeners("change");
                };
            }
            r.prototype = new e, r.prototype.constructor = r, module1.exports = r;
        },
        {
            "../lib/eventemitter.js": "J4Qg",
            "./path.js": "UzoP",
            "../lib/intercom.js": "u7Jv"
        }
    ],
    "ZECt": [
        function(require1, module1, exports) {
            var t = require1("./constants.js").NODE_TYPE_FILE;
            module1.exports = function(s, e) {
                this.id = s, this.type = e || t;
            };
        },
        {
            "./constants.js": "iJA9"
        }
    ],
    "osLK": [
        function(require1, module1, exports) {
            var r = require1("./constants"), e = r.FIRST_DESCRIPTOR, n = {}, t = function() {
                for(var r = e; o(r);)r++;
                return r;
            }, o = function(r) {
                return n[r];
            }, i = function(r) {
                var e = t();
                return n[e] = r, e;
            }, u = function(r) {
                return delete n[r];
            };
            module1.exports = {
                allocDescriptor: i,
                releaseDescriptor: u,
                getOpenFileDescription: o
            };
        },
        {
            "./constants": "iJA9"
        }
    ],
    "KKNo": [
        function(require1, module1, exports) {
            function t(t, i) {
                if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t, i) {
                for(var s = 0; s < i.length; s++){
                    var e = i[s];
                    e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, e.key, e);
                }
            }
            function s(t, s, e) {
                return s && i(t.prototype, s), e && i(t, e), t;
            }
            var e = require1("./constants"), n = e.NODE_TYPE_FILE, r = e.NODE_TYPE_DIRECTORY, a = e.NODE_TYPE_SYMBOLIC_LINK, o = e.DEFAULT_FILE_PERMISSIONS, u = e.DEFAULT_DIR_PERMISSIONS, h = require1("./constants").fsConstants, c = h.S_IFREG, f = h.S_IFDIR, m = h.S_IFLNK;
            function d(t, i, s) {
                if (t[i]) return s();
                t.guid(function(e, n) {
                    if (e) return s(e);
                    t[i] = n, s();
                });
            }
            function l(t, i) {
                switch(t){
                    case r:
                        return (i || u) | f;
                    case a:
                        return (i || o) | m;
                    case n:
                    default:
                        return (i || o) | c;
                }
            }
            var p = function() {
                function i(s) {
                    t(this, i);
                    var e = Date.now();
                    this.id = s.id, this.data = s.data, this.size = s.size || 0, this.atime = s.atime || e, this.ctime = s.ctime || e, this.mtime = s.mtime || e, this.flags = s.flags || [], this.xattrs = s.xattrs || {}, this.nlinks = s.nlinks || 0, "string" == typeof s.type ? this.type = s.type : "string" == typeof s.mode ? this.type = s.mode : this.type = n, this.permissions = s.permissions || l(this.type), this.uid = s.uid || 0, this.gid = s.gid || 0;
                }
                return s(i, [
                    {
                        key: "toJSON",
                        value: function() {
                            return {
                                id: this.id,
                                data: this.data,
                                size: this.size,
                                atime: this.atime,
                                ctime: this.ctime,
                                mtime: this.ctime,
                                flags: this.flags,
                                xattrs: this.xattrs,
                                nlinks: this.nlinks,
                                mode: this.type,
                                permissions: this.permissions,
                                uid: this.uid,
                                gid: this.gid
                            };
                        }
                    },
                    {
                        key: "mode",
                        get: function() {
                            return l(this.type, this.permissions);
                        },
                        set: function(t) {
                            this.permissions = t;
                        }
                    }
                ]), i;
            }();
            module1.exports.create = function(t, i) {
                d(t, "id", function(s) {
                    if (s) return i(s);
                    d(t, "data", function(s) {
                        if (s) return i(s);
                        i(null, new p(t));
                    });
                });
            };
        },
        {
            "./constants": "iJA9"
        }
    ],
    "XWaV": [
        function(require1, module1, exports) {
            var e = require1("./errors.js"), t = require1("./node");
            function i(e, t, i, r) {
                this.path = e, this.id = t, this.flags = i, this.position = r;
            }
            i.prototype.getNode = function(i, r) {
                var o = this.id, n = this.path;
                i.getObject(o, function(i, o) {
                    return i ? r(i) : o ? void t.create(o, r) : r(new e.EBADF("file descriptor refers to unknown node", n));
                });
            }, module1.exports = i;
        },
        {
            "./errors.js": "p8GN",
            "./node": "KKNo"
        }
    ],
    "JEp0": [
        function(require1, module1, exports) {
            var t = require1("./constants.js");
            function e(e) {
                var i = Date.now();
                this.id = t.SUPER_NODE_ID, this.type = t.NODE_TYPE_META, this.atime = e.atime || i, this.ctime = e.ctime || i, this.mtime = e.mtime || i, this.rnode = e.rnode;
            }
            e.create = function(t, i) {
                t.guid(function(n, o) {
                    n ? i(n) : (t.rnode = t.rnode || o, i(null, new e(t)));
                });
            }, module1.exports = e;
        },
        {
            "./constants.js": "iJA9"
        }
    ],
    "dsCT": [
        function(require1, module1, exports) {
            "use strict";
            var t = require1("./constants.js"), i = require1("./path.js");
            function e(t) {
                return new Date(Number(t));
            }
            function s(t, s, o) {
                this.dev = o, this.node = s.id, this.type = s.type, this.size = s.size, this.nlinks = s.nlinks, this.atime = e(s.atime), this.mtime = e(s.mtime), this.ctime = e(s.ctime), this.atimeMs = s.atime, this.mtimeMs = s.mtime, this.ctimeMs = s.ctime, this.version = s.version, this.mode = s.mode, this.uid = s.uid, this.gid = s.gid, this.name = i.basename(t);
            }
            s.prototype.isFile = function() {
                return this.type === t.NODE_TYPE_FILE;
            }, s.prototype.isDirectory = function() {
                return this.type === t.NODE_TYPE_DIRECTORY;
            }, s.prototype.isSymbolicLink = function() {
                return this.type === t.NODE_TYPE_SYMBOLIC_LINK;
            }, s.prototype.isSocket = s.prototype.isFIFO = s.prototype.isCharacterDevice = s.prototype.isBlockDevice = function() {
                return !1;
            }, module1.exports = s;
        },
        {
            "./constants.js": "iJA9",
            "./path.js": "UzoP"
        }
    ],
    "q4Wu": [
        function(require1, module1, exports) {
            "use strict";
            var t = require1("./stats.js");
            function o(r, s, e) {
                this.constructor = o, t.call(this, r, s, e);
            }
            o.prototype = t.prototype, module1.exports = o;
        },
        {
            "./stats.js": "dsCT"
        }
    ],
    "bsBG": [
        function(require1, module1, exports) {
            var Buffer = require1("buffer").Buffer;
            var e = require1("buffer").Buffer;
            function n(e) {
                return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e;
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                })(e);
            }
            var t = require1("../path.js"), i = t.normalize, o = t.dirname, r = t.basename, u = t.isAbsolute, a = require1("../shared.js"), c = require1("../../lib/async.js"), f = require1("../constants.js"), l = f.NODE_TYPE_FILE, s = f.NODE_TYPE_DIRECTORY, p = f.NODE_TYPE_SYMBOLIC_LINK, d = f.NODE_TYPE_META, m = f.FULL_READ_WRITE_EXEC_PERMISSIONS, E = f.ROOT_DIRECTORY_NAME, g = f.SUPER_NODE_ID, w = f.SYMLOOP_MAX, O = f.O_READ, b = f.O_WRITE, y = f.O_CREATE, v = f.O_EXCLUSIVE, N = f.O_APPEND, h = f.O_FLAGS, I = f.XATTR_CREATE, j = f.XATTR_REPLACE, A = f.FS_NOMTIME, D = f.FS_NOCTIME, T = require1("../errors.js"), L = require1("../directory-entry.js"), R = require1("../open-files.js"), _ = require1("../open-file-description.js"), F = require1("../super-node.js"), S = require1("../node.js"), V = require1("../dirent.js"), B = require1("../stats.js");
            function P(e, n, t, i, o) {
                var r = e.flags;
                r.includes(D) && delete i.ctime, r.includes(A) && delete i.mtime;
                var u = !1;
                function a(t) {
                    e.changes.push({
                        event: "change",
                        path: n
                    }), o(t);
                }
                i.ctime && (t.ctime = i.ctime, t.atime = i.ctime, u = !0), i.atime && (t.atime = i.atime, u = !0), i.mtime && (t.mtime = i.mtime, u = !0), u ? e.putObject(t.id, t, a) : a();
            }
            function x(e, n, t, u) {
                if (t !== s && t !== l) return u(new T.EINVAL("type must be a directory or file", n));
                n = i(n);
                var a, c, f, p = r(n), d = o(n);
                function m(t, i) {
                    !t && i ? u(new T.EEXIST("path name already exists", n)) : !t || t instanceof T.ENOENT ? e.getObject(a.data, E) : u(t);
                }
                function E(n, i) {
                    n ? u(n) : (c = i, S.create({
                        guid: e.guid,
                        type: t
                    }, function(n, t) {
                        n ? u(n) : ((f = t).nlinks += 1, e.putObject(f.id, f, w));
                    }));
                }
                function g(n) {
                    if (n) u(n);
                    else {
                        var t = Date.now();
                        P(e, d, f, {
                            mtime: t,
                            ctime: t
                        }, u);
                    }
                }
                function w(n) {
                    n ? u(n) : (c[p] = new L(f.id, t), e.putObject(a.data, c, g));
                }
                k(e, d, function(t, i) {
                    t ? u(t) : i.type !== s ? u(new T.ENOTDIR("a component of the path prefix is not a directory", n)) : (a = i, k(e, n, m));
                });
            }
            function k(e, n, t) {
                if (!(n = i(n))) return t(new T.ENOENT("path is an empty string"));
                var u = r(n), a = o(n), c = 0;
                function f(n, i) {
                    if (n) return t(n);
                    var o = new F(i);
                    o && o.type === d && o.rnode ? e.getObject(o.rnode, l) : t(new T.EFILESYSTEMERROR);
                }
                function l(e, n) {
                    e ? t(e) : n ? S.create(n, t) : t(new T.ENOENT);
                }
                function m(i, o) {
                    i ? t(i) : o.type === s && o.data ? e.getObject(o.data, O) : t(new T.ENOTDIR("a component of the path prefix is not a directory", n));
                }
                function O(i, o) {
                    if (i) t(i);
                    else if (Object.prototype.hasOwnProperty.call(o, u)) {
                        var r = o[u].id;
                        e.getObject(r, b);
                    } else t(new T.ENOENT(null, n));
                }
                function b(e, n) {
                    if (e) return t(e);
                    S.create(n, y);
                }
                function y(l, s) {
                    var d;
                    l ? t(l) : s.type === p ? ++c > w ? t(new T.ELOOP(null, n)) : (d = s.data, d = i(d), a = o(d), u = r(d), E === u ? e.getObject(g, f) : k(e, a, m)) : t(null, s);
                }
                E === u ? e.getObject(g, f) : k(e, a, m);
            }
            function C(e, n, t, i, o, r, u) {
                var a = t.xattrs;
                r === I && Object.prototype.hasOwnProperty.call(a, i) ? u(new T.EEXIST("attribute already exists", n)) : r !== j || Object.prototype.hasOwnProperty.call(a, i) ? (a[i] = o, e.putObject(t.id, t, function(i) {
                    i ? u(i) : P(e, n, t, {
                        ctime: Date.now()
                    }, u);
                })) : u(new T.ENOATTR(null, n));
            }
            function X(e, n) {
                var t, i, o;
                function r(o) {
                    o ? n(o) : S.create({
                        guid: e.guid,
                        id: t.rnode,
                        type: s
                    }, function(t, o) {
                        t ? n(t) : ((i = o).nlinks += 1, e.putObject(i.id, i, u));
                    });
                }
                function u(t) {
                    t ? n(t) : (o = {}, e.putObject(i.data, o, n));
                }
                e.getObject(g, function(i, o) {
                    !i && o ? n() : !i || i instanceof T.ENOENT ? F.create({
                        guid: e.guid
                    }, function(i, o) {
                        i ? n(i) : (t = o, e.putObject(t.id, t, r));
                    }) : n(i);
                });
            }
            function q(e, n, t) {
                n = i(n);
                var u, a, c, f, l = r(n), p = o(n);
                function d(n, i) {
                    n ? t(n) : (c = i, e.getObject(c.data, m));
                }
                function m(n, i) {
                    n ? t(n) : (f = i, S.create({
                        guid: e.guid,
                        type: s
                    }, function(n, i) {
                        n ? t(n) : ((u = i).nlinks += 1, e.putObject(u.id, u, E));
                    }));
                }
                function E(n) {
                    n ? t(n) : (a = {}, e.putObject(u.data, a, w));
                }
                function g(n) {
                    if (n) t(n);
                    else {
                        var i = Date.now();
                        P(e, p, c, {
                            mtime: i,
                            ctime: i
                        }, t);
                    }
                }
                function w(n) {
                    n ? t(n) : (f[l] = new L(u.id, s), e.putObject(c.data, f, g));
                }
                k(e, n, function(i, o) {
                    !i && o ? t(new T.EEXIST(null, n)) : !i || i instanceof T.ENOENT ? k(e, p, d) : t(i);
                });
            }
            function M(e, n, t, o) {
                var r = f.fsConstants, u = r.F_OK, a = r.R_OK, c = r.W_OK, l = r.X_OK, s = r.S_IXUSR, p = r.S_IXGRP, d = r.S_IXOTH;
                k(e, n = i(n), function(e, i) {
                    if (e) return o(e);
                    if (t === u) return o(null);
                    var r = xe(i.mode, o);
                    return r ? t & (a | c) ? o(null) : t & l && r & (s | p | d) ? o(null) : void o(new T.EACCES("permission denied", n)) : void 0;
                });
            }
            function z(e, n, t) {
                n = i(n);
                var u, a, c, f, l = r(n), p = o(n);
                function d(i, o) {
                    i ? t(i) : E === l ? t(new T.EBUSY(null, n)) : Object.prototype.hasOwnProperty.call(o, l) ? (u = (f = o)[l].id, e.getObject(u, m)) : t(new T.ENOENT(null, n));
                }
                function m(i, o) {
                    i ? t(i) : o.type !== s ? t(new T.ENOTDIR(null, n)) : (u = o, e.getObject(u.data, g));
                }
                function g(i, o) {
                    i ? t(i) : (a = o, Object.keys(a).length > 0 ? t(new T.ENOTEMPTY(null, n)) : (delete f[l], e.putObject(c.data, f, w)));
                }
                function w(n) {
                    if (n) t(n);
                    else {
                        var i = Date.now();
                        P(e, p, c, {
                            mtime: i,
                            ctime: i
                        }, O);
                    }
                }
                function O(n) {
                    n ? t(n) : e.delete(u.id, b);
                }
                function b(n) {
                    n ? t(n) : e.delete(u.data, t);
                }
                k(e, p, function(n, i) {
                    n ? t(n) : (c = i, e.getObject(c.data, d));
                });
            }
            function Y(n, t, u, a, c) {
                "function" == typeof a && (c = a, a = null), t = i(t);
                var f, d, m, g, O, N = r(t), h = o(t), I = 0;
                function j(e, i) {
                    e ? c(e) : i.type !== s ? c(new T.ENOENT(null, t)) : (f = i, n.getObject(f.data, A));
                }
                function A(e, i) {
                    e ? c(e) : (d = i, Object.prototype.hasOwnProperty.call(d, N) ? u.includes(v) ? c(new T.EEXIST("O_CREATE and O_EXCLUSIVE are set, and the named file exists", t)) : (m = d[N]).type === s && u.includes(b) ? c(new T.EISDIR("the named file is a directory and O_WRITE is set", t)) : n.getObject(m.id, D) : u.includes(y) ? S.create({
                        guid: n.guid,
                        type: l
                    }, function(e, t) {
                        e ? c(e) : ((g = t).nlinks += 1, a && (g.mode = a), n.putObject(g.id, g, _));
                    }) : c(new T.ENOENT("O_CREATE is not set and the named file does not exist", t)));
                }
                function D(e, a) {
                    if (e) c(e);
                    else {
                        var f = a;
                        f.type === p ? ++I > w ? c(new T.ELOOP(null, t)) : function(e) {
                            e = i(e), h = o(e), N = r(e), E === N && (u.includes(b) ? c(new T.EISDIR("the named file is a directory and O_WRITE is set", t)) : k(n, t, R));
                            k(n, h, j);
                        }(f.data) : R(void 0, f);
                    }
                }
                function R(e, n) {
                    e ? c(e) : c(null, g = n);
                }
                function _(t) {
                    t ? c(t) : (O = e.alloc(0), n.putBuffer(g.data, O, V));
                }
                function F(e) {
                    if (e) c(e);
                    else {
                        var t = Date.now();
                        P(n, h, f, {
                            mtime: t,
                            ctime: t
                        }, B);
                    }
                }
                function V(e) {
                    e ? c(e) : (d[N] = new L(g.id, l), n.putObject(f.data, d, F));
                }
                function B(e) {
                    e ? c(e) : c(null, g);
                }
                E === N ? u.includes(b) ? c(new T.EISDIR("the named file is a directory and O_WRITE is set", t)) : k(n, t, R) : k(n, h, j);
            }
            function K(n, t, i, o, r, u) {
                var a;
                function c(e) {
                    e ? u(e) : u(null, r);
                }
                function f(e) {
                    if (e) u(e);
                    else {
                        var i = Date.now();
                        P(n, t.path, a, {
                            mtime: i,
                            ctime: i
                        }, c);
                    }
                }
                function l(e) {
                    e ? u(e) : n.putObject(a.id, a, f);
                }
                n.getObject(t.id, function(c, f) {
                    if (c) u(c);
                    else {
                        a = f;
                        var s = e.alloc(r);
                        i.copy(s, 0, o, o + r), t.position = r, a.size = r, a.version += 1, n.putBuffer(a.data, s, l);
                    }
                });
            }
            function U(n, t, i, o, r, u, a) {
                var c, f;
                function l(e) {
                    e ? a(e) : a(null, r);
                }
                function s(e) {
                    if (e) a(e);
                    else {
                        var i = Date.now();
                        P(n, t.path, c, {
                            mtime: i,
                            ctime: i
                        }, l);
                    }
                }
                function p(e) {
                    e ? a(e) : n.putObject(c.id, c, s);
                }
                function d(l, s) {
                    if (l) a(l);
                    else {
                        if (!(f = s)) return a(new T.EIO("Expected Buffer"));
                        var d = null != u ? u : t.position, m = Math.max(f.length, d + r), E = e.alloc(m);
                        f && f.copy(E), i.copy(E, d, o, o + r), void 0 === u && (t.position += r), c.size = m, c.version += 1, n.putBuffer(c.data, E, p);
                    }
                }
                n.getObject(t.id, function(e, t) {
                    e ? a(e) : (c = t, n.getBuffer(c.data, d));
                });
            }
            function W(e, n, t, i, o, r, u) {
                var a, c;
                function f(e, a) {
                    if (e) u(e);
                    else {
                        if (!(c = a)) return u(new T.EIO("Expected Buffer"));
                        var f = null != r ? r : n.position;
                        o = f + o > t.length ? o - f : o, c.copy(t, i, f, f + o), void 0 === r && (n.position += o), u(null, o);
                    }
                }
                e.getObject(n.id, function(t, i) {
                    t ? u(t) : i.type === s ? u(new T.EISDIR("the named file is a directory", n.path)) : (a = i, e.getBuffer(a.data, f));
                });
            }
            function G(e, n, t) {
                k(e, n = i(n), t);
            }
            function H(e, n, t) {
                n.getNode(e, t);
            }
            function $(e, n, t) {
                n = i(n);
                var u, a, c = r(n), f = o(n);
                function l(e, n) {
                    if (e) return t(e);
                    S.create(n, t);
                }
                function s(i, o) {
                    i ? t(i) : (a = o, Object.prototype.hasOwnProperty.call(a, c) ? e.getObject(a[c].id, l) : t(new T.ENOENT("a component of the path does not name an existing file", n)));
                }
                E === c ? k(e, n, t) : k(e, f, function(n, i) {
                    n ? t(n) : (u = i, e.getObject(u.data, s));
                });
            }
            function J(e, n, t, u) {
                n = i(n);
                var a = r(n), c = o(n);
                t = i(t);
                var f, l, p, d, m, E, g = r(t), w = o(t), O = Date.now();
                function b(n) {
                    n ? u(n) : P(e, t, E, {
                        ctime: O
                    }, u);
                }
                function y(n, t) {
                    n ? u(n) : ((E = t).nlinks += 1, e.putObject(E.id, E, b));
                }
                function v(n) {
                    n ? u(n) : e.getObject(m, y);
                }
                function N(n, t) {
                    n ? u(n) : (d = t, Object.prototype.hasOwnProperty.call(d, g) ? u(new T.EEXIST("newpath resolves to an existing file", g)) : (d[g] = l[a], m = d[g].id, e.putObject(p.data, d, v)));
                }
                function h(n, t) {
                    n ? u(n) : (p = t, e.getObject(p.data, N));
                }
                function I(n, t) {
                    n ? u(n) : (l = t, Object.prototype.hasOwnProperty.call(l, a) ? l[a].type === s ? u(new T.EPERM("oldpath refers to a directory")) : k(e, w, h) : u(new T.ENOENT("a component of either path prefix does not exist", a)));
                }
                k(e, c, function(n, t) {
                    n ? u(n) : (f = t, e.getObject(f.data, I));
                });
            }
            function Q(e, n, t) {
                n = i(n);
                var u, a, c, f = r(n), l = o(n);
                function p(n) {
                    n ? t(n) : (delete a[f], e.putObject(u.data, a, function(n) {
                        if (n) t(n);
                        else {
                            var i = Date.now();
                            P(e, l, u, {
                                mtime: i,
                                ctime: i
                            }, t);
                        }
                    }));
                }
                function d(n) {
                    n ? t(n) : e.delete(c.data, p);
                }
                function m(i, o) {
                    i ? t(i) : o.type === s ? t(new T.EPERM("unlink not permitted on directories", f)) : function(i, o) {
                        i ? t(i) : ((c = o).nlinks -= 1, c.nlinks < 1 ? e.delete(c.id, d) : e.putObject(c.id, c, function(i) {
                            i ? t(i) : P(e, n, c, {
                                ctime: Date.now()
                            }, p);
                        }));
                    }(null, o);
                }
                function E(n, i) {
                    n ? t(n) : (a = i, Object.prototype.hasOwnProperty.call(a, f) ? e.getObject(a[f].id, m) : t(new T.ENOENT("a component of the path does not name an existing file", f)));
                }
                k(e, l, function(n, i) {
                    n ? t(n) : (u = i, e.getObject(u.data, E));
                });
            }
            function Z(n, o, r, u) {
                var a, f;
                function l(i, a) {
                    if (i) u(i);
                    else {
                        f = a;
                        var l = Object.keys(f);
                        if (r.encoding) {
                            var s = l.map(function(n) {
                                return e.from(n);
                            });
                            l = "buffer" === r.encoding ? s : s.map(function(e) {
                                return e.toString(r.encoding);
                            });
                        }
                        if (r.withFileTypes) {
                            var p = [];
                            c.eachSeries(l, function(i, u) {
                                var a = e.from(i, r.encoding).toString(), c = t.join(o, a);
                                ee(n, c, function(e, n) {
                                    e && u(e), n.name = i, p.push(n), u();
                                });
                            }, function(e) {
                                u(e, p);
                            });
                        } else u(null, l);
                    }
                }
                o = i(o), "function" == typeof r && (u = r, r = {}), r = ne(r), k(n, o, function(e, t) {
                    e ? u(e) : t.type !== s ? u(new T.ENOTDIR(null, o)) : (a = t, n.getObject(a.data, l));
                });
            }
            function ee(e, n, t) {
                $(e, n, function(i, o) {
                    if (i) t(i);
                    else {
                        var r = new V(n, o, e.name);
                        t(null, r);
                    }
                });
            }
            function ne(e, n) {
                return e ? "function" == typeof e ? e = {
                    encoding: n
                } : "string" == typeof e && (e = {
                    encoding: e
                }) : e = {
                    encoding: n
                }, e;
            }
            function te(e, n, a, c) {
                a = i(a);
                var f, l, s, d = r(a), m = o(a);
                function g(i, o) {
                    i ? c(i) : (l = o, Object.prototype.hasOwnProperty.call(l, d) ? c(new T.EEXIST(null, d)) : S.create({
                        guid: e.guid,
                        type: p
                    }, function(i, o) {
                        i ? c(i) : ((s = o).nlinks += 1, u(n) || (s.symlink_relpath = n, n = t.resolve(m, n)), s.size = n.length, s.data = n, e.putObject(s.id, s, O));
                    }));
                }
                function w(n) {
                    if (n) c(n);
                    else {
                        var t = Date.now();
                        P(e, m, f, {
                            mtime: t,
                            ctime: t
                        }, c);
                    }
                }
                function O(n) {
                    n ? c(n) : (l[d] = new L(s.id, p), e.putObject(f.data, l, w));
                }
                E === d ? c(new T.EEXIST(null, d)) : k(e, m, function(n, t) {
                    n ? c(n) : (f = t, e.getObject(f.data, g));
                });
            }
            function ie(e, n, t) {
                n = i(n);
                var u, a, c = r(n), f = o(n);
                function l(n, i) {
                    n ? t(n) : (a = i, Object.prototype.hasOwnProperty.call(a, c) ? e.getObject(a[c].id, s) : t(new T.ENOENT("a component of the path does not name an existing file", c)));
                }
                function s(e, i) {
                    if (e) t(e);
                    else if (i.type !== p) t(new T.EINVAL("path not a symbolic link", n));
                    else {
                        var o = i.symlink_relpath ? i.symlink_relpath : i.data;
                        t(null, o);
                    }
                }
                k(e, f, function(n, i) {
                    n ? t(n) : (u = i, e.getObject(u.data, l));
                });
            }
            function oe(n, t, o, r) {
                var u;
                function a(t, i) {
                    if (t) r(t);
                    else {
                        if (!i) return r(new T.EIO("Expected Buffer"));
                        var a = e.alloc(o);
                        i && i.copy(a), n.putBuffer(u.data, a, f);
                    }
                }
                function c(e) {
                    if (e) r(e);
                    else {
                        var i = Date.now();
                        P(n, t, u, {
                            mtime: i,
                            ctime: i
                        }, r);
                    }
                }
                function f(e) {
                    e ? r(e) : (u.size = o, u.version += 1, n.putObject(u.id, u, c));
                }
                t = i(t), o < 0 ? r(new T.EINVAL("length cannot be negative")) : k(n, t, function(e, i) {
                    e ? r(e) : i.type === s ? r(new T.EISDIR(null, t)) : (u = i, n.getBuffer(u.data, a));
                });
            }
            function re(n, t, i, o) {
                var r;
                function u(t, u) {
                    if (t) o(t);
                    else {
                        var a;
                        if (!u) return o(new T.EIO("Expected Buffer"));
                        a = u ? u.slice(0, i) : e.alloc(i), n.putBuffer(r.data, a, c);
                    }
                }
                function a(e) {
                    if (e) o(e);
                    else {
                        var i = Date.now();
                        P(n, t.path, r, {
                            mtime: i,
                            ctime: i
                        }, o);
                    }
                }
                function c(e) {
                    e ? o(e) : (r.size = i, r.version += 1, n.putObject(r.id, r, a));
                }
                i < 0 ? o(new T.EINVAL("length cannot be negative")) : t.getNode(n, function(e, t) {
                    e ? o(e) : t.type === s ? o(new T.EISDIR) : (r = t, n.getBuffer(r.data, u));
                });
            }
            function ue(e, n, t, o, r) {
                n = i(n), "number" != typeof t || "number" != typeof o ? r(new T.EINVAL("atime and mtime must be number", n)) : t < 0 || o < 0 ? r(new T.EINVAL("atime and mtime must be positive integers", n)) : k(e, n, function(i, u) {
                    i ? r(i) : P(e, n, u, {
                        atime: t,
                        ctime: o,
                        mtime: o
                    }, r);
                });
            }
            function ae(e, n, t, i, o) {
                "number" != typeof t || "number" != typeof i ? o(new T.EINVAL("atime and mtime must be a number")) : t < 0 || i < 0 ? o(new T.EINVAL("atime and mtime must be positive integers")) : n.getNode(e, function(r, u) {
                    r ? o(r) : P(e, n.path, u, {
                        atime: t,
                        ctime: i,
                        mtime: i
                    }, o);
                });
            }
            function ce(e, n, t, o, r, u) {
                n = i(n), "string" != typeof t ? u(new T.EINVAL("attribute name must be a string", n)) : t ? null !== r && r !== I && r !== j ? u(new T.EINVAL("invalid flag, must be null, XATTR_CREATE or XATTR_REPLACE", n)) : k(e, n, function(i, a) {
                    if (i) return u(i);
                    C(e, n, a, t, o, r, u);
                }) : u(new T.EINVAL("attribute name cannot be an empty string", n));
            }
            function fe(e, n, t, i, o, r) {
                "string" != typeof t ? r(new T.EINVAL("attribute name must be a string")) : t ? null !== o && o !== I && o !== j ? r(new T.EINVAL("invalid flag, must be null, XATTR_CREATE or XATTR_REPLACE")) : n.getNode(e, function(u, a) {
                    if (u) return r(u);
                    C(e, n.path, a, t, i, o, r);
                }) : r(new T.EINVAL("attribute name cannot be an empty string"));
            }
            function le(e, n, t, o) {
                n = i(n), "string" != typeof t ? o(new T.EINVAL("attribute name must be a string", n)) : t ? k(e, n, function(e, i) {
                    if (e) return o(e);
                    var r = i.xattrs;
                    Object.prototype.hasOwnProperty.call(r, t) ? o(null, r[t]) : o(new T.ENOATTR(null, n));
                }) : o(new T.EINVAL("attribute name cannot be an empty string", n));
            }
            function se(e, n, t, i) {
                "string" != typeof t ? i(new T.EINVAL) : t ? n.getNode(e, function(e, n) {
                    if (e) return i(e);
                    var o = n.xattrs;
                    Object.prototype.hasOwnProperty.call(o, t) ? i(null, o[t]) : i(new T.ENOATTR);
                }) : i(new T.EINVAL("attribute name cannot be an empty string"));
            }
            function pe(e, n, t, o) {
                n = i(n), "string" != typeof t ? o(new T.EINVAL("attribute name must be a string", n)) : t ? k(e, n, function(i, r) {
                    if (i) return o(i);
                    var u = r.xattrs;
                    Object.prototype.hasOwnProperty.call(u, t) ? (delete u[t], e.putObject(r.id, r, function(t) {
                        t ? o(t) : P(e, n, r, {
                            ctime: Date.now()
                        }, o);
                    })) : o(new T.ENOATTR(null, n));
                }) : o(new T.EINVAL("attribute name cannot be an empty string", n));
            }
            function de(e, n, t, i) {
                "string" != typeof t ? i(new T.EINVAL("attribute name must be a string")) : t ? n.getNode(e, function(o, r) {
                    if (o) return i(o);
                    var u = r.xattrs;
                    Object.prototype.hasOwnProperty.call(u, t) ? (delete u[t], e.putObject(r.id, r, function(t) {
                        t ? i(t) : P(e, n.path, r, {
                            ctime: Date.now()
                        }, i);
                    })) : i(new T.ENOATTR);
                }) : i(new T.EINVAL("attribute name cannot be an empty string"));
            }
            function me(e) {
                return Object.prototype.hasOwnProperty.call(h, e) ? h[e] : null;
            }
            function Ee(e, n, t) {
                return e ? "function" == typeof e ? e = {
                    encoding: n,
                    flag: t
                } : "string" == typeof e && (e = {
                    encoding: e,
                    flag: t
                }) : e = {
                    encoding: n,
                    flag: t
                }, e;
            }
            function ge(e, n, t, i, o) {
                if (arguments.length < 5 ? (o = arguments[arguments.length - 1], i = 420) : i = xe(i, m, o), !(t = me(t))) return o(new T.EINVAL("flags is not valid"), n);
                Y(e, n, t, i, function(e, i) {
                    if (e) o(e);
                    else {
                        var r;
                        r = t.includes(N) ? i.size : 0;
                        var u = new _(n, i.id, t, r), a = R.allocDescriptor(u);
                        o(null, a);
                    }
                });
            }
            function we(e, n, t) {
                R.getOpenFileDescription(n) ? (R.releaseDescriptor(n), t(null)) : t(new T.EBADF);
            }
            function Oe(e, n, t, i) {
                x(e, n, t, i);
            }
            function be(e, n, t, i) {
                if (arguments.length < 4) i = t, t = m;
                else if (!(t = xe(t, m, i))) return;
                q(e, n, i);
            }
            function ye(e, n, t, i) {
                "function" == typeof t && (i = t, t = f.fsConstants.F_OK), M(e, n, t |= f.fsConstants.F_OK, i);
            }
            function ve(e, n, t, i) {
                if (i = arguments[arguments.length - 1], !n) return i(new Error("filename prefix is required"));
                var o = n + "-" + a.randomChars(6);
                q(e, o, function(e) {
                    i(e, o);
                });
            }
            function Ne(e, n, t) {
                z(e, n, t);
            }
            function he(e, n, t) {
                G(e, n, function(i, o) {
                    if (i) t(i);
                    else {
                        var r = new B(n, o, e.name);
                        t(null, r);
                    }
                });
            }
            function Ie(e, n, t) {
                var i = R.getOpenFileDescription(n);
                i ? H(e, i, function(n, o) {
                    if (n) t(n);
                    else {
                        var r = new B(i.path, o, e.name);
                        t(null, r);
                    }
                }) : t(new T.EBADF);
            }
            function je(e, n, t, i) {
                J(e, n, t, i);
            }
            function Ae(e, n, t) {
                Q(e, n, t);
            }
            function De(e, n, t, i, o, r, u) {
                i = void 0 === i ? 0 : i, o = void 0 === o ? t.length - i : o, u = arguments[arguments.length - 1];
                var a = R.getOpenFileDescription(n);
                a ? a.flags.includes(O) ? W(e, a, t, i, o, r, function(e, n) {
                    u(e, n || 0, t);
                }) : u(new T.EBADF("descriptor does not permit reading")) : u(new T.EBADF);
            }
            function Te(e, n, t) {
                Ve(n, t) === n && (R.getOpenFileDescription(n) ? t() : t(new T.EBADF));
            }
            function Le(n, t, i, o) {
                o = arguments[arguments.length - 1];
                var r = me((i = Ee(i, null, "r")).flag || "r");
                if (!r) return o(new T.EINVAL("flags is not valid", t));
                Y(n, t, r, function(u, a) {
                    if (u) return o(u);
                    var c = new _(t, a.id, r, 0), f = R.allocDescriptor(c);
                    function l() {
                        R.releaseDescriptor(f);
                    }
                    H(n, c, function(r, u) {
                        if (r) return l(), o(r);
                        var a = new B(c.path, u, n.name);
                        if (a.isDirectory()) return l(), o(new T.EISDIR("illegal operation on directory", t));
                        var f = a.size, s = e.alloc(f);
                        W(n, c, s, 0, f, 0, function(e) {
                            if (l(), e) return o(e);
                            var n;
                            n = "utf8" === i.encoding ? s.toString("utf8") : s, o(null, n);
                        });
                    });
                });
            }
            function Re(e, n, t, i, o, r, u) {
                u = arguments[arguments.length - 1], i = void 0 === i ? 0 : i, o = void 0 === o ? t.length - i : o;
                var a = R.getOpenFileDescription(n);
                a ? a.flags.includes(b) ? t.length - i < o ? u(new T.EIO("input buffer is too small")) : U(e, a, t, i, o, r, u) : u(new T.EBADF("descriptor does not permit writing")) : u(new T.EBADF);
            }
            function _e(n, t, i, o, r) {
                r = arguments[arguments.length - 1];
                var u = me((o = Ee(o, "utf8", "w")).flag || "w");
                if (!u) return r(new T.EINVAL("flags is not valid", t));
                e.isBuffer(i) || ("number" == typeof i && (i = "" + i), i = "string" != typeof (i = i || "") ? e.from(i.toString()) : e.from(i || "", o.encoding || "utf8")), Y(n, t, u, function(e, o) {
                    if (e) return r(e);
                    var a = new _(t, o.id, u, 0), c = R.allocDescriptor(a);
                    K(n, a, i, 0, i.length, function(e) {
                        if (R.releaseDescriptor(c), e) return r(e);
                        r(null);
                    });
                });
            }
            function Fe(n, t, i, o, r) {
                r = arguments[arguments.length - 1];
                var u = me((o = Ee(o, "utf8", "a")).flag || "a");
                if (!u) return r(new T.EINVAL("flags is not valid", t));
                "number" == typeof (i = i || "") && (i = "" + i), "string" == typeof i && "utf8" === o.encoding && (i = e.from(i)), Y(n, t, u, function(e, o) {
                    if (e) return r(e);
                    var a = new _(t, o.id, u, o.size), c = R.allocDescriptor(a);
                    U(n, a, i, 0, i.length, a.position, function(e) {
                        if (R.releaseDescriptor(c), e) return r(e);
                        r(null);
                    });
                });
            }
            function Se(e, n, t) {
                he(e, n, function(e) {
                    t(!e);
                });
            }
            function Ve(e, n) {
                if ("number" == typeof e) return e;
                n(new T.EINVAL("Expected integer", e));
            }
            var Be = /^[0-7]+$/;
            function Pe(e) {
                return e === e >>> 0;
            }
            function xe(e, n, t) {
                return "function" == typeof n && (t = n, n = void 0), Pe(e) ? e & m : "number" == typeof e ? (Number.isInteger(e), t(new T.EINVAL("mode not a valid an integer value", e)), !1) : "string" == typeof e ? Be.test(e) ? parseInt(e, 8) & m : (t(new T.EINVAL("mode not a valid octal string", e)), !1) : void 0 !== n ? n : (t(new T.EINVAL("mode not valid", e)), !1);
            }
            function ke(e, n, t, o) {
                n = i(n), "number" != typeof t ? o(new T.EINVAL("mode must be number", n)) : k(e, n, function(i, r) {
                    i ? o(i) : (r.mode = t, P(e, n, r, {
                        mtime: Date.now()
                    }, o));
                });
            }
            function Ce(e, n, t, i) {
                "number" != typeof t ? i(new T.EINVAL("mode must be a number")) : n.getNode(e, function(o, r) {
                    o ? i(o) : (r.mode = t, P(e, n.path, r, {
                        mtime: Date.now()
                    }, i));
                });
            }
            function Xe(e, n, t, o, r) {
                n = i(n), k(e, n, function(i, u) {
                    i ? r(i) : (u.uid = t, u.gid = o, P(e, n, u, {
                        mtime: Date.now()
                    }, r));
                });
            }
            function qe(e, n, t, i, o) {
                n.getNode(e, function(r, u) {
                    r ? o(r) : (u.uid = t, u.gid = i, P(e, n.path, u, {
                        mtime: Date.now()
                    }, o));
                });
            }
            function Me(e, n, t, i) {
                le(e, n, t, i);
            }
            function ze(e, n, t, i) {
                var o = R.getOpenFileDescription(n);
                o ? se(e, o, t, i) : i(new T.EBADF);
            }
            function Ye(e, n, t, i, o, r) {
                "function" == typeof o && (r = o, o = null), ce(e, n, t, i, o, r);
            }
            function Ke(e, n, t, i, o, r) {
                "function" == typeof o && (r = o, o = null);
                var u = R.getOpenFileDescription(n);
                u ? u.flags.includes(b) ? fe(e, u, t, i, o, r) : r(new T.EBADF("descriptor does not permit writing")) : r(new T.EBADF);
            }
            function Ue(e, n, t, i) {
                pe(e, n, t, i);
            }
            function We(e, n, t, i) {
                var o = R.getOpenFileDescription(n);
                o ? o.flags.includes(b) ? de(e, o, t, i) : i(new T.EBADF("descriptor does not permit writing")) : i(new T.EBADF);
            }
            function Ge(e, n, t, i, o) {
                var r = R.getOpenFileDescription(n);
                r || o(new T.EBADF), "SET" === i ? t < 0 ? o(new T.EINVAL("resulting file offset would be negative")) : (r.position = t, o(null, r.position)) : "CUR" === i ? r.position + t < 0 ? o(new T.EINVAL("resulting file offset would be negative")) : (r.position += t, o(null, r.position)) : "END" === i ? H(e, r, function(e, n) {
                    e ? o(e) : n.size + t < 0 ? o(new T.EINVAL("resulting file offset would be negative")) : (r.position = n.size + t, o(null, r.position));
                }) : o(new T.EINVAL("whence argument is not a proper value"));
            }
            function He(e, n, t, i) {
                Z(e, n, t, i);
            }
            function $e(e) {
                return "number" == typeof e ? e : "object" === n(e) && "function" == typeof e.getTime ? e.getTime() : void 0;
            }
            function Je(e, n, t, i, o) {
                var r = Date.now();
                ue(e, n, t = $e(t || r), i = $e(i || r), o);
            }
            function Qe(e, n, t, i, o) {
                var r = Date.now();
                t = $e(t || r), i = $e(i || r);
                var u = R.getOpenFileDescription(n);
                u ? u.flags.includes(b) ? ae(e, u, t, i, o) : o(new T.EBADF("descriptor does not permit writing")) : o(new T.EBADF);
            }
            function Ze(e, n, t, i) {
                (t = xe(t, i)) && ke(e, n, t, i);
            }
            function en(e, n, t, i) {
                if (t = xe(t, i)) {
                    var o = R.getOpenFileDescription(n);
                    o ? o.flags.includes(b) ? Ce(e, o, t, i) : i(new T.EBADF("descriptor does not permit writing")) : i(new T.EBADF);
                }
            }
            function nn(e, n, t, i, o) {
                return Pe(t) ? Pe(i) ? void Xe(e, n, t, i, o) : o(new T.EINVAL("gid must be a valid integer", i)) : o(new T.EINVAL("uid must be a valid integer", t));
            }
            function tn(e, n, t, i, o) {
                if (!Pe(t)) return o(new T.EINVAL("uid must be a valid integer", t));
                if (!Pe(i)) return o(new T.EINVAL("gid must be a valid integer", i));
                var r = R.getOpenFileDescription(n);
                r ? r.flags.includes(b) ? qe(e, r, t, i, o) : o(new T.EBADF("descriptor does not permit writing")) : o(new T.EBADF);
            }
            function on(e, n, o, r) {
                n = i(n), o = i(o);
                var u, a, c, f, l = t.dirname(n), p = t.dirname(o), d = t.basename(n), m = t.basename(o), E = Date.now();
                function g(n, t) {
                    n ? r(n) : P(e, o, t, {
                        ctime: E
                    }, r);
                }
                function w(n) {
                    n ? r(n) : e.getObject(f[m].id, g);
                }
                function O(n) {
                    n ? r(n) : (u.id === c.id && (a = f), delete a[d], e.putObject(u.data, a, w));
                }
                function b(n) {
                    n ? r(n) : (f[m] = a[d], e.putObject(c.data, f, O));
                }
                function y(n, t) {
                    n ? r(n) : (f = t, Object.prototype.hasOwnProperty.call(f, m) ? z(e, o, b) : b());
                }
                function v(n, t) {
                    n ? r(n) : (c = t, e.getObject(c.data, y));
                }
                function N(n, t) {
                    n ? r(n) : (a = t, k(e, p, v));
                }
                function h(n, t) {
                    n ? r(n) : (u = t, e.getObject(t.data, N));
                }
                function I(t) {
                    t ? r(t) : Q(e, n, r);
                }
                k(e, n, function(t, i) {
                    t ? r(t) : i.type === s ? k(e, l, h) : J(e, n, o, I);
                });
            }
            function rn(e, n, t, i, o) {
                te(e, n, t, o = arguments[arguments.length - 1]);
            }
            function un(e, n, t) {
                ie(e, n, t);
            }
            function an(e, n, t) {
                $(e, n, function(i, o) {
                    if (i) t(i);
                    else {
                        var r = new B(n, o, e.name);
                        t(null, r);
                    }
                });
            }
            function cn(e, n, t, i) {
                Ve(t = t || 0, i = arguments[arguments.length - 1]) === t && oe(e, n, t, i);
            }
            function fn(e, n, t, i) {
                i = arguments[arguments.length - 1], t = t || 0;
                var o = R.getOpenFileDescription(n);
                if (o) {
                    if (o.flags.includes(b)) {
                        if (Ve(t, i) !== t) return;
                        re(e, o, t, i);
                    } else i(new T.EBADF("descriptor does not permit writing"));
                } else i(new T.EBADF);
            }
            module1.exports = {
                appendFile: Fe,
                access: ye,
                chown: nn,
                chmod: Ze,
                close: we,
                ensureRootDirectory: X,
                exists: Se,
                fchown: tn,
                fchmod: en,
                fgetxattr: ze,
                fremovexattr: We,
                fsetxattr: Ke,
                fstat: Ie,
                fsync: Te,
                ftruncate: fn,
                futimes: Qe,
                getxattr: Me,
                link: je,
                lseek: Ge,
                lstat: an,
                mkdir: be,
                mkdtemp: ve,
                mknod: Oe,
                open: ge,
                readdir: He,
                read: De,
                readFile: Le,
                readlink: un,
                removexattr: Ue,
                rename: on,
                rmdir: Ne,
                setxattr: Ye,
                stat: he,
                symlink: rn,
                truncate: cn,
                unlink: Ae,
                utimes: Je,
                writeFile: _e,
                write: Re
            };
        },
        {
            "../path.js": "UzoP",
            "../shared.js": "zBMa",
            "../../lib/async.js": "u4Zs",
            "../constants.js": "iJA9",
            "../errors.js": "p8GN",
            "../directory-entry.js": "ZECt",
            "../open-files.js": "osLK",
            "../open-file-description.js": "XWaV",
            "../super-node.js": "JEp0",
            "../node.js": "KKNo",
            "../dirent.js": "q4Wu",
            "../stats.js": "dsCT",
            "buffer": "dskh"
        }
    ],
    "GMi4": [
        function(require1, module1, exports) {
            var Buffer = require1("buffer").Buffer;
            var e = require1("buffer").Buffer, r = require1("es6-promisify"), t = r.promisify, n = require1("../path.js"), a = require1("../providers/index.js"), s = require1("../shell/shell.js"), o = require1("../../lib/intercom.js"), i = require1("../fs-watcher.js"), u = require1("../errors.js"), m = require1("../shared.js"), c = m.nop, f = m.guid, l = require1("../constants.js"), h = l.fsConstants, p = l.FILE_SYSTEM_NAME, d = l.FS_FORMAT, g = l.FS_READY, b = l.FS_PENDING, A = l.FS_ERROR, P = l.FS_NODUPEIDCHECK, v = l.STDIN, y = l.STDOUT, E = l.STDERR, R = require1("./implementation.js");
            function w(e) {
                return "function" == typeof e ? e : function(e) {
                    if (e) throw e;
                };
            }
            function S(e) {
                e && console.error("Filer error: ", e);
            }
            function O(e) {
                if (!(e && e.protocol && e.pathname)) return e;
                if ("file:" !== e.protocol) throw new u.EINVAL("only file: URLs are supported for paths", e);
                for(var r = e.pathname, t = 0; t < r.length; t++)if ("%" === r[t]) {
                    var n = 32 | r.codePointAt(t + 2);
                    if ("2" === r[t + 1] && 102 === n) throw new u.EINVAL("file: URLs must not include encoded / characters", e);
                }
                return decodeURIComponent(r);
            }
            function x(r) {
                return e.isBuffer(r) ? r.toString() : r;
            }
            function F(e, r) {
                return e ? n.isNull(e) ? new u.EINVAL("Path must be a string without null bytes.", e) : r || n.isAbsolute(e) ? void 0 : new u.EINVAL("Path must be absolute.", e) : new u.EINVAL("Path must be a string", e);
            }
            function _(e, r, t) {
                var n = e[r], a = F(n = x(n = O(n)), t);
                if (a) throw a;
                e[r] = n;
            }
            function q(e, r) {
                r = r || S;
                var m = (e = e || {}).flags || [], l = e.guid ? e.guid : f, O = e.provider || new a.Default(e.name || p), x = e.name || O.name, F = m.includes(d), I = this;
                I.readyState = b, I.name = x, I.error = null, I.stdin = v, I.stdout = y, I.stderr = E, I.constants = h, I.F_OK = h.F_OK, I.R_OK = h.R_OK, I.W_OK = h.W_OK, I.X_OK = h.X_OK, this.Shell = s.bind(void 0, this);
                var N = [];
                function j(e) {
                    return function(r) {
                        m.includes(P) ? r(null, l()) : function r(t) {
                            var n = l();
                            e.getObject(n, function(e, a) {
                                e ? t(e) : a ? r(t) : t(null, n);
                            });
                        }(r);
                    };
                }
                this.queueOrRun = function(e) {
                    var r;
                    return g === I.readyState ? e.call(I) : A === I.readyState ? r = new u.EFILESYSTEMERROR("unknown error") : N.push(e), r;
                }, this.watch = function(e, r, t) {
                    if (n.isNull(e)) throw new Error("Path must be a string without null bytes.");
                    "function" == typeof r && (t = r, r = {}), r = r || {}, t = t || c;
                    var a = new i;
                    return a.start(e, !1, r.recursive), a.on("change", t), a;
                }, O.open(function(e) {
                    function t(e) {
                        function t(e) {
                            var r = O[e]();
                            return r.name = x, r.flags = m, r.changes = [], r.guid = j(r), r.close = function() {
                                var e = r.changes;
                                !function(e) {
                                    if (e.length) {
                                        var r = o.getInstance();
                                        e.forEach(function(e) {
                                            r.emit(e.event, e.path);
                                        });
                                    }
                                }(e), e.length = 0;
                            }, r;
                        }
                        I.provider = {
                            openReadWriteContext: function() {
                                return t("getReadWriteContext");
                            },
                            openReadOnlyContext: function() {
                                return t("getReadOnlyContext");
                            }
                        }, I.readyState = e ? A : g, N.forEach((function(e) {
                            e.call(this);
                        }).bind(I)), N = null, r(e, I);
                    }
                    if (e) return t(e);
                    var n = O.getReadWriteContext();
                    n.guid = j(n), F ? n.clear(function(e) {
                        if (e) return t(e);
                        R.ensureRootDirectory(n, t);
                    }) : R.ensureRootDirectory(n, t);
                }), q.prototype.promises = {}, [
                    {
                        name: "appendFile",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "access",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "chown",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "chmod",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "close"
                    },
                    {
                        name: "exists",
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "fchown"
                    },
                    {
                        name: "fchmod"
                    },
                    {
                        name: "fgetxattr"
                    },
                    {
                        name: "fremovexattr"
                    },
                    {
                        name: "fsetxattr"
                    },
                    {
                        name: "fstat"
                    },
                    {
                        name: "fsync"
                    },
                    {
                        name: "ftruncate"
                    },
                    {
                        name: "futimes"
                    },
                    {
                        name: "getxattr",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "link",
                        promises: !0,
                        absPathArgs: [
                            0,
                            1
                        ]
                    },
                    {
                        name: "lseek"
                    },
                    {
                        name: "lstat",
                        promises: !0
                    },
                    {
                        name: "mkdir",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "mkdtemp",
                        promises: !0
                    },
                    {
                        name: "mknod",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "open",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "readdir",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "read"
                    },
                    {
                        name: "readFile",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "readlink",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "removexattr",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "rename",
                        promises: !0,
                        absPathArgs: [
                            0,
                            1
                        ]
                    },
                    {
                        name: "rmdir",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "setxattr",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "stat",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "symlink",
                        promises: !0,
                        relPathArgs: [
                            0
                        ],
                        absPathArgs: [
                            1
                        ]
                    },
                    {
                        name: "truncate",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "unlink",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "utimes",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "writeFile",
                        promises: !0,
                        absPathArgs: [
                            0
                        ]
                    },
                    {
                        name: "write"
                    }
                ].forEach(function(e) {
                    var r = e.name, n = !0 === e.promises;
                    q.prototype[r] = function() {
                        var t = this, n = Array.prototype.slice.call(arguments, 0), a = n.length - 1, s = "function" != typeof n[a], o = w(n[a]);
                        e.absPathArgs && e.absPathArgs.forEach(function(e) {
                            return _(n, e, !1);
                        }), e.relPathArgs && e.relPathArgs.forEach(function(e) {
                            return _(n, e, !0);
                        });
                        var i = t.queueOrRun(function() {
                            var e = t.provider.openReadWriteContext();
                            if (A === t.readyState) {
                                var i = new u.EFILESYSTEMERROR("filesystem unavailable, operation canceled");
                                return o.call(t, i);
                            }
                            function m() {
                                e.close(), o.apply(t, arguments);
                            }
                            s ? n.push(m) : n[a] = m;
                            var c = [
                                e
                            ].concat(n);
                            R[r].apply(null, c);
                        });
                        i && o(i);
                    }, n && (q.prototype.promises[r] = t(q.prototype[r].bind(I)));
                });
            }
            q.providers = a, module1.exports = q;
        },
        {
            "es6-promisify": "b1ZG",
            "../path.js": "UzoP",
            "../providers/index.js": "AiW7",
            "../shell/shell.js": "D1Ra",
            "../../lib/intercom.js": "u7Jv",
            "../fs-watcher.js": "VLEe",
            "../errors.js": "p8GN",
            "../shared.js": "zBMa",
            "../constants.js": "iJA9",
            "./implementation.js": "bsBG",
            "buffer": "dskh"
        }
    ],
    "iIhC": [
        function(require1, module1, exports) {
            "use strict";
            function e(e, t, r) {
                return {
                    dataPath: void 0,
                    schemaPath: void 0,
                    keyword: "absolutePath",
                    params: {
                        absolutePath: r
                    },
                    message: e,
                    parentSchema: t
                };
            }
            function t(t, r, a) {
                return e(t ? "The provided value ".concat(JSON.stringify(a), " is not an absolute path!") : "A relative path is expected. However, the provided value ".concat(JSON.stringify(a), " is an absolute path!"), r, a);
            }
            function r(r) {
                return r.addKeyword("absolutePath", {
                    errors: !0,
                    type: "string",
                    compile: function(r, a) {
                        var o = function o(s) {
                            var n = !0;
                            return s.includes("!") && (o.errors = [
                                e("The provided value ".concat(JSON.stringify(s), " contains exclamation mark (!) which is not allowed because it's reserved for loader syntax."), a, s)
                            ], n = !1), r === /^(?:[A-Za-z]:(\\|\/)|\\\\|\/)/.test(s) || (o.errors = [
                                t(r, a, s)
                            ], n = !1), n;
                        };
                        return o.errors = [], o;
                    }
                }), r;
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.default = void 0;
            var a = r;
            exports.default = a;
        },
        {}
    ],
    "GNtl": [
        function(require1, module1, exports) {
            "use strict";
            function t(t, n) {
                return a(t) || o(t, n) || r(t, n) || e();
            }
            function e() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            function r(t, e) {
                if (t) {
                    if ("string" == typeof t) return n(t, e);
                    var r = Object.prototype.toString.call(t).slice(8, -1);
                    return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(r) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(t, e) : void 0;
                }
            }
            function n(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for(var r = 0, n = new Array(e); r < e; r++)n[r] = t[r];
                return n;
            }
            function o(t, e) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) {
                    var r = [], n = !0, o = !1, a = void 0;
                    try {
                        for(var i, u = t[Symbol.iterator](); !(n = (i = u.next()).done) && (r.push(i.value), !e || r.length !== e); n = !0);
                    } catch (f) {
                        o = !0, a = f;
                    } finally{
                        try {
                            n || null == u.return || u.return();
                        } finally{
                            if (o) throw a;
                        }
                    }
                    return r;
                }
            }
            function a(t) {
                if (Array.isArray(t)) return t;
            }
            function i(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }
            function u(t, e) {
                for(var r = 0; r < e.length; r++){
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
                }
            }
            function f(t, e, r) {
                return e && u(t.prototype, e), r && u(t, r), t;
            }
            var c = function() {
                function e() {
                    i(this, e), this._left = [], this._right = [];
                }
                return f(e, [
                    {
                        key: "left",
                        value: function(t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                            this._left.push([
                                t,
                                e
                            ]);
                        }
                    },
                    {
                        key: "right",
                        value: function(t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                            this._right.push([
                                t,
                                e
                            ]);
                        }
                    },
                    {
                        key: "format",
                        value: function() {
                            var r = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], n = t(e.getRangeValue(this._left, r), 2), o = n[0], a = n[1], i = t(e.getRangeValue(this._right, !r), 2), u = i[0], f = i[1];
                            if (!Number.isFinite(o) && !Number.isFinite(u)) return "";
                            var c = a ? o + 1 : o;
                            return c === (f ? u - 1 : u) ? "should be ".concat(r ? "" : "!", "= ").concat(c) : Number.isFinite(o) && !Number.isFinite(u) ? e.formatLeft(o, r, a) : !Number.isFinite(o) && Number.isFinite(u) ? e.formatRight(u, r, f) : e.formatRange(o, u, a, f, r);
                        }
                    }
                ], [
                    {
                        key: "getOperator",
                        value: function(t, e) {
                            return "left" === t ? e ? ">" : ">=" : e ? "<" : "<=";
                        }
                    },
                    {
                        key: "formatRight",
                        value: function(t, r, n) {
                            return !1 === r ? e.formatLeft(t, !r, !n) : "should be ".concat(e.getOperator("right", n), " ").concat(t);
                        }
                    },
                    {
                        key: "formatLeft",
                        value: function(t, r, n) {
                            return !1 === r ? e.formatRight(t, !r, !n) : "should be ".concat(e.getOperator("left", n), " ").concat(t);
                        }
                    },
                    {
                        key: "formatRange",
                        value: function(t, r, n, o, a) {
                            var i = "should be";
                            return i += " ".concat(e.getOperator(a ? "left" : "right", a ? n : !n), " ").concat(t, " "), i += a ? "and" : "or", i += " ".concat(e.getOperator(a ? "right" : "left", a ? o : !o), " ").concat(r);
                        }
                    },
                    {
                        key: "getRangeValue",
                        value: function(e, r) {
                            for(var n = r ? 1 / 0 : -1 / 0, o = -1, a = r ? function(e) {
                                return t(e, 1)[0] <= n;
                            } : function(e) {
                                return t(e, 1)[0] >= n;
                            }, i = 0; i < e.length; i++)if (a(e[i])) {
                                var u = t(e[i], 1);
                                n = u[0], o = i;
                            }
                            return o > -1 ? e[o] : [
                                1 / 0,
                                !0
                            ];
                        }
                    }
                ]), e;
            }();
            module1.exports = c;
        },
        {}
    ],
    "SqDh": [
        function(require1, module1, exports) {
            "use strict";
            function t(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    e && (r = r.filter(function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable;
                    })), n.push.apply(n, r);
                }
                return n;
            }
            function e(e) {
                for(var r = 1; r < arguments.length; r++){
                    var m = null != arguments[r] ? arguments[r] : {};
                    r % 2 ? t(Object(m), !0).forEach(function(t) {
                        n(e, t, m[t]);
                    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(m)) : t(Object(m)).forEach(function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(m, t));
                    });
                }
                return e;
            }
            function n(t, e, n) {
                return e in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t;
            }
            var r = require1("./Range");
            module1.exports.stringHints = function(t, n) {
                var r = [], m = "string", i = e({}, t);
                if (!n) {
                    var o = i.minLength, u = i.formatMinimum, a = i.formatExclusiveMaximum;
                    i.minLength = i.maxLength, i.maxLength = o, i.formatMinimum = i.formatMaximum, i.formatMaximum = u, i.formatExclusiveMaximum = !i.formatExclusiveMinimum, i.formatExclusiveMinimum = !a;
                }
                if ("number" == typeof i.minLength) {
                    if (1 === i.minLength) m = "non-empty string";
                    else {
                        var c = Math.max(i.minLength - 1, 0);
                        r.push("should be longer than ".concat(c, " character").concat(c > 1 ? "s" : ""));
                    }
                }
                if ("number" == typeof i.maxLength) {
                    if (0 === i.maxLength) m = "empty string";
                    else {
                        var f = i.maxLength + 1;
                        r.push("should be shorter than ".concat(f, " character").concat(f > 1 ? "s" : ""));
                    }
                }
                return i.pattern && r.push("should".concat(n ? "" : " not", " match pattern ").concat(JSON.stringify(i.pattern))), i.format && r.push("should".concat(n ? "" : " not", " match format ").concat(JSON.stringify(i.format))), i.formatMinimum && r.push("should be ".concat(i.formatExclusiveMinimum ? ">" : ">=", " ").concat(JSON.stringify(i.formatMinimum))), i.formatMaximum && r.push("should be ".concat(i.formatExclusiveMaximum ? "<" : "<=", " ").concat(JSON.stringify(i.formatMaximum))), [
                    m
                ].concat(r);
            }, module1.exports.numberHints = function(t, e) {
                var n = [
                    "integer" === t.type ? "integer" : "number"
                ], m = new r;
                "number" == typeof t.minimum && m.left(t.minimum), "number" == typeof t.exclusiveMinimum && m.left(t.exclusiveMinimum, !0), "number" == typeof t.maximum && m.right(t.maximum), "number" == typeof t.exclusiveMaximum && m.right(t.exclusiveMaximum, !0);
                var i = m.format(e);
                return i && n.push(i), "number" == typeof t.multipleOf && n.push("should".concat(e ? "" : " not", " be multiple of ").concat(t.multipleOf)), n;
            };
        },
        {
            "./Range": "GNtl"
        }
    ],
    "ySUA": [
        function(require1, module1, exports) {
            "use strict";
            function t(t) {
                return n(t) || r(t) || i(t) || e();
            }
            function e() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            function n(t) {
                if (Array.isArray(t)) return s(t);
            }
            function a(t) {
                return m(t) || r(t) || i(t) || c();
            }
            function r(t) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
            }
            function o(t, e) {
                return m(t) || u(t, e) || i(t, e) || c();
            }
            function c() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            function i(t, e) {
                if (t) {
                    if ("string" == typeof t) return s(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? s(t, e) : void 0;
                }
            }
            function s(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for(var n = 0, a = new Array(e); n < e; n++)a[n] = t[n];
                return a;
            }
            function u(t, e) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) {
                    var n = [], a = !0, r = !1, o = void 0;
                    try {
                        for(var c, i = t[Symbol.iterator](); !(a = (c = i.next()).done) && (n.push(c.value), !e || n.length !== e); a = !0);
                    } catch (s) {
                        r = !0, o = s;
                    } finally{
                        try {
                            a || null == i.return || i.return();
                        } finally{
                            if (r) throw o;
                        }
                    }
                    return n;
                }
            }
            function m(t) {
                if (Array.isArray(t)) return t;
            }
            function h(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }
            function p(t, e) {
                for(var n = 0; n < e.length; n++){
                    var a = e[n];
                    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a);
                }
            }
            function l(t, e, n) {
                return e && p(t.prototype, e), n && p(t, n), t;
            }
            function f(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), e && x(t, e);
            }
            function d(t) {
                return function() {
                    var e, n = O(t);
                    if (S()) {
                        var a = O(this).constructor;
                        e = Reflect.construct(n, arguments, a);
                    } else e = n.apply(this, arguments);
                    return y(this, e);
                };
            }
            function y(t, e) {
                return !e || "object" !== j(e) && "function" != typeof e ? v(t) : e;
            }
            function v(t) {
                if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t;
            }
            function g(t) {
                var e = "function" == typeof Map ? new Map : void 0;
                return (g = function(t) {
                    if (null === t || !P(t)) return t;
                    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
                    if (void 0 !== e) {
                        if (e.has(t)) return e.get(t);
                        e.set(t, n);
                    }
                    function n() {
                        return b(t, arguments, O(this).constructor);
                    }
                    return n.prototype = Object.create(t.prototype, {
                        constructor: {
                            value: n,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), x(n, t);
                })(t);
            }
            function b(t, e, n) {
                return (b = S() ? Reflect.construct : function(t, e, n) {
                    var a = [
                        null
                    ];
                    a.push.apply(a, e);
                    var r = new (Function.bind.apply(t, a));
                    return n && x(r, n.prototype), r;
                }).apply(null, arguments);
            }
            function S() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0;
                } catch (t) {
                    return !1;
                }
            }
            function P(t) {
                return -1 !== Function.toString.call(t).indexOf("[native code]");
            }
            function x(t, e) {
                return (x = Object.setPrototypeOf || function(t, e) {
                    return t.__proto__ = e, t;
                })(t, e);
            }
            function O(t) {
                return (O = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                    return t.__proto__ || Object.getPrototypeOf(t);
                })(t);
            }
            function j(t) {
                return (j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                    return typeof t;
                } : function(t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                })(t);
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.default = void 0;
            var w = require1("./util/hints"), D = w.stringHints, I = w.numberHints, T = {
                type: 1,
                not: 1,
                oneOf: 1,
                anyOf: 1,
                if: 1,
                enum: 1,
                const: 1,
                instanceof: 1,
                required: 2,
                pattern: 2,
                patternRequired: 2,
                format: 2,
                formatMinimum: 2,
                formatMaximum: 2,
                minimum: 2,
                exclusiveMinimum: 2,
                maximum: 2,
                exclusiveMaximum: 2,
                multipleOf: 2,
                uniqueItems: 2,
                contains: 2,
                minLength: 2,
                maxLength: 2,
                minItems: 2,
                maxItems: 2,
                minProperties: 2,
                maxProperties: 2,
                dependencies: 2,
                propertyNames: 2,
                additionalItems: 2,
                additionalProperties: 2,
                absolutePath: 2
            };
            function k(t, e) {
                var n = t.reduce(function(t, n) {
                    return Math.max(t, e(n));
                }, 0);
                return t.filter(function(t) {
                    return e(t) === n;
                });
            }
            function A(t) {
                var e = t;
                return e = k(e, function(t) {
                    return t.dataPath ? t.dataPath.length : 0;
                }), e = k(e, function(t) {
                    return T[t.keyword] || 2;
                });
            }
            function N(t, e) {
                for(var n = t.length - 1, a = function(e) {
                    return 0 !== t[n].schemaPath.indexOf(e);
                }; n > -1 && !e.every(a);)if ("anyOf" === t[n].keyword || "oneOf" === t[n].keyword) {
                    var r = M(t[n]), o = N(t.slice(0, n), r.concat(t[n].schemaPath));
                    n = o - 1;
                } else n -= 1;
                return n + 1;
            }
            function M(t) {
                var e = t.schema;
                return Array.isArray(e) ? e.map(function(t) {
                    return t.$ref;
                }).filter(function(t) {
                    return t;
                }) : [];
            }
            function E(t) {
                for(var e = [], n = t.length - 1; n > 0;){
                    var a = t[n];
                    if ("anyOf" === a.keyword || "oneOf" === a.keyword) {
                        var r = M(a), o = N(t.slice(0, n), r.concat(a.schemaPath));
                        o !== n ? (e.push(Object.assign({}, a, {
                            children: t.slice(o, n)
                        })), n = o) : e.push(a);
                    } else e.push(a);
                    n -= 1;
                }
                return 0 === n && e.push(t[n]), e.reverse();
            }
            function q(t, e) {
                return t.replace(/\n(?!$)/g, "\n".concat(e));
            }
            function R(t) {
                return !!t.not;
            }
            function J(t) {
                return R(t) ? J(t.not) : t;
            }
            function $(t) {
                var e = J(t);
                return V(e) || F(e) || L(e) || z(e) || B(e);
            }
            function _(t) {
                return "object" === j(t) && null !== t;
            }
            function V(t) {
                return "number" === t.type || void 0 !== t.minimum || void 0 !== t.exclusiveMinimum || void 0 !== t.maximum || void 0 !== t.exclusiveMaximum || void 0 !== t.multipleOf;
            }
            function F(t) {
                return "integer" === t.type || void 0 !== t.minimum || void 0 !== t.exclusiveMinimum || void 0 !== t.maximum || void 0 !== t.exclusiveMaximum || void 0 !== t.multipleOf;
            }
            function L(t) {
                return "string" === t.type || void 0 !== t.minLength || void 0 !== t.maxLength || void 0 !== t.pattern || void 0 !== t.format || void 0 !== t.formatMinimum || void 0 !== t.formatMaximum;
            }
            function B(t) {
                return "boolean" === t.type;
            }
            function C(t) {
                return "array" === t.type || "number" == typeof t.minItems || "number" == typeof t.maxItems || void 0 !== t.uniqueItems || void 0 !== t.items || void 0 !== t.additionalItems || void 0 !== t.contains;
            }
            function H(t) {
                return "object" === t.type || void 0 !== t.minProperties || void 0 !== t.maxProperties || void 0 !== t.required || void 0 !== t.properties || void 0 !== t.patternProperties || void 0 !== t.additionalProperties || void 0 !== t.dependencies || void 0 !== t.propertyNames || void 0 !== t.patternRequired;
            }
            function z(t) {
                return "null" === t.type;
            }
            function K(t) {
                return /^[aeiou]/i.test(t) ? "an" : "a";
            }
            function U(t) {
                if (!t) return "";
                if (!t.type) {
                    if (V(t) || F(t)) return " | should be any non-number";
                    if (L(t)) return " | should be any non-string";
                    if (C(t)) return " | should be any non-array";
                    if (H(t)) return " | should be any non-object";
                }
                return "";
            }
            function G(t) {
                return t.length > 0 ? "(".concat(t.join(", "), ")") : "";
            }
            function Q(t, e) {
                return V(t) || F(t) ? I(t, e) : L(t) ? D(t, e) : [];
            }
            var W = function(e) {
                f(r, g(Error));
                var n = d(r);
                function r(t, e) {
                    var a, c, i, s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    if (h(this, r), (a = n.call(this)).name = "ValidationError", a.errors = t, a.schema = e, e.title && (!s.name || !s.baseDataPath)) {
                        var u = e.title.match(/^(.+) (.+)$/);
                        if (u) {
                            if (!s.name) c = o(u, 2)[1];
                            if (!s.baseDataPath) i = o(u, 3)[2];
                        }
                    }
                    a.headerName = s.name || c || "Object", a.baseDataPath = s.baseDataPath || i || "configuration", a.postFormatter = s.postFormatter || null;
                    var m = "Invalid ".concat(a.baseDataPath, " object. ").concat(a.headerName, " has been initialized using ").concat(K(a.baseDataPath), " ").concat(a.baseDataPath, " object that does not match the API schema.\n");
                    return a.message = "".concat(m).concat(a.formatValidationErrors(t)), Error.captureStackTrace(v(a), a.constructor), a;
                }
                return l(r, [
                    {
                        key: "getSchemaPart",
                        value: function(t) {
                            for(var e = t.split("/"), n = this.schema, a = 1; a < e.length; a++){
                                var r = n[e[a]];
                                if (!r) break;
                                n = r;
                            }
                            return n;
                        }
                    },
                    {
                        key: "formatSchema",
                        value: function(e) {
                            var n = this, r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], c = r, i = function(t, a) {
                                return a ? o.includes(t) ? "(recursive)" : n.formatSchema(t, c, o.concat(e)) : n.formatSchema(t, c, o);
                            };
                            if (R(e) && !H(e)) {
                                if ($(e.not)) return c = !r, i(e.not);
                                var s = !e.not.not;
                                return c = !r, s ? (r ? "" : "non ") + i(e.not) : i(e.not);
                            }
                            if (e.instanceof) {
                                var u = e.instanceof;
                                return (Array.isArray(u) ? u : [
                                    u
                                ]).map(function(t) {
                                    return "Function" === t ? "function" : t;
                                }).join(" | ");
                            }
                            if (e.enum) return e.enum.map(function(t) {
                                return JSON.stringify(t);
                            }).join(" | ");
                            if (void 0 !== e.const) return JSON.stringify(e.const);
                            if (e.oneOf) return e.oneOf.map(function(t) {
                                return i(t, !0);
                            }).join(" | ");
                            if (e.anyOf) return e.anyOf.map(function(t) {
                                return i(t, !0);
                            }).join(" | ");
                            if (e.allOf) return e.allOf.map(function(t) {
                                return i(t, !0);
                            }).join(" & ");
                            if (e.if) {
                                var m = e.if, h = e.then, p = e.else;
                                return "".concat(m ? "if ".concat(i(m)) : "").concat(h ? " then ".concat(i(h)) : "").concat(p ? " else ".concat(i(p)) : "");
                            }
                            if (e.$ref) return i(this.getSchemaPart(e.$ref), !0);
                            if (V(e) || F(e)) {
                                var l = a(Q(e, r)), f = l[0], d = l.slice(1), y = "".concat(f).concat(d.length > 0 ? " ".concat(G(d)) : "");
                                return r ? y : d.length > 0 ? "non-".concat(f, " | ").concat(y) : "non-".concat(f);
                            }
                            if (L(e)) {
                                var v = a(Q(e, r)), g = v[0], b = v.slice(1), S = "".concat(g).concat(b.length > 0 ? " ".concat(G(b)) : "");
                                return r ? S : "string" === S ? "non-string" : "non-string | ".concat(S);
                            }
                            if (B(e)) return "".concat(r ? "" : "non-", "boolean");
                            if (C(e)) {
                                c = !0;
                                var P = [];
                                "number" == typeof e.minItems && P.push("should not have fewer than ".concat(e.minItems, " item").concat(e.minItems > 1 ? "s" : "")), "number" == typeof e.maxItems && P.push("should not have more than ".concat(e.maxItems, " item").concat(e.maxItems > 1 ? "s" : "")), e.uniqueItems && P.push("should not have duplicate items");
                                var x = void 0 === e.additionalItems || Boolean(e.additionalItems), O = "";
                                return e.items ? Array.isArray(e.items) && e.items.length > 0 ? (O = "".concat(e.items.map(function(t) {
                                    return i(t);
                                }).join(", ")), x && e.additionalItems && _(e.additionalItems) && Object.keys(e.additionalItems).length > 0 && P.push("additional items should be ".concat(i(e.additionalItems)))) : O = e.items && Object.keys(e.items).length > 0 ? "".concat(i(e.items)) : "any" : O = "any", e.contains && Object.keys(e.contains).length > 0 && P.push("should contains at least one ".concat(this.formatSchema(e.contains), " item")), "[".concat(O).concat(x ? ", ..." : "", "]").concat(P.length > 0 ? " (".concat(P.join(", "), ")") : "");
                            }
                            if (H(e)) {
                                c = !0;
                                var j = [];
                                if ("number" == typeof e.minProperties && j.push("should not have fewer than ".concat(e.minProperties, " ").concat(e.minProperties > 1 ? "properties" : "property")), "number" == typeof e.maxProperties && j.push("should not have more than ".concat(e.maxProperties, " ").concat(e.minProperties && e.minProperties > 1 ? "properties" : "property")), e.patternProperties && Object.keys(e.patternProperties).length > 0) {
                                    var w = Object.keys(e.patternProperties);
                                    j.push("additional property names should match pattern".concat(w.length > 1 ? "s" : "", " ").concat(w.map(function(t) {
                                        return JSON.stringify(t);
                                    }).join(" | ")));
                                }
                                var D = e.properties ? Object.keys(e.properties) : [], I = e.required ? e.required : [], T = t(new Set([].concat(I).concat(D))).map(function(t) {
                                    var e = I.includes(t);
                                    return "".concat(t).concat(e ? "" : "?");
                                }).concat(void 0 === e.additionalProperties || Boolean(e.additionalProperties) ? e.additionalProperties && _(e.additionalProperties) ? [
                                    "<key>: ".concat(i(e.additionalProperties))
                                ] : [
                                    "…"
                                ] : []).join(", "), k = e.dependencies, A = e.propertyNames, N = e.patternRequired;
                                return k && Object.keys(k).forEach(function(t) {
                                    var e = k[t];
                                    Array.isArray(e) ? j.push("should have ".concat(e.length > 1 ? "properties" : "property", " ").concat(e.map(function(t) {
                                        return "'".concat(t, "'");
                                    }).join(", "), " when property '").concat(t, "' is present")) : j.push("should be valid according to the schema ".concat(i(e), " when property '").concat(t, "' is present"));
                                }), A && Object.keys(A).length > 0 && j.push("each property name should match format ".concat(JSON.stringify(e.propertyNames.format))), N && N.length > 0 && j.push("should have property matching pattern ".concat(N.map(function(t) {
                                    return JSON.stringify(t);
                                }))), "object {".concat(T ? " ".concat(T, " ") : "", "}").concat(j.length > 0 ? " (".concat(j.join(", "), ")") : "");
                            }
                            return z(e) ? "".concat(r ? "" : "non-", "null") : Array.isArray(e.type) ? "".concat(e.type.join(" | ")) : JSON.stringify(e, null, 2);
                        }
                    },
                    {
                        key: "getSchemaPartText",
                        value: function(t, e) {
                            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], a = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
                            if (!t) return "";
                            if (Array.isArray(e)) for(var r = 0; r < e.length; r++){
                                var o = t[e[r]];
                                if (!o) break;
                                t = o;
                            }
                            for(; t.$ref;)t = this.getSchemaPart(t.$ref);
                            var c = "".concat(this.formatSchema(t, a)).concat(n ? "." : "");
                            return t.description && (c += "\n-> ".concat(t.description)), t.link && (c += "\n-> Read more at ".concat(t.link)), c;
                        }
                    },
                    {
                        key: "getSchemaPartDescription",
                        value: function(t) {
                            if (!t) return "";
                            for(; t.$ref;)t = this.getSchemaPart(t.$ref);
                            var e = "";
                            return t.description && (e += "\n-> ".concat(t.description)), t.link && (e += "\n-> Read more at ".concat(t.link)), e;
                        }
                    },
                    {
                        key: "formatValidationError",
                        value: function(t) {
                            var e = this, n = t.keyword, r = t.dataPath, o = "".concat(this.baseDataPath).concat(r);
                            switch(n){
                                case "type":
                                    var c = t.parentSchema;
                                    switch(t.params.type){
                                        case "number":
                                            return "".concat(o, " should be a ").concat(this.getSchemaPartText(c, !1, !0));
                                        case "integer":
                                            return "".concat(o, " should be an ").concat(this.getSchemaPartText(c, !1, !0));
                                        case "string":
                                        case "boolean":
                                            return "".concat(o, " should be a ").concat(this.getSchemaPartText(c, !1, !0));
                                        case "array":
                                            return "".concat(o, " should be an array:\n").concat(this.getSchemaPartText(c));
                                        case "object":
                                            return "".concat(o, " should be an object:\n").concat(this.getSchemaPartText(c));
                                        case "null":
                                            return "".concat(o, " should be a ").concat(this.getSchemaPartText(c, !1, !0));
                                        default:
                                            return "".concat(o, " should be:\n").concat(this.getSchemaPartText(c));
                                    }
                                case "instanceof":
                                    var i = t.parentSchema;
                                    return "".concat(o, " should be an instance of ").concat(this.getSchemaPartText(i, !1, !0));
                                case "pattern":
                                    var s = t.params, u = t.parentSchema, m = s.pattern;
                                    return "".concat(o, " should match pattern ").concat(JSON.stringify(m)).concat(U(u), ".").concat(this.getSchemaPartDescription(u));
                                case "format":
                                    var h = t.params, p = t.parentSchema, l = h.format;
                                    return "".concat(o, " should match format ").concat(JSON.stringify(l)).concat(U(p), ".").concat(this.getSchemaPartDescription(p));
                                case "formatMinimum":
                                case "formatMaximum":
                                    var f = t.params, d = t.parentSchema, y = f.comparison, v = f.limit;
                                    return "".concat(o, " should be ").concat(y, " ").concat(JSON.stringify(v)).concat(U(d), ".").concat(this.getSchemaPartDescription(d));
                                case "minimum":
                                case "maximum":
                                case "exclusiveMinimum":
                                case "exclusiveMaximum":
                                    var g = t.parentSchema, b = t.params, S = b.comparison, P = b.limit, x = a(Q(g, !0)).slice(1);
                                    return 0 === x.length && x.push("should be ".concat(S, " ").concat(P)), "".concat(o, " ").concat(x.join(" ")).concat(U(g), ".").concat(this.getSchemaPartDescription(g));
                                case "multipleOf":
                                    var O = t.params, j = t.parentSchema, w = O.multipleOf;
                                    return "".concat(o, " should be multiple of ").concat(w).concat(U(j), ".").concat(this.getSchemaPartDescription(j));
                                case "patternRequired":
                                    var D = t.params, I = t.parentSchema, T = D.missingPattern;
                                    return "".concat(o, " should have property matching pattern ").concat(JSON.stringify(T)).concat(U(I), ".").concat(this.getSchemaPartDescription(I));
                                case "minLength":
                                    var k = t.params, N = t.parentSchema, M = k.limit;
                                    if (1 === M) return "".concat(o, " should be a non-empty string").concat(U(N), ".").concat(this.getSchemaPartDescription(N));
                                    var R = M - 1;
                                    return "".concat(o, " should be longer than ").concat(R, " character").concat(R > 1 ? "s" : "").concat(U(N), ".").concat(this.getSchemaPartDescription(N));
                                case "minItems":
                                    var J = t.params, _ = t.parentSchema, V = J.limit;
                                    return 1 === V ? "".concat(o, " should be a non-empty array").concat(U(_), ".").concat(this.getSchemaPartDescription(_)) : "".concat(o, " should not have fewer than ").concat(V, " items").concat(U(_), ".").concat(this.getSchemaPartDescription(_));
                                case "minProperties":
                                    var F = t.params, L = t.parentSchema, B = F.limit;
                                    return 1 === B ? "".concat(o, " should be a non-empty object").concat(U(L), ".").concat(this.getSchemaPartDescription(L)) : "".concat(o, " should not have fewer than ").concat(B, " properties").concat(U(L), ".").concat(this.getSchemaPartDescription(L));
                                case "maxLength":
                                    var C = t.params, z = t.parentSchema, K = C.limit + 1;
                                    return "".concat(o, " should be shorter than ").concat(K, " character").concat(K > 1 ? "s" : "").concat(U(z), ".").concat(this.getSchemaPartDescription(z));
                                case "maxItems":
                                    var G = t.params, W = t.parentSchema, X = G.limit;
                                    return "".concat(o, " should not have more than ").concat(X, " items").concat(U(W), ".").concat(this.getSchemaPartDescription(W));
                                case "maxProperties":
                                    var Y = t.params, Z = t.parentSchema, tt = Y.limit;
                                    return "".concat(o, " should not have more than ").concat(tt, " properties").concat(U(Z), ".").concat(this.getSchemaPartDescription(Z));
                                case "uniqueItems":
                                    var et = t.params, nt = t.parentSchema, at = et.i;
                                    return "".concat(o, " should not contain the item '").concat(t.data[at], "' twice").concat(U(nt), ".").concat(this.getSchemaPartDescription(nt));
                                case "additionalItems":
                                    var rt = t.params, ot = t.parentSchema, ct = rt.limit;
                                    return "".concat(o, " should not have more than ").concat(ct, " items").concat(U(ot), ". These items are valid:\n").concat(this.getSchemaPartText(ot));
                                case "contains":
                                    var it = t.parentSchema;
                                    return "".concat(o, " should contains at least one ").concat(this.getSchemaPartText(it, [
                                        "contains"
                                    ]), " item").concat(U(it), ".");
                                case "required":
                                    var st = t.parentSchema, ut = t.params.missingProperty.replace(/^\./, ""), mt = st && Boolean(st.properties && st.properties[ut]);
                                    return "".concat(o, " misses the property '").concat(ut, "'").concat(U(st), ".").concat(mt ? " Should be:\n".concat(this.getSchemaPartText(st, [
                                        "properties",
                                        ut
                                    ])) : this.getSchemaPartDescription(st));
                                case "additionalProperties":
                                    var ht = t.params, pt = t.parentSchema, lt = ht.additionalProperty;
                                    return "".concat(o, " has an unknown property '").concat(lt, "'").concat(U(pt), ". These properties are valid:\n").concat(this.getSchemaPartText(pt));
                                case "dependencies":
                                    var ft = t.params, dt = t.parentSchema, yt = ft.property, vt = ft.deps.split(",").map(function(t) {
                                        return "'".concat(t.trim(), "'");
                                    }).join(", ");
                                    return "".concat(o, " should have properties ").concat(vt, " when property '").concat(yt, "' is present").concat(U(dt), ".").concat(this.getSchemaPartDescription(dt));
                                case "propertyNames":
                                    var gt = t.params, bt = t.parentSchema, St = t.schema, Pt = gt.propertyName;
                                    return "".concat(o, " property name '").concat(Pt, "' is invalid").concat(U(bt), ". Property names should be match format ").concat(JSON.stringify(St.format), ".").concat(this.getSchemaPartDescription(bt));
                                case "enum":
                                    var xt = t.parentSchema;
                                    return xt && xt.enum && 1 === xt.enum.length ? "".concat(o, " should be ").concat(this.getSchemaPartText(xt, !1, !0)) : "".concat(o, " should be one of these:\n").concat(this.getSchemaPartText(xt));
                                case "const":
                                    var Ot = t.parentSchema;
                                    return "".concat(o, " should be equal to constant ").concat(this.getSchemaPartText(Ot, !1, !0));
                                case "not":
                                    var jt = H(t.parentSchema) ? "\n".concat(this.getSchemaPartText(t.parentSchema)) : "", wt = this.getSchemaPartText(t.schema, !1, !1, !1);
                                    if ($(t.schema)) return "".concat(o, " should be any ").concat(wt).concat(jt, ".");
                                    var Dt = t.schema, It = t.parentSchema;
                                    return "".concat(o, " should not be ").concat(this.getSchemaPartText(Dt, !1, !0)).concat(It && H(It) ? "\n".concat(this.getSchemaPartText(It)) : "");
                                case "oneOf":
                                case "anyOf":
                                    var Tt = t.parentSchema, kt = t.children;
                                    if (kt && kt.length > 0) {
                                        if (1 === t.schema.length) {
                                            var At = kt[kt.length - 1], Nt = kt.slice(0, kt.length - 1);
                                            return this.formatValidationError(Object.assign({}, At, {
                                                children: Nt,
                                                parentSchema: Object.assign({}, Tt, At.parentSchema)
                                            }));
                                        }
                                        var Mt = A(kt);
                                        return 1 === Mt.length ? this.formatValidationError(Mt[0]) : (Mt = E(Mt), "".concat(o, " should be one of these:\n").concat(this.getSchemaPartText(Tt), "\nDetails:\n").concat(Mt.map(function(t) {
                                            return " * ".concat(q(e.formatValidationError(t), "   "));
                                        }).join("\n")));
                                    }
                                    return "".concat(o, " should be one of these:\n").concat(this.getSchemaPartText(Tt));
                                case "if":
                                    var Et = t.params, qt = t.parentSchema, Rt = Et.failingKeyword;
                                    return "".concat(o, ' should match "').concat(Rt, '" schema:\n').concat(this.getSchemaPartText(qt, [
                                        Rt
                                    ]));
                                case "absolutePath":
                                    var Jt = t.message, $t = t.parentSchema;
                                    return "".concat(o, ": ").concat(Jt).concat(this.getSchemaPartDescription($t));
                                default:
                                    var _t = t.message, Vt = t.parentSchema, Ft = JSON.stringify(t, null, 2);
                                    return "".concat(o, " ").concat(_t, " (").concat(Ft, ").\n").concat(this.getSchemaPartText(Vt, !1));
                            }
                        }
                    },
                    {
                        key: "formatValidationErrors",
                        value: function(t) {
                            var e = this;
                            return t.map(function(t) {
                                var n = e.formatValidationError(t);
                                return e.postFormatter && (n = e.postFormatter(n, t)), " - ".concat(q(n, "   "));
                            }).join("\n");
                        }
                    }
                ]), r;
            }(), X = W;
            exports.default = X;
        },
        {
            "./util/hints": "SqDh"
        }
    ],
    "wWOq": [
        function(require1, module1, exports) {
            var define;
            var global = arguments[3];
            var e, r = arguments[3];
            !function(r, t) {
                "object" == typeof exports && "undefined" != typeof module1 ? t(exports) : "function" == typeof e && e.amd ? e([
                    "exports"
                ], t) : t(r.URI = r.URI || {});
            }(this, function(e) {
                "use strict";
                function r() {
                    for(var e = arguments.length, r = Array(e), t = 0; t < e; t++)r[t] = arguments[t];
                    if (r.length > 1) {
                        r[0] = r[0].slice(0, -1);
                        for(var n = r.length - 1, o = 1; o < n; ++o)r[o] = r[o].slice(1, -1);
                        return r[n] = r[n].slice(1), r.join("");
                    }
                    return r[0];
                }
                function t(e) {
                    return "(?:" + e + ")";
                }
                function n(e) {
                    return void 0 === e ? "undefined" : null === e ? "null" : Object.prototype.toString.call(e).split(" ").pop().split("]").shift().toLowerCase();
                }
                function o(e) {
                    return e.toUpperCase();
                }
                function a(e) {
                    var n = r("[0-9]", "[A-Fa-f]"), o = t(t("%[EFef]" + n + "%" + n + n + "%" + n + n) + "|" + t("%[89A-Fa-f]" + n + "%" + n + n) + "|" + t("%" + n + n)), a = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]", i = r("[\\:\\/\\?\\#\\[\\]\\@]", a), s = e ? "[\\uE000-\\uF8FF]" : "[]", u = r("[A-Za-z]", "[0-9]", "[\\-\\.\\_\\~]", e ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]"), c = t("[A-Za-z]" + r("[A-Za-z]", "[0-9]", "[\\+\\-\\.]") + "*"), p = t(t(o + "|" + r(u, a, "[\\:]")) + "*"), h = (t(t("25[0-5]") + "|" + t("2[0-4][0-9]") + "|" + t("1[0-9][0-9]") + "|" + t("[1-9][0-9]") + "|[0-9]"), t(t("25[0-5]") + "|" + t("2[0-4][0-9]") + "|" + t("1[0-9][0-9]") + "|" + t("0?[1-9][0-9]") + "|0?0?[0-9]")), f = t(h + "\\." + h + "\\." + h + "\\." + h), l = t(n + "{1,4}"), v = t(t(l + "\\:" + l) + "|" + f), d = t(t(l + "\\:") + "{6}" + v), g = t("\\:\\:" + t(l + "\\:") + "{5}" + v), m = t(t(l) + "?\\:\\:" + t(l + "\\:") + "{4}" + v), E = t(t(t(l + "\\:") + "{0,1}" + l) + "?\\:\\:" + t(l + "\\:") + "{3}" + v), C = t(t(t(l + "\\:") + "{0,2}" + l) + "?\\:\\:" + t(l + "\\:") + "{2}" + v), y = t(t(t(l + "\\:") + "{0,3}" + l) + "?\\:\\:" + l + "\\:" + v), S = t(t(t(l + "\\:") + "{0,4}" + l) + "?\\:\\:" + v), A = t(t(t(l + "\\:") + "{0,5}" + l) + "?\\:\\:" + l), D = t(t(t(l + "\\:") + "{0,6}" + l) + "?\\:\\:"), w = t([
                        d,
                        g,
                        m,
                        E,
                        C,
                        y,
                        S,
                        A,
                        D
                    ].join("|")), b = t(t(u + "|" + o) + "+"), x = (t(w + "\\%25" + b), t(w + t("\\%25|\\%(?!" + n + "{2})") + b)), O = t("[vV]" + n + "+\\." + r(u, a, "[\\:]") + "+"), I = t("\\[" + t(x + "|" + w + "|" + O) + "\\]"), F = t(t(o + "|" + r(u, a)) + "*"), N = t(I + "|" + f + "(?!" + F + ")|" + F), R = t("[0-9]*"), T = t(t(p + "@") + "?" + N + t("\\:" + R) + "?"), _ = t(o + "|" + r(u, a, "[\\:\\@]")), P = t(_ + "*"), U = t(_ + "+"), j = t(t(o + "|" + r(u, a, "[\\@]")) + "+"), q = t(t("\\/" + P) + "*"), H = t("\\/" + t(U + q) + "?"), z = t(j + q), L = t(U + q), $ = "(?!" + _ + ")", V = (t(q + "|" + H + "|" + z + "|" + L + "|" + $), t(t(_ + "|" + r("[\\/\\?]", s)) + "*")), M = t(t(_ + "|[\\/\\?]") + "*"), Z = t(t("\\/\\/" + T + q) + "|" + H + "|" + L + "|" + $), k = t(c + "\\:" + Z + t("\\?" + V) + "?" + t("\\#" + M) + "?"), G = t(t("\\/\\/" + T + q) + "|" + H + "|" + z + "|" + $), Q = t(G + t("\\?" + V) + "?" + t("\\#" + M) + "?");
                    t(k + "|" + Q), t(c + "\\:" + Z + t("\\?" + V) + "?"), t(t("\\/\\/(" + t("(" + p + ")@") + "?(" + N + ")" + t("\\:(" + R + ")") + "?)") + "?(" + q + "|" + H + "|" + L + "|" + $ + ")"), t("\\?(" + V + ")"), t("\\#(" + M + ")"), t(t("\\/\\/(" + t("(" + p + ")@") + "?(" + N + ")" + t("\\:(" + R + ")") + "?)") + "?(" + q + "|" + H + "|" + z + "|" + $ + ")"), t("\\?(" + V + ")"), t("\\#(" + M + ")"), t(t("\\/\\/(" + t("(" + p + ")@") + "?(" + N + ")" + t("\\:(" + R + ")") + "?)") + "?(" + q + "|" + H + "|" + L + "|" + $ + ")"), t("\\?(" + V + ")"), t("\\#(" + M + ")"), t("(" + p + ")@"), t("\\:(" + R + ")");
                    return {
                        NOT_SCHEME: new RegExp(r("[^]", "[A-Za-z]", "[0-9]", "[\\+\\-\\.]"), "g"),
                        NOT_USERINFO: new RegExp(r("[^\\%\\:]", u, a), "g"),
                        NOT_HOST: new RegExp(r("[^\\%\\[\\]\\:]", u, a), "g"),
                        NOT_PATH: new RegExp(r("[^\\%\\/\\:\\@]", u, a), "g"),
                        NOT_PATH_NOSCHEME: new RegExp(r("[^\\%\\/\\@]", u, a), "g"),
                        NOT_QUERY: new RegExp(r("[^\\%]", u, a, "[\\:\\@\\/\\?]", s), "g"),
                        NOT_FRAGMENT: new RegExp(r("[^\\%]", u, a, "[\\:\\@\\/\\?]"), "g"),
                        ESCAPE: new RegExp(r("[^]", u, a), "g"),
                        UNRESERVED: new RegExp(u, "g"),
                        OTHER_CHARS: new RegExp(r("[^\\%]", u, i), "g"),
                        PCT_ENCODED: new RegExp(o, "g"),
                        IPV4ADDRESS: new RegExp("^(" + f + ")$"),
                        IPV6ADDRESS: new RegExp("^\\[?(" + w + ")" + t(t("\\%25|\\%(?!" + n + "{2})") + "(" + b + ")") + "?\\]?$")
                    };
                }
                var i = a(!1), s = a(!0), u = function() {
                    return function(e, r) {
                        if (Array.isArray(e)) return e;
                        if (Symbol.iterator in Object(e)) return function(e, r) {
                            var t = [], n = !0, o = !1, a = void 0;
                            try {
                                for(var i, s = e[Symbol.iterator](); !(n = (i = s.next()).done) && (t.push(i.value), !r || t.length !== r); n = !0);
                            } catch (u) {
                                o = !0, a = u;
                            } finally{
                                try {
                                    !n && s.return && s.return();
                                } finally{
                                    if (o) throw a;
                                }
                            }
                            return t;
                        }(e, r);
                        throw new TypeError("Invalid attempt to destructure non-iterable instance");
                    };
                }(), c = 2147483647, p = /^xn--/, h = /[^\0-\x7E]/, f = /[\x2E\u3002\uFF0E\uFF61]/g, l = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input"
                }, v = Math.floor, d = String.fromCharCode;
                function g(e) {
                    throw new RangeError(l[e]);
                }
                function m(e, r) {
                    var t = e.split("@"), n = "";
                    t.length > 1 && (n = t[0] + "@", e = t[1]);
                    var o = (function(e, r) {
                        for(var t = [], n = e.length; n--;)t[n] = r(e[n]);
                        return t;
                    })((e = e.replace(f, ".")).split("."), r).join(".");
                    return n + o;
                }
                function E(e) {
                    for(var r = [], t = 0, n = e.length; t < n;){
                        var o = e.charCodeAt(t++);
                        if (o >= 55296 && o <= 56319 && t < n) {
                            var a = e.charCodeAt(t++);
                            56320 == (64512 & a) ? r.push(((1023 & o) << 10) + (1023 & a) + 65536) : (r.push(o), t--);
                        } else r.push(o);
                    }
                    return r;
                }
                var C = function(e, r) {
                    return e + 22 + 75 * (e < 26) - ((0 != r) << 5);
                }, y = function(e, r, t) {
                    var n = 0;
                    for(e = t ? v(e / 700) : e >> 1, e += v(e / r); e > 455; n += 36)e = v(e / 35);
                    return v(n + 36 * e / (e + 38));
                }, S = function(e) {
                    var r, t = [], n = e.length, o = 0, a = 128, i = 72, s = e.lastIndexOf("-");
                    s < 0 && (s = 0);
                    for(var u = 0; u < s; ++u)e.charCodeAt(u) >= 128 && g("not-basic"), t.push(e.charCodeAt(u));
                    for(var p = s > 0 ? s + 1 : 0; p < n;){
                        for(var h = o, f = 1, l = 36;; l += 36){
                            p >= n && g("invalid-input");
                            var d = (r = e.charCodeAt(p++)) - 48 < 10 ? r - 22 : r - 65 < 26 ? r - 65 : r - 97 < 26 ? r - 97 : 36;
                            (d >= 36 || d > v((c - o) / f)) && g("overflow"), o += d * f;
                            var m = l <= i ? 1 : l >= i + 26 ? 26 : l - i;
                            if (d < m) break;
                            var E = 36 - m;
                            f > v(c / E) && g("overflow"), f *= E;
                        }
                        var C = t.length + 1;
                        i = y(o - h, C, 0 == h), v(o / C) > c - a && g("overflow"), a += v(o / C), o %= C, t.splice(o++, 0, a);
                    }
                    return String.fromCodePoint.apply(String, t);
                }, A = function(e) {
                    var r = [], t = (e = E(e)).length, n = 128, o = 0, a = 72, i = !0, s = !1, u = void 0;
                    try {
                        for(var p, h = e[Symbol.iterator](); !(i = (p = h.next()).done); i = !0){
                            var f = p.value;
                            f < 128 && r.push(d(f));
                        }
                    } catch (L) {
                        s = !0, u = L;
                    } finally{
                        try {
                            !i && h.return && h.return();
                        } finally{
                            if (s) throw u;
                        }
                    }
                    var l = r.length, m = l;
                    for(l && r.push("-"); m < t;){
                        var S = c, A = !0, D = !1, w = void 0;
                        try {
                            for(var b, x = e[Symbol.iterator](); !(A = (b = x.next()).done); A = !0){
                                var O = b.value;
                                O >= n && O < S && (S = O);
                            }
                        } catch (L) {
                            D = !0, w = L;
                        } finally{
                            try {
                                !A && x.return && x.return();
                            } finally{
                                if (D) throw w;
                            }
                        }
                        var I = m + 1;
                        S - n > v((c - o) / I) && g("overflow"), o += (S - n) * I, n = S;
                        var F = !0, N = !1, R = void 0;
                        try {
                            for(var T, _ = e[Symbol.iterator](); !(F = (T = _.next()).done); F = !0){
                                var P = T.value;
                                if (P < n && ++o > c && g("overflow"), P == n) {
                                    for(var U = o, j = 36;; j += 36){
                                        var q = j <= a ? 1 : j >= a + 26 ? 26 : j - a;
                                        if (U < q) break;
                                        var H = U - q, z = 36 - q;
                                        r.push(d(C(q + H % z, 0))), U = v(H / z);
                                    }
                                    r.push(d(C(U, 0))), a = y(o, I, m == l), o = 0, ++m;
                                }
                            }
                        } catch (L) {
                            N = !0, R = L;
                        } finally{
                            try {
                                !F && _.return && _.return();
                            } finally{
                                if (N) throw R;
                            }
                        }
                        ++o, ++n;
                    }
                    return r.join("");
                }, D = {
                    version: "2.1.0",
                    ucs2: {
                        decode: E,
                        encode: function(e) {
                            return String.fromCodePoint.apply(String, function(e) {
                                if (Array.isArray(e)) {
                                    for(var r = 0, t = Array(e.length); r < e.length; r++)t[r] = e[r];
                                    return t;
                                }
                                return Array.from(e);
                            }(e));
                        }
                    },
                    decode: S,
                    encode: A,
                    toASCII: function(e) {
                        return m(e, function(e) {
                            return h.test(e) ? "xn--" + A(e) : e;
                        });
                    },
                    toUnicode: function(e) {
                        return m(e, function(e) {
                            return p.test(e) ? S(e.slice(4).toLowerCase()) : e;
                        });
                    }
                }, w = {};
                function b(e) {
                    var r = e.charCodeAt(0);
                    return r < 16 ? "%0" + r.toString(16).toUpperCase() : r < 128 ? "%" + r.toString(16).toUpperCase() : r < 2048 ? "%" + (r >> 6 | 192).toString(16).toUpperCase() + "%" + (63 & r | 128).toString(16).toUpperCase() : "%" + (r >> 12 | 224).toString(16).toUpperCase() + "%" + (r >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (63 & r | 128).toString(16).toUpperCase();
                }
                function x(e) {
                    for(var r = "", t = 0, n = e.length; t < n;){
                        var o = parseInt(e.substr(t + 1, 2), 16);
                        if (o < 128) r += String.fromCharCode(o), t += 3;
                        else if (o >= 194 && o < 224) {
                            if (n - t >= 6) {
                                var a = parseInt(e.substr(t + 4, 2), 16);
                                r += String.fromCharCode((31 & o) << 6 | 63 & a);
                            } else r += e.substr(t, 6);
                            t += 6;
                        } else if (o >= 224) {
                            if (n - t >= 9) {
                                var i = parseInt(e.substr(t + 4, 2), 16), s = parseInt(e.substr(t + 7, 2), 16);
                                r += String.fromCharCode((15 & o) << 12 | (63 & i) << 6 | 63 & s);
                            } else r += e.substr(t, 9);
                            t += 9;
                        } else r += e.substr(t, 3), t += 3;
                    }
                    return r;
                }
                function O(e, r) {
                    function t(e) {
                        var t = x(e);
                        return t.match(r.UNRESERVED) ? t : e;
                    }
                    return e.scheme && (e.scheme = String(e.scheme).replace(r.PCT_ENCODED, t).toLowerCase().replace(r.NOT_SCHEME, "")), void 0 !== e.userinfo && (e.userinfo = String(e.userinfo).replace(r.PCT_ENCODED, t).replace(r.NOT_USERINFO, b).replace(r.PCT_ENCODED, o)), void 0 !== e.host && (e.host = String(e.host).replace(r.PCT_ENCODED, t).toLowerCase().replace(r.NOT_HOST, b).replace(r.PCT_ENCODED, o)), void 0 !== e.path && (e.path = String(e.path).replace(r.PCT_ENCODED, t).replace(e.scheme ? r.NOT_PATH : r.NOT_PATH_NOSCHEME, b).replace(r.PCT_ENCODED, o)), void 0 !== e.query && (e.query = String(e.query).replace(r.PCT_ENCODED, t).replace(r.NOT_QUERY, b).replace(r.PCT_ENCODED, o)), void 0 !== e.fragment && (e.fragment = String(e.fragment).replace(r.PCT_ENCODED, t).replace(r.NOT_FRAGMENT, b).replace(r.PCT_ENCODED, o)), e;
                }
                function I(e) {
                    return e.replace(/^0*(.*)/, "$1") || "0";
                }
                function F(e, r) {
                    var t = e.match(r.IPV4ADDRESS) || [], n = u(t, 2)[1];
                    return n ? n.split(".").map(I).join(".") : e;
                }
                function N(e, r) {
                    var t = e.match(r.IPV6ADDRESS) || [], n = u(t, 3), o = n[1], a = n[2];
                    if (o) {
                        for(var i = o.toLowerCase().split("::").reverse(), s = u(i, 2), c = s[0], p = s[1], h = p ? p.split(":").map(I) : [], f = c.split(":").map(I), l = r.IPV4ADDRESS.test(f[f.length - 1]), v = l ? 7 : 8, d = f.length - v, g = Array(v), m = 0; m < v; ++m)g[m] = h[m] || f[d + m] || "";
                        l && (g[v - 1] = F(g[v - 1], r));
                        var E = g.reduce(function(e, r, t) {
                            if (!r || "0" === r) {
                                var n = e[e.length - 1];
                                n && n.index + n.length === t ? n.length++ : e.push({
                                    index: t,
                                    length: 1
                                });
                            }
                            return e;
                        }, []).sort(function(e, r) {
                            return r.length - e.length;
                        })[0], C = void 0;
                        if (E && E.length > 1) {
                            var y = g.slice(0, E.index), S = g.slice(E.index + E.length);
                            C = y.join(":") + "::" + S.join(":");
                        } else C = g.join(":");
                        return a && (C += "%" + a), C;
                    }
                    return e;
                }
                var R = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i, T = void 0 === "".match(/(){0}/)[1];
                function _(e) {
                    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, t = {}, n = !1 !== r.iri ? s : i;
                    "suffix" === r.reference && (e = (r.scheme ? r.scheme + ":" : "") + "//" + e);
                    var o = e.match(R);
                    if (o) {
                        T ? (t.scheme = o[1], t.userinfo = o[3], t.host = o[4], t.port = parseInt(o[5], 10), t.path = o[6] || "", t.query = o[7], t.fragment = o[8], isNaN(t.port) && (t.port = o[5])) : (t.scheme = o[1] || void 0, t.userinfo = -1 !== e.indexOf("@") ? o[3] : void 0, t.host = -1 !== e.indexOf("//") ? o[4] : void 0, t.port = parseInt(o[5], 10), t.path = o[6] || "", t.query = -1 !== e.indexOf("?") ? o[7] : void 0, t.fragment = -1 !== e.indexOf("#") ? o[8] : void 0, isNaN(t.port) && (t.port = e.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? o[4] : void 0)), t.host && (t.host = N(F(t.host, n), n)), void 0 !== t.scheme || void 0 !== t.userinfo || void 0 !== t.host || void 0 !== t.port || t.path || void 0 !== t.query ? void 0 === t.scheme ? t.reference = "relative" : void 0 === t.fragment ? t.reference = "absolute" : t.reference = "uri" : t.reference = "same-document", r.reference && "suffix" !== r.reference && r.reference !== t.reference && (t.error = t.error || "URI is not a " + r.reference + " reference.");
                        var a = w[(r.scheme || t.scheme || "").toLowerCase()];
                        if (r.unicodeSupport || a && a.unicodeSupport) O(t, n);
                        else {
                            if (t.host && (r.domainHost || a && a.domainHost)) try {
                                t.host = D.toASCII(t.host.replace(n.PCT_ENCODED, x).toLowerCase());
                            } catch (u) {
                                t.error = t.error || "Host's domain name can not be converted to ASCII via punycode: " + u;
                            }
                            O(t, i);
                        }
                        a && a.parse && a.parse(t, r);
                    } else t.error = t.error || "URI can not be parsed.";
                    return t;
                }
                var P = /^\.\.?\//, U = /^\/\.(\/|$)/, j = /^\/\.\.(\/|$)/, q = /^\/?(?:.|\n)*?(?=\/|$)/;
                function H(e) {
                    for(var r = []; e.length;)if (e.match(P)) e = e.replace(P, "");
                    else if (e.match(U)) e = e.replace(U, "/");
                    else if (e.match(j)) e = e.replace(j, "/"), r.pop();
                    else if ("." === e || ".." === e) e = "";
                    else {
                        var t = e.match(q);
                        if (!t) throw new Error("Unexpected dot segment condition");
                        var n = t[0];
                        e = e.slice(n.length), r.push(n);
                    }
                    return r.join("");
                }
                function z(e) {
                    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, t = r.iri ? s : i, n = [], o = w[(r.scheme || e.scheme || "").toLowerCase()];
                    if (o && o.serialize && o.serialize(e, r), e.host) {
                        if (t.IPV6ADDRESS.test(e.host)) ;
                        else if (r.domainHost || o && o.domainHost) try {
                            e.host = r.iri ? D.toUnicode(e.host) : D.toASCII(e.host.replace(t.PCT_ENCODED, x).toLowerCase());
                        } catch (c) {
                            e.error = e.error || "Host's domain name can not be converted to " + (r.iri ? "Unicode" : "ASCII") + " via punycode: " + c;
                        }
                    }
                    O(e, t), "suffix" !== r.reference && e.scheme && (n.push(e.scheme), n.push(":"));
                    var a = function(e, r) {
                        var t = !1 !== r.iri ? s : i, n = [];
                        return void 0 !== e.userinfo && (n.push(e.userinfo), n.push("@")), void 0 !== e.host && n.push(N(F(String(e.host), t), t).replace(t.IPV6ADDRESS, function(e, r, t) {
                            return "[" + r + (t ? "%25" + t : "") + "]";
                        })), "number" == typeof e.port && (n.push(":"), n.push(e.port.toString(10))), n.length ? n.join("") : void 0;
                    }(e, r);
                    if (void 0 !== a && ("suffix" !== r.reference && n.push("//"), n.push(a), e.path && "/" !== e.path.charAt(0) && n.push("/")), void 0 !== e.path) {
                        var u = e.path;
                        r.absolutePath || o && o.absolutePath || (u = H(u)), void 0 === a && (u = u.replace(/^\/\//, "/%2F")), n.push(u);
                    }
                    return void 0 !== e.query && (n.push("?"), n.push(e.query)), void 0 !== e.fragment && (n.push("#"), n.push(e.fragment)), n.join("");
                }
                function L(e, r) {
                    var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, n = {};
                    return arguments[3] || (e = _(z(e, t), t), r = _(z(r, t), t)), !(t = t || {}).tolerant && r.scheme ? (n.scheme = r.scheme, n.userinfo = r.userinfo, n.host = r.host, n.port = r.port, n.path = H(r.path || ""), n.query = r.query) : (void 0 !== r.userinfo || void 0 !== r.host || void 0 !== r.port ? (n.userinfo = r.userinfo, n.host = r.host, n.port = r.port, n.path = H(r.path || ""), n.query = r.query) : (r.path ? ("/" === r.path.charAt(0) ? n.path = H(r.path) : (void 0 === e.userinfo && void 0 === e.host && void 0 === e.port || e.path ? e.path ? n.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + r.path : n.path = r.path : n.path = "/" + r.path, n.path = H(n.path)), n.query = r.query) : (n.path = e.path, void 0 !== r.query ? n.query = r.query : n.query = e.query), n.userinfo = e.userinfo, n.host = e.host, n.port = e.port), n.scheme = e.scheme), n.fragment = r.fragment, n;
                }
                function $(e, r) {
                    return e && e.toString().replace(r && r.iri ? s.PCT_ENCODED : i.PCT_ENCODED, x);
                }
                var V = {
                    scheme: "http",
                    domainHost: !0,
                    parse: function(e, r) {
                        return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
                    },
                    serialize: function(e, r) {
                        return e.port !== ("https" !== String(e.scheme).toLowerCase() ? 80 : 443) && "" !== e.port || (e.port = void 0), e.path || (e.path = "/"), e;
                    }
                }, M = {
                    scheme: "https",
                    domainHost: V.domainHost,
                    parse: V.parse,
                    serialize: V.serialize
                }, Z = {}, k = "[A-Za-z0-9\\-\\.\\_\\~\\xA0-\\u200D\\u2010-\\u2029\\u202F-\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]", G = "[0-9A-Fa-f]", Q = t(t("%[EFef][0-9A-Fa-f]%" + G + G + "%" + G + G) + "|" + t("%[89A-Fa-f][0-9A-Fa-f]%" + G + G) + "|" + t("%" + G + G)), Y = r("[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]", '[\\"\\\\]'), B = new RegExp(k, "g"), J = new RegExp(Q, "g"), K = new RegExp(r("[^]", "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]", "[\\.]", '[\\"]', Y), "g"), W = new RegExp(r("[^]", k, "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]"), "g"), X = W;
                function ee(e) {
                    var r = x(e);
                    return r.match(B) ? r : e;
                }
                var re = {
                    scheme: "mailto",
                    parse: function(e, r) {
                        var t = e, n = t.to = t.path ? t.path.split(",") : [];
                        if (t.path = void 0, t.query) {
                            for(var o = !1, a = {}, i = t.query.split("&"), s = 0, u = i.length; s < u; ++s){
                                var c = i[s].split("=");
                                switch(c[0]){
                                    case "to":
                                        for(var p = c[1].split(","), h = 0, f = p.length; h < f; ++h)n.push(p[h]);
                                        break;
                                    case "subject":
                                        t.subject = $(c[1], r);
                                        break;
                                    case "body":
                                        t.body = $(c[1], r);
                                        break;
                                    default:
                                        o = !0, a[$(c[0], r)] = $(c[1], r);
                                }
                            }
                            o && (t.headers = a);
                        }
                        t.query = void 0;
                        for(var l = 0, v = n.length; l < v; ++l){
                            var d = n[l].split("@");
                            if (d[0] = $(d[0]), r.unicodeSupport) d[1] = $(d[1], r).toLowerCase();
                            else try {
                                d[1] = D.toASCII($(d[1], r).toLowerCase());
                            } catch (g) {
                                t.error = t.error || "Email address's domain name can not be converted to ASCII via punycode: " + g;
                            }
                            n[l] = d.join("@");
                        }
                        return t;
                    },
                    serialize: function(e, r) {
                        var t, n = e, a = null != (t = e.to) ? t instanceof Array ? t : "number" != typeof t.length || t.split || t.setInterval || t.call ? [
                            t
                        ] : Array.prototype.slice.call(t) : [];
                        if (a) {
                            for(var i = 0, s = a.length; i < s; ++i){
                                var u = String(a[i]), c = u.lastIndexOf("@"), p = u.slice(0, c).replace(J, ee).replace(J, o).replace(K, b), h = u.slice(c + 1);
                                try {
                                    h = r.iri ? D.toUnicode(h) : D.toASCII($(h, r).toLowerCase());
                                } catch (d) {
                                    n.error = n.error || "Email address's domain name can not be converted to " + (r.iri ? "Unicode" : "ASCII") + " via punycode: " + d;
                                }
                                a[i] = p + "@" + h;
                            }
                            n.path = a.join(",");
                        }
                        var f = e.headers = e.headers || {};
                        e.subject && (f.subject = e.subject), e.body && (f.body = e.body);
                        var l = [];
                        for(var v in f)f[v] !== Z[v] && l.push(v.replace(J, ee).replace(J, o).replace(W, b) + "=" + f[v].replace(J, ee).replace(J, o).replace(X, b));
                        return l.length && (n.query = l.join("&")), n;
                    }
                }, te = /^([^\:]+)\:(.*)/, ne = {
                    scheme: "urn",
                    parse: function(e, r) {
                        var t = e.path && e.path.match(te), n = e;
                        if (t) {
                            var o = r.scheme || n.scheme || "urn", a = t[1].toLowerCase(), i = t[2], s = o + ":" + (r.nid || a), u = w[s];
                            n.nid = a, n.nss = i, n.path = void 0, u && (n = u.parse(n, r));
                        } else n.error = n.error || "URN can not be parsed.";
                        return n;
                    },
                    serialize: function(e, r) {
                        var t = r.scheme || e.scheme || "urn", n = e.nid, o = t + ":" + (r.nid || n), a = w[o];
                        a && (e = a.serialize(e, r));
                        var i = e, s = e.nss;
                        return i.path = (n || r.nid) + ":" + s, i;
                    }
                }, oe = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/, ae = {
                    scheme: "urn:uuid",
                    parse: function(e, r) {
                        var t = e;
                        return t.uuid = t.nss, t.nss = void 0, r.tolerant || t.uuid && t.uuid.match(oe) || (t.error = t.error || "UUID is not valid."), t;
                    },
                    serialize: function(e, r) {
                        var t = e;
                        return t.nss = (e.uuid || "").toLowerCase(), t;
                    }
                };
                w[V.scheme] = V, w[M.scheme] = M, w[re.scheme] = re, w[ne.scheme] = ne, w[ae.scheme] = ae, e.SCHEMES = w, e.pctEncChar = b, e.pctDecChars = x, e.parse = _, e.removeDotSegments = H, e.serialize = z, e.resolveComponents = L, e.resolve = function(e, r, t) {
                    var n = function(e, r) {
                        var t = e;
                        if (r) for(var n in r)t[n] = r[n];
                        return t;
                    }({
                        scheme: "null"
                    }, t);
                    return z(L(_(e, n), _(r, n), n, !0), n);
                }, e.normalize = function(e, r) {
                    return "string" == typeof e ? e = z(_(e, r), r) : "object" === n(e) && (e = _(z(e, r), r)), e;
                }, e.equal = function(e, r, t) {
                    return "string" == typeof e ? e = z(_(e, t), t) : "object" === n(e) && (e = z(e, t)), "string" == typeof r ? r = z(_(r, t), t) : "object" === n(r) && (r = z(r, t)), e === r;
                }, e.escapeComponent = function(e, r) {
                    return e && e.toString().replace(r && r.iri ? s.ESCAPE : i.ESCAPE, b);
                }, e.unescapeComponent = $, Object.defineProperty(e, "__esModule", {
                    value: !0
                });
            });
        },
        {}
    ],
    "dPQH": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function r(t, e) {
                if (t === e) return !0;
                if (t && e && "object" == typeof t && "object" == typeof e) {
                    if (t.constructor !== e.constructor) return !1;
                    var o, n, u;
                    if (Array.isArray(t)) {
                        if ((o = t.length) != e.length) return !1;
                        for(n = o; 0 != n--;)if (!r(t[n], e[n])) return !1;
                        return !0;
                    }
                    if (t.constructor === RegExp) return t.source === e.source && t.flags === e.flags;
                    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === e.valueOf();
                    if (t.toString !== Object.prototype.toString) return t.toString() === e.toString();
                    if ((o = (u = Object.keys(t)).length) !== Object.keys(e).length) return !1;
                    for(n = o; 0 != n--;)if (!Object.prototype.hasOwnProperty.call(e, u[n])) return !1;
                    for(n = o; 0 != n--;){
                        var f = u[n];
                        if (!r(t[f], e[f])) return !1;
                    }
                    return !0;
                }
                return t != t && e != e;
            };
        },
        {}
    ],
    "rD0p": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(r) {
                for(var t, e = 0, o = r.length, c = 0; c < o;)e++, (t = r.charCodeAt(c++)) >= 55296 && t <= 56319 && c < o && 56320 == (64512 & (t = r.charCodeAt(c))) && c++;
                return e;
            };
        },
        {}
    ],
    "Q1F7": [
        function(require1, module1, exports) {
            "use strict";
            function e(e, r) {
                for(var n in r = r || {}, e)r[n] = e[n];
                return r;
            }
            function r(e, r, n, t) {
                var a = t ? " !== " : " === ", o = t ? " || " : " && ", u = t ? "!" : "", c = t ? "" : "!";
                switch(e){
                    case "null":
                        return r + a + "null";
                    case "array":
                        return u + "Array.isArray(" + r + ")";
                    case "object":
                        return "(" + u + r + o + "typeof " + r + a + '"object"' + o + c + "Array.isArray(" + r + "))";
                    case "integer":
                        return "(typeof " + r + a + '"number"' + o + c + "(" + r + " % 1)" + o + r + a + r + (n ? o + u + "isFinite(" + r + ")" : "") + ")";
                    case "number":
                        return "(typeof " + r + a + '"' + e + '"' + (n ? o + u + "isFinite(" + r + ")" : "") + ")";
                    default:
                        return "typeof " + r + a + '"' + e + '"';
                }
            }
            function n(e, n, t) {
                switch(e.length){
                    case 1:
                        return r(e[0], n, t, !0);
                    default:
                        var a = "", u = o(e);
                        for(var c in u.array && u.object && (a = u.null ? "(" : "(!" + n + " || ", a += "typeof " + n + ' !== "object")', delete u.null, delete u.array, delete u.object), u.number && delete u.integer, u)a += (a ? " && " : "") + r(c, n, t, !0);
                        return a;
                }
            }
            module1.exports = {
                copy: e,
                checkDataType: r,
                checkDataTypes: n,
                coerceToTypes: a,
                toHash: o,
                getProperty: i,
                escapeQuotes: l,
                equal: require1("fast-deep-equal"),
                ucs2length: require1("./ucs2length"),
                varOccurences: f,
                varReplace: s,
                schemaHasRules: p,
                schemaHasRulesExcept: g,
                schemaUnknownRules: y,
                toQuotedString: h,
                getPathExpr: v,
                getPath: d,
                getData: w,
                unescapeFragment: E,
                unescapeJsonPointer: A,
                escapeFragment: R,
                escapeJsonPointer: x
            };
            var t = o([
                "string",
                "number",
                "integer",
                "boolean",
                "null"
            ]);
            function a(e, r) {
                if (Array.isArray(r)) {
                    for(var n = [], a = 0; a < r.length; a++){
                        var o = r[a];
                        t[o] ? n[n.length] = o : "array" === e && "array" === o && (n[n.length] = o);
                    }
                    if (n.length) return n;
                } else {
                    if (t[r]) return [
                        r
                    ];
                    if ("array" === e && "array" === r) return [
                        "array"
                    ];
                }
            }
            function o(e) {
                for(var r = {}, n = 0; n < e.length; n++)r[e[n]] = !0;
                return r;
            }
            var u = /^[a-z$_][a-z$_0-9]*$/i, c = /'|\\/g;
            function i(e) {
                return "number" == typeof e ? "[" + e + "]" : u.test(e) ? "." + e : "['" + l(e) + "']";
            }
            function l(e) {
                return e.replace(c, "\\$&").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\f/g, "\\f").replace(/\t/g, "\\t");
            }
            function f(e, r) {
                r += "[^0-9]";
                var n = e.match(new RegExp(r, "g"));
                return n ? n.length : 0;
            }
            function s(e, r, n) {
                return r += "([^0-9])", n = n.replace(/\$/g, "$$$$"), e.replace(new RegExp(r, "g"), n + "$1");
            }
            function p(e, r) {
                if ("boolean" == typeof e) return !e;
                for(var n in e)if (r[n]) return !0;
            }
            function g(e, r, n) {
                if ("boolean" == typeof e) return !e && "not" != n;
                for(var t in e)if (t != n && r[t]) return !0;
            }
            function y(e, r) {
                if ("boolean" != typeof e) {
                    for(var n in e)if (!r[n]) return n;
                }
            }
            function h(e) {
                return "'" + l(e) + "'";
            }
            function v(e, r, n, t) {
                return $(e, n ? "'/' + " + r + (t ? "" : ".replace(/~/g, '~0').replace(/\\//g, '~1')") : t ? "'[' + " + r + " + ']'" : "'[\\'' + " + r + " + '\\']'");
            }
            function d(e, r, n) {
                return $(e, h(n ? "/" + x(r) : i(r)));
            }
            var m = /^\/(?:[^~]|~0|~1)*$/, b = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
            function w(e, r, n) {
                var t, a, o, u;
                if ("" === e) return "rootData";
                if ("/" == e[0]) {
                    if (!m.test(e)) throw new Error("Invalid JSON-pointer: " + e);
                    a = e, o = "rootData";
                } else {
                    if (!(u = e.match(b))) throw new Error("Invalid JSON-pointer: " + e);
                    if (t = +u[1], "#" == (a = u[2])) {
                        if (t >= r) throw new Error("Cannot access property/index " + t + " levels up, current level is " + r);
                        return n[r - t];
                    }
                    if (t > r) throw new Error("Cannot access data " + t + " levels up, current level is " + r);
                    if (o = "data" + (r - t || ""), !a) return o;
                }
                for(var c = o, l = a.split("/"), f = 0; f < l.length; f++){
                    var s = l[f];
                    s && (c += " && " + (o += i(A(s))));
                }
                return c;
            }
            function $(e, r) {
                return '""' == e ? r : (e + " + " + r).replace(/([^\\])' \+ '/g, "$1");
            }
            function E(e) {
                return A(decodeURIComponent(e));
            }
            function R(e) {
                return encodeURIComponent(x(e));
            }
            function x(e) {
                return e.replace(/~/g, "~0").replace(/\//g, "~1");
            }
            function A(e) {
                return e.replace(/~1/g, "/").replace(/~0/g, "~");
            }
        },
        {
            "fast-deep-equal": "dPQH",
            "./ucs2length": "rD0p"
        }
    ],
    "HHLG": [
        function(require1, module1, exports) {
            "use strict";
            var t = require1("./util");
            function e(e) {
                t.copy(e, this);
            }
            module1.exports = e;
        },
        {
            "./util": "Q1F7"
        }
    ],
    "uMRE": [
        function(require1, module1, exports) {
            "use strict";
            var e = module1.exports = function(e, i, t) {
                "function" == typeof i && (t = i, i = {}), r(i, "function" == typeof (t = i.cb || t) ? t : t.pre || function() {}, t.post || function() {}, e, "", e);
            };
            function r(t, n, o, s, a, m, p, f, u, y) {
                if (s && "object" == typeof s && !Array.isArray(s)) {
                    for(var c in n(s, a, m, p, f, u, y), s){
                        var d = s[c];
                        if (Array.isArray(d)) {
                            if (c in e.arrayKeywords) for(var l = 0; l < d.length; l++)r(t, n, o, d[l], a + "/" + c + "/" + l, m, a, c, s, l);
                        } else if (c in e.propsKeywords) {
                            if (d && "object" == typeof d) for(var w in d)r(t, n, o, d[w], a + "/" + c + "/" + i(w), m, a, c, s, w);
                        } else (c in e.keywords || t.allKeys && !(c in e.skipKeywords)) && r(t, n, o, d, a + "/" + c, m, a, c, s);
                    }
                    o(s, a, m, p, f, u, y);
                }
            }
            function i(e) {
                return e.replace(/~/g, "~0").replace(/\//g, "~1");
            }
            e.keywords = {
                additionalItems: !0,
                items: !0,
                contains: !0,
                additionalProperties: !0,
                propertyNames: !0,
                not: !0
            }, e.arrayKeywords = {
                items: !0,
                allOf: !0,
                anyOf: !0,
                oneOf: !0
            }, e.propsKeywords = {
                definitions: !0,
                properties: !0,
                patternProperties: !0,
                dependencies: !0
            }, e.skipKeywords = {
                default: !0,
                enum: !0,
                const: !0,
                required: !0,
                maximum: !0,
                minimum: !0,
                exclusiveMaximum: !0,
                exclusiveMinimum: !0,
                multipleOf: !0,
                maxLength: !0,
                minLength: !0,
                pattern: !0,
                format: !0,
                maxItems: !0,
                minItems: !0,
                uniqueItems: !0,
                maxProperties: !0,
                minProperties: !0
            };
        },
        {}
    ],
    "w10T": [
        function(require1, module1, exports) {
            "use strict";
            var e = require1("uri-js"), r = require1("fast-deep-equal"), t = require1("./util"), i = require1("./schema_obj"), s = require1("json-schema-traverse");
            function a(e, r, t) {
                var s = this._refs[t];
                if ("string" == typeof s) {
                    if (!this._refs[s]) return a.call(this, e, r, s);
                    s = this._refs[s];
                }
                if ((s = s || this._schemas[t]) instanceof i) return u(s.schema, this._opts.inlineRefs) ? s.schema : s.validate || this._compile(s);
                var o, f, c, h = n.call(this, r, t);
                return h && (o = h.schema, r = h.root, c = h.baseId), o instanceof i ? f = o.validate || e.call(this, o.schema, r, void 0, c) : void 0 !== o && (f = u(o, this._opts.inlineRefs) ? o : e.call(this, o, r, void 0, c)), f;
            }
            function n(r, t) {
                var s = e.parse(t), a = d(s), n = v(this._getId(r.schema));
                if (0 === Object.keys(r.schema).length || a !== n) {
                    var f = g(a), h = this._refs[f];
                    if ("string" == typeof h) return o.call(this, r, h, s);
                    if (h instanceof i) h.validate || this._compile(h), r = h;
                    else {
                        if (!((h = this._schemas[f]) instanceof i)) return;
                        if (h.validate || this._compile(h), f == g(t)) return {
                            schema: h,
                            root: r,
                            baseId: n
                        };
                        r = h;
                    }
                    if (!r.schema) return;
                    n = v(this._getId(r.schema));
                }
                return c.call(this, s, n, r.schema, r);
            }
            function o(e, r, t) {
                var i = n.call(this, e, r);
                if (i) {
                    var s = i.schema, a = i.baseId;
                    e = i.root;
                    var o = this._getId(s);
                    return o && (a = _(a, o)), c.call(this, t, a, s, e);
                }
            }
            module1.exports = a, a.normalizeId = g, a.fullPath = v, a.url = _, a.ids = y, a.inlineRef = u, a.schema = n;
            var f = t.toHash([
                "properties",
                "patternProperties",
                "enum",
                "dependencies",
                "definitions"
            ]);
            function c(e, r, i, s) {
                if (e.fragment = e.fragment || "", "/" == e.fragment.slice(0, 1)) {
                    for(var a = e.fragment.split("/"), o = 1; o < a.length; o++){
                        var c = a[o];
                        if (c) {
                            if (void 0 === (i = i[c = t.unescapeFragment(c)])) break;
                            var h;
                            if (!f[c] && ((h = this._getId(i)) && (r = _(r, h)), i.$ref)) {
                                var u = _(r, i.$ref), l = n.call(this, s, u);
                                l && (i = l.schema, s = l.root, r = l.baseId);
                            }
                        }
                    }
                    return void 0 !== i && i !== s.schema ? {
                        schema: i,
                        root: s,
                        baseId: r
                    } : void 0;
                }
            }
            var h = t.toHash([
                "type",
                "format",
                "pattern",
                "maxLength",
                "minLength",
                "maxProperties",
                "minProperties",
                "maxItems",
                "minItems",
                "maximum",
                "minimum",
                "uniqueItems",
                "multipleOf",
                "required",
                "enum"
            ]);
            function u(e, r) {
                return !1 !== r && (void 0 === r || !0 === r ? l(e) : r ? m(e) <= r : void 0);
            }
            function l(e) {
                var r;
                if (Array.isArray(e)) {
                    for(var t = 0; t < e.length; t++)if ("object" == typeof (r = e[t]) && !l(r)) return !1;
                } else for(var i in e){
                    if ("$ref" == i) return !1;
                    if ("object" == typeof (r = e[i]) && !l(r)) return !1;
                }
                return !0;
            }
            function m(e) {
                var r, t = 0;
                if (Array.isArray(e)) {
                    for(var i = 0; i < e.length; i++)if ("object" == typeof (r = e[i]) && (t += m(r)), t == 1 / 0) return 1 / 0;
                } else for(var s in e){
                    if ("$ref" == s) return 1 / 0;
                    if (h[s]) t++;
                    else if ("object" == typeof (r = e[s]) && (t += m(r) + 1), t == 1 / 0) return 1 / 0;
                }
                return t;
            }
            function v(r, t) {
                return !1 !== t && (r = g(r)), d(e.parse(r));
            }
            function d(r) {
                return e.serialize(r).split("#")[0] + "#";
            }
            var p = /#\/?$/;
            function g(e) {
                return e ? e.replace(p, "") : "";
            }
            function _(r, t) {
                return t = g(t), e.resolve(r, t);
            }
            function y(i) {
                var a = g(this._getId(i)), n = {
                    "": a
                }, o = {
                    "": v(a, !1)
                }, f = {}, c = this;
                return s(i, {
                    allKeys: !0
                }, function(i, s, a, h, u, l, m) {
                    if ("" !== s) {
                        var v = c._getId(i), d = n[h], p = o[h] + "/" + u;
                        if (void 0 !== m && (p += "/" + ("number" == typeof m ? m : t.escapeFragment(m))), "string" == typeof v) {
                            v = d = g(d ? e.resolve(d, v) : v);
                            var _ = c._refs[v];
                            if ("string" == typeof _ && (_ = c._refs[_]), _ && _.schema) {
                                if (!r(i, _.schema)) throw new Error('id "' + v + '" resolves to more than one schema');
                            } else if (v != g(p)) {
                                if ("#" == v[0]) {
                                    if (f[v] && !r(i, f[v])) throw new Error('id "' + v + '" resolves to more than one schema');
                                    f[v] = i;
                                } else c._refs[v] = p;
                            }
                        }
                        n[s] = d, o[s] = p;
                    }
                }), f;
            }
        },
        {
            "uri-js": "wWOq",
            "fast-deep-equal": "dPQH",
            "./util": "Q1F7",
            "./schema_obj": "HHLG",
            "json-schema-traverse": "uMRE"
        }
    ],
    "OtNE": [
        function(require1, module1, exports) {
            "use strict";
            var e = require1("./resolve");
            function t(e) {
                this.message = "validation failed", this.errors = e, this.ajv = this.validation = !0;
            }
            function i(t, s, r) {
                this.message = r || i.message(t, s), this.missingRef = e.url(t, s), this.missingSchema = e.normalizeId(e.fullPath(this.missingRef));
            }
            function s(e) {
                return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e;
            }
            module1.exports = {
                Validation: s(t),
                MissingRef: s(i)
            }, i.message = function(e, t) {
                return "can't resolve reference " + t + " from id " + e;
            };
        },
        {
            "./resolve": "w10T"
        }
    ],
    "Xb3N": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(r, t) {
                t || (t = {}), "function" == typeof t && (t = {
                    cmp: t
                });
                var e, n = "boolean" == typeof t.cycles && t.cycles, i = t.cmp && (e = t.cmp, function(r) {
                    return function(t, n) {
                        var i = {
                            key: t,
                            value: r[t]
                        }, u = {
                            key: n,
                            value: r[n]
                        };
                        return e(i, u);
                    };
                }), u = [];
                return function r(t) {
                    if (t && t.toJSON && "function" == typeof t.toJSON && (t = t.toJSON()), void 0 !== t) {
                        if ("number" == typeof t) return isFinite(t) ? "" + t : "null";
                        if ("object" != typeof t) return JSON.stringify(t);
                        var e, o;
                        if (Array.isArray(t)) {
                            for(o = "[", e = 0; e < t.length; e++)e && (o += ","), o += r(t[e]) || "null";
                            return o + "]";
                        }
                        if (null === t) return "null";
                        if (-1 !== u.indexOf(t)) {
                            if (n) return JSON.stringify("__cycle__");
                            throw new TypeError("Converting circular structure to JSON");
                        }
                        var f = u.push(t) - 1, c = Object.keys(t).sort(i && i(t));
                        for(o = "", e = 0; e < c.length; e++){
                            var l = c[e], y = r(t[l]);
                            y && (o && (o += ","), o += JSON.stringify(l) + ":" + y);
                        }
                        return u.splice(f, 1), "{" + o + "}";
                    }
                }(r);
            };
        },
        {}
    ],
    "yhC1": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, r, a) {
                var t = "", s = !0 === e.schema.$async, o = e.util.schemaHasRulesExcept(e.schema, e.RULES.all, "$ref"), l = e.self._getId(e.schema);
                if (e.opts.strictKeywords) {
                    var i = e.util.schemaUnknownRules(e.schema, e.RULES.keywords);
                    if (i) {
                        var n = "unknown keyword: " + i;
                        if ("log" !== e.opts.strictKeywords) throw new Error(n);
                        e.logger.warn(n);
                    }
                }
                if (e.isTop && (t += " var validate = ", s && (e.async = !0, t += "async "), t += "function(data, dataPath, parentData, parentDataProperty, rootData) { 'use strict'; ", l && (e.opts.sourceCode || e.opts.processCode) && (t += " /*# sourceURL=" + l + " */ ")), "boolean" == typeof e.schema || !o && !e.schema.$ref) {
                    var c = e.level, f = e.dataLevel, h = e.schema["false schema"], u = e.schemaPath + e.util.getProperty("false schema"), p = e.errSchemaPath + "/false schema", d = !e.opts.allErrors, m = "data" + (f || ""), v = "valid" + c;
                    if (!1 === e.schema) {
                        e.isTop ? d = !0 : t += " var " + v + " = false; ", (W = W || []).push(t), t = "", !1 !== e.createErrors ? (t += " { keyword: 'false schema' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(p) + " , params: {} ", !1 !== e.opts.messages && (t += " , message: 'boolean schema is false' "), e.opts.verbose && (t += " , schema: false , parentSchema: validate.schema" + e.schemaPath + " , data: " + m + " "), t += " } ") : t += " {} ";
                        var y = t;
                        t = W.pop(), !e.compositeRule && d ? e.async ? t += " throw new ValidationError([" + y + "]); " : t += " validate.errors = [" + y + "]; return false; " : t += " var err = " + y + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                    } else e.isTop ? t += s ? " return data; " : " validate.errors = null; return true; " : t += " var " + v + " = true; ";
                    return e.isTop && (t += " }; return validate; "), t;
                }
                if (e.isTop) {
                    var g = e.isTop;
                    c = e.level = 0, f = e.dataLevel = 0, m = "data";
                    if (e.rootId = e.resolve.fullPath(e.self._getId(e.root.schema)), e.baseId = e.baseId || e.rootId, delete e.isTop, e.dataPathArr = [
                        ""
                    ], void 0 !== e.schema.default && e.opts.useDefaults && e.opts.strictDefaults) {
                        var w = "default is ignored in the schema root";
                        if ("log" !== e.opts.strictDefaults) throw new Error(w);
                        e.logger.warn(w);
                    }
                    t += " var vErrors = null; ", t += " var errors = 0;     ", t += " if (rootData === undefined) rootData = data; ";
                } else {
                    c = e.level, m = "data" + ((f = e.dataLevel) || "");
                    if (l && (e.baseId = e.resolve.url(e.baseId, l)), s && !e.async) throw new Error("async schema in sync schema");
                    t += " var errs_" + c + " = errors;";
                }
                v = "valid" + c, d = !e.opts.allErrors;
                var E = "", P = "", b = e.schema.type, D = Array.isArray(b);
                if (b && e.opts.nullable && !0 === e.schema.nullable && (D ? -1 == b.indexOf("null") && (b = b.concat("null")) : "null" != b && (b = [
                    b,
                    "null"
                ], D = !0)), D && 1 == b.length && (b = b[0], D = !1), e.schema.$ref && o) {
                    if ("fail" == e.opts.extendRefs) throw new Error('$ref: validation keywords used in schema at path "' + e.errSchemaPath + '" (see option extendRefs)');
                    !0 !== e.opts.extendRefs && (o = !1, e.logger.warn('$ref: keywords ignored in schema at path "' + e.errSchemaPath + '"'));
                }
                if (e.schema.$comment && e.opts.$comment && (t += " " + e.RULES.all.$comment.code(e, "$comment")), b) {
                    if (e.opts.coerceTypes) var S = e.util.coerceToTypes(e.opts.coerceTypes, b);
                    var R = e.RULES.types[b];
                    if (S || D || !0 === R || R && !X(R)) {
                        u = e.schemaPath + ".type", p = e.errSchemaPath + "/type", u = e.schemaPath + ".type", p = e.errSchemaPath + "/type";
                        var T = D ? "checkDataTypes" : "checkDataType";
                        if (t += " if (" + e.util[T](b, m, e.opts.strictNumbers, !0) + ") { ", S) {
                            var k = "dataType" + c, $ = "coerced" + c;
                            t += " var " + k + " = typeof " + m + "; var " + $ + " = undefined; ", "array" == e.opts.coerceTypes && (t += " if (" + k + " == 'object' && Array.isArray(" + m + ") && " + m + ".length == 1) { " + m + " = " + m + "[0]; " + k + " = typeof " + m + "; if (" + e.util.checkDataType(e.schema.type, m, e.opts.strictNumbers) + ") " + $ + " = " + m + "; } "), t += " if (" + $ + " !== undefined) ; ";
                            var L = S;
                            if (L) for(var j, A = -1, I = L.length - 1; A < I;)"string" == (j = L[A += 1]) ? t += " else if (" + k + " == 'number' || " + k + " == 'boolean') " + $ + " = '' + " + m + "; else if (" + m + " === null) " + $ + " = ''; " : "number" == j || "integer" == j ? (t += " else if (" + k + " == 'boolean' || " + m + " === null || (" + k + " == 'string' && " + m + " && " + m + " == +" + m + " ", "integer" == j && (t += " && !(" + m + " % 1)"), t += ")) " + $ + " = +" + m + "; ") : "boolean" == j ? t += " else if (" + m + " === 'false' || " + m + " === 0 || " + m + " === null) " + $ + " = false; else if (" + m + " === 'true' || " + m + " === 1) " + $ + " = true; " : "null" == j ? t += " else if (" + m + " === '' || " + m + " === 0 || " + m + " === false) " + $ + " = null; " : "array" == e.opts.coerceTypes && "array" == j && (t += " else if (" + k + " == 'string' || " + k + " == 'number' || " + k + " == 'boolean' || " + m + " == null) " + $ + " = [" + m + "]; ");
                            t += " else {   ", (W = W || []).push(t), t = "", !1 !== e.createErrors ? (t += " { keyword: 'type' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(p) + " , params: { type: '", t += D ? "" + b.join(",") : "" + b, t += "' } ", !1 !== e.opts.messages && (t += " , message: 'should be ", t += D ? "" + b.join(",") : "" + b, t += "' "), e.opts.verbose && (t += " , schema: validate.schema" + u + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + m + " "), t += " } ") : t += " {} ";
                            y = t;
                            t = W.pop(), !e.compositeRule && d ? e.async ? t += " throw new ValidationError([" + y + "]); " : t += " validate.errors = [" + y + "]; return false; " : t += " var err = " + y + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " } if (" + $ + " !== undefined) {  ";
                            var U = f ? "data" + (f - 1 || "") : "parentData";
                            t += " " + m + " = " + $ + "; ", f || (t += "if (" + U + " !== undefined)"), t += " " + U + "[" + (f ? e.dataPathArr[f] : "parentDataProperty") + "] = " + $ + "; } ";
                        } else {
                            (W = W || []).push(t), t = "", !1 !== e.createErrors ? (t += " { keyword: 'type' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(p) + " , params: { type: '", t += D ? "" + b.join(",") : "" + b, t += "' } ", !1 !== e.opts.messages && (t += " , message: 'should be ", t += D ? "" + b.join(",") : "" + b, t += "' "), e.opts.verbose && (t += " , schema: validate.schema" + u + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + m + " "), t += " } ") : t += " {} ";
                            y = t;
                            t = W.pop(), !e.compositeRule && d ? e.async ? t += " throw new ValidationError([" + y + "]); " : t += " validate.errors = [" + y + "]; return false; " : t += " var err = " + y + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                        }
                        t += " } ";
                    }
                }
                if (e.schema.$ref && !o) t += " " + e.RULES.all.$ref.code(e, "$ref") + " ", d && (t += " } if (errors === ", t += g ? "0" : "errs_" + c, t += ") { ", P += "}");
                else {
                    var x = e.RULES;
                    if (x) {
                        for(var _ = -1, N = x.length - 1; _ < N;)if (X(R = x[_ += 1])) {
                            if (R.type && (t += " if (" + e.util.checkDataType(R.type, m, e.opts.strictNumbers) + ") { "), e.opts.useDefaults) {
                                if ("object" == R.type && e.schema.properties) {
                                    h = e.schema.properties;
                                    var V = Object.keys(h);
                                    if (V) {
                                        for(var O, Q = -1, C = V.length - 1; Q < C;)if (void 0 !== (H = h[O = V[Q += 1]]).default) {
                                            var J = m + e.util.getProperty(O);
                                            if (e.compositeRule) {
                                                if (e.opts.strictDefaults) {
                                                    w = "default is ignored for: " + J;
                                                    if ("log" !== e.opts.strictDefaults) throw new Error(w);
                                                    e.logger.warn(w);
                                                }
                                            } else t += " if (" + J + " === undefined ", "empty" == e.opts.useDefaults && (t += " || " + J + " === null || " + J + " === '' "), t += " ) " + J + " = ", "shared" == e.opts.useDefaults ? t += " " + e.useDefault(H.default) + " " : t += " " + JSON.stringify(H.default) + " ", t += "; ";
                                        }
                                    }
                                } else if ("array" == R.type && Array.isArray(e.schema.items)) {
                                    var K = e.schema.items;
                                    if (K) {
                                        A = -1;
                                        for(var H, q = K.length - 1; A < q;)if (void 0 !== (H = K[A += 1]).default) {
                                            J = m + "[" + A + "]";
                                            if (e.compositeRule) {
                                                if (e.opts.strictDefaults) {
                                                    w = "default is ignored for: " + J;
                                                    if ("log" !== e.opts.strictDefaults) throw new Error(w);
                                                    e.logger.warn(w);
                                                }
                                            } else t += " if (" + J + " === undefined ", "empty" == e.opts.useDefaults && (t += " || " + J + " === null || " + J + " === '' "), t += " ) " + J + " = ", "shared" == e.opts.useDefaults ? t += " " + e.useDefault(H.default) + " " : t += " " + JSON.stringify(H.default) + " ", t += "; ";
                                        }
                                    }
                                }
                            }
                            var z = R.rules;
                            if (z) {
                                for(var B, F = -1, G = z.length - 1; F < G;)if (Y(B = z[F += 1])) {
                                    var M = B.code(e, B.keyword, R.type);
                                    M && (t += " " + M + " ", d && (E += "}"));
                                }
                            }
                            if (d && (t += " " + E + " ", E = ""), R.type && (t += " } ", b && b === R.type && !S)) {
                                t += " else { ";
                                var W;
                                u = e.schemaPath + ".type", p = e.errSchemaPath + "/type";
                                (W = W || []).push(t), t = "", !1 !== e.createErrors ? (t += " { keyword: 'type' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(p) + " , params: { type: '", t += D ? "" + b.join(",") : "" + b, t += "' } ", !1 !== e.opts.messages && (t += " , message: 'should be ", t += D ? "" + b.join(",") : "" + b, t += "' "), e.opts.verbose && (t += " , schema: validate.schema" + u + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + m + " "), t += " } ") : t += " {} ";
                                y = t;
                                t = W.pop(), !e.compositeRule && d ? e.async ? t += " throw new ValidationError([" + y + "]); " : t += " validate.errors = [" + y + "]; return false; " : t += " var err = " + y + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " } ";
                            }
                            d && (t += " if (errors === ", t += g ? "0" : "errs_" + c, t += ") { ", P += "}");
                        }
                    }
                }
                function X(e) {
                    for(var r = e.rules, a = 0; a < r.length; a++)if (Y(r[a])) return !0;
                }
                function Y(r) {
                    return void 0 !== e.schema[r.keyword] || r.implements && function(r) {
                        for(var a = r.implements, t = 0; t < a.length; t++)if (void 0 !== e.schema[a[t]]) return !0;
                    }(r);
                }
                return d && (t += " " + P + " "), g ? (s ? (t += " if (errors === 0) return data;           ", t += " else throw new ValidationError(vErrors); ") : (t += " validate.errors = vErrors; ", t += " return errors === 0;       "), t += " }; return validate;") : t += " var " + v + " = errors === errs_" + c + ";", t;
            };
        },
        {}
    ],
    "qdYs": [
        function(require1, module1, exports) {
            "use strict";
            var e = require1("./resolve"), r = require1("./util"), t = require1("./error_classes"), i = require1("fast-json-stable-stringify"), o = require1("../dotjs/validate"), a = r.ucs2length, n = require1("fast-deep-equal"), s = t.Validation;
            function l(f, g, y, w) {
                var R = this, V = this._opts, S = [
                    void 0
                ], _ = {}, b = [], E = {}, q = [], j = {}, x = [];
                g = g || {
                    schema: f,
                    refVal: S,
                    refs: _
                };
                var $ = c.call(this, f, g, w), k = this._compilations[$.index];
                if ($.compiling) return k.callValidate = function e() {
                    var r = k.validate;
                    var t = r.apply(this, arguments);
                    e.errors = r.errors;
                    return t;
                };
                var C = this._formats, P = this.RULES;
                try {
                    var I = U(f, g, y, w);
                    k.validate = I;
                    var L = k.callValidate;
                    return L && (L.schema = I.schema, L.errors = null, L.refs = I.refs, L.refVal = I.refVal, L.root = I.root, L.$async = I.$async, V.sourceCode && (L.source = I.source)), I;
                } finally{
                    u.call(this, f, g, w);
                }
                function U(i, c, u, f) {
                    var y = !c || c && c.schema == i;
                    if (c.schema != g.schema) return l.call(R, i, c, u, f);
                    var w, E = !0 === i.$async, j = o({
                        isTop: !0,
                        schema: i,
                        isRoot: y,
                        baseId: f,
                        root: c,
                        schemaPath: "",
                        errSchemaPath: "#",
                        errorPath: '""',
                        MissingRefError: t.MissingRef,
                        RULES: P,
                        validate: o,
                        util: r,
                        resolve: e,
                        resolveRef: M,
                        usePattern: T,
                        useDefault: D,
                        useCustomRule: F,
                        opts: V,
                        formats: C,
                        logger: R.logger,
                        self: R
                    });
                    j = p(S, h) + p(b, d) + p(q, v) + p(x, m) + j, V.processCode && (j = V.processCode(j, i));
                    try {
                        w = new Function("self", "RULES", "formats", "root", "refVal", "defaults", "customRules", "equal", "ucs2length", "ValidationError", j)(R, P, C, g, S, q, x, n, a, s), S[0] = w;
                    } catch ($) {
                        throw R.logger.error("Error compiling schema, function code:", j), $;
                    }
                    return w.schema = i, w.errors = null, w.refs = _, w.refVal = S, w.root = y ? w : c, E && (w.$async = !0), !0 === V.sourceCode && (w.source = {
                        code: j,
                        patterns: b,
                        defaults: q
                    }), w;
                }
                function M(r, t, i) {
                    t = e.url(r, t);
                    var o, a, n = _[t];
                    if (void 0 !== n) return Q(o = S[n], a = "refVal[" + n + "]");
                    if (!i && g.refs) {
                        var s = g.refs[t];
                        if (void 0 !== s) return Q(o = g.refVal[s], a = O(t, o));
                    }
                    a = O(t);
                    var c = e.call(R, U, g, t);
                    if (void 0 === c) {
                        var u = y && y[t];
                        u && (c = e.inlineRef(u, V.inlineRefs) ? u : l.call(R, u, g, y, r));
                    }
                    if (void 0 !== c) return function(e, r) {
                        var t = _[e];
                        S[t] = r;
                    }(t, c), Q(c, a);
                    !function(e) {
                        delete _[e];
                    }(t);
                }
                function O(e, r) {
                    var t = S.length;
                    return S[t] = r, _[e] = t, "refVal" + t;
                }
                function Q(e, r) {
                    return "object" == typeof e || "boolean" == typeof e ? {
                        code: r,
                        schema: e,
                        inline: !0
                    } : {
                        code: r,
                        $async: e && !!e.$async
                    };
                }
                function T(e) {
                    var r = E[e];
                    return void 0 === r && (r = E[e] = b.length, b[r] = e), "pattern" + r;
                }
                function D(e) {
                    switch(typeof e){
                        case "boolean":
                        case "number":
                            return "" + e;
                        case "string":
                            return r.toQuotedString(e);
                        case "object":
                            if (null === e) return "null";
                            var t = i(e), o = j[t];
                            return void 0 === o && (o = j[t] = q.length, q[o] = e), "default" + o;
                    }
                }
                function F(e, r, t, i) {
                    if (!1 !== R._opts.validateSchema) {
                        var o = e.definition.dependencies;
                        if (o && !o.every(function(e) {
                            return Object.prototype.hasOwnProperty.call(t, e);
                        })) throw new Error("parent schema must have all required keywords: " + o.join(","));
                        var a = e.definition.validateSchema;
                        if (a) {
                            if (!a(r)) {
                                var n = "keyword schema is invalid: " + R.errorsText(a.errors);
                                if ("log" != R._opts.validateSchema) throw new Error(n);
                                R.logger.error(n);
                            }
                        }
                    }
                    var s, l = e.definition.compile, c = e.definition.inline, u = e.definition.macro;
                    if (l) s = l.call(R, r, t, i);
                    else if (u) s = u.call(R, r, t, i), !1 !== V.validateSchema && R.validateSchema(s, !0);
                    else if (c) s = c.call(R, i, e.keyword, r, t);
                    else if (!(s = e.definition.validate)) return;
                    if (void 0 === s) throw new Error('custom keyword "' + e.keyword + '"failed to compile');
                    var f = x.length;
                    return x[f] = s, {
                        code: "customRule" + f,
                        validate: s
                    };
                }
            }
            function c(e, r, t) {
                var i = f.call(this, e, r, t);
                return i >= 0 ? {
                    index: i,
                    compiling: !0
                } : (i = this._compilations.length, this._compilations[i] = {
                    schema: e,
                    root: r,
                    baseId: t
                }, {
                    index: i,
                    compiling: !1
                });
            }
            function u(e, r, t) {
                var i = f.call(this, e, r, t);
                i >= 0 && this._compilations.splice(i, 1);
            }
            function f(e, r, t) {
                for(var i = 0; i < this._compilations.length; i++){
                    var o = this._compilations[i];
                    if (o.schema == e && o.root == r && o.baseId == t) return i;
                }
                return -1;
            }
            function d(e, t) {
                return "var pattern" + e + " = new RegExp(" + r.toQuotedString(t[e]) + ");";
            }
            function v(e) {
                return "var default" + e + " = defaults[" + e + "];";
            }
            function h(e, r) {
                return void 0 === r[e] ? "" : "var refVal" + e + " = refVal[" + e + "];";
            }
            function m(e) {
                return "var customRule" + e + " = customRules[" + e + "];";
            }
            function p(e, r) {
                if (!e.length) return "";
                for(var t = "", i = 0; i < e.length; i++)t += r(i, e);
                return t;
            }
            module1.exports = l;
        },
        {
            "./resolve": "w10T",
            "./util": "Q1F7",
            "./error_classes": "OtNE",
            "fast-json-stable-stringify": "Xb3N",
            "../dotjs/validate": "yhC1",
            "fast-deep-equal": "dPQH"
        }
    ],
    "fXCy": [
        function(require1, module1, exports) {
            "use strict";
            var t = module1.exports = function() {
                this._cache = {};
            };
            t.prototype.put = function(t, e) {
                this._cache[t] = e;
            }, t.prototype.get = function(t) {
                return this._cache[t];
            }, t.prototype.del = function(t) {
                delete this._cache[t];
            }, t.prototype.clear = function() {
                this._cache = {};
            };
        },
        {}
    ],
    "dfAH": [
        function(require1, module1, exports) {
            "use strict";
            var d = require1("./util"), a = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, u = [
                0,
                31,
                28,
                31,
                30,
                31,
                30,
                31,
                31,
                30,
                31,
                30,
                31
            ], F = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i, f = /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i, D = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i, t = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i, r = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i, e = /^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-)*(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-)*(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i, i = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i, z = /^(?:\/(?:[^~/]|~0|~1)*)*$/, $ = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i, n = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;
            function s(a) {
                return a = "full" == a ? "full" : "fast", d.copy(s[a]);
            }
            function x(d) {
                return d % 4 == 0 && (d % 100 != 0 || d % 400 == 0);
            }
            function _(d) {
                var F = d.match(a);
                if (!F) return !1;
                var f = +F[1], D = +F[2], t = +F[3];
                return D >= 1 && D <= 12 && t >= 1 && t <= (2 == D && x(f) ? 29 : u[D]);
            }
            function o(d, a) {
                var u = d.match(F);
                if (!u) return !1;
                var f = u[1], D = u[2], t = u[3], r = u[5];
                return (f <= 23 && D <= 59 && t <= 59 || 23 == f && 59 == D && 60 == t) && (!a || r);
            }
            module1.exports = s, s.fast = {
                date: /^\d\d\d\d-[0-1]\d-[0-3]\d$/,
                time: /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i,
                "date-time": /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i,
                uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
                "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
                "uri-template": r,
                url: e,
                email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
                hostname: f,
                ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
                ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
                regex: v,
                uuid: i,
                "json-pointer": z,
                "json-pointer-uri-fragment": $,
                "relative-json-pointer": n
            }, s.full = {
                date: _,
                time: o,
                "date-time": B,
                uri: l,
                "uri-reference": t,
                "uri-template": r,
                url: e,
                email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
                hostname: f,
                ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
                ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
                regex: v,
                uuid: i,
                "json-pointer": z,
                "json-pointer-uri-fragment": $,
                "relative-json-pointer": n
            };
            var E = /t|\s/i;
            function B(d) {
                var a = d.split(E);
                return 2 == a.length && _(a[0]) && o(a[1], !0);
            }
            var C = /\/|:/;
            function l(d) {
                return C.test(d) && D.test(d);
            }
            var p = /[^\\]\\Z/;
            function v(d) {
                if (p.test(d)) return !1;
                try {
                    return new RegExp(d), !0;
                } catch (a) {
                    return !1;
                }
            }
        },
        {
            "./util": "Q1F7"
        }
    ],
    "a2na": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(r, e, a) {
                var s, t, o = " ", i = r.level, l = r.dataLevel, c = r.schema[e], n = r.errSchemaPath + "/" + e, h = !r.opts.allErrors, v = "data" + (l || ""), f = "valid" + i;
                if ("#" == c || "#/" == c) r.isRoot ? (s = r.async, t = "validate") : (s = !0 === r.root.schema.$async, t = "root.refVal[0]");
                else {
                    var d = r.resolveRef(r.baseId, c, r.isRoot);
                    if (void 0 === d) {
                        var p = r.MissingRefError.message(r.baseId, c);
                        if ("fail" == r.opts.missingRefs) {
                            r.logger.error(p), (g = g || []).push(o), o = "", !1 !== r.createErrors ? (o += " { keyword: '$ref' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(n) + " , params: { ref: '" + r.util.escapeQuotes(c) + "' } ", !1 !== r.opts.messages && (o += " , message: 'can\\'t resolve reference " + r.util.escapeQuotes(c) + "' "), r.opts.verbose && (o += " , schema: " + r.util.toQuotedString(c) + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + v + " "), o += " } ") : o += " {} ";
                            var m = o;
                            o = g.pop(), !r.compositeRule && h ? r.async ? o += " throw new ValidationError([" + m + "]); " : o += " validate.errors = [" + m + "]; return false; " : o += " var err = " + m + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", h && (o += " if (false) { ");
                        } else {
                            if ("ignore" != r.opts.missingRefs) throw new r.MissingRefError(r.baseId, c, p);
                            r.logger.warn(p), h && (o += " if (true) { ");
                        }
                    } else if (d.inline) {
                        var u = r.util.copy(r);
                        u.level++;
                        var E = "valid" + u.level;
                        u.schema = d.schema, u.schemaPath = "", u.errSchemaPath = c, o += " " + r.validate(u).replace(/validate\.schema/g, d.code) + " ", h && (o += " if (" + E + ") { ");
                    } else s = !0 === d.$async || r.async && !1 !== d.$async, t = d.code;
                }
                if (t) {
                    var g;
                    (g = g || []).push(o), o = "", r.opts.passContext ? o += " " + t + ".call(this, " : o += " " + t + "( ", o += " " + v + ", (dataPath || '')", '""' != r.errorPath && (o += " + " + r.errorPath);
                    var y = o += " , " + (l ? "data" + (l - 1 || "") : "parentData") + " , " + (l ? r.dataPathArr[l] : "parentDataProperty") + ", rootData)  ";
                    if (o = g.pop(), s) {
                        if (!r.async) throw new Error("async schema referenced by sync schema");
                        h && (o += " var " + f + "; "), o += " try { await " + y + "; ", h && (o += " " + f + " = true; "), o += " } catch (e) { if (!(e instanceof ValidationError)) throw e; if (vErrors === null) vErrors = e.errors; else vErrors = vErrors.concat(e.errors); errors = vErrors.length; ", h && (o += " " + f + " = false; "), o += " } ", h && (o += " if (" + f + ") { ");
                    } else o += " if (!" + y + ") { if (vErrors === null) vErrors = " + t + ".errors; else vErrors = vErrors.concat(" + t + ".errors); errors = vErrors.length; } ", h && (o += " else { ");
                }
                return o;
            };
        },
        {}
    ],
    "hRgn": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, t, a) {
                var r = " ", s = e.schema[t], l = e.schemaPath + e.util.getProperty(t), c = e.errSchemaPath + "/" + t, h = !e.opts.allErrors, i = e.util.copy(e), o = "";
                i.level++;
                var u = "valid" + i.level, m = i.baseId, v = !0, d = s;
                if (d) for(var f, p = -1, n = d.length - 1; p < n;)f = d[p += 1], (e.opts.strictKeywords ? "object" == typeof f && Object.keys(f).length > 0 || !1 === f : e.util.schemaHasRules(f, e.RULES.all)) && (v = !1, i.schema = f, i.schemaPath = l + "[" + p + "]", i.errSchemaPath = c + "/" + p, r += "  " + e.validate(i) + " ", i.baseId = m, h && (r += " if (" + u + ") { ", o += "}"));
                return h && (r += v ? " if (true) { " : " " + o.slice(0, -1) + " "), r;
            };
        },
        {}
    ],
    "lo6J": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, r, a) {
                var s = " ", t = e.level, o = e.dataLevel, l = e.schema[r], i = e.schemaPath + e.util.getProperty(r), c = e.errSchemaPath + "/" + r, h = !e.opts.allErrors, v = "data" + (o || ""), m = "valid" + t, u = "errs__" + t, n = e.util.copy(e), d = "";
                n.level++;
                var p = "valid" + n.level;
                if (l.every(function(r) {
                    return e.opts.strictKeywords ? "object" == typeof r && Object.keys(r).length > 0 || !1 === r : e.util.schemaHasRules(r, e.RULES.all);
                })) {
                    var f = n.baseId;
                    s += " var " + u + " = errors; var " + m + " = false;  ";
                    var E = e.compositeRule;
                    e.compositeRule = n.compositeRule = !0;
                    var y = l;
                    if (y) for(var P, R = -1, g = y.length - 1; R < g;)P = y[R += 1], n.schema = P, n.schemaPath = i + "[" + R + "]", n.errSchemaPath = c + "/" + R, s += "  " + e.validate(n) + " ", n.baseId = f, s += " " + m + " = " + m + " || " + p + "; if (!" + m + ") { ", d += "}";
                    e.compositeRule = n.compositeRule = E, s += " " + d + " if (!" + m + ") {   var err =   ", !1 !== e.createErrors ? (s += " { keyword: 'anyOf' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(c) + " , params: {} ", !1 !== e.opts.messages && (s += " , message: 'should match some schema in anyOf' "), e.opts.verbose && (s += " , schema: validate.schema" + i + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + v + " "), s += " } ") : s += " {} ", s += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", !e.compositeRule && h && (e.async ? s += " throw new ValidationError(vErrors); " : s += " validate.errors = vErrors; return false; "), s += " } else {  errors = " + u + "; if (vErrors !== null) { if (" + u + ") vErrors.length = " + u + "; else vErrors = null; } ", e.opts.allErrors && (s += " } ");
                } else h && (s += " if (true) { ");
                return s;
            };
        },
        {}
    ],
    "Kkzr": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(t, o, e) {
                var r = " ", s = t.schema[o], n = t.errSchemaPath + "/" + o, c = (t.opts.allErrors, t.util.toQuotedString(s));
                return !0 === t.opts.$comment ? r += " console.log(" + c + ");" : "function" == typeof t.opts.$comment && (r += " self._opts.$comment(" + c + ", " + t.util.toQuotedString(n) + ", validate.root.schema);"), r;
            };
        },
        {}
    ],
    "U4sD": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(a, e, r) {
                var t = " ", s = a.level, o = a.dataLevel, l = a.schema[e], h = a.schemaPath + a.util.getProperty(e), c = a.errSchemaPath + "/" + e, d = !a.opts.allErrors, m = "data" + (o || ""), v = "valid" + s, u = a.opts.$data && l && l.$data;
                u && (t += " var schema" + s + " = " + a.util.getData(l.$data, o, a.dataPathArr) + "; "), u || (t += " var schema" + s + " = validate.schema" + h + ";"), t += "var " + v + " = equal(" + m + ", schema" + s + "); if (!" + v + ") {   ";
                var i = i || [];
                i.push(t), t = "", !1 !== a.createErrors ? (t += " { keyword: 'const' , dataPath: (dataPath || '') + " + a.errorPath + " , schemaPath: " + a.util.toQuotedString(c) + " , params: { allowedValue: schema" + s + " } ", !1 !== a.opts.messages && (t += " , message: 'should be equal to constant' "), a.opts.verbose && (t += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + a.schemaPath + " , data: " + m + " "), t += " } ") : t += " {} ";
                var n = t;
                return t = i.pop(), !a.compositeRule && d ? a.async ? t += " throw new ValidationError([" + n + "]); " : t += " validate.errors = [" + n + "]; return false; " : t += " var err = " + n + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " }", d && (t += " else { "), t;
            };
        },
        {}
    ],
    "EypH": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, r, a) {
                var t = " ", s = e.level, l = e.dataLevel, o = e.schema[r], i = e.schemaPath + e.util.getProperty(r), v = e.errSchemaPath + "/" + r, h = !e.opts.allErrors, c = "data" + (l || ""), u = "valid" + s, d = "errs__" + s, m = e.util.copy(e);
                m.level++;
                var p = "valid" + m.level, n = "i" + s, P = m.dataLevel = e.dataLevel + 1, f = "data" + P, E = e.baseId, g = e.opts.strictKeywords ? "object" == typeof o && Object.keys(o).length > 0 || !1 === o : e.util.schemaHasRules(o, e.RULES.all);
                if (t += "var " + d + " = errors;var " + u + ";", g) {
                    var R = e.compositeRule;
                    e.compositeRule = m.compositeRule = !0, m.schema = o, m.schemaPath = i, m.errSchemaPath = v, t += " var " + p + " = false; for (var " + n + " = 0; " + n + " < " + c + ".length; " + n + "++) { ", m.errorPath = e.util.getPathExpr(e.errorPath, n, e.opts.jsonPointers, !0);
                    var y = c + "[" + n + "]";
                    m.dataPathArr[P] = n;
                    var b = e.validate(m);
                    m.baseId = E, e.util.varOccurences(b, f) < 2 ? t += " " + e.util.varReplace(b, f, y) + " " : t += " var " + f + " = " + y + "; " + b + " ", t += " if (" + p + ") break; }  ", e.compositeRule = m.compositeRule = R, t += "  if (!" + p + ") {";
                } else t += " if (" + c + ".length == 0) {";
                var S = S || [];
                S.push(t), t = "", !1 !== e.createErrors ? (t += " { keyword: 'contains' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(v) + " , params: {} ", !1 !== e.opts.messages && (t += " , message: 'should contain a valid item' "), e.opts.verbose && (t += " , schema: validate.schema" + i + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + c + " "), t += " } ") : t += " {} ";
                var w = t;
                return t = S.pop(), !e.compositeRule && h ? e.async ? t += " throw new ValidationError([" + w + "]); " : t += " validate.errors = [" + w + "]; return false; " : t += " var err = " + w + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " } else { ", g && (t += "  errors = " + d + "; if (vErrors !== null) { if (" + d + ") vErrors.length = " + d + "; else vErrors = null; } "), e.opts.allErrors && (t += " } "), t;
            };
        },
        {}
    ],
    "Cpp7": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, r, t) {
                var a = " ", s = e.level, o = e.dataLevel, p = e.schema[r], i = e.schemaPath + e.util.getProperty(r), l = e.errSchemaPath + "/" + r, u = !e.opts.allErrors, n = "data" + (o || ""), h = "errs__" + s, c = e.util.copy(e), d = "";
                c.level++;
                var v = "valid" + c.level, P = {}, m = {}, y = e.opts.ownProperties;
                for(j in p)if ("__proto__" != j) {
                    var g = p[j], f = Array.isArray(g) ? m : P;
                    f[j] = g;
                }
                a += "var " + h + " = errors;";
                var Q = e.errorPath;
                for(var j in a += "var missing" + s + ";", m)if ((f = m[j]).length) {
                    if (a += " if ( " + n + e.util.getProperty(j) + " !== undefined ", y && (a += " && Object.prototype.hasOwnProperty.call(" + n + ", '" + e.util.escapeQuotes(j) + "') "), u) {
                        a += " && ( ";
                        var w = f;
                        if (w) for(var E = -1, b = w.length - 1; E < b;)x = w[E += 1], E && (a += " || "), a += " ( ( " + (I = n + (D = e.util.getProperty(x))) + " === undefined ", y && (a += " || ! Object.prototype.hasOwnProperty.call(" + n + ", '" + e.util.escapeQuotes(x) + "') "), a += ") && (missing" + s + " = " + e.util.toQuotedString(e.opts.jsonPointers ? x : D) + ") ) ";
                        a += ")) {  ";
                        var O = "missing" + s, S = "' + " + O + " + '";
                        e.opts._errorDataPathProperty && (e.errorPath = e.opts.jsonPointers ? e.util.getPathExpr(Q, O, !0) : Q + " + " + O);
                        var _ = _ || [];
                        _.push(a), a = "", !1 !== e.createErrors ? (a += " { keyword: 'dependencies' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(l) + " , params: { property: '" + e.util.escapeQuotes(j) + "', missingProperty: '" + S + "', depsCount: " + f.length + ", deps: '" + e.util.escapeQuotes(1 == f.length ? f[0] : f.join(", ")) + "' } ", !1 !== e.opts.messages && (a += " , message: 'should have ", 1 == f.length ? a += "property " + e.util.escapeQuotes(f[0]) : a += "properties " + e.util.escapeQuotes(f.join(", ")), a += " when property " + e.util.escapeQuotes(j) + " is present' "), e.opts.verbose && (a += " , schema: validate.schema" + i + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + n + " "), a += " } ") : a += " {} ";
                        var k = a;
                        a = _.pop(), !e.compositeRule && u ? e.async ? a += " throw new ValidationError([" + k + "]); " : a += " validate.errors = [" + k + "]; return false; " : a += " var err = " + k + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                    } else {
                        a += " ) { ";
                        var R = f;
                        if (R) for(var x, A = -1, C = R.length - 1; A < C;){
                            x = R[A += 1];
                            var D = e.util.getProperty(x), I = (S = e.util.escapeQuotes(x), n + D);
                            e.opts._errorDataPathProperty && (e.errorPath = e.util.getPath(Q, x, e.opts.jsonPointers)), a += " if ( " + I + " === undefined ", y && (a += " || ! Object.prototype.hasOwnProperty.call(" + n + ", '" + e.util.escapeQuotes(x) + "') "), a += ") {  var err =   ", !1 !== e.createErrors ? (a += " { keyword: 'dependencies' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(l) + " , params: { property: '" + e.util.escapeQuotes(j) + "', missingProperty: '" + S + "', depsCount: " + f.length + ", deps: '" + e.util.escapeQuotes(1 == f.length ? f[0] : f.join(", ")) + "' } ", !1 !== e.opts.messages && (a += " , message: 'should have ", 1 == f.length ? a += "property " + e.util.escapeQuotes(f[0]) : a += "properties " + e.util.escapeQuotes(f.join(", ")), a += " when property " + e.util.escapeQuotes(j) + " is present' "), e.opts.verbose && (a += " , schema: validate.schema" + i + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + n + " "), a += " } ") : a += " {} ", a += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ";
                        }
                    }
                    a += " }   ", u && (d += "}", a += " else { ");
                }
                e.errorPath = Q;
                var L = c.baseId;
                for(var j in P){
                    g = P[j];
                    (e.opts.strictKeywords ? "object" == typeof g && Object.keys(g).length > 0 || !1 === g : e.util.schemaHasRules(g, e.RULES.all)) && (a += " " + v + " = true; if ( " + n + e.util.getProperty(j) + " !== undefined ", y && (a += " && Object.prototype.hasOwnProperty.call(" + n + ", '" + e.util.escapeQuotes(j) + "') "), a += ") { ", c.schema = g, c.schemaPath = i + e.util.getProperty(j), c.errSchemaPath = l + "/" + e.util.escapeFragment(j), a += "  " + e.validate(c) + " ", c.baseId = L, a += " }  ", u && (a += " if (" + v + ") { ", d += "}"));
                }
                return u && (a += "   " + d + " if (" + h + " == errors) {"), a;
            };
        },
        {}
    ],
    "fqDY": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(a, e, r) {
                var t = " ", s = a.level, l = a.dataLevel, o = a.schema[e], h = a.schemaPath + a.util.getProperty(e), d = a.errSchemaPath + "/" + e, i = !a.opts.allErrors, u = "data" + (l || ""), m = "valid" + s, v = a.opts.$data && o && o.$data;
                v && (t += " var schema" + s + " = " + a.util.getData(o.$data, l, a.dataPathArr) + "; ");
                var c = "i" + s, n = "schema" + s;
                v || (t += " var " + n + " = validate.schema" + h + ";"), t += "var " + m + ";", v && (t += " if (schema" + s + " === undefined) " + m + " = true; else if (!Array.isArray(schema" + s + ")) " + m + " = false; else {"), t += m + " = false;for (var " + c + "=0; " + c + "<" + n + ".length; " + c + "++) if (equal(" + u + ", " + n + "[" + c + "])) { " + m + " = true; break; }", v && (t += "  }  "), t += " if (!" + m + ") {   ";
                var p = p || [];
                p.push(t), t = "", !1 !== a.createErrors ? (t += " { keyword: 'enum' , dataPath: (dataPath || '') + " + a.errorPath + " , schemaPath: " + a.util.toQuotedString(d) + " , params: { allowedValues: schema" + s + " } ", !1 !== a.opts.messages && (t += " , message: 'should be equal to one of the allowed values' "), a.opts.verbose && (t += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + a.schemaPath + " , data: " + u + " "), t += " } ") : t += " {} ";
                var f = t;
                return t = p.pop(), !a.compositeRule && i ? a.async ? t += " throw new ValidationError([" + f + "]); " : t += " validate.errors = [" + f + "]; return false; " : t += " var err = " + f + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " }", i && (t += " else { "), t;
            };
        },
        {}
    ],
    "avoW": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(a, t, r) {
                var e = " ", o = a.level, s = a.dataLevel, i = a.schema[t], n = a.schemaPath + a.util.getProperty(t), f = a.errSchemaPath + "/" + t, c = !a.opts.allErrors, u = "data" + (s || "");
                if (!1 === a.opts.format) return c && (e += " if (true) { "), e;
                var m, h = a.opts.$data && i && i.$data;
                h ? (e += " var schema" + o + " = " + a.util.getData(i.$data, s, a.dataPathArr) + "; ", m = "schema" + o) : m = i;
                var l = a.opts.unknownFormats, d = Array.isArray(l);
                if (h) e += " var " + (p = "format" + o) + " = formats[" + m + "]; var " + (v = "isObject" + o) + " = typeof " + p + " == 'object' && !(" + p + " instanceof RegExp) && " + p + ".validate; var " + (y = "formatType" + o) + " = " + v + " && " + p + ".type || 'string'; if (" + v + ") { ", a.async && (e += " var async" + o + " = " + p + ".async; "), e += " " + p + " = " + p + ".validate; } if (  ", h && (e += " (" + m + " !== undefined && typeof " + m + " != 'string') || "), e += " (", "ignore" != l && (e += " (" + m + " && !" + p + " ", d && (e += " && self._opts.unknownFormats.indexOf(" + m + ") == -1 "), e += ") || "), e += " (" + p + " && " + y + " == '" + r + "' && !(typeof " + p + " == 'function' ? ", a.async ? e += " (async" + o + " ? await " + p + "(" + u + ") : " + p + "(" + u + ")) " : e += " " + p + "(" + u + ") ", e += " : " + p + ".test(" + u + "))))) {";
                else {
                    var p;
                    if (!(p = a.formats[i])) {
                        if ("ignore" == l) return a.logger.warn('unknown format "' + i + '" ignored in schema at path "' + a.errSchemaPath + '"'), c && (e += " if (true) { "), e;
                        if (d && l.indexOf(i) >= 0) return c && (e += " if (true) { "), e;
                        throw new Error('unknown format "' + i + '" is used in schema at path "' + a.errSchemaPath + '"');
                    }
                    var v, y = (v = "object" == typeof p && !(p instanceof RegExp) && p.validate) && p.type || "string";
                    if (v) {
                        var g = !0 === p.async;
                        p = p.validate;
                    }
                    if (y != r) return c && (e += " if (true) { "), e;
                    if (g) {
                        if (!a.async) throw new Error("async format in sync schema");
                        e += " if (!(await " + (w = "formats" + a.util.getProperty(i) + ".validate") + "(" + u + "))) { ";
                    } else {
                        e += " if (! ";
                        var w = "formats" + a.util.getProperty(i);
                        v && (w += ".validate"), e += "function" == typeof p ? " " + w + "(" + u + ") " : " " + w + ".test(" + u + ") ", e += ") { ";
                    }
                }
                var P = P || [];
                P.push(e), e = "", !1 !== a.createErrors ? (e += " { keyword: 'format' , dataPath: (dataPath || '') + " + a.errorPath + " , schemaPath: " + a.util.toQuotedString(f) + " , params: { format:  ", e += h ? "" + m : "" + a.util.toQuotedString(i), e += "  } ", !1 !== a.opts.messages && (e += " , message: 'should match format \"", e += h ? "' + " + m + " + '" : "" + a.util.escapeQuotes(i), e += "\"' "), a.opts.verbose && (e += " , schema:  ", e += h ? "validate.schema" + n : "" + a.util.toQuotedString(i), e += "         , parentSchema: validate.schema" + a.schemaPath + " , data: " + u + " "), e += " } ") : e += " {} ";
                var E = e;
                return e = P.pop(), !a.compositeRule && c ? a.async ? e += " throw new ValidationError([" + E + "]); " : e += " validate.errors = [" + E + "]; return false; " : e += " var err = " + E + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", e += " } ", c && (e += " else { "), e;
            };
        },
        {}
    ],
    "JHQ3": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, r, a) {
                var s = " ", t = e.level, l = e.dataLevel, h = e.schema[r], o = e.schemaPath + e.util.getProperty(r), c = e.errSchemaPath + "/" + r, i = !e.opts.allErrors, m = "data" + (l || ""), v = "valid" + t, u = "errs__" + t, d = e.util.copy(e);
                d.level++;
                var n = "valid" + d.level, p = e.schema.then, P = e.schema.else, f = void 0 !== p && (e.opts.strictKeywords ? "object" == typeof p && Object.keys(p).length > 0 || !1 === p : e.util.schemaHasRules(p, e.RULES.all)), E = void 0 !== P && (e.opts.strictKeywords ? "object" == typeof P && Object.keys(P).length > 0 || !1 === P : e.util.schemaHasRules(P, e.RULES.all)), y = d.baseId;
                if (f || E) {
                    var R;
                    d.createErrors = !1, d.schema = h, d.schemaPath = o, d.errSchemaPath = c, s += " var " + u + " = errors; var " + v + " = true;  ";
                    var S = e.compositeRule;
                    e.compositeRule = d.compositeRule = !0, s += "  " + e.validate(d) + " ", d.baseId = y, d.createErrors = !0, s += "  errors = " + u + "; if (vErrors !== null) { if (" + u + ") vErrors.length = " + u + "; else vErrors = null; }  ", e.compositeRule = d.compositeRule = S, f ? (s += " if (" + n + ") {  ", d.schema = e.schema.then, d.schemaPath = e.schemaPath + ".then", d.errSchemaPath = e.errSchemaPath + "/then", s += "  " + e.validate(d) + " ", d.baseId = y, s += " " + v + " = " + n + "; ", f && E ? s += " var " + (R = "ifClause" + t) + " = 'then'; " : R = "'then'", s += " } ", E && (s += " else { ")) : s += " if (!" + n + ") { ", E && (d.schema = e.schema.else, d.schemaPath = e.schemaPath + ".else", d.errSchemaPath = e.errSchemaPath + "/else", s += "  " + e.validate(d) + " ", d.baseId = y, s += " " + v + " = " + n + "; ", f && E ? s += " var " + (R = "ifClause" + t) + " = 'else'; " : R = "'else'", s += " } "), s += " if (!" + v + ") {   var err =   ", !1 !== e.createErrors ? (s += " { keyword: 'if' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(c) + " , params: { failingKeyword: " + R + " } ", !1 !== e.opts.messages && (s += " , message: 'should match \"' + " + R + " + '\" schema' "), e.opts.verbose && (s += " , schema: validate.schema" + o + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + m + " "), s += " } ") : s += " {} ", s += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", !e.compositeRule && i && (e.async ? s += " throw new ValidationError(vErrors); " : s += " validate.errors = vErrors; return false; "), s += " }   ", i && (s += " else { ");
                } else i && (s += " if (true) { ");
                return s;
            };
        },
        {}
    ],
    "aiPb": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, a, r) {
                var t = " ", s = e.level, l = e.dataLevel, h = e.schema[a], o = e.schemaPath + e.util.getProperty(a), i = e.errSchemaPath + "/" + a, c = !e.opts.allErrors, v = "data" + (l || ""), d = "valid" + s, n = "errs__" + s, m = e.util.copy(e), u = "";
                m.level++;
                var P = "valid" + m.level, p = "i" + s, f = m.dataLevel = e.dataLevel + 1, g = "data" + f, y = e.baseId;
                if (t += "var " + n + " = errors;var " + d + ";", Array.isArray(h)) {
                    var b = e.schema.additionalItems;
                    if (!1 === b) {
                        t += " " + d + " = " + v + ".length <= " + h.length + "; ";
                        var E = i;
                        i = e.errSchemaPath + "/additionalItems", t += "  if (!" + d + ") {   ";
                        var S = S || [];
                        S.push(t), t = "", !1 !== e.createErrors ? (t += " { keyword: 'additionalItems' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(i) + " , params: { limit: " + h.length + " } ", !1 !== e.opts.messages && (t += " , message: 'should NOT have more than " + h.length + " items' "), e.opts.verbose && (t += " , schema: false , parentSchema: validate.schema" + e.schemaPath + " , data: " + v + " "), t += " } ") : t += " {} ";
                        var j = t;
                        t = S.pop(), !e.compositeRule && c ? e.async ? t += " throw new ValidationError([" + j + "]); " : t += " validate.errors = [" + j + "]; return false; " : t += " var err = " + j + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " } ", i = E, c && (u += "}", t += " else { ");
                    }
                    var R = h;
                    if (R) {
                        for(var I, O = -1, k = R.length - 1; O < k;)if (I = R[O += 1], e.opts.strictKeywords ? "object" == typeof I && Object.keys(I).length > 0 || !1 === I : e.util.schemaHasRules(I, e.RULES.all)) {
                            t += " " + P + " = true; if (" + v + ".length > " + O + ") { ";
                            var w = v + "[" + O + "]";
                            m.schema = I, m.schemaPath = o + "[" + O + "]", m.errSchemaPath = i + "/" + O, m.errorPath = e.util.getPathExpr(e.errorPath, O, e.opts.jsonPointers, !0), m.dataPathArr[f] = O;
                            var L = e.validate(m);
                            m.baseId = y, e.util.varOccurences(L, g) < 2 ? t += " " + e.util.varReplace(L, g, w) + " " : t += " var " + g + " = " + w + "; " + L + " ", t += " }  ", c && (t += " if (" + P + ") { ", u += "}");
                        }
                    }
                    if ("object" == typeof b && (e.opts.strictKeywords ? "object" == typeof b && Object.keys(b).length > 0 || !1 === b : e.util.schemaHasRules(b, e.RULES.all))) {
                        m.schema = b, m.schemaPath = e.schemaPath + ".additionalItems", m.errSchemaPath = e.errSchemaPath + "/additionalItems", t += " " + P + " = true; if (" + v + ".length > " + h.length + ") {  for (var " + p + " = " + h.length + "; " + p + " < " + v + ".length; " + p + "++) { ", m.errorPath = e.util.getPathExpr(e.errorPath, p, e.opts.jsonPointers, !0);
                        w = v + "[" + p + "]";
                        m.dataPathArr[f] = p;
                        L = e.validate(m);
                        m.baseId = y, e.util.varOccurences(L, g) < 2 ? t += " " + e.util.varReplace(L, g, w) + " " : t += " var " + g + " = " + w + "; " + L + " ", c && (t += " if (!" + P + ") break; "), t += " } }  ", c && (t += " if (" + P + ") { ", u += "}");
                    }
                } else if (e.opts.strictKeywords ? "object" == typeof h && Object.keys(h).length > 0 || !1 === h : e.util.schemaHasRules(h, e.RULES.all)) {
                    m.schema = h, m.schemaPath = o, m.errSchemaPath = i, t += "  for (var " + p + " = 0; " + p + " < " + v + ".length; " + p + "++) { ", m.errorPath = e.util.getPathExpr(e.errorPath, p, e.opts.jsonPointers, !0);
                    w = v + "[" + p + "]";
                    m.dataPathArr[f] = p;
                    L = e.validate(m);
                    m.baseId = y, e.util.varOccurences(L, g) < 2 ? t += " " + e.util.varReplace(L, g, w) + " " : t += " var " + g + " = " + w + "; " + L + " ", c && (t += " if (!" + P + ") break; "), t += " }";
                }
                return c && (t += " " + u + " if (" + n + " == errors) {"), t;
            };
        },
        {}
    ],
    "UJAl": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, r, a) {
                var t, s = " ", o = e.level, i = e.dataLevel, m = e.schema[r], h = e.schemaPath + e.util.getProperty(r), u = e.errSchemaPath + "/" + r, l = !e.opts.allErrors, d = "data" + (i || ""), n = e.opts.$data && m && m.$data;
                n ? (s += " var schema" + o + " = " + e.util.getData(m.$data, i, e.dataPathArr) + "; ", t = "schema" + o) : t = m;
                var c = "maximum" == r, v = c ? "exclusiveMaximum" : "exclusiveMinimum", p = e.schema[v], f = e.opts.$data && p && p.$data, b = c ? "<" : ">", P = c ? ">" : "<", E = void 0;
                if (!n && "number" != typeof m && void 0 !== m) throw new Error(r + " must be number");
                if (!f && void 0 !== p && "number" != typeof p && "boolean" != typeof p) throw new Error(v + " must be number or boolean");
                if (f) {
                    var y = e.util.getData(p.$data, i, e.dataPathArr), x = "exclusive" + o, w = "exclType" + o, g = "exclIsNumber" + o, S = "' + " + (k = "op" + o) + " + '";
                    s += " var schemaExcl" + o + " = " + y + "; ", s += " var " + x + "; var " + w + " = typeof " + (y = "schemaExcl" + o) + "; if (" + w + " != 'boolean' && " + w + " != 'undefined' && " + w + " != 'number') { ";
                    var $;
                    E = v;
                    ($ = $ || []).push(s), s = "", !1 !== e.createErrors ? (s += " { keyword: '" + (E || "_exclusiveLimit") + "' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(u) + " , params: {} ", !1 !== e.opts.messages && (s += " , message: '" + v + " should be boolean' "), e.opts.verbose && (s += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + d + " "), s += " } ") : s += " {} ";
                    var M = s;
                    s = $.pop(), !e.compositeRule && l ? e.async ? s += " throw new ValidationError([" + M + "]); " : s += " validate.errors = [" + M + "]; return false; " : s += " var err = " + M + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", s += " } else if ( ", n && (s += " (" + t + " !== undefined && typeof " + t + " != 'number') || "), s += " " + w + " == 'number' ? ( (" + x + " = " + t + " === undefined || " + y + " " + b + "= " + t + ") ? " + d + " " + P + "= " + y + " : " + d + " " + P + " " + t + " ) : ( (" + x + " = " + y + " === true) ? " + d + " " + P + "= " + t + " : " + d + " " + P + " " + t + " ) || " + d + " !== " + d + ") { var op" + o + " = " + x + " ? '" + b + "' : '" + b + "='; ", void 0 === m && (E = v, u = e.errSchemaPath + "/" + v, t = y, n = f);
                } else {
                    S = b;
                    if ((g = "number" == typeof p) && n) {
                        var k = "'" + S + "'";
                        s += " if ( ", n && (s += " (" + t + " !== undefined && typeof " + t + " != 'number') || "), s += " ( " + t + " === undefined || " + p + " " + b + "= " + t + " ? " + d + " " + P + "= " + p + " : " + d + " " + P + " " + t + " ) || " + d + " !== " + d + ") { ";
                    } else {
                        g && void 0 === m ? (x = !0, E = v, u = e.errSchemaPath + "/" + v, t = p, P += "=") : (g && (t = Math[c ? "min" : "max"](p, m)), p === (!g || t) ? (x = !0, E = v, u = e.errSchemaPath + "/" + v, P += "=") : (x = !1, S += "="));
                        k = "'" + S + "'";
                        s += " if ( ", n && (s += " (" + t + " !== undefined && typeof " + t + " != 'number') || "), s += " " + d + " " + P + " " + t + " || " + d + " !== " + d + ") { ";
                    }
                }
                E = E || r, ($ = $ || []).push(s), s = "", !1 !== e.createErrors ? (s += " { keyword: '" + (E || "_limit") + "' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(u) + " , params: { comparison: " + k + ", limit: " + t + ", exclusive: " + x + " } ", !1 !== e.opts.messages && (s += " , message: 'should be " + S + " ", s += n ? "' + " + t : t + "'"), e.opts.verbose && (s += " , schema:  ", s += n ? "validate.schema" + h : "" + m, s += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + d + " "), s += " } ") : s += " {} ";
                M = s;
                return s = $.pop(), !e.compositeRule && l ? e.async ? s += " throw new ValidationError([" + M + "]); " : s += " validate.errors = [" + M + "]; return false; " : s += " var err = " + M + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", s += " } ", l && (s += " else { "), s;
            };
        },
        {}
    ],
    "W8ih": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, r, a) {
                var t, s = " ", o = e.level, m = e.dataLevel, h = e.schema[r], l = e.schemaPath + e.util.getProperty(r), i = e.errSchemaPath + "/" + r, d = !e.opts.allErrors, u = "data" + (m || ""), n = e.opts.$data && h && h.$data;
                if (n ? (s += " var schema" + o + " = " + e.util.getData(h.$data, m, e.dataPathArr) + "; ", t = "schema" + o) : t = h, !n && "number" != typeof h) throw new Error(r + " must be number");
                s += "if ( ", n && (s += " (" + t + " !== undefined && typeof " + t + " != 'number') || "), s += " " + u + ".length " + ("maxItems" == r ? ">" : "<") + " " + t + ") { ";
                var c = r, p = p || [];
                p.push(s), s = "", !1 !== e.createErrors ? (s += " { keyword: '" + (c || "_limitItems") + "' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(i) + " , params: { limit: " + t + " } ", !1 !== e.opts.messages && (s += " , message: 'should NOT have ", s += "maxItems" == r ? "more" : "fewer", s += " than ", s += n ? "' + " + t + " + '" : "" + h, s += " items' "), e.opts.verbose && (s += " , schema:  ", s += n ? "validate.schema" + l : "" + h, s += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + u + " "), s += " } ") : s += " {} ";
                var v = s;
                return s = p.pop(), !e.compositeRule && d ? e.async ? s += " throw new ValidationError([" + v + "]); " : s += " validate.errors = [" + v + "]; return false; " : s += " var err = " + v + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", s += "} ", d && (s += " else { "), s;
            };
        },
        {}
    ],
    "fZGX": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, r, a) {
                var t, s = " ", o = e.level, h = e.dataLevel, l = e.schema[r], m = e.schemaPath + e.util.getProperty(r), n = e.errSchemaPath + "/" + r, i = !e.opts.allErrors, u = "data" + (h || ""), c = e.opts.$data && l && l.$data;
                if (c ? (s += " var schema" + o + " = " + e.util.getData(l.$data, h, e.dataPathArr) + "; ", t = "schema" + o) : t = l, !c && "number" != typeof l) throw new Error(r + " must be number");
                var d = "maxLength" == r ? ">" : "<";
                s += "if ( ", c && (s += " (" + t + " !== undefined && typeof " + t + " != 'number') || "), !1 === e.opts.unicode ? s += " " + u + ".length " : s += " ucs2length(" + u + ") ", s += " " + d + " " + t + ") { ";
                var p = r, v = v || [];
                v.push(s), s = "", !1 !== e.createErrors ? (s += " { keyword: '" + (p || "_limitLength") + "' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(n) + " , params: { limit: " + t + " } ", !1 !== e.opts.messages && (s += " , message: 'should NOT be ", s += "maxLength" == r ? "longer" : "shorter", s += " than ", s += c ? "' + " + t + " + '" : "" + l, s += " characters' "), e.opts.verbose && (s += " , schema:  ", s += c ? "validate.schema" + m : "" + l, s += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + u + " "), s += " } ") : s += " {} ";
                var g = s;
                return s = v.pop(), !e.compositeRule && i ? e.async ? s += " throw new ValidationError([" + g + "]); " : s += " validate.errors = [" + g + "]; return false; " : s += " var err = " + g + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", s += "} ", i && (s += " else { "), s;
            };
        },
        {}
    ],
    "JAEr": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, r, a) {
                var t, s = " ", o = e.level, h = e.dataLevel, m = e.schema[r], i = e.schemaPath + e.util.getProperty(r), l = e.errSchemaPath + "/" + r, p = !e.opts.allErrors, d = "data" + (h || ""), u = e.opts.$data && m && m.$data;
                if (u ? (s += " var schema" + o + " = " + e.util.getData(m.$data, h, e.dataPathArr) + "; ", t = "schema" + o) : t = m, !u && "number" != typeof m) throw new Error(r + " must be number");
                s += "if ( ", u && (s += " (" + t + " !== undefined && typeof " + t + " != 'number') || "), s += " Object.keys(" + d + ").length " + ("maxProperties" == r ? ">" : "<") + " " + t + ") { ";
                var n = r, c = c || [];
                c.push(s), s = "", !1 !== e.createErrors ? (s += " { keyword: '" + (n || "_limitProperties") + "' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(l) + " , params: { limit: " + t + " } ", !1 !== e.opts.messages && (s += " , message: 'should NOT have ", s += "maxProperties" == r ? "more" : "fewer", s += " than ", s += u ? "' + " + t + " + '" : "" + m, s += " properties' "), e.opts.verbose && (s += " , schema:  ", s += u ? "validate.schema" + i : "" + m, s += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + d + " "), s += " } ") : s += " {} ";
                var v = s;
                return s = c.pop(), !e.compositeRule && p ? e.async ? s += " throw new ValidationError([" + v + "]); " : s += " validate.errors = [" + v + "]; return false; " : s += " var err = " + v + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", s += "} ", p && (s += " else { "), s;
            };
        },
        {}
    ],
    "oNPH": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, r, a) {
                var t, s = " ", i = e.level, o = e.dataLevel, l = e.schema[r], d = e.schemaPath + e.util.getProperty(r), h = e.errSchemaPath + "/" + r, n = !e.opts.allErrors, m = "data" + (o || ""), u = e.opts.$data && l && l.$data;
                if (u ? (s += " var schema" + i + " = " + e.util.getData(l.$data, o, e.dataPathArr) + "; ", t = "schema" + i) : t = l, !u && "number" != typeof l) throw new Error(r + " must be number");
                s += "var division" + i + ";if (", u && (s += " " + t + " !== undefined && ( typeof " + t + " != 'number' || "), s += " (division" + i + " = " + m + " / " + t + ", ", e.opts.multipleOfPrecision ? s += " Math.abs(Math.round(division" + i + ") - division" + i + ") > 1e-" + e.opts.multipleOfPrecision + " " : s += " division" + i + " !== parseInt(division" + i + ") ", s += " ) ", u && (s += "  )  "), s += " ) {   ";
                var p = p || [];
                p.push(s), s = "", !1 !== e.createErrors ? (s += " { keyword: 'multipleOf' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(h) + " , params: { multipleOf: " + t + " } ", !1 !== e.opts.messages && (s += " , message: 'should be multiple of ", s += u ? "' + " + t : t + "'"), e.opts.verbose && (s += " , schema:  ", s += u ? "validate.schema" + d : "" + l, s += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + m + " "), s += " } ") : s += " {} ";
                var v = s;
                return s = p.pop(), !e.compositeRule && n ? e.async ? s += " throw new ValidationError([" + v + "]); " : s += " validate.errors = [" + v + "]; return false; " : s += " var err = " + v + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", s += "} ", n && (s += " else { "), s;
            };
        },
        {}
    ],
    "mmjm": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(r, e, a) {
                var s = " ", t = r.level, o = r.dataLevel, l = r.schema[e], h = r.schemaPath + r.util.getProperty(e), c = r.errSchemaPath + "/" + e, i = !r.opts.allErrors, m = "data" + (o || ""), v = "errs__" + t, p = r.util.copy(r);
                p.level++;
                var u = "valid" + p.level;
                if (r.opts.strictKeywords ? "object" == typeof l && Object.keys(l).length > 0 || !1 === l : r.util.schemaHasRules(l, r.RULES.all)) {
                    p.schema = l, p.schemaPath = h, p.errSchemaPath = c, s += " var " + v + " = errors;  ";
                    var d, E = r.compositeRule;
                    r.compositeRule = p.compositeRule = !0, p.createErrors = !1, p.opts.allErrors && (d = p.opts.allErrors, p.opts.allErrors = !1), s += " " + r.validate(p) + " ", p.createErrors = !0, d && (p.opts.allErrors = d), r.compositeRule = p.compositeRule = E, s += " if (" + u + ") {   ";
                    var n = n || [];
                    n.push(s), s = "", !1 !== r.createErrors ? (s += " { keyword: 'not' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(c) + " , params: {} ", !1 !== r.opts.messages && (s += " , message: 'should NOT be valid' "), r.opts.verbose && (s += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + m + " "), s += " } ") : s += " {} ";
                    var P = s;
                    s = n.pop(), !r.compositeRule && i ? r.async ? s += " throw new ValidationError([" + P + "]); " : s += " validate.errors = [" + P + "]; return false; " : s += " var err = " + P + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", s += " } else {  errors = " + v + "; if (vErrors !== null) { if (" + v + ") vErrors.length = " + v + "; else vErrors = null; } ", r.opts.allErrors && (s += " } ");
                } else s += "  var err =   ", !1 !== r.createErrors ? (s += " { keyword: 'not' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(c) + " , params: {} ", !1 !== r.opts.messages && (s += " , message: 'should NOT be valid' "), r.opts.verbose && (s += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + m + " "), s += " } ") : s += " {} ", s += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", i && (s += " if (false) { ");
                return s;
            };
        },
        {}
    ],
    "SSWF": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, r, a) {
                var s = " ", t = e.level, l = e.dataLevel, o = e.schema[r], i = e.schemaPath + e.util.getProperty(r), c = e.errSchemaPath + "/" + r, h = !e.opts.allErrors, v = "data" + (l || ""), m = "valid" + t, u = "errs__" + t, n = e.util.copy(e), p = "";
                n.level++;
                var d = "valid" + n.level, f = n.baseId, E = "prevValid" + t, P = "passingSchemas" + t;
                s += "var " + u + " = errors , " + E + " = false , " + m + " = false , " + P + " = null; ";
                var g = e.compositeRule;
                e.compositeRule = n.compositeRule = !0;
                var y = o;
                if (y) for(var R, S = -1, b = y.length - 1; S < b;)R = y[S += 1], (e.opts.strictKeywords ? "object" == typeof R && Object.keys(R).length > 0 || !1 === R : e.util.schemaHasRules(R, e.RULES.all)) ? (n.schema = R, n.schemaPath = i + "[" + S + "]", n.errSchemaPath = c + "/" + S, s += "  " + e.validate(n) + " ", n.baseId = f) : s += " var " + d + " = true; ", S && (s += " if (" + d + " && " + E + ") { " + m + " = false; " + P + " = [" + P + ", " + S + "]; } else { ", p += "}"), s += " if (" + d + ") { " + m + " = " + E + " = true; " + P + " = " + S + "; }";
                return e.compositeRule = n.compositeRule = g, s += p + "if (!" + m + ") {   var err =   ", !1 !== e.createErrors ? (s += " { keyword: 'oneOf' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(c) + " , params: { passingSchemas: " + P + " } ", !1 !== e.opts.messages && (s += " , message: 'should match exactly one schema in oneOf' "), e.opts.verbose && (s += " , schema: validate.schema" + i + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + v + " "), s += " } ") : s += " {} ", s += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", !e.compositeRule && h && (e.async ? s += " throw new ValidationError(vErrors); " : s += " validate.errors = vErrors; return false; "), s += "} else {  errors = " + u + "; if (vErrors !== null) { if (" + u + ") vErrors.length = " + u + "; else vErrors = null; }", e.opts.allErrors && (s += " } "), s;
            };
        },
        {}
    ],
    "mGZS": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, t, a) {
                var r, s = " ", o = e.level, h = e.dataLevel, l = e.schema[t], u = e.schemaPath + e.util.getProperty(t), d = e.errSchemaPath + "/" + t, i = !e.opts.allErrors, n = "data" + (h || ""), p = e.opts.$data && l && l.$data;
                p ? (s += " var schema" + o + " = " + e.util.getData(l.$data, h, e.dataPathArr) + "; ", r = "schema" + o) : r = l, s += "if ( ", p && (s += " (" + r + " !== undefined && typeof " + r + " != 'string') || "), s += " !" + (p ? "(new RegExp(" + r + "))" : e.usePattern(l)) + ".test(" + n + ") ) {   ";
                var c = c || [];
                c.push(s), s = "", !1 !== e.createErrors ? (s += " { keyword: 'pattern' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(d) + " , params: { pattern:  ", s += p ? "" + r : "" + e.util.toQuotedString(l), s += "  } ", !1 !== e.opts.messages && (s += " , message: 'should match pattern \"", s += p ? "' + " + r + " + '" : "" + e.util.escapeQuotes(l), s += "\"' "), e.opts.verbose && (s += " , schema:  ", s += p ? "validate.schema" + u : "" + e.util.toQuotedString(l), s += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + n + " "), s += " } ") : s += " {} ";
                var m = s;
                return s = c.pop(), !e.compositeRule && i ? e.async ? s += " throw new ValidationError([" + m + "]); " : s += " validate.errors = [" + m + "]; return false; " : s += " var err = " + m + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", s += "} ", i && (s += " else { "), s;
            };
        },
        {}
    ],
    "jFnx": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, r, t) {
                var a = " ", o = e.level, s = e.dataLevel, i = e.schema[r], l = e.schemaPath + e.util.getProperty(r), h = e.errSchemaPath + "/" + r, p = !e.opts.allErrors, d = "data" + (s || ""), n = "errs__" + o, c = e.util.copy(e), P = "";
                c.level++;
                var u = "valid" + c.level, v = "key" + o, f = "idx" + o, m = c.dataLevel = e.dataLevel + 1, g = "data" + m, y = "dataProperties" + o, b = Object.keys(i || {}).filter(x), j = e.schema.patternProperties || {}, O = Object.keys(j).filter(x), S = e.schema.additionalProperties, E = b.length || O.length, R = !1 === S, k = "object" == typeof S && Object.keys(S).length, w = e.opts.removeAdditional, _ = R || k || w, Q = e.opts.ownProperties, A = e.baseId, D = e.schema.required;
                if (D && (!e.opts.$data || !D.$data) && D.length < e.opts.loopRequired) var q = e.util.toHash(D);
                function x(e) {
                    return "__proto__" !== e;
                }
                if (a += "var " + n + " = errors;var " + u + " = true;", Q && (a += " var " + y + " = undefined;"), _) {
                    if (a += Q ? " " + y + " = " + y + " || Object.keys(" + d + "); for (var " + f + "=0; " + f + "<" + y + ".length; " + f + "++) { var " + v + " = " + y + "[" + f + "]; " : " for (var " + v + " in " + d + ") { ", E) {
                        if (a += " var isAdditional" + o + " = !(false ", b.length) {
                            if (b.length > 8) a += " || validate.schema" + l + ".hasOwnProperty(" + v + ") ";
                            else {
                                var I = b;
                                if (I) for(var L = -1, H = I.length - 1; L < H;)M = I[L += 1], a += " || " + v + " == " + e.util.toQuotedString(M) + " ";
                            }
                        }
                        if (O.length) {
                            var F = O;
                            if (F) for(var K = -1, U = F.length - 1; K < U;)se = F[K += 1], a += " || " + e.usePattern(se) + ".test(" + v + ") ";
                        }
                        a += " ); if (isAdditional" + o + ") { ";
                    }
                    if ("all" == w) a += " delete " + d + "[" + v + "]; ";
                    else {
                        var V = e.errorPath, $ = "' + " + v + " + '";
                        if (e.opts._errorDataPathProperty && (e.errorPath = e.util.getPathExpr(e.errorPath, v, e.opts.jsonPointers)), R) {
                            if (w) a += " delete " + d + "[" + v + "]; ";
                            else {
                                a += " " + u + " = false; ";
                                var N = h;
                                h = e.errSchemaPath + "/additionalProperties", (te = te || []).push(a), a = "", !1 !== e.createErrors ? (a += " { keyword: 'additionalProperties' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(h) + " , params: { additionalProperty: '" + $ + "' } ", !1 !== e.opts.messages && (a += " , message: '", e.opts._errorDataPathProperty ? a += "is an invalid additional property" : a += "should NOT have additional properties", a += "' "), e.opts.verbose && (a += " , schema: false , parentSchema: validate.schema" + e.schemaPath + " , data: " + d + " "), a += " } ") : a += " {} ";
                                var T = a;
                                a = te.pop(), !e.compositeRule && p ? e.async ? a += " throw new ValidationError([" + T + "]); " : a += " validate.errors = [" + T + "]; return false; " : a += " var err = " + T + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", h = N, p && (a += " break; ");
                            }
                        } else if (k) {
                            if ("failing" == w) {
                                a += " var " + n + " = errors;  ";
                                var z = e.compositeRule;
                                e.compositeRule = c.compositeRule = !0, c.schema = S, c.schemaPath = e.schemaPath + ".additionalProperties", c.errSchemaPath = e.errSchemaPath + "/additionalProperties", c.errorPath = e.opts._errorDataPathProperty ? e.errorPath : e.util.getPathExpr(e.errorPath, v, e.opts.jsonPointers);
                                var B = d + "[" + v + "]";
                                c.dataPathArr[m] = v;
                                var C = e.validate(c);
                                c.baseId = A, e.util.varOccurences(C, g) < 2 ? a += " " + e.util.varReplace(C, g, B) + " " : a += " var " + g + " = " + B + "; " + C + " ", a += " if (!" + u + ") { errors = " + n + "; if (validate.errors !== null) { if (errors) validate.errors.length = errors; else validate.errors = null; } delete " + d + "[" + v + "]; }  ", e.compositeRule = c.compositeRule = z;
                            } else {
                                c.schema = S, c.schemaPath = e.schemaPath + ".additionalProperties", c.errSchemaPath = e.errSchemaPath + "/additionalProperties", c.errorPath = e.opts._errorDataPathProperty ? e.errorPath : e.util.getPathExpr(e.errorPath, v, e.opts.jsonPointers);
                                B = d + "[" + v + "]";
                                c.dataPathArr[m] = v;
                                C = e.validate(c);
                                c.baseId = A, e.util.varOccurences(C, g) < 2 ? a += " " + e.util.varReplace(C, g, B) + " " : a += " var " + g + " = " + B + "; " + C + " ", p && (a += " if (!" + u + ") break; ");
                            }
                        }
                        e.errorPath = V;
                    }
                    E && (a += " } "), a += " }  ", p && (a += " if (" + u + ") { ", P += "}");
                }
                var G = e.opts.useDefaults && !e.compositeRule;
                if (b.length) {
                    var J = b;
                    if (J) for(var M, W = -1, X = J.length - 1; W < X;){
                        var Y = i[M = J[W += 1]];
                        if (e.opts.strictKeywords ? "object" == typeof Y && Object.keys(Y).length > 0 || !1 === Y : e.util.schemaHasRules(Y, e.RULES.all)) {
                            var Z = e.util.getProperty(M), ee = (B = d + Z, G && void 0 !== Y.default);
                            c.schema = Y, c.schemaPath = l + Z, c.errSchemaPath = h + "/" + e.util.escapeFragment(M), c.errorPath = e.util.getPath(e.errorPath, M, e.opts.jsonPointers), c.dataPathArr[m] = e.util.toQuotedString(M);
                            C = e.validate(c);
                            if (c.baseId = A, e.util.varOccurences(C, g) < 2) {
                                C = e.util.varReplace(C, g, B);
                                var re = B;
                            } else {
                                re = g;
                                a += " var " + g + " = " + B + "; ";
                            }
                            if (ee) a += " " + C + " ";
                            else {
                                if (q && q[M]) {
                                    a += " if ( " + re + " === undefined ", Q && (a += " || ! Object.prototype.hasOwnProperty.call(" + d + ", '" + e.util.escapeQuotes(M) + "') "), a += ") { " + u + " = false; ";
                                    V = e.errorPath, N = h;
                                    var te, ae = e.util.escapeQuotes(M);
                                    e.opts._errorDataPathProperty && (e.errorPath = e.util.getPath(V, M, e.opts.jsonPointers)), h = e.errSchemaPath + "/required", (te = te || []).push(a), a = "", !1 !== e.createErrors ? (a += " { keyword: 'required' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(h) + " , params: { missingProperty: '" + ae + "' } ", !1 !== e.opts.messages && (a += " , message: '", e.opts._errorDataPathProperty ? a += "is a required property" : a += "should have required property \\'" + ae + "\\'", a += "' "), e.opts.verbose && (a += " , schema: validate.schema" + l + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + d + " "), a += " } ") : a += " {} ";
                                    T = a;
                                    a = te.pop(), !e.compositeRule && p ? e.async ? a += " throw new ValidationError([" + T + "]); " : a += " validate.errors = [" + T + "]; return false; " : a += " var err = " + T + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", h = N, e.errorPath = V, a += " } else { ";
                                } else p ? (a += " if ( " + re + " === undefined ", Q && (a += " || ! Object.prototype.hasOwnProperty.call(" + d + ", '" + e.util.escapeQuotes(M) + "') "), a += ") { " + u + " = true; } else { ") : (a += " if (" + re + " !== undefined ", Q && (a += " &&   Object.prototype.hasOwnProperty.call(" + d + ", '" + e.util.escapeQuotes(M) + "') "), a += " ) { ");
                                a += " " + C + " } ";
                            }
                        }
                        p && (a += " if (" + u + ") { ", P += "}");
                    }
                }
                if (O.length) {
                    var oe = O;
                    if (oe) for(var se, ie = -1, le = oe.length - 1; ie < le;){
                        Y = j[se = oe[ie += 1]];
                        if (e.opts.strictKeywords ? "object" == typeof Y && Object.keys(Y).length > 0 || !1 === Y : e.util.schemaHasRules(Y, e.RULES.all)) {
                            c.schema = Y, c.schemaPath = e.schemaPath + ".patternProperties" + e.util.getProperty(se), c.errSchemaPath = e.errSchemaPath + "/patternProperties/" + e.util.escapeFragment(se), a += Q ? " " + y + " = " + y + " || Object.keys(" + d + "); for (var " + f + "=0; " + f + "<" + y + ".length; " + f + "++) { var " + v + " = " + y + "[" + f + "]; " : " for (var " + v + " in " + d + ") { ", a += " if (" + e.usePattern(se) + ".test(" + v + ")) { ", c.errorPath = e.util.getPathExpr(e.errorPath, v, e.opts.jsonPointers);
                            B = d + "[" + v + "]";
                            c.dataPathArr[m] = v;
                            C = e.validate(c);
                            c.baseId = A, e.util.varOccurences(C, g) < 2 ? a += " " + e.util.varReplace(C, g, B) + " " : a += " var " + g + " = " + B + "; " + C + " ", p && (a += " if (!" + u + ") break; "), a += " } ", p && (a += " else " + u + " = true; "), a += " }  ", p && (a += " if (" + u + ") { ", P += "}");
                        }
                    }
                }
                return p && (a += " " + P + " if (" + n + " == errors) {"), a;
            };
        },
        {}
    ],
    "XxjR": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(r, e, a) {
                var t = " ", s = r.level, o = r.dataLevel, l = r.schema[e], i = r.schemaPath + r.util.getProperty(e), v = r.errSchemaPath + "/" + e, c = !r.opts.allErrors, p = "data" + (o || ""), m = "errs__" + s, h = r.util.copy(r);
                h.level++;
                var d = "valid" + h.level;
                if (t += "var " + m + " = errors;", r.opts.strictKeywords ? "object" == typeof l && Object.keys(l).length > 0 || !1 === l : r.util.schemaHasRules(l, r.RULES.all)) {
                    h.schema = l, h.schemaPath = i, h.errSchemaPath = v;
                    var u = "key" + s, n = "idx" + s, y = "i" + s, E = "' + " + u + " + '", P = "data" + (h.dataLevel = r.dataLevel + 1), f = "dataProperties" + s, R = r.opts.ownProperties, b = r.baseId;
                    R && (t += " var " + f + " = undefined; "), t += R ? " " + f + " = " + f + " || Object.keys(" + p + "); for (var " + n + "=0; " + n + "<" + f + ".length; " + n + "++) { var " + u + " = " + f + "[" + n + "]; " : " for (var " + u + " in " + p + ") { ", t += " var startErrs" + s + " = errors; ";
                    var g = u, k = r.compositeRule;
                    r.compositeRule = h.compositeRule = !0;
                    var w = r.validate(h);
                    h.baseId = b, r.util.varOccurences(w, P) < 2 ? t += " " + r.util.varReplace(w, P, g) + " " : t += " var " + P + " = " + g + "; " + w + " ", r.compositeRule = h.compositeRule = k, t += " if (!" + d + ") { for (var " + y + "=startErrs" + s + "; " + y + "<errors; " + y + "++) { vErrors[" + y + "].propertyName = " + u + "; }   var err =   ", !1 !== r.createErrors ? (t += " { keyword: 'propertyNames' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(v) + " , params: { propertyName: '" + E + "' } ", !1 !== r.opts.messages && (t += " , message: 'property name \\'" + E + "\\' is invalid' "), r.opts.verbose && (t += " , schema: validate.schema" + i + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + p + " "), t += " } ") : t += " {} ", t += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", !r.compositeRule && c && (r.async ? t += " throw new ValidationError(vErrors); " : t += " validate.errors = vErrors; return false; "), c && (t += " break; "), t += " } }";
                }
                return c && (t += "  if (" + m + " == errors) {"), t;
            };
        },
        {}
    ],
    "Dht1": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(r, e, a) {
                var t = " ", s = r.level, o = r.dataLevel, i = r.schema[e], h = r.schemaPath + r.util.getProperty(e), p = r.errSchemaPath + "/" + e, l = !r.opts.allErrors, d = "data" + (o || ""), u = "valid" + s, P = r.opts.$data && i && i.$data;
                P && (t += " var schema" + s + " = " + r.util.getData(i.$data, o, r.dataPathArr) + "; ");
                var n = "schema" + s;
                if (!P) {
                    if (i.length < r.opts.loopRequired && r.schema.properties && Object.keys(r.schema.properties).length) {
                        var c = [], m = i;
                        if (m) for(var v, y = -1, g = m.length - 1; y < g;){
                            v = m[y += 1];
                            var f = r.schema.properties[v];
                            f && (r.opts.strictKeywords ? "object" == typeof f && Object.keys(f).length > 0 || !1 === f : r.util.schemaHasRules(f, r.RULES.all)) || (c[c.length] = v);
                        }
                    } else c = i;
                }
                if (P || c.length) {
                    var E = r.errorPath, q = P || c.length >= r.opts.loopRequired, w = r.opts.ownProperties;
                    if (l) {
                        if (t += " var missing" + s + "; ", q) {
                            P || (t += " var " + n + " = validate.schema" + h + "; ");
                            var b = "' + " + (_ = "schema" + s + "[" + (D = "i" + s) + "]") + " + '";
                            r.opts._errorDataPathProperty && (r.errorPath = r.util.getPathExpr(E, _, r.opts.jsonPointers)), t += " var " + u + " = true; ", P && (t += " if (schema" + s + " === undefined) " + u + " = true; else if (!Array.isArray(schema" + s + ")) " + u + " = false; else {"), t += " for (var " + D + " = 0; " + D + " < " + n + ".length; " + D + "++) { " + u + " = " + d + "[" + n + "[" + D + "]] !== undefined ", w && (t += " &&   Object.prototype.hasOwnProperty.call(" + d + ", " + n + "[" + D + "]) "), t += "; if (!" + u + ") break; } ", P && (t += "  }  "), t += "  if (!" + u + ") {   ", (Q = Q || []).push(t), t = "", !1 !== r.createErrors ? (t += " { keyword: 'required' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(p) + " , params: { missingProperty: '" + b + "' } ", !1 !== r.opts.messages && (t += " , message: '", r.opts._errorDataPathProperty ? t += "is a required property" : t += "should have required property \\'" + b + "\\'", t += "' "), r.opts.verbose && (t += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + d + " "), t += " } ") : t += " {} ";
                            var S = t;
                            t = Q.pop(), !r.compositeRule && l ? r.async ? t += " throw new ValidationError([" + S + "]); " : t += " validate.errors = [" + S + "]; return false; " : t += " var err = " + S + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " } else { ";
                        } else {
                            t += " if ( ";
                            var j = c;
                            if (j) for(var D = -1, O = j.length - 1; D < O;)R = j[D += 1], D && (t += " || "), t += " ( ( " + (L = d + ($ = r.util.getProperty(R))) + " === undefined ", w && (t += " || ! Object.prototype.hasOwnProperty.call(" + d + ", '" + r.util.escapeQuotes(R) + "') "), t += ") && (missing" + s + " = " + r.util.toQuotedString(r.opts.jsonPointers ? R : $) + ") ) ";
                            t += ") {  ";
                            var Q;
                            b = "' + " + (_ = "missing" + s) + " + '";
                            r.opts._errorDataPathProperty && (r.errorPath = r.opts.jsonPointers ? r.util.getPathExpr(E, _, !0) : E + " + " + _), (Q = Q || []).push(t), t = "", !1 !== r.createErrors ? (t += " { keyword: 'required' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(p) + " , params: { missingProperty: '" + b + "' } ", !1 !== r.opts.messages && (t += " , message: '", r.opts._errorDataPathProperty ? t += "is a required property" : t += "should have required property \\'" + b + "\\'", t += "' "), r.opts.verbose && (t += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + d + " "), t += " } ") : t += " {} ";
                            S = t;
                            t = Q.pop(), !r.compositeRule && l ? r.async ? t += " throw new ValidationError([" + S + "]); " : t += " validate.errors = [" + S + "]; return false; " : t += " var err = " + S + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " } else { ";
                        }
                    } else if (q) {
                        P || (t += " var " + n + " = validate.schema" + h + "; ");
                        var _;
                        b = "' + " + (_ = "schema" + s + "[" + (D = "i" + s) + "]") + " + '";
                        r.opts._errorDataPathProperty && (r.errorPath = r.util.getPathExpr(E, _, r.opts.jsonPointers)), P && (t += " if (" + n + " && !Array.isArray(" + n + ")) {  var err =   ", !1 !== r.createErrors ? (t += " { keyword: 'required' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(p) + " , params: { missingProperty: '" + b + "' } ", !1 !== r.opts.messages && (t += " , message: '", r.opts._errorDataPathProperty ? t += "is a required property" : t += "should have required property \\'" + b + "\\'", t += "' "), r.opts.verbose && (t += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + d + " "), t += " } ") : t += " {} ", t += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } else if (" + n + " !== undefined) { "), t += " for (var " + D + " = 0; " + D + " < " + n + ".length; " + D + "++) { if (" + d + "[" + n + "[" + D + "]] === undefined ", w && (t += " || ! Object.prototype.hasOwnProperty.call(" + d + ", " + n + "[" + D + "]) "), t += ") {  var err =   ", !1 !== r.createErrors ? (t += " { keyword: 'required' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(p) + " , params: { missingProperty: '" + b + "' } ", !1 !== r.opts.messages && (t += " , message: '", r.opts._errorDataPathProperty ? t += "is a required property" : t += "should have required property \\'" + b + "\\'", t += "' "), r.opts.verbose && (t += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + d + " "), t += " } ") : t += " {} ", t += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } } ", P && (t += "  }  ");
                    } else {
                        var k = c;
                        if (k) for(var R, A = -1, x = k.length - 1; A < x;){
                            R = k[A += 1];
                            var $ = r.util.getProperty(R), L = (b = r.util.escapeQuotes(R), d + $);
                            r.opts._errorDataPathProperty && (r.errorPath = r.util.getPath(E, R, r.opts.jsonPointers)), t += " if ( " + L + " === undefined ", w && (t += " || ! Object.prototype.hasOwnProperty.call(" + d + ", '" + r.util.escapeQuotes(R) + "') "), t += ") {  var err =   ", !1 !== r.createErrors ? (t += " { keyword: 'required' , dataPath: (dataPath || '') + " + r.errorPath + " , schemaPath: " + r.util.toQuotedString(p) + " , params: { missingProperty: '" + b + "' } ", !1 !== r.opts.messages && (t += " , message: '", r.opts._errorDataPathProperty ? t += "is a required property" : t += "should have required property \\'" + b + "\\'", t += "' "), r.opts.verbose && (t += " , schema: validate.schema" + h + " , parentSchema: validate.schema" + r.schemaPath + " , data: " + d + " "), t += " } ") : t += " {} ", t += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ";
                        }
                    }
                    r.errorPath = E;
                } else l && (t += " if (true) {");
                return t;
            };
        },
        {}
    ],
    "mmFQ": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, a, r) {
                var t, i = " ", s = e.level, o = e.dataLevel, m = e.schema[a], l = e.schemaPath + e.util.getProperty(a), c = e.errSchemaPath + "/" + a, u = !e.opts.allErrors, d = "data" + (o || ""), h = "valid" + s, n = e.opts.$data && m && m.$data;
                if (n ? (i += " var schema" + s + " = " + e.util.getData(m.$data, o, e.dataPathArr) + "; ", t = "schema" + s) : t = m, (m || n) && !1 !== e.opts.uniqueItems) {
                    n && (i += " var " + h + "; if (" + t + " === false || " + t + " === undefined) " + h + " = true; else if (typeof " + t + " != 'boolean') " + h + " = false; else { "), i += " var i = " + d + ".length , " + h + " = true , j; if (i > 1) { ";
                    var f = e.schema.items && e.schema.items.type, v = Array.isArray(f);
                    if (!f || "object" == f || "array" == f || v && (f.indexOf("object") >= 0 || f.indexOf("array") >= 0)) i += " outer: for (;i--;) { for (j = i; j--;) { if (equal(" + d + "[i], " + d + "[j])) { " + h + " = false; break outer; } } } ";
                    else {
                        i += " var itemIndices = {}, item; for (;i--;) { var item = " + d + "[i]; ";
                        var p = "checkDataType" + (v ? "s" : "");
                        i += " if (" + e.util[p](f, "item", e.opts.strictNumbers, !0) + ") continue; ", v && (i += " if (typeof item == 'string') item = '\"' + item; "), i += " if (typeof itemIndices[item] == 'number') { " + h + " = false; j = itemIndices[item]; break; } itemIndices[item] = i; } ";
                    }
                    i += " } ", n && (i += "  }  "), i += " if (!" + h + ") {   ";
                    var y = y || [];
                    y.push(i), i = "", !1 !== e.createErrors ? (i += " { keyword: 'uniqueItems' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(c) + " , params: { i: i, j: j } ", !1 !== e.opts.messages && (i += " , message: 'should NOT have duplicate items (items ## ' + j + ' and ' + i + ' are identical)' "), e.opts.verbose && (i += " , schema:  ", i += n ? "validate.schema" + l : "" + m, i += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + d + " "), i += " } ") : i += " {} ";
                    var j = i;
                    i = y.pop(), !e.compositeRule && u ? e.async ? i += " throw new ValidationError([" + j + "]); " : i += " validate.errors = [" + j + "]; return false; " : i += " var err = " + j + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", i += " } ", u && (i += " else { ");
                } else u && (i += " if (true) { ");
                return i;
            };
        },
        {}
    ],
    "Czyc": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = {
                $ref: require1("./ref"),
                allOf: require1("./allOf"),
                anyOf: require1("./anyOf"),
                $comment: require1("./comment"),
                const: require1("./const"),
                contains: require1("./contains"),
                dependencies: require1("./dependencies"),
                enum: require1("./enum"),
                format: require1("./format"),
                if: require1("./if"),
                items: require1("./items"),
                maximum: require1("./_limit"),
                minimum: require1("./_limit"),
                maxItems: require1("./_limitItems"),
                minItems: require1("./_limitItems"),
                maxLength: require1("./_limitLength"),
                minLength: require1("./_limitLength"),
                maxProperties: require1("./_limitProperties"),
                minProperties: require1("./_limitProperties"),
                multipleOf: require1("./multipleOf"),
                not: require1("./not"),
                oneOf: require1("./oneOf"),
                pattern: require1("./pattern"),
                properties: require1("./properties"),
                propertyNames: require1("./propertyNames"),
                required: require1("./required"),
                uniqueItems: require1("./uniqueItems"),
                validate: require1("./validate")
            };
        },
        {
            "./ref": "a2na",
            "./allOf": "hRgn",
            "./anyOf": "lo6J",
            "./comment": "Kkzr",
            "./const": "U4sD",
            "./contains": "EypH",
            "./dependencies": "Cpp7",
            "./enum": "fqDY",
            "./format": "avoW",
            "./if": "JHQ3",
            "./items": "aiPb",
            "./_limit": "UJAl",
            "./_limitItems": "W8ih",
            "./_limitLength": "fZGX",
            "./_limitProperties": "JAEr",
            "./multipleOf": "oNPH",
            "./not": "mmjm",
            "./oneOf": "SSWF",
            "./pattern": "mGZS",
            "./properties": "jFnx",
            "./propertyNames": "XxjR",
            "./required": "Dht1",
            "./uniqueItems": "mmFQ",
            "./validate": "yhC1"
        }
    ],
    "vBP0": [
        function(require1, module1, exports) {
            "use strict";
            var e = require1("../dotjs"), t = require1("./util").toHash;
            module1.exports = function() {
                var n = [
                    {
                        type: "number",
                        rules: [
                            {
                                maximum: [
                                    "exclusiveMaximum"
                                ]
                            },
                            {
                                minimum: [
                                    "exclusiveMinimum"
                                ]
                            },
                            "multipleOf",
                            "format"
                        ]
                    },
                    {
                        type: "string",
                        rules: [
                            "maxLength",
                            "minLength",
                            "pattern",
                            "format"
                        ]
                    },
                    {
                        type: "array",
                        rules: [
                            "maxItems",
                            "minItems",
                            "items",
                            "contains",
                            "uniqueItems"
                        ]
                    },
                    {
                        type: "object",
                        rules: [
                            "maxProperties",
                            "minProperties",
                            "required",
                            "dependencies",
                            "propertyNames",
                            {
                                properties: [
                                    "additionalProperties",
                                    "patternProperties"
                                ]
                            }
                        ]
                    },
                    {
                        rules: [
                            "$ref",
                            "const",
                            "enum",
                            "not",
                            "anyOf",
                            "oneOf",
                            "allOf",
                            "if"
                        ]
                    }
                ], r = [
                    "type",
                    "$comment"
                ];
                return n.all = t(r), n.types = t([
                    "number",
                    "integer",
                    "string",
                    "array",
                    "object",
                    "boolean",
                    "null"
                ]), n.forEach(function(t) {
                    t.rules = t.rules.map(function(t) {
                        var i;
                        if ("object" == typeof t) {
                            var o = Object.keys(t)[0];
                            i = t[o], t = o, i.forEach(function(e) {
                                r.push(e), n.all[e] = !0;
                            });
                        }
                        return r.push(t), n.all[t] = {
                            keyword: t,
                            code: e[t],
                            implements: i
                        };
                    }), n.all.$comment = {
                        keyword: "$comment",
                        code: e.$comment
                    }, t.type && (n.types[t.type] = t);
                }), n.keywords = t(r.concat([
                    "$schema",
                    "$id",
                    "id",
                    "$data",
                    "$async",
                    "title",
                    "description",
                    "default",
                    "definitions",
                    "examples",
                    "readOnly",
                    "writeOnly",
                    "contentMediaType",
                    "contentEncoding",
                    "additionalItems",
                    "then",
                    "else"
                ])), n.custom = {}, n;
            };
        },
        {
            "../dotjs": "Czyc",
            "./util": "Q1F7"
        }
    ],
    "BunE": [
        function(require1, module1, exports) {
            "use strict";
            var e = [
                "multipleOf",
                "maximum",
                "exclusiveMaximum",
                "minimum",
                "exclusiveMinimum",
                "maxLength",
                "minLength",
                "pattern",
                "additionalItems",
                "maxItems",
                "minItems",
                "uniqueItems",
                "maxProperties",
                "minProperties",
                "required",
                "additionalProperties",
                "enum",
                "format",
                "const"
            ];
            module1.exports = function(t, i) {
                for(var r = 0; r < i.length; r++){
                    t = JSON.parse(JSON.stringify(t));
                    var m, a = i[r].split("/"), n = t;
                    for(m = 1; m < a.length; m++)n = n[a[m]];
                    for(m = 0; m < e.length; m++){
                        var s = e[m], o = n[s];
                        o && (n[s] = {
                            anyOf: [
                                o,
                                {
                                    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
                                }
                            ]
                        });
                    }
                }
                return t;
            };
        },
        {}
    ],
    "mNRF": [
        function(require1, module1, exports) {
            "use strict";
            var n = require1("./error_classes").MissingRef;
            function e(t, r, o) {
                var i = this;
                if ("function" != typeof this._opts.loadSchema) throw new Error("options.loadSchema should be a function");
                "function" == typeof r && (o = r, r = void 0);
                var a = c(t).then(function() {
                    var e = i._addSchema(t, void 0, r);
                    return e.validate || function e(t) {
                        try {
                            return i._compile(t);
                        } catch (a) {
                            if (a instanceof n) return function o(e) {
                                var o = e.missingSchema;
                                if (h(o)) throw new Error("Schema " + o + " is loaded but " + e.missingRef + " cannot be resolved");
                                var a = i._loadingSchemas[o];
                                a || (a = i._loadingSchemas[o] = i._opts.loadSchema(o)).then(s, s);
                                return a.then(function(n) {
                                    if (!h(o)) return c(n).then(function() {
                                        h(o) || i.addSchema(n, o, void 0, r);
                                    });
                                }).then(function() {
                                    return function t(o) {
                                        try {
                                            return i._compile(o);
                                        } catch (e) {
                                            if (e instanceof n) return a(e);
                                            throw e;
                                        }
                                        function a(n) {
                                            var e = n.missingSchema;
                                            if (h(e)) throw new Error("Schema " + e + " is loaded but " + n.missingRef + " cannot be resolved");
                                            var a = i._loadingSchemas[e];
                                            return a || (a = i._loadingSchemas[e] = i._opts.loadSchema(e)).then(s, s), a.then(function(n) {
                                                if (!h(e)) return c(n).then(function() {
                                                    h(e) || i.addSchema(n, e, void 0, r);
                                                });
                                            }).then(function() {
                                                return t(o);
                                            });
                                            function s() {
                                                delete i._loadingSchemas[e];
                                            }
                                            function h(n) {
                                                return i._refs[n] || i._schemas[n];
                                            }
                                        }
                                    }(t);
                                });
                                function s() {
                                    delete i._loadingSchemas[o];
                                }
                                function h(n) {
                                    return i._refs[n] || i._schemas[n];
                                }
                            }(a);
                            throw a;
                        }
                        function o(n) {
                            var o = n.missingSchema;
                            if (h(o)) throw new Error("Schema " + o + " is loaded but " + n.missingRef + " cannot be resolved");
                            var a = i._loadingSchemas[o];
                            return a || (a = i._loadingSchemas[o] = i._opts.loadSchema(o)).then(s, s), a.then(function(n) {
                                if (!h(o)) return c(n).then(function() {
                                    h(o) || i.addSchema(n, o, void 0, r);
                                });
                            }).then(function() {
                                return e(t);
                            });
                            function s() {
                                delete i._loadingSchemas[o];
                            }
                            function h(n) {
                                return i._refs[n] || i._schemas[n];
                            }
                        }
                    }(e);
                });
                return o && a.then(function(n) {
                    o(null, n);
                }, o), a;
                function c(n) {
                    var t = n.$schema;
                    return t && !i.getSchema(t) ? e.call(i, {
                        $ref: t
                    }, !0) : Promise.resolve();
                }
            }
            module1.exports = e;
        },
        {
            "./error_classes": "OtNE"
        }
    ],
    "Mzku": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(a, r, e) {
                var t, s, o = " ", i = a.level, h = a.dataLevel, d = a.schema[r], l = a.schemaPath + a.util.getProperty(r), v = a.errSchemaPath + "/" + r, c = !a.opts.allErrors, n = "data" + (h || ""), m = "valid" + i, u = "errs__" + i, p = a.opts.$data && d && d.$data;
                p ? (o += " var schema" + i + " = " + a.util.getData(d.$data, h, a.dataPathArr) + "; ", s = "schema" + i) : s = d;
                var f, P, y, E, w, k = "definition" + i, g = this.definition, R = "";
                if (p && g.$data) {
                    w = "keywordValidate" + i;
                    var S = g.validateSchema;
                    o += " var " + k + " = RULES.custom['" + r + "'].definition; var " + w + " = " + k + ".validate;";
                } else {
                    if (!(E = a.useCustomRule(this, d, a.schema, a))) return;
                    s = "validate.schema" + l, w = E.code, f = g.compile, P = g.inline, y = g.macro;
                }
                var b = w + ".errors", $ = "i" + i, A = "ruleErr" + i, D = g.async;
                if (D && !a.async) throw new Error("async keyword in sync schema");
                if (P || y || (o += b + " = null;"), o += "var " + u + " = errors;var " + m + ";", p && g.$data && (R += "}", o += " if (" + s + " === undefined) { " + m + " = true; } else { ", S && (R += "}", o += " " + m + " = " + k + ".validateSchema(" + s + "); if (" + m + ") { ")), P) g.statements ? o += " " + E.validate + " " : o += " " + m + " = " + E.validate + "; ";
                else if (y) {
                    var V = a.util.copy(a);
                    R = "";
                    V.level++;
                    var x = "valid" + V.level;
                    V.schema = E.validate, V.schemaPath = "";
                    var C = a.compositeRule;
                    a.compositeRule = V.compositeRule = !0;
                    var L = a.validate(V).replace(/validate\.schema/g, w);
                    a.compositeRule = V.compositeRule = C, o += " " + L;
                } else {
                    (j = j || []).push(o), o = "", o += "  " + w + ".call( ", a.opts.passContext ? o += "this" : o += "self", f || !1 === g.schema ? o += " , " + n + " " : o += " , " + s + " , " + n + " , validate.schema" + a.schemaPath + " ", o += " , (dataPath || '')", '""' != a.errorPath && (o += " + " + a.errorPath);
                    var Q = h ? "data" + (h - 1 || "") : "parentData", _ = h ? a.dataPathArr[h] : "parentDataProperty", U = o += " , " + Q + " , " + _ + " , rootData )  ";
                    o = j.pop(), !1 === g.errors ? (o += " " + m + " = ", D && (o += "await "), o += U + "; ") : o += D ? " var " + (b = "customErrors" + i) + " = null; try { " + m + " = await " + U + "; } catch (e) { " + m + " = false; if (e instanceof ValidationError) " + b + " = e.errors; else throw e; } " : " " + b + " = null; " + m + " = " + U + "; ";
                }
                if (g.modifying && (o += " if (" + Q + ") " + n + " = " + Q + "[" + _ + "];"), o += "" + R, g.valid) c && (o += " if (true) { ");
                else {
                    var j;
                    o += " if ( ", void 0 === g.valid ? (o += " !", o += y ? "" + x : "" + m) : o += " " + !g.valid + " ", o += ") { ", t = this.keyword, (j = j || []).push(o), o = "", (j = j || []).push(o), o = "", !1 !== a.createErrors ? (o += " { keyword: '" + (t || "custom") + "' , dataPath: (dataPath || '') + " + a.errorPath + " , schemaPath: " + a.util.toQuotedString(v) + " , params: { keyword: '" + this.keyword + "' } ", !1 !== a.opts.messages && (o += " , message: 'should pass \"" + this.keyword + "\" keyword validation' "), a.opts.verbose && (o += " , schema: validate.schema" + l + " , parentSchema: validate.schema" + a.schemaPath + " , data: " + n + " "), o += " } ") : o += " {} ";
                    var q = o;
                    o = j.pop(), !a.compositeRule && c ? a.async ? o += " throw new ValidationError([" + q + "]); " : o += " validate.errors = [" + q + "]; return false; " : o += " var err = " + q + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                    var z = o;
                    o = j.pop(), P ? g.errors ? "full" != g.errors && (o += "  for (var " + $ + "=" + u + "; " + $ + "<errors; " + $ + "++) { var " + A + " = vErrors[" + $ + "]; if (" + A + ".dataPath === undefined) " + A + ".dataPath = (dataPath || '') + " + a.errorPath + "; if (" + A + ".schemaPath === undefined) { " + A + '.schemaPath = "' + v + '"; } ', a.opts.verbose && (o += " " + A + ".schema = " + s + "; " + A + ".data = " + n + "; "), o += " } ") : !1 === g.errors ? o += " " + z + " " : (o += " if (" + u + " == errors) { " + z + " } else {  for (var " + $ + "=" + u + "; " + $ + "<errors; " + $ + "++) { var " + A + " = vErrors[" + $ + "]; if (" + A + ".dataPath === undefined) " + A + ".dataPath = (dataPath || '') + " + a.errorPath + "; if (" + A + ".schemaPath === undefined) { " + A + '.schemaPath = "' + v + '"; } ', a.opts.verbose && (o += " " + A + ".schema = " + s + "; " + A + ".data = " + n + "; "), o += " } } ") : y ? (o += "   var err =   ", !1 !== a.createErrors ? (o += " { keyword: '" + (t || "custom") + "' , dataPath: (dataPath || '') + " + a.errorPath + " , schemaPath: " + a.util.toQuotedString(v) + " , params: { keyword: '" + this.keyword + "' } ", !1 !== a.opts.messages && (o += " , message: 'should pass \"" + this.keyword + "\" keyword validation' "), a.opts.verbose && (o += " , schema: validate.schema" + l + " , parentSchema: validate.schema" + a.schemaPath + " , data: " + n + " "), o += " } ") : o += " {} ", o += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", !a.compositeRule && c && (a.async ? o += " throw new ValidationError(vErrors); " : o += " validate.errors = vErrors; return false; ")) : !1 === g.errors ? o += " " + z + " " : (o += " if (Array.isArray(" + b + ")) { if (vErrors === null) vErrors = " + b + "; else vErrors = vErrors.concat(" + b + "); errors = vErrors.length;  for (var " + $ + "=" + u + "; " + $ + "<errors; " + $ + "++) { var " + A + " = vErrors[" + $ + "]; if (" + A + ".dataPath === undefined) " + A + ".dataPath = (dataPath || '') + " + a.errorPath + ";  " + A + '.schemaPath = "' + v + '";  ', a.opts.verbose && (o += " " + A + ".schema = " + s + "; " + A + ".data = " + n + "; "), o += " } } else { " + z + " } "), o += " } ", c && (o += " else { ");
                }
                return o;
            };
        },
        {}
    ],
    "ve7q": [
        function(require1, module1, exports) {
            module1.exports = {
                $schema: "http://json-schema.org/draft-07/schema#",
                $id: "http://json-schema.org/draft-07/schema#",
                title: "Core schema meta-schema",
                definitions: {
                    schemaArray: {
                        type: "array",
                        minItems: 1,
                        items: {
                            $ref: "#"
                        }
                    },
                    nonNegativeInteger: {
                        type: "integer",
                        minimum: 0
                    },
                    nonNegativeIntegerDefault0: {
                        allOf: [
                            {
                                $ref: "#/definitions/nonNegativeInteger"
                            },
                            {
                                default: 0
                            }
                        ]
                    },
                    simpleTypes: {
                        enum: [
                            "array",
                            "boolean",
                            "integer",
                            "null",
                            "number",
                            "object",
                            "string"
                        ]
                    },
                    stringArray: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        uniqueItems: !0,
                        default: []
                    }
                },
                type: [
                    "object",
                    "boolean"
                ],
                properties: {
                    $id: {
                        type: "string",
                        format: "uri-reference"
                    },
                    $schema: {
                        type: "string",
                        format: "uri"
                    },
                    $ref: {
                        type: "string",
                        format: "uri-reference"
                    },
                    $comment: {
                        type: "string"
                    },
                    title: {
                        type: "string"
                    },
                    description: {
                        type: "string"
                    },
                    default: !0,
                    readOnly: {
                        type: "boolean",
                        default: !1
                    },
                    examples: {
                        type: "array",
                        items: !0
                    },
                    multipleOf: {
                        type: "number",
                        exclusiveMinimum: 0
                    },
                    maximum: {
                        type: "number"
                    },
                    exclusiveMaximum: {
                        type: "number"
                    },
                    minimum: {
                        type: "number"
                    },
                    exclusiveMinimum: {
                        type: "number"
                    },
                    maxLength: {
                        $ref: "#/definitions/nonNegativeInteger"
                    },
                    minLength: {
                        $ref: "#/definitions/nonNegativeIntegerDefault0"
                    },
                    pattern: {
                        type: "string",
                        format: "regex"
                    },
                    additionalItems: {
                        $ref: "#"
                    },
                    items: {
                        anyOf: [
                            {
                                $ref: "#"
                            },
                            {
                                $ref: "#/definitions/schemaArray"
                            }
                        ],
                        default: !0
                    },
                    maxItems: {
                        $ref: "#/definitions/nonNegativeInteger"
                    },
                    minItems: {
                        $ref: "#/definitions/nonNegativeIntegerDefault0"
                    },
                    uniqueItems: {
                        type: "boolean",
                        default: !1
                    },
                    contains: {
                        $ref: "#"
                    },
                    maxProperties: {
                        $ref: "#/definitions/nonNegativeInteger"
                    },
                    minProperties: {
                        $ref: "#/definitions/nonNegativeIntegerDefault0"
                    },
                    required: {
                        $ref: "#/definitions/stringArray"
                    },
                    additionalProperties: {
                        $ref: "#"
                    },
                    definitions: {
                        type: "object",
                        additionalProperties: {
                            $ref: "#"
                        },
                        default: {}
                    },
                    properties: {
                        type: "object",
                        additionalProperties: {
                            $ref: "#"
                        },
                        default: {}
                    },
                    patternProperties: {
                        type: "object",
                        additionalProperties: {
                            $ref: "#"
                        },
                        propertyNames: {
                            format: "regex"
                        },
                        default: {}
                    },
                    dependencies: {
                        type: "object",
                        additionalProperties: {
                            anyOf: [
                                {
                                    $ref: "#"
                                },
                                {
                                    $ref: "#/definitions/stringArray"
                                }
                            ]
                        }
                    },
                    propertyNames: {
                        $ref: "#"
                    },
                    const: !0,
                    enum: {
                        type: "array",
                        items: !0,
                        minItems: 1,
                        uniqueItems: !0
                    },
                    type: {
                        anyOf: [
                            {
                                $ref: "#/definitions/simpleTypes"
                            },
                            {
                                type: "array",
                                items: {
                                    $ref: "#/definitions/simpleTypes"
                                },
                                minItems: 1,
                                uniqueItems: !0
                            }
                        ]
                    },
                    format: {
                        type: "string"
                    },
                    contentMediaType: {
                        type: "string"
                    },
                    contentEncoding: {
                        type: "string"
                    },
                    if: {
                        $ref: "#"
                    },
                    then: {
                        $ref: "#"
                    },
                    else: {
                        $ref: "#"
                    },
                    allOf: {
                        $ref: "#/definitions/schemaArray"
                    },
                    anyOf: {
                        $ref: "#/definitions/schemaArray"
                    },
                    oneOf: {
                        $ref: "#/definitions/schemaArray"
                    },
                    not: {
                        $ref: "#"
                    }
                },
                default: !0
            };
        },
        {}
    ],
    "GIYw": [
        function(require1, module1, exports) {
            "use strict";
            var e = require1("./refs/json-schema-draft-07.json");
            module1.exports = {
                $id: "https://github.com/ajv-validator/ajv/blob/master/lib/definition_schema.js",
                definitions: {
                    simpleTypes: e.definitions.simpleTypes
                },
                type: "object",
                dependencies: {
                    schema: [
                        "validate"
                    ],
                    $data: [
                        "validate"
                    ],
                    statements: [
                        "inline"
                    ],
                    valid: {
                        not: {
                            required: [
                                "macro"
                            ]
                        }
                    }
                },
                properties: {
                    type: e.properties.type,
                    schema: {
                        type: "boolean"
                    },
                    statements: {
                        type: "boolean"
                    },
                    dependencies: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    metaSchema: {
                        type: "object"
                    },
                    modifying: {
                        type: "boolean"
                    },
                    valid: {
                        type: "boolean"
                    },
                    $data: {
                        type: "boolean"
                    },
                    async: {
                        type: "boolean"
                    },
                    errors: {
                        anyOf: [
                            {
                                type: "boolean"
                            },
                            {
                                const: "full"
                            }
                        ]
                    }
                }
            };
        },
        {
            "./refs/json-schema-draft-07.json": "ve7q"
        }
    ],
    "UVv5": [
        function(require1, module1, exports) {
            "use strict";
            var e = /^[a-z_$][a-z0-9_$-]*$/i, r = require1("./dotjs/custom"), t = require1("./definition_schema");
            function i(t, i) {
                var o = this.RULES;
                if (o.keywords[t]) throw new Error("Keyword " + t + " is already defined");
                if (!e.test(t)) throw new Error("Keyword " + t + " is not a valid identifier");
                if (i) {
                    this.validateKeyword(i, !0);
                    var a = i.type;
                    if (Array.isArray(a)) for(var s = 0; s < a.length; s++)d(t, a[s], i);
                    else d(t, a, i);
                    var n = i.metaSchema;
                    n && (i.$data && this._opts.$data && (n = {
                        anyOf: [
                            n,
                            {
                                $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
                            }
                        ]
                    }), i.validateSchema = this.compile(n, !0));
                }
                function d(e, t, i) {
                    for(var a, s = 0; s < o.length; s++){
                        var n = o[s];
                        if (n.type == t) {
                            a = n;
                            break;
                        }
                    }
                    a || (a = {
                        type: t,
                        rules: []
                    }, o.push(a));
                    var d = {
                        keyword: e,
                        definition: i,
                        custom: !0,
                        code: r,
                        implements: i.implements
                    };
                    a.rules.push(d), o.custom[e] = d;
                }
                return o.keywords[t] = o.all[t] = !0, this;
            }
            function o(e) {
                var r = this.RULES.custom[e];
                return r ? r.definition : this.RULES.keywords[e] || !1;
            }
            function a(e) {
                var r = this.RULES;
                delete r.keywords[e], delete r.all[e], delete r.custom[e];
                for(var t = 0; t < r.length; t++)for(var i = r[t].rules, o = 0; o < i.length; o++)if (i[o].keyword == e) {
                    i.splice(o, 1);
                    break;
                }
                return this;
            }
            function s(e, r) {
                s.errors = null;
                var i = this._validateKeyword = this._validateKeyword || this.compile(t, !0);
                if (i(e)) return !0;
                if (s.errors = i.errors, r) throw new Error("custom keyword definition is invalid: " + this.errorsText(i.errors));
                return !1;
            }
            module1.exports = {
                add: i,
                get: o,
                remove: a,
                validate: s
            };
        },
        {
            "./dotjs/custom": "Mzku",
            "./definition_schema": "GIYw"
        }
    ],
    "xbmT": [
        function(require1, module1, exports) {
            module1.exports = {
                $schema: "http://json-schema.org/draft-07/schema#",
                $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
                description: "Meta-schema for $data reference (JSON Schema extension proposal)",
                type: "object",
                required: [
                    "$data"
                ],
                properties: {
                    $data: {
                        type: "string",
                        anyOf: [
                            {
                                format: "relative-json-pointer"
                            },
                            {
                                format: "json-pointer"
                            }
                        ]
                    }
                },
                additionalProperties: !1
            };
        },
        {}
    ],
    "hi5j": [
        function(require1, module1, exports) {
            "use strict";
            var e = require1("./compile"), t = require1("./compile/resolve"), r = require1("./cache"), a = require1("./compile/schema_obj"), i = require1("fast-json-stable-stringify"), s = require1("./compile/formats"), o = require1("./compile/rules"), h = require1("./data"), n = require1("./compile/util");
            module1.exports = p, p.prototype.validate = u, p.prototype.compile = v, p.prototype.addSchema = _, p.prototype.addMetaSchema = g, p.prototype.validateSchema = y, p.prototype.getSchema = S, p.prototype.removeSchema = q, p.prototype.addFormat = x, p.prototype.errorsText = k, p.prototype._addSchema = E, p.prototype._compile = I, p.prototype.compileAsync = require1("./compile/async");
            var c = require1("./keyword");
            p.prototype.addKeyword = c.add, p.prototype.getKeyword = c.get, p.prototype.removeKeyword = c.remove, p.prototype.validateKeyword = c.validate;
            var d = require1("./compile/error_classes");
            p.ValidationError = d.Validation, p.MissingRefError = d.MissingRef, p.$dataMetaSchema = h;
            var l = "http://json-schema.org/draft-07/schema", m = [
                "removeAdditional",
                "useDefaults",
                "coerceTypes",
                "strictDefaults"
            ], f = [
                "/properties"
            ];
            function p(e) {
                if (!(this instanceof p)) return new p(e);
                e = this._opts = n.copy(e) || {}, O(this), this._schemas = {}, this._refs = {}, this._fragments = {}, this._formats = s(e.format), this._cache = e.cache || new r, this._loadingSchemas = {}, this._compilations = [], this.RULES = o(), this._getId = M(e), e.loopRequired = e.loopRequired || 1 / 0, "property" == e.errorDataPath && (e._errorDataPathProperty = !0), void 0 === e.serialize && (e.serialize = i), this._metaOpts = F(this), e.formats && D(this), e.keywords && P(this), A(this), "object" == typeof e.meta && this.addMetaSchema(e.meta), e.nullable && this.addKeyword("nullable", {
                    metaSchema: {
                        type: "boolean"
                    }
                }), V(this);
            }
            function u(e, t) {
                var r;
                if ("string" == typeof e) {
                    if (!(r = this.getSchema(e))) throw new Error('no schema with key or ref "' + e + '"');
                } else {
                    var a = this._addSchema(e);
                    r = a.validate || this._compile(a);
                }
                var i = r(t);
                return !0 !== r.$async && (this.errors = r.errors), i;
            }
            function v(e, t) {
                var r = this._addSchema(e, void 0, t);
                return r.validate || this._compile(r);
            }
            function _(e, r, a, i) {
                if (Array.isArray(e)) {
                    for(var s = 0; s < e.length; s++)this.addSchema(e[s], void 0, a, i);
                    return this;
                }
                var o = this._getId(e);
                if (void 0 !== o && "string" != typeof o) throw new Error("schema id must be string");
                return T(this, r = t.normalizeId(r || o)), this._schemas[r] = this._addSchema(e, a, i, !0), this;
            }
            function g(e, t, r) {
                return this.addSchema(e, t, r, !0), this;
            }
            function y(e, t) {
                var r = e.$schema;
                if (void 0 !== r && "string" != typeof r) throw new Error("$schema must be a string");
                if (!(r = r || this._opts.defaultMeta || w(this))) return this.logger.warn("meta-schema not available"), this.errors = null, !0;
                var a = this.validate(r, e);
                if (!a && t) {
                    var i = "schema is invalid: " + this.errorsText();
                    if ("log" != this._opts.validateSchema) throw new Error(i);
                    this.logger.error(i);
                }
                return a;
            }
            function w(e) {
                var t = e._opts.meta;
                return e._opts.defaultMeta = "object" == typeof t ? e._getId(t) || t : e.getSchema(l) ? l : void 0, e._opts.defaultMeta;
            }
            function S(e) {
                var t = $(this, e);
                switch(typeof t){
                    case "object":
                        return t.validate || this._compile(t);
                    case "string":
                        return this.getSchema(t);
                    case "undefined":
                        return b(this, e);
                }
            }
            function b(r, i) {
                var s = t.schema.call(r, {
                    schema: {}
                }, i);
                if (s) {
                    var o = s.schema, h = s.root, n = s.baseId, c = e.call(r, o, h, void 0, n);
                    return r._fragments[i] = new a({
                        ref: i,
                        fragment: !0,
                        schema: o,
                        root: h,
                        baseId: n,
                        validate: c
                    }), c;
                }
            }
            function $(e, r) {
                return r = t.normalizeId(r), e._schemas[r] || e._refs[r] || e._fragments[r];
            }
            function q(e) {
                if (e instanceof RegExp) return j(this, this._schemas, e), j(this, this._refs, e), this;
                switch(typeof e){
                    case "undefined":
                        return j(this, this._schemas), j(this, this._refs), this._cache.clear(), this;
                    case "string":
                        var r = $(this, e);
                        return r && this._cache.del(r.cacheKey), delete this._schemas[e], delete this._refs[e], this;
                    case "object":
                        var a = this._opts.serialize, i = a ? a(e) : e;
                        this._cache.del(i);
                        var s = this._getId(e);
                        s && (s = t.normalizeId(s), delete this._schemas[s], delete this._refs[s]);
                }
                return this;
            }
            function j(e, t, r) {
                for(var a in t){
                    var i = t[a];
                    i.meta || r && !r.test(a) || (e._cache.del(i.cacheKey), delete t[a]);
                }
            }
            function E(e, r, i, s) {
                if ("object" != typeof e && "boolean" != typeof e) throw new Error("schema should be object or boolean");
                var o = this._opts.serialize, h = o ? o(e) : e, n = this._cache.get(h);
                if (n) return n;
                s = s || !1 !== this._opts.addUsedSchema;
                var c = t.normalizeId(this._getId(e));
                c && s && T(this, c);
                var d, l = !1 !== this._opts.validateSchema && !r;
                l && !(d = c && c == t.normalizeId(e.$schema)) && this.validateSchema(e, !0);
                var m = t.ids.call(this, e), f = new a({
                    id: c,
                    schema: e,
                    localRefs: m,
                    cacheKey: h,
                    meta: i
                });
                return "#" != c[0] && s && (this._refs[c] = f), this._cache.put(h, f), l && d && this.validateSchema(e, !0), f;
            }
            function I(t, r) {
                if (t.compiling) return t.validate = s, s.schema = t.schema, s.errors = null, s.root = r || s, !0 === t.schema.$async && (s.$async = !0), s;
                var a, i;
                t.compiling = !0, t.meta && (a = this._opts, this._opts = this._metaOpts);
                try {
                    i = e.call(this, t.schema, r, t.localRefs);
                } catch (o) {
                    throw delete t.validate, o;
                } finally{
                    t.compiling = !1, t.meta && (this._opts = a);
                }
                return t.validate = i, t.refs = i.refs, t.refVal = i.refVal, t.root = i.root, i;
                function s() {
                    var e = t.validate, r = e.apply(this, arguments);
                    return s.errors = e.errors, r;
                }
            }
            function M(e) {
                switch(e.schemaId){
                    case "auto":
                        return R;
                    case "id":
                        return z;
                    default:
                        return K;
                }
            }
            function z(e) {
                return e.$id && this.logger.warn("schema $id ignored", e.$id), e.id;
            }
            function K(e) {
                return e.id && this.logger.warn("schema id ignored", e.id), e.$id;
            }
            function R(e) {
                if (e.$id && e.id && e.$id != e.id) throw new Error("schema $id is different from id");
                return e.$id || e.id;
            }
            function k(e, t) {
                if (!(e = e || this.errors)) return "No errors";
                for(var r = void 0 === (t = t || {}).separator ? ", " : t.separator, a = void 0 === t.dataVar ? "data" : t.dataVar, i = "", s = 0; s < e.length; s++){
                    var o = e[s];
                    o && (i += a + o.dataPath + " " + o.message + r);
                }
                return i.slice(0, -r.length);
            }
            function x(e, t) {
                return "string" == typeof t && (t = new RegExp(t)), this._formats[e] = t, this;
            }
            function A(e) {
                var t;
                if (e._opts.$data && (t = require1("./refs/data.json"), e.addMetaSchema(t, t.$id, !0)), !1 !== e._opts.meta) {
                    var r = require1("./refs/json-schema-draft-07.json");
                    e._opts.$data && (r = h(r, f)), e.addMetaSchema(r, l, !0), e._refs["http://json-schema.org/schema"] = l;
                }
            }
            function V(e) {
                var t = e._opts.schemas;
                if (t) {
                    if (Array.isArray(t)) e.addSchema(t);
                    else for(var r in t)e.addSchema(t[r], r);
                }
            }
            function D(e) {
                for(var t in e._opts.formats){
                    var r = e._opts.formats[t];
                    e.addFormat(t, r);
                }
            }
            function P(e) {
                for(var t in e._opts.keywords){
                    var r = e._opts.keywords[t];
                    e.addKeyword(t, r);
                }
            }
            function T(e, t) {
                if (e._schemas[t] || e._refs[t]) throw new Error('schema with key or id "' + t + '" already exists');
            }
            function F(e) {
                for(var t = n.copy(e._opts), r = 0; r < m.length; r++)delete t[m[r]];
                return t;
            }
            function O(e) {
                var t = e._opts.logger;
                if (!1 === t) e.logger = {
                    log: U,
                    warn: U,
                    error: U
                };
                else {
                    if (void 0 === t && (t = console), !("object" == typeof t && t.log && t.warn && t.error)) throw new Error("logger must implement log, warn and error methods");
                    e.logger = t;
                }
            }
            function U() {}
        },
        {
            "./compile": "qdYs",
            "./compile/resolve": "w10T",
            "./cache": "fXCy",
            "./compile/schema_obj": "HHLG",
            "fast-json-stable-stringify": "Xb3N",
            "./compile/formats": "dfAH",
            "./compile/rules": "vBP0",
            "./data": "BunE",
            "./compile/util": "Q1F7",
            "./compile/async": "mNRF",
            "./keyword": "UVv5",
            "./compile/error_classes": "OtNE",
            "./refs/data.json": "xbmT",
            "./refs/json-schema-draft-07.json": "ve7q"
        }
    ],
    "dhP9": [
        function(require1, module1, exports) {
            var Buffer = require1("buffer").Buffer;
            var r = require1("buffer").Buffer, e = {
                Object: Object,
                Array: Array,
                Function: Function,
                Number: Number,
                String: String,
                Date: Date,
                RegExp: RegExp
            };
            module1.exports = function n(t) {
                return void 0 !== r && (e.Buffer = r), "undefined" != typeof Promise && (e.Promise = Promise), n.definition = {
                    compile: function(r) {
                        if ("string" == typeof r) {
                            var e = i(r);
                            return function(r) {
                                return r instanceof e;
                            };
                        }
                        var n = r.map(i);
                        return function(r) {
                            for(var e = 0; e < n.length; e++)if (r instanceof n[e]) return !0;
                            return !1;
                        };
                    },
                    CONSTRUCTORS: e,
                    metaSchema: {
                        anyOf: [
                            {
                                type: "string"
                            },
                            {
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            }
                        ]
                    }
                }, t.addKeyword("instanceof", n.definition), t;
                function i(r) {
                    var n = e[r];
                    if (n) return n;
                    throw new Error('invalid "instanceof" keyword value ' + r);
                }
            };
        },
        {
            "buffer": "dskh"
        }
    ],
    "uBCt": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function e(n) {
                return e.definition = {
                    type: "number",
                    macro: function(e, n) {
                        var r = e[0], i = e[1], o = n.exclusiveRange;
                        return function(e, n, r) {
                            if (void 0 !== r && "boolean" != typeof r) throw new Error("Invalid schema for exclusiveRange keyword, should be boolean");
                            if (e > n || r && e == n) throw new Error("There are no numbers in range");
                        }(r, i, o), !0 === o ? {
                            exclusiveMinimum: r,
                            exclusiveMaximum: i
                        } : {
                            minimum: r,
                            maximum: i
                        };
                    },
                    metaSchema: {
                        type: "array",
                        minItems: 2,
                        maxItems: 2,
                        items: {
                            type: "number"
                        }
                    }
                }, n.addKeyword("range", e.definition), n.addKeyword("exclusiveRange"), n;
            };
        },
        {}
    ],
    "AtCq": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function e(t) {
                return e.definition = {
                    type: "string",
                    inline: function(e, t, r) {
                        return function() {
                            try {
                                if ("object" == typeof r) return new RegExp(r.pattern, r.flags);
                                var e = r.match(/^\/(.*)\/([gimuy]*)$/);
                                if (e) return new RegExp(e[1], e[2]);
                                throw new Error("cannot parse string into RegExp");
                            } catch (t) {
                                throw console.error("regular expression", r, "is invalid"), t;
                            }
                        }() + ".test(data" + (e.dataLevel || "") + ")";
                    },
                    metaSchema: {
                        type: [
                            "string",
                            "object"
                        ],
                        properties: {
                            pattern: {
                                type: "string"
                            },
                            flags: {
                                type: "string"
                            }
                        },
                        required: [
                            "pattern"
                        ],
                        additionalProperties: !1
                    }
                }, t.addKeyword("regexp", e.definition), t;
            };
        },
        {}
    ],
    "yoml": [
        function(require1, module1, exports) {
            "use strict";
            var e = [
                "undefined",
                "string",
                "number",
                "object",
                "function",
                "boolean",
                "symbol"
            ];
            module1.exports = function t(n) {
                return t.definition = {
                    inline: function(e, t, n) {
                        var i = "data" + (e.dataLevel || "");
                        return "string" == typeof n ? "typeof " + i + ' == "' + n + '"' : (n = "validate.schema" + e.schemaPath + "." + t) + ".indexOf(typeof " + i + ") >= 0";
                    },
                    metaSchema: {
                        anyOf: [
                            {
                                type: "string",
                                enum: e
                            },
                            {
                                type: "array",
                                items: {
                                    type: "string",
                                    enum: e
                                }
                            }
                        ]
                    }
                }, n.addKeyword("typeof", t.definition), n;
            };
        },
        {}
    ],
    "FbE8": [
        function(require1, module1, exports) {
            "use strict";
            var t = {}, n = {
                timestamp: function() {
                    return Date.now();
                },
                datetime: function() {
                    return (new Date).toISOString();
                },
                date: function() {
                    return (new Date).toISOString().slice(0, 10);
                },
                time: function() {
                    return (new Date).toISOString().slice(11);
                },
                random: function() {
                    return Math.random();
                },
                randomint: function(t) {
                    var n = t && t.max || 2;
                    return function() {
                        return Math.floor(Math.random() * n);
                    };
                },
                seq: function(n) {
                    var r = n && n.name || "";
                    return t[r] = t[r] || 0, function() {
                        return t[r]++;
                    };
                }
            };
            module1.exports = function t(r) {
                return t.definition = {
                    compile: function(t, n, r) {
                        var i = {};
                        for(var o in t){
                            var u = t[o], a = e("string" == typeof u ? u : u.func);
                            i[o] = a.length ? a(u.args) : a;
                        }
                        return r.opts.useDefaults && !r.compositeRule ? function(n) {
                            for(var e in t)void 0 !== n[e] && ("empty" != r.opts.useDefaults || null !== n[e] && "" !== n[e]) || (n[e] = i[e]());
                            return !0;
                        } : function() {
                            return !0;
                        };
                    },
                    DEFAULTS: n,
                    metaSchema: {
                        type: "object",
                        additionalProperties: {
                            type: [
                                "string",
                                "object"
                            ],
                            additionalProperties: !1,
                            required: [
                                "func",
                                "args"
                            ],
                            properties: {
                                func: {
                                    type: "string"
                                },
                                args: {
                                    type: "object"
                                }
                            }
                        }
                    }
                }, r.addKeyword("dynamicDefaults", t.definition), r;
                function e(t) {
                    var r = n[t];
                    if (r) return r;
                    throw new Error('invalid "dynamicDefaults" keyword property value: ' + t);
                }
            };
        },
        {}
    ],
    "CJDR": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function e(r) {
                return e.definition = {
                    type: "object",
                    macro: function(e, r) {
                        if (!e) return !0;
                        var t = Object.keys(r.properties);
                        return 0 == t.length || {
                            required: t
                        };
                    },
                    metaSchema: {
                        type: "boolean"
                    },
                    dependencies: [
                        "properties"
                    ]
                }, r.addKeyword("allRequired", e.definition), r;
            };
        },
        {}
    ],
    "n1DR": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function e(t) {
                return e.definition = {
                    type: "object",
                    macro: function(e) {
                        return 0 == e.length || (1 == e.length ? {
                            required: e
                        } : {
                            anyOf: e.map(function(e) {
                                return {
                                    required: [
                                        e
                                    ]
                                };
                            })
                        });
                    },
                    metaSchema: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    }
                }, t.addKeyword("anyRequired", e.definition), t;
            };
        },
        {}
    ],
    "XrCF": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function e(t) {
                return e.definition = {
                    type: "object",
                    macro: function(e) {
                        return 0 == e.length || (1 == e.length ? {
                            required: e
                        } : {
                            oneOf: e.map(function(e) {
                                return {
                                    required: [
                                        e
                                    ]
                                };
                            })
                        });
                    },
                    metaSchema: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    }
                }, t.addKeyword("oneRequired", e.definition), t;
            };
        },
        {}
    ],
    "MFGI": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function e(t) {
                return e.definition = {
                    type: "object",
                    macro: function(e) {
                        return 0 == e.length || (1 == e.length ? {
                            not: {
                                required: e
                            }
                        } : {
                            not: {
                                anyOf: e.map(function(e) {
                                    return {
                                        required: [
                                            e
                                        ]
                                    };
                                })
                            }
                        });
                    },
                    metaSchema: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    }
                }, t.addKeyword("prohibited", e.definition), t;
            };
        },
        {}
    ],
    "m7Ap": [
        function(require1, module1, exports) {
            "use strict";
            var e = [
                "number",
                "integer",
                "string",
                "boolean",
                "null"
            ];
            function r(r, t) {
                return r.map(function(r) {
                    var n = t.items && t.items.properties, i = n && n[r] && n[r].type;
                    return Array.isArray(i) ? i.indexOf("object") < 0 && i.indexOf("array") < 0 : e.indexOf(i) >= 0;
                });
            }
            module1.exports = function e(t) {
                return e.definition = {
                    type: "array",
                    compile: function(e, t, n) {
                        var i = n.util.equal, o = r(e, t);
                        return function(r) {
                            if (r.length > 1) for(var t = 0; t < e.length; t++){
                                var n, f = e[t];
                                if (o[t]) {
                                    var a = {};
                                    for(n = r.length; n--;)if (r[n] && "object" == typeof r[n]) {
                                        var u = r[n][f];
                                        if (!u || "object" != typeof u) {
                                            if ("string" == typeof u && (u = '"' + u), a[u]) return !1;
                                            a[u] = !0;
                                        }
                                    }
                                } else for(n = r.length; n--;)if (r[n] && "object" == typeof r[n]) {
                                    for(var p = n; p--;)if (r[p] && "object" == typeof r[p] && i(r[n][f], r[p][f])) return !1;
                                }
                            }
                            return !0;
                        };
                    },
                    metaSchema: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    }
                }, t.addKeyword("uniqueItemProperties", e.definition), t;
            };
        },
        {}
    ],
    "R4Fp": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = {
                metaSchemaRef: t
            };
            var e = "http://json-schema.org/draft-07/schema";
            function t(t) {
                var a = t._opts.defaultMeta;
                return "string" == typeof a ? {
                    $ref: a
                } : t.getSchema(e) ? {
                    $ref: e
                } : (console.warn("meta schema not defined"), {});
            }
        },
        {}
    ],
    "kIuQ": [
        function(require1, module1, exports) {
            "use strict";
            var e = require1("./_util");
            function r(e, r) {
                for(var i = e.split("/"), o = {}, n = o, a = 1; a < i.length; a++){
                    var p = i[a], s = a == i.length - 1;
                    p = t(p);
                    var u = n.properties = {}, f = void 0;
                    if (/[0-9]+/.test(p)) {
                        var c = +p;
                        for(f = n.items = []; c--;)f.push({});
                    }
                    n = s ? r : {}, u[p] = n, f && f.push(n);
                }
                return o;
            }
            function t(e) {
                return e.replace(/~1/g, "/").replace(/~0/g, "~");
            }
            module1.exports = function t(i) {
                return t.definition = {
                    type: "object",
                    macro: function(e) {
                        var t = [];
                        for(var i in e)t.push(r(i, e[i]));
                        return {
                            allOf: t
                        };
                    },
                    metaSchema: {
                        type: "object",
                        propertyNames: {
                            type: "string",
                            format: "json-pointer"
                        },
                        additionalProperties: e.metaSchemaRef(i)
                    }
                }, i.addKeyword("deepProperties", t.definition), i;
            };
        },
        {
            "./_util": "R4Fp"
        }
    ],
    "KB8y": [
        function(require1, module1, exports) {
            "use strict";
            function e(e, t) {
                var r = "data" + (t || "");
                if (!e) return r;
                for(var n = r, o = e.split("/"), u = 1; u < o.length; u++)n += " && " + (r += i(a(o[u])));
                return n;
            }
            module1.exports = function t(r) {
                return t.definition = {
                    type: "object",
                    inline: function(t, r, n) {
                        for(var i = "", a = 0; a < n.length; a++)a && (i += " && "), i += "(" + e(n[a], t.dataLevel) + " !== undefined)";
                        return i;
                    },
                    metaSchema: {
                        type: "array",
                        items: {
                            type: "string",
                            format: "json-pointer"
                        }
                    }
                }, r.addKeyword("deepRequired", t.definition), r;
            };
            var t = /^[a-z$_][a-z$_0-9]*$/i, r = /^[0-9]+$/, n = /'|\\/g;
            function i(e) {
                return r.test(e) ? "[" + e + "]" : t.test(e) ? "." + e : "['" + e.replace(n, "\\$&") + "']";
            }
            function a(e) {
                return e.replace(/~1/g, "/").replace(/~0/g, "~");
            }
        },
        {}
    ],
    "KeB4": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, a, r) {
                var t = " ", s = e.level, o = e.dataLevel, i = e.schema[a], l = e.schemaPath + e.util.getProperty(a), u = e.errSchemaPath + "/" + a, d = !e.opts.allErrors, m = "data" + (o || ""), f = "valid" + s;
                if (t += "var " + f + " = undefined;", !1 === e.opts.format) return t += " " + f + " = true; ";
                var n = e.schema.format, h = e.opts.$data && n.$data, c = "";
                if (h) t += " var " + (v = "format" + s) + " = formats[" + e.util.getData(n.$data, o, e.dataPathArr) + "] , " + (p = "compare" + s) + " = " + v + " && " + v + ".compare;";
                else {
                    var v;
                    if (!(v = e.formats[n]) || !v.compare) return t += "  " + f + " = true; ";
                    var p = "formats" + e.util.getProperty(n) + ".compare";
                }
                var g, P = "formatMaximum" == a, E = "formatExclusive" + (P ? "Maximum" : "Minimum"), x = e.schema[E], y = e.opts.$data && x && x.$data, S = P ? "<" : ">", $ = "result" + s, Q = e.opts.$data && i && i.$data;
                if (Q ? (t += " var schema" + s + " = " + e.util.getData(i.$data, o, e.dataPathArr) + "; ", g = "schema" + s) : g = i, y) {
                    var b = e.util.getData(x.$data, o, e.dataPathArr), w = "exclusive" + s, A = "' + " + (M = "op" + s) + " + '";
                    t += " var schemaExcl" + s + " = " + b + "; ", t += " if (typeof " + (b = "schemaExcl" + s) + " != 'boolean' && " + b + " !== undefined) { " + f + " = false; ";
                    var D = E;
                    (k = k || []).push(t), t = "", !1 !== e.createErrors ? (t += " { keyword: '" + (D || "_formatExclusiveLimit") + "' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(u) + " , params: {} ", !1 !== e.opts.messages && (t += " , message: '" + E + " should be boolean' "), e.opts.verbose && (t += " , schema: validate.schema" + l + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + m + " "), t += " } ") : t += " {} ";
                    var L = t;
                    t = k.pop(), !e.compositeRule && d ? e.async ? t += " throw new ValidationError([" + L + "]); " : t += " validate.errors = [" + L + "]; return false; " : t += " var err = " + L + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += " }  ", d && (c += "}", t += " else { "), Q && (t += " if (" + g + " === undefined) " + f + " = true; else if (typeof " + g + " != 'string') " + f + " = false; else { ", c += "}"), h && (t += " if (!" + p + ") " + f + " = true; else { ", c += "}"), t += " var " + $ + " = " + p + "(" + m + ",  ", t += Q ? "" + g : "" + e.util.toQuotedString(i), t += " ); if (" + $ + " === undefined) " + f + " = false; var " + w + " = " + b + " === true; if (" + f + " === undefined) { " + f + " = " + w + " ? " + $ + " " + S + " 0 : " + $ + " " + S + "= 0; } if (!" + f + ") var op" + s + " = " + w + " ? '" + S + "' : '" + S + "=';";
                } else {
                    A = S;
                    (w = !0 === x) || (A += "=");
                    var M = "'" + A + "'";
                    Q && (t += " if (" + g + " === undefined) " + f + " = true; else if (typeof " + g + " != 'string') " + f + " = false; else { ", c += "}"), h && (t += " if (!" + p + ") " + f + " = true; else { ", c += "}"), t += " var " + $ + " = " + p + "(" + m + ",  ", t += Q ? "" + g : "" + e.util.toQuotedString(i), t += " ); if (" + $ + " === undefined) " + f + " = false; if (" + f + " === undefined) " + f + " = " + $ + " " + S, w || (t += "="), t += " 0;";
                }
                t += c + "if (!" + f + ") { ";
                var k;
                D = a;
                (k = k || []).push(t), t = "", !1 !== e.createErrors ? (t += " { keyword: '" + (D || "_formatLimit") + "' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(u) + " , params: { comparison: " + M + ", limit:  ", t += Q ? "" + g : "" + e.util.toQuotedString(i), t += " , exclusive: " + w + " } ", !1 !== e.opts.messages && (t += " , message: 'should be " + A + ' "', t += Q ? "' + " + g + " + '" : "" + e.util.escapeQuotes(i), t += "\"' "), e.opts.verbose && (t += " , schema:  ", t += Q ? "validate.schema" + l : "" + e.util.toQuotedString(i), t += "         , parentSchema: validate.schema" + e.schemaPath + " , data: " + m + " "), t += " } ") : t += " {} ";
                L = t;
                return t = k.pop(), !e.compositeRule && d ? e.async ? t += " throw new ValidationError([" + L + "]); " : t += " validate.errors = [" + L + "]; return false; " : t += " var err = " + L + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", t += "}";
            };
        },
        {}
    ],
    "mYD7": [
        function(require1, module1, exports) {
            "use strict";
            var t = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d:\d\d)?$/i, e = /t|\s/i, i = {
                date: n,
                time: o,
                "date-time": d
            }, r = {
                type: "object",
                required: [
                    "$data"
                ],
                properties: {
                    $data: {
                        type: "string",
                        anyOf: [
                            {
                                format: "relative-json-pointer"
                            },
                            {
                                format: "json-pointer"
                            }
                        ]
                    }
                },
                additionalProperties: !1
            };
            function a(t) {
                var e = t._formats;
                for(var r in i){
                    var a = e[r];
                    ("object" != typeof a || a instanceof RegExp || !a.validate) && (a = e[r] = {
                        validate: a
                    }), a.compare || (a.compare = i[r]);
                }
            }
            function n(t, e) {
                if (t && e) return t > e ? 1 : t < e ? -1 : t === e ? 0 : void 0;
            }
            function o(e, i) {
                if (e && i && (e = e.match(t), i = i.match(t), e && i)) return (e = e[1] + e[2] + e[3] + (e[4] || "")) > (i = i[1] + i[2] + i[3] + (i[4] || "")) ? 1 : e < i ? -1 : e === i ? 0 : void 0;
            }
            function d(t, i) {
                if (t && i) {
                    t = t.split(e), i = i.split(e);
                    var r = n(t[0], i[0]);
                    if (void 0 !== r) return r || o(t[1], i[1]);
                }
            }
            module1.exports = function(t) {
                var e = "format" + t;
                return function i(n) {
                    return i.definition = {
                        type: "string",
                        inline: require1("./dotjs/_formatLimit"),
                        statements: !0,
                        errors: "full",
                        dependencies: [
                            "format"
                        ],
                        metaSchema: {
                            anyOf: [
                                {
                                    type: "string"
                                },
                                r
                            ]
                        }
                    }, n.addKeyword(e, i.definition), n.addKeyword("formatExclusive" + t, {
                        dependencies: [
                            "format" + t
                        ],
                        metaSchema: {
                            anyOf: [
                                {
                                    type: "boolean"
                                },
                                r
                            ]
                        }
                    }), a(n), n;
                };
            };
        },
        {
            "./dotjs/_formatLimit": "KeB4"
        }
    ],
    "J927": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = require1("./_formatLimit")("Minimum");
        },
        {
            "./_formatLimit": "mYD7"
        }
    ],
    "dgLz": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = require1("./_formatLimit")("Maximum");
        },
        {
            "./_formatLimit": "mYD7"
        }
    ],
    "OTUE": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, r, a) {
                var t = " ", s = e.level, o = e.dataLevel, h = e.schema[r], i = e.schemaPath + e.util.getProperty(r), l = e.errSchemaPath + "/" + r, v = !e.opts.allErrors, n = "data" + (o || ""), d = "valid" + s, p = "key" + s, c = "idx" + s, u = "patternMatched" + s, m = "dataProperties" + s, P = "", f = e.opts.ownProperties;
                t += "var " + d + " = true;", f && (t += " var " + m + " = undefined;");
                var g = h;
                if (g) for(var y, E = -1, k = g.length - 1; E < k;){
                    y = g[E += 1], t += " var " + u + " = false;  ", t += f ? " " + m + " = " + m + " || Object.keys(" + n + "); for (var " + c + "=0; " + c + "<" + m + ".length; " + c + "++) { var " + p + " = " + m + "[" + c + "]; " : " for (var " + p + " in " + n + ") { ", t += " " + u + " = " + e.usePattern(y) + ".test(" + p + "); if (" + u + ") break; } ";
                    var b = e.util.escapeQuotes(y);
                    t += " if (!" + u + ") { " + d + " = false;  var err =   ", !1 !== e.createErrors ? (t += " { keyword: 'patternRequired' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(l) + " , params: { missingPattern: '" + b + "' } ", !1 !== e.opts.messages && (t += " , message: 'should have property matching pattern \\'" + b + "\\'' "), e.opts.verbose && (t += " , schema: validate.schema" + i + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + n + " "), t += " } ") : t += " {} ", t += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; }   ", v && (P += "}", t += " else { ");
                }
                return t += "" + P;
            };
        },
        {}
    ],
    "u2zM": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function e(t) {
                return e.definition = {
                    type: "object",
                    inline: require1("./dotjs/patternRequired"),
                    statements: !0,
                    errors: "full",
                    metaSchema: {
                        type: "array",
                        items: {
                            type: "string",
                            format: "regex"
                        },
                        uniqueItems: !0
                    }
                }, t.addKeyword("patternRequired", e.definition), t;
            };
        },
        {
            "./dotjs/patternRequired": "OTUE"
        }
    ],
    "mlCb": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function(e, r, a) {
                var s = " ", t = e.level, o = e.dataLevel, h = e.schema[r], l = e.schemaPath + e.util.getProperty(r), i = e.errSchemaPath + "/" + r, c = !e.opts.allErrors, v = "data" + (o || ""), n = "valid" + t, d = "errs__" + t, m = e.util.copy(e), p = "";
                m.level++;
                var u, f = "valid" + m.level, P = "ifPassed" + e.level, E = m.baseId;
                s += "var " + P + ";";
                var w = h;
                if (w) for(var y, b = -1, g = w.length - 1; b < g;){
                    if (y = w[b += 1], b && !u && (s += " if (!" + P + ") { ", p += "}"), y.if && (e.opts.strictKeywords ? "object" == typeof y.if && Object.keys(y.if).length > 0 : e.util.schemaHasRules(y.if, e.RULES.all))) {
                        s += " var " + d + " = errors;   ";
                        var R = e.compositeRule;
                        if (e.compositeRule = m.compositeRule = !0, m.createErrors = !1, m.schema = y.if, m.schemaPath = l + "[" + b + "].if", m.errSchemaPath = i + "/" + b + "/if", s += "  " + e.validate(m) + " ", m.baseId = E, m.createErrors = !0, e.compositeRule = m.compositeRule = R, s += " " + P + " = " + f + "; if (" + P + ") {  ", "boolean" == typeof y.then) {
                            if (!1 === y.then) {
                                (I = I || []).push(s), s = "", !1 !== e.createErrors ? (s += " { keyword: 'switch' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(i) + " , params: { caseIndex: " + b + " } ", !1 !== e.opts.messages && (s += " , message: 'should pass \"switch\" keyword validation' "), e.opts.verbose && (s += " , schema: validate.schema" + l + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + v + " "), s += " } ") : s += " {} ";
                                var S = s;
                                s = I.pop(), !e.compositeRule && c ? e.async ? s += " throw new ValidationError([" + S + "]); " : s += " validate.errors = [" + S + "]; return false; " : s += " var err = " + S + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                            }
                            s += " var " + f + " = " + y.then + "; ";
                        } else m.schema = y.then, m.schemaPath = l + "[" + b + "].then", m.errSchemaPath = i + "/" + b + "/then", s += "  " + e.validate(m) + " ", m.baseId = E;
                        s += "  } else {  errors = " + d + "; if (vErrors !== null) { if (" + d + ") vErrors.length = " + d + "; else vErrors = null; } } ";
                    } else if (s += " " + P + " = true;  ", "boolean" == typeof y.then) {
                        if (!1 === y.then) {
                            var I;
                            (I = I || []).push(s), s = "", !1 !== e.createErrors ? (s += " { keyword: 'switch' , dataPath: (dataPath || '') + " + e.errorPath + " , schemaPath: " + e.util.toQuotedString(i) + " , params: { caseIndex: " + b + " } ", !1 !== e.opts.messages && (s += " , message: 'should pass \"switch\" keyword validation' "), e.opts.verbose && (s += " , schema: validate.schema" + l + " , parentSchema: validate.schema" + e.schemaPath + " , data: " + v + " "), s += " } ") : s += " {} ";
                            S = s;
                            s = I.pop(), !e.compositeRule && c ? e.async ? s += " throw new ValidationError([" + S + "]); " : s += " validate.errors = [" + S + "]; return false; " : s += " var err = " + S + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                        }
                        s += " var " + f + " = " + y.then + "; ";
                    } else m.schema = y.then, m.schemaPath = l + "[" + b + "].then", m.errSchemaPath = i + "/" + b + "/then", s += "  " + e.validate(m) + " ", m.baseId = E;
                    u = y.continue;
                }
                return s += p + "var " + n + " = " + f + ";";
            };
        },
        {}
    ],
    "KC2b": [
        function(require1, module1, exports) {
            "use strict";
            var e = require1("./_util");
            module1.exports = function i(t) {
                if (!t.RULES.keywords.switch || !t.RULES.keywords.if) {
                    var r = e.metaSchemaRef(t);
                    return i.definition = {
                        inline: require1("./dotjs/switch"),
                        statements: !0,
                        errors: "full",
                        metaSchema: {
                            type: "array",
                            items: {
                                required: [
                                    "then"
                                ],
                                properties: {
                                    if: r,
                                    then: {
                                        anyOf: [
                                            {
                                                type: "boolean"
                                            },
                                            r
                                        ]
                                    },
                                    continue: {
                                        type: "boolean"
                                    }
                                },
                                additionalProperties: !1,
                                dependencies: {
                                    continue: [
                                        "if"
                                    ]
                                }
                            }
                        }
                    }, t.addKeyword("switch", i.definition), t;
                }
            };
        },
        {
            "./_util": "R4Fp",
            "./dotjs/switch": "mlCb"
        }
    ],
    "mwue": [
        function(require1, module1, exports) {
            "use strict";
            var e = require1("./_util");
            module1.exports = function r(t) {
                if (!t._opts.$data) return console.warn("keyword select requires $data option"), t;
                var a = e.metaSchemaRef(t), n = [];
                return r.definition = {
                    validate: function e(r, t, a) {
                        if (void 0 === a.selectCases) throw new Error('keyword "selectCases" is absent');
                        var n = o(a, !1), i = n.cases[r];
                        if (void 0 === i && (i = n.default), "boolean" == typeof i) return i;
                        var s = i(t);
                        return s || (e.errors = i.errors), s;
                    },
                    $data: !0,
                    metaSchema: {
                        type: [
                            "string",
                            "number",
                            "boolean",
                            "null"
                        ]
                    }
                }, t.addKeyword("select", r.definition), t.addKeyword("selectCases", {
                    compile: function(e, r) {
                        var t = o(r);
                        for(var a in e)t.cases[a] = i(e[a]);
                        return function() {
                            return !0;
                        };
                    },
                    valid: !0,
                    metaSchema: {
                        type: "object",
                        additionalProperties: a
                    }
                }), t.addKeyword("selectDefault", {
                    compile: function(e, r) {
                        return o(r).default = i(e), function() {
                            return !0;
                        };
                    },
                    valid: !0,
                    metaSchema: a
                }), t;
                function o(e, r) {
                    var t;
                    return n.some(function(r) {
                        if (r.parentSchema === e) return t = r, !0;
                    }), t || !1 === r || (t = {
                        parentSchema: e,
                        cases: {},
                        default: !0
                    }, n.push(t)), t;
                }
                function i(e) {
                    return "boolean" == typeof e ? e : t.compile(e);
                }
            };
        },
        {
            "./_util": "R4Fp"
        }
    ],
    "selR": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = function e(r) {
                var n = {
                    trimLeft: function(e) {
                        return e.replace(/^[\s]+/, "");
                    },
                    trimRight: function(e) {
                        return e.replace(/[\s]+$/, "");
                    },
                    trim: function(e) {
                        return e.trim();
                    },
                    toLowerCase: function(e) {
                        return e.toLowerCase();
                    },
                    toUpperCase: function(e) {
                        return e.toUpperCase();
                    },
                    toEnumCase: function(e, r) {
                        return r.hash[t(e)] || e;
                    }
                };
                return e.definition = {
                    type: "string",
                    errors: !1,
                    modifying: !0,
                    valid: !0,
                    compile: function(e, r) {
                        var i;
                        if (-1 !== e.indexOf("toEnumCase")) {
                            if (i = {
                                hash: {}
                            }, !r.enum) throw new Error('Missing enum. To use `transform:["toEnumCase"]`, `enum:[...]` is required.');
                            for(var o = r.enum.length; o--; o){
                                var u = r.enum[o];
                                if ("string" == typeof u) {
                                    var s = t(u);
                                    if (i.hash[s]) throw new Error('Invalid enum uniqueness. To use `transform:["toEnumCase"]`, all values must be unique when case insensitive.');
                                    i.hash[s] = u;
                                }
                            }
                        }
                        return function(r, t, o, u) {
                            if (o) {
                                for(var s = 0, a = e.length; s < a; s++)r = n[e[s]](r, i);
                                o[u] = r;
                            }
                        };
                    },
                    metaSchema: {
                        type: "array",
                        items: {
                            type: "string",
                            enum: [
                                "trimLeft",
                                "trimRight",
                                "trim",
                                "toLowerCase",
                                "toUpperCase",
                                "toEnumCase"
                            ]
                        }
                    }
                }, r.addKeyword("transform", e.definition), r;
                function t(e) {
                    return e.toLowerCase();
                }
            };
        },
        {}
    ],
    "KP4Q": [
        function(require1, module1, exports) {
            "use strict";
            module1.exports = {
                instanceof: require1("./instanceof"),
                range: require1("./range"),
                regexp: require1("./regexp"),
                typeof: require1("./typeof"),
                dynamicDefaults: require1("./dynamicDefaults"),
                allRequired: require1("./allRequired"),
                anyRequired: require1("./anyRequired"),
                oneRequired: require1("./oneRequired"),
                prohibited: require1("./prohibited"),
                uniqueItemProperties: require1("./uniqueItemProperties"),
                deepProperties: require1("./deepProperties"),
                deepRequired: require1("./deepRequired"),
                formatMinimum: require1("./formatMinimum"),
                formatMaximum: require1("./formatMaximum"),
                patternRequired: require1("./patternRequired"),
                switch: require1("./switch"),
                select: require1("./select"),
                transform: require1("./transform")
            };
        },
        {
            "./instanceof": "dhP9",
            "./range": "uBCt",
            "./regexp": "AtCq",
            "./typeof": "yoml",
            "./dynamicDefaults": "FbE8",
            "./allRequired": "CJDR",
            "./anyRequired": "n1DR",
            "./oneRequired": "XrCF",
            "./prohibited": "MFGI",
            "./uniqueItemProperties": "m7Ap",
            "./deepProperties": "kIuQ",
            "./deepRequired": "KB8y",
            "./formatMinimum": "J927",
            "./formatMaximum": "dgLz",
            "./patternRequired": "u2zM",
            "./switch": "KC2b",
            "./select": "mwue",
            "./transform": "selR"
        }
    ],
    "n1A8": [
        function(require1, module1, exports) {
            "use strict";
            var r = require1("./keywords");
            function e(e, t) {
                if (Array.isArray(t)) {
                    for(var o = 0; o < t.length; o++)n(t[o])(e);
                    return e;
                }
                if (t) return n(t)(e), e;
                for(t in r)n(t)(e);
                return e;
            }
            function n(e) {
                var n = r[e];
                if (!n) throw new Error("Unknown keyword " + e);
                return n;
            }
            module1.exports = e, e.get = n;
        },
        {
            "./keywords": "KP4Q"
        }
    ],
    "STvH": [
        function(require1, module1, exports) {
            "use strict";
            function r(r) {
                if ("undefined" == typeof Symbol || null == r[Symbol.iterator]) {
                    if (Array.isArray(r) || (r = n(r))) {
                        var t = 0, e = function() {};
                        return {
                            s: e,
                            n: function() {
                                return t >= r.length ? {
                                    done: !0
                                } : {
                                    done: !1,
                                    value: r[t++]
                                };
                            },
                            e: function(r) {
                                throw r;
                            },
                            f: e
                        };
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }
                var o, a, i = !0, u = !1;
                return {
                    s: function() {
                        o = r[Symbol.iterator]();
                    },
                    n: function() {
                        var r = o.next();
                        return i = r.done, r;
                    },
                    e: function(r) {
                        u = !0, a = r;
                    },
                    f: function() {
                        try {
                            i || null == o.return || o.return();
                        } finally{
                            if (u) throw a;
                        }
                    }
                };
            }
            function t(r) {
                return a(r) || o(r) || n(r) || e();
            }
            function e() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            function n(r, t) {
                if (r) {
                    if ("string" == typeof r) return i(r, t);
                    var e = Object.prototype.toString.call(r).slice(8, -1);
                    return "Object" === e && r.constructor && (e = r.constructor.name), "Map" === e || "Set" === e ? Array.from(e) : "Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? i(r, t) : void 0;
                }
            }
            function o(r) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(r)) return Array.from(r);
            }
            function a(r) {
                if (Array.isArray(r)) return i(r);
            }
            function i(r, t) {
                (null == t || t > r.length) && (t = r.length);
                for(var e = 0, n = new Array(t); e < t; e++)n[e] = r[e];
                return n;
            }
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.validate = y, Object.defineProperty(exports, "ValidationError", {
                enumerable: !0,
                get: function() {
                    return c.default;
                }
            });
            var u = f(require1("./keywords/absolutePath")), c = f(require1("./ValidationError"));
            function f(r) {
                return r && r.__esModule ? r : {
                    default: r
                };
            }
            var l = require1("ajv"), d = require1("ajv-keywords"), s = new l({
                allErrors: !0,
                verbose: !0,
                $data: !0
            });
            function y(r, e, n) {
                var o = [];
                if (Array.isArray(e) ? ((o = Array.from(e, function(t) {
                    return h(r, t);
                })).forEach(function(r, t) {
                    r.forEach(function r(e) {
                        e.dataPath = "[".concat(t, "]").concat(e.dataPath), e.children && e.children.forEach(r);
                    });
                }), o = o.reduce(function(r, e) {
                    return r.push.apply(r, t(e)), r;
                }, [])) : o = h(r, e), o.length > 0) throw new c.default(o, r, n);
            }
            function h(r, t) {
                var e = s.compile(r);
                return e(t) ? [] : e.errors ? m(e.errors) : [];
            }
            function m(t) {
                var e, n = [], o = r(t);
                try {
                    var a = function() {
                        var r = e.value, t = r.dataPath, o = [];
                        n = n.filter(function(r) {
                            return !r.dataPath.includes(t) || (r.children && (o = o.concat(r.children.slice(0))), r.children = void 0, o.push(r), !1);
                        }), o.length && (r.children = o), n.push(r);
                    };
                    for(o.s(); !(e = o.n()).done;)a();
                } catch (i) {
                    o.e(i);
                } finally{
                    o.f();
                }
                return n;
            }
            d(s, [
                "instanceof",
                "formatMinimum",
                "formatMaximum",
                "patternRequired"
            ]), (0, u.default)(s);
        },
        {
            "./keywords/absolutePath": "iIhC",
            "./ValidationError": "ySUA",
            "ajv": "hi5j",
            "ajv-keywords": "n1A8"
        }
    ],
    "pA46": [
        function(require1, module1, exports) {
            "use strict";
            var a = require1("./validate"), r = a.validate, i = a.ValidationError;
            module1.exports = {
                validate: r,
                ValidationError: i
            };
        },
        {
            "./validate": "STvH"
        }
    ],
    "t7hQ": [
        function(require1, module1, exports) {
            function r(r, n) {
                return i(r) || o(r, n) || e(r, n) || t();
            }
            function t() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            function e(r, t) {
                if (r) {
                    if ("string" == typeof r) return n(r, t);
                    var e = Object.prototype.toString.call(r).slice(8, -1);
                    return "Object" === e && r.constructor && (e = r.constructor.name), "Map" === e || "Set" === e ? Array.from(e) : "Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? n(r, t) : void 0;
                }
            }
            function n(r, t) {
                (null == t || t > r.length) && (t = r.length);
                for(var e = 0, n = new Array(t); e < t; e++)n[e] = r[e];
                return n;
            }
            function o(r, t) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(r)) {
                    var e = [], n = !0, o = !1, i = void 0;
                    try {
                        for(var a, u = r[Symbol.iterator](); !(n = (a = u.next()).done) && (e.push(a.value), !t || e.length !== t); n = !0);
                    } catch (l) {
                        o = !0, i = l;
                    } finally{
                        try {
                            n || null == u.return || u.return();
                        } finally{
                            if (o) throw i;
                        }
                    }
                    return e;
                }
            }
            function i(r) {
                if (Array.isArray(r)) return r;
            }
            var a = require1("schema-utils"), u = a.validate;
            function l(r, t) {
                u(t, r);
            }
            function c(t, e) {
                for(var n = {}, o = 0, i = Object.entries(e); o < i.length; o++){
                    var a = r(i[o], 2), u = a[0], l = a[1];
                    n[u] = t[u], void 0 === n[u] && (n[u] = l.default), l.process && (n[u] = l.process(n[u]));
                }
                return n;
            }
            module1.exports = {
                validateOptions: l,
                processOptions: c
            };
        },
        {
            "schema-utils": "pA46"
        }
    ],
    "uYXM": [
        function(require1, module1, exports) {
            module1.exports = {
                type: "object",
                properties: {
                    filerDir: {
                        type: "string"
                    },
                    shimsDir: {
                        type: "string"
                    },
                    shimFs: {
                        type: "boolean"
                    },
                    shimPath: {
                        type: "boolean"
                    },
                    fsProvider: {
                        type: "string"
                    },
                    fsProviderDir: {
                        type: "string"
                    }
                }
            };
        },
        {}
    ],
    "qUtu": [
        function(require1, module1, exports) {
            var process = require1("process");
            var e = require1("process"), r = require1("path"), s = "<rootDir>", o = e.cwd();
            module1.exports = {
                filerDir: {
                    process: function(e) {
                        return e ? r.resolve(e.replace(s, o)) : r.join(o, "node_modules", "filer");
                    }
                },
                shimsDir: {
                    process: function(e) {
                        return e ? r.resolve(e.replace(s, o)) : r.join(o, "node_modules", "filer", "shims");
                    }
                },
                fsProviderDir: {
                    process: function(e) {
                        return e ? r.resolve(e.replace(s, o)) : r.join(o, "node_modules", "filer", "shims", "providers");
                    }
                },
                shimFs: {
                    default: !0
                },
                shimPath: {
                    default: !0
                },
                fsProvider: {
                    default: "default"
                }
            };
        },
        {
            "path": "UUq2",
            "process": "pBGv"
        }
    ],
    "Ge14": [
        function(require1, module1, exports) {
            function e(e, r) {
                if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
            }
            function r(e, r) {
                for(var i = 0; i < r.length; i++){
                    var o = r[i];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
                }
            }
            function i(e, i, o) {
                return i && r(e.prototype, i), o && r(e, o), e;
            }
            var o = require1("path"), s = require1("./utils"), t = "filer-webpack-plugin", n = require1("./schema"), a = require1("./processors");
            module1.exports = function() {
                function r() {
                    var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    e(this, r), s.validateOptions(i, n), this.options = s.processOptions(i, a);
                }
                return i(r, [
                    {
                        key: "apply",
                        value: function(e) {
                            var r = this;
                            e.hooks.normalModuleFactory.tap(t, function(e) {
                                e.hooks.resolve.tap(t, function(e) {
                                    if ("fsProvider" === e.request && e.context === r.options.shimsDir) return r.resolveFsProvider(e);
                                    if (!e.context.startsWith(r.options.filerDir)) switch(e.request){
                                        case "fs":
                                            if (!r.options.shimFs) return;
                                            return r.applyFsShim(e);
                                        case "path":
                                            if (!r.options.shimPath) return;
                                            return r.applyPathShim(e);
                                        default:
                                            return;
                                    }
                                });
                            });
                        }
                    },
                    {
                        key: "resolveFsProvider",
                        value: function(e) {
                            switch(this.options.fsProvider){
                                case "default":
                                    e.request = o.join(this.options.fsProviderDir, "default.js");
                                    break;
                                case "indexeddb":
                                    e.request = o.join(this.options.fsProviderDir, "indexeddb.js");
                                    break;
                                case "memory":
                                    e.request = o.join(this.options.fsProviderDir, "memory.js");
                                    break;
                                case "custom":
                                    e.request = o.join(this.options.fsProviderDir, "custom.js");
                                    break;
                                default:
                                    throw new Error([
                                        "Invalid option for fsProvider.",
                                        "fsProvider must be one of 'default', 'indexeddb', 'memory' or 'custom'.",
                                        "If using a custom fsProvider, you must also provide the fsProviderDir option."
                                    ].join(" "));
                            }
                        }
                    },
                    {
                        key: "applyFsShim",
                        value: function(e) {
                            e.request = o.join(this.options.shimsDir, "fs.js");
                        }
                    },
                    {
                        key: "applyPathShim",
                        value: function(e) {
                            e.request = o.join(this.options.shimsDir, "path.js");
                        }
                    }
                ]), r;
            }();
        },
        {
            "path": "UUq2",
            "./utils": "t7hQ",
            "./schema": "uYXM",
            "./processors": "qUtu"
        }
    ],
    "Focm": [
        function(require1, module1, exports) {
            var Buffer = require1("buffer").Buffer;
            var e = require1("buffer").Buffer, r = null, l = null;
            module1.exports = l = {
                FileSystem: require1("./filesystem/interface.js"),
                Buffer: e,
                Path: require1("./path.js"),
                path: require1("./path.js"),
                Errors: require1("./errors.js"),
                Shell: require1("./shell/shell.js"),
                FilerWebpackPlugin: require1("./webpack-plugin")
            }, Object.defineProperty(l, "fs", {
                enumerable: !0,
                get: function() {
                    return r || (r = new l.FileSystem), r;
                }
            });
        },
        {
            "./filesystem/interface.js": "GMi4",
            "./path.js": "UzoP",
            "./errors.js": "p8GN",
            "./shell/shell.js": "D1Ra",
            "./webpack-plugin": "Ge14",
            "buffer": "dskh"
        }
    ]
}, {}, [
    "Focm"
], "Filer") //# sourceMappingURL=/filer.min.js.map
;


var $546651d3547337d7$exports = {};
!function(t) {
    $546651d3547337d7$exports = t();
}(function() {
    return (function() {
        return function t(r, e, n) {
            function i(f, u) {
                if (!e[f]) {
                    if (!r[f]) {
                        var s = undefined;
                        if (!u && s) return s(f, !0);
                        if (o) return o(f, !0);
                        var h = new Error("Cannot find module '" + f + "'");
                        throw h.code = "MODULE_NOT_FOUND", h;
                    }
                    var a = e[f] = {
                        exports: {}
                    };
                    r[f][0].call(a.exports, function(t) {
                        return i(r[f][1][t] || t);
                    }, a, a.exports, t, r, e, n);
                }
                return e[f].exports;
            }
            for(var o = undefined, f = 0; f < n.length; f++)i(n[f]);
            return i;
        };
    })()({
        1: [
            function(t, r, e) {
                "use strict";
                e.byteLength = function(t) {
                    var r = h(t), e = r[0], n = r[1];
                    return 3 * (e + n) / 4 - n;
                }, e.toByteArray = function(t) {
                    var r, e, n = h(t), f = n[0], u = n[1], s = new o(function(t, r, e) {
                        return 3 * (r + e) / 4 - e;
                    }(0, f, u)), a = 0, c = u > 0 ? f - 4 : f;
                    for(e = 0; e < c; e += 4)r = i[t.charCodeAt(e)] << 18 | i[t.charCodeAt(e + 1)] << 12 | i[t.charCodeAt(e + 2)] << 6 | i[t.charCodeAt(e + 3)], s[a++] = r >> 16 & 255, s[a++] = r >> 8 & 255, s[a++] = 255 & r;
                    2 === u && (r = i[t.charCodeAt(e)] << 2 | i[t.charCodeAt(e + 1)] >> 4, s[a++] = 255 & r);
                    1 === u && (r = i[t.charCodeAt(e)] << 10 | i[t.charCodeAt(e + 1)] << 4 | i[t.charCodeAt(e + 2)] >> 2, s[a++] = r >> 8 & 255, s[a++] = 255 & r);
                    return s;
                }, e.fromByteArray = function(t) {
                    for(var r, e = t.length, i = e % 3, o = [], f = 0, u = e - i; f < u; f += 16383)o.push(a(t, f, f + 16383 > u ? u : f + 16383));
                    1 === i ? (r = t[e - 1], o.push(n[r >> 2] + n[r << 4 & 63] + "==")) : 2 === i && (r = (t[e - 2] << 8) + t[e - 1], o.push(n[r >> 10] + n[r >> 4 & 63] + n[r << 2 & 63] + "="));
                    return o.join("");
                };
                for(var n = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u = 0, s = f.length; u < s; ++u)n[u] = f[u], i[f.charCodeAt(u)] = u;
                function h(t) {
                    var r = t.length;
                    if (r % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                    var e = t.indexOf("=");
                    return -1 === e && (e = r), [
                        e,
                        e === r ? 0 : 4 - e % 4
                    ];
                }
                function a(t, r, e) {
                    for(var i, o, f = [], u = r; u < e; u += 3)i = (t[u] << 16 & 16711680) + (t[u + 1] << 8 & 65280) + (255 & t[u + 2]), f.push(n[(o = i) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o]);
                    return f.join("");
                }
                i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63;
            },
            {}
        ],
        2: [
            function(t, r, e) {
                (function(r) {
                    "use strict";
                    var n = t("base64-js"), i = t("ieee754");
                    e.Buffer = r, e.SlowBuffer = function(t) {
                        +t != t && (t = 0);
                        return r.alloc(+t);
                    }, e.INSPECT_MAX_BYTES = 50;
                    var o = 2147483647;
                    function f(t) {
                        if (t > o) throw new RangeError('The value "' + t + '" is invalid for option "size"');
                        var e = new Uint8Array(t);
                        return e.__proto__ = r.prototype, e;
                    }
                    function r(t, r, e) {
                        if ("number" == typeof t) {
                            if ("string" == typeof r) throw new TypeError('The "string" argument must be of type string. Received type number');
                            return h(t);
                        }
                        return u(t, r, e);
                    }
                    function u(t, e, n) {
                        if ("string" == typeof t) return function(t, e) {
                            "string" == typeof e && "" !== e || (e = "utf8");
                            if (!r.isEncoding(e)) throw new TypeError("Unknown encoding: " + e);
                            var n = 0 | p(t, e), i = f(n), o = i.write(t, e);
                            o !== n && (i = i.slice(0, o));
                            return i;
                        }(t, e);
                        if (ArrayBuffer.isView(t)) return a(t);
                        if (null == t) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
                        if (j(t, ArrayBuffer) || t && j(t.buffer, ArrayBuffer)) return function(t, e, n) {
                            if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
                            if (t.byteLength < e + (n || 0)) throw new RangeError('"length" is outside of buffer bounds');
                            var i;
                            i = void 0 === e && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, e) : new Uint8Array(t, e, n);
                            return i.__proto__ = r.prototype, i;
                        }(t, e, n);
                        if ("number" == typeof t) throw new TypeError('The "value" argument must not be of type number. Received type number');
                        var i = t.valueOf && t.valueOf();
                        if (null != i && i !== t) return r.from(i, e, n);
                        var o = function(t) {
                            if (r.isBuffer(t)) {
                                var e = 0 | c(t.length), n = f(e);
                                return 0 === n.length ? n : (t.copy(n, 0, 0, e), n);
                            }
                            if (void 0 !== t.length) return "number" != typeof t.length || F(t.length) ? f(0) : a(t);
                            if ("Buffer" === t.type && Array.isArray(t.data)) return a(t.data);
                        }(t);
                        if (o) return o;
                        if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive]) return r.from(t[Symbol.toPrimitive]("string"), e, n);
                        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
                    }
                    function s(t) {
                        if ("number" != typeof t) throw new TypeError('"size" argument must be of type number');
                        if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"');
                    }
                    function h(t) {
                        return s(t), f(t < 0 ? 0 : 0 | c(t));
                    }
                    function a(t) {
                        for(var r = t.length < 0 ? 0 : 0 | c(t.length), e = f(r), n = 0; n < r; n += 1)e[n] = 255 & t[n];
                        return e;
                    }
                    function c(t) {
                        if (t >= o) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o.toString(16) + " bytes");
                        return 0 | t;
                    }
                    function p(t, e) {
                        if (r.isBuffer(t)) return t.length;
                        if (ArrayBuffer.isView(t) || j(t, ArrayBuffer)) return t.byteLength;
                        if ("string" != typeof t) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
                        var n = t.length, i = arguments.length > 2 && !0 === arguments[2];
                        if (!i && 0 === n) return 0;
                        for(var o = !1;;)switch(e){
                            case "ascii":
                            case "latin1":
                            case "binary":
                                return n;
                            case "utf8":
                            case "utf-8":
                                return P(t).length;
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return 2 * n;
                            case "hex":
                                return n >>> 1;
                            case "base64":
                                return k(t).length;
                            default:
                                if (o) return i ? -1 : P(t).length;
                                e = ("" + e).toLowerCase(), o = !0;
                        }
                    }
                    function l(t, r, e) {
                        var n = t[r];
                        t[r] = t[e], t[e] = n;
                    }
                    function y(t, e, n, i, o) {
                        if (0 === t.length) return -1;
                        if ("string" == typeof n ? (i = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), F(n = +n) && (n = o ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                            if (o) return -1;
                            n = t.length - 1;
                        } else if (n < 0) {
                            if (!o) return -1;
                            n = 0;
                        }
                        if ("string" == typeof e && (e = r.from(e, i)), r.isBuffer(e)) return 0 === e.length ? -1 : g(t, e, n, i, o);
                        if ("number" == typeof e) return e &= 255, "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : g(t, [
                            e
                        ], n, i, o);
                        throw new TypeError("val must be string, number or Buffer");
                    }
                    function g(t, r, e, n, i) {
                        var o, f = 1, u = t.length, s = r.length;
                        if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                            if (t.length < 2 || r.length < 2) return -1;
                            f = 2, u /= 2, s /= 2, e /= 2;
                        }
                        function h(t, r) {
                            return 1 === f ? t[r] : t.readUInt16BE(r * f);
                        }
                        if (i) {
                            var a = -1;
                            for(o = e; o < u; o++)if (h(t, o) === h(r, -1 === a ? 0 : o - a)) {
                                if (-1 === a && (a = o), o - a + 1 === s) return a * f;
                            } else -1 !== a && (o -= o - a), a = -1;
                        } else for(e + s > u && (e = u - s), o = e; o >= 0; o--){
                            for(var c = !0, p = 0; p < s; p++)if (h(t, o + p) !== h(r, p)) {
                                c = !1;
                                break;
                            }
                            if (c) return o;
                        }
                        return -1;
                    }
                    function w(t, r, e, n) {
                        e = Number(e) || 0;
                        var i = t.length - e;
                        n ? (n = Number(n)) > i && (n = i) : n = i;
                        var o = r.length;
                        n > o / 2 && (n = o / 2);
                        for(var f = 0; f < n; ++f){
                            var u = parseInt(r.substr(2 * f, 2), 16);
                            if (F(u)) return f;
                            t[e + f] = u;
                        }
                        return f;
                    }
                    function d(t, r, e, n) {
                        return $(P(r, t.length - e), t, e, n);
                    }
                    function b(t, r, e, n) {
                        return $(function(t) {
                            for(var r = [], e = 0; e < t.length; ++e)r.push(255 & t.charCodeAt(e));
                            return r;
                        }(r), t, e, n);
                    }
                    function m(t, r, e, n) {
                        return b(t, r, e, n);
                    }
                    function E(t, r, e, n) {
                        return $(k(r), t, e, n);
                    }
                    function v(t, r, e, n) {
                        return $(function(t, r) {
                            for(var e, n, i, o = [], f = 0; f < t.length && !((r -= 2) < 0); ++f)e = t.charCodeAt(f), n = e >> 8, i = e % 256, o.push(i), o.push(n);
                            return o;
                        }(r, t.length - e), t, e, n);
                    }
                    function B(t, r, e) {
                        return 0 === r && e === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(r, e));
                    }
                    function A(t, r, e) {
                        e = Math.min(t.length, e);
                        for(var n = [], i = r; i < e;){
                            var o, f, u, s, h = t[i], a = null, c = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
                            if (i + c <= e) switch(c){
                                case 1:
                                    h < 128 && (a = h);
                                    break;
                                case 2:
                                    128 == (192 & (o = t[i + 1])) && (s = (31 & h) << 6 | 63 & o) > 127 && (a = s);
                                    break;
                                case 3:
                                    o = t[i + 1], f = t[i + 2], 128 == (192 & o) && 128 == (192 & f) && (s = (15 & h) << 12 | (63 & o) << 6 | 63 & f) > 2047 && (s < 55296 || s > 57343) && (a = s);
                                    break;
                                case 4:
                                    o = t[i + 1], f = t[i + 2], u = t[i + 3], 128 == (192 & o) && 128 == (192 & f) && 128 == (192 & u) && (s = (15 & h) << 18 | (63 & o) << 12 | (63 & f) << 6 | 63 & u) > 65535 && s < 1114112 && (a = s);
                            }
                            null === a ? (a = 65533, c = 1) : a > 65535 && (a -= 65536, n.push(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), n.push(a), i += c;
                        }
                        return function(t) {
                            var r = t.length;
                            if (r <= I) return String.fromCharCode.apply(String, t);
                            var e = "", n = 0;
                            for(; n < r;)e += String.fromCharCode.apply(String, t.slice(n, n += I));
                            return e;
                        }(n);
                    }
                    e.kMaxLength = o, r.TYPED_ARRAY_SUPPORT = function() {
                        try {
                            var t = new Uint8Array(1);
                            return t.__proto__ = {
                                __proto__: Uint8Array.prototype,
                                foo: function() {
                                    return 42;
                                }
                            }, 42 === t.foo();
                        } catch (t) {
                            return !1;
                        }
                    }(), r.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(r.prototype, "parent", {
                        enumerable: !0,
                        get: function() {
                            if (r.isBuffer(this)) return this.buffer;
                        }
                    }), Object.defineProperty(r.prototype, "offset", {
                        enumerable: !0,
                        get: function() {
                            if (r.isBuffer(this)) return this.byteOffset;
                        }
                    }), "undefined" != typeof Symbol && null != Symbol.species && r[Symbol.species] === r && Object.defineProperty(r, Symbol.species, {
                        value: null,
                        configurable: !0,
                        enumerable: !1,
                        writable: !1
                    }), r.poolSize = 8192, r.from = function(t, r, e) {
                        return u(t, r, e);
                    }, r.prototype.__proto__ = Uint8Array.prototype, r.__proto__ = Uint8Array, r.alloc = function(t, r, e) {
                        return function(t, r, e) {
                            return s(t), t <= 0 ? f(t) : void 0 !== r ? "string" == typeof e ? f(t).fill(r, e) : f(t).fill(r) : f(t);
                        }(t, r, e);
                    }, r.allocUnsafe = function(t) {
                        return h(t);
                    }, r.allocUnsafeSlow = function(t) {
                        return h(t);
                    }, r.isBuffer = function(t) {
                        return null != t && !0 === t._isBuffer && t !== r.prototype;
                    }, r.compare = function(t, e) {
                        if (j(t, Uint8Array) && (t = r.from(t, t.offset, t.byteLength)), j(e, Uint8Array) && (e = r.from(e, e.offset, e.byteLength)), !r.isBuffer(t) || !r.isBuffer(e)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                        if (t === e) return 0;
                        for(var n = t.length, i = e.length, o = 0, f = Math.min(n, i); o < f; ++o)if (t[o] !== e[o]) {
                            n = t[o], i = e[o];
                            break;
                        }
                        return n < i ? -1 : i < n ? 1 : 0;
                    }, r.isEncoding = function(t) {
                        switch(String(t).toLowerCase()){
                            case "hex":
                            case "utf8":
                            case "utf-8":
                            case "ascii":
                            case "latin1":
                            case "binary":
                            case "base64":
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return !0;
                            default:
                                return !1;
                        }
                    }, r.concat = function(t, e) {
                        if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                        if (0 === t.length) return r.alloc(0);
                        var n;
                        if (void 0 === e) for(e = 0, n = 0; n < t.length; ++n)e += t[n].length;
                        var i = r.allocUnsafe(e), o = 0;
                        for(n = 0; n < t.length; ++n){
                            var f = t[n];
                            if (j(f, Uint8Array) && (f = r.from(f)), !r.isBuffer(f)) throw new TypeError('"list" argument must be an Array of Buffers');
                            f.copy(i, o), o += f.length;
                        }
                        return i;
                    }, r.byteLength = p, r.prototype._isBuffer = !0, r.prototype.swap16 = function() {
                        var t = this.length;
                        if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                        for(var r = 0; r < t; r += 2)l(this, r, r + 1);
                        return this;
                    }, r.prototype.swap32 = function() {
                        var t = this.length;
                        if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                        for(var r = 0; r < t; r += 4)l(this, r, r + 3), l(this, r + 1, r + 2);
                        return this;
                    }, r.prototype.swap64 = function() {
                        var t = this.length;
                        if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                        for(var r = 0; r < t; r += 8)l(this, r, r + 7), l(this, r + 1, r + 6), l(this, r + 2, r + 5), l(this, r + 3, r + 4);
                        return this;
                    }, r.prototype.toString = function() {
                        var t = this.length;
                        return 0 === t ? "" : 0 === arguments.length ? A(this, 0, t) : (function(t, r, e) {
                            var n = !1;
                            if ((void 0 === r || r < 0) && (r = 0), r > this.length) return "";
                            if ((void 0 === e || e > this.length) && (e = this.length), e <= 0) return "";
                            if ((e >>>= 0) <= (r >>>= 0)) return "";
                            for(t || (t = "utf8");;)switch(t){
                                case "hex":
                                    return T(this, r, e);
                                case "utf8":
                                case "utf-8":
                                    return A(this, r, e);
                                case "ascii":
                                    return U(this, r, e);
                                case "latin1":
                                case "binary":
                                    return R(this, r, e);
                                case "base64":
                                    return B(this, r, e);
                                case "ucs2":
                                case "ucs-2":
                                case "utf16le":
                                case "utf-16le":
                                    return _(this, r, e);
                                default:
                                    if (n) throw new TypeError("Unknown encoding: " + t);
                                    t = (t + "").toLowerCase(), n = !0;
                            }
                        }).apply(this, arguments);
                    }, r.prototype.toLocaleString = r.prototype.toString, r.prototype.equals = function(t) {
                        if (!r.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                        return this === t || 0 === r.compare(this, t);
                    }, r.prototype.inspect = function() {
                        var t = "", r = e.INSPECT_MAX_BYTES;
                        return t = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(), this.length > r && (t += " ... "), "<Buffer " + t + ">";
                    }, r.prototype.compare = function(t, e, n, i, o) {
                        if (j(t, Uint8Array) && (t = r.from(t, t.offset, t.byteLength)), !r.isBuffer(t)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
                        if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === i && (i = 0), void 0 === o && (o = this.length), e < 0 || n > t.length || i < 0 || o > this.length) throw new RangeError("out of range index");
                        if (i >= o && e >= n) return 0;
                        if (i >= o) return -1;
                        if (e >= n) return 1;
                        if (this === t) return 0;
                        for(var f = (o >>>= 0) - (i >>>= 0), u = (n >>>= 0) - (e >>>= 0), s = Math.min(f, u), h = this.slice(i, o), a = t.slice(e, n), c = 0; c < s; ++c)if (h[c] !== a[c]) {
                            f = h[c], u = a[c];
                            break;
                        }
                        return f < u ? -1 : u < f ? 1 : 0;
                    }, r.prototype.includes = function(t, r, e) {
                        return -1 !== this.indexOf(t, r, e);
                    }, r.prototype.indexOf = function(t, r, e) {
                        return y(this, t, r, e, !0);
                    }, r.prototype.lastIndexOf = function(t, r, e) {
                        return y(this, t, r, e, !1);
                    }, r.prototype.write = function(t, r, e, n) {
                        if (void 0 === r) n = "utf8", e = this.length, r = 0;
                        else if (void 0 === e && "string" == typeof r) n = r, e = this.length, r = 0;
                        else {
                            if (!isFinite(r)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                            r >>>= 0, isFinite(e) ? (e >>>= 0, void 0 === n && (n = "utf8")) : (n = e, e = void 0);
                        }
                        var i = this.length - r;
                        if ((void 0 === e || e > i) && (e = i), t.length > 0 && (e < 0 || r < 0) || r > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                        n || (n = "utf8");
                        for(var o = !1;;)switch(n){
                            case "hex":
                                return w(this, t, r, e);
                            case "utf8":
                            case "utf-8":
                                return d(this, t, r, e);
                            case "ascii":
                                return b(this, t, r, e);
                            case "latin1":
                            case "binary":
                                return m(this, t, r, e);
                            case "base64":
                                return E(this, t, r, e);
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return v(this, t, r, e);
                            default:
                                if (o) throw new TypeError("Unknown encoding: " + n);
                                n = ("" + n).toLowerCase(), o = !0;
                        }
                    }, r.prototype.toJSON = function() {
                        return {
                            type: "Buffer",
                            data: Array.prototype.slice.call(this._arr || this, 0)
                        };
                    };
                    var I = 4096;
                    function U(t, r, e) {
                        var n = "";
                        e = Math.min(t.length, e);
                        for(var i = r; i < e; ++i)n += String.fromCharCode(127 & t[i]);
                        return n;
                    }
                    function R(t, r, e) {
                        var n = "";
                        e = Math.min(t.length, e);
                        for(var i = r; i < e; ++i)n += String.fromCharCode(t[i]);
                        return n;
                    }
                    function T(t, r, e) {
                        var n = t.length;
                        (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
                        for(var i = "", o = r; o < e; ++o)i += N(t[o]);
                        return i;
                    }
                    function _(t, r, e) {
                        for(var n = t.slice(r, e), i = "", o = 0; o < n.length; o += 2)i += String.fromCharCode(n[o] + 256 * n[o + 1]);
                        return i;
                    }
                    function L(t, r, e) {
                        if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                        if (t + r > e) throw new RangeError("Trying to access beyond buffer length");
                    }
                    function S(t, e, n, i, o, f) {
                        if (!r.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                        if (e > o || e < f) throw new RangeError('"value" argument is out of bounds');
                        if (n + i > t.length) throw new RangeError("Index out of range");
                    }
                    function O(t, r, e, n, i, o) {
                        if (e + n > t.length) throw new RangeError("Index out of range");
                        if (e < 0) throw new RangeError("Index out of range");
                    }
                    function C(t, r, e, n, o) {
                        return r = +r, e >>>= 0, o || O(t, 0, e, 4), i.write(t, r, e, n, 23, 4), e + 4;
                    }
                    function x(t, r, e, n, o) {
                        return r = +r, e >>>= 0, o || O(t, 0, e, 8), i.write(t, r, e, n, 52, 8), e + 8;
                    }
                    r.prototype.slice = function(t, e) {
                        var n = this.length;
                        (t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), (e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), e < t && (e = t);
                        var i = this.subarray(t, e);
                        return i.__proto__ = r.prototype, i;
                    }, r.prototype.readUIntLE = function(t, r, e) {
                        t >>>= 0, r >>>= 0, e || L(t, r, this.length);
                        for(var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);)n += this[t + o] * i;
                        return n;
                    }, r.prototype.readUIntBE = function(t, r, e) {
                        t >>>= 0, r >>>= 0, e || L(t, r, this.length);
                        for(var n = this[t + --r], i = 1; r > 0 && (i *= 256);)n += this[t + --r] * i;
                        return n;
                    }, r.prototype.readUInt8 = function(t, r) {
                        return t >>>= 0, r || L(t, 1, this.length), this[t];
                    }, r.prototype.readUInt16LE = function(t, r) {
                        return t >>>= 0, r || L(t, 2, this.length), this[t] | this[t + 1] << 8;
                    }, r.prototype.readUInt16BE = function(t, r) {
                        return t >>>= 0, r || L(t, 2, this.length), this[t] << 8 | this[t + 1];
                    }, r.prototype.readUInt32LE = function(t, r) {
                        return t >>>= 0, r || L(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
                    }, r.prototype.readUInt32BE = function(t, r) {
                        return t >>>= 0, r || L(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
                    }, r.prototype.readIntLE = function(t, r, e) {
                        t >>>= 0, r >>>= 0, e || L(t, r, this.length);
                        for(var n = this[t], i = 1, o = 0; ++o < r && (i *= 256);)n += this[t + o] * i;
                        return n >= (i *= 128) && (n -= Math.pow(2, 8 * r)), n;
                    }, r.prototype.readIntBE = function(t, r, e) {
                        t >>>= 0, r >>>= 0, e || L(t, r, this.length);
                        for(var n = r, i = 1, o = this[t + --n]; n > 0 && (i *= 256);)o += this[t + --n] * i;
                        return o >= (i *= 128) && (o -= Math.pow(2, 8 * r)), o;
                    }, r.prototype.readInt8 = function(t, r) {
                        return t >>>= 0, r || L(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
                    }, r.prototype.readInt16LE = function(t, r) {
                        t >>>= 0, r || L(t, 2, this.length);
                        var e = this[t] | this[t + 1] << 8;
                        return 32768 & e ? 4294901760 | e : e;
                    }, r.prototype.readInt16BE = function(t, r) {
                        t >>>= 0, r || L(t, 2, this.length);
                        var e = this[t + 1] | this[t] << 8;
                        return 32768 & e ? 4294901760 | e : e;
                    }, r.prototype.readInt32LE = function(t, r) {
                        return t >>>= 0, r || L(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
                    }, r.prototype.readInt32BE = function(t, r) {
                        return t >>>= 0, r || L(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
                    }, r.prototype.readFloatLE = function(t, r) {
                        return t >>>= 0, r || L(t, 4, this.length), i.read(this, t, !0, 23, 4);
                    }, r.prototype.readFloatBE = function(t, r) {
                        return t >>>= 0, r || L(t, 4, this.length), i.read(this, t, !1, 23, 4);
                    }, r.prototype.readDoubleLE = function(t, r) {
                        return t >>>= 0, r || L(t, 8, this.length), i.read(this, t, !0, 52, 8);
                    }, r.prototype.readDoubleBE = function(t, r) {
                        return t >>>= 0, r || L(t, 8, this.length), i.read(this, t, !1, 52, 8);
                    }, r.prototype.writeUIntLE = function(t, r, e, n) {
                        (t = +t, r >>>= 0, e >>>= 0, n) || S(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
                        var i = 1, o = 0;
                        for(this[r] = 255 & t; ++o < e && (i *= 256);)this[r + o] = t / i & 255;
                        return r + e;
                    }, r.prototype.writeUIntBE = function(t, r, e, n) {
                        (t = +t, r >>>= 0, e >>>= 0, n) || S(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
                        var i = e - 1, o = 1;
                        for(this[r + i] = 255 & t; --i >= 0 && (o *= 256);)this[r + i] = t / o & 255;
                        return r + e;
                    }, r.prototype.writeUInt8 = function(t, r, e) {
                        return t = +t, r >>>= 0, e || S(this, t, r, 1, 255, 0), this[r] = 255 & t, r + 1;
                    }, r.prototype.writeUInt16LE = function(t, r, e) {
                        return t = +t, r >>>= 0, e || S(this, t, r, 2, 65535, 0), this[r] = 255 & t, this[r + 1] = t >>> 8, r + 2;
                    }, r.prototype.writeUInt16BE = function(t, r, e) {
                        return t = +t, r >>>= 0, e || S(this, t, r, 2, 65535, 0), this[r] = t >>> 8, this[r + 1] = 255 & t, r + 2;
                    }, r.prototype.writeUInt32LE = function(t, r, e) {
                        return t = +t, r >>>= 0, e || S(this, t, r, 4, 4294967295, 0), this[r + 3] = t >>> 24, this[r + 2] = t >>> 16, this[r + 1] = t >>> 8, this[r] = 255 & t, r + 4;
                    }, r.prototype.writeUInt32BE = function(t, r, e) {
                        return t = +t, r >>>= 0, e || S(this, t, r, 4, 4294967295, 0), this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t, r + 4;
                    }, r.prototype.writeIntLE = function(t, r, e, n) {
                        if (t = +t, r >>>= 0, !n) {
                            var i = Math.pow(2, 8 * e - 1);
                            S(this, t, r, e, i - 1, -i);
                        }
                        var o = 0, f = 1, u = 0;
                        for(this[r] = 255 & t; ++o < e && (f *= 256);)t < 0 && 0 === u && 0 !== this[r + o - 1] && (u = 1), this[r + o] = (t / f >> 0) - u & 255;
                        return r + e;
                    }, r.prototype.writeIntBE = function(t, r, e, n) {
                        if (t = +t, r >>>= 0, !n) {
                            var i = Math.pow(2, 8 * e - 1);
                            S(this, t, r, e, i - 1, -i);
                        }
                        var o = e - 1, f = 1, u = 0;
                        for(this[r + o] = 255 & t; --o >= 0 && (f *= 256);)t < 0 && 0 === u && 0 !== this[r + o + 1] && (u = 1), this[r + o] = (t / f >> 0) - u & 255;
                        return r + e;
                    }, r.prototype.writeInt8 = function(t, r, e) {
                        return t = +t, r >>>= 0, e || S(this, t, r, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[r] = 255 & t, r + 1;
                    }, r.prototype.writeInt16LE = function(t, r, e) {
                        return t = +t, r >>>= 0, e || S(this, t, r, 2, 32767, -32768), this[r] = 255 & t, this[r + 1] = t >>> 8, r + 2;
                    }, r.prototype.writeInt16BE = function(t, r, e) {
                        return t = +t, r >>>= 0, e || S(this, t, r, 2, 32767, -32768), this[r] = t >>> 8, this[r + 1] = 255 & t, r + 2;
                    }, r.prototype.writeInt32LE = function(t, r, e) {
                        return t = +t, r >>>= 0, e || S(this, t, r, 4, 2147483647, -2147483648), this[r] = 255 & t, this[r + 1] = t >>> 8, this[r + 2] = t >>> 16, this[r + 3] = t >>> 24, r + 4;
                    }, r.prototype.writeInt32BE = function(t, r, e) {
                        return t = +t, r >>>= 0, e || S(this, t, r, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t, r + 4;
                    }, r.prototype.writeFloatLE = function(t, r, e) {
                        return C(this, t, r, !0, e);
                    }, r.prototype.writeFloatBE = function(t, r, e) {
                        return C(this, t, r, !1, e);
                    }, r.prototype.writeDoubleLE = function(t, r, e) {
                        return x(this, t, r, !0, e);
                    }, r.prototype.writeDoubleBE = function(t, r, e) {
                        return x(this, t, r, !1, e);
                    }, r.prototype.copy = function(t, e, n, i) {
                        if (!r.isBuffer(t)) throw new TypeError("argument should be a Buffer");
                        if (n || (n = 0), i || 0 === i || (i = this.length), e >= t.length && (e = t.length), e || (e = 0), i > 0 && i < n && (i = n), i === n) return 0;
                        if (0 === t.length || 0 === this.length) return 0;
                        if (e < 0) throw new RangeError("targetStart out of bounds");
                        if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
                        if (i < 0) throw new RangeError("sourceEnd out of bounds");
                        i > this.length && (i = this.length), t.length - e < i - n && (i = t.length - e + n);
                        var o = i - n;
                        if (this === t && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(e, n, i);
                        else if (this === t && n < e && e < i) for(var f = o - 1; f >= 0; --f)t[f + e] = this[f + n];
                        else Uint8Array.prototype.set.call(t, this.subarray(n, i), e);
                        return o;
                    }, r.prototype.fill = function(t, e, n, i) {
                        if ("string" == typeof t) {
                            if ("string" == typeof e ? (i = e, e = 0, n = this.length) : "string" == typeof n && (i = n, n = this.length), void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
                            if ("string" == typeof i && !r.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
                            if (1 === t.length) {
                                var o = t.charCodeAt(0);
                                ("utf8" === i && o < 128 || "latin1" === i) && (t = o);
                            }
                        } else "number" == typeof t && (t &= 255);
                        if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
                        if (n <= e) return this;
                        var f;
                        if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t) for(f = e; f < n; ++f)this[f] = t;
                        else {
                            var u = r.isBuffer(t) ? t : r.from(t, i), s = u.length;
                            if (0 === s) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                            for(f = 0; f < n - e; ++f)this[f + e] = u[f % s];
                        }
                        return this;
                    };
                    var M = /[^+\/0-9A-Za-z-_]/g;
                    function N(t) {
                        return t < 16 ? "0" + t.toString(16) : t.toString(16);
                    }
                    function P(t, r) {
                        var e;
                        r = r || 1 / 0;
                        for(var n = t.length, i = null, o = [], f = 0; f < n; ++f){
                            if ((e = t.charCodeAt(f)) > 55295 && e < 57344) {
                                if (!i) {
                                    if (e > 56319) {
                                        (r -= 3) > -1 && o.push(239, 191, 189);
                                        continue;
                                    }
                                    if (f + 1 === n) {
                                        (r -= 3) > -1 && o.push(239, 191, 189);
                                        continue;
                                    }
                                    i = e;
                                    continue;
                                }
                                if (e < 56320) {
                                    (r -= 3) > -1 && o.push(239, 191, 189), i = e;
                                    continue;
                                }
                                e = 65536 + (i - 55296 << 10 | e - 56320);
                            } else i && (r -= 3) > -1 && o.push(239, 191, 189);
                            if (i = null, e < 128) {
                                if ((r -= 1) < 0) break;
                                o.push(e);
                            } else if (e < 2048) {
                                if ((r -= 2) < 0) break;
                                o.push(e >> 6 | 192, 63 & e | 128);
                            } else if (e < 65536) {
                                if ((r -= 3) < 0) break;
                                o.push(e >> 12 | 224, e >> 6 & 63 | 128, 63 & e | 128);
                            } else {
                                if (!(e < 1114112)) throw new Error("Invalid code point");
                                if ((r -= 4) < 0) break;
                                o.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, 63 & e | 128);
                            }
                        }
                        return o;
                    }
                    function k(t) {
                        return n.toByteArray(function(t) {
                            if ((t = (t = t.split("=")[0]).trim().replace(M, "")).length < 2) return "";
                            for(; t.length % 4 != 0;)t += "=";
                            return t;
                        }(t));
                    }
                    function $(t, r, e, n) {
                        for(var i = 0; i < n && !(i + e >= r.length || i >= t.length); ++i)r[i + e] = t[i];
                        return i;
                    }
                    function j(t, r) {
                        return t instanceof r || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === r.name;
                    }
                    function F(t) {
                        return t != t;
                    }
                }).call(this, t("buffer").Buffer);
            },
            {
                "base64-js": 1,
                buffer: 2,
                ieee754: 3
            }
        ],
        3: [
            function(t, r, e) {
                e.read = function(t, r, e, n, i) {
                    var o, f, u = 8 * i - n - 1, s = (1 << u) - 1, h = s >> 1, a = -7, c = e ? i - 1 : 0, p = e ? -1 : 1, l = t[r + c];
                    for(c += p, o = l & (1 << -a) - 1, l >>= -a, a += u; a > 0; o = 256 * o + t[r + c], c += p, a -= 8);
                    for(f = o & (1 << -a) - 1, o >>= -a, a += n; a > 0; f = 256 * f + t[r + c], c += p, a -= 8);
                    if (0 === o) o = 1 - h;
                    else {
                        if (o === s) return f ? NaN : 1 / 0 * (l ? -1 : 1);
                        f += Math.pow(2, n), o -= h;
                    }
                    return (l ? -1 : 1) * f * Math.pow(2, o - n);
                }, e.write = function(t, r, e, n, i, o) {
                    var f, u, s, h = 8 * o - i - 1, a = (1 << h) - 1, c = a >> 1, p = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, l = n ? 0 : o - 1, y = n ? 1 : -1, g = r < 0 || 0 === r && 1 / r < 0 ? 1 : 0;
                    for(r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (u = isNaN(r) ? 1 : 0, f = a) : (f = Math.floor(Math.log(r) / Math.LN2), r * (s = Math.pow(2, -f)) < 1 && (f--, s *= 2), (r += f + c >= 1 ? p / s : p * Math.pow(2, 1 - c)) * s >= 2 && (f++, s /= 2), f + c >= a ? (u = 0, f = a) : f + c >= 1 ? (u = (r * s - 1) * Math.pow(2, i), f += c) : (u = r * Math.pow(2, c - 1) * Math.pow(2, i), f = 0)); i >= 8; t[e + l] = 255 & u, l += y, u /= 256, i -= 8);
                    for(f = f << i | u, h += i; h > 0; t[e + l] = 255 & f, l += y, f /= 256, h -= 8);
                    t[e + l - y] |= 128 * g;
                };
            },
            {}
        ],
        4: [
            function(t, r, e) {
                (function(r) {
                    "use strict";
                    const n = t("base64-js"), i = t("ieee754"), o = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
                    e.Buffer = r, e.SlowBuffer = function(t) {
                        +t != t && (t = 0);
                        return r.alloc(+t);
                    }, e.INSPECT_MAX_BYTES = 50;
                    const f = 2147483647;
                    function u(t) {
                        if (t > f) throw new RangeError('The value "' + t + '" is invalid for option "size"');
                        const e = new Uint8Array(t);
                        return Object.setPrototypeOf(e, r.prototype), e;
                    }
                    function r(t, r, e) {
                        if ("number" == typeof t) {
                            if ("string" == typeof r) throw new TypeError('The "string" argument must be of type string. Received type number');
                            return a(t);
                        }
                        return s(t, r, e);
                    }
                    function s(t, e, n) {
                        if ("string" == typeof t) return function(t, e) {
                            "string" == typeof e && "" !== e || (e = "utf8");
                            if (!r.isEncoding(e)) throw new TypeError("Unknown encoding: " + e);
                            const n = 0 | y(t, e);
                            let i = u(n);
                            const o = i.write(t, e);
                            o !== n && (i = i.slice(0, o));
                            return i;
                        }(t, e);
                        if (ArrayBuffer.isView(t)) return function(t) {
                            if (W(t, Uint8Array)) {
                                const r = new Uint8Array(t);
                                return p(r.buffer, r.byteOffset, r.byteLength);
                            }
                            return c(t);
                        }(t);
                        if (null == t) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
                        if (W(t, ArrayBuffer) || t && W(t.buffer, ArrayBuffer)) return p(t, e, n);
                        if ("undefined" != typeof SharedArrayBuffer && (W(t, SharedArrayBuffer) || t && W(t.buffer, SharedArrayBuffer))) return p(t, e, n);
                        if ("number" == typeof t) throw new TypeError('The "value" argument must not be of type number. Received type number');
                        const i = t.valueOf && t.valueOf();
                        if (null != i && i !== t) return r.from(i, e, n);
                        const o = function(t) {
                            if (r.isBuffer(t)) {
                                const r = 0 | l(t.length), e = u(r);
                                return 0 === e.length ? e : (t.copy(e, 0, 0, r), e);
                            }
                            if (void 0 !== t.length) return "number" != typeof t.length || X(t.length) ? u(0) : c(t);
                            if ("Buffer" === t.type && Array.isArray(t.data)) return c(t.data);
                        }(t);
                        if (o) return o;
                        if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive]) return r.from(t[Symbol.toPrimitive]("string"), e, n);
                        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
                    }
                    function h(t) {
                        if ("number" != typeof t) throw new TypeError('"size" argument must be of type number');
                        if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"');
                    }
                    function a(t) {
                        return h(t), u(t < 0 ? 0 : 0 | l(t));
                    }
                    function c(t) {
                        const r = t.length < 0 ? 0 : 0 | l(t.length), e = u(r);
                        for(let n = 0; n < r; n += 1)e[n] = 255 & t[n];
                        return e;
                    }
                    function p(t, e, n) {
                        if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
                        if (t.byteLength < e + (n || 0)) throw new RangeError('"length" is outside of buffer bounds');
                        let i;
                        return i = void 0 === e && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, e) : new Uint8Array(t, e, n), Object.setPrototypeOf(i, r.prototype), i;
                    }
                    function l(t) {
                        if (t >= f) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + f.toString(16) + " bytes");
                        return 0 | t;
                    }
                    function y(t, e) {
                        if (r.isBuffer(t)) return t.length;
                        if (ArrayBuffer.isView(t) || W(t, ArrayBuffer)) return t.byteLength;
                        if ("string" != typeof t) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
                        const n = t.length, i = arguments.length > 2 && !0 === arguments[2];
                        if (!i && 0 === n) return 0;
                        let o = !1;
                        for(;;)switch(e){
                            case "ascii":
                            case "latin1":
                            case "binary":
                                return n;
                            case "utf8":
                            case "utf-8":
                                return q(t).length;
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return 2 * n;
                            case "hex":
                                return n >>> 1;
                            case "base64":
                                return G(t).length;
                            default:
                                if (o) return i ? -1 : q(t).length;
                                e = ("" + e).toLowerCase(), o = !0;
                        }
                    }
                    function g(t, r, e) {
                        const n = t[r];
                        t[r] = t[e], t[e] = n;
                    }
                    function w(t, e, n, i, o) {
                        if (0 === t.length) return -1;
                        if ("string" == typeof n ? (i = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), X(n = +n) && (n = o ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                            if (o) return -1;
                            n = t.length - 1;
                        } else if (n < 0) {
                            if (!o) return -1;
                            n = 0;
                        }
                        if ("string" == typeof e && (e = r.from(e, i)), r.isBuffer(e)) return 0 === e.length ? -1 : d(t, e, n, i, o);
                        if ("number" == typeof e) return e &= 255, "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : d(t, [
                            e
                        ], n, i, o);
                        throw new TypeError("val must be string, number or Buffer");
                    }
                    function d(t, r, e, n, i) {
                        let o, f = 1, u = t.length, s = r.length;
                        if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                            if (t.length < 2 || r.length < 2) return -1;
                            f = 2, u /= 2, s /= 2, e /= 2;
                        }
                        function h(t, r) {
                            return 1 === f ? t[r] : t.readUInt16BE(r * f);
                        }
                        if (i) {
                            let n = -1;
                            for(o = e; o < u; o++)if (h(t, o) === h(r, -1 === n ? 0 : o - n)) {
                                if (-1 === n && (n = o), o - n + 1 === s) return n * f;
                            } else -1 !== n && (o -= o - n), n = -1;
                        } else for(e + s > u && (e = u - s), o = e; o >= 0; o--){
                            let e = !0;
                            for(let n = 0; n < s; n++)if (h(t, o + n) !== h(r, n)) {
                                e = !1;
                                break;
                            }
                            if (e) return o;
                        }
                        return -1;
                    }
                    function b(t, r, e, n) {
                        e = Number(e) || 0;
                        const i = t.length - e;
                        n ? (n = Number(n)) > i && (n = i) : n = i;
                        const o = r.length;
                        let f;
                        for(n > o / 2 && (n = o / 2), f = 0; f < n; ++f){
                            const n = parseInt(r.substr(2 * f, 2), 16);
                            if (X(n)) return f;
                            t[e + f] = n;
                        }
                        return f;
                    }
                    function m(t, r, e, n) {
                        return V(q(r, t.length - e), t, e, n);
                    }
                    function E(t, r, e, n) {
                        return V(function(t) {
                            const r = [];
                            for(let e = 0; e < t.length; ++e)r.push(255 & t.charCodeAt(e));
                            return r;
                        }(r), t, e, n);
                    }
                    function v(t, r, e, n) {
                        return V(G(r), t, e, n);
                    }
                    function B(t, r, e, n) {
                        return V(function(t, r) {
                            let e, n, i;
                            const o = [];
                            for(let f = 0; f < t.length && !((r -= 2) < 0); ++f)e = t.charCodeAt(f), n = e >> 8, i = e % 256, o.push(i), o.push(n);
                            return o;
                        }(r, t.length - e), t, e, n);
                    }
                    function A(t, r, e) {
                        return 0 === r && e === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(r, e));
                    }
                    function I(t, r, e) {
                        e = Math.min(t.length, e);
                        const n = [];
                        let i = r;
                        for(; i < e;){
                            const r = t[i];
                            let o = null, f = r > 239 ? 4 : r > 223 ? 3 : r > 191 ? 2 : 1;
                            if (i + f <= e) {
                                let e, n, u, s;
                                switch(f){
                                    case 1:
                                        r < 128 && (o = r);
                                        break;
                                    case 2:
                                        128 == (192 & (e = t[i + 1])) && (s = (31 & r) << 6 | 63 & e) > 127 && (o = s);
                                        break;
                                    case 3:
                                        e = t[i + 1], n = t[i + 2], 128 == (192 & e) && 128 == (192 & n) && (s = (15 & r) << 12 | (63 & e) << 6 | 63 & n) > 2047 && (s < 55296 || s > 57343) && (o = s);
                                        break;
                                    case 4:
                                        e = t[i + 1], n = t[i + 2], u = t[i + 3], 128 == (192 & e) && 128 == (192 & n) && 128 == (192 & u) && (s = (15 & r) << 18 | (63 & e) << 12 | (63 & n) << 6 | 63 & u) > 65535 && s < 1114112 && (o = s);
                                }
                            }
                            null === o ? (o = 65533, f = 1) : o > 65535 && (o -= 65536, n.push(o >>> 10 & 1023 | 55296), o = 56320 | 1023 & o), n.push(o), i += f;
                        }
                        return function(t) {
                            const r = t.length;
                            if (r <= U) return String.fromCharCode.apply(String, t);
                            let e = "", n = 0;
                            for(; n < r;)e += String.fromCharCode.apply(String, t.slice(n, n += U));
                            return e;
                        }(n);
                    }
                    e.kMaxLength = f, r.TYPED_ARRAY_SUPPORT = function() {
                        try {
                            const t = new Uint8Array(1), r = {
                                foo: function() {
                                    return 42;
                                }
                            };
                            return Object.setPrototypeOf(r, Uint8Array.prototype), Object.setPrototypeOf(t, r), 42 === t.foo();
                        } catch (t) {
                            return !1;
                        }
                    }(), r.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(r.prototype, "parent", {
                        enumerable: !0,
                        get: function() {
                            if (r.isBuffer(this)) return this.buffer;
                        }
                    }), Object.defineProperty(r.prototype, "offset", {
                        enumerable: !0,
                        get: function() {
                            if (r.isBuffer(this)) return this.byteOffset;
                        }
                    }), r.poolSize = 8192, r.from = function(t, r, e) {
                        return s(t, r, e);
                    }, Object.setPrototypeOf(r.prototype, Uint8Array.prototype), Object.setPrototypeOf(r, Uint8Array), r.alloc = function(t, r, e) {
                        return function(t, r, e) {
                            return h(t), t <= 0 ? u(t) : void 0 !== r ? "string" == typeof e ? u(t).fill(r, e) : u(t).fill(r) : u(t);
                        }(t, r, e);
                    }, r.allocUnsafe = function(t) {
                        return a(t);
                    }, r.allocUnsafeSlow = function(t) {
                        return a(t);
                    }, r.isBuffer = function(t) {
                        return null != t && !0 === t._isBuffer && t !== r.prototype;
                    }, r.compare = function(t, e) {
                        if (W(t, Uint8Array) && (t = r.from(t, t.offset, t.byteLength)), W(e, Uint8Array) && (e = r.from(e, e.offset, e.byteLength)), !r.isBuffer(t) || !r.isBuffer(e)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                        if (t === e) return 0;
                        let n = t.length, i = e.length;
                        for(let r = 0, o = Math.min(n, i); r < o; ++r)if (t[r] !== e[r]) {
                            n = t[r], i = e[r];
                            break;
                        }
                        return n < i ? -1 : i < n ? 1 : 0;
                    }, r.isEncoding = function(t) {
                        switch(String(t).toLowerCase()){
                            case "hex":
                            case "utf8":
                            case "utf-8":
                            case "ascii":
                            case "latin1":
                            case "binary":
                            case "base64":
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return !0;
                            default:
                                return !1;
                        }
                    }, r.concat = function(t, e) {
                        if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                        if (0 === t.length) return r.alloc(0);
                        let n;
                        if (void 0 === e) for(e = 0, n = 0; n < t.length; ++n)e += t[n].length;
                        const i = r.allocUnsafe(e);
                        let o = 0;
                        for(n = 0; n < t.length; ++n){
                            let e = t[n];
                            if (W(e, Uint8Array)) o + e.length > i.length ? (r.isBuffer(e) || (e = r.from(e)), e.copy(i, o)) : Uint8Array.prototype.set.call(i, e, o);
                            else {
                                if (!r.isBuffer(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                                e.copy(i, o);
                            }
                            o += e.length;
                        }
                        return i;
                    }, r.byteLength = y, r.prototype._isBuffer = !0, r.prototype.swap16 = function() {
                        const t = this.length;
                        if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                        for(let r = 0; r < t; r += 2)g(this, r, r + 1);
                        return this;
                    }, r.prototype.swap32 = function() {
                        const t = this.length;
                        if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                        for(let r = 0; r < t; r += 4)g(this, r, r + 3), g(this, r + 1, r + 2);
                        return this;
                    }, r.prototype.swap64 = function() {
                        const t = this.length;
                        if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                        for(let r = 0; r < t; r += 8)g(this, r, r + 7), g(this, r + 1, r + 6), g(this, r + 2, r + 5), g(this, r + 3, r + 4);
                        return this;
                    }, r.prototype.toString = function() {
                        const t = this.length;
                        return 0 === t ? "" : 0 === arguments.length ? I(this, 0, t) : (function(t, r, e) {
                            let n = !1;
                            if ((void 0 === r || r < 0) && (r = 0), r > this.length) return "";
                            if ((void 0 === e || e > this.length) && (e = this.length), e <= 0) return "";
                            if ((e >>>= 0) <= (r >>>= 0)) return "";
                            for(t || (t = "utf8");;)switch(t){
                                case "hex":
                                    return _(this, r, e);
                                case "utf8":
                                case "utf-8":
                                    return I(this, r, e);
                                case "ascii":
                                    return R(this, r, e);
                                case "latin1":
                                case "binary":
                                    return T(this, r, e);
                                case "base64":
                                    return A(this, r, e);
                                case "ucs2":
                                case "ucs-2":
                                case "utf16le":
                                case "utf-16le":
                                    return L(this, r, e);
                                default:
                                    if (n) throw new TypeError("Unknown encoding: " + t);
                                    t = (t + "").toLowerCase(), n = !0;
                            }
                        }).apply(this, arguments);
                    }, r.prototype.toLocaleString = r.prototype.toString, r.prototype.equals = function(t) {
                        if (!r.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                        return this === t || 0 === r.compare(this, t);
                    }, r.prototype.inspect = function() {
                        let t = "";
                        const r = e.INSPECT_MAX_BYTES;
                        return t = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(), this.length > r && (t += " ... "), "<Buffer " + t + ">";
                    }, o && (r.prototype[o] = r.prototype.inspect), r.prototype.compare = function(t, e, n, i, o) {
                        if (W(t, Uint8Array) && (t = r.from(t, t.offset, t.byteLength)), !r.isBuffer(t)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
                        if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === i && (i = 0), void 0 === o && (o = this.length), e < 0 || n > t.length || i < 0 || o > this.length) throw new RangeError("out of range index");
                        if (i >= o && e >= n) return 0;
                        if (i >= o) return -1;
                        if (e >= n) return 1;
                        if (this === t) return 0;
                        let f = (o >>>= 0) - (i >>>= 0), u = (n >>>= 0) - (e >>>= 0);
                        const s = Math.min(f, u), h = this.slice(i, o), a = t.slice(e, n);
                        for(let t = 0; t < s; ++t)if (h[t] !== a[t]) {
                            f = h[t], u = a[t];
                            break;
                        }
                        return f < u ? -1 : u < f ? 1 : 0;
                    }, r.prototype.includes = function(t, r, e) {
                        return -1 !== this.indexOf(t, r, e);
                    }, r.prototype.indexOf = function(t, r, e) {
                        return w(this, t, r, e, !0);
                    }, r.prototype.lastIndexOf = function(t, r, e) {
                        return w(this, t, r, e, !1);
                    }, r.prototype.write = function(t, r, e, n) {
                        if (void 0 === r) n = "utf8", e = this.length, r = 0;
                        else if (void 0 === e && "string" == typeof r) n = r, e = this.length, r = 0;
                        else {
                            if (!isFinite(r)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                            r >>>= 0, isFinite(e) ? (e >>>= 0, void 0 === n && (n = "utf8")) : (n = e, e = void 0);
                        }
                        const i = this.length - r;
                        if ((void 0 === e || e > i) && (e = i), t.length > 0 && (e < 0 || r < 0) || r > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                        n || (n = "utf8");
                        let o = !1;
                        for(;;)switch(n){
                            case "hex":
                                return b(this, t, r, e);
                            case "utf8":
                            case "utf-8":
                                return m(this, t, r, e);
                            case "ascii":
                            case "latin1":
                            case "binary":
                                return E(this, t, r, e);
                            case "base64":
                                return v(this, t, r, e);
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return B(this, t, r, e);
                            default:
                                if (o) throw new TypeError("Unknown encoding: " + n);
                                n = ("" + n).toLowerCase(), o = !0;
                        }
                    }, r.prototype.toJSON = function() {
                        return {
                            type: "Buffer",
                            data: Array.prototype.slice.call(this._arr || this, 0)
                        };
                    };
                    const U = 4096;
                    function R(t, r, e) {
                        let n = "";
                        e = Math.min(t.length, e);
                        for(let i = r; i < e; ++i)n += String.fromCharCode(127 & t[i]);
                        return n;
                    }
                    function T(t, r, e) {
                        let n = "";
                        e = Math.min(t.length, e);
                        for(let i = r; i < e; ++i)n += String.fromCharCode(t[i]);
                        return n;
                    }
                    function _(t, r, e) {
                        const n = t.length;
                        (!r || r < 0) && (r = 0), (!e || e < 0 || e > n) && (e = n);
                        let i = "";
                        for(let n = r; n < e; ++n)i += J[t[n]];
                        return i;
                    }
                    function L(t, r, e) {
                        const n = t.slice(r, e);
                        let i = "";
                        for(let t = 0; t < n.length - 1; t += 2)i += String.fromCharCode(n[t] + 256 * n[t + 1]);
                        return i;
                    }
                    function S(t, r, e) {
                        if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                        if (t + r > e) throw new RangeError("Trying to access beyond buffer length");
                    }
                    function O(t, e, n, i, o, f) {
                        if (!r.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                        if (e > o || e < f) throw new RangeError('"value" argument is out of bounds');
                        if (n + i > t.length) throw new RangeError("Index out of range");
                    }
                    function C(t, r, e, n, i) {
                        F(r, n, i, t, e, 7);
                        let o = Number(r & BigInt(4294967295));
                        t[e++] = o, o >>= 8, t[e++] = o, o >>= 8, t[e++] = o, o >>= 8, t[e++] = o;
                        let f = Number(r >> BigInt(32) & BigInt(4294967295));
                        return t[e++] = f, f >>= 8, t[e++] = f, f >>= 8, t[e++] = f, f >>= 8, t[e++] = f, e;
                    }
                    function x(t, r, e, n, i) {
                        F(r, n, i, t, e, 7);
                        let o = Number(r & BigInt(4294967295));
                        t[e + 7] = o, o >>= 8, t[e + 6] = o, o >>= 8, t[e + 5] = o, o >>= 8, t[e + 4] = o;
                        let f = Number(r >> BigInt(32) & BigInt(4294967295));
                        return t[e + 3] = f, f >>= 8, t[e + 2] = f, f >>= 8, t[e + 1] = f, f >>= 8, t[e] = f, e + 8;
                    }
                    function M(t, r, e, n, i, o) {
                        if (e + n > t.length) throw new RangeError("Index out of range");
                        if (e < 0) throw new RangeError("Index out of range");
                    }
                    function N(t, r, e, n, o) {
                        return r = +r, e >>>= 0, o || M(t, 0, e, 4), i.write(t, r, e, n, 23, 4), e + 4;
                    }
                    function P(t, r, e, n, o) {
                        return r = +r, e >>>= 0, o || M(t, 0, e, 8), i.write(t, r, e, n, 52, 8), e + 8;
                    }
                    r.prototype.slice = function(t, e) {
                        const n = this.length;
                        (t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), (e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), e < t && (e = t);
                        const i = this.subarray(t, e);
                        return Object.setPrototypeOf(i, r.prototype), i;
                    }, r.prototype.readUintLE = r.prototype.readUIntLE = function(t, r, e) {
                        t >>>= 0, r >>>= 0, e || S(t, r, this.length);
                        let n = this[t], i = 1, o = 0;
                        for(; ++o < r && (i *= 256);)n += this[t + o] * i;
                        return n;
                    }, r.prototype.readUintBE = r.prototype.readUIntBE = function(t, r, e) {
                        t >>>= 0, r >>>= 0, e || S(t, r, this.length);
                        let n = this[t + --r], i = 1;
                        for(; r > 0 && (i *= 256);)n += this[t + --r] * i;
                        return n;
                    }, r.prototype.readUint8 = r.prototype.readUInt8 = function(t, r) {
                        return t >>>= 0, r || S(t, 1, this.length), this[t];
                    }, r.prototype.readUint16LE = r.prototype.readUInt16LE = function(t, r) {
                        return t >>>= 0, r || S(t, 2, this.length), this[t] | this[t + 1] << 8;
                    }, r.prototype.readUint16BE = r.prototype.readUInt16BE = function(t, r) {
                        return t >>>= 0, r || S(t, 2, this.length), this[t] << 8 | this[t + 1];
                    }, r.prototype.readUint32LE = r.prototype.readUInt32LE = function(t, r) {
                        return t >>>= 0, r || S(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
                    }, r.prototype.readUint32BE = r.prototype.readUInt32BE = function(t, r) {
                        return t >>>= 0, r || S(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
                    }, r.prototype.readBigUInt64LE = Z(function(t) {
                        z(t >>>= 0, "offset");
                        const r = this[t], e = this[t + 7];
                        void 0 !== r && void 0 !== e || D(t, this.length - 8);
                        const n = r + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24, i = this[++t] + 256 * this[++t] + 65536 * this[++t] + e * 2 ** 24;
                        return BigInt(n) + (BigInt(i) << BigInt(32));
                    }), r.prototype.readBigUInt64BE = Z(function(t) {
                        z(t >>>= 0, "offset");
                        const r = this[t], e = this[t + 7];
                        void 0 !== r && void 0 !== e || D(t, this.length - 8);
                        const n = r * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + this[++t], i = this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + e;
                        return (BigInt(n) << BigInt(32)) + BigInt(i);
                    }), r.prototype.readIntLE = function(t, r, e) {
                        t >>>= 0, r >>>= 0, e || S(t, r, this.length);
                        let n = this[t], i = 1, o = 0;
                        for(; ++o < r && (i *= 256);)n += this[t + o] * i;
                        return n >= (i *= 128) && (n -= Math.pow(2, 8 * r)), n;
                    }, r.prototype.readIntBE = function(t, r, e) {
                        t >>>= 0, r >>>= 0, e || S(t, r, this.length);
                        let n = r, i = 1, o = this[t + --n];
                        for(; n > 0 && (i *= 256);)o += this[t + --n] * i;
                        return o >= (i *= 128) && (o -= Math.pow(2, 8 * r)), o;
                    }, r.prototype.readInt8 = function(t, r) {
                        return t >>>= 0, r || S(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
                    }, r.prototype.readInt16LE = function(t, r) {
                        t >>>= 0, r || S(t, 2, this.length);
                        const e = this[t] | this[t + 1] << 8;
                        return 32768 & e ? 4294901760 | e : e;
                    }, r.prototype.readInt16BE = function(t, r) {
                        t >>>= 0, r || S(t, 2, this.length);
                        const e = this[t + 1] | this[t] << 8;
                        return 32768 & e ? 4294901760 | e : e;
                    }, r.prototype.readInt32LE = function(t, r) {
                        return t >>>= 0, r || S(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
                    }, r.prototype.readInt32BE = function(t, r) {
                        return t >>>= 0, r || S(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
                    }, r.prototype.readBigInt64LE = Z(function(t) {
                        z(t >>>= 0, "offset");
                        const r = this[t], e = this[t + 7];
                        void 0 !== r && void 0 !== e || D(t, this.length - 8);
                        const n = this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (e << 24);
                        return (BigInt(n) << BigInt(32)) + BigInt(r + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24);
                    }), r.prototype.readBigInt64BE = Z(function(t) {
                        z(t >>>= 0, "offset");
                        const r = this[t], e = this[t + 7];
                        void 0 !== r && void 0 !== e || D(t, this.length - 8);
                        const n = (r << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t];
                        return (BigInt(n) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + e);
                    }), r.prototype.readFloatLE = function(t, r) {
                        return t >>>= 0, r || S(t, 4, this.length), i.read(this, t, !0, 23, 4);
                    }, r.prototype.readFloatBE = function(t, r) {
                        return t >>>= 0, r || S(t, 4, this.length), i.read(this, t, !1, 23, 4);
                    }, r.prototype.readDoubleLE = function(t, r) {
                        return t >>>= 0, r || S(t, 8, this.length), i.read(this, t, !0, 52, 8);
                    }, r.prototype.readDoubleBE = function(t, r) {
                        return t >>>= 0, r || S(t, 8, this.length), i.read(this, t, !1, 52, 8);
                    }, r.prototype.writeUintLE = r.prototype.writeUIntLE = function(t, r, e, n) {
                        if (t = +t, r >>>= 0, e >>>= 0, !n) O(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
                        let i = 1, o = 0;
                        for(this[r] = 255 & t; ++o < e && (i *= 256);)this[r + o] = t / i & 255;
                        return r + e;
                    }, r.prototype.writeUintBE = r.prototype.writeUIntBE = function(t, r, e, n) {
                        if (t = +t, r >>>= 0, e >>>= 0, !n) O(this, t, r, e, Math.pow(2, 8 * e) - 1, 0);
                        let i = e - 1, o = 1;
                        for(this[r + i] = 255 & t; --i >= 0 && (o *= 256);)this[r + i] = t / o & 255;
                        return r + e;
                    }, r.prototype.writeUint8 = r.prototype.writeUInt8 = function(t, r, e) {
                        return t = +t, r >>>= 0, e || O(this, t, r, 1, 255, 0), this[r] = 255 & t, r + 1;
                    }, r.prototype.writeUint16LE = r.prototype.writeUInt16LE = function(t, r, e) {
                        return t = +t, r >>>= 0, e || O(this, t, r, 2, 65535, 0), this[r] = 255 & t, this[r + 1] = t >>> 8, r + 2;
                    }, r.prototype.writeUint16BE = r.prototype.writeUInt16BE = function(t, r, e) {
                        return t = +t, r >>>= 0, e || O(this, t, r, 2, 65535, 0), this[r] = t >>> 8, this[r + 1] = 255 & t, r + 2;
                    }, r.prototype.writeUint32LE = r.prototype.writeUInt32LE = function(t, r, e) {
                        return t = +t, r >>>= 0, e || O(this, t, r, 4, 4294967295, 0), this[r + 3] = t >>> 24, this[r + 2] = t >>> 16, this[r + 1] = t >>> 8, this[r] = 255 & t, r + 4;
                    }, r.prototype.writeUint32BE = r.prototype.writeUInt32BE = function(t, r, e) {
                        return t = +t, r >>>= 0, e || O(this, t, r, 4, 4294967295, 0), this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t, r + 4;
                    }, r.prototype.writeBigUInt64LE = Z(function(t, r = 0) {
                        return C(this, t, r, BigInt(0), BigInt("0xffffffffffffffff"));
                    }), r.prototype.writeBigUInt64BE = Z(function(t, r = 0) {
                        return x(this, t, r, BigInt(0), BigInt("0xffffffffffffffff"));
                    }), r.prototype.writeIntLE = function(t, r, e, n) {
                        if (t = +t, r >>>= 0, !n) {
                            const n = Math.pow(2, 8 * e - 1);
                            O(this, t, r, e, n - 1, -n);
                        }
                        let i = 0, o = 1, f = 0;
                        for(this[r] = 255 & t; ++i < e && (o *= 256);)t < 0 && 0 === f && 0 !== this[r + i - 1] && (f = 1), this[r + i] = (t / o >> 0) - f & 255;
                        return r + e;
                    }, r.prototype.writeIntBE = function(t, r, e, n) {
                        if (t = +t, r >>>= 0, !n) {
                            const n = Math.pow(2, 8 * e - 1);
                            O(this, t, r, e, n - 1, -n);
                        }
                        let i = e - 1, o = 1, f = 0;
                        for(this[r + i] = 255 & t; --i >= 0 && (o *= 256);)t < 0 && 0 === f && 0 !== this[r + i + 1] && (f = 1), this[r + i] = (t / o >> 0) - f & 255;
                        return r + e;
                    }, r.prototype.writeInt8 = function(t, r, e) {
                        return t = +t, r >>>= 0, e || O(this, t, r, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[r] = 255 & t, r + 1;
                    }, r.prototype.writeInt16LE = function(t, r, e) {
                        return t = +t, r >>>= 0, e || O(this, t, r, 2, 32767, -32768), this[r] = 255 & t, this[r + 1] = t >>> 8, r + 2;
                    }, r.prototype.writeInt16BE = function(t, r, e) {
                        return t = +t, r >>>= 0, e || O(this, t, r, 2, 32767, -32768), this[r] = t >>> 8, this[r + 1] = 255 & t, r + 2;
                    }, r.prototype.writeInt32LE = function(t, r, e) {
                        return t = +t, r >>>= 0, e || O(this, t, r, 4, 2147483647, -2147483648), this[r] = 255 & t, this[r + 1] = t >>> 8, this[r + 2] = t >>> 16, this[r + 3] = t >>> 24, r + 4;
                    }, r.prototype.writeInt32BE = function(t, r, e) {
                        return t = +t, r >>>= 0, e || O(this, t, r, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[r] = t >>> 24, this[r + 1] = t >>> 16, this[r + 2] = t >>> 8, this[r + 3] = 255 & t, r + 4;
                    }, r.prototype.writeBigInt64LE = Z(function(t, r = 0) {
                        return C(this, t, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
                    }), r.prototype.writeBigInt64BE = Z(function(t, r = 0) {
                        return x(this, t, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
                    }), r.prototype.writeFloatLE = function(t, r, e) {
                        return N(this, t, r, !0, e);
                    }, r.prototype.writeFloatBE = function(t, r, e) {
                        return N(this, t, r, !1, e);
                    }, r.prototype.writeDoubleLE = function(t, r, e) {
                        return P(this, t, r, !0, e);
                    }, r.prototype.writeDoubleBE = function(t, r, e) {
                        return P(this, t, r, !1, e);
                    }, r.prototype.copy = function(t, e, n, i) {
                        if (!r.isBuffer(t)) throw new TypeError("argument should be a Buffer");
                        if (n || (n = 0), i || 0 === i || (i = this.length), e >= t.length && (e = t.length), e || (e = 0), i > 0 && i < n && (i = n), i === n) return 0;
                        if (0 === t.length || 0 === this.length) return 0;
                        if (e < 0) throw new RangeError("targetStart out of bounds");
                        if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
                        if (i < 0) throw new RangeError("sourceEnd out of bounds");
                        i > this.length && (i = this.length), t.length - e < i - n && (i = t.length - e + n);
                        const o = i - n;
                        return this === t && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(e, n, i) : Uint8Array.prototype.set.call(t, this.subarray(n, i), e), o;
                    }, r.prototype.fill = function(t, e, n, i) {
                        if ("string" == typeof t) {
                            if ("string" == typeof e ? (i = e, e = 0, n = this.length) : "string" == typeof n && (i = n, n = this.length), void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
                            if ("string" == typeof i && !r.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
                            if (1 === t.length) {
                                const r = t.charCodeAt(0);
                                ("utf8" === i && r < 128 || "latin1" === i) && (t = r);
                            }
                        } else "number" == typeof t ? t &= 255 : "boolean" == typeof t && (t = Number(t));
                        if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
                        if (n <= e) return this;
                        let o;
                        if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t) for(o = e; o < n; ++o)this[o] = t;
                        else {
                            const f = r.isBuffer(t) ? t : r.from(t, i), u = f.length;
                            if (0 === u) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                            for(o = 0; o < n - e; ++o)this[o + e] = f[o % u];
                        }
                        return this;
                    };
                    const k = {};
                    function $(t, r, e) {
                        k[t] = class extends e {
                            constructor(){
                                super(), Object.defineProperty(this, "message", {
                                    value: r.apply(this, arguments),
                                    writable: !0,
                                    configurable: !0
                                }), this.name = `${this.name} [${t}]`, this.stack, delete this.name;
                            }
                            get code() {
                                return t;
                            }
                            set code(t) {
                                Object.defineProperty(this, "code", {
                                    configurable: !0,
                                    enumerable: !0,
                                    value: t,
                                    writable: !0
                                });
                            }
                            toString() {
                                return `${this.name} [${t}]: ${this.message}`;
                            }
                        };
                    }
                    function j(t) {
                        let r = "", e = t.length;
                        const n = "-" === t[0] ? 1 : 0;
                        for(; e >= n + 4; e -= 3)r = `_${t.slice(e - 3, e)}${r}`;
                        return `${t.slice(0, e)}${r}`;
                    }
                    function F(t, r, e, n, i, o) {
                        if (t > e || t < r) {
                            const n = "bigint" == typeof r ? "n" : "";
                            let i;
                            throw i = o > 3 ? 0 === r || r === BigInt(0) ? `>= 0${n} and < 2${n} ** ${8 * (o + 1)}${n}` : `>= -(2${n} ** ${8 * (o + 1) - 1}${n}) and < 2 ** ` + `${8 * (o + 1) - 1}${n}` : `>= ${r}${n} and <= ${e}${n}`, new k.ERR_OUT_OF_RANGE("value", i, t);
                        }
                        !function(t, r, e) {
                            z(r, "offset"), void 0 !== t[r] && void 0 !== t[r + e] || D(r, t.length - (e + 1));
                        }(n, i, o);
                    }
                    function z(t, r) {
                        if ("number" != typeof t) throw new k.ERR_INVALID_ARG_TYPE(r, "number", t);
                    }
                    function D(t, r, e) {
                        if (Math.floor(t) !== t) throw z(t, e), new k.ERR_OUT_OF_RANGE(e || "offset", "an integer", t);
                        if (r < 0) throw new k.ERR_BUFFER_OUT_OF_BOUNDS;
                        throw new k.ERR_OUT_OF_RANGE(e || "offset", `>= ${e ? 1 : 0} and <= ${r}`, t);
                    }
                    $("ERR_BUFFER_OUT_OF_BOUNDS", function(t) {
                        return t ? `${t} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
                    }, RangeError), $("ERR_INVALID_ARG_TYPE", function(t, r) {
                        return `The "${t}" argument must be of type number. Received type ${typeof r}`;
                    }, TypeError), $("ERR_OUT_OF_RANGE", function(t, r, e) {
                        let n = `The value of "${t}" is out of range.`, i = e;
                        return Number.isInteger(e) && Math.abs(e) > 2 ** 32 ? i = j(String(e)) : "bigint" == typeof e && (i = String(e), (e > BigInt(2) ** BigInt(32) || e < -(BigInt(2) ** BigInt(32))) && (i = j(i)), i += "n"), n += ` It must be ${r}. Received ${i}`;
                    }, RangeError);
                    const Y = /[^+\/0-9A-Za-z-_]/g;
                    function q(t, r) {
                        let e;
                        r = r || 1 / 0;
                        const n = t.length;
                        let i = null;
                        const o = [];
                        for(let f = 0; f < n; ++f){
                            if ((e = t.charCodeAt(f)) > 55295 && e < 57344) {
                                if (!i) {
                                    if (e > 56319) {
                                        (r -= 3) > -1 && o.push(239, 191, 189);
                                        continue;
                                    }
                                    if (f + 1 === n) {
                                        (r -= 3) > -1 && o.push(239, 191, 189);
                                        continue;
                                    }
                                    i = e;
                                    continue;
                                }
                                if (e < 56320) {
                                    (r -= 3) > -1 && o.push(239, 191, 189), i = e;
                                    continue;
                                }
                                e = 65536 + (i - 55296 << 10 | e - 56320);
                            } else i && (r -= 3) > -1 && o.push(239, 191, 189);
                            if (i = null, e < 128) {
                                if ((r -= 1) < 0) break;
                                o.push(e);
                            } else if (e < 2048) {
                                if ((r -= 2) < 0) break;
                                o.push(e >> 6 | 192, 63 & e | 128);
                            } else if (e < 65536) {
                                if ((r -= 3) < 0) break;
                                o.push(e >> 12 | 224, e >> 6 & 63 | 128, 63 & e | 128);
                            } else {
                                if (!(e < 1114112)) throw new Error("Invalid code point");
                                if ((r -= 4) < 0) break;
                                o.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, 63 & e | 128);
                            }
                        }
                        return o;
                    }
                    function G(t) {
                        return n.toByteArray(function(t) {
                            if ((t = (t = t.split("=")[0]).trim().replace(Y, "")).length < 2) return "";
                            for(; t.length % 4 != 0;)t += "=";
                            return t;
                        }(t));
                    }
                    function V(t, r, e, n) {
                        let i;
                        for(i = 0; i < n && !(i + e >= r.length || i >= t.length); ++i)r[i + e] = t[i];
                        return i;
                    }
                    function W(t, r) {
                        return t instanceof r || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === r.name;
                    }
                    function X(t) {
                        return t != t;
                    }
                    const J = function() {
                        const t = new Array(256);
                        for(let r = 0; r < 16; ++r){
                            const e = 16 * r;
                            for(let n = 0; n < 16; ++n)t[e + n] = "0123456789abcdef"[r] + "0123456789abcdef"[n];
                        }
                        return t;
                    }();
                    function Z(t) {
                        return "undefined" == typeof BigInt ? H : t;
                    }
                    function H() {
                        throw new Error("BigInt not supported");
                    }
                }).call(this, t("buffer").Buffer);
            },
            {
                "base64-js": 5,
                buffer: 2,
                ieee754: 6
            }
        ],
        5: [
            function(t, r, e) {
                "use strict";
                e.byteLength = function(t) {
                    var r = h(t), e = r[0], n = r[1];
                    return 3 * (e + n) / 4 - n;
                }, e.toByteArray = function(t) {
                    var r, e, n = h(t), f = n[0], u = n[1], s = new o(function(t, r, e) {
                        return 3 * (r + e) / 4 - e;
                    }(0, f, u)), a = 0, c = u > 0 ? f - 4 : f;
                    for(e = 0; e < c; e += 4)r = i[t.charCodeAt(e)] << 18 | i[t.charCodeAt(e + 1)] << 12 | i[t.charCodeAt(e + 2)] << 6 | i[t.charCodeAt(e + 3)], s[a++] = r >> 16 & 255, s[a++] = r >> 8 & 255, s[a++] = 255 & r;
                    2 === u && (r = i[t.charCodeAt(e)] << 2 | i[t.charCodeAt(e + 1)] >> 4, s[a++] = 255 & r);
                    1 === u && (r = i[t.charCodeAt(e)] << 10 | i[t.charCodeAt(e + 1)] << 4 | i[t.charCodeAt(e + 2)] >> 2, s[a++] = r >> 8 & 255, s[a++] = 255 & r);
                    return s;
                }, e.fromByteArray = function(t) {
                    for(var r, e = t.length, i = e % 3, o = [], f = 0, u = e - i; f < u; f += 16383)o.push(a(t, f, f + 16383 > u ? u : f + 16383));
                    1 === i ? (r = t[e - 1], o.push(n[r >> 2] + n[r << 4 & 63] + "==")) : 2 === i && (r = (t[e - 2] << 8) + t[e - 1], o.push(n[r >> 10] + n[r >> 4 & 63] + n[r << 2 & 63] + "="));
                    return o.join("");
                };
                for(var n = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u = 0, s = f.length; u < s; ++u)n[u] = f[u], i[f.charCodeAt(u)] = u;
                function h(t) {
                    var r = t.length;
                    if (r % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                    var e = t.indexOf("=");
                    return -1 === e && (e = r), [
                        e,
                        e === r ? 0 : 4 - e % 4
                    ];
                }
                function a(t, r, e) {
                    for(var i, o, f = [], u = r; u < e; u += 3)i = (t[u] << 16 & 16711680) + (t[u + 1] << 8 & 65280) + (255 & t[u + 2]), f.push(n[(o = i) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o]);
                    return f.join("");
                }
                i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63;
            },
            {}
        ],
        6: [
            function(t, r, e) {
                e.read = function(t, r, e, n, i) {
                    var o, f, u = 8 * i - n - 1, s = (1 << u) - 1, h = s >> 1, a = -7, c = e ? i - 1 : 0, p = e ? -1 : 1, l = t[r + c];
                    for(c += p, o = l & (1 << -a) - 1, l >>= -a, a += u; a > 0; o = 256 * o + t[r + c], c += p, a -= 8);
                    for(f = o & (1 << -a) - 1, o >>= -a, a += n; a > 0; f = 256 * f + t[r + c], c += p, a -= 8);
                    if (0 === o) o = 1 - h;
                    else {
                        if (o === s) return f ? NaN : 1 / 0 * (l ? -1 : 1);
                        f += Math.pow(2, n), o -= h;
                    }
                    return (l ? -1 : 1) * f * Math.pow(2, o - n);
                }, e.write = function(t, r, e, n, i, o) {
                    var f, u, s, h = 8 * o - i - 1, a = (1 << h) - 1, c = a >> 1, p = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, l = n ? 0 : o - 1, y = n ? 1 : -1, g = r < 0 || 0 === r && 1 / r < 0 ? 1 : 0;
                    for(r = Math.abs(r), isNaN(r) || r === 1 / 0 ? (u = isNaN(r) ? 1 : 0, f = a) : (f = Math.floor(Math.log(r) / Math.LN2), r * (s = Math.pow(2, -f)) < 1 && (f--, s *= 2), (r += f + c >= 1 ? p / s : p * Math.pow(2, 1 - c)) * s >= 2 && (f++, s /= 2), f + c >= a ? (u = 0, f = a) : f + c >= 1 ? (u = (r * s - 1) * Math.pow(2, i), f += c) : (u = r * Math.pow(2, c - 1) * Math.pow(2, i), f = 0)); i >= 8; t[e + l] = 255 & u, l += y, u /= 256, i -= 8);
                    for(f = f << i | u, h += i; h > 0; t[e + l] = 255 & f, l += y, f /= 256, h -= 8);
                    t[e + l - y] |= 128 * g;
                };
            },
            {}
        ]
    }, {}, [
        4
    ])(4);
});


let $3132870559d60e53$var$virtualGlobalObject = {};
let $3132870559d60e53$var$env = "browser";
function $3132870559d60e53$var$setupGlobalObject() {
    if (typeof window !== "undefined") {
        window.globalObject = window;
        $3132870559d60e53$var$env = "browser";
        return window; // browser
    }
    if (typeof self !== "undefined") {
        self.globalObject = self;
        self.import = importScripts;
        $3132870559d60e53$var$env = "web-worker";
        return self; // web worker
    }
    if (typeof $parcel$global !== "undefined") {
        $parcel$global.globalObject = $parcel$global;
        $3132870559d60e53$var$env = "nodejs. Not sure why you need virtual fs in node!";
        return $parcel$global; //nodejs
    }
    return $3132870559d60e53$var$virtualGlobalObject;
}
$3132870559d60e53$var$setupGlobalObject();
const $3132870559d60e53$var$urlParams = new URLSearchParams(location.search);
globalObject.Filer = $8adf1cfaed2eb5b1$exports;
globalObject.buffer = $546651d3547337d7$exports;
globalObject.virtualfs = {
    urlParams: $3132870559d60e53$var$urlParams,
    debugMode: globalObject.debugMode || $3132870559d60e53$var$urlParams.get("debug") === "true",
    env: $3132870559d60e53$var$env
};
console.log(`virtual fs started in debugMode:${virtualfs.debugMode} on environment: ${virtualfs.env}`);
var $e3f139c5065f0041$exports = {};
/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see https://opensource.org/licenses/AGPL-3.0.
 *
 */ // jshint ignore: start
/*global globalObject*/ /*eslint no-console: 0*/ /*eslint strict: ["error", "global"]*/ var $07c3e2276d973f13$exports = {};
// shim for using process in browser
var $07c3e2276d973f13$var$process = $07c3e2276d973f13$exports = {};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var $07c3e2276d973f13$var$cachedSetTimeout;
var $07c3e2276d973f13$var$cachedClearTimeout;
function $07c3e2276d973f13$var$defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
}
function $07c3e2276d973f13$var$defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
}
(function() {
    try {
        if (typeof setTimeout === "function") $07c3e2276d973f13$var$cachedSetTimeout = setTimeout;
        else $07c3e2276d973f13$var$cachedSetTimeout = $07c3e2276d973f13$var$defaultSetTimout;
    } catch (e) {
        $07c3e2276d973f13$var$cachedSetTimeout = $07c3e2276d973f13$var$defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === "function") $07c3e2276d973f13$var$cachedClearTimeout = clearTimeout;
        else $07c3e2276d973f13$var$cachedClearTimeout = $07c3e2276d973f13$var$defaultClearTimeout;
    } catch (e) {
        $07c3e2276d973f13$var$cachedClearTimeout = $07c3e2276d973f13$var$defaultClearTimeout;
    }
})();
function $07c3e2276d973f13$var$runTimeout(fun) {
    if ($07c3e2276d973f13$var$cachedSetTimeout === setTimeout) //normal enviroments in sane situations
    return setTimeout(fun, 0);
    // if setTimeout wasn't available but was latter defined
    if (($07c3e2276d973f13$var$cachedSetTimeout === $07c3e2276d973f13$var$defaultSetTimout || !$07c3e2276d973f13$var$cachedSetTimeout) && setTimeout) {
        $07c3e2276d973f13$var$cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return $07c3e2276d973f13$var$cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return $07c3e2276d973f13$var$cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return $07c3e2276d973f13$var$cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function $07c3e2276d973f13$var$runClearTimeout(marker) {
    if ($07c3e2276d973f13$var$cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
    return clearTimeout(marker);
    // if clearTimeout wasn't available but was latter defined
    if (($07c3e2276d973f13$var$cachedClearTimeout === $07c3e2276d973f13$var$defaultClearTimeout || !$07c3e2276d973f13$var$cachedClearTimeout) && clearTimeout) {
        $07c3e2276d973f13$var$cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return $07c3e2276d973f13$var$cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return $07c3e2276d973f13$var$cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return $07c3e2276d973f13$var$cachedClearTimeout.call(this, marker);
        }
    }
}
var $07c3e2276d973f13$var$queue = [];
var $07c3e2276d973f13$var$draining = false;
var $07c3e2276d973f13$var$currentQueue;
var $07c3e2276d973f13$var$queueIndex = -1;
function $07c3e2276d973f13$var$cleanUpNextTick() {
    if (!$07c3e2276d973f13$var$draining || !$07c3e2276d973f13$var$currentQueue) return;
    $07c3e2276d973f13$var$draining = false;
    if ($07c3e2276d973f13$var$currentQueue.length) $07c3e2276d973f13$var$queue = $07c3e2276d973f13$var$currentQueue.concat($07c3e2276d973f13$var$queue);
    else $07c3e2276d973f13$var$queueIndex = -1;
    if ($07c3e2276d973f13$var$queue.length) $07c3e2276d973f13$var$drainQueue();
}
function $07c3e2276d973f13$var$drainQueue() {
    if ($07c3e2276d973f13$var$draining) return;
    var timeout = $07c3e2276d973f13$var$runTimeout($07c3e2276d973f13$var$cleanUpNextTick);
    $07c3e2276d973f13$var$draining = true;
    var len = $07c3e2276d973f13$var$queue.length;
    while(len){
        $07c3e2276d973f13$var$currentQueue = $07c3e2276d973f13$var$queue;
        $07c3e2276d973f13$var$queue = [];
        while(++$07c3e2276d973f13$var$queueIndex < len)if ($07c3e2276d973f13$var$currentQueue) $07c3e2276d973f13$var$currentQueue[$07c3e2276d973f13$var$queueIndex].run();
        $07c3e2276d973f13$var$queueIndex = -1;
        len = $07c3e2276d973f13$var$queue.length;
    }
    $07c3e2276d973f13$var$currentQueue = null;
    $07c3e2276d973f13$var$draining = false;
    $07c3e2276d973f13$var$runClearTimeout(timeout);
}
$07c3e2276d973f13$var$process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
    $07c3e2276d973f13$var$queue.push(new $07c3e2276d973f13$var$Item(fun, args));
    if ($07c3e2276d973f13$var$queue.length === 1 && !$07c3e2276d973f13$var$draining) $07c3e2276d973f13$var$runTimeout($07c3e2276d973f13$var$drainQueue);
};
// v8 likes predictible objects
function $07c3e2276d973f13$var$Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
$07c3e2276d973f13$var$Item.prototype.run = function() {
    this.fun.apply(null, this.array);
};
$07c3e2276d973f13$var$process.title = "browser";
$07c3e2276d973f13$var$process.browser = true;
$07c3e2276d973f13$var$process.env = {};
$07c3e2276d973f13$var$process.argv = [];
$07c3e2276d973f13$var$process.version = ""; // empty string to avoid regexp issues
$07c3e2276d973f13$var$process.versions = {};
function $07c3e2276d973f13$var$noop() {}
$07c3e2276d973f13$var$process.on = $07c3e2276d973f13$var$noop;
$07c3e2276d973f13$var$process.addListener = $07c3e2276d973f13$var$noop;
$07c3e2276d973f13$var$process.once = $07c3e2276d973f13$var$noop;
$07c3e2276d973f13$var$process.off = $07c3e2276d973f13$var$noop;
$07c3e2276d973f13$var$process.removeListener = $07c3e2276d973f13$var$noop;
$07c3e2276d973f13$var$process.removeAllListeners = $07c3e2276d973f13$var$noop;
$07c3e2276d973f13$var$process.emit = $07c3e2276d973f13$var$noop;
$07c3e2276d973f13$var$process.prependListener = $07c3e2276d973f13$var$noop;
$07c3e2276d973f13$var$process.prependOnceListener = $07c3e2276d973f13$var$noop;
$07c3e2276d973f13$var$process.listeners = function(name) {
    return [];
};
$07c3e2276d973f13$var$process.binding = function(name) {
    throw new Error("process.binding is not supported");
};
$07c3e2276d973f13$var$process.cwd = function() {
    return "/";
};
$07c3e2276d973f13$var$process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
};
$07c3e2276d973f13$var$process.umask = function() {
    return 0;
};


var $ee841df9a5ce9c95$exports = {};
/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 * Copyright (c) 2012-2015 Rod Vagg (@rvagg)
 * Based on : https://github.com/rvagg/node-errno
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see https://opensource.org/licenses/AGPL-3.0.
 *
 */ // jshint ignore: start
/*eslint-env es6*/ /*eslint no-console: 0*/ /*eslint strict: ["error", "global"]*/ /** All phoenix shell errors and their description.
 *
 * This module should be functionally as light weight as possible with minimal deps as it is a shell component.
 * **/ const $ee841df9a5ce9c95$var$ERROR_CODES = {
    ENOENT: "ENOENT",
    UNKNOWN: "UNKNOWN",
    OK: "OK",
    EOF: "EOF",
    EADDRINFO: "EADDRINFO",
    EACCES: "EACCES",
    EAGAIN: "EAGAIN",
    EADDRINUSE: "EADDRINUSE",
    EADDRNOTAVAIL: "EADDRNOTAVAIL",
    EAFNOSUPPORT: "EAFNOSUPPORT",
    EALREADY: "EALREADY",
    EBADF: "EBADF",
    EBUSY: "EBUSY",
    ECONNABORTED: "ECONNABORTED",
    ECONNREFUSED: "ECONNREFUSED",
    ECONNRESET: "ECONNRESET",
    EDESTADDRREQ: "EDESTADDRREQ",
    EFAULT: "EFAULT",
    EHOSTUNREACH: "EHOSTUNREACH",
    EINTR: "EINTR",
    EINVAL: "EINVAL",
    EISCONN: "EISCONN",
    EMFILE: "EMFILE",
    EMSGSIZE: "EMSGSIZE",
    ENETDOWN: "ENETDOWN",
    ENETUNREACH: "ENETUNREACH",
    ENFILE: "ENFILE",
    ENOBUFS: "ENOBUFS",
    ENOMEM: "ENOMEM",
    ENOTDIR: "ENOTDIR",
    EISDIR: "EISDIR",
    ENONET: "ENONET",
    ENOTCONN: "ENOTCONN",
    ENOTSOCK: "ENOTSOCK",
    ENOTSUP: "ENOTSUP",
    ENOSYS: "ENOSYS",
    EPIPE: "EPIPE",
    EPROTO: "EPROTO",
    EPROTONOSUPPORT: "EPROTONOSUPPORT",
    EPROTOTYPE: "EPROTOTYPE",
    ETIMEDOUT: "ETIMEDOUT",
    ECHARSET: "ECHARSET",
    EAIFAMNOSUPPORT: "EAIFAMNOSUPPORT",
    EAISERVICE: "EAISERVICE",
    EAISOCKTYPE: "EAISOCKTYPE",
    ESHUTDOWN: "ESHUTDOWN",
    EEXIST: "EEXIST",
    ESRCH: "ESRCH",
    ENAMETOOLONG: "ENAMETOOLONG",
    EPERM: "EPERM",
    ELOOP: "ELOOP",
    EXDEV: "EXDEV",
    ENOTEMPTY: "ENOTEMPTY",
    ENOSPC: "ENOSPC",
    EIO: "EIO",
    EROFS: "EROFS",
    ENODEV: "ENODEV",
    ESPIPE: "ESPIPE",
    ECANCELED: "ECANCELED"
};
const $ee841df9a5ce9c95$var$FS_ERROR_CODES = {
    ENOENT: $ee841df9a5ce9c95$var$ERROR_CODES.ENOENT,
    EOF: $ee841df9a5ce9c95$var$ERROR_CODES.EOF,
    EACCES: $ee841df9a5ce9c95$var$ERROR_CODES.EACCES,
    EAGAIN: $ee841df9a5ce9c95$var$ERROR_CODES.EAGAIN,
    EBADF: $ee841df9a5ce9c95$var$ERROR_CODES.EBADF,
    EBUSY: $ee841df9a5ce9c95$var$ERROR_CODES.EBUSY,
    EINVAL: $ee841df9a5ce9c95$var$ERROR_CODES.EINVAL,
    EMFILE: $ee841df9a5ce9c95$var$ERROR_CODES.EMFILE,
    ENFILE: $ee841df9a5ce9c95$var$ERROR_CODES.ENFILE,
    ENOBUFS: $ee841df9a5ce9c95$var$ERROR_CODES.ENOBUFS,
    ENOTDIR: $ee841df9a5ce9c95$var$ERROR_CODES.ENOTDIR,
    EISDIR: $ee841df9a5ce9c95$var$ERROR_CODES.EISDIR,
    ENOSYS: $ee841df9a5ce9c95$var$ERROR_CODES.ENOSYS,
    ECHARSET: $ee841df9a5ce9c95$var$ERROR_CODES.ECHARSET,
    EEXIST: $ee841df9a5ce9c95$var$ERROR_CODES.EEXIST,
    ENAMETOOLONG: $ee841df9a5ce9c95$var$ERROR_CODES.ENAMETOOLONG,
    EPERM: $ee841df9a5ce9c95$var$ERROR_CODES.EPERM,
    ELOOP: $ee841df9a5ce9c95$var$ERROR_CODES.ELOOP,
    EXDEV: $ee841df9a5ce9c95$var$ERROR_CODES.EXDEV,
    ENOTEMPTY: $ee841df9a5ce9c95$var$ERROR_CODES.ENOTEMPTY,
    ENOSPC: $ee841df9a5ce9c95$var$ERROR_CODES.ENOSPC,
    EIO: $ee841df9a5ce9c95$var$ERROR_CODES.EIO,
    EROFS: $ee841df9a5ce9c95$var$ERROR_CODES.EROFS,
    ESPIPE: $ee841df9a5ce9c95$var$ERROR_CODES.ESPIPE,
    ECANCELED: $ee841df9a5ce9c95$var$ERROR_CODES.ECANCELED //operation canceled
};
const $ee841df9a5ce9c95$var$ALL_ERRORS = [
    {
        errno: -2,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ENOENT,
        description: "no such file or directory"
    },
    {
        errno: -1,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.UNKNOWN,
        description: "unknown error"
    },
    {
        errno: 0,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.OK,
        description: "success"
    },
    {
        errno: 1,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EOF,
        description: "end of file"
    },
    {
        errno: 2,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EADDRINFO,
        description: "getaddrinfo error"
    },
    {
        errno: 3,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EACCES,
        description: "permission denied"
    },
    {
        errno: 4,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EAGAIN,
        description: "resource temporarily unavailable"
    },
    {
        errno: 5,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EADDRINUSE,
        description: "address already in use"
    },
    {
        errno: 6,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EADDRNOTAVAIL,
        description: "address not available"
    },
    {
        errno: 7,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EAFNOSUPPORT,
        description: "address family not supported"
    },
    {
        errno: 8,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EALREADY,
        description: "connection already in progress"
    },
    {
        errno: 9,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EBADF,
        description: "bad file descriptor"
    },
    {
        errno: 10,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EBUSY,
        description: "resource busy or locked"
    },
    {
        errno: 11,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ECONNABORTED,
        description: "software caused connection abort"
    },
    {
        errno: 12,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ECONNREFUSED,
        description: "connection refused"
    },
    {
        errno: 13,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ECONNRESET,
        description: "connection reset by peer"
    },
    {
        errno: 14,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EDESTADDRREQ,
        description: "destination address required"
    },
    {
        errno: 15,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EFAULT,
        description: "bad address in system call argument"
    },
    {
        errno: 16,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EHOSTUNREACH,
        description: "host is unreachable"
    },
    {
        errno: 17,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EINTR,
        description: "interrupted system call"
    },
    {
        errno: 18,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EINVAL,
        description: "invalid argument"
    },
    {
        errno: 19,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EISCONN,
        description: "socket is already connected"
    },
    {
        errno: 20,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EMFILE,
        description: "too many open files"
    },
    {
        errno: 21,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EMSGSIZE,
        description: "message/datagram too long"
    },
    {
        errno: 22,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ENETDOWN,
        description: "network is down"
    },
    {
        errno: 23,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ENETUNREACH,
        description: "network is unreachable"
    },
    {
        errno: 24,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ENFILE,
        description: "file table overflow"
    },
    {
        errno: 25,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ENOBUFS,
        description: "no buffer space available"
    },
    {
        errno: 26,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ENOMEM,
        description: "not enough memory/ high virtual memory usage"
    },
    {
        errno: 27,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ENOTDIR,
        description: "not a directory"
    },
    {
        errno: 28,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EISDIR,
        description: "illegal operation on a directory"
    },
    {
        errno: 29,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ENONET,
        description: "machine is not on the network"
    },
    {
        errno: 31,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ENOTCONN,
        description: "socket is not connected"
    },
    {
        errno: 32,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ENOTSOCK,
        description: "socket operation on non-socket"
    },
    {
        errno: 33,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ENOTSUP,
        description: "operation not supported on socket"
    },
    {
        errno: 34,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ENOENT,
        description: "no such file or directory"
    },
    {
        errno: 35,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ENOSYS,
        description: "function not implemented"
    },
    {
        errno: 36,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EPIPE,
        description: "broken pipe"
    },
    {
        errno: 37,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EPROTO,
        description: "protocol error"
    },
    {
        errno: 38,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EPROTONOSUPPORT,
        description: "protocol not supported"
    },
    {
        errno: 39,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EPROTOTYPE,
        description: "protocol wrong type for socket"
    },
    {
        errno: 40,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ETIMEDOUT,
        description: "connection timed out"
    },
    {
        errno: 41,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ECHARSET,
        description: "invalid Unicode character"
    },
    {
        errno: 42,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EAIFAMNOSUPPORT,
        description: "address family for hostname not supported"
    },
    {
        errno: 44,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EAISERVICE,
        description: "servname not supported for ai_socktype"
    },
    {
        errno: 45,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EAISOCKTYPE,
        description: "ai_socktype not supported"
    },
    {
        errno: 46,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ESHUTDOWN,
        description: "cannot send after transport endpoint shutdown"
    },
    {
        errno: 47,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EEXIST,
        description: "file already exists"
    },
    {
        errno: 48,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ESRCH,
        description: "no such process"
    },
    {
        errno: 49,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ENAMETOOLONG,
        description: "name too long"
    },
    {
        errno: 50,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EPERM,
        description: "operation not permitted"
    },
    {
        errno: 51,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ELOOP,
        description: "too many symbolic links encountered"
    },
    {
        errno: 52,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EXDEV,
        description: "cross-device link not permitted"
    },
    {
        errno: 53,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ENOTEMPTY,
        description: "directory not empty"
    },
    {
        errno: 54,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ENOSPC,
        description: "no space left on device"
    },
    {
        errno: 55,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EIO,
        description: "i/o error"
    },
    {
        errno: 56,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.EROFS,
        description: "read-only file system"
    },
    {
        errno: 57,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ENODEV,
        description: "no such device"
    },
    {
        errno: 58,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ESPIPE,
        description: "invalid seek"
    },
    {
        errno: 59,
        code: $ee841df9a5ce9c95$var$ERROR_CODES.ECANCELED,
        description: "operation canceled"
    }
];
let $ee841df9a5ce9c95$var$ERRNO_TO_ERROR_MAP = {};
let $ee841df9a5ce9c95$var$CODE_TO_ERROR_MAP = {};
$ee841df9a5ce9c95$var$ALL_ERRORS.forEach(function(error) {
    $ee841df9a5ce9c95$var$ERRNO_TO_ERROR_MAP[error.errno] = error;
    $ee841df9a5ce9c95$var$CODE_TO_ERROR_MAP[error.code] = error;
});
const $ee841df9a5ce9c95$var$ERR_CODES = {
    ERROR_CODES: $ee841df9a5ce9c95$var$ERROR_CODES,
    FS_ERROR_CODES: $ee841df9a5ce9c95$var$FS_ERROR_CODES,
    ALL_ERRORS: $ee841df9a5ce9c95$var$ALL_ERRORS,
    ERRNO_TO_ERROR_MAP: $ee841df9a5ce9c95$var$ERRNO_TO_ERROR_MAP,
    CODE_TO_ERROR_MAP: $ee841df9a5ce9c95$var$CODE_TO_ERROR_MAP
};
const $ee841df9a5ce9c95$var$Errors = {};
[
    /**
     * node.js errors - we only use some of these, add as needed.
     */ //'-1:UNKNOWN:unknown error',
    //'0:OK:success',
    //'1:EOF:end of file',
    //'2:EADDRINFO:getaddrinfo error',
    "3:EACCES:permission denied",
    //'4:EAGAIN:resource temporarily unavailable',
    //'5:EADDRINUSE:address already in use',
    //'6:EADDRNOTAVAIL:address not available',
    //'7:EAFNOSUPPORT:address family not supported',
    //'8:EALREADY:connection already in progress',
    "9:EBADF:bad file descriptor",
    "10:EBUSY:resource busy or locked",
    //'11:ECONNABORTED:software caused connection abort',
    //'12:ECONNREFUSED:connection refused',
    //'13:ECONNRESET:connection reset by peer',
    //'14:EDESTADDRREQ:destination address required',
    //'15:EFAULT:bad address in system call argument',
    //'16:EHOSTUNREACH:host is unreachable',
    //'17:EINTR:interrupted system call',
    "18:EINVAL:invalid argument",
    //'19:EISCONN:socket is already connected',
    //'20:EMFILE:too many open files',
    //'21:EMSGSIZE:message too long',
    //'22:ENETDOWN:network is down',
    //'23:ENETUNREACH:network is unreachable',
    //'24:ENFILE:file table overflow',
    //'25:ENOBUFS:no buffer space available',
    //'26:ENOMEM:not enough memory',
    "27:ENOTDIR:not a directory",
    "28:EISDIR:illegal operation on a directory",
    //'29:ENONET:machine is not on the network',
    // errno 30 skipped, as per https://github.com/rvagg/node-errno/blob/master/errno.js
    //'31:ENOTCONN:socket is not connected',
    //'32:ENOTSOCK:socket operation on non-socket',
    //'33:ENOTSUP:operation not supported on socket',
    "34:ENOENT:no such file or directory",
    "35:ENOSYS:function not implemented",
    //'36:EPIPE:broken pipe',
    //'37:EPROTO:protocol error',
    //'38:EPROTONOSUPPORT:protocol not supported',
    //'39:EPROTOTYPE:protocol wrong type for socket',
    //'40:ETIMEDOUT:connection timed out',
    //'41:ECHARSET:invalid Unicode character',
    //'42:EAIFAMNOSUPPORT:address family for hostname not supported',
    // errno 43 skipped, as per https://github.com/rvagg/node-errno/blob/master/errno.js
    //'44:EAISERVICE:servname not supported for ai_socktype',
    //'45:EAISOCKTYPE:ai_socktype not supported',
    //'46:ESHUTDOWN:cannot send after transport endpoint shutdown',
    "47:EEXIST:file already exists",
    //'48:ESRCH:no such process',
    //'49:ENAMETOOLONG:name too long',
    "50:EPERM:operation not permitted",
    "51:ELOOP:too many symbolic links encountered",
    //'52:EXDEV:cross-device link not permitted',
    "53:ENOTEMPTY:directory not empty",
    //'54:ENOSPC:no space left on device',
    "55:EIO:i/o error",
    //'56:EROFS:read-only file system',
    //'57:ENODEV:no such device',
    //'58:ESPIPE:invalid seek',
    //'59:ECANCELED:operation canceled',
    /**
     * Phoenix/Filer specific errors
     */ "1000:ENOTMOUNTED:not mounted",
    "1001:EFILESYSTEMERROR:missing super node, use 'FORMAT' flag to format filesystem.",
    "1002:ENOATTR:attribute does not exist"
].forEach(function(e) {
    e = e.split(":");
    var errno = +e[0];
    var errName = e[1];
    var defaultMessage = e[2];
    function FilerError(msg, path) {
        Error.call(this);
        this.name = errName;
        this.code = errName;
        this.errno = errno;
        this.message = msg || defaultMessage;
        if (path) this.path = path;
        this.stack = new Error(this.message).stack;
    }
    FilerError.prototype = Object.create(Error.prototype);
    FilerError.prototype.constructor = FilerError;
    FilerError.prototype.toString = function() {
        var pathInfo = this.path ? ", '" + this.path + "'" : "";
        return this.name + ": " + this.message + pathInfo;
    };
    // We expose the error as both Errors.EINVAL and Errors[18]
    $ee841df9a5ce9c95$var$Errors[errName] = $ee841df9a5ce9c95$var$Errors[errno] = FilerError;
});
$ee841df9a5ce9c95$exports = {
    Errors: $ee841df9a5ce9c95$var$Errors,
    ERR_CODES: $ee841df9a5ce9c95$var$ERR_CODES
};


var $e3f139c5065f0041$require$ERR_CODES = $ee841df9a5ce9c95$exports.ERR_CODES;
var $e3f139c5065f0041$require$Errors = $ee841df9a5ce9c95$exports.Errors;
var $bd5c47de9e98f4fa$exports = {};
/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see https://opensource.org/licenses/AGPL-3.0.
 *
 */ // jshint ignore: start
/*global buffer, globalObject*/ /*eslint no-console: 0*/ /*eslint strict: ["error", "global"]*/ var $d71a2f6bd42cb0cc$exports = {};
/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see https://opensource.org/licenses/AGPL-3.0.
 *
 */ // jshint ignore: start
/*global globalObject*/ /*eslint no-console: 0*/ /*eslint strict: ["error", "global"]*/ 
var $d71a2f6bd42cb0cc$require$Errors = $ee841df9a5ce9c95$exports.Errors;
var $983f70f1027f6cfd$exports = {};
/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see https://opensource.org/licenses/AGPL-3.0.
 *
 */ // jshint ignore: start
/*eslint no-console: 0*/ /*eslint strict: ["error", "global"]*/ /**
 * Persists serialised mounted native file system handles to indexed db to usage across tabs and sessions.
**/ var $2ef5299e07961cfe$exports = {};
/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see https://opensource.org/licenses/AGPL-3.0.
 *
 */ // jshint ignore: start
/*eslint no-console: 0*/ /*eslint strict: ["error", "global"]*/ /* jshint ignore:start */ const $2ef5299e07961cfe$var$Constants = {
    MOUNT_DEVICE_NAME: "nativeFsAccess",
    KIND_FILE: "file",
    KIND_DIRECTORY: "directory",
    NODE_TYPE_FILE: "FILE",
    NODE_TYPE_DIRECTORY: "DIRECTORY",
    IDB_RW_TYPE: "readwrite",
    MOUNT_POINT_ROOT: "/mnt"
};
$2ef5299e07961cfe$exports = {
    Constants: $2ef5299e07961cfe$var$Constants
};


var $983f70f1027f6cfd$require$Constants = $2ef5299e07961cfe$exports.Constants;
var $c0e8621a15003181$exports = {};
const $c0e8621a15003181$var$idb = function(e) {
    "use strict";
    let t, n;
    const r = new WeakMap, o = new WeakMap, s = new WeakMap, a = new WeakMap, i = new WeakMap;
    let c = {
        get (e, t, n) {
            if (e instanceof IDBTransaction) {
                if ("done" === t) return o.get(e);
                if ("objectStoreNames" === t) return e.objectStoreNames || s.get(e);
                if ("store" === t) return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
            }
            return p(e[t]);
        },
        set: (e, t, n)=>(e[t] = n, !0),
        has: (e, t)=>e instanceof IDBTransaction && ("done" === t || "store" === t) || t in e
    };
    function u(e) {
        return e !== IDBDatabase.prototype.transaction || "objectStoreNames" in IDBTransaction.prototype ? (n || (n = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey
        ])).includes(e) ? function(...t) {
            return e.apply(f(this), t), p(r.get(this));
        } : function(...t) {
            return p(e.apply(f(this), t));
        } : function(t, ...n) {
            const r = e.call(f(this), t, ...n);
            return s.set(r, t.sort ? t.sort() : [
                t
            ]), p(r);
        };
    }
    function d(e) {
        var n;
        return "function" == typeof e ? u(e) : (e instanceof IDBTransaction && function(e) {
            if (o.has(e)) return;
            const t = new Promise((t, n)=>{
                const r = ()=>{
                    e.removeEventListener("complete", o), e.removeEventListener("error", s), e.removeEventListener("abort", s);
                }, o = ()=>{
                    t(), r();
                }, s = ()=>{
                    n(e.error || new DOMException("AbortError", "AbortError")), r();
                };
                e.addEventListener("complete", o), e.addEventListener("error", s), e.addEventListener("abort", s);
            });
            o.set(e, t);
        }(e), n = e, (t || (t = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction
        ])).some((e)=>n instanceof e) ? new Proxy(e, c) : e);
    }
    function p(e) {
        if (e instanceof IDBRequest) return function(e) {
            const t = new Promise((t, n)=>{
                const r = ()=>{
                    e.removeEventListener("success", o), e.removeEventListener("error", s);
                }, o = ()=>{
                    t(p(e.result)), r();
                }, s = ()=>{
                    n(e.error), r();
                };
                e.addEventListener("success", o), e.addEventListener("error", s);
            });
            return t.then((t)=>{
                t instanceof IDBCursor && r.set(t, e);
            }).catch(()=>{}), i.set(t, e), t;
        }(e);
        if (a.has(e)) return a.get(e);
        const t = d(e);
        return t !== e && (a.set(e, t), i.set(t, e)), t;
    }
    const f = (e)=>i.get(e);
    const l = [
        "get",
        "getKey",
        "getAll",
        "getAllKeys",
        "count"
    ], D = [
        "put",
        "add",
        "delete",
        "clear"
    ], v = new Map;
    function b(e, t) {
        if (!(e instanceof IDBDatabase) || t in e || "string" != typeof t) return;
        if (v.get(t)) return v.get(t);
        const n = t.replace(/FromIndex$/, ""), r = t !== n, o = D.includes(n);
        if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || !o && !l.includes(n)) return;
        const s = async function(e, ...t) {
            const s = this.transaction(e, o ? "readwrite" : "readonly");
            let a = s.store;
            return r && (a = a.index(t.shift())), (await Promise.all([
                a[n](...t),
                o && s.done
            ]))[0];
        };
        return v.set(t, s), s;
    }
    return c = ((e)=>({
            ...e,
            get: (t, n, r)=>b(t, n) || e.get(t, n, r),
            has: (t, n)=>!!b(t, n) || e.has(t, n)
        }))(c), e.deleteDB = function(e, { blocked: t } = {}) {
        const n = indexedDB.deleteDatabase(e);
        return t && n.addEventListener("blocked", ()=>t()), p(n).then(()=>{});
    }, e.openDB = function(e, t, { blocked: n, upgrade: r, blocking: o, terminated: s } = {}) {
        const a = indexedDB.open(e, t), i = p(a);
        return r && a.addEventListener("upgradeneeded", (e)=>{
            r(p(a.result), e.oldVersion, e.newVersion, p(a.transaction));
        }), n && a.addEventListener("blocked", ()=>n()), i.then((e)=>{
            s && e.addEventListener("close", ()=>s()), o && e.addEventListener("versionchange", ()=>o());
        }).catch(()=>{}), i;
    }, e.unwrap = f, e.wrap = p, e;
}({});
$c0e8621a15003181$exports = {
    idb: $c0e8621a15003181$var$idb
};


var $983f70f1027f6cfd$require$idb = $c0e8621a15003181$exports.idb;
const $983f70f1027f6cfd$var$PHOENIX_MOUNTS_DB_NAME = "PHOENIX_MOUNTS";
const $983f70f1027f6cfd$var$STORE_NAME = "FS_ACCESS";
const $983f70f1027f6cfd$var$MOUNT_POINTS_KEY = "MOUNT_POINTS";
const $983f70f1027f6cfd$var$VERSION_1 = 1;
let $983f70f1027f6cfd$var$db = null;
let $983f70f1027f6cfd$var$_currentMounts = {};
async function $983f70f1027f6cfd$var$_ensureDB() {
    if ($983f70f1027f6cfd$var$db) return;
    $983f70f1027f6cfd$var$db = await $983f70f1027f6cfd$require$idb.openDB($983f70f1027f6cfd$var$PHOENIX_MOUNTS_DB_NAME, $983f70f1027f6cfd$var$VERSION_1, {
        upgrade (db) {
            db.createObjectStore($983f70f1027f6cfd$var$STORE_NAME);
        }
    });
}
async function $983f70f1027f6cfd$var$addMountPoint(mountName, handle) {
    await $983f70f1027f6cfd$var$_ensureDB();
    const tx = $983f70f1027f6cfd$var$db.transaction($983f70f1027f6cfd$var$STORE_NAME, $983f70f1027f6cfd$require$Constants.IDB_RW_TYPE);
    const store = tx.objectStore($983f70f1027f6cfd$var$STORE_NAME);
    $983f70f1027f6cfd$var$_currentMounts = await store.get($983f70f1027f6cfd$var$MOUNT_POINTS_KEY) || {};
    $983f70f1027f6cfd$var$_currentMounts[mountName] = handle;
    await store.put($983f70f1027f6cfd$var$_currentMounts, $983f70f1027f6cfd$var$MOUNT_POINTS_KEY);
    await tx.done;
}
async function $983f70f1027f6cfd$var$refreshMountPoints() {
    await $983f70f1027f6cfd$var$_ensureDB();
    const tx = $983f70f1027f6cfd$var$db.transaction($983f70f1027f6cfd$var$STORE_NAME, $983f70f1027f6cfd$require$Constants.IDB_RW_TYPE);
    const store = tx.objectStore($983f70f1027f6cfd$var$STORE_NAME);
    $983f70f1027f6cfd$var$_currentMounts = await store.get($983f70f1027f6cfd$var$MOUNT_POINTS_KEY) || {};
    await tx.done;
    return $983f70f1027f6cfd$var$_currentMounts;
}
function $983f70f1027f6cfd$var$getMountPoints() {
    return $983f70f1027f6cfd$var$_currentMounts;
}
const $983f70f1027f6cfd$var$MountPointsStore = {
    addMountPoint: $983f70f1027f6cfd$var$addMountPoint,
    getMountPoints: $983f70f1027f6cfd$var$getMountPoints,
    refreshMountPoints: $983f70f1027f6cfd$var$refreshMountPoints
};
$983f70f1027f6cfd$exports = {
    MountPointsStore: $983f70f1027f6cfd$var$MountPointsStore
};


var $d71a2f6bd42cb0cc$require$MountPointsStore = $983f70f1027f6cfd$exports.MountPointsStore;

var $d71a2f6bd42cb0cc$require$Constants = $2ef5299e07961cfe$exports.Constants;
const $d71a2f6bd42cb0cc$var$MOUNT_POINT_CHANGED_NOTIFICATION = "PHOENIX_MOUNT_POINT_CHANGED_NOTIFICATION";
let $d71a2f6bd42cb0cc$var$MAX_NUM_MOUNTS = 1000000;
let $d71a2f6bd42cb0cc$var$_channel = null;
/**
 * Check if the given path is a subpath of the '/mnt' folder.
 * @param path
 */ function $d71a2f6bd42cb0cc$var$isMountSubPath(path) {
    if (typeof path !== "string") return false;
    let mntSubPathStart = "/mnt/";
    if (path) {
        path = globalObject.path.normalize(path);
        if (path.startsWith(mntSubPathStart) && path.length > mntSubPathStart.length) return true;
    }
    return false;
}
/**
 * Check if the given path is '/mnt' folder.
 * @param path
 */ function $d71a2f6bd42cb0cc$var$isMountPath(path) {
    if (typeof path !== "string") return false;
    if (path) {
        path = globalObject.path.normalize(path);
        if (path === $d71a2f6bd42cb0cc$require$Constants.MOUNT_POINT_ROOT) return true;
    }
    return false;
}
function $d71a2f6bd42cb0cc$var$_setupBroadcastChannel() {
    if ($d71a2f6bd42cb0cc$var$_channel) return;
    if (typeof BroadcastChannel === "undefined") {
        /* eslint no-console: 0 */ console.warn("BroadcastChannel not supported. Mount point changes wont reflect across tabs.");
        return;
    }
    $d71a2f6bd42cb0cc$var$_channel = new BroadcastChannel($d71a2f6bd42cb0cc$var$MOUNT_POINT_CHANGED_NOTIFICATION);
}
function $d71a2f6bd42cb0cc$var$_broadcastMountPointChanged() {
    $d71a2f6bd42cb0cc$var$_setupBroadcastChannel();
    $d71a2f6bd42cb0cc$var$_channel.postMessage($d71a2f6bd42cb0cc$var$MOUNT_POINT_CHANGED_NOTIFICATION);
}
function $d71a2f6bd42cb0cc$var$_listenToMountPointChanges() {
    $d71a2f6bd42cb0cc$var$_setupBroadcastChannel();
    $d71a2f6bd42cb0cc$var$_channel.onmessage = async function(event) {
        if (event.data === $d71a2f6bd42cb0cc$var$MOUNT_POINT_CHANGED_NOTIFICATION) await $d71a2f6bd42cb0cc$require$MountPointsStore.refreshMountPoints();
    };
}
/**
 * Checks if the given handleToMount is same as or a subdir of all existing mounts
 * @param handleToMount
 * @returns {*[]} array of details of handleToMount relative to existing mount
 * @private
 */ function $d71a2f6bd42cb0cc$var$_resolveFileHandle(handleToMount) {
    let allMountPointResolutions = [];
    const currentMounts = $d71a2f6bd42cb0cc$require$MountPointsStore.getMountPoints();
    for (const [mountName, handle] of Object.entries(currentMounts))allMountPointResolutions.push(new Promise((resolve)=>{
        const isSameEntryPromise = handle.isSameEntry(handleToMount);
        const isSubEntryPromise = handle.resolve(handleToMount);
        Promise.all([
            isSameEntryPromise,
            isSubEntryPromise
        ]).then((mountDetail)=>{
            let isSameEntry = mountDetail[0] || false;
            let subPathList = mountDetail[1] || [];
            resolve({
                existingMountName: mountName,
                isSameEntry: isSameEntry,
                subPath: subPathList.join("/")
            });
        });
    }));
    return allMountPointResolutions;
}
function $d71a2f6bd42cb0cc$var$_getPathIfAlreadyMounted(handleToMount) {
    return new Promise((resolve)=>{
        let allMountPointResolutions = $d71a2f6bd42cb0cc$var$_resolveFileHandle(handleToMount);
        Promise.all(allMountPointResolutions).then((values)=>{
            for(let i = 0; i < values.length; i++){
                let mountName = values[i].existingMountName;
                if (values[i].isSameEntry) {
                    resolve(`${$d71a2f6bd42cb0cc$require$Constants.MOUNT_POINT_ROOT}/${mountName}`);
                    return;
                } else if (values[i].subPath.length >= 1) {
                    resolve(`${$d71a2f6bd42cb0cc$require$Constants.MOUNT_POINT_ROOT}/${mountName}/${values[i].subPath}`);
                    return;
                }
            }
            resolve(null);
        });
    });
}
function $d71a2f6bd42cb0cc$var$_getNewMountName(handleToMount) {
    let name = handleToMount.name;
    const currentMounts = $d71a2f6bd42cb0cc$require$MountPointsStore.getMountPoints();
    if (!currentMounts[name]) return name;
    for(let i = 0; i < $d71a2f6bd42cb0cc$var$MAX_NUM_MOUNTS; i++){
        let mountName = `${name}_${i}`;
        if (!currentMounts[mountName]) return mountName;
    }
}
/**
 * If the new handle is the same as or a subdir of an existing mount, we return the existing mount path
 * resolved to the given handle. Eg, if a folder `a` with subdir `b` is mounted to `mnt/a`;if we try to mount subdir `b`
 * then, we will return `mnt/a/b` as `b` is a subdirectory of an already mounted directory.
 * @param handleToMount
 * @param currentMounts {mountName1:handle1, ...}
 * @private
 */ function $d71a2f6bd42cb0cc$var$_mountHandle(handleToMount) {
    return new Promise(async (resolve, reject)=>{
        // eslint async executors are needed here. we explicitly catch so it's fine.
        try {
            let path = await $d71a2f6bd42cb0cc$var$_getPathIfAlreadyMounted(handleToMount);
            if (path) resolve(path);
            else {
                let mountName = $d71a2f6bd42cb0cc$var$_getNewMountName(handleToMount);
                if (!mountName) reject("Mount name not fount");
                else {
                    await $d71a2f6bd42cb0cc$require$MountPointsStore.addMountPoint(mountName, handleToMount);
                    resolve(`${$d71a2f6bd42cb0cc$require$Constants.MOUNT_POINT_ROOT}/${mountName}`);
                }
            }
        } catch (e) {
            reject(e);
        }
    });
}
/**
 * Mounts a native folder, using a provided directory handle or prompting the user with a directory picker if no handle is provided.
 *
 * @param {Object|null} [optionalDirHandle] - An optional directory handle to use for mounting. If not provided, the function will prompt the user to select a directory.
 * @param {Function} callback - A callback function that will be called once the mounting process completes or fails. The callback will be passed two parameters: an error (or null if no error) and an array containing the mounted path (or null if mounting failed).
 *
 * @example
 * // Using the directory picker
 * mountNativeFolder(function(error, [mountPath]) {
 *     if (error) {
 *         console.error("Error mounting directory:", error);
 *     } else {
 *         console.log("Directory mounted at:", mountPath);
 *     }
 * });
 *
 * @example
 * // Using a provided directory handle
 * const dirHandle = { /* ... directory handle ... * / };
 * mountNativeFolder(dirHandle, function(error, [mountPath]) {
 *     if (error) {
 *         console.error("Error mounting directory:", error);
 *     } else {
 *         console.log("Directory mounted at:", mountPath);
 *     }
 * });
 */ function $d71a2f6bd42cb0cc$var$mountNativeFolder(optionalDirHandle, callback) {
    if (!callback) {
        callback = optionalDirHandle;
        optionalDirHandle = null;
    }
    let mountedPath = null;
    let error = null;
    $d71a2f6bd42cb0cc$require$MountPointsStore.refreshMountPoints().then(()=>optionalDirHandle || globalObject.showDirectoryPicker()).then((directoryHandle)=>$d71a2f6bd42cb0cc$var$_mountHandle(directoryHandle)).then((mountPath)=>mountedPath = mountPath).then(()=>$d71a2f6bd42cb0cc$var$_broadcastMountPointChanged()).catch(function(err) {
        error = new $d71a2f6bd42cb0cc$require$Errors.ENOTMOUNTED(err);
    }).finally(()=>{
        if (callback) callback(error, [
            mountedPath
        ]);
        else if (error) throw new $d71a2f6bd42cb0cc$require$Errors.ENOTMOUNTED(error);
    });
}
async function $d71a2f6bd42cb0cc$var$_verifyOrRequestPermission(handle) {
    const options = {
        mode: "read"
    };
    // Check if permission was already granted. If so, return true.
    try {
        let status = await handle.queryPermission(options);
        if (status === "granted") return null;
        status = await handle.requestPermission(options);
        if (status === "granted") return null;
        else return new $d71a2f6bd42cb0cc$require$Errors.EACCES(`Dir permissions not granted ${handle.name}`);
    } catch (e) {
        if (e.code === e.NOT_FOUND_ERR) return new $d71a2f6bd42cb0cc$require$Errors.ENOENT(`Dir does not exist ${handle.name}`, e);
        else return new $d71a2f6bd42cb0cc$require$Errors.EIO(`Phoenix fs could not read directory ${handle.name}`, e);
    }
}
async function $d71a2f6bd42cb0cc$var$_findLeafNode(currentNode, pathArray, currentIndex, callback) {
    let pathLength = pathArray.length;
    if (currentIndex === pathLength) {
        callback(null, currentNode);
        return;
    }
    let childName = pathArray[currentIndex];
    let childDirHandle = null;
    let childFileHandle = null;
    try {
        childDirHandle = await currentNode.getDirectoryHandle(childName);
    } catch (e) {
    // do nothing
    }
    try {
        childFileHandle = await currentNode.getFileHandle(childName);
    } catch (e) {
    // do nothing
    }
    if (childFileHandle && currentIndex === pathLength - 1) // the last node is a file
    callback(null, childFileHandle);
    else if (childDirHandle) $d71a2f6bd42cb0cc$var$_findLeafNode(childDirHandle, pathArray, currentIndex + 1, callback);
    else {
        let path = pathArray.join("/");
        callback(new $d71a2f6bd42cb0cc$require$Errors.ENOENT("File/Dir does not exist: ", path));
    }
}
async function $d71a2f6bd42cb0cc$var$getHandleFromPath(normalisedPath, callback) {
    const pathNodes = normalisedPath.split("/");
    const currentMounts = $d71a2f6bd42cb0cc$require$MountPointsStore.getMountPoints();
    if (pathNodes.length < 3 || pathNodes[0] !== "" || pathNodes[1] !== "mnt") callback(new $d71a2f6bd42cb0cc$require$Errors.EINVAL("Cannot operate on path " + normalisedPath));
    let mountPoint = currentMounts[pathNodes[2]];
    if (!mountPoint) {
        callback(new $d71a2f6bd42cb0cc$require$Errors.ENOENT("Path does not exist: ", normalisedPath));
        return;
    }
    let error = await $d71a2f6bd42cb0cc$var$_verifyOrRequestPermission(mountPoint);
    if (error) {
        callback(error);
        return;
    }
    $d71a2f6bd42cb0cc$var$_findLeafNode(mountPoint, pathNodes, 3, callback);
}
async function $d71a2f6bd42cb0cc$var$getHandleFromPathIfPresent(normalisedPath) {
    return new Promise((resolve)=>{
        $d71a2f6bd42cb0cc$var$getHandleFromPath(normalisedPath, (err, handle)=>{
            if (err) resolve(null);
            else resolve(handle);
        });
    });
}
function $d71a2f6bd42cb0cc$var$getMountPoints() {
    return $d71a2f6bd42cb0cc$require$MountPointsStore.getMountPoints();
}
function $d71a2f6bd42cb0cc$var$refreshMountPoints() {
    return $d71a2f6bd42cb0cc$require$MountPointsStore.refreshMountPoints();
}
$d71a2f6bd42cb0cc$var$_listenToMountPointChanges();
const $d71a2f6bd42cb0cc$var$Mounts = {
    mountNativeFolder: $d71a2f6bd42cb0cc$var$mountNativeFolder,
    isMountPath: $d71a2f6bd42cb0cc$var$isMountPath,
    isMountSubPath: $d71a2f6bd42cb0cc$var$isMountSubPath,
    getHandleFromPath: $d71a2f6bd42cb0cc$var$getHandleFromPath,
    getMountPoints: $d71a2f6bd42cb0cc$var$getMountPoints,
    refreshMountPoints: $d71a2f6bd42cb0cc$var$refreshMountPoints,
    getHandleFromPathIfPresent: $d71a2f6bd42cb0cc$var$getHandleFromPathIfPresent
};
$d71a2f6bd42cb0cc$exports = {
    Mounts: $d71a2f6bd42cb0cc$var$Mounts
};


var $bd5c47de9e98f4fa$require$Mounts = $d71a2f6bd42cb0cc$exports.Mounts;

var $bd5c47de9e98f4fa$require$Errors = $ee841df9a5ce9c95$exports.Errors;

var $bd5c47de9e98f4fa$require$Constants = $2ef5299e07961cfe$exports.Constants;
var $659ab4db13967c07$exports = {};
/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see https://opensource.org/licenses/AGPL-3.0.
 *
 */ /*global globalObject*/ // jshint ignore: start
/*eslint no-console: 0*/ /*eslint strict: ["error", "global"]*/ 
var $659ab4db13967c07$require$Constants = $2ef5299e07961cfe$exports.Constants;
function $659ab4db13967c07$var$_dateFromMs(ms) {
    if (ms === null || ms === undefined) return null;
    return new Date(Number(ms));
}
function $659ab4db13967c07$var$Stats(path, fileNode, devName) {
    this.dev = devName;
    this.node = fileNode.id;
    this.type = fileNode.type;
    this.size = fileNode.size;
    this.nlinks = fileNode.nlinks;
    // Date objects
    this.atime = $659ab4db13967c07$var$_dateFromMs(fileNode.atime);
    this.mtime = $659ab4db13967c07$var$_dateFromMs(fileNode.mtime);
    this.ctime = $659ab4db13967c07$var$_dateFromMs(fileNode.ctime);
    // Unix timestamp MS Numbers
    this.atimeMs = fileNode.atime;
    this.mtimeMs = fileNode.mtime;
    this.ctimeMs = fileNode.ctime;
    this.version = fileNode.version;
    this.mode = fileNode.mode;
    this.name = globalObject.path.basename(path);
}
$659ab4db13967c07$var$Stats.prototype.isFile = function() {
    return this.type === $659ab4db13967c07$require$Constants.NODE_TYPE_FILE;
};
$659ab4db13967c07$var$Stats.prototype.isDirectory = function() {
    return this.type === $659ab4db13967c07$require$Constants.NODE_TYPE_DIRECTORY;
};
$659ab4db13967c07$var$Stats.prototype.isSymbolicLink = function() {
    return this.type === $659ab4db13967c07$require$Constants.NODE_TYPE_SYMBOLIC_LINK;
};
// These will always be false in Filer.
$659ab4db13967c07$var$Stats.prototype.isSocket = $659ab4db13967c07$var$Stats.prototype.isFIFO = $659ab4db13967c07$var$Stats.prototype.isCharacterDevice = $659ab4db13967c07$var$Stats.prototype.isBlockDevice = function() {
    return false;
};
function $659ab4db13967c07$var$_getType(handle) {
    switch(handle.kind){
        case $659ab4db13967c07$require$Constants.KIND_FILE:
            return $659ab4db13967c07$require$Constants.NODE_TYPE_FILE;
        case $659ab4db13967c07$require$Constants.KIND_DIRECTORY:
            return $659ab4db13967c07$require$Constants.NODE_TYPE_DIRECTORY;
        default:
            return null;
    }
}
async function $659ab4db13967c07$var$_getDetails(nativeFsHandle) {
    let file = null;
    let details = {};
    switch(nativeFsHandle.kind){
        case $659ab4db13967c07$require$Constants.KIND_FILE:
            file = await nativeFsHandle.getFile();
            details.size = file.size;
            details.mtime = file.lastModified;
            return details;
        case $659ab4db13967c07$require$Constants.KIND_DIRECTORY:
        default:
            return details;
    }
}
const $659ab4db13967c07$var$createStatObject = async function(path, handle) {
    let details = await $659ab4db13967c07$var$_getDetails(handle);
    let fileDetails = {
        type: $659ab4db13967c07$var$_getType(handle),
        size: details.size,
        mtime: details.mtime
    };
    return new $659ab4db13967c07$var$Stats(path, fileDetails, $659ab4db13967c07$require$Constants.MOUNT_DEVICE_NAME);
};
const $659ab4db13967c07$var$Utils = {
    createStatObject: $659ab4db13967c07$var$createStatObject
};
$659ab4db13967c07$exports = {
    Utils: $659ab4db13967c07$var$Utils
};


var $bd5c47de9e98f4fa$require$Utils = $659ab4db13967c07$exports.Utils;
async function $bd5c47de9e98f4fa$var$_listDir(path, handle, options, callback) {
    let dirEntryNames = [];
    try {
        for await (const [key, value] of handle.entries()){
            let entry = key;
            if (options["withFileTypes"]) entry = await $bd5c47de9e98f4fa$require$Utils.createStatObject(globalObject.path.join(path, key), value);
            dirEntryNames.push(entry);
        }
        if (callback) callback(null, dirEntryNames);
        return dirEntryNames;
    } catch (e) {
        if (e.code === e.NOT_FOUND_ERR) callback(new $bd5c47de9e98f4fa$require$Errors.ENOENT(`Dir does not exist ${handle.name}`, e));
        else callback(new $bd5c47de9e98f4fa$require$Errors.EIO(`Phoenix fs could not read directory ${handle.name}`, e));
    }
}
// never throws
async function $bd5c47de9e98f4fa$var$_subDirectoryExists(parentDirHandle, dirName) {
    try {
        await parentDirHandle.getDirectoryHandle(dirName);
        return true;
    } catch (e) {
        return false;
    }
}
async function $bd5c47de9e98f4fa$var$_mkdir(parentDirHandle, dirName, callback) {
    try {
        let alreadyExists = await $bd5c47de9e98f4fa$var$_subDirectoryExists(parentDirHandle, dirName);
        if (alreadyExists) {
            callback(new $bd5c47de9e98f4fa$require$Errors.EEXIST(`Folder ${dirName} already exists`));
            return;
        }
        let childDirHandle = await parentDirHandle.getDirectoryHandle(dirName, {
            create: true
        });
        if (callback) callback(null);
        return childDirHandle;
    } catch (e) {
        if (callback) callback(new $bd5c47de9e98f4fa$require$Errors.EIO("Filer native fs function not yet supported.", e));
        throw new $bd5c47de9e98f4fa$require$Errors.EIO("Filer native fs function not yet supported.", e);
    }
}
function $bd5c47de9e98f4fa$var$mkdir(path, mode, callback) {
    if (arguments.length < 3) callback = mode;
    path = globalObject.path.normalize(path);
    let dirname = globalObject.path.dirname(path);
    let subdirName = globalObject.path.basename(path);
    $bd5c47de9e98f4fa$require$Mounts.getHandleFromPath(dirname, (err, handle)=>{
        if (err) callback(err);
        else if (handle.kind === $bd5c47de9e98f4fa$require$Constants.KIND_FILE) callback(new $bd5c47de9e98f4fa$require$Errors.ENOTDIR("Parent path is not a directory."));
        else $bd5c47de9e98f4fa$var$_mkdir(handle, subdirName, callback);
    });
}
function $bd5c47de9e98f4fa$var$readdir(path, options, callback) {
    path = globalObject.path.normalize(path);
    if (typeof options === "function") {
        callback = options;
        options = {};
    }
    if (path === $bd5c47de9e98f4fa$require$Constants.MOUNT_POINT_ROOT) {
        let mountedFolders = Object.keys($bd5c47de9e98f4fa$require$Mounts.getMountPoints());
        callback(null, mountedFolders);
    } else $bd5c47de9e98f4fa$require$Mounts.getHandleFromPath(path, (err, handle)=>{
        if (err) callback(err);
        else if (handle.kind === $bd5c47de9e98f4fa$require$Constants.KIND_FILE) callback(new $bd5c47de9e98f4fa$require$Errors.ENOTDIR("Path is not a directory."));
        else $bd5c47de9e98f4fa$var$_listDir(path, handle, options, callback);
    });
}
function $bd5c47de9e98f4fa$var$_getDecodedString(buffer1, encoding) {
    try {
        return new TextDecoder(encoding).decode(buffer1);
    } catch (e) {
        return null;
    }
}
async function $bd5c47de9e98f4fa$var$_getFileContents(fileHandle, encoding, callback) {
    encoding = encoding || "utf-8";
    try {
        let file = await fileHandle.getFile();
        let buffer1 = await file.arrayBuffer();
        if (encoding === $bd5c47de9e98f4fa$var$BYTE_ARRAY_ENCODING) {
            callback(null, buffer1, encoding);
            return;
        }
        let decodedString = $bd5c47de9e98f4fa$var$_getDecodedString(buffer1, encoding);
        if (decodedString !== null) callback(null, decodedString, encoding);
        else callback(new $bd5c47de9e98f4fa$require$Errors.EIO(`Encoding ${encoding} no supported`));
    } catch (e) {
        callback(e);
    }
}
function $bd5c47de9e98f4fa$var$_validateFileOptions(options, enc, fileMode) {
    if (!options) options = {
        encoding: enc,
        flag: fileMode
    };
    else if (typeof options === "function") options = {
        encoding: enc,
        flag: fileMode
    };
    else if (typeof options === "string") options = {
        encoding: options,
        flag: fileMode
    };
    return options;
}
function $bd5c47de9e98f4fa$var$readFile(path, options, callback) {
    path = globalObject.path.normalize(path);
    callback = arguments[arguments.length - 1];
    options = $bd5c47de9e98f4fa$var$_validateFileOptions(options, null, "r");
    $bd5c47de9e98f4fa$require$Mounts.getHandleFromPath(path, (err, handle)=>{
        if (err) callback(err);
        else if (handle.kind === $bd5c47de9e98f4fa$require$Constants.KIND_DIRECTORY) callback(new $bd5c47de9e98f4fa$require$Errors.EISDIR("Path is a directory."));
        else $bd5c47de9e98f4fa$var$_getFileContents(handle, options.encoding, callback);
    });
}
function $bd5c47de9e98f4fa$var$stat(path, callback) {
    path = globalObject.path.normalize(path);
    $bd5c47de9e98f4fa$require$Mounts.getHandleFromPath(path, (err, handle)=>{
        if (err) callback(err);
        else $bd5c47de9e98f4fa$require$Utils.createStatObject(path, handle).then((pathStat)=>{
            callback(null, pathStat);
        }).catch((error)=>{
            callback(error);
        });
    });
}
async function $bd5c47de9e98f4fa$var$_writeFileWithName(paretDirHandle, fileName, encoding, data, callback) {
    try {
        const newFileHandle = await paretDirHandle.getFileHandle(fileName, {
            create: true
        });
        const writable = await newFileHandle.createWritable();
        await writable.write(data);
        await writable.close();
        callback(null);
    } catch (e) {
        callback(e);
    }
}
function $bd5c47de9e98f4fa$var$writeFile(path, data, options, callback) {
    callback = arguments[arguments.length - 1];
    options = $bd5c47de9e98f4fa$var$_validateFileOptions(options, "utf8", "w");
    if (!buffer.Buffer.isBuffer(data)) {
        if (typeof data === "number") data = "" + data;
        data = data || "";
        if (typeof data !== "string") data = buffer.Buffer.from(data.toString());
        else data = buffer.Buffer.from(data || "", options.encoding || "utf8");
    }
    path = globalObject.path.normalize(path);
    let dirname = globalObject.path.dirname(path);
    let fileName = globalObject.path.basename(path);
    $bd5c47de9e98f4fa$require$Mounts.getHandleFromPath(dirname, (err, handle)=>{
        if (err) callback(err);
        else if (handle.kind === $bd5c47de9e98f4fa$require$Constants.KIND_FILE) callback(new $bd5c47de9e98f4fa$require$Errors.ENOTDIR("Parent path is not a directory."));
        else $bd5c47de9e98f4fa$var$_writeFileWithName(handle, fileName, options.encoding, data, callback);
    });
}
async function $bd5c47de9e98f4fa$var$_deleteEntry(dirHandle, entryNameToDelete, callback, recursive = true) {
    try {
        await dirHandle.removeEntry(entryNameToDelete, {
            recursive: recursive
        });
        callback(null);
    } catch (err) {
        callback(err);
    }
}
async function $bd5c47de9e98f4fa$var$unlink(path, callback) {
    path = globalObject.path.normalize(path);
    let dirPath = globalObject.path.dirname(path);
    let baseName = globalObject.path.basename(path);
    $bd5c47de9e98f4fa$require$Mounts.getHandleFromPath(dirPath, async (err, dirHandle)=>{
        if (err) callback(err);
        else $bd5c47de9e98f4fa$var$_deleteEntry(dirHandle, baseName, callback);
    });
}
async function $bd5c47de9e98f4fa$var$_getDestinationHandleForCopy(dst, srcBaseName, handleKindToCreate) {
    return new Promise(async (resolve, reject)=>{
        // eslint async executors are needed here. we explicitly catch so it's fine.
        try {
            dst = globalObject.path.normalize(dst);
            let dirPath = globalObject.path.dirname(dst);
            let dstBaseName = globalObject.path.basename(dst);
            let dstHandle = await $bd5c47de9e98f4fa$require$Mounts.getHandleFromPathIfPresent(dst);
            let dstParentHandle = await $bd5c47de9e98f4fa$require$Mounts.getHandleFromPathIfPresent(dirPath);
            if (dstHandle && dstHandle.kind === $bd5c47de9e98f4fa$require$Constants.KIND_FILE) reject(new $bd5c47de9e98f4fa$require$Errors.EEXIST(`Destination file already exists: ${dst}`));
            else if (dstHandle && dstHandle.kind === $bd5c47de9e98f4fa$require$Constants.KIND_DIRECTORY && handleKindToCreate === $bd5c47de9e98f4fa$require$Constants.KIND_FILE) {
                const fileHandle = await dstHandle.getFileHandle(srcBaseName, {
                    create: true
                });
                const dstPath = `${dst}/${srcBaseName}`;
                resolve({
                    handle: fileHandle,
                    path: dstPath
                });
            } else if (dstHandle && dstHandle.kind === $bd5c47de9e98f4fa$require$Constants.KIND_DIRECTORY && handleKindToCreate === $bd5c47de9e98f4fa$require$Constants.KIND_DIRECTORY) {
                let dstChildHandle = await $bd5c47de9e98f4fa$require$Mounts.getHandleFromPathIfPresent(`${dst}/${srcBaseName}`);
                if (dstChildHandle) {
                    reject(new $bd5c47de9e98f4fa$require$Errors.EEXIST(`Copy destination already exists: ${dst}/${srcBaseName}`));
                    return;
                }
                const directoryHandle = await dstHandle.getDirectoryHandle(srcBaseName, {
                    create: true
                });
                const dstPath = `${dst}/${srcBaseName}`;
                resolve({
                    handle: directoryHandle,
                    path: dstPath
                });
            } else if (!dstHandle && dstParentHandle && dstParentHandle.kind === $bd5c47de9e98f4fa$require$Constants.KIND_DIRECTORY && handleKindToCreate === $bd5c47de9e98f4fa$require$Constants.KIND_FILE) {
                const fileHandle = await dstParentHandle.getFileHandle(dstBaseName, {
                    create: true
                });
                const dstPath = `${dirPath}/${dstBaseName}`;
                resolve({
                    handle: fileHandle,
                    path: dstPath
                });
            } else if (!dstHandle && dstParentHandle && dstParentHandle.kind === $bd5c47de9e98f4fa$require$Constants.KIND_DIRECTORY && handleKindToCreate === $bd5c47de9e98f4fa$require$Constants.KIND_DIRECTORY) {
                const fileHandle = await dstParentHandle.getDirectoryHandle(dstBaseName, {
                    create: true
                });
                const dstPath = `${dirPath}/${dstBaseName}`;
                resolve({
                    handle: fileHandle,
                    path: dstPath
                });
            } else reject(new $bd5c47de9e98f4fa$require$Errors.ENOENT(`Copy destination doesnt exist: ${dst}`));
        } catch (e) {
            reject(e);
        }
    });
}
async function $bd5c47de9e98f4fa$var$_copyFileFromHandles(srcFileHandle, dstHandle, optionalName) {
    // TODO Add retry mechanisms when copying large folders
    try {
        if (optionalName) dstHandle = await dstHandle.getFileHandle(optionalName, {
            create: true
        });
        const srcFile = await srcFileHandle.getFile();
        const srcStream = await srcFile.stream();
        const writable = await dstHandle.createWritable();
        await srcStream.pipeTo(writable);
    } catch (e) {
        console.error(`Error while copying ${dstHandle.name}/${optionalName} : ${e}`);
        throw e;
    }
}
async function $bd5c47de9e98f4fa$var$_copyFileWithHandle(srcFileHandle, dst, srcFileName, callback) {
    try {
        let { handle: handle, path: path } = await $bd5c47de9e98f4fa$var$_getDestinationHandleForCopy(dst, srcFileName, $bd5c47de9e98f4fa$require$Constants.KIND_FILE);
        await $bd5c47de9e98f4fa$var$_copyFileFromHandles(srcFileHandle, handle);
        callback(null, path);
    } catch (e) {
        callback(e);
    }
}
async function $bd5c47de9e98f4fa$var$_treeCopy(srcFolderHandle, dstFolderHandle, recursive) {
    let allDonePromises = [];
    for await (const [key, srcHandle] of srcFolderHandle.entries()){
        if (srcHandle.kind === $bd5c47de9e98f4fa$require$Constants.KIND_FILE) allDonePromises.push($bd5c47de9e98f4fa$var$_copyFileFromHandles(srcHandle, dstFolderHandle, key));
        else if (srcHandle.kind === $bd5c47de9e98f4fa$require$Constants.KIND_DIRECTORY) {
            const childDirHandle = await $bd5c47de9e98f4fa$var$_mkdir(dstFolderHandle, key);
            if (recursive && childDirHandle) allDonePromises.push($bd5c47de9e98f4fa$var$_treeCopy(srcHandle, childDirHandle, recursive));
        }
    }
    await Promise.all(allDonePromises);
}
async function $bd5c47de9e98f4fa$var$_copyFolderWithHandle(srcFolderHandle, dst, srcFileName, callback, recursive) {
    try {
        let { handle: handle, path: path } = await $bd5c47de9e98f4fa$var$_getDestinationHandleForCopy(dst, srcFileName, $bd5c47de9e98f4fa$require$Constants.KIND_DIRECTORY);
        await $bd5c47de9e98f4fa$var$_treeCopy(srcFolderHandle, handle, recursive);
        callback(null, path);
    } catch (e) {
        callback(e);
    }
}
async function $bd5c47de9e98f4fa$var$copy(src, dst, callback, recursive = true) {
    let srcFile = globalObject.path.normalize(src);
    let srcFileName = globalObject.path.basename(srcFile);
    $bd5c47de9e98f4fa$require$Mounts.getHandleFromPath(srcFile, async (err, srcHandle)=>{
        if (err) callback(err);
        else if (srcHandle.kind === $bd5c47de9e98f4fa$require$Constants.KIND_FILE) return $bd5c47de9e98f4fa$var$_copyFileWithHandle(srcHandle, dst, srcFileName, callback);
        else if (srcHandle.kind === $bd5c47de9e98f4fa$require$Constants.KIND_DIRECTORY) return $bd5c47de9e98f4fa$var$_copyFolderWithHandle(srcHandle, dst, srcFileName, callback, recursive);
        else callback(new $bd5c47de9e98f4fa$require$Errors.EIO(`Cannot copy src: ${srcFile}`));
    });
}
async function $bd5c47de9e98f4fa$var$rename(oldPath, newPath, cb) {
    $bd5c47de9e98f4fa$var$copy(oldPath, newPath, (err)=>{
        if (err) cb(err);
        else setTimeout(()=>{
            $bd5c47de9e98f4fa$var$unlink(oldPath, cb);
        }, 0);
    });
}
function $bd5c47de9e98f4fa$var$mountNativeFolder(...args) {
    $bd5c47de9e98f4fa$require$Mounts.mountNativeFolder(...args);
}
function $bd5c47de9e98f4fa$var$refreshMountPoints() {
    $bd5c47de9e98f4fa$require$Mounts.refreshMountPoints();
}
const $bd5c47de9e98f4fa$var$BYTE_ARRAY_ENCODING = "byte-array";
const $bd5c47de9e98f4fa$var$NativeFS = {
    mountNativeFolder: $bd5c47de9e98f4fa$var$mountNativeFolder,
    refreshMountPoints: $bd5c47de9e98f4fa$var$refreshMountPoints,
    mkdir: $bd5c47de9e98f4fa$var$mkdir,
    readdir: $bd5c47de9e98f4fa$var$readdir,
    stat: $bd5c47de9e98f4fa$var$stat,
    readFile: $bd5c47de9e98f4fa$var$readFile,
    writeFile: $bd5c47de9e98f4fa$var$writeFile,
    unlink: $bd5c47de9e98f4fa$var$unlink,
    copy: $bd5c47de9e98f4fa$var$copy,
    rename: $bd5c47de9e98f4fa$var$rename,
    BYTE_ARRAY_ENCODING: $bd5c47de9e98f4fa$var$BYTE_ARRAY_ENCODING
};
$bd5c47de9e98f4fa$exports = {
    NativeFS: $bd5c47de9e98f4fa$var$NativeFS
};


var $e3f139c5065f0041$require$NativeFS = $bd5c47de9e98f4fa$exports.NativeFS;
var $d1f4f8cce920e9b9$exports = {};
/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see https://opensource.org/licenses/AGPL-3.0.
 *
 */ // jshint ignore: start
/*global __TAURI__*/ /*eslint no-console: 0*/ /*eslint strict: ["error", "global"]*/ /**
 * Opens the Tauri file picker asynchronously with given options. If options aren't provided, defaults to picking a single file.
 * If the `defaultPath` option isn't provided, it will default to the user's document directory.
 *
 * @param {Object} [options] - Configuration options for the Tauri file picker.
 * @param {boolean} [options.directory=false] - Whether it is directory or file to be picked.
 * @param {boolean} [options.multiple=false] - Whether to allow picking multiple files.
 * @param {string} [options.defaultPath] - Default directory to open in the file picker. Defaults to document directory if not provided.
 * @param {string} [options.title] - The title of the dialog window.
 * @param {Array<{name: string, extensions: string[]}>} [options.filters] - Extension filters for the file dialog.
 *   filters: [{
 *     name: 'Image',
 *     extensions: ['png', 'jpeg']
 *   }]
 *
 * @returns {Promise<null|string|Array<string>>} A promise that resolves to null if user dismissed the dialogue, a string (selected filepath), or an array of strings (multiple selected filepaths).
 */ async function $d1f4f8cce920e9b9$var$openTauriFilePickerAsync(options) {
    options = options || {
        multiple: false
    };
    if (!options.defaultPath) options.defaultPath = await __TAURI__.path.documentDir();
    return __TAURI__.dialog.open(options);
}
/**
 * Opens the Tauri file save dialogue asynchronously using the provided options.
 * If `defaultPath` option isn't provided, it defaults to the user's document directory.
 *
 * @async
 * @param {Object} [options] - Configuration options for the Tauri file save dialogue.
 * @param {string} [options.defaultPath] - Initial directory or file path. If it's a directory path, the dialog interface will change to that folder. If it's not an existing directory, the file name will be set to the dialog's file name input and the dialog will be set to the parent folder. If not provided, defaults to the user's document directory.
 * @param {string} [options.title] - The title of the dialog window.
 * @param {Array<{name: string, extensions: string[]}>} [options.filters] - Extension filters for the file dialog.
 *   filters: [{
 *     name: 'Image',
 *     extensions: ['png', 'jpeg']
 *   }]
 *
 * @returns {Promise<string|null>} A promise that resolves to the selected file path if a location was chosen, or null if the dialogue was cancelled.
 *
 * @example
 * openTauriFileSaveDialogueAsync({
 *     defaultPath: '/path/to/example.txt',
 *     filters: [{ name: 'Text Files', extensions: ['txt'] }]
 * }).then(savePath => {
 *     if (savePath) {
 *         console.log("File will be saved at:", savePath);
 *     } else {
 *         console.log("Save dialogue was cancelled");
 *     }
 * });
 */ async function $d1f4f8cce920e9b9$var$openTauriFileSaveDialogueAsync(options) {
    options = options || {};
    if (!options.defaultPath) options.defaultPath = await __TAURI__.path.documentDir();
    return __TAURI__.dialog.save(options);
}
const $d1f4f8cce920e9b9$var$TauriFS = {
    openTauriFilePickerAsync: $d1f4f8cce920e9b9$var$openTauriFilePickerAsync,
    openTauriFileSaveDialogueAsync: $d1f4f8cce920e9b9$var$openTauriFileSaveDialogueAsync
};
$d1f4f8cce920e9b9$exports = {
    TauriFS: $d1f4f8cce920e9b9$var$TauriFS
};


var $e3f139c5065f0041$require$TauriFS = $d1f4f8cce920e9b9$exports.TauriFS;

var $e3f139c5065f0041$require$Constants = $2ef5299e07961cfe$exports.Constants;

var $e3f139c5065f0041$require$Mounts = $d71a2f6bd42cb0cc$exports.Mounts;
var $1a1f52eca6bba4a3$exports = {};
/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see https://opensource.org/licenses/AGPL-3.0.
 *
 */ // jshint ignore: start
/*global globalObject, virtualfs*/ /*eslint no-console: 0*/ /*eslint strict: ["error", "global"]*/ let $1a1f52eca6bba4a3$var$_channel = null;
let $1a1f52eca6bba4a3$var$_watchListeners = [];
var $a2190d743807e7c8$exports = {};
// This is a slightly modified version of the minimatch library
// https://github.com/isaacs/minimatch
// (MIT-licensed, Copyright 2009-2011 Isaac Z. Schlueter)
//
// It has been modified to work properly with RequireJS and
// to export an fnmatch function adapted from the EditorConfig project:
// https://github.com/editorconfig/editorconfig-core-js/
// (MIT-licensed, Copyright 2012 EditorConfig Team)
$a2190d743807e7c8$var$minimatch.Minimatch = $a2190d743807e7c8$var$Minimatch;
function $a2190d743807e7c8$var$fnmatch(filepath, glob) {
    var matchOptions = {
        dot: true,
        noext: true
    };
    // brackets #7374: don't try to match base if a directory name is passed in
    if (filepath[filepath.length - 1] !== "/") matchOptions.matchBase = true;
    glob = glob.replace(/\*\*/g, "{*,**/**/**}");
    return $a2190d743807e7c8$var$minimatch(filepath, glob, matchOptions);
}
var $a2190d743807e7c8$var$LRU = function LRUCache() {
    // not quite an LRU, but still space-limited.
    var cache = {};
    var cnt = 0;
    this.set = function(k, v) {
        cnt++;
        if (cnt >= 100) cache = {};
        cache[k] = v;
    };
    this.get = function(k) {
        return cache[k];
    };
}, $a2190d743807e7c8$var$cache = $a2190d743807e7c8$var$minimatch.cache = new $a2190d743807e7c8$var$LRU({
    max: 100
}), $a2190d743807e7c8$var$GLOBSTAR = $a2190d743807e7c8$var$minimatch.GLOBSTAR = $a2190d743807e7c8$var$Minimatch.GLOBSTAR = {}, $a2190d743807e7c8$var$sigmund = function sigmund(obj) {
    return JSON.stringify(obj);
};
var $a2190d743807e7c8$var$path = {
    basename: function(f) {
        f = f.split(/[\/\\]/);
        var e = f.pop();
        if (!e) e = f.pop();
        return e;
    }
}, $a2190d743807e7c8$var$qmark = "[^/]", $a2190d743807e7c8$var$star = $a2190d743807e7c8$var$qmark + "*?", $a2190d743807e7c8$var$twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?", $a2190d743807e7c8$var$twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?", $a2190d743807e7c8$var$reSpecials = $a2190d743807e7c8$var$charSet("().*{}+?[]^$\\!");
// "abc" -> { a:true, b:true, c:true }
function $a2190d743807e7c8$var$charSet(s) {
    return s.split("").reduce(function(set, c) {
        set[c] = true;
        return set;
    }, {});
}
// normalizes slashes.
var $a2190d743807e7c8$var$slashSplit = /\/+/;
$a2190d743807e7c8$var$minimatch.monkeyPatch = $a2190d743807e7c8$var$monkeyPatch;
function $a2190d743807e7c8$var$monkeyPatch() {
    var desc = Object.getOwnPropertyDescriptor(String.prototype, "match");
    var orig = desc.value;
    desc.value = function(p) {
        if (p instanceof $a2190d743807e7c8$var$Minimatch) return p.match(this);
        return orig.call(this, p);
    };
    Object.defineProperty(String.prototype, desc);
}
$a2190d743807e7c8$var$minimatch.filter = $a2190d743807e7c8$var$filter;
function $a2190d743807e7c8$var$filter(pattern, options) {
    options = options || {};
    return function(p, i, list) {
        return $a2190d743807e7c8$var$minimatch(p, pattern, options);
    };
}
function $a2190d743807e7c8$var$ext(a, b) {
    a = a || {};
    b = b || {};
    var t = {};
    Object.keys(b).forEach(function(k) {
        t[k] = b[k];
    });
    Object.keys(a).forEach(function(k) {
        t[k] = a[k];
    });
    return t;
}
$a2190d743807e7c8$var$minimatch.defaults = function(def) {
    if (!def || !Object.keys(def).length) return $a2190d743807e7c8$var$minimatch;
    var orig = $a2190d743807e7c8$var$minimatch;
    var m = function minimatch(p, pattern, options) {
        return orig.minimatch(p, pattern, $a2190d743807e7c8$var$ext(def, options));
    };
    m.Minimatch = function Minimatch(pattern, options) {
        return new orig.Minimatch(pattern, $a2190d743807e7c8$var$ext(def, options));
    };
    return m;
};
$a2190d743807e7c8$var$Minimatch.defaults = function(def) {
    if (!def || !Object.keys(def).length) return $a2190d743807e7c8$var$Minimatch;
    return $a2190d743807e7c8$var$minimatch.defaults(def).Minimatch;
};
function $a2190d743807e7c8$var$minimatch(p, pattern, options) {
    if (typeof pattern !== "string") throw new TypeError("glob pattern string required");
    if (!options) options = {};
    // shortcut: comments match nothing.
    if (!options.nocomment && pattern.charAt(0) === "#") return false;
    // "" only matches ""
    if (pattern.trim() === "") return p === "";
    return new $a2190d743807e7c8$var$Minimatch(pattern, options).match(p);
}
function $a2190d743807e7c8$var$Minimatch(pattern, options) {
    if (!(this instanceof $a2190d743807e7c8$var$Minimatch)) return new $a2190d743807e7c8$var$Minimatch(pattern, options, $a2190d743807e7c8$var$cache);
    if (typeof pattern !== "string") throw new TypeError("glob pattern string required");
    if (!options) options = {};
    pattern = pattern.trim();
    // lru storage.
    // these things aren't particularly big, but walking down the string
    // and turning it into a regexp can get pretty costly.
    var cacheKey = pattern + "\n" + $a2190d743807e7c8$var$sigmund(options);
    var cached = $a2190d743807e7c8$var$minimatch.cache.get(cacheKey);
    if (cached) return cached;
    $a2190d743807e7c8$var$minimatch.cache.set(cacheKey, this);
    this.options = options;
    this.set = [];
    this.pattern = pattern;
    this.regexp = null;
    this.negate = false;
    this.comment = false;
    this.empty = false;
    // make the set of regexps etc.
    this.make();
}
$a2190d743807e7c8$var$Minimatch.prototype.make = $a2190d743807e7c8$var$make;
function $a2190d743807e7c8$var$make() {
    // don't do it more than once.
    if (this._made) return;
    var pattern = this.pattern;
    var options = this.options;
    // empty patterns and comments match nothing.
    if (!options.nocomment && pattern.charAt(0) === "#") {
        this.comment = true;
        return;
    }
    if (!pattern) {
        this.empty = true;
        return;
    }
    // step 1: figure out negation, etc.
    this.parseNegate();
    // step 2: expand braces
    var set = this.globSet = this.braceExpand();
    if (options.debug) console.error(this.pattern, set);
    // step 3: now we have a set, so turn each one into a series of path-portion
    // matching patterns.
    // These will be regexps, except in the case of "**", which is
    // set to the GLOBSTAR object for globstar behavior,
    // and will not contain any / characters
    set = this.globParts = set.map(function(s) {
        return s.split($a2190d743807e7c8$var$slashSplit);
    });
    if (options.debug) console.error(this.pattern, set);
    // glob --> regexps
    set = set.map(function(s, si, set) {
        return s.map(this.parse, this);
    }, this);
    if (options.debug) console.error(this.pattern, set);
    // filter out everything that didn't compile properly.
    set = set.filter(function(s) {
        return -1 === s.indexOf(false);
    });
    if (options.debug) console.error(this.pattern, set);
    this.set = set;
}
$a2190d743807e7c8$var$Minimatch.prototype.parseNegate = $a2190d743807e7c8$var$parseNegate;
function $a2190d743807e7c8$var$parseNegate() {
    var pattern = this.pattern, negate = false, options = this.options, negateOffset = 0;
    if (options.nonegate) return;
    for(var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++){
        negate = !negate;
        negateOffset++;
    }
    if (negateOffset) this.pattern = pattern.substr(negateOffset);
    this.negate = negate;
}
// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
$a2190d743807e7c8$var$minimatch.braceExpand = function(pattern, options) {
    return new $a2190d743807e7c8$var$Minimatch(pattern, options).braceExpand();
};
$a2190d743807e7c8$var$Minimatch.prototype.braceExpand = $a2190d743807e7c8$var$braceExpand;
function $a2190d743807e7c8$var$braceExpand(pattern, options) {
    options = options || this.options;
    pattern = typeof pattern === "undefined" ? this.pattern : pattern;
    if (typeof pattern === "undefined") throw new Error("undefined pattern");
    if (options.nobrace || !pattern.match(/\{.*\}/)) // shortcut. no need to expand.
    return [
        pattern
    ];
    var escaping = false;
    // examples and comments refer to this crazy pattern:
    // a{b,c{d,e},{f,g}h}x{y,z}
    // expected:
    // abxy
    // abxz
    // acdxy
    // acdxz
    // acexy
    // acexz
    // afhxy
    // afhxz
    // aghxy
    // aghxz
    // everything before the first \{ is just a prefix.
    // So, we pluck that off, and work with the rest,
    // and then prepend it to everything we find.
    if (pattern.charAt(0) !== "{") {
        // console.error(pattern)
        var prefix = null;
        for(var i = 0, l = pattern.length; i < l; i++){
            var c = pattern.charAt(i);
            // console.error(i, c)
            if (c === "\\") escaping = !escaping;
            else if (c === "{" && !escaping) {
                prefix = pattern.substr(0, i);
                break;
            }
        }
        // actually no sets, all { were escaped.
        if (prefix === null) // console.error("no sets")
        return [
            pattern
        ];
        var tail = $a2190d743807e7c8$var$braceExpand(pattern.substr(i), options);
        return tail.map(function(t) {
            return prefix + t;
        });
    }
    // now we have something like:
    // {b,c{d,e},{f,g}h}x{y,z}
    // walk through the set, expanding each part, until
    // the set ends.  then, we'll expand the suffix.
    // If the set only has a single member, then'll put the {} back
    // first, handle numeric sets, since they're easier
    var numset = pattern.match(/^\{(-?[0-9]+)\.\.(-?[0-9]+)\}/);
    if (numset) {
        // console.error("numset", numset[1], numset[2])
        var suf = $a2190d743807e7c8$var$braceExpand(pattern.substr(numset[0].length), options), start = +numset[1], end = +numset[2], inc = start > end ? -1 : 1, set = [];
        for(var i = start; i != end + inc; i += inc)// append all the suffixes
        for(var ii = 0, ll = suf.length; ii < ll; ii++)set.push(i + suf[ii]);
        return set;
    }
    // ok, walk through the set
    // We hope, somewhat optimistically, that there
    // will be a } at the end.
    // If the closing brace isn't found, then the pattern is
    // interpreted as braceExpand("\\" + pattern) so that
    // the leading \{ will be interpreted literally.
    var i = 1 // skip the \{
    , depth = 1, set = [], member = "", sawEnd = false, escaping = false;
    function addMember() {
        set.push(member);
        member = "";
    }
    // console.error("Entering for")
    FOR: for(i = 1, l = pattern.length; i < l; i++){
        var c = pattern.charAt(i);
        // console.error("", i, c)
        if (escaping) {
            escaping = false;
            member += "\\" + c;
        } else switch(c){
            case "\\":
                escaping = true;
                continue;
            case "{":
                depth++;
                member += "{";
                continue;
            case "}":
                depth--;
                // if this closes the actual set, then we're done
                if (depth === 0) {
                    addMember();
                    // pluck off the close-brace
                    i++;
                    break FOR;
                } else {
                    member += c;
                    continue;
                }
            case ",":
                if (depth === 1) addMember();
                else member += c;
                continue;
            default:
                member += c;
                continue;
        } // switch
         // else
    } // for
    // now we've either finished the set, and the suffix is
    // pattern.substr(i), or we have *not* closed the set,
    // and need to escape the leading brace
    if (depth !== 0) // console.error("didn't close", pattern)
    return $a2190d743807e7c8$var$braceExpand("\\" + pattern, options);
    // x{y,z} -> ["xy", "xz"]
    // console.error("set", set)
    // console.error("suffix", pattern.substr(i))
    var suf = $a2190d743807e7c8$var$braceExpand(pattern.substr(i), options);
    // ["b", "c{d,e}","{f,g}h"] ->
    //   [["b"], ["cd", "ce"], ["fh", "gh"]]
    var addBraces = set.length === 1;
    // console.error("set pre-expanded", set)
    set = set.map(function(p) {
        return $a2190d743807e7c8$var$braceExpand(p, options);
    });
    // console.error("set expanded", set)
    // [["b"], ["cd", "ce"], ["fh", "gh"]] ->
    //   ["b", "cd", "ce", "fh", "gh"]
    set = set.reduce(function(l, r) {
        return l.concat(r);
    });
    if (addBraces) set = set.map(function(s) {
        return "{" + s + "}";
    });
    // now attach the suffixes.
    var ret = [];
    for(var i = 0, l = set.length; i < l; i++)for(var ii = 0, ll = suf.length; ii < ll; ii++)ret.push(set[i] + suf[ii]);
    return ret;
}
// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
$a2190d743807e7c8$var$Minimatch.prototype.parse = $a2190d743807e7c8$var$parse;
var $a2190d743807e7c8$var$SUBPARSE = {};
function $a2190d743807e7c8$var$parse(pattern, isSub) {
    var options = this.options;
    // shortcuts
    if (!options.noglobstar && pattern === "**") return $a2190d743807e7c8$var$GLOBSTAR;
    if (pattern === "") return "";
    var re = "", hasMagic = !!options.nocase, escaping = false, patternListStack = [], plType, stateChar, inClass = false, reClassStart = -1, classStart = -1, patternStart = pattern.charAt(0) === "." ? "" // anything
     : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
    function clearStateChar() {
        if (stateChar) {
            // we had some state-tracking character
            // that wasn't consumed by this pass.
            switch(stateChar){
                case "*":
                    re += $a2190d743807e7c8$var$star;
                    hasMagic = true;
                    break;
                case "?":
                    re += $a2190d743807e7c8$var$qmark;
                    hasMagic = true;
                    break;
                default:
                    re += "\\" + stateChar;
                    break;
            }
            stateChar = false;
        }
    }
    for(var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++){
        if (options.debug) console.error("%s	%s %s %j", pattern, i, re, c);
        // skip over any that are escaped.
        if (escaping && $a2190d743807e7c8$var$reSpecials[c]) {
            re += "\\" + c;
            escaping = false;
            continue;
        }
        SWITCH: switch(c){
            case "/":
                // completely not allowed, even escaped.
                // Should already be path-split by now.
                return false;
            case "\\":
                clearStateChar();
                escaping = true;
                continue;
            // the various stateChar values
            // for the "extglob" stuff.
            case "?":
            case "*":
            case "+":
            case "@":
            case "!":
                if (options.debug) console.error("%s	%s %s %j <-- stateChar", pattern, i, re, c);
                // all of those are literals inside a class, except that
                // the glob [!a] means [^a] in regexp
                if (inClass) {
                    if (c === "!" && i === classStart + 1) c = "^";
                    re += c;
                    continue;
                }
                // if we already have a stateChar, then it means
                // that there was something like ** or +? in there.
                // Handle the stateChar, then proceed with this one.
                clearStateChar();
                stateChar = c;
                // if extglob is disabled, then +(asdf|foo) isn't a thing.
                // just clear the statechar *now*, rather than even diving into
                // the patternList stuff.
                if (options.noext) clearStateChar();
                continue;
            case "(":
                if (inClass) {
                    re += "(";
                    continue;
                }
                if (!stateChar) {
                    re += "\\(";
                    continue;
                }
                plType = stateChar;
                patternListStack.push({
                    type: plType,
                    start: i - 1,
                    reStart: re.length
                });
                // negation is (?:(?!js)[^/]*)
                re += stateChar === "!" ? "(?:(?!" : "(?:";
                stateChar = false;
                continue;
            case ")":
                if (inClass || !patternListStack.length) {
                    re += "\\)";
                    continue;
                }
                hasMagic = true;
                re += ")";
                plType = patternListStack.pop().type;
                // negation is (?:(?!js)[^/]*)
                // The others are (?:<pattern>)<type>
                switch(plType){
                    case "!":
                        re += "[^/]*?)";
                        break;
                    case "?":
                    case "+":
                    case "*":
                        re += plType;
                    case "@":
                        break; // the default anyway
                }
                continue;
            case "|":
                if (inClass || !patternListStack.length || escaping) {
                    re += "\\|";
                    escaping = false;
                    continue;
                }
                re += "|";
                continue;
            // these are mostly the same in regexp and glob
            case "[":
                // swallow any state-tracking char before the [
                clearStateChar();
                if (inClass) {
                    re += "\\" + c;
                    continue;
                }
                inClass = true;
                classStart = i;
                reClassStart = re.length;
                re += c;
                continue;
            case "]":
                //  a right bracket shall lose its special
                //  meaning and represent itself in
                //  a bracket expression if it occurs
                //  first in the list.  -- POSIX.2 2.8.3.2
                if (i === classStart + 1 || !inClass) {
                    re += "\\" + c;
                    escaping = false;
                    continue;
                }
                // finish up the class.
                hasMagic = true;
                inClass = false;
                re += c;
                continue;
            default:
                // swallow any state char that wasn't consumed
                clearStateChar();
                if (escaping) // no need
                escaping = false;
                else if ($a2190d743807e7c8$var$reSpecials[c] && !(c === "^" && inClass)) re += "\\";
                re += c;
        } // switch
    } // for
    // handle the case where we left a class open.
    // "[abc" is valid, equivalent to "\[abc"
    if (inClass) {
        // split where the last [ was, and escape it
        // this is a huge pita.  We now have to re-walk
        // the contents of the would-be class to re-translate
        // any characters that were passed through as-is
        var cs = pattern.substr(classStart + 1), sp = this.parse(cs, $a2190d743807e7c8$var$SUBPARSE);
        re = re.substr(0, reClassStart) + "\\[" + sp[0];
        hasMagic = hasMagic || sp[1];
    }
    // handle the case where we had a +( thing at the *end*
    // of the pattern.
    // each pattern list stack adds 3 chars, and we need to go through
    // and escape any | chars that were passed through as-is for the regexp.
    // Go through and escape them, taking care not to double-escape any
    // | chars that were already escaped.
    var pl;
    while(pl = patternListStack.pop()){
        var tail = re.slice(pl.reStart + 3);
        // maybe some even number of \, then maybe 1 \, followed by a |
        tail = tail.replace(/((?:\\{2})*)(\\?)\|/g, function(_, $1, $2) {
            if (!$2) // the | isn't already escaped, so escape it.
            $2 = "\\";
            // need to escape all those slashes *again*, without escaping the
            // one that we need for escaping the | character.  As it works out,
            // escaping an even number of slashes can be done by simply repeating
            // it exactly after itself.  That's why this trick works.
            //
            // I am sorry that you have to see this.
            return $1 + $1 + $2 + "|";
        });
        // console.error("tail=%j\n   %s", tail, tail)
        var t = pl.type === "*" ? $a2190d743807e7c8$var$star : pl.type === "?" ? $a2190d743807e7c8$var$qmark : "\\" + pl.type;
        hasMagic = true;
        re = re.slice(0, pl.reStart) + t + "\\(" + tail;
    }
    // handle trailing things that only matter at the very end.
    clearStateChar();
    if (escaping) // trailing \\
    re += "\\\\";
    // only need to apply the nodot start if the re starts with
    // something that could conceivably capture a dot
    var addPatternStart = false;
    switch(re.charAt(0)){
        case ".":
        case "[":
        case "(":
            addPatternStart = true;
    }
    // if the re is not "" at this point, then we need to make sure
    // it doesn't match against an empty path part.
    // Otherwise a/* will match a/, which it should not.
    if (re !== "" && hasMagic) re = "(?=.)" + re;
    if (addPatternStart) re = patternStart + re;
    // parsing just a piece of a larger pattern.
    if (isSub === $a2190d743807e7c8$var$SUBPARSE) return [
        re,
        hasMagic
    ];
    // skip the regexp for non-magical patterns
    // unescape anything in it, though, so that it'll be
    // an exact match against a file etc.
    if (!hasMagic) return $a2190d743807e7c8$var$globUnescape(pattern);
    var flags = options.nocase ? "i" : "", regExp = new RegExp("^" + re + "$", flags);
    regExp._glob = pattern;
    regExp._src = re;
    return regExp;
}
$a2190d743807e7c8$var$minimatch.makeRe = function(pattern, options) {
    return new $a2190d743807e7c8$var$Minimatch(pattern, options || {}).makeRe();
};
$a2190d743807e7c8$var$Minimatch.prototype.makeRe = $a2190d743807e7c8$var$makeRe;
function $a2190d743807e7c8$var$makeRe() {
    if (this.regexp || this.regexp === false) return this.regexp;
    // at this point, this.set is a 2d array of partial
    // pattern strings, or "**".
    //
    // It's better to use .match().  This function shouldn't
    // be used, really, but it's pretty convenient sometimes,
    // when you just want to work with a regex.
    var set = this.set;
    if (!set.length) return this.regexp = false;
    var options = this.options;
    var twoStar = options.noglobstar ? $a2190d743807e7c8$var$star : options.dot ? $a2190d743807e7c8$var$twoStarDot : $a2190d743807e7c8$var$twoStarNoDot, flags = options.nocase ? "i" : "";
    var re = set.map(function(pattern) {
        return pattern.map(function(p) {
            return p === $a2190d743807e7c8$var$GLOBSTAR ? twoStar : typeof p === "string" ? $a2190d743807e7c8$var$regExpEscape(p) : p._src;
        }).join("\\/");
    }).join("|");
    // must match entire pattern
    // ending in a * or ** will make it less strict.
    re = "^(?:" + re + ")$";
    // can match anything, as long as it's not this.
    if (this.negate) re = "^(?!" + re + ").*$";
    try {
        return this.regexp = new RegExp(re, flags);
    } catch (ex) {
        return this.regexp = false;
    }
}
$a2190d743807e7c8$var$minimatch.match = function(list, pattern, options) {
    var mm = new $a2190d743807e7c8$var$Minimatch(pattern, options);
    list = list.filter(function(f) {
        return mm.match(f);
    });
    if (options.nonull && !list.length) list.push(pattern);
    return list;
};
$a2190d743807e7c8$var$Minimatch.prototype.match = $a2190d743807e7c8$var$match;
function $a2190d743807e7c8$var$match(f, partial) {
    // console.error("match", f, this.pattern)
    // short-circuit in the case of busted things.
    // comments, etc.
    if (this.comment) return false;
    if (this.empty) return f === "";
    if (f === "/" && partial) return true;
    var options = this.options;
    // treat the test path as a set of pathparts.
    f = f.split($a2190d743807e7c8$var$slashSplit);
    if (options.debug) console.error(this.pattern, "split", f);
    // just ONE of the pattern sets in this.set needs to match
    // in order for it to be valid.  If negating, then just one
    // match means that we have failed.
    // Either way, return on the first hit.
    var set = this.set;
    // console.error(this.pattern, "set", set)
    for(var i = 0, l = set.length; i < l; i++){
        var pattern = set[i];
        var hit = this.matchOne(f, pattern, partial);
        if (hit) {
            if (options.flipNegate) return true;
            return !this.negate;
        }
    }
    // didn't get any hits.  this is success if it's a negative
    // pattern, failure otherwise.
    if (options.flipNegate) return false;
    return this.negate;
}
// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
$a2190d743807e7c8$var$Minimatch.prototype.matchOne = function(file, pattern, partial) {
    var options = this.options;
    if (options.debug) console.error("matchOne", {
        "this": this,
        file: file,
        pattern: pattern
    });
    if (options.matchBase && pattern.length === 1) file = $a2190d743807e7c8$var$path.basename(file.join("/")).split("/");
    if (options.debug) console.error("matchOne", file.length, pattern.length);
    for(var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++){
        if (options.debug) console.error("matchOne loop");
        var p = pattern[pi], f = file[fi];
        if (options.debug) console.error(pattern, p, f);
        // should be impossible.
        // some invalid regexp stuff in the set.
        if (p === false) return false;
        if (p === $a2190d743807e7c8$var$GLOBSTAR) {
            if (options.debug) console.error("GLOBSTAR", [
                pattern,
                p,
                f
            ]);
            // "**"
            // a/**/b/**/c would match the following:
            // a/b/x/y/z/c
            // a/x/y/z/b/c
            // a/b/x/b/x/c
            // a/b/c
            // To do this, take the rest of the pattern after
            // the **, and see if it would match the file remainder.
            // If so, return success.
            // If not, the ** "swallows" a segment, and try again.
            // This is recursively awful.
            //
            // a/**/b/**/c matching a/b/x/y/z/c
            // - a matches a
            // - doublestar
            //   - matchOne(b/x/y/z/c, b/**/c)
            //     - b matches b
            //     - doublestar
            //       - matchOne(x/y/z/c, c) -> no
            //       - matchOne(y/z/c, c) -> no
            //       - matchOne(z/c, c) -> no
            //       - matchOne(c, c) yes, hit
            var fr = fi, pr = pi + 1;
            if (pr === pl) {
                if (options.debug) console.error("** at the end");
                // a ** at the end will just swallow the rest.
                // We have found a match.
                // however, it will not swallow /.x, unless
                // options.dot is set.
                // . and .. are *never* matched by **, for explosively
                // exponential reasons.
                for(; fi < fl; fi++){
                    if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".") return false;
                }
                return true;
            }
            // ok, let's see if we can swallow whatever we can.
            WHILE: while(fr < fl){
                var swallowee = file[fr];
                if (options.debug) console.error("\nglobstar while", file, fr, pattern, pr, swallowee);
                // XXX remove this slice.  Just pass the start index.
                if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
                    if (options.debug) console.error("globstar found match!", fr, fl, swallowee);
                    // found a match.
                    return true;
                } else {
                    // can't swallow "." or ".." ever.
                    // can only swallow ".foo" when explicitly asked.
                    if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                        if (options.debug) console.error("dot detected!", file, fr, pattern, pr);
                        break WHILE;
                    }
                    // ** swallows a segment, and continue.
                    if (options.debug) console.error("globstar swallow a segment, and continue");
                    fr++;
                }
            }
            // no match was found.
            // However, in partial mode, we can't say this is necessarily over.
            // If there's more *pattern* left, then
            if (partial) {
                // ran out of file
                // console.error("\n>>> no match, partial?", file, fr, pattern, pr)
                if (fr === fl) return true;
            }
            return false;
        }
        // something other than **
        // non-magic patterns just have to match exactly
        // patterns with magic have been turned into regexps.
        var hit;
        if (typeof p === "string") {
            if (options.nocase) hit = f.toLowerCase() === p.toLowerCase();
            else hit = f === p;
            if (options.debug) console.error("string match", p, f, hit);
        } else {
            hit = f.match(p);
            if (options.debug) console.error("pattern match", p, f, hit);
        }
        if (!hit) return false;
    }
    // Note: ending in / means that we'll get a final ""
    // at the end of the pattern.  This can only match a
    // corresponding "" at the end of the file.
    // If the file ends in /, then it can only match a
    // a pattern that ends in /, unless the pattern just
    // doesn't have any more for it. But, a/b/ should *not*
    // match "a/b/*", even though "" matches against the
    // [^/]*? pattern, except in partial mode, where it might
    // simply not be reached yet.
    // However, a/b/ should still satisfy a/*
    // now either we fell off the end of the pattern, or we're done.
    if (fi === fl && pi === pl) // ran out of pattern and filename at the same time.
    // an exact hit!
    return true;
    else if (fi === fl) // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial;
    else if (pi === pl) {
        // ran out of pattern, still have file left.
        // this is only acceptable if we're on the very last
        // empty segment of a file with a trailing slash.
        // a/* should match a/b/
        var emptyFileEnd = fi === fl - 1 && file[fi] === "";
        return emptyFileEnd;
    }
    // should be unreachable.
    throw new Error("wtf?");
};
// replace stuff like \* with *
function $a2190d743807e7c8$var$globUnescape(s) {
    return s.replace(/\\(.)/g, "$1");
}
function $a2190d743807e7c8$var$regExpEscape(s) {
    return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
$a2190d743807e7c8$exports = $a2190d743807e7c8$var$fnmatch;


const $1a1f52eca6bba4a3$var$WATCH_EVENT_NOTIFICATION = "PHOENIX_WATCH_EVENT_NOTIFICATION";
const $1a1f52eca6bba4a3$var$WATCH_EVENT_CREATED = "created";
const $1a1f52eca6bba4a3$var$WATCH_EVENT_DELETED = "deleted";
const $1a1f52eca6bba4a3$var$WATCH_EVENT_CHANGED = "changed";
function $1a1f52eca6bba4a3$var$_setupBroadcastChannel() {
    if ($1a1f52eca6bba4a3$var$_channel) return;
    if (typeof BroadcastChannel === "undefined") {
        /* eslint no-console: 0 */ console.warn("BroadcastChannel not supported. File system watch events across tabs wont be synced.");
        return;
    }
    $1a1f52eca6bba4a3$var$_channel = new BroadcastChannel($1a1f52eca6bba4a3$var$WATCH_EVENT_NOTIFICATION);
}
function $1a1f52eca6bba4a3$var$_broadcastWatchEvent(event) {
    $1a1f52eca6bba4a3$var$_setupBroadcastChannel();
    $1a1f52eca6bba4a3$var$_channel.postMessage(event);
}
function $1a1f52eca6bba4a3$var$_isAnIgnoredPath(path, ignoreGlobList) {
    if (ignoreGlobList && ignoreGlobList.length > 0) for (const glob of ignoreGlobList){
        if ($a2190d743807e7c8$exports(path, glob)) return true;
    }
    return false;
}
function $1a1f52eca6bba4a3$var$_isSameOrSubDirectory(parent, child) {
    return !globalObject.path.relative(parent, child).startsWith("..");
}
// event{ path, eventName}
function $1a1f52eca6bba4a3$var$_processFsWatchEvent(event, broadcast = true) {
    if (broadcast) $1a1f52eca6bba4a3$var$_broadcastWatchEvent(event);
    for (const listener of $1a1f52eca6bba4a3$var$_watchListeners)if (listener.callback && $1a1f52eca6bba4a3$var$_isSameOrSubDirectory(listener.path, event.path) && !$1a1f52eca6bba4a3$var$_isAnIgnoredPath(event.path, listener.ignoreGlobList)) listener.callback(event.event, event.parentDirPath, event.entryName, event.path);
}
function $1a1f52eca6bba4a3$var$_listenToExternalFsWatchEvents() {
    $1a1f52eca6bba4a3$var$_setupBroadcastChannel();
    $1a1f52eca6bba4a3$var$_channel.onmessage = async function(event) {
        if (virtualfs.debugMode) console.log("External fs watch event: ", event.data);
        $1a1f52eca6bba4a3$var$_processFsWatchEvent(event.data, false);
    };
}
function $1a1f52eca6bba4a3$var$watch(path, ignoreGlobList, changeCallback, callback) {
    if (changeCallback) $1a1f52eca6bba4a3$var$_watchListeners.push({
        path: path,
        ignoreGlobList: ignoreGlobList,
        callback: changeCallback
    });
    callback();
}
function $1a1f52eca6bba4a3$var$_triggerEvent(path, eventType) {
    let pathLib = globalObject.path;
    path = pathLib.normalize(path);
    let event = {
        event: eventType,
        parentDirPath: pathLib.normalize(`${pathLib.dirname(path)}/`),
        entryName: pathLib.basename(path),
        path: path
    };
    $1a1f52eca6bba4a3$var$_processFsWatchEvent(event);
}
function $1a1f52eca6bba4a3$var$reportUnlinkEvent(path) {
    $1a1f52eca6bba4a3$var$_triggerEvent(path, $1a1f52eca6bba4a3$var$WATCH_EVENT_DELETED);
}
function $1a1f52eca6bba4a3$var$reportChangeEvent(path) {
    $1a1f52eca6bba4a3$var$_triggerEvent(path, $1a1f52eca6bba4a3$var$WATCH_EVENT_CHANGED);
}
function $1a1f52eca6bba4a3$var$reportCreateEvent(path) {
    $1a1f52eca6bba4a3$var$_triggerEvent(path, $1a1f52eca6bba4a3$var$WATCH_EVENT_CREATED);
}
function $1a1f52eca6bba4a3$var$unwatch(path, callback) {
    $1a1f52eca6bba4a3$var$_watchListeners = $1a1f52eca6bba4a3$var$_watchListeners.filter(function(item) {
        return item.path !== path;
    });
    callback();
}
function $1a1f52eca6bba4a3$var$unwatchAll(callback) {
    $1a1f52eca6bba4a3$var$_watchListeners = [];
    callback();
}
$1a1f52eca6bba4a3$var$_listenToExternalFsWatchEvents();
const $1a1f52eca6bba4a3$var$FsWatch = {
    watch: $1a1f52eca6bba4a3$var$watch,
    unwatch: $1a1f52eca6bba4a3$var$unwatch,
    unwatchAll: $1a1f52eca6bba4a3$var$unwatchAll,
    reportUnlinkEvent: $1a1f52eca6bba4a3$var$reportUnlinkEvent,
    reportChangeEvent: $1a1f52eca6bba4a3$var$reportChangeEvent,
    reportCreateEvent: $1a1f52eca6bba4a3$var$reportCreateEvent
};
$1a1f52eca6bba4a3$exports = {
    FsWatch: $1a1f52eca6bba4a3$var$FsWatch
};


var $e3f139c5065f0041$require$FsWatch = $1a1f52eca6bba4a3$exports.FsWatch;
var $b77f34d02b78ab8d$exports = {};
/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see https://opensource.org/licenses/AGPL-3.0.
 *
 */ // jshint ignore: start
/*global fs, globalObject*/ /*eslint no-console: 0*/ /*eslint strict: ["error", "global"]*/ 
var $b77f34d02b78ab8d$require$ERR_CODES = $ee841df9a5ce9c95$exports.ERR_CODES;
var $b77f34d02b78ab8d$require$Errors = $ee841df9a5ce9c95$exports.Errors;
const $b77f34d02b78ab8d$var$ERROR_CODES = $b77f34d02b78ab8d$require$ERR_CODES.ERROR_CODES;
function $b77f34d02b78ab8d$var$_stat(path) {
    return new Promise((resolve, reject)=>{
        fs.stat(path, async (err, stat)=>{
            if (err && err.code === $b77f34d02b78ab8d$var$ERROR_CODES.ENOENT) resolve(null);
            else if (err) reject(err);
            else resolve(stat);
        });
    });
}
function $b77f34d02b78ab8d$var$_mkdirIfNotPresent(path) {
    return new Promise((resolve, reject)=>{
        fs.mkdir(path, async (err)=>{
            err && err.code !== $b77f34d02b78ab8d$var$ERROR_CODES.EEXIST ? reject(err) : resolve();
        });
    });
}
function $b77f34d02b78ab8d$var$_readDir(path) {
    return new Promise((resolve, reject)=>{
        fs.readdir(path, (err, listing)=>{
            if (err) reject(err);
            else resolve(listing);
        });
    });
}
function $b77f34d02b78ab8d$var$_copyFileContents(src, dst) {
    return new Promise((resolve, reject)=>{
        fs.readFile(src, (err, data)=>{
            if (err) reject(err);
            else fs.writeFile(dst, data, function(writeErr) {
                writeErr ? reject(writeErr) : resolve();
            });
        });
    });
}
async function $b77f34d02b78ab8d$var$_copyFile(srcFile, dst) {
    let dstStat = await $b77f34d02b78ab8d$var$_stat(dst);
    if (!dstStat) {
        let parentDir = globalObject.path.dirname(dst);
        let dstFileName = globalObject.path.basename(dst);
        dstStat = await $b77f34d02b78ab8d$var$_stat(parentDir);
        if (dstStat && dstStat.isDirectory()) {
            let dstFilePath = `${parentDir}/${dstFileName}`;
            await $b77f34d02b78ab8d$var$_copyFileContents(srcFile, dstFilePath);
            return dstFilePath;
        } else throw new $b77f34d02b78ab8d$require$Errors.EIO(`_copyFile Cannot create destination file: ${dst}`);
    }
    let srcFileName = globalObject.path.basename(srcFile);
    if (dstStat && dstStat.isDirectory()) {
        let dstFilePath = `${dst}/${srcFileName}`;
        await $b77f34d02b78ab8d$var$_copyFileContents(srcFile, dstFilePath);
        return dstFilePath;
    } else if (dstStat && dstStat.isFile()) throw new $b77f34d02b78ab8d$require$Errors.EEXIST(`_copyFile Destination file already exists: ${dst}`);
    else throw new $b77f34d02b78ab8d$require$Errors.EIO(`_copyFile Cannot copy file, unknown destination: ${srcFile} to ${dst}`);
}
async function $b77f34d02b78ab8d$var$_copyTree(src, dst) {
    let srcEntries = await $b77f34d02b78ab8d$var$_readDir(src);
    for (let entry of srcEntries){
        let entryPath = `${src}/${entry}`;
        let dstPath = `${dst}/${entry}`;
        let srcStat = await $b77f34d02b78ab8d$var$_stat(entryPath);
        if (srcStat.isFile()) await $b77f34d02b78ab8d$var$_copyFileContents(entryPath, dstPath);
        else {
            await $b77f34d02b78ab8d$var$_mkdirIfNotPresent(dstPath);
            await $b77f34d02b78ab8d$var$_copyTree(entryPath, dstPath);
        }
    }
}
async function $b77f34d02b78ab8d$var$_copyFolder(srcFolder, dst) {
    let dstStat = await $b77f34d02b78ab8d$var$_stat(dst);
    if (dstStat && dstStat.isFile()) throw new $b77f34d02b78ab8d$require$Errors.EEXIST(`Destination file already exists: ${dst}`);
    else if (dstStat && dstStat.isDirectory()) {
        let destSubFolderPath = `${dst}/${globalObject.path.basename(srcFolder)}`;
        dstStat = await $b77f34d02b78ab8d$var$_stat(destSubFolderPath);
        if (dstStat) throw new $b77f34d02b78ab8d$require$Errors.EEXIST(`Destination folder already exists: ${destSubFolderPath}`);
        await $b77f34d02b78ab8d$var$_mkdirIfNotPresent(destSubFolderPath);
        await $b77f34d02b78ab8d$var$_copyTree(srcFolder, destSubFolderPath);
        return destSubFolderPath;
    } else {
        await $b77f34d02b78ab8d$var$_mkdirIfNotPresent(dst);
        await $b77f34d02b78ab8d$var$_copyTree(srcFolder, dst);
        return dst;
    }
}
async function $b77f34d02b78ab8d$var$copy(src, dst, callback) {
    try {
        let srcStat = await $b77f34d02b78ab8d$var$_stat(src);
        if (!srcStat) {
            callback(new $b77f34d02b78ab8d$require$Errors.EIO(`Cannot copy src: ${src}`));
            return;
        }
        if (srcStat.isFile()) {
            let copiedPath = await $b77f34d02b78ab8d$var$_copyFile(src, dst);
            callback(null, copiedPath);
        } else if (srcStat.isDirectory()) {
            let copiedPath = await $b77f34d02b78ab8d$var$_copyFolder(src, dst);
            callback(null, copiedPath);
        }
    } catch (e) {
        callback(new $b77f34d02b78ab8d$require$Errors.EIO(`${e}: Cannot copy src: ${src} to ${dst}`));
    }
}
function $b77f34d02b78ab8d$var$globalCopy(src, dst, cb) {
    $b77f34d02b78ab8d$var$copy(globalObject.path.normalize(src), globalObject.path.normalize(dst), cb);
}
$b77f34d02b78ab8d$exports = {
    globalCopy: $b77f34d02b78ab8d$var$globalCopy
};


var $e3f139c5065f0041$require$globalCopy = $b77f34d02b78ab8d$exports.globalCopy;
let $e3f139c5065f0041$var$filerLib = null;
let $e3f139c5065f0041$var$filerShell = null;
/**
 * Offers functionality similar to mkdir -p
 *
 * Asynchronous operation. No arguments other than a possible exception
 * are given to the completion callback.
 */ function $e3f139c5065f0041$var$_mkdir_p(fsLib, path, mode, callback, _position) {
    const osSep = "/";
    const parts = $e3f139c5065f0041$var$filerLib.path.normalize(path).split(osSep);
    mode = mode || $07c3e2276d973f13$exports.umask();
    _position = _position || 0;
    if (_position >= parts.length) return callback(null);
    var directory = parts.slice(0, _position + 1).join(osSep) || osSep;
    fsLib.stat(directory, function(err) {
        if (err === null) $e3f139c5065f0041$var$_mkdir_p(fsLib, path, mode, callback, _position + 1);
        else fsLib.mkdir(directory, mode, function(error) {
            if (error && error.code !== "EEXIST") return callback(error);
            else $e3f139c5065f0041$var$_mkdir_p(fsLib, path, mode, callback, _position + 1);
        });
    });
}
function $e3f139c5065f0041$var$_ensure_mount_directory() {
    $e3f139c5065f0041$var$fileSystemLib.mkdirs($e3f139c5065f0041$require$Constants.MOUNT_POINT_ROOT);
    $e3f139c5065f0041$require$NativeFS.refreshMountPoints();
}
function $e3f139c5065f0041$var$_getFirstFunctionIndex(argsArray) {
    for(let i = 0; i < argsArray.length; i++){
        if (typeof argsArray[i] === "function") return i;
    }
    return -1;
}
function $e3f139c5065f0041$var$_isSubPathOf(dir, subDir) {
    const relative = $e3f139c5065f0041$var$filerLib.path.relative(dir, subDir);
    return relative && !relative.startsWith("..") && !$e3f139c5065f0041$var$filerLib.path.isAbsolute(relative);
}
const $e3f139c5065f0041$var$fileSystemLib = {
    mountNativeFolder: async function(...args) {
        return $e3f139c5065f0041$require$NativeFS.mountNativeFolder(...args);
    },
    openTauriFilePickerAsync: function(options) {
        return $e3f139c5065f0041$require$TauriFS.openTauriFilePickerAsync(options);
    },
    openTauriFileSaveDialogueAsync: function(options) {
        return $e3f139c5065f0041$require$TauriFS.openTauriFileSaveDialogueAsync(options);
    },
    readdir: function(...args) {
        let path = args[0];
        if ($e3f139c5065f0041$require$Mounts.isMountPath(path) || $e3f139c5065f0041$require$Mounts.isMountSubPath(path)) return $e3f139c5065f0041$require$NativeFS.readdir(...args);
        return $e3f139c5065f0041$var$filerLib.fs.readdir(...args);
    },
    stat: function(...args) {
        let path = args[0];
        if ($e3f139c5065f0041$require$Mounts.isMountSubPath(path)) return $e3f139c5065f0041$require$NativeFS.stat(...args);
        return $e3f139c5065f0041$var$filerLib.fs.stat(...args);
    },
    readFile: function(...args) {
        let path = args[0];
        if ($e3f139c5065f0041$require$Mounts.isMountSubPath(path)) return $e3f139c5065f0041$require$NativeFS.readFile(...args);
        return $e3f139c5065f0041$var$filerLib.fs.readFile(...args);
    },
    writeFile: function(...args) {
        let path = args[0];
        function callbackInterceptor(...interceptedArgs) {
            let err = interceptedArgs.length >= 1 ? interceptedArgs[0] : null;
            if (!err) $e3f139c5065f0041$require$FsWatch.reportChangeEvent(path);
            if (args.originalCallback) args.originalCallback(...interceptedArgs);
        }
        let callbackIndex = $e3f139c5065f0041$var$_getFirstFunctionIndex(args);
        if (callbackIndex !== -1) {
            args.originalCallback = args[callbackIndex];
            args[callbackIndex] = callbackInterceptor;
        }
        if ($e3f139c5065f0041$require$Mounts.isMountSubPath(path)) return $e3f139c5065f0041$require$NativeFS.writeFile(...args);
        return $e3f139c5065f0041$var$filerLib.fs.writeFile(...args);
    },
    mkdir: function(...args) {
        let path = args[0];
        function callbackInterceptor(...interceptedArgs) {
            let err = interceptedArgs.length >= 1 ? interceptedArgs[0] : null;
            if (!err) $e3f139c5065f0041$require$FsWatch.reportCreateEvent(path);
            if (args.originalCallback) args.originalCallback(...interceptedArgs);
        }
        let callbackIndex = $e3f139c5065f0041$var$_getFirstFunctionIndex(args);
        if (callbackIndex !== -1) {
            args.originalCallback = args[callbackIndex];
            args[callbackIndex] = callbackInterceptor;
        }
        if ($e3f139c5065f0041$require$Mounts.isMountSubPath(path)) return $e3f139c5065f0041$require$NativeFS.mkdir(...args);
        return $e3f139c5065f0041$var$filerLib.fs.mkdir(...args);
    },
    rename: function(oldPath, newPath, cb) {
        function callbackInterceptor(...args) {
            let err = args.length >= 1 ? args[0] : null;
            if (!err) {
                $e3f139c5065f0041$require$FsWatch.reportUnlinkEvent(oldPath);
                $e3f139c5065f0041$require$FsWatch.reportCreateEvent(newPath);
            }
            if (cb) cb(...args);
        }
        if ($e3f139c5065f0041$var$_isSubPathOf(oldPath, newPath)) {
            callbackInterceptor(new $e3f139c5065f0041$require$Errors.EINVAL(`Error renaming: ${newPath} cannot be a subpath of ${oldPath}`));
            return;
        }
        if ($e3f139c5065f0041$require$Mounts.isMountPath(oldPath) || $e3f139c5065f0041$require$Mounts.isMountPath(newPath)) throw new $e3f139c5065f0041$require$Errors.EPERM("Mount root directory cannot be deleted.");
        else if ($e3f139c5065f0041$require$Mounts.isMountSubPath(oldPath) && $e3f139c5065f0041$require$Mounts.isMountSubPath(newPath)) return $e3f139c5065f0041$require$NativeFS.rename(oldPath, newPath, callbackInterceptor);
        return $e3f139c5065f0041$var$filerLib.fs.rename(oldPath, newPath, callbackInterceptor);
    },
    unlink: function(path, cb) {
        function callbackInterceptor(...args) {
            let err = args.length >= 1 ? args[0] : null;
            if (!err) $e3f139c5065f0041$require$FsWatch.reportUnlinkEvent(path);
            if (cb) cb(...args);
        }
        if ($e3f139c5065f0041$require$Mounts.isMountPath(path)) {
            callbackInterceptor(new $e3f139c5065f0041$require$Errors.EPERM("Mount root directory cannot be deleted."));
            return;
        } else if ($e3f139c5065f0041$require$Mounts.isMountSubPath(path)) return $e3f139c5065f0041$require$NativeFS.unlink(path, callbackInterceptor);
        if (typeof path !== "string") {
            callbackInterceptor(new $e3f139c5065f0041$require$Errors.EINVAL("Invalid arguments."));
            return;
        }
        return $e3f139c5065f0041$var$filerShell.rm(path, {
            recursive: true
        }, callbackInterceptor);
    },
    copy: function(src, dst, cb) {
        function callbackInterceptor(...args) {
            let err = args.length >= 1 ? args[0] : null;
            if (!err) $e3f139c5065f0041$require$FsWatch.reportCreateEvent(dst);
            if (cb) cb(...args);
        }
        if ($e3f139c5065f0041$var$_isSubPathOf(src, dst)) {
            callbackInterceptor(new $e3f139c5065f0041$require$Errors.EINVAL(`Error copying: ${dst} cannot be a subpath of ${src}`));
            return;
        }
        // we have two implementation here even though the globalCopy fn is capable of copying anywhere. Native has its
        // own impl to prevent large number of file node io in fs access impl.
        if ($e3f139c5065f0041$require$Mounts.isMountSubPath(src) && $e3f139c5065f0041$require$Mounts.isMountSubPath(dst)) return $e3f139c5065f0041$require$NativeFS.copy(src, dst, callbackInterceptor);
        else return $e3f139c5065f0041$require$globalCopy(src, dst, callbackInterceptor);
    },
    showSaveDialog: function() {
        throw new $e3f139c5065f0041$require$Errors.ENOSYS("Phoenix fs showSaveDialog function not yet supported.");
    },
    watch: function(...args) {
        return $e3f139c5065f0041$require$FsWatch.watch(...args);
    },
    unwatch: function(...args) {
        return $e3f139c5065f0041$require$FsWatch.unwatch(...args);
    },
    unwatchAll: function(...args) {
        return $e3f139c5065f0041$require$FsWatch.unwatchAll(...args);
    },
    moveToTrash: function() {
        throw new $e3f139c5065f0041$require$Errors.ENOSYS("Phoenix fs moveToTrash function not yet supported.");
    },
    mkdirs: function(path, mode, recursive, callback) {
        if (typeof recursive !== "boolean") {
            callback = recursive;
            recursive = false;
        }
        if (typeof callback !== "function") callback = function() {
        // Do Nothing
        };
        if (!recursive) $e3f139c5065f0041$var$fileSystemLib.mkdir(path, mode, callback);
        else $e3f139c5065f0041$var$_mkdir_p($e3f139c5065f0041$var$fileSystemLib, path, mode, callback);
    },
    BYTE_ARRAY_ENCODING: $e3f139c5065f0041$require$NativeFS.BYTE_ARRAY_ENCODING,
    ERR_NOT_FOUND: $e3f139c5065f0041$require$ERR_CODES.ERROR_CODES.ENOENT,
    ERR_EISDIR: $e3f139c5065f0041$require$ERR_CODES.ERROR_CODES.EISDIR,
    ERR_EINVAL: $e3f139c5065f0041$require$ERR_CODES.ERROR_CODES.EINVAL,
    ERR_FILE_EXISTS: $e3f139c5065f0041$require$ERR_CODES.ERROR_CODES.EEXIST
};
$e3f139c5065f0041$var$fileSystemLib.copyFile = $e3f139c5065f0041$var$fileSystemLib.copy;
$e3f139c5065f0041$var$fileSystemLib.name = "phoenixFS";
function $e3f139c5065f0041$var$initFsLib(FilerLib) {
    $e3f139c5065f0041$var$filerLib = FilerLib;
    $e3f139c5065f0041$var$filerShell = new $e3f139c5065f0041$var$filerLib.fs.Shell();
    globalObject.path = FilerLib.path;
    globalObject.fs = $e3f139c5065f0041$var$fileSystemLib;
    $e3f139c5065f0041$var$_ensure_mount_directory();
}
$e3f139c5065f0041$exports = {
    initFsLib: $e3f139c5065f0041$var$initFsLib
};


var $3132870559d60e53$require$initFsLib = $e3f139c5065f0041$exports.initFsLib;
$3132870559d60e53$require$initFsLib($8adf1cfaed2eb5b1$exports);

})();
//# sourceMappingURL=virtualfs.js.map
