// Curated tag taxonomy for dataset frontmatter.
//
// Adding a new tag is an explicit, reviewed change: append an entry
// here in the same PR that introduces a dataset using it. The schema
// in src/utils/dataset-schema.js rejects any tag not in this list.

export const TAG_DEFINITIONS = [
    { tag: 'health', label: 'Health & medical' },
    { tag: 'sports', label: 'Sports' },
    { tag: 'sensor', label: 'Sensor data' },
    { tag: 'images', label: 'Images' },
    { tag: 'video', label: 'Video' },
    { tag: 'text', label: 'Text' },
    { tag: 'segmentation', label: 'Segmentation labels' },
    { tag: 'detection', label: 'Detection / bounding boxes' },
    { tag: 'pose-estimation', label: 'Pose estimation' },
    { tag: 'vqa', label: 'Visual Question Answering' },
    { tag: 'multimodal', label: 'Multimodal' },
    { tag: 'networks', label: 'Networking' },
    { tag: 'misinformation', label: 'Misinformation' },
]

export const ALLOWED_TAGS = TAG_DEFINITIONS.map(t => t.tag)
