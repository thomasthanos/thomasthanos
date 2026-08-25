(() => {
  if (window.__stickerEdit) {
    window.__stickerEdit.destroy()
    console.log('%c Sticker Edit Mode OFF ', 'background:#a78bfa;color:#0a0b0d;font-weight:700')
    return
  }

  const SELECTOR = '.myle-note, .nxb-note, .cs-note, .sticker-note, .doodle, .hero__note, .hero__sticker, .sticker'
  const LIME = '#c8fa4b'
  const VIOLET = '#a78bfa'

  const ANCHORS = {
    'myle-note--hero': ['top', 'left'],
    'myle-note--admin': ['bottom', 'right'],
    'myle-note--metrics': ['top', 'right'],
    'myle-note--ipc': ['top', 'left'],
    'myle-note--evolution': ['bottom', 'right'],
    'myle-note--gallery': ['top', 'right'],
    'myle-note--privacy': ['bottom', 'left'],
    'myle-note--ship': ['bottom', 'right'],

    'nxb-note--hero': ['top', 'left'],
    'nxb-note--console': ['bottom', 'right'],
    'nxb-note--stats': ['top', 'right'],
    'nxb-note--maths': ['bottom', 'left'],
    'nxb-note--queue': ['top', 'right'],
    'nxb-note--features': ['bottom', 'right'],
    'nxb-note--privacy': ['bottom', 'left'],
    'nxb-note--origin': ['bottom', 'right'],

    'doodle--1': ['top', 'left'],
    'doodle--2': ['top', 'right'],
    'doodle--3': ['top', 'left'],
    'sticker-note--a': ['top', 'right'],
    'sticker-note--b': ['top', 'left'],

    'hero__note': ['top', 'left'],
    'hero__sticker': ['bottom', 'right'],
  }

  const nodes = [...document.querySelectorAll(SELECTOR)].filter(
    (el) => getComputedStyle(el).display !== 'none',
  )

  if (!nodes.length) {
    console.log(
      '%c Nothing to edit. Turn Chaos Mode on first (the CHAOS button in the header). ',
      'background:#ff5f56;color:#fff;font-weight:700',
    )
    return
  }

  const key = (el) =>
    [...el.classList].find((c) => ANCHORS[c]) ||
    [...el.classList].find((c) => c.includes('--')) ||
    el.className.toString().split(' ')[0]

  const isNote = (name) =>
    name.startsWith('myle-note--') ||
    name.startsWith('nxb-note--') ||
    name.startsWith('cs-note') ||
    name.includes('-note--')

  const anchorOf = (el) => {
    if (el.offsetParent) return el.offsetParent
    let p = el.parentElement
    while (p && p !== document.body) {
      if (getComputedStyle(p).position !== 'static') return p
      p = p.parentElement
    }
    return document.documentElement
  }

  const offsetOf = (el) => {
    if (Number.isFinite(el.offsetTop)) return { top: el.offsetTop, left: el.offsetLeft }
    const cs = getComputedStyle(el)
    const parent = anchorOf(el)
    const r = el.getBoundingClientRect()
    const pr = parent.getBoundingClientRect()
    const n = (v) => (Number.isFinite(parseFloat(v)) ? parseFloat(v) : null)
    return {
      top: n(cs.top) ?? Math.round(r.top - pr.top),
      left: n(cs.left) ?? Math.round(r.left - pr.left),
    }
  }

  const rotOf = (el) => {
    const cs = getComputedStyle(el)
    const nRot = cs.getPropertyValue('--n-rot').trim()
    if (nRot) {
      const deg = parseFloat(nRot)
      if (Number.isFinite(deg)) return deg
    }
    const v = cs.rotate
    const deg = parseFloat(v)
    return Number.isFinite(deg) ? deg : 0
  }

  const items = nodes.map((el) => {
    const parent = anchorOf(el)
    const r = el.getBoundingClientRect()
    const pr = parent.getBoundingClientRect()
    const o = offsetOf(el)
    const rot = rotOf(el)
    return {
      el,
      name: key(el),
      parent,
      top: o.top,
      left: o.left,
      rot,
      start: { top: o.top, left: o.left, rot },
      prev: el.getAttribute('style') || '',
      w: Math.round(r.width),
      h: Math.round(r.height),
      pw: Math.round(pr.width),
      ph: Math.round(pr.height),
    }
  })

  const byEl = new Map(items.map((i) => [i.el, i]))
  let selected = null

  const layer = document.createElement('div')
  layer.style.cssText =
    'position:fixed;inset:0;z-index:2147483000;pointer-events:none;' +
    'font:500 11px/1.35 ui-monospace,monospace;contain:strict'
  document.body.appendChild(layer)

  const badges = new Map()
  for (const it of items) {
    const b = document.createElement('div')
    b.style.cssText =
      'position:absolute;left:0;top:0;pointer-events:none;white-space:nowrap;' +
      `padding:2px 5px;border-radius:3px;background:${VIOLET};color:#0a0b0d;` +
      'font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,.5);will-change:transform'
    layer.appendChild(b)
    badges.set(it, b)

    it.el.style.pointerEvents = 'auto'
    it.el.style.cursor = 'grab'
    it.el.style.outline = `1px dashed ${VIOLET}`
    it.el.style.outlineOffset = '2px'
  }

  const label = (it) =>
    `${it.name}  ${Math.round(it.left)},${Math.round(it.top)}` +
    (Math.abs(it.rot) > 0.05 ? `  ${it.rot.toFixed(1)}°` : '')

  function paintOne(it) {
    const r = it.el.getBoundingClientRect()
    const b = badges.get(it)
    b.textContent = label(it)
    b.style.transform = `translate(${Math.max(2, r.left)}px, ${Math.max(2, r.top - 17)}px)`
    b.style.background = it === selected ? LIME : VIOLET
  }

  function paintAll() {
    for (const it of items) paintOne(it)
  }

  let paintQueued = 0
  const paintSoon = () => {
    if (paintQueued) return
    paintQueued = requestAnimationFrame(() => {
      paintQueued = 0
      paintAll()
    })
  }

  function apply(it) {
    it.el.style.inset = ''
    it.el.style.top = `${Math.round(it.top)}px`
    it.el.style.left = `${Math.round(it.left)}px`
    it.el.style.right = 'auto'
    it.el.style.bottom = 'auto'
  }

  function applyRot(it) {
    const deg = `${it.rot.toFixed(1)}deg`
    if (isNote(it.name)) it.el.style.setProperty('--n-rot', deg)
    else it.el.style.rotate = deg
  }

  let drag = null
  let frame = 0

  function step() {
    frame = 0
    if (!drag) return
    const it = drag.it
    if (drag.rotating) {
      it.rot = drag.rot + (drag.cx - drag.x) * 0.25
      applyRot(it)
    } else {
      it.left = drag.left + (drag.cx - drag.x)
      it.top = drag.top + (drag.cy - drag.y)
      apply(it)
    }
    paintOne(it)
  }

  const onDown = (e) => {
    const hit = e.target.closest && e.target.closest(SELECTOR)
    const it = hit && byEl.get(hit)
    if (!it) return
    e.preventDefault()
    e.stopPropagation()
    selected = it
    drag = {
      it,
      x: e.clientX,
      y: e.clientY,
      cx: e.clientX,
      cy: e.clientY,
      top: it.top,
      left: it.left,
      rot: it.rot,
      rotating: e.altKey,
    }
    it.el.style.cursor = e.altKey ? 'ew-resize' : 'grabbing'
    paintAll()
  }

  const onMove = (e) => {
    if (!drag) return
    e.preventDefault()
    drag.cx = e.clientX
    drag.cy = e.clientY
    if (!frame) frame = requestAnimationFrame(step)
  }

  const onUp = () => {
    if (!drag) return
    drag.it.el.style.cursor = 'grab'
    drag = null
    if (frame) {
      cancelAnimationFrame(frame)
      frame = 0
    }
  }

  const onWheel = (e) => {
    const hit = e.target.closest && e.target.closest(SELECTOR)
    const it = hit && byEl.get(hit)
    if (!it) return
    e.preventDefault()
    e.stopPropagation()
    selected = it
    it.rot += (e.deltaY > 0 ? 1 : -1) * (e.shiftKey ? 5 : 1)
    applyRot(it)
    paintOne(it)
  }

  const onKey = (e) => {
    if (!selected) return
    const it = selected
    const step10 = e.shiftKey ? 10 : 1
    const nudge = { ArrowLeft: [-step10, 0], ArrowRight: [step10, 0], ArrowUp: [0, -step10], ArrowDown: [0, step10] }[e.key]
    if (nudge) {
      e.preventDefault()
      it.left += nudge[0]
      it.top += nudge[1]
      apply(it)
      paintOne(it)
      return
    }
    if (e.key === ',' || e.key === '.') {
      e.preventDefault()
      it.rot += (e.key === ',' ? -1 : 1) * (e.shiftKey ? 5 : 1)
      applyRot(it)
      paintOne(it)
      return
    }
    if (e.key === 'r' || e.key === 'R') {
      e.preventDefault()
      it.rot = it.start.rot
      applyRot(it)
      paintOne(it)
    }
  }

  document.addEventListener('pointerdown', onDown, true)
  document.addEventListener('pointermove', onMove, true)
  document.addEventListener('pointerup', onUp, true)
  document.addEventListener('pointercancel', onUp, true)
  document.addEventListener('wheel', onWheel, { capture: true, passive: false })
  document.addEventListener('keydown', onKey, true)
  window.addEventListener('scroll', paintSoon, true)
  window.addEventListener('resize', paintSoon)

  function layoutBox(el) {
    if (Number.isFinite(el.offsetWidth) && el.offsetWidth > 0) {
      return { w: el.offsetWidth, h: el.offsetHeight }
    }
    const r = el.getBoundingClientRect()
    const deg = (rotOf(el) * Math.PI) / 180
    const c = Math.abs(Math.cos(deg))
    const s = Math.abs(Math.sin(deg))
    const det = c * c - s * s
    if (Math.abs(det) < 0.02) return { w: r.width, h: r.height }
    return { w: (r.width * c - r.height * s) / det, h: (r.height * c - r.width * s) / det }
  }

  function measure(it) {
    const r = layoutBox(it.el)
    return {
      name: it.name,
      parent: it.parent.className
        ? '.' +
          it.parent.className
            .toString()
            .trim()
            .split(/\s+/)
            .filter((c) => c !== 'reveal' && c !== 'is-visible')
            .join('.')
        : it.parent.tagName.toLowerCase(),
      parentSize: [it.pw, it.ph],
      size: [Math.round(r.w), Math.round(r.h)],
      top: Math.round(it.top),
      left: Math.round(it.left),
      right: Math.round(it.pw - it.left - r.w),
      bottom: Math.round(it.ph - it.top - r.h),
      rotate: +it.rot.toFixed(1),
      topVh: +((it.el.getBoundingClientRect().top / innerHeight) * 100).toFixed(1),
      movedBy: [Math.round(it.left - it.start.left), Math.round(it.top - it.start.top)],
      turnedBy: +(it.rot - it.start.rot).toFixed(1),
    }
  }

  function tierName() {
    const w = innerWidth
    if (w >= 2560) return '4K  @media (min-width: 2560px)'
    if (w >= 2000) return '1440p  @media (min-width: 2000px) and (max-width: 2559px)'
    if (w >= 1600) return '1080p  @media (min-width: 1600px) and (max-width: 1999px)'
    if (w >= 1100) return '720p  @media (min-width: 1100px) and (max-width: 1599px)'
    return 'mobile'
  }

  function toCSS() {
    const lang = document.documentElement.lang || 'en'
    const out = [
      `/* ${innerWidth}x${innerHeight}  ·  lang=${lang}  ·  ${tierName()} */`,
      `/* offsets are relative to each element's own anchor, not the screen */`,
      '',
    ]
    let any = false
    for (const it of items) {
      const m = measure(it)
      if (!m.movedBy[0] && !m.movedBy[1] && !m.turnedBy) continue
      any = true
      const [vSide, hSide] = ANCHORS[it.name] || ['top', 'left']
      out.push(`.${it.name} {`)
      if (m.movedBy[0] || m.movedBy[1]) {
        out.push(`  ${vSide === 'top' ? `top: ${m.top}px;` : `bottom: ${m.bottom}px;`}`)
        out.push(`  ${hSide === 'left' ? `left: ${m.left}px;` : `right: ${m.right}px;`}`)
      }
      if (m.turnedBy) {
        out.push(isNote(it.name) ? `  --n-rot: ${m.rotate}deg;` : `  rotate: ${m.rotate}deg;`)
      }
      out.push(
        `  /* anchor: ${m.parent} ${m.parentSize[0]}x${m.parentSize[1]}` +
          ` · moved ${m.movedBy[0]},${m.movedBy[1]}` +
          (m.turnedBy ? ` · turned ${m.turnedBy > 0 ? '+' : ''}${m.turnedBy}°` : '') +
          ' */',
      )
      out.push('}')
      out.push('')
    }
    if (!any) out.push('/* nothing was moved */')
    return out.join('\n')
  }

  function toJSON() {
    return JSON.stringify(
      {
        viewport: [innerWidth, innerHeight],
        dpr: devicePixelRatio,
        lang: document.documentElement.lang || 'en',
        tier: tierName(),
        items: items.map(measure),
      },
      null,
      1,
    )
  }

  async function copy(text, btn) {
    try {
      await navigator.clipboard.writeText(text)
      const old = btn.textContent
      btn.textContent = 'copied'
      setTimeout(() => (btn.textContent = old), 1200)
    } catch {
      console.log(text)
      btn.textContent = 'see console'
    }
  }

  const panel = document.createElement('div')
  panel.style.cssText =
    'position:fixed;right:12px;bottom:12px;z-index:2147483001;pointer-events:auto;' +
    'display:flex;flex-direction:column;gap:6px;padding:10px 12px;border-radius:8px;' +
    `border:1px solid ${VIOLET};background:#121417;color:#e9ece7;` +
    'font:500 12px/1.4 ui-monospace,monospace;box-shadow:0 12px 40px rgba(0,0,0,.6)'

  const head = document.createElement('div')
  head.style.cssText = `color:${LIME};font-weight:700`
  head.textContent = `${innerWidth}x${innerHeight} · ${document.documentElement.lang || 'en'} · ${items.length} items`

  const tier = document.createElement('div')
  tier.style.cssText = 'color:#949aa4;font-size:11px'
  tier.textContent = tierName()

  const hint = document.createElement('div')
  hint.style.cssText = 'color:#949aa4;font-size:11px;max-width:250px'
  hint.innerHTML =
    'drag to move &middot; arrows nudge (shift 10px)<br>wheel over an item rotates (shift 5&deg;)<br>alt+drag rotates &middot; , and . rotate &middot; R resets angle'

  const row = document.createElement('div')
  row.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap'

  const mkBtn = (text, fn, accent) => {
    const b = document.createElement('button')
    b.textContent = text
    b.style.cssText =
      'padding:5px 9px;border-radius:5px;cursor:pointer;font:600 11px ui-monospace,monospace;' +
      (accent
        ? `border:0;background:${LIME};color:#0d1403`
        : 'border:1px solid #303740;background:#1d2126;color:#e9ece7')
    b.onclick = (e) => {
      e.stopPropagation()
      fn(b)
    }
    row.appendChild(b)
    return b
  }

  mkBtn('Copy CSS', (b) => copy(toCSS(), b), true)
  mkBtn('Copy JSON', (b) => copy(toJSON(), b))
  mkBtn('Reset', () => {
    for (const it of items) {
      it.top = it.start.top
      it.left = it.start.left
      it.rot = it.start.rot
      it.el.setAttribute('style', it.prev)
      it.el.style.pointerEvents = 'auto'
      it.el.style.cursor = 'grab'
      it.el.style.outline = `1px dashed ${VIOLET}`
      it.el.style.outlineOffset = '2px'
    }
    selected = null
    paintAll()
  })
  mkBtn('Close', () => window.__stickerEdit.destroy())

  panel.append(head, tier, hint, row)
  document.body.appendChild(panel)

  window.__stickerEdit = {
    css: toCSS,
    json: toJSON,
    destroy() {
      document.removeEventListener('pointerdown', onDown, true)
      document.removeEventListener('pointermove', onMove, true)
      document.removeEventListener('pointerup', onUp, true)
      document.removeEventListener('pointercancel', onUp, true)
      document.removeEventListener('wheel', onWheel, { capture: true })
      document.removeEventListener('keydown', onKey, true)
      window.removeEventListener('scroll', paintSoon, true)
      window.removeEventListener('resize', paintSoon)
      if (frame) cancelAnimationFrame(frame)
      if (paintQueued) cancelAnimationFrame(paintQueued)
      for (const it of items) {
        if (it.prev) it.el.setAttribute('style', it.prev)
        else it.el.removeAttribute('style')
      }
      layer.remove()
      panel.remove()
      delete window.__stickerEdit
    },
  }

  paintAll()
  console.log(
    '%c Sticker Edit Mode ON ',
    `background:${LIME};color:#0d1403;font-weight:700`,
    `\n${items.length} items · ${innerWidth}x${innerHeight} · ${tierName()}` +
      '\ndrag to move, wheel or alt+drag to rotate, then Copy CSS.' +
      '\n__stickerEdit.css() and .json() also work from here.',
  )
})()
