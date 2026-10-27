"use strict";
/* ====== DATA CONTOH (mudah diganti) ====== */
const COURTS = [
  {
    id: "classic",
    name: "Classic Court",
    cap: 4,
    price: 120000,
    img: "https://images.unsplash.com/photo-1646649853703-7645147474ba?auto=format&fit=crop&w=1400&q=70",
    g: "linear-gradient(135deg,#1c4a55,#0f2230)",
    desc: "Lapangan standar turnamen dengan dinding kaca dan pencahayaan merata.",
  },
  {
    id: "panoramic",
    name: "Panoramic Court",
    cap: 4,
    price: 180000,
    img: "https://images.unsplash.com/photo-1767128890583-b3f8dc30bdbc?auto=format&fit=crop&w=1400&q=70",
    g: "linear-gradient(135deg,#2a5a3a,#10303a)",
    desc: "Dinding kaca 360° untuk pandangan penuh ke seluruh permainan.",
  },
  {
    id: "private",
    name: "Private Court",
    cap: 4,
    price: 250000,
    img: "https://images.unsplash.com/photo-1657704358775-ed705c7388d2?auto=format&fit=crop&w=1400&q=70",
    g: "linear-gradient(135deg,#243d1a,#0A1018)",
    desc: "Ruang tertutup untuk sesi pribadi tanpa gangguan.",
  },
];
const PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: 199000,
    perks: ["Court access", "Member-only offers", "Community sessions"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 449000,
    perks: [
      "Priority booking",
      "Selected coaching sessions",
      "Exclusive member events",
    ],
    star: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: 899000,
    perks: [
      "Premium booking privileges",
      "Private training benefits",
      "Exclusive club experiences",
    ],
  },
];
const COACH = [
  {
    n: "Beginner",
    focus: "Grip, pukulan dasar, dan membaca dinding.",
    goal: "Bermain rally 10 pukulan.",
    dur: "4 minggu",
    price: 350000,
  },
  {
    n: "Intermediate",
    focus: "Bandeja, vibora, dan penempatan posisi.",
    goal: "Menang di pertandingan sosial.",
    dur: "6 minggu",
    price: 550000,
  },
  {
    n: "Advanced",
    focus: "Taktik ganda, smash, dan kondisi fisik.",
    goal: "Siap turnamen kompetitif.",
    dur: "8 minggu",
    price: 850000,
  },
];
const EVENTS = [
  {
    id: "social",
    cat: "Social",
    name: "Social Match",
    date: "Contoh: Sabtu, 15.00",
    img: "https://images.unsplash.com/photo-1767128890954-20ce481be8f0?auto=format&fit=crop&w=900&q=70",
    desc: "Main santai dan kenalan dengan pemain baru.",
  },
  {
    id: "tourney",
    cat: "Tournament",
    name: "Weekend Tournament",
    date: "Contoh: Minggu, 09.00",
    img: "https://images.unsplash.com/photo-1767128890439-1af9ca2ff1ac?auto=format&fit=crop&w=900&q=70",
    desc: "Bracket ganda untuk semua level.",
  },
  {
    id: "after",
    cat: "After hours",
    name: "Padel After Hours",
    date: "Contoh: Jumat, 20.00",
    img: "https://images.unsplash.com/photo-1658723826297-fe4d1b1e6600?auto=format&fit=crop&w=900&q=70",
    desc: "Main malam dengan musik dan minuman.",
  },
];
const REVIEWS = [
  {
    q: "Lapangannya nyaman dan komunitasnya ramah.",
    n: "Rina (fiktif)",
    l: "Intermediate",
    s: 5,
  },
  {
    q: "Coaching bikin pukulan saya jauh lebih rapi.",
    n: "Dimas (fiktif)",
    l: "Beginner",
    s: 5,
  },
  {
    q: "Turnamen akhir pekan seru dan terorganisir.",
    n: "Sari (fiktif)",
    l: "Advanced",
    s: 4,
  },
];
const TIMES = ["07:00", "09:00", "11:00", "15:00", "17:00", "19:00", "21:00"];
const rp = (n) => "Rp " + n.toLocaleString("id-ID");
const $ = (s, r = document) => r.querySelector(s),
  $$ = (s, r = document) => [...r.querySelectorAll(s)];
function el(tag, cls, txt) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt !== undefined) e.textContent = txt;
  return e;
}
document.documentElement.classList.add("js");

/* ====== NAVBAR ====== */
const nav = $("#nav"),
  burger = $("#burger"),
  menu = $("#menu"),
  topBtn = $("#top");
