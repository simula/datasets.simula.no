import { z } from 'zod'
import { ALLOWED_TAGS } from '../data/tags.js'

// Schema for dataset frontmatter (the YAML block at the top of each
// datasets/<slug>.md file). Enforced by loadAllDatasets() and by the
// dataset-validation integration test, so every contribution path —
// build, dev, CI — fails fast on bad data.
//
// `mtime` is attached by the loader after parsing, so it is not part of
// the contributor-supplied schema.

const optionalUrlOrEmpty = z
    .string()
    .refine(v => v === '' || /^https?:\/\//.test(v), {
        message: 'must be a http(s) URL or an empty string',
    })
    .optional()

export const datasetFrontmatterSchema = z
    .object({
        title: z.string().min(1, 'title is required'),
        desc: z.string().min(1, 'desc is required'),
        thumbnail: z.string().min(1).optional(),
        publication: optionalUrlOrEmpty,
        github: optionalUrlOrEmpty,
        tags: z
            .array(z.enum(ALLOWED_TAGS))
            .min(1, 'at least one tag is required'),
        hidden: z.boolean().optional(),
    })
    .strict()

export function validateFrontmatter(slug, frontmatter) {
    const { mtime: _mtime, ...rest } = frontmatter
    const result = datasetFrontmatterSchema.safeParse(rest)
    if (result.success) return
    const issues = result.error.issues
        .map(i => `  - ${i.path.join('.') || '(root)'}: ${i.message}`)
        .join('\n')
    throw new Error(
        `Invalid dataset frontmatter in datasets/${slug}.md:\n${issues}`
    )
}
