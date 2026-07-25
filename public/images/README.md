# Image assets

Drop your real images into this folder using these filenames (referenced throughout the codebase):

- `og-image.jpg` (1200x630) — social share preview
- `PROJECT_IMAGE_1.jpg`, `PROJECT_IMAGE_2.jpg`, ... — project screenshots (referenced in prisma/seed.ts and the admin dashboard)
- `COMPANY_LOGO.png` — experience/company logos
- `CERTIFICATE_IMAGE_1.jpg`, ... — achievement/certificate images
- `GALLERY_IMAGE_1.jpg`, ... — gallery photos
- `BLOG_COVER_1.jpg`, ... — blog post cover images

The current UI renders text placeholders (e.g. "PROJECT_IMAGE") instead of `<Image>` tags so the site works before you've added real files. Once you add images, swap the placeholder `<div>` blocks in the relevant components for `next/image` — search each `components/sections/*.tsx` file for the literal placeholder strings.
