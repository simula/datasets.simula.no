import { z } from 'zod'
import { DOMAIN_TAGS, MODALITY_TAGS, TASK_TAGS } from '../data/tags.js'

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
        domain: z.array(z.enum(DOMAIN_TAGS)).default([]),
        modality: z.array(z.enum(MODALITY_TAGS)).default([]),
        tasks: z.array(z.enum(TASK_TAGS)).default([]),
        hidden: z.boolean().optional(),
    })
    .strict()
    .refine(d => d.domain.length + d.modality.length + d.tasks.length > 0, {
        message: 'at least one tag is required (domain, modality, or task)',
        path: ['domain'],
    })

export function validateFrontmatter(slug, frontmatter) {
    const { mtime: _mtime, ...rest } = frontmatter
    const result = datasetFrontmatterSchema.safeParse(rest)
    if (result.success) return result.data
    const issues = result.error.issues
        .map(i => `  - ${i.path.join('.') || '(root)'}: ${i.message}`)
        .join('\n')
    throw new Error(
        `Invalid dataset frontmatter in datasets/${slug}.md:\n${issues}`
    )
}
