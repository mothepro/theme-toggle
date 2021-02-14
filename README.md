# `<theme-toggle>`

> Web Component to natively change your site's theme

[![npm](https://img.shields.io/npm/v/@mothepro/theme-toggle.svg)](https://www.npmjs.com/package/@mothepro/theme-toggle)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@mothepro/theme-toggle)

## Install

`yarn add @mothepro/theme-toggle`

## How to Use

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| `persistent` | `boolean` | `false` | Whether the theme should be saved on reload |
| `theme` | `dark` | `light` | `light` | The theme to use, this attribute is added to the `<body>` too |

<!--
Inline demo for webcomponents.org
```
<custom-element-demo>
  <template>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<!-- 
  Import the element.

  The `module` query parameter expands "bare" imports to full unpkg.com urls.
  This means use of an import map isn't needed.
  @see https://unpkg.com#query-params
-->
<script type="module" src="//unpkg.com/@mothepro/theme-toggle/dist/esm/index.js?module"></script>

Click to change theme to
<theme-toggle persistent>
  <u slot="light">dark</u>
  <u slot="dark">light</u>
</theme-toggle>.
```
