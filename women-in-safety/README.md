# Women in Safety Consulting — Website

Mobile-first, accessible, SEO-friendly static site with optional PHP for forms and PayFast.

Quick start
1) Local preview:
   - PHP: php -S localhost:8080
   - Python: python3 -m http.server 8080 (then open http://localhost:8080)
2) Update:
   - server/contact.php (recipient email)
   - server/payfast/config.php (PayFast keys and URLs)
   - Meta tags (title, description, OG image) in index.html
3) Build:
   - Already buildless. Just zip the folder and deploy.

Deploy options
- Netlify Drop (no account): https://app.netlify.com/drop
- Surge (CLI): npm i -g surge && surge women-in-safety
- Vercel (CLI): npm i -g vercel && vercel women-in-safety

Security/POPIA
- Cookie consent banner is included (functional-only).
- Review privacy.html with legal counsel.

