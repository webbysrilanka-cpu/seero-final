# Getting Seero online — 3 minutes

The website is finished and builds cleanly. It just needs to reach GitHub so
Vercel can deploy it (and auto-deploy every future change).

## Step 1 — Unzip

Unzip `seero-website.zip`. You'll get a folder called `seero-website`
containing `src`, `package.json`, and so on.

## Step 2 — Make an empty repo on GitHub

1. Go to https://github.com/new
2. Repository name: **seero-website**
3. Choose Public or Private — either works
4. Do **NOT** tick "Add a README" / "Add .gitignore" / "Choose a license"
   (the repo must start completely empty)
5. Click **Create repository**

## Step 3 — Upload the files

On the empty repo page, click the link **"uploading an existing file"**
(or go to `https://github.com/YOUR-USERNAME/seero-website/upload/main`).

Open the unzipped `seero-website` folder, select **everything inside it**
(Ctrl+A), and drag it all onto the GitHub page. Wait for the upload to finish,
then click **Commit changes**.

> Make sure you drag the *contents* of the folder — `src`, `package.json`,
> `next.config.ts` etc. should end up at the top level of the repo, not inside
> another `seero-website` folder.

## Step 4 — Tell me

Send me the repo address, e.g. `webbysrilanka-cpu/seero-website`.

I'll connect it to Vercel, deploy it, and check every page on the live URL.
