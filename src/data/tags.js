// Curated tag taxonomy for dataset frontmatter.
//
// Adding a new tag is an explicit, reviewed change: append an entry
// here in the same PR that introduces a dataset using it. The schema
// in src/utils/dataset-schema.js rejects any tag not in the per-facet
// list it derives from this file.
//
// Tags are split across three facets so the filter UI can present them
// as separate axes (Domain × Modality × Task) instead of one flat list.

export const TAG_DEFINITIONS = [
    { tag: 'health',          label: 'Health & medical',           category: 'domain'   },
    { tag: 'sports',          label: 'Sports',                     category: 'domain'   },
    { tag: 'networks',        label: 'Networking',                 category: 'domain'   },
    { tag: 'misinformation',  label: 'Misinformation',             category: 'domain'   },
    { tag: 'sensor',          label: 'Sensor data',                category: 'modality' },
    { tag: 'images',          label: 'Images',                     category: 'modality' },
    { tag: 'video',           label: 'Video',                      category: 'modality' },
    { tag: 'text',            label: 'Text',                       category: 'modality' },
    { tag: 'multimodal',      label: 'Multimodal',                 category: 'modality' },
    { tag: 'segmentation',    label: 'Segmentation labels',        category: 'task'     },
    { tag: 'detection',       label: 'Detection / bounding boxes', category: 'task'     },
    { tag: 'pose-estimation', label: 'Pose estimation',            category: 'task'     },
    { tag: 'vqa',             label: 'Visual Question Answering',  category: 'task'     },
    { tag: 'classification',  label: 'Classification',             category: 'task'     },
    { tag: 'tracking',        label: 'Object tracking',            category: 'task'     },
    { tag: 'forecasting',     label: 'Time-series forecasting',    category: 'task'     },
    { tag: 'summarization',   label: 'Summarization',              category: 'task'     },
    { tag: 'captioning',      label: 'Captioning',                 category: 'task'     },
]

const tagsByCategory = category =>
    TAG_DEFINITIONS.filter(t => t.category === category).map(t => t.tag)

export const DOMAIN_TAGS = tagsByCategory('domain')
export const MODALITY_TAGS = tagsByCategory('modality')
export const TASK_TAGS = tagsByCategory('task')

export const TAG_CATEGORY = Object.fromEntries(
    TAG_DEFINITIONS.map(t => [t.tag, t.category])
)

export const TAG_LABEL = Object.fromEntries(
    TAG_DEFINITIONS.map(t => [t.tag, t.label])
)

// Iteration order = display order in the filter UI.
export const FACETS = [
    { key: 'domain',   label: 'Domain',   tags: DOMAIN_TAGS,   field: 'domain'   },
    { key: 'modality', label: 'Modality', tags: MODALITY_TAGS, field: 'modality' },
    { key: 'task',     label: 'Task',     tags: TASK_TAGS,     field: 'tasks'    },
]
