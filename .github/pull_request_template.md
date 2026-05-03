<!--
Thanks for contributing! If you're adding a new dataset, please tick the
items below. If this PR is for something else (a bug fix, a refactor),
delete this checklist.
-->

## Adding a dataset — checklist

- [ ] New file at `datasets/<slug>.md` with YAML frontmatter (`title`, `desc`, `tags`, optional `publication` / `github` / `thumbnail`).
- [ ] All `tags` are from the curated list in [`src/data/tags.js`](../blob/main/src/data/tags.js). If you need a new tag, add it to that file in the same PR.
- [ ] Thumbnail (16:9, PNG or JPG) added at `public/thumbnails/<slug>.png` and referenced from the frontmatter as `thumbnail: /thumbnails/<slug>.png`.
- [ ] `npm test` passes locally — the schema validator runs as part of the test suite.
