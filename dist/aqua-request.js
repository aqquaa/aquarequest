function Q(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Ce(e) {
  return e && Object.keys(e).length === 0;
}
function $t(e) {
  return e instanceof File || e instanceof Blob || e instanceof FileList && e.length > 0 || e instanceof FormData && Array.from(e.values()).some((t) => $t(t)) || typeof e == "object" && e !== null && Object.values(e).some((t) => $t(t));
}
function qe(e, t = new FormData(), n = null) {
  e = e || {};
  for (const r in e)
    Object.prototype.hasOwnProperty.call(e, r) && Me(t, ve(n, r), e[r]);
  return t;
}
function ve(e, t) {
  return e ? e + "[" + t + "]" : t;
}
function Me(e, t, n) {
  if (Array.isArray(n))
    return Array.from(n.keys()).forEach((r) => Me(e, ve(t, r.toString()), n[r]));
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
  qe(n, e, t);
}
function M(e, t = {}) {
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
}), ze = Object.freeze({
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
}), H = Object.freeze({
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
    this.state = Object.assign({}, ze);
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
    M(H.BEFORE, t), this.stateHub[y.BEFORE].call(this.mainContext);
  }
  [y.START](t) {
    M(H.START, t), this.stateHub[y.START].call(this.mainContext, t);
  }
  [y.STATUS_CODE](t) {
    this.stateHub[y.STATUS_CODE].call(this.mainContext, t);
  }
  [y.SUCCESS](t) {
    M(H.SUCCESS, t), this.stateHub[y.SUCCESS].call(this.mainContext, t);
  }
  [y.CANCEL](t) {
    M(H.CANCEL, t), this.stateHub[y.CANCEL].call(this.mainContext, t);
  }
  [y.UPLOAD](t) {
    M(H.UPLOAD, t), this.stateHub[y.UPLOAD].call(this.mainContext, t);
  }
  [y.DOWNLOAD](t) {
    M(H.DOWNLOAD, t), this.stateHub[y.DOWNLOAD].call(this.mainContext, t);
  }
  [y.ERROR](t) {
    M(H.ERROR, t), this.stateHub[y.ERROR].call(this.mainContext, t);
  }
  [y.FINISH]() {
    M(H.FINISH, {}), this.mainContext._cancelToken = null, this.stateHub[y.FINISH].call(this.mainContext);
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
var Et = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Y = {}, $r = {
  get exports() {
    return Y;
  },
  set exports(e) {
    Y = e;
  }
};
(function(e, t) {
  var n = 200, r = "__lodash_hash_undefined__", i = 800, a = 16, c = 9007199254740991, d = "[object Arguments]", b = "[object Array]", f = "[object AsyncFunction]", p = "[object Boolean]", E = "[object Date]", N = "[object Error]", A = "[object Function]", m = "[object GeneratorFunction]", g = "[object Map]", F = "[object Number]", D = "[object Null]", j = "[object Object]", G = "[object Proxy]", Nt = "[object RegExp]", ln = "[object Set]", fn = "[object String]", dn = "[object Undefined]", hn = "[object WeakMap]", pn = "[object ArrayBuffer]", mn = "[object DataView]", bn = "[object Float32Array]", yn = "[object Float64Array]", En = "[object Int8Array]", gn = "[object Int16Array]", Sn = "[object Int32Array]", On = "[object Uint8Array]", Tn = "[object Uint8ClampedArray]", An = "[object Uint16Array]", wn = "[object Uint32Array]", Rn = /[\\^$.*+?()[\]{}|]/g, _n = /^\[object .+?Constructor\]$/, Cn = /^(?:0|[1-9]\d*)$/, R = {};
  R[bn] = R[yn] = R[En] = R[gn] = R[Sn] = R[On] = R[Tn] = R[An] = R[wn] = !0, R[d] = R[b] = R[pn] = R[p] = R[mn] = R[E] = R[N] = R[A] = R[g] = R[F] = R[j] = R[Nt] = R[ln] = R[fn] = R[hn] = !1;
  var re = typeof Et == "object" && Et && Et.Object === Object && Et, Nn = typeof self == "object" && self && self.Object === Object && self, et = re || Nn || Function("return this")(), se = t && !t.nodeType && t, nt = se && !0 && e && !e.nodeType && e, ie = nt && nt.exports === se, Pt = ie && re.process, oe = function() {
    try {
      var s = nt && nt.require && nt.require("util").types;
      return s || Pt && Pt.binding && Pt.binding("util");
    } catch {
    }
  }(), ae = oe && oe.isTypedArray;
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
  function Un(s, o) {
    return s == null ? void 0 : s[o];
  }
  function Fn(s, o) {
    return function(u) {
      return s(o(u));
    };
  }
  var Ln = Array.prototype, jn = Function.prototype, lt = Object.prototype, Dt = et["__core-js_shared__"], ft = jn.toString, B = lt.hasOwnProperty, ce = function() {
    var s = /[^.]+$/.exec(Dt && Dt.keys && Dt.keys.IE_PROTO || "");
    return s ? "Symbol(src)_1." + s : "";
  }(), ue = lt.toString, Bn = ft.call(Object), In = RegExp(
    "^" + ft.call(B).replace(Rn, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), dt = ie ? et.Buffer : void 0, le = et.Symbol, fe = et.Uint8Array, de = dt ? dt.allocUnsafe : void 0, he = Fn(Object.getPrototypeOf, Object), pe = Object.create, Hn = lt.propertyIsEnumerable, qn = Ln.splice, W = le ? le.toStringTag : void 0, ht = function() {
    try {
      var s = Ft(Object, "defineProperty");
      return s({}, "", {}), s;
    } catch {
    }
  }(), vn = dt ? dt.isBuffer : void 0, me = Math.max, Mn = Date.now, be = Ft(et, "Map"), rt = Ft(Object, "create"), zn = function() {
    function s() {
    }
    return function(o) {
      if (!J(o))
        return {};
      if (pe)
        return pe(o);
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
    this.__data__ = rt ? rt(null) : {}, this.size = 0;
  }
  function Wn(s) {
    var o = this.has(s) && delete this.__data__[s];
    return this.size -= o ? 1 : 0, o;
  }
  function $n(s) {
    var o = this.__data__;
    if (rt) {
      var u = o[s];
      return u === r ? void 0 : u;
    }
    return B.call(o, s) ? o[s] : void 0;
  }
  function Jn(s) {
    var o = this.__data__;
    return rt ? o[s] !== void 0 : B.call(o, s);
  }
  function Gn(s, o) {
    var u = this.__data__;
    return this.size += this.has(s) ? 0 : 1, u[s] = rt && o === void 0 ? r : o, this;
  }
  $.prototype.clear = kn, $.prototype.delete = Wn, $.prototype.get = $n, $.prototype.has = Jn, $.prototype.set = Gn;
  function I(s) {
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
    var o = this.__data__, u = pt(o, s);
    if (u < 0)
      return !1;
    var h = o.length - 1;
    return u == h ? o.pop() : qn.call(o, u, 1), --this.size, !0;
  }
  function Xn(s) {
    var o = this.__data__, u = pt(o, s);
    return u < 0 ? void 0 : o[u][1];
  }
  function Qn(s) {
    return pt(this.__data__, s) > -1;
  }
  function Yn(s, o) {
    var u = this.__data__, h = pt(u, s);
    return h < 0 ? (++this.size, u.push([s, o])) : u[h][1] = o, this;
  }
  I.prototype.clear = Vn, I.prototype.delete = Kn, I.prototype.get = Xn, I.prototype.has = Qn, I.prototype.set = Yn;
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
      map: new (be || I)(),
      string: new $()
    };
  }
  function tr(s) {
    var o = bt(this, s).delete(s);
    return this.size -= o ? 1 : 0, o;
  }
  function er(s) {
    return bt(this, s).get(s);
  }
  function nr(s) {
    return bt(this, s).has(s);
  }
  function rr(s, o) {
    var u = bt(this, s), h = u.size;
    return u.set(s, o), this.size += u.size == h ? 0 : 1, this;
  }
  V.prototype.clear = Zn, V.prototype.delete = tr, V.prototype.get = er, V.prototype.has = nr, V.prototype.set = rr;
  function K(s) {
    var o = this.__data__ = new I(s);
    this.size = o.size;
  }
  function sr() {
    this.__data__ = new I(), this.size = 0;
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
    if (u instanceof I) {
      var h = u.__data__;
      if (!be || h.length < n - 1)
        return h.push([s, o]), this.size = ++u.size, this;
      u = this.__data__ = new V(h);
    }
    return u.set(s, o), this.size = u.size, this;
  }
  K.prototype.clear = sr, K.prototype.delete = ir, K.prototype.get = or, K.prototype.has = ar, K.prototype.set = cr;
  function ur(s, o) {
    var u = Bt(s), h = !u && jt(s), O = !u && !h && Oe(s), w = !u && !h && !O && Ae(s), _ = u || h || O || w, S = _ ? Dn(s.length, String) : [], C = S.length;
    for (var U in s)
      (o || B.call(s, U)) && !(_ && // Safari 9 has enumerable `arguments.length` in strict mode.
      (U == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      O && (U == "offset" || U == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      w && (U == "buffer" || U == "byteLength" || U == "byteOffset") || // Skip index properties.
      ge(U, C))) && S.push(U);
    return S;
  }
  function xt(s, o, u) {
    (u !== void 0 && !yt(s[o], u) || u === void 0 && !(o in s)) && Ut(s, o, u);
  }
  function lr(s, o, u) {
    var h = s[o];
    (!(B.call(s, o) && yt(h, u)) || u === void 0 && !(o in s)) && Ut(s, o, u);
  }
  function pt(s, o) {
    for (var u = s.length; u--; )
      if (yt(s[u][0], o))
        return u;
    return -1;
  }
  function Ut(s, o, u) {
    o == "__proto__" && ht ? ht(s, o, {
      configurable: !0,
      enumerable: !0,
      value: u,
      writable: !0
    }) : s[o] = u;
  }
  var fr = wr();
  function mt(s) {
    return s == null ? s === void 0 ? dn : D : W && W in Object(s) ? Rr(s) : xr(s);
  }
  function ye(s) {
    return st(s) && mt(s) == d;
  }
  function dr(s) {
    if (!J(s) || Pr(s))
      return !1;
    var o = Ht(s) ? In : _n;
    return o.test(jr(s));
  }
  function hr(s) {
    return st(s) && Te(s.length) && !!R[mt(s)];
  }
  function pr(s) {
    if (!J(s))
      return Dr(s);
    var o = Se(s), u = [];
    for (var h in s)
      h == "constructor" && (o || !B.call(s, h)) || u.push(h);
    return u;
  }
  function Ee(s, o, u, h, O) {
    s !== o && fr(o, function(w, _) {
      if (O || (O = new K()), J(w))
        mr(s, o, _, u, Ee, h, O);
      else {
        var S = h ? h(Lt(s, _), w, _ + "", s, o, O) : void 0;
        S === void 0 && (S = w), xt(s, _, S);
      }
    }, we);
  }
  function mr(s, o, u, h, O, w, _) {
    var S = Lt(s, u), C = Lt(o, u), U = _.get(C);
    if (U) {
      xt(s, u, U);
      return;
    }
    var x = w ? w(S, C, u + "", s, o, _) : void 0, it = x === void 0;
    if (it) {
      var qt = Bt(C), vt = !qt && Oe(C), _e = !qt && !vt && Ae(C);
      x = C, qt || vt || _e ? Bt(S) ? x = S : Br(S) ? x = Or(S) : vt ? (it = !1, x = Er(C, !0)) : _e ? (it = !1, x = Sr(C, !0)) : x = [] : Ir(C) || jt(C) ? (x = S, jt(S) ? x = Hr(S) : (!J(S) || Ht(S)) && (x = _r(C))) : it = !1;
    }
    it && (_.set(C, x), O(x, C, h, w, _), _.delete(C)), xt(s, u, x);
  }
  function br(s, o) {
    return Fr(Ur(s, o, Re), s + "");
  }
  var yr = ht ? function(s, o) {
    return ht(s, "toString", {
      configurable: !0,
      enumerable: !1,
      value: vr(o),
      writable: !0
    });
  } : Re;
  function Er(s, o) {
    if (o)
      return s.slice();
    var u = s.length, h = de ? de(u) : new s.constructor(u);
    return s.copy(h), h;
  }
  function gr(s) {
    var o = new s.constructor(s.byteLength);
    return new fe(o).set(new fe(s)), o;
  }
  function Sr(s, o) {
    var u = o ? gr(s.buffer) : s.buffer;
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
      var S = o[w], C = h ? h(u[S], s[S], S, u, s) : void 0;
      C === void 0 && (C = s[S]), O ? Ut(u, S, C) : lr(u, S, C);
    }
    return u;
  }
  function Ar(s) {
    return br(function(o, u) {
      var h = -1, O = u.length, w = O > 1 ? u[O - 1] : void 0, _ = O > 2 ? u[2] : void 0;
      for (w = s.length > 3 && typeof w == "function" ? (O--, w) : void 0, _ && Cr(u[0], u[1], _) && (w = O < 3 ? void 0 : w, O = 1), o = Object(o); ++h < O; ) {
        var S = u[h];
        S && s(o, S, h, w);
      }
      return o;
    });
  }
  function wr(s) {
    return function(o, u, h) {
      for (var O = -1, w = Object(o), _ = h(o), S = _.length; S--; ) {
        var C = _[s ? S : ++O];
        if (u(w[C], C, w) === !1)
          break;
      }
      return o;
    };
  }
  function bt(s, o) {
    var u = s.__data__;
    return Nr(o) ? u[typeof o == "string" ? "string" : "hash"] : u.map;
  }
  function Ft(s, o) {
    var u = Un(s, o);
    return dr(u) ? u : void 0;
  }
  function Rr(s) {
    var o = B.call(s, W), u = s[W];
    try {
      s[W] = void 0;
      var h = !0;
    } catch {
    }
    var O = ue.call(s);
    return h && (o ? s[W] = u : delete s[W]), O;
  }
  function _r(s) {
    return typeof s.constructor == "function" && !Se(s) ? zn(he(s)) : {};
  }
  function ge(s, o) {
    var u = typeof s;
    return o = o ?? c, !!o && (u == "number" || u != "symbol" && Cn.test(s)) && s > -1 && s % 1 == 0 && s < o;
  }
  function Cr(s, o, u) {
    if (!J(u))
      return !1;
    var h = typeof o;
    return (h == "number" ? It(u) && ge(o, u.length) : h == "string" && o in u) ? yt(u[o], s) : !1;
  }
  function Nr(s) {
    var o = typeof s;
    return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? s !== "__proto__" : s === null;
  }
  function Pr(s) {
    return !!ce && ce in s;
  }
  function Se(s) {
    var o = s && s.constructor, u = typeof o == "function" && o.prototype || lt;
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
    return ue.call(s);
  }
  function Ur(s, o, u) {
    return o = me(o === void 0 ? s.length - 1 : o, 0), function() {
      for (var h = arguments, O = -1, w = me(h.length - o, 0), _ = Array(w); ++O < w; )
        _[O] = h[o + O];
      O = -1;
      for (var S = Array(o + 1); ++O < o; )
        S[O] = h[O];
      return S[o] = u(_), Pn(s, this, S);
    };
  }
  function Lt(s, o) {
    if (!(o === "constructor" && typeof s[o] == "function") && o != "__proto__")
      return s[o];
  }
  var Fr = Lr(yr);
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
        return ft.call(s);
      } catch {
      }
      try {
        return s + "";
      } catch {
      }
    }
    return "";
  }
  function yt(s, o) {
    return s === o || s !== s && o !== o;
  }
  var jt = ye(function() {
    return arguments;
  }()) ? ye : function(s) {
    return st(s) && B.call(s, "callee") && !Hn.call(s, "callee");
  }, Bt = Array.isArray;
  function It(s) {
    return s != null && Te(s.length) && !Ht(s);
  }
  function Br(s) {
    return st(s) && It(s);
  }
  var Oe = vn || Mr;
  function Ht(s) {
    if (!J(s))
      return !1;
    var o = mt(s);
    return o == A || o == m || o == f || o == G;
  }
  function Te(s) {
    return typeof s == "number" && s > -1 && s % 1 == 0 && s <= c;
  }
  function J(s) {
    var o = typeof s;
    return s != null && (o == "object" || o == "function");
  }
  function st(s) {
    return s != null && typeof s == "object";
  }
  function Ir(s) {
    if (!st(s) || mt(s) != j)
      return !1;
    var o = he(s);
    if (o === null)
      return !0;
    var u = B.call(o, "constructor") && o.constructor;
    return typeof u == "function" && u instanceof u && ft.call(u) == Bn;
  }
  var Ae = ae ? xn(ae) : hr;
  function Hr(s) {
    return Tr(s, we(s));
  }
  function we(s) {
    return It(s) ? ur(s, !0) : pr(s);
  }
  var qr = Ar(function(s, o, u) {
    Ee(s, o, u);
  });
  function vr(s) {
    return function() {
      return s;
    };
  }
  function Re(s) {
    return s;
  }
  function Mr() {
    return !1;
  }
  e.exports = qr;
})($r, Y);
function ke(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: We } = Object.prototype, { getPrototypeOf: Xt } = Object, Qt = ((e) => (t) => {
  const n = We.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), v = (e) => (e = e.toLowerCase(), (t) => Qt(t) === e), wt = (e) => (t) => typeof t === e, { isArray: tt } = Array, at = wt("undefined");
function Jr(e) {
  return e !== null && !at(e) && e.constructor !== null && !at(e.constructor) && k(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const $e = v("ArrayBuffer");
function Gr(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && $e(e.buffer), t;
}
const Vr = wt("string"), k = wt("function"), Je = wt("number"), Yt = (e) => e !== null && typeof e == "object", Kr = (e) => e === !0 || e === !1, gt = (e) => {
  if (Qt(e) !== "object")
    return !1;
  const t = Xt(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Xr = v("Date"), Qr = v("File"), Yr = v("Blob"), Zr = v("FileList"), ts = (e) => Yt(e) && k(e.pipe), es = (e) => {
  const t = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || We.call(e) === t || k(e.toString) && e.toString() === t);
}, ns = v("URLSearchParams"), rs = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ct(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, i;
  if (typeof e != "object" && (e = [e]), tt(e))
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
const Ve = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), Ke = (e) => !at(e) && e !== Ve;
function Jt() {
  const { caseless: e } = Ke(this) && this || {}, t = {}, n = (r, i) => {
    const a = e && Ge(t, i) || i;
    gt(t[a]) && gt(r) ? t[a] = Jt(t[a], r) : gt(r) ? t[a] = Jt({}, r) : tt(r) ? t[a] = r.slice() : t[a] = r;
  };
  for (let r = 0, i = arguments.length; r < i; r++)
    arguments[r] && ct(arguments[r], n);
  return t;
}
const ss = (e, t, n, { allOwnKeys: r } = {}) => (ct(t, (i, a) => {
  n && k(i) ? e[a] = ke(i, n) : e[a] = i;
}, { allOwnKeys: r }), e), is = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), os = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, as = (e, t, n, r) => {
  let i, a, c;
  const d = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (i = Object.getOwnPropertyNames(e), a = i.length; a-- > 0; )
      c = i[a], (!r || r(c, e, t)) && !d[c] && (t[c] = e[c], d[c] = !0);
    e = n !== !1 && Xt(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, cs = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, us = (e) => {
  if (!e)
    return null;
  if (tt(e))
    return e;
  let t = e.length;
  if (!Je(t))
    return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, ls = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Xt(Uint8Array)), fs = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let i;
  for (; (i = r.next()) && !i.done; ) {
    const a = i.value;
    t.call(e, a[0], a[1]);
  }
}, ds = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, hs = v("HTMLFormElement"), ps = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, i) {
    return r.toUpperCase() + i;
  }
), Ne = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), ms = v("RegExp"), Xe = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  ct(n, (i, a) => {
    t(i, a, e) !== !1 && (r[a] = i);
  }), Object.defineProperties(e, r);
}, bs = (e) => {
  Xe(e, (t, n) => {
    if (k(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (k(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, ys = (e, t) => {
  const n = {}, r = (i) => {
    i.forEach((a) => {
      n[a] = !0;
    });
  };
  return tt(e) ? r(e) : r(String(e).split(t)), n;
}, Es = () => {
}, gs = (e, t) => (e = +e, Number.isFinite(e) ? e : t), Mt = "abcdefghijklmnopqrstuvwxyz", Pe = "0123456789", Qe = {
  DIGIT: Pe,
  ALPHA: Mt,
  ALPHA_DIGIT: Mt + Mt.toUpperCase() + Pe
}, Ss = (e = 16, t = Qe.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function Os(e) {
  return !!(e && k(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const Ts = (e) => {
  const t = new Array(10), n = (r, i) => {
    if (Yt(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[i] = r;
        const a = tt(r) ? [] : {};
        return ct(r, (c, d) => {
          const b = n(c, i + 1);
          !at(b) && (a[d] = b);
        }), t[i] = void 0, a;
      }
    }
    return r;
  };
  return n(e, 0);
}, l = {
  isArray: tt,
  isArrayBuffer: $e,
  isBuffer: Jr,
  isFormData: es,
  isArrayBufferView: Gr,
  isString: Vr,
  isNumber: Je,
  isBoolean: Kr,
  isObject: Yt,
  isPlainObject: gt,
  isUndefined: at,
  isDate: Xr,
  isFile: Qr,
  isBlob: Yr,
  isRegExp: ms,
  isFunction: k,
  isStream: ts,
  isURLSearchParams: ns,
  isTypedArray: ls,
  isFileList: Zr,
  forEach: ct,
  merge: Jt,
  extend: ss,
  trim: rs,
  stripBOM: is,
  inherits: os,
  toFlatObject: as,
  kindOf: Qt,
  kindOfTest: v,
  endsWith: cs,
  toArray: us,
  forEachEntry: fs,
  matchAll: ds,
  isHTMLForm: hs,
  hasOwnProperty: Ne,
  hasOwnProp: Ne,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Xe,
  freezeMethods: bs,
  toObjectSet: ys,
  toCamelCase: ps,
  noop: Es,
  toFiniteNumber: gs,
  findKey: Ge,
  global: Ve,
  isContextDefined: Ke,
  ALPHABET: Qe,
  generateString: Ss,
  isSpecCompliantForm: Os,
  toJSONObject: Ts
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
const As = null;
function Gt(e) {
  return l.isPlainObject(e) || l.isArray(e);
}
function tn(e) {
  return l.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function De(e, t, n) {
  return e ? e.concat(t).map(function(i, a) {
    return i = tn(i), !n && a ? "[" + i + "]" : i;
  }).join(n ? "." : "") : t;
}
function ws(e) {
  return l.isArray(e) && !e.some(Gt);
}
const Rs = l.toFlatObject(l, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Rt(e, t, n) {
  if (!l.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = l.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(g, F) {
    return !l.isUndefined(F[g]);
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
  function p(m, g, F) {
    let D = m;
    if (m && !F && typeof m == "object") {
      if (l.endsWith(g, "{}"))
        g = r ? g : g.slice(0, -2), m = JSON.stringify(m);
      else if (l.isArray(m) && ws(m) || (l.isFileList(m) || l.endsWith(g, "[]")) && (D = l.toArray(m)))
        return g = tn(g), D.forEach(function(G, Nt) {
          !(l.isUndefined(G) || G === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            c === !0 ? De([g], Nt, a) : c === null ? g : g + "[]",
            f(G)
          );
        }), !1;
    }
    return Gt(m) ? !0 : (t.append(De(F, g, a), f(m)), !1);
  }
  const E = [], N = Object.assign(Rs, {
    defaultVisitor: p,
    convertValue: f,
    isVisitable: Gt
  });
  function A(m, g) {
    if (!l.isUndefined(m)) {
      if (E.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + g.join("."));
      E.push(m), l.forEach(m, function(D, j) {
        (!(l.isUndefined(D) || D === null) && i.call(
          t,
          D,
          l.isString(j) ? j.trim() : j,
          g,
          N
        )) === !0 && A(D, g ? g.concat(j) : [j]);
      }), E.pop();
    }
  }
  if (!l.isObject(e))
    throw new TypeError("data must be an object");
  return A(e), t;
}
function xe(e) {
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
function Zt(e, t) {
  this._pairs = [], e && Rt(e, this, t);
}
const en = Zt.prototype;
en.append = function(t, n) {
  this._pairs.push([t, n]);
};
en.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, xe);
  } : xe;
  return this._pairs.map(function(i) {
    return n(i[0]) + "=" + n(i[1]);
  }, "").join("&");
};
function _s(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function nn(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || _s, i = n && n.serialize;
  let a;
  if (i ? a = i(t, n) : a = l.isURLSearchParams(t) ? t.toString() : new Zt(t, n).toString(r), a) {
    const c = e.indexOf("#");
    c !== -1 && (e = e.slice(0, c)), e += (e.indexOf("?") === -1 ? "?" : "&") + a;
  }
  return e;
}
class Cs {
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
const Ue = Cs, rn = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Ns = typeof URLSearchParams < "u" ? URLSearchParams : Zt, Ps = typeof FormData < "u" ? FormData : null, Ds = typeof Blob < "u" ? Blob : null, xs = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), Us = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), L = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Ns,
    FormData: Ps,
    Blob: Ds
  },
  isStandardBrowserEnv: xs,
  isStandardBrowserWebWorkerEnv: Us,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function Fs(e, t) {
  return Rt(e, new L.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, i, a) {
      return L.isNode && l.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : a.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Ls(e) {
  return l.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function js(e) {
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
    return c = !c && l.isArray(i) ? i.length : c, b ? (l.hasOwnProp(i, c) ? i[c] = [i[c], r] : i[c] = r, !d) : ((!i[c] || !l.isObject(i[c])) && (i[c] = []), t(n, r, i[c], a) && l.isArray(i[c]) && (i[c] = js(i[c])), !d);
  }
  if (l.isFormData(e) && l.isFunction(e.entries)) {
    const n = {};
    return l.forEachEntry(e, (r, i) => {
      t(Ls(r), i, n, 0);
    }), n;
  }
  return null;
}
const Bs = {
  "Content-Type": void 0
};
function Is(e, t, n) {
  if (l.isString(e))
    try {
      return (t || JSON.parse)(e), l.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const _t = {
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
        return Fs(t, this.formSerializer).toString();
      if ((d = l.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const b = this.env && this.env.FormData;
        return Rt(
          d ? { "files[]": t } : t,
          b && new b(),
          this.formSerializer
        );
      }
    }
    return a || i ? (n.setContentType("application/json", !1), Is(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || _t.transitional, r = n && n.forcedJSONParsing, i = this.responseType === "json";
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
    FormData: L.classes.FormData,
    Blob: L.classes.Blob
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
  _t.headers[t] = {};
});
l.forEach(["post", "put", "patch"], function(t) {
  _t.headers[t] = l.merge(Bs);
});
const te = _t, Hs = l.toObjectSet([
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
]), qs = (e) => {
  const t = {};
  let n, r, i;
  return e && e.split(`
`).forEach(function(c) {
    i = c.indexOf(":"), n = c.substring(0, i).trim().toLowerCase(), r = c.substring(i + 1).trim(), !(!n || t[n] && Hs[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, Fe = Symbol("internals");
function ot(e) {
  return e && String(e).trim().toLowerCase();
}
function St(e) {
  return e === !1 || e == null ? e : l.isArray(e) ? e.map(St) : String(e);
}
function vs(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
function Ms(e) {
  return /^[-_a-zA-Z]+$/.test(e.trim());
}
function zt(e, t, n, r, i) {
  if (l.isFunction(r))
    return r.call(this, t, n);
  if (i && (t = n), !!l.isString(t)) {
    if (l.isString(r))
      return t.indexOf(r) !== -1;
    if (l.isRegExp(r))
      return r.test(t);
  }
}
function zs(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function ks(e, t) {
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
class Ct {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const i = this;
    function a(d, b, f) {
      const p = ot(b);
      if (!p)
        throw new Error("header name must be a non-empty string");
      const E = l.findKey(i, p);
      (!E || i[E] === void 0 || f === !0 || f === void 0 && i[E] !== !1) && (i[E || b] = St(d));
    }
    const c = (d, b) => l.forEach(d, (f, p) => a(f, p, b));
    return l.isPlainObject(t) || t instanceof this.constructor ? c(t, n) : l.isString(t) && (t = t.trim()) && !Ms(t) ? c(qs(t), n) : t != null && a(n, t, r), this;
  }
  get(t, n) {
    if (t = ot(t), t) {
      const r = l.findKey(this, t);
      if (r) {
        const i = this[r];
        if (!n)
          return i;
        if (n === !0)
          return vs(i);
        if (l.isFunction(n))
          return n.call(this, i, r);
        if (l.isRegExp(n))
          return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = ot(t), t) {
      const r = l.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || zt(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let i = !1;
    function a(c) {
      if (c = ot(c), c) {
        const d = l.findKey(r, c);
        d && (!n || zt(r, r[d], d, n)) && (delete r[d], i = !0);
      }
    }
    return l.isArray(t) ? t.forEach(a) : a(t), i;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, i = !1;
    for (; r--; ) {
      const a = n[r];
      (!t || zt(this, this[a], a, t, !0)) && (delete this[a], i = !0);
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
      const d = t ? zs(a) : String(a).trim();
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
    const r = (this[Fe] = this[Fe] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function a(c) {
      const d = ot(c);
      r[d] || (ks(i, c), r[d] = !0);
    }
    return l.isArray(t) ? t.forEach(a) : a(t), this;
  }
}
Ct.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
l.freezeMethods(Ct.prototype);
l.freezeMethods(Ct);
const q = Ct;
function kt(e, t) {
  const n = this || te, r = t || n, i = q.from(r.headers);
  let a = r.data;
  return l.forEach(e, function(d) {
    a = d.call(n, a, i.normalize(), t ? t.status : void 0);
  }), i.normalize(), a;
}
function on(e) {
  return !!(e && e.__CANCEL__);
}
function ut(e, t, n) {
  T.call(this, e ?? "canceled", T.ERR_CANCELED, t, n), this.name = "CanceledError";
}
l.inherits(ut, T, {
  __CANCEL__: !0
});
function Ws(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new T(
    "Request failed with status code " + n.status,
    [T.ERR_BAD_REQUEST, T.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
const $s = L.isStandardBrowserEnv ? (
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
function Js(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Gs(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function an(e, t) {
  return e && !Js(t) ? Gs(e, t) : t;
}
const Vs = L.isStandardBrowserEnv ? (
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
function Ks(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Xs(e, t) {
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
function Le(e, t) {
  let n = 0;
  const r = Xs(50, 250);
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
const Qs = typeof XMLHttpRequest < "u", Ys = Qs && function(e) {
  return new Promise(function(n, r) {
    let i = e.data;
    const a = q.from(e.headers).normalize(), c = e.responseType;
    let d;
    function b() {
      e.cancelToken && e.cancelToken.unsubscribe(d), e.signal && e.signal.removeEventListener("abort", d);
    }
    l.isFormData(i) && (L.isStandardBrowserEnv || L.isStandardBrowserWebWorkerEnv) && a.setContentType(!1);
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
      const A = q.from(
        "getAllResponseHeaders" in f && f.getAllResponseHeaders()
      ), g = {
        data: !c || c === "text" || c === "json" ? f.responseText : f.response,
        status: f.status,
        statusText: f.statusText,
        headers: A,
        config: e,
        request: f
      };
      Ws(function(D) {
        n(D), b();
      }, function(D) {
        r(D), b();
      }, g), f = null;
    }
    if ("onloadend" in f ? f.onloadend = E : f.onreadystatechange = function() {
      !f || f.readyState !== 4 || f.status === 0 && !(f.responseURL && f.responseURL.indexOf("file:") === 0) || setTimeout(E);
    }, f.onabort = function() {
      f && (r(new T("Request aborted", T.ECONNABORTED, e, f)), f = null);
    }, f.onerror = function() {
      r(new T("Network Error", T.ERR_NETWORK, e, f)), f = null;
    }, f.ontimeout = function() {
      let m = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const g = e.transitional || rn;
      e.timeoutErrorMessage && (m = e.timeoutErrorMessage), r(new T(
        m,
        g.clarifyTimeoutError ? T.ETIMEDOUT : T.ECONNABORTED,
        e,
        f
      )), f = null;
    }, L.isStandardBrowserEnv) {
      const A = (e.withCredentials || Vs(p)) && e.xsrfCookieName && $s.read(e.xsrfCookieName);
      A && a.set(e.xsrfHeaderName, A);
    }
    i === void 0 && a.setContentType(null), "setRequestHeader" in f && l.forEach(a.toJSON(), function(m, g) {
      f.setRequestHeader(g, m);
    }), l.isUndefined(e.withCredentials) || (f.withCredentials = !!e.withCredentials), c && c !== "json" && (f.responseType = e.responseType), typeof e.onDownloadProgress == "function" && f.addEventListener("progress", Le(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && f.upload && f.upload.addEventListener("progress", Le(e.onUploadProgress)), (e.cancelToken || e.signal) && (d = (A) => {
      f && (r(!A || A.type ? new ut(null, e, f) : A), f.abort(), f = null);
    }, e.cancelToken && e.cancelToken.subscribe(d), e.signal && (e.signal.aborted ? d() : e.signal.addEventListener("abort", d)));
    const N = Ks(p);
    if (N && L.protocols.indexOf(N) === -1) {
      r(new T("Unsupported protocol " + N + ":", T.ERR_BAD_REQUEST, e));
      return;
    }
    f.send(i || null);
  });
}, Ot = {
  http: As,
  xhr: Ys
};
l.forEach(Ot, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Zs = {
  getAdapter: (e) => {
    e = l.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    for (let i = 0; i < t && (n = e[i], !(r = l.isString(n) ? Ot[n.toLowerCase()] : n)); i++)
      ;
    if (!r)
      throw r === !1 ? new T(
        `Adapter ${n} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        l.hasOwnProp(Ot, n) ? `Adapter '${n}' is not available in the build` : `Unknown adapter '${n}'`
      );
    if (!l.isFunction(r))
      throw new TypeError("adapter is not a function");
    return r;
  },
  adapters: Ot
};
function Wt(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new ut(null, e);
}
function je(e) {
  return Wt(e), e.headers = q.from(e.headers), e.data = kt.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Zs.getAdapter(e.adapter || te.adapter)(e).then(function(r) {
    return Wt(e), r.data = kt.call(
      e,
      e.transformResponse,
      r
    ), r.headers = q.from(r.headers), r;
  }, function(r) {
    return on(r) || (Wt(e), r && r.response && (r.response.data = kt.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = q.from(r.response.headers))), Promise.reject(r);
  });
}
const Be = (e) => e instanceof q ? e.toJSON() : e;
function Z(e, t) {
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
    headers: (f, p) => i(Be(f), Be(p), !0)
  };
  return l.forEach(Object.keys(e).concat(Object.keys(t)), function(p) {
    const E = b[p] || i, N = E(e[p], t[p], p);
    l.isUndefined(N) && E !== d || (n[p] = N);
  }), n;
}
const cn = "1.3.4", ee = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  ee[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Ie = {};
ee.transitional = function(t, n, r) {
  function i(a, c) {
    return "[Axios v" + cn + "] Transitional option '" + a + "'" + c + (r ? ". " + r : "");
  }
  return (a, c, d) => {
    if (t === !1)
      throw new T(
        i(c, " has been removed" + (n ? " in " + n : "")),
        T.ERR_DEPRECATED
      );
    return n && !Ie[c] && (Ie[c] = !0, console.warn(
      i(
        c,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(a, c, d) : !0;
  };
};
function ti(e, t, n) {
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
const Vt = {
  assertOptions: ti,
  validators: ee
}, z = Vt.validators;
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
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Z(this.defaults, n);
    const { transitional: r, paramsSerializer: i, headers: a } = n;
    r !== void 0 && Vt.assertOptions(r, {
      silentJSONParsing: z.transitional(z.boolean),
      forcedJSONParsing: z.transitional(z.boolean),
      clarifyTimeoutError: z.transitional(z.boolean)
    }, !1), i !== void 0 && Vt.assertOptions(i, {
      encode: z.function,
      serialize: z.function
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let c;
    c = a && l.merge(
      a.common,
      a[n.method]
    ), c && l.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (m) => {
        delete a[m];
      }
    ), n.headers = q.concat(c, a);
    const d = [];
    let b = !0;
    this.interceptors.request.forEach(function(g) {
      typeof g.runWhen == "function" && g.runWhen(n) === !1 || (b = b && g.synchronous, d.unshift(g.fulfilled, g.rejected));
    });
    const f = [];
    this.interceptors.response.forEach(function(g) {
      f.push(g.fulfilled, g.rejected);
    });
    let p, E = 0, N;
    if (!b) {
      const m = [je.bind(this), void 0];
      for (m.unshift.apply(m, d), m.push.apply(m, f), N = m.length, p = Promise.resolve(n); E < N; )
        p = p.then(m[E++], m[E++]);
      return p;
    }
    N = d.length;
    let A = n;
    for (E = 0; E < N; ) {
      const m = d[E++], g = d[E++];
      try {
        A = m(A);
      } catch (F) {
        g.call(this, F);
        break;
      }
    }
    try {
      p = je.call(this, A);
    } catch (m) {
      return Promise.reject(m);
    }
    for (E = 0, N = f.length; E < N; )
      p = p.then(f[E++], f[E++]);
    return p;
  }
  getUri(t) {
    t = Z(this.defaults, t);
    const n = an(t.baseURL, t.url);
    return nn(n, t.params, t.paramsSerializer);
  }
}
l.forEach(["delete", "get", "head", "options"], function(t) {
  At.prototype[t] = function(n, r) {
    return this.request(Z(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
l.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(a, c, d) {
      return this.request(Z(d || {}, {
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
const Tt = At;
class ne {
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
      r.reason || (r.reason = new ut(a, c, d), n(r.reason));
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
      token: new ne(function(i) {
        t = i;
      }),
      cancel: t
    };
  }
}
const ei = ne;
function ni(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function ri(e) {
  return l.isObject(e) && e.isAxiosError === !0;
}
const Kt = {
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
Object.entries(Kt).forEach(([e, t]) => {
  Kt[t] = e;
});
const si = Kt;
function un(e) {
  const t = new Tt(e), n = ke(Tt.prototype.request, t);
  return l.extend(n, Tt.prototype, t, { allOwnKeys: !0 }), l.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(i) {
    return un(Z(e, i));
  }, n;
}
const P = un(te);
P.Axios = Tt;
P.CanceledError = ut;
P.CancelToken = ei;
P.isCancel = on;
P.VERSION = cn;
P.toFormData = Rt;
P.AxiosError = T;
P.Cancel = P.CanceledError;
P.all = function(t) {
  return Promise.all(t);
};
P.spread = ni;
P.isAxiosError = ri;
P.mergeConfig = Z;
P.AxiosHeaders = q;
P.formToJSON = (e) => sn(l.isHTMLForm(e) ? new FormData(e) : e);
P.HttpStatusCode = si;
P.default = P;
const He = P;
function ii(e, t) {
  e.run(y.START, t), He(t).then((n) => {
    e.run(y.STATUS_CODE, n.status), e.run(y.SUCCESS, n);
  }).catch((n) => {
    if (He.isCancel(n)) {
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
function oi(e) {
  const t = Q(e, "cancelToken") ? e.cancelToken : null, n = !t && Q(e, "signal") ? e.signal : null;
  let r = null;
  return !t && !n && (r = new AbortController(), e = Object.assign({}, e, { signal: r.signal })), {
    options: e,
    abortControllerInstance: r
  };
}
function ai(e, t, n = X.GET, r = {}, i = {}) {
  const a = ci(t, n, r), c = Q(i, "cancelToken") ? i.cancelToken : null;
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
  return Y(b, i);
}
function ci(e, t, n, r) {
  if (($t(n) || r) && !(n instanceof FormData) && (n = qe(n)), !(n instanceof FormData) && t === X.GET && Object.keys(n).length) {
    e = e.endsWith("/") ? e.slice(0, -1) : e;
    const i = new URLSearchParams({ ...n });
    e += "?" + i.toString();
  }
  return {
    url: e,
    payload: n
  };
}
class ui {
  constructor(t = "http://localhost", n = [], r = {}, i = {}) {
    this.requestURL = t, this.state = {}, this._userStates = n, this.requestConfig = r, this.hooks = Ce(i) ? [] : [i], this._cancelToken = null, this.availableHooks = Array.from(Object.values(y)), this.availableEvents = Array.from(Object.values(H)), this.resetStates();
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
    return this.requestConfig = Object.assign({}, Y(this.requestConfig, t)), this;
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
    const c = oi(i);
    this._cancelToken = c.abortControllerInstance;
    const d = Object.assign({}, Y(this.requestConfig, c.options)), b = Ce(a) ? [...this.hooks] : [...this.hooks, a], f = new Wr(this), p = ai(f, this.requestURL, t, n, d);
    f.registerInternalHooks(), f.registerUserHooks(b), f.run(y.BEFORE, p), ii(f, p);
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
    this.state = Object.assign({}, ze), this._registerUserStates();
  }
}
export {
  ui as AquaRequest
};