function onScroll() {
  nav.classList.toggle("solid", scrollY > 40);
  topBtn.classList.toggle("show", scrollY > 700);
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();
function setMenu(open) {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
}
burger.addEventListener("click", () =>
  setMenu(!menu.classList.contains("open")),
);
$$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
topBtn.addEventListener("click", () =>
  scrollTo({ top: 0, behavior: "smooth" }),
);
const vid = $(".hero-video");
if (vid) {
  vid.addEventListener("error", () => vid.remove(), true);
  $("source", vid)?.addEventListener("error", () => vid.remove());
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
    vid.removeAttribute("autoplay");
    vid.pause();
  }
}

/* ====== TOAST & MODAL ====== */
const toastEl = $("#toast");
let tt;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(tt);
  tt = setTimeout(() => toastEl.classList.remove("show"), 2600);
}
const modal = $("#modal");
let lastFocus = null;
function openModal(title, rows, actions) {
  lastFocus = document.activeElement;
  $("#mTitle").textContent = title;
  const body = $("#mBody");
  body.replaceChildren();
  if (Array.isArray(rows)) {
    const dl = el("dl");
    rows.forEach(([k, v]) => {
      dl.append(el("dt", "", k), el("dd", "", v));
    });
    body.append(dl);
  } else if (rows instanceof Node) body.append(rows);
  else body.append(el("p", "", rows));
  const act = $("#mActions");
  act.replaceChildren();
  actions.forEach((a) => {
    const b = el(
      "button",
      "btn " + (a.ghost ? "btn-ghost" : "btn-lime"),
      a.label,
    );
    b.type = "button";
    b.addEventListener("click", a.fn);
    act.append(b);
  });
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  ($("button.btn", modal) || $("#mClose")).focus();
}
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
  lastFocus?.focus();
}
$("#mClose").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
  if (e.key === "Tab" && !modal.hidden) {
    const f = $$("button,input,select", modal).filter((x) => !x.disabled);
    const a = f[0],
      z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) {
      e.preventDefault();
      z.focus();
    } else if (!e.shiftKey && document.activeElement === z) {
      e.preventDefault();
      a.focus();
    }
  }
});

/* ====== COURTS + BOOKING ====== */
const fCourt = $("#fCourt"),
  fDate = $("#fDate"),
  fTime = $("#fTime"),
  fDur = $("#fDur"),
  fPl = $("#fPlayers");
const courtList = $("#courtList");
COURTS.forEach((c) => {
  const art = el("article", "court rv");
  art.dataset.id = c.id;
  const bg = el("div", "bg");
  bg.style.setProperty("--img", `url(${c.img})`);
  bg.style.setProperty("--g", c.g);
  const info = el("div", "info");
  const foot = el("div", "cfoot");
  const price = el("span", "price", rp(c.price) + " / jam");
  const btn = el("button", "btn btn-lime", "Select court");
  btn.type = "button";
  btn.addEventListener("click", () => {
    selectCourt(c.id);
    $("#booking").scrollIntoView({ behavior: "smooth" });
    toast(c.name + " dipilih");
  });
  foot.append(price, btn);
  info.append(
    el("span", "mono", "Maks. " + c.cap + " pemain"),
    el("h3", "", c.name),
    el("p", "", c.desc),
    foot,
  );
  art.append(bg, info);
  courtList.append(art);
});
fCourt.append(new Option("Pilih lapangan", ""));
COURTS.forEach((c) =>
  fCourt.append(new Option(c.name + " — " + rp(c.price) + "/jam", c.id)),
);
TIMES.forEach((t) => fTime.append(new Option(t, t)));
const today = new Date(Date.now() - new Date().getTimezoneOffset() * 6e4)
  .toISOString()
  .slice(0, 10);
fDate.min = today;
function selectCourt(id) {
  fCourt.value = id;
  $$(".court").forEach((x) => x.classList.toggle("sel", x.dataset.id === id));
  update();
}
const fName = $("#fName"),
  fNotes = $("#fNotes"),
  fAgree = $("#fAgree");
const addons = () => $$('input[name="addon"]');
const addonTotal = () =>
  addons()
    .filter((a) => a.checked)
    .reduce((sum, a) => sum + Number(a.dataset.price), 0);
