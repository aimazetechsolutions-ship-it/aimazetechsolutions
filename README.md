# AimAze Tech Solutions Free Static Website

This folder is ready for free static hosting such as Netlify, Cloudflare Pages, GitHub Pages, or Vercel.

## Files

- `index.html` - public website entry point
- `about.html`, `services.html`, `odoo.html`, `industries.html`, `portfolio.html`, `blog.html`, `contact.html` - navigation pages
- `admin/` - Decap CMS editor files for `/admin/`
- `static-site.js` - renders the website from `content.json`
- `content.json` - editable website content
- `styles.css` - responsive design and AimAze colors
- `script.js` - navigation and contact form behavior
- `assets/` - images and logo
- `netlify.toml` - tells Netlify to publish this folder directly
- `stackbit.config.ts` and `package.json` - Netlify Visual Editor setup for click-to-edit previews

## Editing

Edit `content.json` to change text, services, FAQ, contact email, links, and images. Then redeploy/upload the folder again.

## Free CMS Option

This project includes Decap CMS so you can edit content at:

`https://aimazetechsolutions.com/admin/`

To activate it:

1. Create a GitHub repository for this folder.
2. Confirm `admin/config.yml` uses your real GitHub repo path: `aimazetechsolutions-ship-it/aimazetechsolutions`.
3. Connect the GitHub repo to Netlify instead of using manual drag-and-drop deploys.
4. Use Decap CMS with your GitHub login. Your GitHub account must have write access to the repo.

CMS-editable areas include theme colors, section visibility, hero images/video, service images/videos, gallery/portfolio items, testimonials, case studies, blog/news posts, FAQ, and custom add-on sections. The front-end also includes scroll animations and separate navigation pages.

## Netlify Visual Editor

This project also includes Netlify Visual Editor support. After these files are committed to GitHub and Netlify deploys them:

1. In Netlify, open the project.
2. Open Visual Editor / Create.
3. Connect it to the same GitHub repository and branch.
4. Let Netlify use `stackbit.config.ts`.
5. Open the visual preview and click visible sections such as Hero, Services, Odoo, Gallery, Blog, FAQ, Contact, Theme, or Typography.

Visual Editor support is powered by annotations in `static-site.js`. The content source remains `content.json`, so Decap CMS at `/admin/` can stay available as a backup editor.

## Netlify

Upload this whole folder or the zip file to Netlify. After deployment, add the custom domain `aimazetechsolutions.com` in Netlify, then update DNS in Hostinger as Netlify instructs.
