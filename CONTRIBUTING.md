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
    tags:
      - <tag from src/data/tags.js>
    ---

    <full markdown description here>
    ```

3. **Add the thumbnail** to `public/thumbnails/<slug>.png` (16:9, PNG or JPG — e.g. 640×360).
4. **Pick tags from the curated list** in [`src/data/tags.js`](src/data/tags.js). The schema rejects anything not in that list. If your dataset truly needs a new tag, add an entry to `src/data/tags.js` in the same PR.
5. **Run `npm test`** locally — the schema validator runs as part of the test suite, so you'll see immediately if anything is wrong.
6. **Open a PR**. CI will re-run validation; once it's green, a maintainer will review and merge.

## What gets validated

`src/utils/dataset-schema.js` defines the schema. In short:

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Non-empty string. |
| `desc` | yes | Non-empty string. |
| `tags` | yes | Non-empty array; every entry must be in `src/data/tags.js`. |
| `thumbnail` | no | Path to a file under `public/`. |
| `publication` | no | http(s) URL or empty string. |
| `github` | no | http(s) URL or empty string. |
| `hidden` | no | Boolean; `true` removes the dataset from listings while keeping its detail page. |

Validation runs in three places, so you can't accidentally ship broken data:

- `npm run dev` and `npm run build` — fails fast in `loadAllDatasets()`.
- `npm test` — `tests/integration/dataset-validation.test.js` checks every file in `datasets/`.
- CI on every PR (`.github/workflows/test.yaml`).