fNotes.addEventListener("input", () => {
  $("#notesCount").textContent = fNotes.value.length + " / 200";
});
addons().forEach((a) => a.addEventListener("change", () => update()));
function update() {
  const c = COURTS.find((x) => x.id === fCourt.value),
    d = +fDur.value;
  const extra = addonTotal();
  $("#sumPrice").textContent = rp(c ? c.price * d + extra : 0);
  $("#sumText").textContent = c
    ? `${c.name} · ${d} jam · ${fPl.value || "-"} pemain` +
      (extra ? ` · tambahan ${rp(extra)}` : "")
    : "Pilih lapangan untuk melihat ringkasan.";
  $$(".court").forEach((x) =>
    x.classList.toggle("sel", !!c && x.dataset.id === c.id),
  );
}
[fCourt, fDur, fPl, fTime, fDate].forEach((i) =>
  i.addEventListener("input", update),
);
function setErr(input, errId, msg) {
  input.closest(".field").classList.toggle("bad", !!msg);
  $("#" + errId).textContent = msg;
}
$("#bookForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let ok = true;
  const bad = (i, id, m) => {
    setErr(i, id, m);
    if (m) ok = false;
  };
  const nama = fName.value.trim();
  bad(
    fName,
    "eName",
    nama.length < 2 ? "Nama wajib diisi (minimal 2 karakter)." : "",
  );
  bad(fCourt, "eCourt", fCourt.value ? "" : "Pilih jenis lapangan.");
  bad(
    fDate,
    "eDate",
    !fDate.value
      ? "Pilih tanggal."
      : fDate.value < today
        ? "Tanggal tidak boleh sebelum hari ini."
        : "",
  );
  bad(fTime, "eTime", fTime.value ? "" : "Pilih waktu bermain.");
  const n = +fPl.value;
  bad(fPl, "ePlayers", !n || n < 1 || n > 4 ? "Jumlah pemain harus 1–4." : "");
  bad(
    fAgree,
    "eAgree",
    fAgree.checked ? "" : "Centang persetujuan untuk melanjutkan.",
  );
  if (!ok) {
    toast("Periksa kembali isian form");
    $(".bad input,.bad select")?.focus();
    return;
  }
  const c = COURTS.find((x) => x.id === fCourt.value),
    d = +fDur.value;
  openModal(
    "Konfirmasi booking",
    [
      ["Nama", nama],
      ["Lapangan", c.name],
      ["Tanggal", fDate.value],
      ["Waktu", fTime.value],
      ["Durasi", d + " jam"],
      ["Pemain", String(n)],
      [
        "Layanan tambahan",
        addons()
          .filter((a) => a.checked)
          .map((a) => a.value)
          .join(", ") || "Tidak ada",
      ],
      ["Catatan", fNotes.value.trim() || "-"],
      ["Total", rp(c.price * d + addonTotal())],
    ],
    [
      {
        label: "Konfirmasi",
        fn: () => {
          closeModal();
          $("#bookOk").textContent =
            "Booking berhasil disimulasikan. Tidak ada reservasi nyata yang tersimpan.";
          toast("Booking disimulasikan");
        },
      },
      { label: "Ubah", ghost: 1, fn: closeModal },
    ],
  );
});

/* ====== MEMBERSHIP ====== */
const planList = $("#planList");
PLANS.forEach((p) => {
  const a = el("article", "plan rv" + (p.star ? " pro" : ""));
  a.dataset.id = p.id;
  const ul = el("ul");
  p.perks.forEach((x) => ul.append(el("li", "", x)));
  const b = el("button", "btn btn-lime", "Select plan");
  b.type = "button";
  b.addEventListener("click", () => {
    $$(".plan").forEach((x) => x.classList.toggle("sel", x === a));
    openModal(
      "Paket " + p.name,
      [
        ["Harga", rp(p.price) + " / bulan"],
        ["Manfaat", p.perks.join(", ")],
        ["Catatan", "Simulasi frontend, tidak ada pendaftaran nyata."],
      ],
      [{ label: "Tutup", fn: closeModal }],
    );
    toast("Paket " + p.name + " dipilih");
  });
  a.append(
    el("span", "tag", p.star ? "Most popular" : "Plan"),
    el("h3", "", p.name),
    (() => {
      const s = el("div", "price", rp(p.price));
      s.append(el("small", "", " /bln"));
      return s;
    })(),
    ul,
    b,
  );
  planList.append(a);
});

/* ====== COACHING TABS ====== */
const tabBtns = $$("#tabs [role=tab]"),
  panel = $("#tabPanel");
function showTab(i) {
  tabBtns.forEach((b, k) => {
    b.setAttribute("aria-selected", k === i);
    b.tabIndex = k === i ? 0 : -1;
  });
  const c = COACH[i];
  panel.setAttribute("aria-labelledby", "t" + i);
  panel.replaceChildren();
  const dl = el("dl");
  [
    ["Fokus", c.focus],
    ["Target", c.goal],
    ["Durasi", c.dur],
    ["Harga", rp(c.price)],
  ].forEach(([k, v]) => dl.append(el("dt", "", k), el("dd", "", v)));
  const b = el("button", "btn btn-lime", "Explore program");
  b.type = "button";
  b.addEventListener("click", () =>
    openModal(
      "Program " + c.n,
      [
        ["Fokus", c.focus],
        ["Target", c.goal],
        ["Durasi", c.dur],
        ["Harga", rp(c.price)],
      ],
      [{ label: "Tutup", fn: closeModal }],
    ),
  );
  panel.append(dl, b);
  panel.style.animation = "none";
  panel.offsetHeight;
  panel.style.animation = "";
}
tabBtns.forEach((b, i) => {
  b.addEventListener("click", () => showTab(i));
  b.addEventListener("keydown", (e) => {
    const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (k) {
      const n = (i + k + 3) % 3;
      showTab(n);
      tabBtns[n].focus();
    }
  });
});
showTab(0);

