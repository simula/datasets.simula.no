import markdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'

// HTML allowlist for sanitize-html. Several datasets author raw HTML in
// markdown (tables, embedded videos/iframes, styled imgs); the allowlist
// preserves those while stripping <script>, on*-handlers, and
// javascript:/data: scheme attacks.
export const SANITIZE_OPTIONS = {
    allowedTags: [
        ...sanitizeHtml.defaults.allowedTags,
        'img',
        'iframe',
        'svg',
        'path',
        'video',
        'audio',
        'source',
        'figure',
        'figcaption'
    ],
    allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        '*': ['style', 'class', 'id', 'align'],
        a: ['href', 'name', 'target', 'rel', 'title'],
        img: [
            'src',
            'alt',
            'width',
            'height',
            'loading',
            'decoding',
            'srcset',
            'sizes'
        ],
        iframe: [
            'src',
            'width',
            'height',
            'frameborder',
            'allowfullscreen',
            'allow',
            'title',
            'referrerpolicy',
            'loading'
        ],
        svg: ['xmlns', 'fill', 'viewBox', 'viewbox', 'stroke', 'width', 'height'],
        path: ['stroke-linecap', 'stroke-linejoin', 'stroke-width', 'd', 'fill'],
        table: ['cellspacing', 'cellpadding', 'border', 'width'],
        td: ['colspan', 'rowspan', 'align', 'valign', 'width', 'height'],
        th: ['colspan', 'rowspan', 'align', 'valign', 'width', 'height'],
        video: [
            'src',
            'controls',
            'width',
            'height',
            'poster',
            'autoplay',
            'muted',
            'loop'
        ],
        audio: ['src', 'controls'],
        source: ['src', 'type']
    },
    allowedSchemes: ['http', 'https', 'mailto', 'data'],
    allowedSchemesAppliedToAttributes: ['href', 'src', 'cite']
}

// Default markdown-it images to lazy-load + async-decode so article
// images in long bodies don't block the initial render.
function installLazyImageRenderer(md) {
    const defaultImageRender =
        md.renderer.rules.image ||
        function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options)
        }
    md.renderer.rules.image = function (tokens, idx, options, env, self) {
        const token = tokens[idx]
        if (token.attrIndex('loading') < 0) token.attrPush(['loading', 'lazy'])
        if (token.attrIndex('decoding') < 0)
            token.attrPush(['decoding', 'async'])
        return defaultImageRender(tokens, idx, options, env, self)
    }
}

export function renderAndSanitize(content) {
    const md = markdownIt({ html: true })
    installLazyImageRenderer(md)
    return sanitizeHtml(md.render(content || ''), SANITIZE_OPTIONS)
}
