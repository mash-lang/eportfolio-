Add single-page site with animations, intro-video & CV placeholders.

- Converted site to a single-page layout (index.html) with sections: Home, Education, Projects, Contact.
- Added AOS (Animate On Scroll) for simple entrance animations.
- Added an intro video placeholder (a poster + modal). To provide your video upload an MP4 to assets/intro.mp4 or replace the poster with a YouTube embed.
- Added a placeholder CV at assets/cv.pdf — replace it with your actual CV to allow direct viewing/downloading.
- Images use placeholder.com placeholders. Replace images by uploading files to the assets/ folder and updating <img> src attributes.

How to edit content permanently:
- Edit files in the repository (recommended): use the GitHub web editor or clone the repo locally and push changes. Example:
  git clone git@github.com:mash-lang/eportfolio-.git
  cd eportfolio-
  # edit files
  git add .
  git commit -m "Update site"
  git push

If you want, I can also:
- Upload your provided CV and video and wire them into the site.
- Configure a small CMS so you can edit content via a web UI.