/* ====== EVENTS ====== */
const evList = $("#eventList");
EVENTS.forEach((ev) => {
  const a = el("article", "ev rv");
  const ph = el("div", "photo");
  ph.setAttribute("role", "img");
  ph.setAttribute("aria-label", "Suasana " + ev.name);
  ph.style.setProperty("--img", `url(${ev.img})`);
  const b = el("button", "btn btn-ghost", "View details");
  b.type = "button";
  b.addEventListener("click", () =>
    openModal(
      ev.name,
      [
        ["Kategori", ev.cat],
        ["Tanggal", ev.date],
        ["Info", ev.desc],
      ],
      [
        { label: "Join event", fn: () => joinForm(ev) },
        { label: "Tutup", ghost: 1, fn: closeModal },
      ],
    ),
  );
  a.append(
    ph,
    el("span", "mono", ev.cat + " / " + ev.date),
    el("h3", "", ev.name),
    el("p", "muted", ev.desc),
    b,
  );
  evList.append(a);
});
function joinForm(ev) {
  const f = el("form");
  f.noValidate = true;
  f.innerHTML =
    '<div class="field"><label for="jn">Nama</label><input id="jn" required><small class="err" id="jne"></small></div><div class="field"><label for="jm">Email</label><input id="jm" type="email" required><small class="err" id="jme"></small></div>';
  openModal("Daftar: " + ev.name, f, [
    { label: "Kirim", fn: () => f.requestSubmit() },
    { label: "Batal", ghost: 1, fn: closeModal },
  ]);
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const n = $("#jn", f),
      m = $("#jm", f);
    const en = n.value.trim() ? "" : "Nama wajib diisi.",
      em = /^\S+@\S+\.\S+$/.test(m.value) ? "" : "Masukkan email yang valid.";
    n.closest(".field").classList.toggle("bad", !!en);
    m.closest(".field").classList.toggle("bad", !!em);
    $("#jne", f).textContent = en;
    $("#jme", f).textContent = em;
    if (en || em) return;
    closeModal();
    toast("Pendaftaran disimulasikan, " + n.value.trim());
  });
  $("#jn", f).focus();
}

/* ====== CAROUSEL ====== */
const track = $("#track"),
  dots = $("#dots");
let cur = 0;
REVIEWS.forEach((r, i) => {
  const s = el("div", "slide");
  s.append(
    el("q", "", "“" + r.q + "”"),
    el("div", "stars", "★".repeat(r.s) + "☆".repeat(5 - r.s)),
    el("p", "muted", r.n + " · " + r.l),
  );
  track.append(s);
  const d = el("button", "");
  d.type = "button";
  d.setAttribute("aria-label", "Testimonial " + (i + 1));
  d.addEventListener("click", () => go(i));
  dots.append(d);
});
function go(i) {
  cur = (i + REVIEWS.length) % REVIEWS.length;
  track.style.transform = `translateX(-${cur * 100}%)`;
  $$("button", dots).forEach((d, k) => d.classList.toggle("on", k === cur));
}
$("#prev").addEventListener("click", () => go(cur - 1));
$("#next").addEventListener("click", () => go(cur + 1));
$("#car").addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") go(cur - 1);
  if (e.key === "ArrowRight") go(cur + 1);
});
let sx = 0;
track.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), {
  passive: true,
});
track.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - sx;
  if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1));
});
go(0);

/* ====== REVEAL & COUNTER ====== */
const io = new IntersectionObserver(
  (es) =>
    es.forEach((x) => {
      if (x.isIntersecting) {
        x.target.classList.add("in");
        io.unobserve(x.target);
      }
    }),
  { threshold: 0.15 },
);
$$(".rv").forEach((x) => io.observe(x));
const cio = new IntersectionObserver(
  (es) =>
    es.forEach((x) => {
      if (!x.isIntersecting) return;
      $$(".num", x.target).forEach((n) => {
        const to = +n.dataset.to,
          t0 = performance.now();
        (function f(t) {
          const p = Math.min((t - t0) / 1600, 1);
          n.textContent =
            Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString("id-ID") +
            (p === 1 ? "+" : "");
          if (p < 1) requestAnimationFrame(f);
        })(t0);
      });
      cio.unobserve(x.target);
    }),
  { threshold: 0.4 },
);
const st = $(".stats");
if (st) cio.observe(st);
update();