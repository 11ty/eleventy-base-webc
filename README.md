# eleventy-base-webc

A starter repository showing how to build a web site with the [Eleventy](https://www.11ty.dev/) site generator (using the [v2.0 release](https://www.11ty.dev/blog/eleventy-v2/)) and [WebC](https://www.11ty.dev/docs/languages/webc/).

## Features

* Eleventy WebC plugin preconfigured:
	* Includes the [`<is-land>` WebC component](https://www.11ty.dev/docs/plugins/partial-hydration/) ready for use.
	* Add your own `*.webc` files to the `_components` folder.
* Adds a [`javascript` front matter type](https://www.11ty.dev/docs/data-frontmatter-customize/#example-use-javascript-in-your-front-matter) for arbitrary JS front matter.
* Simple WebC Eleventy Layout file with streamlined critical CSS and JS bundles (`_includes/layouts/base.webc`)

## Get Started

1. Make a copy of this code with **one** of these on the command line (both install into the current folder):

* `git clone https://github.com/11ty/eleventy-base-webc.git .`
* `npx degit 11ty/eleventy-base-webc`
* …or you can use the [_"Use this template"_ button on GitHub](https://github.com/11ty/eleventy-base-webc).

2. Install the dependencies

```
npm install
```

## Demo

- [Netlify](https://eleventy-base-webc.netlify.app/)

## Deploy this to your own site

Deploy this Eleventy site in just a few clicks on these services:

- [Get your own Eleventy web site on Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/11ty/eleventy-base-webc)
- If you run Eleventy locally you can drag your `_site` folder to [`drop.netlify.com`](https://drop.netlify.com/) to upload it without using `git`.
- Read more about [Deploying an Eleventy project](https://www.11ty.dev/docs/deployment/) to the web.
