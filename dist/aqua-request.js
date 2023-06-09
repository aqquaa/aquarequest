/**
   * Aquarequest
   * version: 1.0.9
   * 
   * Copyright (c) itsrav.dev
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function Q(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Ne(e) {
  return e && Object.keys(e).length === 0;
}
function Gt(e) {
  return e instanceof File || e instanceof Blob || e instanceof FileList && e.length > 0 || e instanceof FormData && Array.from(e.values()).some((t) => Gt(t)) || typeof e == "object" && e !== null && Object.values(e).some((t) => Gt(t));
}
function ve(e, t = new FormData(), n = null) {
  e = e || {};
  for (const r in e)
    Object.prototype.hasOwnProperty.call(e, r) && ze(t, Me(n, r), e[r]);
  return t;
}
function Me(e, t) {
  return e ? e + "[" + t + "]" : t;
}
function ze(e, t, n) {
  if (Array.isArray(n))
    return Array.from(n.keys()).forEach((r) => ze(e, Me(t, r.toString()), n[r]));
  if (n instanceof Date)
    return e.append(t, n.toISOString());
  if (n instanceof File)
    return e.append(t, n, n.name);
  if (n instanceof Blob)
    return e.append(t, n);
  if (typeof n == "boolean")
    return e.append(t, n ? "1" : "0");
  if (typeof n == "string")
    return e.append(t, n);
  if (typeof n == "number")
    return e.append(t, `${n}`);
  if (n == null)
    return e.append(t, "");
  ve(n, e, t);
}
function z(e, t = {}) {
  document.dispatchEvent(
    new CustomEvent(e, {
      detail: t,
      bubbles: !0,
      composed: !0,
      cancelable: !0
    })
  );
}
const X = Object.freeze({
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete"
}), ke = Object.freeze({
  busy: !1,
  response: null,
  result: null,
  cancelled: !1,
  statusCode: null,
  downloadProgress: 0,
  uploadProgress: 0
}), y = Object.freeze({
  BEFORE: "onBefore",
  START: "onStart",
  DOWNLOAD: "onDownload",
  UPLOAD: "onUpload",
  CANCEL: "onCancel",
  STATUS_CODE: "onStatusCode",
  SUCCESS: "onSuccess",
  ERROR: "onError",
  FINISH: "onFinish"
}), v = Object.freeze({
  BEFORE: "aquarequest:onBefore",
  START: "aquarequest:onStart",
  DOWNLOAD: "aquarequest:onDownload",
  UPLOAD: "aquarequest:onUpload",
  CANCEL: "aquarequest:onCancel",
  SUCCESS: "aquarequest:onSuccess",
  ERROR: "aquarequest:onError",
  FINISH: "aquarequest:onFinish"
});
class zr {
  constructor() {
    this.state = Object.assign({}, ke);
  }
  [y.BEFORE]() {
  }
  [y.START]() {
    this.state.busy = !0;
  }
  [y.STATUS_CODE](t) {
    this.state.statusCode = t;
  }
  [y.SUCCESS](t) {
    this.state.response = t, this.state.result = t.data;
  }
  [y.CANCEL](t) {
    this.state.cancelled = !0;
  }
  [y.UPLOAD](t) {
    let n = t == null ? void 0 : t.total, r = t == null ? void 0 : t.loaded;
    if (!n || !r)
      return;
    let i = Math.round(r / n * 100);
    this.state.uploadProgress = i;
  }
  [y.DOWNLOAD](t) {
    let n = t == null ? void 0 : t.total, r = t == null ? void 0 : t.loaded;
    if (!n || !r)
      return;
    let i = Math.round(r / n * 100);
    this.state.downloadProgress = i;
  }
  [y.ERROR](t) {
    this.state.response = t;
  }
  [y.FINISH]() {
    this.state.busy = !1;
  }
}
class kr {
  constructor(t) {
    this.mainContext = t, this.stateHub = new zr();
  }
  [y.BEFORE](t) {
    z(v.BEFORE, t), this.stateHub[y.BEFORE].call(this.mainContext);
  }
  [y.START](t) {
    z(v.START, t), this.stateHub[y.START].call(this.mainContext, t);
  }
  [y.STATUS_CODE](t) {
    this.stateHub[y.STATUS_CODE].call(this.mainContext, t);
  }
  [y.SUCCESS](t) {
    z(v.SUCCESS, t), this.stateHub[y.SUCCESS].call(this.mainContext, t);
  }
  [y.CANCEL](t) {
    z(v.CANCEL, t), this.stateHub[y.CANCEL].call(this.mainContext, t);
  }
  [y.UPLOAD](t) {
    z(v.UPLOAD, t), this.stateHub[y.UPLOAD].call(this.mainContext, t);
  }
  [y.DOWNLOAD](t) {
    z(v.DOWNLOAD, t), this.stateHub[y.DOWNLOAD].call(this.mainContext, t);
  }
  [y.ERROR](t) {
    z(v.ERROR, t), this.stateHub[y.ERROR].call(this.mainContext, t);
  }
  [y.FINISH]() {
    z(v.FINISH, {}), this.mainContext._cancelToken = null, this.stateHub[y.FINISH].call(this.mainContext);
  }
}
class Wr {
  constructor(t) {
    this.hook = new kr(t), this.handlers = {};
  }
  registerInternalHooks() {
    const t = y;
    this.register(t.BEFORE, this.hook[t.BEFORE].bind(this.hook)), this.register(t.START, this.hook[t.START].bind(this.hook)), this.register(t.STATUS_CODE, this.hook[t.STATUS_CODE].bind(this.hook)), this.register(t.CANCEL, this.hook[t.CANCEL].bind(this.hook)), this.register(t.UPLOAD, this.hook[t.UPLOAD].bind(this.hook)), this.register(t.DOWNLOAD, this.hook[t.DOWNLOAD].bind(this.hook)), this.register(t.SUCCESS, this.hook[t.SUCCESS].bind(this.hook)), this.register(t.ERROR, this.hook[t.ERROR].bind(this.hook)), this.register(t.FINISH, this.hook[t.FINISH].bind(this.hook));
  }
  registerUserHooks(t) {
    const n = y, r = this;
    t.forEach((i) => {
      Object.values(y).forEach((a) => {
        Q(i, a) || (i[a] = () => {
        });
      }), r.register(n.BEFORE, i[n.BEFORE]), r.register(n.START, i[n.START]), r.register(n.STATUS_CODE, i[n.STATUS_CODE]), r.register(n.CANCEL, i[n.CANCEL]), r.register(n.UPLOAD, i[n.UPLOAD]), r.register(n.DOWNLOAD, i[n.DOWNLOAD]), r.register(n.SUCCESS, i[n.SUCCESS]), r.register(n.ERROR, i[n.ERROR]), r.register(n.FINISH, i[n.FINISH]);
    });
  }
  register(t, n) {
    this.handlers || (this.handlers = {}), this.handlers[t] || (this.handlers[t] = []), this.handlers[t].push(n);
  }
  off(t, n) {
    var i;
    let r = (i = this.handlers) == null ? void 0 : i[t];
    if (r)
      for (let a = 0; a < r.length; a++)
        r[a] === n && r.splice(a--, 1);
  }
  run(t, ...n) {
    var r;
    (r = this.handlers) != null && r[t] && this.handlers[t].forEach((i) => i.apply(this, n));
  }
}
var yt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function $r(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Tt = { exports: {} };
Tt.exports;
(function(e, t) {
  var n = 200, r = "__lodash_hash_undefined__", i = 800, a = 16, c = 9007199254740991, d = "[object Arguments]", b = "[object Array]", f = "[object AsyncFunction]", p = "[object Boolean]", E = "[object Date]", N = "[object Error]", A = "[object Function]", m = "[object GeneratorFunction]", S = "[object Map]", L = "[object Number]", D = "[object Null]", I = "[object Object]", G = "[object Proxy]", Dt = "[object RegExp]", ln = "[object Set]", fn = "[object String]", dn = "[object Undefined]", hn = "[object WeakMap]", pn = "[object ArrayBuffer]", mn = "[object DataView]", bn = "[object Float32Array]", yn = "[object Float64Array]", En = "[object Int8Array]", Sn = "[object Int16Array]", gn = "[object Int32Array]", On = "[object Uint8Array]", Tn = "[object Uint8ClampedArray]", An = "[object Uint16Array]", wn = "[object Uint32Array]", Rn = /[\\^$.*+?()[\]{}|]/g, _n = /^\[object .+?Constructor\]$/, Cn = /^(?:0|[1-9]\d*)$/, R = {};
  R[bn] = R[yn] = R[En] = R[Sn] = R[gn] = R[On] = R[Tn] = R[An] = R[wn] = !0, R[d] = R[b] = R[pn] = R[p] = R[mn] = R[E] = R[N] = R[A] = R[S] = R[L] = R[I] = R[Dt] = R[ln] = R[fn] = R[hn] = !1;
  var se = typeof yt == "object" && yt && yt.Object === Object && yt, Nn = typeof self == "object" && self && self.Object === Object && self, tt = se || Nn || Function("return this")(), ie = t && !t.nodeType && t, et = ie && !0 && e && !e.nodeType && e, oe = et && et.exports === ie, xt = oe && se.process, ae = function() {
    try {
      var s = et && et.require && et.require("util").types;
      return s || xt && xt.binding && xt.binding("util");
    } catch {
    }
  }(), ce = ae && ae.isTypedArray;
  function Pn(s, o, u) {
    switch (u.length) {
      case 0:
        return s.call(o);
      case 1:
        return s.call(o, u[0]);
      case 2:
        return s.call(o, u[0], u[1]);
      case 3:
        return s.call(o, u[0], u[1], u[2]);
    }
    return s.apply(o, u);
  }
  function Dn(s, o) {
    for (var u = -1, h = Array(s); ++u < s; )
      h[u] = o(u);
    return h;
  }
  function xn(s) {
    return function(o) {
      return s(o);
    };
  }
  function Fn(s, o) {
    return s == null ? void 0 : s[o];
  }
  function Un(s, o) {
    return function(u) {
      return s(o(u));
    };
  }
  var Ln = Array.prototype, jn = Function.prototype, ut = Object.prototype, Ft = tt["__core-js_shared__"], lt = jn.toString, H = ut.hasOwnProperty, ue = function() {
    var s = /[^.]+$/.exec(Ft && Ft.keys && Ft.keys.IE_PROTO || "");
    return s ? "Symbol(src)_1." + s : "";
  }(), le = ut.toString, Bn = lt.call(Object), In = RegExp(
    "^" + lt.call(H).replace(Rn, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), ft = oe ? tt.Buffer : void 0, fe = tt.Symbol, de = tt.Uint8Array, he = ft ? ft.allocUnsafe : void 0, pe = Un(Object.getPrototypeOf, Object), me = Object.create, Hn = ut.propertyIsEnumerable, qn = Ln.splice, W = fe ? fe.toStringTag : void 0, dt = function() {
    try {
      var s = jt(Object, "defineProperty");
      return s({}, "", {}), s;
    } catch {
    }
  }(), vn = ft ? ft.isBuffer : void 0, be = Math.max, Mn = Date.now, ye = jt(tt, "Map"), nt = jt(Object, "create"), zn = function() {
    function s() {
    }
    return function(o) {
      if (!J(o))
        return {};
      if (me)
        return me(o);
      s.prototype = o;
      var u = new s();
      return s.prototype = void 0, u;
    };
  }();
  function $(s) {
    var o = -1, u = s == null ? 0 : s.length;
    for (this.clear(); ++o < u; ) {
      var h = s[o];
      this.set(h[0], h[1]);
    }
  }
  function kn() {
    this.__data__ = nt ? nt(null) : {}, this.size = 0;
  }
  function Wn(s) {
    var o = this.has(s) && delete this.__data__[s];
    return this.size -= o ? 1 : 0, o;
  }
  function $n(s) {
    var o = this.__data__;
    if (nt) {
      var u = o[s];
      return u === r ? void 0 : u;
    }
    return H.call(o, s) ? o[s] : void 0;
  }
  function Jn(s) {
    var o = this.__data__;
    return nt ? o[s] !== void 0 : H.call(o, s);
  }
  function Gn(s, o) {
    var u = this.__data__;
    return this.size += this.has(s) ? 0 : 1, u[s] = nt && o === void 0 ? r : o, this;
  }
  $.prototype.clear = kn, $.prototype.delete = Wn, $.prototype.get = $n, $.prototype.has = Jn, $.prototype.set = Gn;
  function q(s) {
    var o = -1, u = s == null ? 0 : s.length;
    for (this.clear(); ++o < u; ) {
      var h = s[o];
      this.set(h[0], h[1]);
    }
  }
  function Vn() {
    this.__data__ = [], this.size = 0;
  }
  function Kn(s) {
    var o = this.__data__, u = ht(o, s);
    if (u < 0)
      return !1;
    var h = o.length - 1;
    return u == h ? o.pop() : qn.call(o, u, 1), --this.size, !0;
  }
  function Xn(s) {
    var o = this.__data__, u = ht(o, s);
    return u < 0 ? void 0 : o[u][1];
  }
  function Qn(s) {
    return ht(this.__data__, s) > -1;
  }
  function Yn(s, o) {
    var u = this.__data__, h = ht(u, s);
    return h < 0 ? (++this.size, u.push([s, o])) : u[h][1] = o, this;
  }
  q.prototype.clear = Vn, q.prototype.delete = Kn, q.prototype.get = Xn, q.prototype.has = Qn, q.prototype.set = Yn;
  function V(s) {
    var o = -1, u = s == null ? 0 : s.length;
    for (this.clear(); ++o < u; ) {
      var h = s[o];
      this.set(h[0], h[1]);
    }
  }
  function Zn() {
    this.size = 0, this.__data__ = {
      hash: new $(),
      map: new (ye || q)(),
      string: new $()
    };
  }
  function tr(s) {
    var o = mt(this, s).delete(s);
    return this.size -= o ? 1 : 0, o;
  }
  function er(s) {
    return mt(this, s).get(s);
  }
  function nr(s) {
    return mt(this, s).has(s);
  }
  function rr(s, o) {
    var u = mt(this, s), h = u.size;
    return u.set(s, o), this.size += u.size == h ? 0 : 1, this;
  }
  V.prototype.clear = Zn, V.prototype.delete = tr, V.prototype.get = er, V.prototype.has = nr, V.prototype.set = rr;
  function K(s) {
    var o = this.__data__ = new q(s);
    this.size = o.size;
  }
  function sr() {
    this.__data__ = new q(), this.size = 0;
  }
  function ir(s) {
    var o = this.__data__, u = o.delete(s);
    return this.size = o.size, u;
  }
  function or(s) {
    return this.__data__.get(s);
  }
  function ar(s) {
    return this.__data__.has(s);
  }
  function cr(s, o) {
    var u = this.__data__;
    if (u instanceof q) {
      var h = u.__data__;
      if (!ye || h.length < n - 1)
        return h.push([s, o]), this.size = ++u.size, this;
      u = this.__data__ = new V(h);
    }
    return u.set(s, o), this.size = u.size, this;
  }
  K.prototype.clear = sr, K.prototype.delete = ir, K.prototype.get = or, K.prototype.has = ar, K.prototype.set = cr;
  function ur(s, o) {
    var u = Ht(s), h = !u && It(s), O = !u && !h && Te(s), w = !u && !h && !O && we(s), _ = u || h || O || w, g = _ ? Dn(s.length, String) : [], C = g.length;
    for (var F in s)
      (o || H.call(s, F)) && !(_ && // Safari 9 has enumerable `arguments.length` in strict mode.
      (F == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      O && (F == "offset" || F == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      w && (F == "buffer" || F == "byteLength" || F == "byteOffset") || // Skip index properties.
      ge(F, C))) && g.push(F);
    return g;
  }
  function Ut(s, o, u) {
    (u !== void 0 && !bt(s[o], u) || u === void 0 && !(o in s)) && Lt(s, o, u);
  }
  function lr(s, o, u) {
    var h = s[o];
    (!(H.call(s, o) && bt(h, u)) || u === void 0 && !(o in s)) && Lt(s, o, u);
  }
  function ht(s, o) {
    for (var u = s.length; u--; )
      if (bt(s[u][0], o))
        return u;
    return -1;
  }
  function Lt(s, o, u) {
    o == "__proto__" && dt ? dt(s, o, {
      configurable: !0,
      enumerable: !0,
      value: u,
      writable: !0
    }) : s[o] = u;
  }
  var fr = wr();
  function pt(s) {
    return s == null ? s === void 0 ? dn : D : W && W in Object(s) ? Rr(s) : xr(s);
  }
  function Ee(s) {
    return rt(s) && pt(s) == d;
  }
  function dr(s) {
    if (!J(s) || Pr(s))
      return !1;
    var o = vt(s) ? In : _n;
    return o.test(jr(s));
  }
  function hr(s) {
    return rt(s) && Ae(s.length) && !!R[pt(s)];
  }
  function pr(s) {
    if (!J(s))
      return Dr(s);
    var o = Oe(s), u = [];
    for (var h in s)
      h == "constructor" && (o || !H.call(s, h)) || u.push(h);
    return u;
  }
  function Se(s, o, u, h, O) {
    s !== o && fr(o, function(w, _) {
      if (O || (O = new K()), J(w))
        mr(s, o, _, u, Se, h, O);
      else {
        var g = h ? h(Bt(s, _), w, _ + "", s, o, O) : void 0;
        g === void 0 && (g = w), Ut(s, _, g);
      }
    }, Re);
  }
  function mr(s, o, u, h, O, w, _) {
    var g = Bt(s, u), C = Bt(o, u), F = _.get(C);
    if (F) {
      Ut(s, u, F);
      return;
    }
    var x = w ? w(g, C, u + "", s, o, _) : void 0, st = x === void 0;
    if (st) {
      var Mt = Ht(C), zt = !Mt && Te(C), Ce = !Mt && !zt && we(C);
      x = C, Mt || zt || Ce ? Ht(g) ? x = g : Br(g) ? x = Or(g) : zt ? (st = !1, x = Er(C, !0)) : Ce ? (st = !1, x = gr(C, !0)) : x = [] : Ir(C) || It(C) ? (x = g, It(g) ? x = Hr(g) : (!J(g) || vt(g)) && (x = _r(C))) : st = !1;
    }
    st && (_.set(C, x), O(x, C, h, w, _), _.delete(C)), Ut(s, u, x);
  }
  function br(s, o) {
    return Ur(Fr(s, o, _e), s + "");
  }
  var yr = dt ? function(s, o) {
    return dt(s, "toString", {
      configurable: !0,
      enumerable: !1,
      value: vr(o),
      writable: !0
    });
  } : _e;
  function Er(s, o) {
    if (o)
      return s.slice();
    var u = s.length, h = he ? he(u) : new s.constructor(u);
    return s.copy(h), h;
  }
  function Sr(s) {
    var o = new s.constructor(s.byteLength);
    return new de(o).set(new de(s)), o;
  }
  function gr(s, o) {
    var u = o ? Sr(s.buffer) : s.buffer;
    return new s.constructor(u, s.byteOffset, s.length);
  }
  function Or(s, o) {
    var u = -1, h = s.length;
    for (o || (o = Array(h)); ++u < h; )
      o[u] = s[u];
    return o;
  }
  function Tr(s, o, u, h) {
    var O = !u;
    u || (u = {});
    for (var w = -1, _ = o.length; ++w < _; ) {
      var g = o[w], C = h ? h(u[g], s[g], g, u, s) : void 0;
      C === void 0 && (C = s[g]), O ? Lt(u, g, C) : lr(u, g, C);
    }
    return u;
  }
  function Ar(s) {
    return br(function(o, u) {
      var h = -1, O = u.length, w = O > 1 ? u[O - 1] : void 0, _ = O > 2 ? u[2] : void 0;
      for (w = s.length > 3 && typeof w == "function" ? (O--, w) : void 0, _ && Cr(u[0], u[1], _) && (w = O < 3 ? void 0 : w, O = 1), o = Object(o); ++h < O; ) {
        var g = u[h];
        g && s(o, g, h, w);
      }
      return o;
    });
  }
  function wr(s) {
    return function(o, u, h) {
      for (var O = -1, w = Object(o), _ = h(o), g = _.length; g--; ) {
        var C = _[s ? g : ++O];
        if (u(w[C], C, w) === !1)
          break;
      }
      return o;
    };
  }
  function mt(s, o) {
    var u = s.__data__;
    return Nr(o) ? u[typeof o == "string" ? "string" : "hash"] : u.map;
  }
  function jt(s, o) {
    var u = Fn(s, o);
    return dr(u) ? u : void 0;
  }
  function Rr(s) {
    var o = H.call(s, W), u = s[W];
    try {
      s[W] = void 0;
      var h = !0;
    } catch {
    }
    var O = le.call(s);
    return h && (o ? s[W] = u : delete s[W]), O;
  }
  function _r(s) {
    return typeof s.constructor == "function" && !Oe(s) ? zn(pe(s)) : {};
  }
  function ge(s, o) {
    var u = typeof s;
    return o = o ?? c, !!o && (u == "number" || u != "symbol" && Cn.test(s)) && s > -1 && s % 1 == 0 && s < o;
  }
  function Cr(s, o, u) {
    if (!J(u))
      return !1;
    var h = typeof o;
    return (h == "number" ? qt(u) && ge(o, u.length) : h == "string" && o in u) ? bt(u[o], s) : !1;
  }
  function Nr(s) {
    var o = typeof s;
    return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? s !== "__proto__" : s === null;
  }
  function Pr(s) {
    return !!ue && ue in s;
  }
  function Oe(s) {
    var o = s && s.constructor, u = typeof o == "function" && o.prototype || ut;
    return s === u;
  }
  function Dr(s) {
    var o = [];
    if (s != null)
      for (var u in Object(s))
        o.push(u);
    return o;
  }
  function xr(s) {
    return le.call(s);
  }
  function Fr(s, o, u) {
    return o = be(o === void 0 ? s.length - 1 : o, 0), function() {
      for (var h = arguments, O = -1, w = be(h.length - o, 0), _ = Array(w); ++O < w; )
        _[O] = h[o + O];
      O = -1;
      for (var g = Array(o + 1); ++O < o; )
        g[O] = h[O];
      return g[o] = u(_), Pn(s, this, g);
    };
  }
  function Bt(s, o) {
    if (!(o === "constructor" && typeof s[o] == "function") && o != "__proto__")
      return s[o];
  }
  var Ur = Lr(yr);
  function Lr(s) {
    var o = 0, u = 0;
    return function() {
      var h = Mn(), O = a - (h - u);
      if (u = h, O > 0) {
        if (++o >= i)
          return arguments[0];
      } else
        o = 0;
      return s.apply(void 0, arguments);
    };
  }
  function jr(s) {
    if (s != null) {
      try {
        return lt.call(s);
      } catch {
      }
      try {
        return s + "";
      } catch {
      }
    }
    return "";
  }
  function bt(s, o) {
    return s === o || s !== s && o !== o;
  }
  var It = Ee(function() {
    return arguments;
  }()) ? Ee : function(s) {
    return rt(s) && H.call(s, "callee") && !Hn.call(s, "callee");
  }, Ht = Array.isArray;
  function qt(s) {
    return s != null && Ae(s.length) && !vt(s);
  }
  function Br(s) {
    return rt(s) && qt(s);
  }
  var Te = vn || Mr;
  function vt(s) {
    if (!J(s))
      return !1;
    var o = pt(s);
    return o == A || o == m || o == f || o == G;
  }
  function Ae(s) {
    return typeof s == "number" && s > -1 && s % 1 == 0 && s <= c;
  }
  function J(s) {
    var o = typeof s;
    return s != null && (o == "object" || o == "function");
  }
  function rt(s) {
    return s != null && typeof s == "object";
  }
  function Ir(s) {
    if (!rt(s) || pt(s) != I)
      return !1;
    var o = pe(s);
    if (o === null)
      return !0;
    var u = H.call(o, "constructor") && o.constructor;
    return typeof u == "function" && u instanceof u && lt.call(u) == Bn;
  }
  var we = ce ? xn(ce) : hr;
  function Hr(s) {
    return Tr(s, Re(s));
  }
  function Re(s) {
    return qt(s) ? ur(s, !0) : pr(s);
  }
  var qr = Ar(function(s, o, u) {
    Se(s, o, u);
  });
  function vr(s) {
    return function() {
      return s;
    };
  }
  function _e(s) {
    return s;
  }
  function Mr() {
    return !1;
  }
  e.exports = qr;
})(Tt, Tt.exports);
var Jr = Tt.exports;
const Vt = /* @__PURE__ */ $r(Jr);
function We(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Gr } = Object.prototype, { getPrototypeOf: Zt } = Object, wt = ((e) => (t) => {
  const n = Gr.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), B = (e) => (e = e.toLowerCase(), (t) => wt(t) === e), Rt = (e) => (t) => typeof t === e, { isArray: Z } = Array, ot = Rt("undefined");
function Vr(e) {
  return e !== null && !ot(e) && e.constructor !== null && !ot(e.constructor) && U(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const $e = B("ArrayBuffer");
function Kr(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && $e(e.buffer), t;
}
const Xr = Rt("string"), U = Rt("function"), Je = Rt("number"), _t = (e) => e !== null && typeof e == "object", Qr = (e) => e === !0 || e === !1, Et = (e) => {
  if (wt(e) !== "object")
    return !1;
  const t = Zt(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Yr = B("Date"), Zr = B("File"), ts = B("Blob"), es = B("FileList"), ns = (e) => _t(e) && U(e.pipe), rs = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || U(e.append) && ((t = wt(e)) === "formdata" || // detect form-data instance
  t === "object" && U(e.toString) && e.toString() === "[object FormData]"));
}, ss = B("URLSearchParams"), is = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function at(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, i;
  if (typeof e != "object" && (e = [e]), Z(e))
    for (r = 0, i = e.length; r < i; r++)
      t.call(null, e[r], r, e);
  else {
    const a = n ? Object.getOwnPropertyNames(e) : Object.keys(e), c = a.length;
    let d;
    for (r = 0; r < c; r++)
      d = a[r], t.call(null, e[d], d, e);
  }
}
function Ge(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, i;
  for (; r-- > 0; )
    if (i = n[r], t === i.toLowerCase())
      return i;
  return null;
}
const Ve = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), Ke = (e) => !ot(e) && e !== Ve;
function Kt() {
  const { caseless: e } = Ke(this) && this || {}, t = {}, n = (r, i) => {
    const a = e && Ge(t, i) || i;
    Et(t[a]) && Et(r) ? t[a] = Kt(t[a], r) : Et(r) ? t[a] = Kt({}, r) : Z(r) ? t[a] = r.slice() : t[a] = r;
  };
  for (let r = 0, i = arguments.length; r < i; r++)
    arguments[r] && at(arguments[r], n);
  return t;
}
const os = (e, t, n, { allOwnKeys: r } = {}) => (at(t, (i, a) => {
  n && U(i) ? e[a] = We(i, n) : e[a] = i;
}, { allOwnKeys: r }), e), as = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), cs = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, us = (e, t, n, r) => {
  let i, a, c;
  const d = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (i = Object.getOwnPropertyNames(e), a = i.length; a-- > 0; )
      c = i[a], (!r || r(c, e, t)) && !d[c] && (t[c] = e[c], d[c] = !0);
    e = n !== !1 && Zt(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, ls = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, fs = (e) => {
  if (!e)
    return null;
  if (Z(e))
    return e;
  let t = e.length;
  if (!Je(t))
    return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, ds = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Zt(Uint8Array)), hs = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let i;
  for (; (i = r.next()) && !i.done; ) {
    const a = i.value;
    t.call(e, a[0], a[1]);
  }
}, ps = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, ms = B("HTMLFormElement"), bs = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, i) {
    return r.toUpperCase() + i;
  }
), Pe = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), ys = B("RegExp"), Xe = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  at(n, (i, a) => {
    t(i, a, e) !== !1 && (r[a] = i);
  }), Object.defineProperties(e, r);
}, Es = (e) => {
  Xe(e, (t, n) => {
    if (U(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (U(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, Ss = (e, t) => {
  const n = {}, r = (i) => {
    i.forEach((a) => {
      n[a] = !0;
    });
  };
  return Z(e) ? r(e) : r(String(e).split(t)), n;
}, gs = () => {
}, Os = (e, t) => (e = +e, Number.isFinite(e) ? e : t), kt = "abcdefghijklmnopqrstuvwxyz", De = "0123456789", Qe = {
  DIGIT: De,
  ALPHA: kt,
  ALPHA_DIGIT: kt + kt.toUpperCase() + De
}, Ts = (e = 16, t = Qe.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function As(e) {
  return !!(e && U(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const ws = (e) => {
  const t = new Array(10), n = (r, i) => {
    if (_t(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[i] = r;
        const a = Z(r) ? [] : {};
        return at(r, (c, d) => {
          const b = n(c, i + 1);
          !ot(b) && (a[d] = b);
        }), t[i] = void 0, a;
      }
    }
    return r;
  };
  return n(e, 0);
}, Rs = B("AsyncFunction"), _s = (e) => e && (_t(e) || U(e)) && U(e.then) && U(e.catch), l = {
  isArray: Z,
  isArrayBuffer: $e,
  isBuffer: Vr,
  isFormData: rs,
  isArrayBufferView: Kr,
  isString: Xr,
  isNumber: Je,
  isBoolean: Qr,
  isObject: _t,
  isPlainObject: Et,
  isUndefined: ot,
  isDate: Yr,
  isFile: Zr,
  isBlob: ts,
  isRegExp: ys,
  isFunction: U,
  isStream: ns,
  isURLSearchParams: ss,
  isTypedArray: ds,
  isFileList: es,
  forEach: at,
  merge: Kt,
  extend: os,
  trim: is,
  stripBOM: as,
  inherits: cs,
  toFlatObject: us,
  kindOf: wt,
  kindOfTest: B,
  endsWith: ls,
  toArray: fs,
  forEachEntry: hs,
  matchAll: ps,
  isHTMLForm: ms,
  hasOwnProperty: Pe,
  hasOwnProp: Pe,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Xe,
  freezeMethods: Es,
  toObjectSet: Ss,
  toCamelCase: bs,
  noop: gs,
  toFiniteNumber: Os,
  findKey: Ge,
  global: Ve,
  isContextDefined: Ke,
  ALPHABET: Qe,
  generateString: Ts,
  isSpecCompliantForm: As,
  toJSONObject: ws,
  isAsyncFn: Rs,
  isThenable: _s
};
function T(e, t, n, r, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), i && (this.response = i);
}
l.inherits(T, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: l.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const Ye = T.prototype, Ze = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Ze[e] = { value: e };
});
Object.defineProperties(T, Ze);
Object.defineProperty(Ye, "isAxiosError", { value: !0 });
T.from = (e, t, n, r, i, a) => {
  const c = Object.create(Ye);
  return l.toFlatObject(e, c, function(b) {
    return b !== Error.prototype;
  }, (d) => d !== "isAxiosError"), T.call(c, e.message, t, n, r, i), c.cause = e, c.name = e.name, a && Object.assign(c, a), c;
};
const Cs = null;
function Xt(e) {
  return l.isPlainObject(e) || l.isArray(e);
}
function tn(e) {
  return l.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function xe(e, t, n) {
  return e ? e.concat(t).map(function(i, a) {
    return i = tn(i), !n && a ? "[" + i + "]" : i;
  }).join(n ? "." : "") : t;
}
function Ns(e) {
  return l.isArray(e) && !e.some(Xt);
}
const Ps = l.toFlatObject(l, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Ct(e, t, n) {
  if (!l.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = l.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(S, L) {
    return !l.isUndefined(L[S]);
  });
  const r = n.metaTokens, i = n.visitor || p, a = n.dots, c = n.indexes, b = (n.Blob || typeof Blob < "u" && Blob) && l.isSpecCompliantForm(t);
  if (!l.isFunction(i))
    throw new TypeError("visitor must be a function");
  function f(m) {
    if (m === null)
      return "";
    if (l.isDate(m))
      return m.toISOString();
    if (!b && l.isBlob(m))
      throw new T("Blob is not supported. Use a Buffer instead.");
    return l.isArrayBuffer(m) || l.isTypedArray(m) ? b && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m;
  }
  function p(m, S, L) {
    let D = m;
    if (m && !L && typeof m == "object") {
      if (l.endsWith(S, "{}"))
        S = r ? S : S.slice(0, -2), m = JSON.stringify(m);
      else if (l.isArray(m) && Ns(m) || (l.isFileList(m) || l.endsWith(S, "[]")) && (D = l.toArray(m)))
        return S = tn(S), D.forEach(function(G, Dt) {
          !(l.isUndefined(G) || G === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            c === !0 ? xe([S], Dt, a) : c === null ? S : S + "[]",
            f(G)
          );
        }), !1;
    }
    return Xt(m) ? !0 : (t.append(xe(L, S, a), f(m)), !1);
  }
  const E = [], N = Object.assign(Ps, {
    defaultVisitor: p,
    convertValue: f,
    isVisitable: Xt
  });
  function A(m, S) {
    if (!l.isUndefined(m)) {
      if (E.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + S.join("."));
      E.push(m), l.forEach(m, function(D, I) {
        (!(l.isUndefined(D) || D === null) && i.call(
          t,
          D,
          l.isString(I) ? I.trim() : I,
          S,
          N
        )) === !0 && A(D, S ? S.concat(I) : [I]);
      }), E.pop();
    }
  }
  if (!l.isObject(e))
    throw new TypeError("data must be an object");
  return A(e), t;
}
function Fe(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function te(e, t) {
  this._pairs = [], e && Ct(e, this, t);
}
const en = te.prototype;
en.append = function(t, n) {
  this._pairs.push([t, n]);
};
en.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, Fe);
  } : Fe;
  return this._pairs.map(function(i) {
    return n(i[0]) + "=" + n(i[1]);
  }, "").join("&");
};
function Ds(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function nn(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || Ds, i = n && n.serialize;
  let a;
  if (i ? a = i(t, n) : a = l.isURLSearchParams(t) ? t.toString() : new te(t, n).toString(r), a) {
    const c = e.indexOf("#");
    c !== -1 && (e = e.slice(0, c)), e += (e.indexOf("?") === -1 ? "?" : "&") + a;
  }
  return e;
}
class xs {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    l.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const Ue = xs, rn = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Fs = typeof URLSearchParams < "u" ? URLSearchParams : te, Us = typeof FormData < "u" ? FormData : null, Ls = typeof Blob < "u" ? Blob : null, js = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), Bs = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), j = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Fs,
    FormData: Us,
    Blob: Ls
  },
  isStandardBrowserEnv: js,
  isStandardBrowserWebWorkerEnv: Bs,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function Is(e, t) {
  return Ct(e, new j.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, i, a) {
      return j.isNode && l.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : a.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Hs(e) {
  return l.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function qs(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const i = n.length;
  let a;
  for (r = 0; r < i; r++)
    a = n[r], t[a] = e[a];
  return t;
}
function sn(e) {
  function t(n, r, i, a) {
    let c = n[a++];
    const d = Number.isFinite(+c), b = a >= n.length;
    return c = !c && l.isArray(i) ? i.length : c, b ? (l.hasOwnProp(i, c) ? i[c] = [i[c], r] : i[c] = r, !d) : ((!i[c] || !l.isObject(i[c])) && (i[c] = []), t(n, r, i[c], a) && l.isArray(i[c]) && (i[c] = qs(i[c])), !d);
  }
  if (l.isFormData(e) && l.isFunction(e.entries)) {
    const n = {};
    return l.forEachEntry(e, (r, i) => {
      t(Hs(r), i, n, 0);
    }), n;
  }
  return null;
}
const vs = {
  "Content-Type": void 0
};
function Ms(e, t, n) {
  if (l.isString(e))
    try {
      return (t || JSON.parse)(e), l.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const Nt = {
  transitional: rn,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", i = r.indexOf("application/json") > -1, a = l.isObject(t);
    if (a && l.isHTMLForm(t) && (t = new FormData(t)), l.isFormData(t))
      return i && i ? JSON.stringify(sn(t)) : t;
    if (l.isArrayBuffer(t) || l.isBuffer(t) || l.isStream(t) || l.isFile(t) || l.isBlob(t))
      return t;
    if (l.isArrayBufferView(t))
      return t.buffer;
    if (l.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let d;
    if (a) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return Is(t, this.formSerializer).toString();
      if ((d = l.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const b = this.env && this.env.FormData;
        return Ct(
          d ? { "files[]": t } : t,
          b && new b(),
          this.formSerializer
        );
      }
    }
    return a || i ? (n.setContentType("application/json", !1), Ms(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Nt.transitional, r = n && n.forcedJSONParsing, i = this.responseType === "json";
    if (t && l.isString(t) && (r && !this.responseType || i)) {
      const c = !(n && n.silentJSONParsing) && i;
      try {
        return JSON.parse(t);
      } catch (d) {
        if (c)
          throw d.name === "SyntaxError" ? T.from(d, T.ERR_BAD_RESPONSE, this, null, this.response) : d;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: j.classes.FormData,
    Blob: j.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
l.forEach(["delete", "get", "head"], function(t) {
  Nt.headers[t] = {};
});
l.forEach(["post", "put", "patch"], function(t) {
  Nt.headers[t] = l.merge(vs);
});
const ee = Nt, zs = l.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), ks = (e) => {
  const t = {};
  let n, r, i;
  return e && e.split(`
`).forEach(function(c) {
    i = c.indexOf(":"), n = c.substring(0, i).trim().toLowerCase(), r = c.substring(i + 1).trim(), !(!n || t[n] && zs[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, Le = Symbol("internals");
function it(e) {
  return e && String(e).trim().toLowerCase();
}
function St(e) {
  return e === !1 || e == null ? e : l.isArray(e) ? e.map(St) : String(e);
}
function Ws(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const $s = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Wt(e, t, n, r, i) {
  if (l.isFunction(r))
    return r.call(this, t, n);
  if (i && (t = n), !!l.isString(t)) {
    if (l.isString(r))
      return t.indexOf(r) !== -1;
    if (l.isRegExp(r))
      return r.test(t);
  }
}
function Js(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function Gs(e, t) {
  const n = l.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(i, a, c) {
        return this[r].call(this, t, i, a, c);
      },
      configurable: !0
    });
  });
}
class Pt {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const i = this;
    function a(d, b, f) {
      const p = it(b);
      if (!p)
        throw new Error("header name must be a non-empty string");
      const E = l.findKey(i, p);
      (!E || i[E] === void 0 || f === !0 || f === void 0 && i[E] !== !1) && (i[E || b] = St(d));
    }
    const c = (d, b) => l.forEach(d, (f, p) => a(f, p, b));
    return l.isPlainObject(t) || t instanceof this.constructor ? c(t, n) : l.isString(t) && (t = t.trim()) && !$s(t) ? c(ks(t), n) : t != null && a(n, t, r), this;
  }
  get(t, n) {
    if (t = it(t), t) {
      const r = l.findKey(this, t);
      if (r) {
        const i = this[r];
        if (!n)
          return i;
        if (n === !0)
          return Ws(i);
        if (l.isFunction(n))
          return n.call(this, i, r);
        if (l.isRegExp(n))
          return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = it(t), t) {
      const r = l.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Wt(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let i = !1;
    function a(c) {
      if (c = it(c), c) {
        const d = l.findKey(r, c);
        d && (!n || Wt(r, r[d], d, n)) && (delete r[d], i = !0);
      }
    }
    return l.isArray(t) ? t.forEach(a) : a(t), i;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, i = !1;
    for (; r--; ) {
      const a = n[r];
      (!t || Wt(this, this[a], a, t, !0)) && (delete this[a], i = !0);
    }
    return i;
  }
  normalize(t) {
    const n = this, r = {};
    return l.forEach(this, (i, a) => {
      const c = l.findKey(r, a);
      if (c) {
        n[c] = St(i), delete n[a];
        return;
      }
      const d = t ? Js(a) : String(a).trim();
      d !== a && delete n[a], n[d] = St(i), r[d] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return l.forEach(this, (r, i) => {
      r != null && r !== !1 && (n[i] = t && l.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((i) => r.set(i)), r;
  }
  static accessor(t) {
    const r = (this[Le] = this[Le] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function a(c) {
      const d = it(c);
      r[d] || (Gs(i, c), r[d] = !0);
    }
    return l.isArray(t) ? t.forEach(a) : a(t), this;
  }
}
Pt.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
l.freezeMethods(Pt.prototype);
l.freezeMethods(Pt);
const M = Pt;
function $t(e, t) {
  const n = this || ee, r = t || n, i = M.from(r.headers);
  let a = r.data;
  return l.forEach(e, function(d) {
    a = d.call(n, a, i.normalize(), t ? t.status : void 0);
  }), i.normalize(), a;
}
function on(e) {
  return !!(e && e.__CANCEL__);
}
function ct(e, t, n) {
  T.call(this, e ?? "canceled", T.ERR_CANCELED, t, n), this.name = "CanceledError";
}
l.inherits(ct, T, {
  __CANCEL__: !0
});
function Vs(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new T(
    "Request failed with status code " + n.status,
    [T.ERR_BAD_REQUEST, T.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
const Ks = j.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function() {
    return {
      write: function(n, r, i, a, c, d) {
        const b = [];
        b.push(n + "=" + encodeURIComponent(r)), l.isNumber(i) && b.push("expires=" + new Date(i).toGMTString()), l.isString(a) && b.push("path=" + a), l.isString(c) && b.push("domain=" + c), d === !0 && b.push("secure"), document.cookie = b.join("; ");
      },
      read: function(n) {
        const r = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"));
        return r ? decodeURIComponent(r[3]) : null;
      },
      remove: function(n) {
        this.write(n, "", Date.now() - 864e5);
      }
    };
  }()
) : (
  // Non standard browser env (web workers, react-native) lack needed support.
  function() {
    return {
      write: function() {
      },
      read: function() {
        return null;
      },
      remove: function() {
      }
    };
  }()
);
function Xs(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Qs(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function an(e, t) {
  return e && !Xs(t) ? Qs(e, t) : t;
}
const Ys = j.isStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");
    let r;
    function i(a) {
      let c = a;
      return t && (n.setAttribute("href", c), c = n.href), n.setAttribute("href", c), {
        href: n.href,
        protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
        host: n.host,
        search: n.search ? n.search.replace(/^\?/, "") : "",
        hash: n.hash ? n.hash.replace(/^#/, "") : "",
        hostname: n.hostname,
        port: n.port,
        pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
      };
    }
    return r = i(window.location.href), function(c) {
      const d = l.isString(c) ? i(c) : c;
      return d.protocol === r.protocol && d.host === r.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function() {
    return function() {
      return !0;
    };
  }()
);
function Zs(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function ti(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let i = 0, a = 0, c;
  return t = t !== void 0 ? t : 1e3, function(b) {
    const f = Date.now(), p = r[a];
    c || (c = f), n[i] = b, r[i] = f;
    let E = a, N = 0;
    for (; E !== i; )
      N += n[E++], E = E % e;
    if (i = (i + 1) % e, i === a && (a = (a + 1) % e), f - c < t)
      return;
    const A = p && f - p;
    return A ? Math.round(N * 1e3 / A) : void 0;
  };
}
function je(e, t) {
  let n = 0;
  const r = ti(50, 250);
  return (i) => {
    const a = i.loaded, c = i.lengthComputable ? i.total : void 0, d = a - n, b = r(d), f = a <= c;
    n = a;
    const p = {
      loaded: a,
      total: c,
      progress: c ? a / c : void 0,
      bytes: d,
      rate: b || void 0,
      estimated: b && c && f ? (c - a) / b : void 0,
      event: i
    };
    p[t ? "download" : "upload"] = !0, e(p);
  };
}
const ei = typeof XMLHttpRequest < "u", ni = ei && function(e) {
  return new Promise(function(n, r) {
    let i = e.data;
    const a = M.from(e.headers).normalize(), c = e.responseType;
    let d;
    function b() {
      e.cancelToken && e.cancelToken.unsubscribe(d), e.signal && e.signal.removeEventListener("abort", d);
    }
    l.isFormData(i) && (j.isStandardBrowserEnv || j.isStandardBrowserWebWorkerEnv ? a.setContentType(!1) : a.setContentType("multipart/form-data;", !1));
    let f = new XMLHttpRequest();
    if (e.auth) {
      const A = e.auth.username || "", m = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      a.set("Authorization", "Basic " + btoa(A + ":" + m));
    }
    const p = an(e.baseURL, e.url);
    f.open(e.method.toUpperCase(), nn(p, e.params, e.paramsSerializer), !0), f.timeout = e.timeout;
    function E() {
      if (!f)
        return;
      const A = M.from(
        "getAllResponseHeaders" in f && f.getAllResponseHeaders()
      ), S = {
        data: !c || c === "text" || c === "json" ? f.responseText : f.response,
        status: f.status,
        statusText: f.statusText,
        headers: A,
        config: e,
        request: f
      };
      Vs(function(D) {
        n(D), b();
      }, function(D) {
        r(D), b();
      }, S), f = null;
    }
    if ("onloadend" in f ? f.onloadend = E : f.onreadystatechange = function() {
      !f || f.readyState !== 4 || f.status === 0 && !(f.responseURL && f.responseURL.indexOf("file:") === 0) || setTimeout(E);
    }, f.onabort = function() {
      f && (r(new T("Request aborted", T.ECONNABORTED, e, f)), f = null);
    }, f.onerror = function() {
      r(new T("Network Error", T.ERR_NETWORK, e, f)), f = null;
    }, f.ontimeout = function() {
      let m = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const S = e.transitional || rn;
      e.timeoutErrorMessage && (m = e.timeoutErrorMessage), r(new T(
        m,
        S.clarifyTimeoutError ? T.ETIMEDOUT : T.ECONNABORTED,
        e,
        f
      )), f = null;
    }, j.isStandardBrowserEnv) {
      const A = (e.withCredentials || Ys(p)) && e.xsrfCookieName && Ks.read(e.xsrfCookieName);
      A && a.set(e.xsrfHeaderName, A);
    }
    i === void 0 && a.setContentType(null), "setRequestHeader" in f && l.forEach(a.toJSON(), function(m, S) {
      f.setRequestHeader(S, m);
    }), l.isUndefined(e.withCredentials) || (f.withCredentials = !!e.withCredentials), c && c !== "json" && (f.responseType = e.responseType), typeof e.onDownloadProgress == "function" && f.addEventListener("progress", je(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && f.upload && f.upload.addEventListener("progress", je(e.onUploadProgress)), (e.cancelToken || e.signal) && (d = (A) => {
      f && (r(!A || A.type ? new ct(null, e, f) : A), f.abort(), f = null);
    }, e.cancelToken && e.cancelToken.subscribe(d), e.signal && (e.signal.aborted ? d() : e.signal.addEventListener("abort", d)));
    const N = Zs(p);
    if (N && j.protocols.indexOf(N) === -1) {
      r(new T("Unsupported protocol " + N + ":", T.ERR_BAD_REQUEST, e));
      return;
    }
    f.send(i || null);
  });
}, gt = {
  http: Cs,
  xhr: ni
};
l.forEach(gt, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const ri = {
  getAdapter: (e) => {
    e = l.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    for (let i = 0; i < t && (n = e[i], !(r = l.isString(n) ? gt[n.toLowerCase()] : n)); i++)
      ;
    if (!r)
      throw r === !1 ? new T(
        `Adapter ${n} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        l.hasOwnProp(gt, n) ? `Adapter '${n}' is not available in the build` : `Unknown adapter '${n}'`
      );
    if (!l.isFunction(r))
      throw new TypeError("adapter is not a function");
    return r;
  },
  adapters: gt
};
function Jt(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new ct(null, e);
}
function Be(e) {
  return Jt(e), e.headers = M.from(e.headers), e.data = $t.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), ri.getAdapter(e.adapter || ee.adapter)(e).then(function(r) {
    return Jt(e), r.data = $t.call(
      e,
      e.transformResponse,
      r
    ), r.headers = M.from(r.headers), r;
  }, function(r) {
    return on(r) || (Jt(e), r && r.response && (r.response.data = $t.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = M.from(r.response.headers))), Promise.reject(r);
  });
}
const Ie = (e) => e instanceof M ? e.toJSON() : e;
function Y(e, t) {
  t = t || {};
  const n = {};
  function r(f, p, E) {
    return l.isPlainObject(f) && l.isPlainObject(p) ? l.merge.call({ caseless: E }, f, p) : l.isPlainObject(p) ? l.merge({}, p) : l.isArray(p) ? p.slice() : p;
  }
  function i(f, p, E) {
    if (l.isUndefined(p)) {
      if (!l.isUndefined(f))
        return r(void 0, f, E);
    } else
      return r(f, p, E);
  }
  function a(f, p) {
    if (!l.isUndefined(p))
      return r(void 0, p);
  }
  function c(f, p) {
    if (l.isUndefined(p)) {
      if (!l.isUndefined(f))
        return r(void 0, f);
    } else
      return r(void 0, p);
  }
  function d(f, p, E) {
    if (E in t)
      return r(f, p);
    if (E in e)
      return r(void 0, f);
  }
  const b = {
    url: a,
    method: a,
    data: a,
    baseURL: c,
    transformRequest: c,
    transformResponse: c,
    paramsSerializer: c,
    timeout: c,
    timeoutMessage: c,
    withCredentials: c,
    adapter: c,
    responseType: c,
    xsrfCookieName: c,
    xsrfHeaderName: c,
    onUploadProgress: c,
    onDownloadProgress: c,
    decompress: c,
    maxContentLength: c,
    maxBodyLength: c,
    beforeRedirect: c,
    transport: c,
    httpAgent: c,
    httpsAgent: c,
    cancelToken: c,
    socketPath: c,
    responseEncoding: c,
    validateStatus: d,
    headers: (f, p) => i(Ie(f), Ie(p), !0)
  };
  return l.forEach(Object.keys(Object.assign({}, e, t)), function(p) {
    const E = b[p] || i, N = E(e[p], t[p], p);
    l.isUndefined(N) && E !== d || (n[p] = N);
  }), n;
}
const cn = "1.4.0", ne = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  ne[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const He = {};
ne.transitional = function(t, n, r) {
  function i(a, c) {
    return "[Axios v" + cn + "] Transitional option '" + a + "'" + c + (r ? ". " + r : "");
  }
  return (a, c, d) => {
    if (t === !1)
      throw new T(
        i(c, " has been removed" + (n ? " in " + n : "")),
        T.ERR_DEPRECATED
      );
    return n && !He[c] && (He[c] = !0, console.warn(
      i(
        c,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(a, c, d) : !0;
  };
};
function si(e, t, n) {
  if (typeof e != "object")
    throw new T("options must be an object", T.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let i = r.length;
  for (; i-- > 0; ) {
    const a = r[i], c = t[a];
    if (c) {
      const d = e[a], b = d === void 0 || c(d, a, e);
      if (b !== !0)
        throw new T("option " + a + " must be " + b, T.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new T("Unknown option " + a, T.ERR_BAD_OPTION);
  }
}
const Qt = {
  assertOptions: si,
  validators: ne
}, k = Qt.validators;
class At {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Ue(),
      response: new Ue()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Y(this.defaults, n);
    const { transitional: r, paramsSerializer: i, headers: a } = n;
    r !== void 0 && Qt.assertOptions(r, {
      silentJSONParsing: k.transitional(k.boolean),
      forcedJSONParsing: k.transitional(k.boolean),
      clarifyTimeoutError: k.transitional(k.boolean)
    }, !1), i != null && (l.isFunction(i) ? n.paramsSerializer = {
      serialize: i
    } : Qt.assertOptions(i, {
      encode: k.function,
      serialize: k.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let c;
    c = a && l.merge(
      a.common,
      a[n.method]
    ), c && l.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (m) => {
        delete a[m];
      }
    ), n.headers = M.concat(c, a);
    const d = [];
    let b = !0;
    this.interceptors.request.forEach(function(S) {
      typeof S.runWhen == "function" && S.runWhen(n) === !1 || (b = b && S.synchronous, d.unshift(S.fulfilled, S.rejected));
    });
    const f = [];
    this.interceptors.response.forEach(function(S) {
      f.push(S.fulfilled, S.rejected);
    });
    let p, E = 0, N;
    if (!b) {
      const m = [Be.bind(this), void 0];
      for (m.unshift.apply(m, d), m.push.apply(m, f), N = m.length, p = Promise.resolve(n); E < N; )
        p = p.then(m[E++], m[E++]);
      return p;
    }
    N = d.length;
    let A = n;
    for (E = 0; E < N; ) {
      const m = d[E++], S = d[E++];
      try {
        A = m(A);
      } catch (L) {
        S.call(this, L);
        break;
      }
    }
    try {
      p = Be.call(this, A);
    } catch (m) {
      return Promise.reject(m);
    }
    for (E = 0, N = f.length; E < N; )
      p = p.then(f[E++], f[E++]);
    return p;
  }
  getUri(t) {
    t = Y(this.defaults, t);
    const n = an(t.baseURL, t.url);
    return nn(n, t.params, t.paramsSerializer);
  }
}
l.forEach(["delete", "get", "head", "options"], function(t) {
  At.prototype[t] = function(n, r) {
    return this.request(Y(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
l.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(a, c, d) {
      return this.request(Y(d || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: c
      }));
    };
  }
  At.prototype[t] = n(), At.prototype[t + "Form"] = n(!0);
});
const Ot = At;
class re {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(a) {
      n = a;
    });
    const r = this;
    this.promise.then((i) => {
      if (!r._listeners)
        return;
      let a = r._listeners.length;
      for (; a-- > 0; )
        r._listeners[a](i);
      r._listeners = null;
    }), this.promise.then = (i) => {
      let a;
      const c = new Promise((d) => {
        r.subscribe(d), a = d;
      }).then(i);
      return c.cancel = function() {
        r.unsubscribe(a);
      }, c;
    }, t(function(a, c, d) {
      r.reason || (r.reason = new ct(a, c, d), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new re(function(i) {
        t = i;
      }),
      cancel: t
    };
  }
}
const ii = re;
function oi(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function ai(e) {
  return l.isObject(e) && e.isAxiosError === !0;
}
const Yt = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Yt).forEach(([e, t]) => {
  Yt[t] = e;
});
const ci = Yt;
function un(e) {
  const t = new Ot(e), n = We(Ot.prototype.request, t);
  return l.extend(n, Ot.prototype, t, { allOwnKeys: !0 }), l.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(i) {
    return un(Y(e, i));
  }, n;
}
const P = un(ee);
P.Axios = Ot;
P.CanceledError = ct;
P.CancelToken = ii;
P.isCancel = on;
P.VERSION = cn;
P.toFormData = Ct;
P.AxiosError = T;
P.Cancel = P.CanceledError;
P.all = function(t) {
  return Promise.all(t);
};
P.spread = oi;
P.isAxiosError = ai;
P.mergeConfig = Y;
P.AxiosHeaders = M;
P.formToJSON = (e) => sn(l.isHTMLForm(e) ? new FormData(e) : e);
P.HttpStatusCode = ci;
P.default = P;
const qe = P;
function ui(e, t) {
  e.run(y.START, t), qe(t).then((n) => {
    e.run(y.STATUS_CODE, n.status), e.run(y.SUCCESS, n);
  }).catch((n) => {
    if (qe.isCancel(n)) {
      e.run(y.CANCEL, n.message);
      return;
    }
    if (n.response) {
      e.run(y.STATUS_CODE, n.response.status), e.run(y.ERROR, n.response);
      return;
    }
    e.run(y.ERROR, n);
  }).then((n) => e.run(y.FINISH, {}));
}
function li(e) {
  const t = Q(e, "cancelToken") ? e.cancelToken : null, n = !t && Q(e, "signal") ? e.signal : null;
  let r = null;
  return !t && !n && (r = new AbortController(), e = Object.assign({}, e, { signal: r.signal })), {
    options: e,
    abortControllerInstance: r
  };
}
function fi(e, t, n = X.GET, r = {}, i = {}) {
  const a = di(t, n, r), c = Q(i, "cancelToken") ? i.cancelToken : null;
  let d = !c && Q(i, "signal") ? i.signal : new AbortController().signal;
  const b = {
    method: n,
    url: a.url,
    data: n === X.GET ? {} : a.payload,
    ...c ? { cancelToken: c } : { signal: d },
    headers: {
      Accept: "*/*",
      // Accept: "application/json",
      "Content-Type": r instanceof FormData ? "multipart/form-data" : "application/json",
      "X-Requested-With": "XMLHttpRequest"
    },
    onUploadProgress: (f) => {
      a.payload instanceof FormData && e.run(y.UPLOAD, f);
    },
    onDownloadProgress: (f) => {
      e.run(y.DOWNLOAD, f);
    }
  };
  return Vt(b, i);
}
function di(e, t, n, r) {
  if ((Gt(n) || r) && !(n instanceof FormData) && (n = ve(n)), !(n instanceof FormData) && t === X.GET && Object.keys(n).length) {
    e = e.endsWith("/") ? e.slice(0, -1) : e;
    const i = new URLSearchParams({ ...n });
    e += "?" + i.toString();
  }
  return {
    url: e,
    payload: n
  };
}
class hi {
  constructor(t = "http://localhost", n = [], r = {}, i = {}) {
    this.requestURL = t, this.state = {}, this._userStates = n, this.requestConfig = r, this.hooks = Ne(i) ? [] : [i], this._cancelToken = null, this.availableHooks = Array.from(Object.values(y)), this.availableEvents = Array.from(Object.values(v)), this.resetStates();
  }
  // expect userStates = [ [name, callback], ... ]
  _registerUserStates() {
    if (this._userStates.length === 0)
      return;
    const t = this, n = (r) => Array.isArray(r) || typeof r[0] < "u" || typeof r[1] == "function";
    Array.from(this._userStates).filter(n).forEach((r) => {
      let i = r[0], a = r[1];
      Q(t.state, i) && delete t.state[i], Object.defineProperty(t.state, i, {
        get() {
          return a(t.state);
        },
        configurable: !0
      });
    });
  }
  url(t) {
    return this.requestURL = t, this;
  }
  registerStates(t) {
    return this._userStates = this._userStates.length === 0 ? t : [...this._userStates, ...t], this;
  }
  mergeRequestOptions(t = {}) {
    return this.requestConfig = Object.assign({}, Vt(this.requestConfig, t)), this;
  }
  // always overwrite all hooks callbacks
  setRequestHooks(t = {}) {
    return this.hooks = [Object.assign({}, t)], this;
  }
  mergeRequestHooks(t = {}) {
    return this.hooks = [...this.hooks, t], this;
  }
  submit(t = X.GET, n = {}, r = {}) {
    const { options: i = {}, hooks: a = {} } = r;
    this.resetStates();
    const c = li(i);
    this._cancelToken = c.abortControllerInstance;
    const d = Object.assign({}, Vt(this.requestConfig, c.options)), b = Ne(a) ? [...this.hooks] : [...this.hooks, a], f = new Wr(this), p = fi(f, this.requestURL, t, n, d);
    f.registerInternalHooks(), f.registerUserHooks(b), f.run(y.BEFORE, p), ui(f, p);
  }
  get(t = {}, n = { options: {}, hooks: {} }) {
    return this.submit(X.GET, t, n);
  }
  post(t = {}, n = { options: {}, hooks: {} }) {
    return this.submit(X.POST, t, n);
  }
  cancel() {
    this.state.busy && this._cancelToken && (this._cancelToken.abort(), this._cancelToken = null);
  }
  resetStates() {
    this.state = Object.assign({}, ke), this._registerUserStates();
  }
}
export {
  hi as AquaRequest
};
