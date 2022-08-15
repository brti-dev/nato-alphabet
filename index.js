const KEYS = {
  a: { alpha: 'Alpha', morse: '. _' },
  b: { alpha: 'Bravo', morse: '_ . . .' },
  c: { alpha: 'Charlie', morse: '_ . _ .' },
  d: { alpha: 'Delta', morse: '_ . .' },
  e: { alpha: 'Echo', morse: '.' },
  f: { alpha: 'Foxtrot', morse: '. . _ .' },
  g: { alpha: 'Golf', morse: '_ _ .' },
  h: { alpha: 'Hotel', morse: '. . . .' },
  i: { alpha: 'India', morse: '. .' },
  j: { alpha: 'Juliet', morse: '. _ _ _' },
  k: { alpha: 'Kilo', morse: '_ . _' },
  l: { alpha: 'Lima', morse: '. _ . .' },
  m: { alpha: 'Mike', morse: '_ _' },
  n: { alpha: 'November', morse: '_ .' },
  o: { alpha: 'Oscar', morse: '_ _ _' },
  p: { alpha: 'Papa', morse: '. _ _ .' },
  q: { alpha: 'Quebec', morse: '_ _ . _' },
  r: { alpha: 'Romeo', morse: '. _ .' },
  s: { alpha: 'Sierra', morse: '. . .' },
  t: { alpha: 'Tango', morse: '_' },
  u: { alpha: 'Uniform', morse: '. . _' },
  v: { alpha: 'Victor', morse: '. . . _' },
  w: { alpha: 'Whiskey', morse: '. _ _' },
  x: { alpha: 'Xray', morse: '_ . . _' },
  y: { alpha: 'Yankee', morse: '_ . _ _' },
  z: { alpha: 'Zulu', morse: '_ _ . .' },
}

const COLORS = [
  ['#064789', '#EBF2FA'],
  ['#1E2F23', '#03F7EB'],
  ['salmon', '#ffc107'],
  ['#2d2d2d', 'hotpink'],
  ['#293F14', '#3EFF8B'],
  ['#1E2F23', '#B39C4D'],
  ['#C0DFA1', '#011936'],
  ['#5F0F40', '#F08CAE'],
  ['#C1A5A9', '#586BA4'],
  ['#FF9FB2', '#824670'],
  ['#7B7263', '#C9DCB3'],
  ['#38A3A5', '#C7F9CC'],
  ['#272D2D', '#82FF9E'],
]

let color = 0

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

function setColor(el, color) {
  const css = `--color-background: ${color[0]};
  --color-foreground: ${color[1]};`
  el.style.cssText = css
}

function incrementColor() {
  color++
  if (color > COLORS.length - 1) {
    color = 0
  }
  setColor(document.body, COLORS[color])
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

setColor(document.body, COLORS[color])

document.addEventListener('keydown', function (e) {
  const output = document.getElementById('output')
  if (!output) {
    console.error('output not found')
    return
  }

  if (e.key in KEYS) {
    const block = document.createElement('div')
    block.className = 'block'
    ;['alpha', 'morse'].forEach(label => {
      const el = document.createElement('div')
      el.className = label
      el.innerHTML = KEYS[e.key][label]
      block.append(el)
    })

    output.prepend(block)
    scrollToTop()
  }

  if (e.key === 'Escape') {
    output.innerHTML = ''
    incrementColor()
  }

  if (e.key === 'Backspace') {
    if (output.getElementsByClassName('block')[0]) {
      output.removeChild(output.firstChild)
    }
  }

  if (e.key === 'ArrowLeft') {
    color--
    if (color < 0) {
      color = COLORS.length - 1
    }
    setColor(document.body, COLORS[color])
  }

  if (e.key === 'ArrowRight') {
    incrementColor()
  }
})

const input = document.getElementById('text-input')
if (!input) {
  console.error('input not found')
} else {
  input.focus()
  input.addEventListener('blur', function () {
    input.focus()
  })
  document.addEventListener('click', function () {
    input.focus()
  })
}
