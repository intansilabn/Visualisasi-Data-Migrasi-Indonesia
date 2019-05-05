// https://github.com/topojson/topojson Version 2.2.0. Copyright 2016 Mike Bostock.
(function(n, r) {
  "object" == typeof exports && "undefined" != typeof module ? r(exports) : "function" == typeof define && define.amd ? define(["exports"], r) : r(n.topojson = n.topojson || {})
})(this, function(n) {
  "use strict";

  function r(n, r, e, o) {
    t(n, r, e), t(n, r, r + o), t(n, r + o, e)
  }

  function t(n, r, t) {
    for (var e, o = r + (t-- - r >> 1); r < o; ++r, --t) e = n[r], n[r] = n[t], n[t] = e
  }

  function e(n) {
    return (n && U.hasOwnProperty(n.type) ? U[n.type] : a)(n)
  }

  function o(n) {
    var r = n.geometry;
    return null == r ? n.type = null : (a(r), n.type = r.type, r.geometries ? n.geometries = r.geometries : r.coordinates && (n.coordinates = r.coordinates), r.bbox && (n.bbox = r.bbox)), delete n.geometry, n
  }

  function a(n) {
    return n ? (z.hasOwnProperty(n.type) && z[n.type](n), n) : {
      type: null
    }
  }

  function i(n) {
    var r, t = n[0],
      e = n[1];
    return e < t && (r = t, t = e, e = r), t + 31 * e
  }

  function c(n, r) {
    var t, e = n[0],
      o = n[1],
      a = r[0],
      i = r[1];
    return o < e && (t = e, e = o, o = t), i < a && (t = a, a = i, i = t), e === a && o === i
  }

  function u() {
    return !0
  }

  function f(n) {
    return n
  }

  function l(n) {
    return null != n.type
  }

  function s(n, r) {
    var t = r.id,
      e = r.bbox,
      o = null == r.properties ? {} : r.properties,
      a = h(n, r);
    return null == t && null == e ? {
      type: "Feature",
      properties: o,
      geometry: a
    } : null == e ? {
      type: "Feature",
      id: t,
      properties: o,
      geometry: a
    } : {
      type: "Feature",
      id: t,
      bbox: e,
      properties: o,
      geometry: a
    }
  }

  function h(n, r) {
    function t(n, r) {
      r.length && r.pop();
      for (var t = f[n < 0 ? ~n : n], e = 0, o = t.length; e < o; ++e) r.push(u(t[e].slice(), e));
      n < 0 && Q(r, o)
    }

    function e(n) {
      return u(n.slice())
    }

    function o(n) {
      for (var r = [], e = 0, o = n.length; e < o; ++e) t(n[e], r);
      return r.length < 2 && r.push(r[0].slice()), r
    }

    function a(n) {
      for (var r = o(n); r.length < 4;) r.push(r[0].slice());
      return r
    }

    function i(n) {
      return n.map(a)
    }

    function c(n) {
      var r, t = n.type;
      switch (t) {
        case "GeometryCollection":
          return {
            type: t,
            geometries: n.geometries.map(c)
          };
        case "Point":
          r = e(n.coordinates);
          break;
        case "MultiPoint":
          r = n.coordinates.map(e);
          break;
        case "LineString":
          r = o(n.arcs);
          break;
        case "MultiLineString":
          r = n.arcs.map(o);
          break;
        case "Polygon":
          r = i(n.arcs);
          break;
        case "MultiPolygon":
          r = n.arcs.map(i);
          break;
        default:
          return null
      }
      return {
        type: t,
        coordinates: r
      }
    }
    var u = J(n),
      f = n.arcs;
    return c(r)
  }

  function g(n, r, t) {
    var e, o, a;
    if (arguments.length > 1) e = v(n, r, t);
    else
      for (o = 0, e = new Array(a = n.arcs.length); o < a; ++o) e[o] = o;
    return {
      type: "MultiLineString",
      arcs: Y(n, e)
    }
  }

  function v(n, r, t) {
    function e(n) {
      var r = n < 0 ? ~n : n;
      (l[r] || (l[r] = [])).push({
        i: n,
        g: u
      })
    }

    function o(n) {
      n.forEach(e)
    }

    function a(n) {
      n.forEach(o)
    }

    function i(n) {
      n.forEach(a)
    }

    function c(n) {
      switch (u = n, n.type) {
        case "GeometryCollection":
          n.geometries.forEach(c);
          break;
        case "LineString":
          o(n.arcs);
          break;
        case "MultiLineString":
        case "Polygon":
          a(n.arcs);
          break;
        case "MultiPolygon":
          i(n.arcs)
      }
    }
    var u, f = [],
      l = [];
    return c(r), l.forEach(null == t ? function(n) {
      f.push(n[0].i)
    } : function(n) {
      t(n[0].g, n[n.length - 1].g) && f.push(n[0].i)
    }), f
  }

  function p(n) {
    for (var r, t = -1, e = n.length, o = n[e - 1], a = 0; ++t < e;) r = o, o = n[t], a += r[0] * o[1] - r[1] * o[0];
    return Math.abs(a)
  }

  function y(n, r) {
    function t(n) {
      switch (n.type) {
        case "GeometryCollection":
          n.geometries.forEach(t);
          break;
        case "Polygon":
          e(n.arcs);
          break;
        case "MultiPolygon":
          n.arcs.forEach(e)
      }
    }

    function e(n) {
      n.forEach(function(r) {
        r.forEach(function(r) {
          (a[r = r < 0 ? ~r : r] || (a[r] = [])).push(n)
        })
      }), i.push(n)
    }

    function o(r) {
      return p(h(n, {
        type: "Polygon",
        arcs: [r]
      }).coordinates[0])
    }
    var a = {},
      i = [],
      c = [];
    return r.forEach(t), i.forEach(function(n) {
      if (!n._) {
        var r = [],
          t = [n];
        for (n._ = 1, c.push(r); n = t.pop();) r.push(n), n.forEach(function(n) {
          n.forEach(function(n) {
            a[n < 0 ? ~n : n].forEach(function(n) {
              n._ || (n._ = 1, t.push(n))
            })
          })
        })
      }
    }), i.forEach(function(n) {
      delete n._
    }), {
      type: "MultiPolygon",
      arcs: c.map(function(r) {
        var t, e = [];
        if (r.forEach(function(n) {
            n.forEach(function(n) {
              n.forEach(function(n) {
                a[n < 0 ? ~n : n].length < 2 && e.push(n)
              })
            })
          }), e = Y(n, e), (t = e.length) > 1)
          for (var i, c, u = 1, f = o(e[0]); u < t; ++u)(i = o(e[u])) > f && (c = e[0], e[0] = e[u], e[u] = c, f = i);
        return e
      })
    }
  }

  function d(n) {
    var r = n[0],
      t = n[1],
      e = n[2];
    return Math.abs((r[0] - e[0]) * (t[1] - r[1]) - (r[0] - t[0]) * (e[1] - r[1]))
  }

  function m(n) {
    for (var r, t = -1, e = n.length, o = n[e - 1], a = 0; ++t < e;) r = o, o = n[t], a += r[0] * o[1] - r[1] * o[0];
    return Math.abs(a) / 2
  }

  function b(n, r) {
    return n[1][2] - r[1][2]
  }

  function E(n, r) {
    if (t = n.length) {
      if ((r = +r) <= 0 || t < 2) return n[0];
      if (r >= 1) return n[t - 1];
      var t, e = (t - 1) * r,
        o = Math.floor(e),
        a = n[o],
        i = n[o + 1];
      return a + (i - a) * (e - o)
    }
  }

  function M(n, r) {
    return r - n
  }

  function P(n, r) {
    if (!n.length) return 0;
    var t, e, o, a, i, c, u, f = 0,
      l = n[0],
      s = l[0] * gn,
      h = (l[1] * gn + sn) / 2,
      g = dn(h),
      v = bn(h);
    for (i = 1, c = n.length; i < c; ++i) l = n[i], t = s, s = l[0] * gn, e = s - t, h = (l[1] * gn + sn) / 2, o = g, g = dn(h), a = v, v = bn(h), u = a * v, f += yn(u * bn(e), o * g + u * dn(e));
    return f = 2 * (f > ln ? f - sn : f < -ln ? f + sn : f), r && (f *= -1), f < 0 ? f + hn : f
  }

  function w(n) {
    var r = n[0][0] * gn,
      t = n[0][1] * gn,
      e = dn(t),
      o = bn(t),
      a = n[1][0] * gn,
      i = n[1][1] * gn,
      c = dn(i),
      u = bn(i),
      f = n[2][0] * gn,
      l = n[2][1] * gn,
      s = dn(l),
      h = bn(l),
      g = k(r, e, o, a, c, u),
      v = k(a, c, u, f, s, h),
      p = k(f, s, h, r, e, o),
      y = (g + v + p) / 2;
    return 4 * pn(En(mn(0, Mn(y / 2) * Mn((y - g) / 2) * Mn((y - v) / 2) * Mn((y - p) / 2))))
  }

  function k(n, r, t, e, o, a) {
    var i = vn(e - n),
      c = dn(i),
      u = bn(i),
      f = a * u,
      l = t * o - r * a * c,
      s = r * o + t * a * c;
    return yn(En(f * f + l * l), s)
  }
  var x = function(n) {
      function r(n) {
        n && f.hasOwnProperty(n.type) && f[n.type](n)
      }

      function t(n) {
        var r = n[0],
          t = n[1];
        r < a && (a = r), r > c && (c = r), t < i && (i = t), t > u && (u = t)
      }

      function e(n) {
        n.forEach(t)
      }

      function o(n) {
        n.forEach(e)
      }
      var a = 1 / 0,
        i = 1 / 0,
        c = -(1 / 0),
        u = -(1 / 0),
        f = {
          GeometryCollection: function(n) {
            n.geometries.forEach(r)
          },
          Point: function(n) {
            t(n.coordinates)
          },
          MultiPoint: function(n) {
            n.coordinates.forEach(t)
          },
          LineString: function(n) {
            e(n.coordinates)
          },
          MultiLineString: function(n) {
            n.coordinates.forEach(e)
          },
          Polygon: function(n) {
            n.coordinates.forEach(e)
          },
          MultiPolygon: function(n) {
            n.coordinates.forEach(o)
          }
        };
      for (var l in n) r(n[l]);
      return c >= a && u >= i ? [a, i, c, u] : void 0
    },
    A = function(n, r, t, e, o) {
      function a(e) {
        for (var a = r(e) & f, i = u[a], c = 0; i != o;) {
          if (t(i, e)) return !0;
          if (++c >= n) throw new Error("full hashset");
          i = u[a = a + 1 & f]
        }
        return u[a] = e, !0
      }

      function i(e) {
        for (var a = r(e) & f, i = u[a], c = 0; i != o;) {
          if (t(i, e)) return !0;
          if (++c >= n) break;
          i = u[a = a + 1 & f]
        }
        return !1
      }

      function c() {
        for (var n = [], r = 0, t = u.length; r < t; ++r) {
          var e = u[r];
          e != o && n.push(e)
        }
        return n
      }
      3 === arguments.length && (e = Array, o = null);
      for (var u = new e(n = 1 << Math.max(4, Math.ceil(Math.log(n) / Math.LN2))), f = n - 1, l = 0; l < n; ++l) u[l] = o;
      return {
        add: a,
        has: i,
        values: c
      }
    },
    L = function(n, r, t, e, o, a) {
      function i(e, a) {
        for (var i = r(e) & h, c = l[i], u = 0; c != o;) {
          if (t(c, e)) return s[i] = a;
          if (++u >= n) throw new Error("full hashmap");
          c = l[i = i + 1 & h]
        }
        return l[i] = e, s[i] = a, a
      }

      function c(e, a) {
        for (var i = r(e) & h, c = l[i], u = 0; c != o;) {
          if (t(c, e)) return s[i];
          if (++u >= n) throw new Error("full hashmap");
          c = l[i = i + 1 & h]
        }
        return l[i] = e, s[i] = a, a
      }

      function u(e, a) {
        for (var i = r(e) & h, c = l[i], u = 0; c != o;) {
          if (t(c, e)) return s[i];
          if (++u >= n) break;
          c = l[i = i + 1 & h]
        }
        return a
      }

      function f() {
        for (var n = [], r = 0, t = l.length; r < t; ++r) {
          var e = l[r];
          e != o && n.push(e)
        }
        return n
      }
      3 === arguments.length && (e = a = Array, o = null);
      for (var l = new e(n = 1 << Math.max(4, Math.ceil(Math.log(n) / Math.LN2))), s = new a(n), h = n - 1, g = 0; g < n; ++g) l[g] = o;
      return {
        set: i,
        maybeSet: c,
        get: u,
        keys: f
      }
    },
    S = function(n, r) {
      return n[0] === r[0] && n[1] === r[1]
    },
    C = new ArrayBuffer(16),
    _ = new Float64Array(C),
    j = new Uint32Array(C),
    G = function(n) {
      _[0] = n[0], _[1] = n[1];
      var r = j[0] ^ j[1];
      return r = r << 5 ^ r >> 7 ^ j[2] ^ j[3], 2147483647 & r
    },
    I = function(n) {
      function r(n, r, t, e) {
        if (v[t] !== n) {
          v[t] = n;
          var o = p[t];
          if (o >= 0) {
            var a = y[t];
            o === r && a === e || o === e && a === r || (++m, d[t] = 1)
          } else p[t] = r, y[t] = e
        }
      }

      function t() {
        for (var n = L(1.4 * l.length, e, o, Int32Array, -1, Int32Array), r = new Int32Array(l.length), t = 0, a = l.length; t < a; ++t) r[t] = n.maybeSet(t, t);
        return r
      }

      function e(n) {
        return G(l[n])
      }

      function o(n, r) {
        return S(l[n], l[r])
      }
      var a, i, c, u, f, l = n.coordinates,
        s = n.lines,
        h = n.rings,
        g = t(),
        v = new Int32Array(l.length),
        p = new Int32Array(l.length),
        y = new Int32Array(l.length),
        d = new Int8Array(l.length),
        m = 0;
      for (a = 0, i = l.length; a < i; ++a) v[a] = p[a] = y[a] = -1;
      for (a = 0, i = s.length; a < i; ++a) {
        var b = s[a],
          E = b[0],
          M = b[1];
        for (u = g[E], f = g[++E], ++m, d[u] = 1; ++E <= M;) r(a, c = u, u = f, f = g[E]);
        ++m, d[f] = 1
      }
      for (a = 0, i = l.length; a < i; ++a) v[a] = -1;
      for (a = 0, i = h.length; a < i; ++a) {
        var P = h[a],
          w = P[0] + 1,
          k = P[1];
        for (c = g[k - 1], u = g[w - 1], f = g[w], r(a, c, u, f); ++w <= k;) r(a, c = u, u = f, f = g[w])
      }
      v = p = y = null;
      var x, C = A(1.4 * m, G, S);
      for (a = 0, i = l.length; a < i; ++a) d[x = g[a]] && C.add(l[x]);
      return C
    },
    F = function(n) {
      var t, e, o, a = I(n),
        i = n.coordinates,
        c = n.lines,
        u = n.rings;
      for (e = 0, o = c.length; e < o; ++e)
        for (var f = c[e], l = f[0], s = f[1]; ++l < s;) a.has(i[l]) && (t = {
          0: l,
          1: f[1]
        }, f[1] = l, f = f.next = t);
      for (e = 0, o = u.length; e < o; ++e)
        for (var h = u[e], g = h[0], v = g, p = h[1], y = a.has(i[g]); ++v < p;) a.has(i[v]) && (y ? (t = {
          0: v,
          1: h[1]
        }, h[1] = v, h = h.next = t) : (r(i, g, p, p - v), i[p] = i[g], y = !0, v = g));
      return n
    },
    O = function(n) {
      function r(n) {
        var r, t, a, i, c, u, f, l;
        if (a = y.get(r = h[n[0]]))
          for (f = 0, l = a.length; f < l; ++f)
            if (i = a[f], e(i, n)) return n[0] = i[0], void(n[1] = i[1]);
        if (c = y.get(t = h[n[1]]))
          for (f = 0, l = c.length; f < l; ++f)
            if (u = c[f], o(u, n)) return n[1] = u[0], void(n[0] = u[1]);
        a ? a.push(n) : y.set(r, [n]), c ? c.push(n) : y.set(t, [n]), d.push(n)
      }

      function t(n) {
        var r, t, e, o, u;
        if (t = y.get(r = h[n[0]]))
          for (o = 0, u = t.length; o < u; ++o) {
            if (e = t[o], a(e, n)) return n[0] = e[0], void(n[1] = e[1]);
            if (i(e, n)) return n[0] = e[1], void(n[1] = e[0])
          }
        if (t = y.get(r = h[n[0] + c(n)]))
          for (o = 0, u = t.length; o < u; ++o) {
            if (e = t[o], a(e, n)) return n[0] = e[0], void(n[1] = e[1]);
            if (i(e, n)) return n[0] = e[1], void(n[1] = e[0])
          }
        t ? t.push(n) : y.set(r, [n]), d.push(n)
      }

      function e(n, r) {
        var t = n[0],
          e = r[0],
          o = n[1],
          a = r[1];
        if (t - o !== e - a) return !1;
        for (; t <= o; ++t, ++e)
          if (!S(h[t], h[e])) return !1;
        return !0
      }

      function o(n, r) {
        var t = n[0],
          e = r[0],
          o = n[1],
          a = r[1];
        if (t - o !== e - a) return !1;
        for (; t <= o; ++t, --a)
          if (!S(h[t], h[a])) return !1;
        return !0
      }

      function a(n, r) {
        var t = n[0],
          e = r[0],
          o = n[1],
          a = r[1],
          i = o - t;
        if (i !== a - e) return !1;
        for (var u = c(n), f = c(r), l = 0; l < i; ++l)
          if (!S(h[t + (l + u) % i], h[e + (l + f) % i])) return !1;
        return !0
      }

      function i(n, r) {
        var t = n[0],
          e = r[0],
          o = n[1],
          a = r[1],
          i = o - t;
        if (i !== a - e) return !1;
        for (var u = c(n), f = i - c(r), l = 0; l < i; ++l)
          if (!S(h[t + (l + u) % i], h[a - (l + f) % i])) return !1;
        return !0
      }

      function c(n) {
        for (var r = n[0], t = n[1], e = r, o = e, a = h[e]; ++e < t;) {
          var i = h[e];
          (i[0] < a[0] || i[0] === a[0] && i[1] < a[1]) && (o = e, a = i)
        }
        return o - r
      }
      var u, f, l, s, h = n.coordinates,
        g = n.lines,
        v = n.rings,
        p = g.length + v.length;
      for (delete n.lines, delete n.rings, l = 0, s = g.length; l < s; ++l)
        for (u = g[l]; u = u.next;) ++p;
      for (l = 0, s = v.length; l < s; ++l)
        for (f = v[l]; f = f.next;) ++p;
      var y = L(2 * p * 1.4, G, S),
        d = n.arcs = [];
      for (l = 0, s = g.length; l < s; ++l) {
        u = g[l];
        do r(u); while (u = u.next)
      }
      for (l = 0, s = v.length; l < s; ++l)
        if (f = v[l], f.next) {
          do r(f); while (f = f.next)
        } else t(f);
      return n
    },
    N = function(n) {
      for (var r = n.arcs, t = -1, e = r.length; ++t < e;)
        for (var o, a, i = r[t], c = 0, u = i.length, f = i[0], l = f[0], s = f[1]; ++c < u;) f = i[c], o = f[0], a = f[1], i[c] = [o - l, a - s], l = o, s = a;
      return n
    },
    q = function(n) {
      function r(n) {
        n && f.hasOwnProperty(n.type) && f[n.type](n)
      }

      function t(n) {
        for (var r = 0, t = n.length; r < t; ++r) u[++a] = n[r];
        var e = {
          0: a - t + 1,
          1: a
        };
        return i.push(e), e
      }

      function e(n) {
        for (var r = 0, t = n.length; r < t; ++r) u[++a] = n[r];
        var e = {
          0: a - t + 1,
          1: a
        };
        return c.push(e), e
      }

      function o(n) {
        return n.map(e)
      }
      var a = -1,
        i = [],
        c = [],
        u = [],
        f = {
          GeometryCollection: function(n) {
            n.geometries.forEach(r)
          },
          LineString: function(n) {
            n.arcs = t(n.coordinates), delete n.coordinates
          },
          MultiLineString: function(n) {
            n.arcs = n.coordinates.map(t), delete n.coordinates
          },
          Polygon: function(n) {
            n.arcs = n.coordinates.map(e), delete n.coordinates
          },
          MultiPolygon: function(n) {
            n.arcs = n.coordinates.map(o), delete n.coordinates
          }
        };
      for (var l in n) r(n[l]);
      return {
        type: "Topology",
        coordinates: u,
        lines: i,
        rings: c,
        objects: n
      }
    },
    T = function(n) {
      var r;
      for (r in n) n[r] = e(n[r]);
      return n
    },
    U = {
      Feature: o,
      FeatureCollection: function(n) {
        return n.type = "GeometryCollection", n.geometries = n.features, n.features.forEach(o), delete n.features, n
      }
    },
    z = {
      GeometryCollection: function(n) {
        for (var r = n.geometries, t = -1, e = r.length; ++t < e;) r[t] = a(r[t])
      },
      MultiPoint: function(n) {
        n.coordinates.length ? n.coordinates.length < 2 && (n.type = "Point", n.coordinates = n.coordinates[0]) : (n.type = null, delete n.coordinates)
      },
      LineString: function(n) {
        n.coordinates.length || (n.type = null, delete n.coordinates)
      },
      MultiLineString: function(n) {
        for (var r = n.coordinates, t = 0, e = 0, o = r.length; t < o; ++t) {
          var a = r[t];
          a.length && (r[e++] = a)
        }
        e ? e < 2 ? (n.type = "LineString", n.coordinates = r[0]) : n.coordinates.length = e : (n.type = null, delete n.coordinates)
      },
      Polygon: function(n) {
        for (var r = n.coordinates, t = 0, e = 0, o = r.length; t < o; ++t) {
          var a = r[t];
          a.length && (r[e++] = a)
        }
        e ? n.coordinates.length = e : (n.type = null, delete n.coordinates)
      },
      MultiPolygon: function(n) {
        for (var r = n.coordinates, t = 0, e = 0, o = r.length; t < o; ++t) {
          for (var a = r[t], i = 0, c = 0, u = a.length; i < u; ++i) {
            var f = a[i];
            f.length && (a[c++] = f)
          }
          c && (a.length = c, r[e++] = a)
        }
        e ? e < 2 ? (n.type = "Polygon", n.coordinates = r[0]) : r.length = e : (n.type = null, delete n.coordinates)
      }
    },
    R = function(n, r, t) {
      function e(n) {
        return n[0] = Math.round((n[0] - i) * l), n[1] = Math.round((n[1] - c) * s), n
      }

      function o(n) {
        for (var r, t, o, a = 0, i = 1, c = n.length, u = e(n[0]), f = u[0], l = u[1]; ++a < c;) u = e(n[a]), t = u[0], o = u[1], t === f && o === l || (r = n[i++], r[0] = f = t, r[1] = l = o);
        n.length = i
      }

      function a(n) {
        n && h.hasOwnProperty(n.type) && h[n.type](n)
      }
      var i = r[0],
        c = r[1],
        u = r[2],
        f = r[3],
        l = u - i ? (t - 1) / (u - i) : 1,
        s = f - c ? (t - 1) / (f - c) : 1,
        h = {
          GeometryCollection: function(n) {
            n.geometries.forEach(a)
          },
          Point: function(n) {
            e(n.coordinates)
          },
          MultiPoint: function(n) {
            n.coordinates.forEach(e)
          },
          LineString: function(n) {
            var r = n.coordinates;
            o(r), r.length < 2 && (r[1] = r[0])
          },
          MultiLineString: function(n) {
            for (var r = n.coordinates, t = 0, e = r.length; t < e; ++t) {
              var a = r[t];
              o(a), a.length < 2 && (a[1] = a[0])
            }
          },
          Polygon: function(n) {
            for (var r = n.coordinates, t = 0, e = r.length; t < e; ++t) {
              var a = r[t];
              for (o(a); a.length < 4;) a.push(a[0])
            }
          },
          MultiPolygon: function(n) {
            for (var r = n.coordinates, t = 0, e = r.length; t < e; ++t)
              for (var a = r[t], i = 0, c = a.length; i < c; ++i) {
                var u = a[i];
                for (o(u); u.length < 4;) u.push(u[0])
              }
          }
        };
      for (var g in n) a(n[g]);
      return {
        scale: [1 / l, 1 / s],
        translate: [i, c]
      }
    },
    V = function(n, r) {
      function t(n) {
        n && h.hasOwnProperty(n.type) && h[n.type](n)
      }

      function e(n) {
        var r = [];
        do {
          var t = s.get(n);
          r.push(n[0] < n[1] ? t : ~t)
        } while (n = n.next);
        return r
      }

      function o(n) {
        return n.map(e)
      }
      var a = x(T(n)),
        u = r > 0 && a && R(n, a, r),
        f = O(F(q(n))),
        l = f.coordinates,
        s = L(1.4 * f.arcs.length, i, c);
      n = f.objects, f.bbox = a, f.arcs = f.arcs.map(function(n, r) {
        return s.set(n, r), l.slice(n[0], n[1] + 1)
      }), delete f.coordinates, l = null;
      var h = {
        GeometryCollection: function(n) {
          n.geometries.forEach(t)
        },
        LineString: function(n) {
          n.arcs = e(n.arcs)
        },
        MultiLineString: function(n) {
          n.arcs = n.arcs.map(e)
        },
        Polygon: function(n) {
          n.arcs = n.arcs.map(e)
        },
        MultiPolygon: function(n) {
          n.arcs = n.arcs.map(o)
        }
      };
      for (var g in n) t(n[g]);
      return u && (f.transform = u, N(f)), f
    },
    B = function(n) {
      function r(n) {
        switch (n.type) {
          case "GeometryCollection":
            n.geometries.forEach(r);
            break;
          case "LineString":
            t(n.arcs);
            break;
          case "MultiLineString":
            n.arcs.forEach(t);
            break;
          case "Polygon":
            n.arcs.forEach(t);
            break;
          case "MultiPolygon":
            n.arcs.forEach(e)
        }
      }

      function t(n) {
        for (var r = 0, t = n.length; r < t; ++r) {
          var e, o = n[r],
            f = o < 0 && (o = ~o, !0);
          null == (e = u[o]) && (u[o] = e = ++c, i[e] = a[o]), n[r] = f ? ~e : e
        }
      }

      function e(n) {
        n.forEach(t)
      }
      var o, a = n.arcs,
        i = n.arcs = [],
        c = -1,
        u = new Array(a.length);
      for (o in n.objects) r(n.objects[o]);
      return n
    },
    W = function(n, r) {
      function t(n) {
        switch (n.type) {
          case "Polygon":
            n.arcs = e(n.arcs), n.arcs || (n.type = null, delete n.arcs);
            break;
          case "MultiPolygon":
            n.arcs = n.arcs.map(e).filter(f), n.arcs.length || (n.type = null, delete n.arcs);
            break;
          case "GeometryCollection":
            n.geometries.forEach(t), n.geometries = n.geometries.filter(l), n.geometries.length || (n.type = null, delete n.geometries)
        }
      }

      function e(n) {
        return n.length && o(n[0]) ? [n.shift()].concat(n.filter(a)) : null
      }

      function o(n) {
        return r(n, !1)
      }

      function a(n) {
        return r(n, !0)
      }
      var i;
      null == r && (r = u);
      for (i in n.objects) t(n.objects[i]);
      return B(n)
    },
    D = function(n) {
      function r(n) {
        switch (n.type) {
          case "GeometryCollection":
            n.geometries.forEach(r);
            break;
          case "Polygon":
            t(n.arcs);
            break;
          case "MultiPolygon":
            n.arcs.forEach(t)
        }
      }

      function t(n) {
        for (var r = 0, t = n.length; r < t; ++r, ++a)
          for (var e = n[r], i = 0, c = e.length; i < c; ++i) {
            var u = e[i];
            u < 0 && (u = ~u);
            var f = o[u];
            f >= 0 && f !== a ? o[u] = -1 : o[u] = a
          }
      }
      var e, o = {},
        a = 0;
      for (e in n.objects) r(n.objects[e]);
      return function(n) {
        for (var r, t = 0, e = n.length; t < e; ++t)
          if (r = n[t], o[r < 0 ? ~r : r] < 0) return !0;
        return !1
      }
    },
    H = function(n) {
      return n
    },
    J = function(n) {
      if (null == (r = n.transform)) return H;
      var r, t, e, o = r.scale[0],
        a = r.scale[1],
        i = r.translate[0],
        c = r.translate[1];
      return function(n, r) {
        return r || (t = e = 0), n[0] = (t += n[0]) * o + i, n[1] = (e += n[1]) * a + c, n
      }
    },
    K = function(n) {
      function r(n) {
        c[0] = n[0], c[1] = n[1], i(c), c[0] < u && (u = c[0]), c[0] > l && (l = c[0]), c[1] < f && (f = c[1]), c[1] > s && (s = c[1])
      }

      function t(n) {
        switch (n.type) {
          case "GeometryCollection":
            n.geometries.forEach(t);
            break;
          case "Point":
            r(n.coordinates);
            break;
          case "MultiPoint":
            n.coordinates.forEach(r)
        }
      }
      var e = n.bbox;
      if (!e) {
        var o, a, i = J(n),
          c = new Array(2),
          u = 1 / 0,
          f = u,
          l = -u,
          s = -u;
        n.arcs.forEach(function(n) {
          for (var r = -1, t = n.length; ++r < t;) o = n[r], c[0] = o[0], c[1] = o[1], i(c, r), c[0] < u && (u = c[0]), c[0] > l && (l = c[0]), c[1] < f && (f = c[1]), c[1] > s && (s = c[1])
        });
        for (a in n.objects) t(n.objects[a]);
        e = n.bbox = [u, f, l, s]
      }
      return e
    },
    Q = function(n, r) {
      for (var t, e = n.length, o = e - r; o < --e;) t = n[o], n[o++] = n[e], n[e] = t
    },
    X = function(n, r) {
      return "GeometryCollection" === r.type ? {
        type: "FeatureCollection",
        features: r.geometries.map(function(r) {
          return s(n, r)
        })
      } : s(n, r)
    },
    Y = function(n, r) {
      function t(r) {
        var t, e = n.arcs[r < 0 ? ~r : r],
          o = e[0];
        return n.transform ? (t = [0, 0], e.forEach(function(n) {
          t[0] += n[0], t[1] += n[1]
        })) : t = e[e.length - 1], r < 0 ? [t, o] : [o, t]
      }

      function e(n, r) {
        for (var t in n) {
          var e = n[t];
          delete r[e.start], delete e.start, delete e.end, e.forEach(function(n) {
            o[n < 0 ? ~n : n] = 1
          }), c.push(e)
        }
      }
      var o = {},
        a = {},
        i = {},
        c = [],
        u = -1;
      return r.forEach(function(t, e) {
        var o, a = n.arcs[t < 0 ? ~t : t];
        a.length < 3 && !a[1][0] && !a[1][1] && (o = r[++u], r[u] = t, r[e] = o)
      }), r.forEach(function(n) {
        var r, e, o = t(n),
          c = o[0],
          u = o[1];
        if (r = i[c])
          if (delete i[r.end], r.push(n), r.end = u, e = a[u]) {
            delete a[e.start];
            var f = e === r ? r : r.concat(e);
            a[f.start = r.start] = i[f.end = e.end] = f
          } else a[r.start] = i[r.end] = r;
        else if (r = a[u])
          if (delete a[r.start], r.unshift(n), r.start = c, e = i[c]) {
            delete i[e.end];
            var l = e === r ? r : e.concat(r);
            a[l.start = e.start] = i[l.end = r.end] = l
          } else a[r.start] = i[r.end] = r;
        else r = [n], a[r.start = c] = i[r.end = u] = r
      }), e(i, a), e(a, i), r.forEach(function(n) {
        o[n < 0 ? ~n : n] || c.push([n])
      }), c
    },
    Z = function(n) {
      return h(n, g.apply(this, arguments))
    },
    $ = function(n) {
      return h(n, y.apply(this, arguments))
    },
    nn = function(n, r) {
      for (var t = 0, e = n.length; t < e;) {
        var o = t + e >>> 1;
        n[o] < r ? t = o + 1 : e = o
      }
      return t
    },
    rn = function(n) {
      function r(n, r) {
        n.forEach(function(n) {
          n < 0 && (n = ~n);
          var t = o[n];
          t ? t.push(r) : o[n] = [r]
        })
      }

      function t(n, t) {
        n.forEach(function(n) {
          r(n, t)
        })
      }

      function e(n, r) {
        "GeometryCollection" === n.type ? n.geometries.forEach(function(n) {
          e(n, r)
        }) : n.type in i && i[n.type](n.arcs, r)
      }
      var o = {},
        a = n.map(function() {
          return []
        }),
        i = {
          LineString: r,
          MultiLineString: t,
          Polygon: t,
          MultiPolygon: function(n, r) {
            n.forEach(function(n) {
              t(n, r)
            })
          }
        };
      n.forEach(e);
      for (var c in o)
        for (var u = o[c], f = u.length, l = 0; l < f; ++l)
          for (var s = l + 1; s < f; ++s) {
            var h, g = u[l],
              v = u[s];
            (h = a[g])[c = nn(h, v)] !== v && h.splice(c, 0, v), (h = a[v])[c = nn(h, g)] !== g && h.splice(c, 0, g)
          }
      return a
    },
    tn = function(n, r) {
      function t(n) {
        n[0] = Math.round((n[0] - i) / c), n[1] = Math.round((n[1] - u) / f)
      }

      function e(n) {
        switch (n.type) {
          case "GeometryCollection":
            n.geometries.forEach(e);
            break;
          case "Point":
            t(n.coordinates);
            break;
          case "MultiPoint":
            n.coordinates.forEach(t)
        }
      }
      if (!((r = Math.floor(r)) >= 2)) throw new Error("n must be ≥2");
      if (n.transform) throw new Error("already quantized");
      var o, a = K(n),
        i = a[0],
        c = (a[2] - i) / (r - 1) || 1,
        u = a[1],
        f = (a[3] - u) / (r - 1) || 1;
      n.arcs.forEach(function(n) {
        for (var r, t, e, o = 1, a = 1, l = n.length, s = n[0], h = s[0] = Math.round((s[0] - i) / c), g = s[1] = Math.round((s[1] - u) / f); o < l; ++o) s = n[o], t = Math.round((s[0] - i) / c), e = Math.round((s[1] - u) / f), t === h && e === g || (r = n[a++], r[0] = t - h, h = t, r[1] = e - g, g = e);
        a < 2 && (r = n[a++], r[0] = 0, r[1] = 0), n.length = a
      });
      for (o in n.objects) e(n.objects[o]);
      return n.transform = {
        scale: [c, f],
        translate: [i, u]
      }, n
    },
    en = function(n) {
      if (null == (r = n.transform)) return H;
      var r, t, e, o = r.scale[0],
        a = r.scale[1],
        i = r.translate[0],
        c = r.translate[1];
      return function(n, r) {
        r || (t = e = 0);
        var u = Math.round((n[0] - i) / o),
          f = Math.round((n[1] - c) / a);
        return n[0] = u - t, t = u, n[1] = f - e, e = f, n
      }
    },
    on = function(n, r, t) {
      return r = null == r ? Number.MIN_VALUE : +r, null == t && (t = m),
        function(e, o) {
          return t(X(n, {
            type: "Polygon",
            arcs: [e]
          }).geometry.coordinates[0], o) >= r
        }
    },
    an = function() {
      function n(n, r) {
        for (; r > 0;) {
          var t = (r + 1 >> 1) - 1,
            o = e[t];
          if (b(n, o) >= 0) break;
          e[o._ = r] = o, e[n._ = r = t] = n
        }
      }

      function r(n, r) {
        for (;;) {
          var t = r + 1 << 1,
            a = t - 1,
            i = r,
            c = e[i];
          if (a < o && b(e[a], c) < 0 && (c = e[i = a]), t < o && b(e[t], c) < 0 && (c = e[i = t]), i === r) break;
          e[c._ = r] = c, e[n._ = r = i] = n
        }
      }
      var t = {},
        e = [],
        o = 0;
      return t.push = function(r) {
        return n(e[r._ = o] = r, o++), o
      }, t.pop = function() {
        if (!(o <= 0)) {
          var n, t = e[0];
          return --o > 0 && (n = e[o], r(e[n._ = 0] = n, 0)), t
        }
      }, t.remove = function(t) {
        var a, i = t._;
        if (e[i] === t) return i !== --o && (a = e[o], (b(a, t) < 0 ? n : r)(e[a._ = i] = a, i)), i
      }, t
    },
    cn = function(n, r) {
      function t(n) {
        a.remove(n), n[1][2] = r(n), a.push(n)
      }
      var e = J(n),
        o = en(n),
        a = an();
      return null == r && (r = d), n.arcs.forEach(function(n) {
        var i, c, u, f = [],
          l = 0;
        for (n.forEach(e), c = 1, u = n.length - 1; c < u; ++c) i = n.slice(c - 1, c + 2), i[1][2] = r(i), f.push(i), a.push(i);
        for (n[0][2] = n[u][2] = 1 / 0, c = 0, u = f.length; c < u; ++c) i = f[c], i.previous = f[c - 1], i.next = f[c + 1];
        for (; i = a.pop();) {
          var s = i.previous,
            h = i.next;
          i[1][2] < l ? i[1][2] = l : l = i[1][2], s && (s.next = h, s[2] = i[2], t(s)), h && (h.previous = s, h[0] = i[0], t(h))
        }
        n.forEach(o)
      }), n
    },
    un = function(n, r) {
      var t = [];
      return n.arcs.forEach(function(n) {
        n.forEach(function(n) {
          isFinite(n[2]) && t.push(n[2])
        })
      }), t.length && E(t.sort(M), r)
    },
    fn = function(n, r) {
      return r = null == r ? Number.MIN_VALUE : +r, n.arcs.forEach(n.transform ? function(n) {
        for (var t, e, o = 0, a = 0, i = -1, c = -1, u = n.length; ++i < u;) t = n[i], t[2] >= r ? (e = n[++c], e[0] = t[0] + o, e[1] = t[1] + a, o = a = 0) : (o += t[0], a += t[1]);
        n.length = ++c
      } : function(n) {
        for (var t, e = -1, o = -1, a = n.length; ++e < a;) t = n[e], t[2] >= r && (n[++o] = t);
        n.length = ++o
      }), n.arcs.forEach(n.transform ? function(n) {
        var r = 0,
          t = 0,
          e = n.length,
          o = n[0];
        for (o.length = 2; ++r < e;) o = n[r], o.length = 2, (o[0] || o[1]) && (n[++t] = o);
        n.length = (t || 1) + 1
      } : function(n) {
        var r, t, e = 0,
          o = 0,
          a = n.length,
          i = n[0],
          c = i[0],
          u = i[1];
        for (i.length = 2; ++e < a;) i = n[e], r = i[0], t = i[1], i.length = 2, c === r && u === t || (n[++o] = i, c = r, u = t);
        n.length = (o || 1) + 1
      }), n
    },
    ln = Math.PI,
    sn = 2 * ln,
    hn = 4 * ln,
    gn = ln / 180,
    vn = Math.abs,
    pn = Math.atan,
    yn = Math.atan2,
    dn = Math.cos,
    mn = Math.max,
    bn = Math.sin,
    En = Math.sqrt,
    Mn = Math.tan;
  n.topology = V, n.filter = W, n.filterAttached = D, n.filterWeight = on, n.planarRingArea = m, n.planarTriangleArea = d, n.presimplify = cn, n.quantile = un, n.simplify = fn, n.sphericalRingArea = P, n.sphericalTriangleArea = w, n.bbox = K, n.feature = X, n.merge = $, n.mergeArcs = y, n.mesh = Z, n.meshArcs = g, n.neighbors = rn, n.quantize = tn, n.transform = J, n.untransform = en, Object.defineProperty(n, "__esModule", {
    value: !0
  })
});
