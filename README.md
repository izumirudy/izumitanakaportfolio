# Portfolio

A minimal, editorial portfolio website inspired by [tomoharukotsuji.jp](https://www.tomoharukotsuji.jp/about).

## Structure

```
portfolio/
├── index.html        ← Work / home page
├── about.html        ← About page
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    ├── work-01.jpg   ← Add your own images here
    ├── work-02.jpg
    └── ...
```

## Customization

### 1. Your Name
Find and replace `Your Name` in both HTML files.

### 2. Navigation links
Update the `href` values in the `<nav>` and `.mobile-menu` sections of each page.

### 3. Work images
Add your images to the `images/` folder and update the `src` attributes in `index.html`.
Recommended aspect ratio: **3:4** (portrait). Any resolution — they'll be cropped to fill.

### 4. About text
Edit the bio lines in `about.html` to reflect your actual location, timeline, and contact info.

### 5. Colors / fonts
All design tokens live at the top of `css/style.css` under `:root { }`.

```css
:root {
  --bg:       #f5f4f0;   /* page background */
  --fg:       #1a1a18;   /* text */
  --fg-muted: #888884;   /* nav links, labels */
}
```

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)`
4. Your site will be live at `https://yourusername.github.io/portfolio/`

## Fonts used

- **EB Garamond** — body & display (Google Fonts)
- **DM Mono** — labels & nav (Google Fonts)

Both load from Google Fonts CDN. No install required.

## License

Feel free to use and adapt for your own portfolio.
