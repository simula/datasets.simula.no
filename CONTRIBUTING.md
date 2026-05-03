# Contributing a dataset

Datasets are added by pull request.

1. **Fork** the repo and create a branch.
2. **Create `datasets/<slug>.md`** with this frontmatter:

    ```markdown
    ---
    title: '<dataset name>'
    desc: '<one-sentence description>'
    thumbnail: /thumbnails/<slug>.png
    publication: <https://...>     # optional
    github: <https://...>          # optional
    domain:
      - <domain tag from src/data/tags.js>
    modality:
      - <modality tag from src/data/tags.js>
    tasks:
      - <task tag from src/data/tags.js>
    ---

    <full markdown description here>
    ```

3. **Add the thumbnail** to `public/thumbnails/<slug>.png` (16:9, PNG or JPG — e.g. 640×360).
4. **Pick tags from the curated list** in [`src/data/tags.js`](src/data/tags.js). Tags are split across three facets — `domain`, `modality`, and `tasks` — and each frontmatter field only accepts tags from its own facet. At least one tag is required across the three. The schema rejects anything not in the curated list; if your dataset truly needs a new tag, add an entry to `src/data/tags.js` in the same PR.
5. **Run `npm test`** locally — the schema validator runs as part of the test suite, so you'll see immediately if anything is wrong.
6. **Open a PR**. CI will re-run validation; once it's green, a maintainer will review and merge.