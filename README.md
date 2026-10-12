# Team Practice: Introduction Website

A small HTML, CSS and JavaScript site for practicing Git and GitHub with a friend.

## Project layout

```
index.html        page structure
css/style.css     all styling and theme colors
js/members.js     team data (edit your own entry here)
js/script.js      behavior: team cards, typing effect, dark mode, copy button
images/           put your photos here
```

Open `index.html` in a browser to see the site. No build step needed.

## Part 1: One person sets up the repo

1. Create a new empty repository on GitHub (for example `intro-website`).
2. Unzip this project, open a terminal inside the folder and run:

```bash
git init
git add .
git commit -m "Initial commit: intro website template"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/intro-website.git
git push -u origin main
```

3. On GitHub go to **Settings → Collaborators → Add people** and invite your friend.

## Part 2: Your friend joins

```bash
git clone https://github.com/YOUR-USERNAME/intro-website.git
cd intro-website
```

## Part 3: Daily workflow (both of you)

Always work on a branch, never directly on `main`.

```bash
git checkout main
git pull                          # get the latest changes
git checkout -b feature/my-bio    # make your own branch

# edit files, then:
git add .
git commit -m "Update my bio"
git push -u origin feature/my-bio
```

Then open GitHub, click **Compare & pull request**, ask your friend to review,
and click **Merge pull request**. After merging, both of you run:

```bash
git checkout main
git pull
```

## Practice tasks

1. Each person edits their own entry in `js/members.js` (name, bio, GitHub link).
2. Change the colors at the top of `css/style.css`.
3. Add a photo in `images/` and show it on a team card.
4. Add a new section to `index.html`, such as "Hobbies" or "Projects".
5. **Make a conflict on purpose:** both edit the same line of `js/members.js` on
   different branches, merge one, then try to merge the other and resolve the
   conflict.
6. Turn on GitHub Pages (**Settings → Pages → Deploy from branch → main**) to put
   the site online.

## Handy commands

| Command | What it does |
|---|---|
| `git status` | See what changed |
| `git log --oneline` | See commit history |
| `git diff` | See exact line changes |
| `git branch` | List branches |
| `git pull` | Download your friend's latest changes |
