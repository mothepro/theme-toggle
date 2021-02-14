import { LitElement, customElement, property, html, PropertyValues } from 'lit-element'

export type ThemeEvent = CustomEvent<Theme>

declare global {
  interface HTMLElementEventMap {
    'theme-change': ThemeEvent 
  }
}

const enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

// Check for dark mode preference at the OS level
const darkMatchMedia = matchMedia("(prefers-color-scheme: dark)")

@customElement('theme-toggle')
export default class extends LitElement {
  @property({ type: Boolean })
  persistent = false

  @property({ type: String, reflect: true })
  theme = darkMatchMedia.matches ? Theme.DARK : Theme.LIGHT

  // TODO should this be cached?
  private readonly stylesheets: Record<Theme, readonly HTMLLinkElement[]> = {
    [Theme.LIGHT]: [],
    [Theme.DARK]: [],
  }

  protected firstUpdated() {
    darkMatchMedia.addEventListener('change', ({matches}) => this.theme = matches ? Theme.DARK : Theme.LIGHT)

    for (const theme of [Theme.DARK, Theme.LIGHT])
      // We need to support `media="(prefers-color-scheme: dark)"` (with space)
      // and `media="(prefers-color-scheme:dark)"` (without space)
      this.stylesheets[theme] = document
        .querySelectorAll(`link[rel=stylesheet][media*=prefers-color-scheme][media*="${theme}"]`) as unknown as HTMLLinkElement[]
  }

  protected updated(changed: PropertyValues) {
    if (changed.has('persistent') && this.persistent)
      this.theme = localStorage.getItem('theme') as Theme ?? this.theme 
    
    if (changed.has('theme')) {
      document.body.setAttribute('theme', this.theme)

      for (const theme of [Theme.DARK, Theme.LIGHT])
        for (const stylesheet of this.stylesheets[theme])
            stylesheet.disabled = theme != this.theme

      if (this.persistent)
        localStorage.setItem('theme', this.theme)
      
      this.dispatchEvent(new CustomEvent('theme-change', { detail: this.theme }))
    }
  }

  protected readonly render = () => this.theme == Theme.LIGHT
    ? html`<slot name="light" @click=${() => this.theme = Theme.DARK}></slot>`
    : html`<slot name="dark" @click=${() => this.theme = Theme.LIGHT}></slot>`
}
