# HPack

A lightweight **HTML component bundler** for modular HTML development.

HPack lets you split large HTML files into reusable components using a custom `<include>` tag and automatically bundles them into optimized production HTML files.

It is designed for **simple static websites** that need component-style HTML without using large frameworks or complex bundlers.

---

## ✨ Features

- Modular HTML using `<include src="">`
- Nested component support
- Automatic rebuild when files change
- Fast file watching using **chokidar**
- Dependency graph for rebuilding only affected pages
- Removes HTML comments in production
- Minifies HTML output
- Outputs compressed **single-line HTML**
- Lightweight and easy to configure
- No frontend framework required

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/hpack.git