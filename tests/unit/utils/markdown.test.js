import { describe, it, expect } from 'vitest'
import { renderAndSanitize, SANITIZE_OPTIONS } from '../../../src/utils/markdown'

describe('renderAndSanitize — markdown rendering', () => {
    it('returns empty string for null/undefined input', () => {
        expect(renderAndSanitize(null)).toBe('')
        expect(renderAndSanitize(undefined)).toBe('')
        expect(renderAndSanitize('')).toBe('')
    })

    it('renders headings', () => {
        const html = renderAndSanitize('# Heading 1\n\n## Heading 2')
        expect(html).toContain('<h1>Heading 1</h1>')
        expect(html).toContain('<h2>Heading 2</h2>')
    })

    it('renders bold and italic text', () => {
        const html = renderAndSanitize('Some **bold** and *italic* text.')
        expect(html).toMatch(/<strong>bold<\/strong>/)
        expect(html).toMatch(/<em>italic<\/em>/)
    })

    it('renders links and preserves the href', () => {
        const html = renderAndSanitize('[Click](https://example.com)')
        expect(html).toContain('href="https://example.com"')
        expect(html).toContain('>Click</a>')
    })

    it('renders unordered lists', () => {
        const html = renderAndSanitize('- one\n- two\n- three')
        expect(html).toContain('<ul>')
        expect(html).toContain('<li>one</li>')
        expect(html).toContain('<li>three</li>')
    })

    it('renders fenced code blocks', () => {
        const html = renderAndSanitize('```\nconst x = 1\n```')
        expect(html).toContain('<pre>')
        expect(html).toContain('<code>')
        expect(html).toContain('const x = 1')
    })

    it('renders inline code', () => {
        const html = renderAndSanitize('Use `npm test` to run.')
        expect(html).toContain('<code>npm test</code>')
    })

    it('renders raw HTML <table> blocks', () => {
        const md = `
<table>
  <tr><th>Name</th><th>Value</th></tr>
  <tr><td>foo</td><td>1</td></tr>
</table>
`
        const html = renderAndSanitize(md)
        expect(html).toContain('<table>')
        expect(html).toContain('<th>Name</th>')
        expect(html).toContain('<td>foo</td>')
    })

    it('decorates rendered images with loading="lazy" and decoding="async"', () => {
        const html = renderAndSanitize('![alt](https://example.com/img.png)')
        expect(html).toContain('src="https://example.com/img.png"')
        expect(html).toContain('loading="lazy"')
        expect(html).toContain('decoding="async"')
    })
})

describe('renderAndSanitize — XSS protection (security-critical)', () => {
    it('strips bare <script> tags entirely', () => {
        const html = renderAndSanitize(
            'Hello\n\n<script>alert(1)</script>\n\nWorld'
        )
        expect(html).not.toContain('<script')
        expect(html).not.toContain('alert(1)')
    })

    it('strips on*-handler attributes from elements', () => {
        const md = '<a href="https://example.com" onclick="alert(1)">click</a>'
        const html = renderAndSanitize(md)
        expect(html).not.toContain('onclick')
        expect(html).not.toContain('alert(1)')
        expect(html).toContain('href="https://example.com"')
    })

    it('strips onerror handler from <img>', () => {
        const md = '<img src="x" onerror="alert(1)" alt="">'
        const html = renderAndSanitize(md)
        expect(html).not.toContain('onerror')
        expect(html).not.toContain('alert(1)')
    })

    it('strips javascript: URLs from anchor href', () => {
        const md = '<a href="javascript:alert(1)">click</a>'
        const html = renderAndSanitize(md)
        // The dangerous scheme must not appear in the final output.
        expect(html).not.toContain('javascript:')
        expect(html).not.toContain('alert(1)')
    })

    it('strips javascript: URLs from iframe src', () => {
        const md = '<iframe src="javascript:alert(1)"></iframe>'
        const html = renderAndSanitize(md)
        expect(html).not.toContain('javascript:')
    })

    it('strips <style> tags', () => {
        const md = '<style>body { color: red }</style>'
        const html = renderAndSanitize(md)
        expect(html).not.toContain('<style')
    })

    it('strips iframe src that uses an unlisted scheme', () => {
        const md = '<iframe src="ftp://example.com"></iframe>'
        const html = renderAndSanitize(md)
        expect(html).not.toContain('ftp://')
    })

    it('survives a script tag inserted via markdown raw HTML', () => {
        const md = `
# Header

<script>document.cookie = 'pwn'</script>

Trailing text.
`
        const html = renderAndSanitize(md)
        expect(html).not.toContain('<script')
        expect(html).not.toContain('document.cookie')
        expect(html).toContain('<h1>Header</h1>')
        expect(html).toContain('Trailing text.')
    })
})

describe('renderAndSanitize — allowed embeds (real dataset patterns)', () => {
    it('preserves https iframes (videos, demos)', () => {
        const md =
            '<iframe src="https://www.youtube.com/embed/abc" width="560" height="315" allowfullscreen></iframe>'
        const html = renderAndSanitize(md)
        expect(html).toContain('<iframe')
        expect(html).toContain('src="https://www.youtube.com/embed/abc"')
        expect(html).toContain('allowfullscreen')
    })

    it('preserves <video controls> elements', () => {
        const md = '<video controls src="https://example.com/v.mp4"></video>'
        const html = renderAndSanitize(md)
        expect(html).toContain('<video')
        expect(html).toContain('controls')
        expect(html).toContain('src="https://example.com/v.mp4"')
    })

    it('preserves inline style and class on images', () => {
        const md =
            '<img src="https://example.com/x.png" alt="x" style="max-width:200px" class="hero">'
        const html = renderAndSanitize(md)
        expect(html).toContain('<img')
        expect(html).toContain('style="max-width:200px"')
        expect(html).toContain('class="hero"')
    })

    it('preserves data: URLs on img src (per allowedSchemes)', () => {
        // sanitize-html requires an explicit body for the image; markdown-it
        // wraps raw HTML blocks differently — use inline HTML here.
        const md =
            'Inline <img src="data:image/png;base64,iVBORw0KGgo=" alt="px">'
        const html = renderAndSanitize(md)
        expect(html).toContain('data:image/png;base64,')
    })
})

describe('SANITIZE_OPTIONS', () => {
    it('does not include javascript in allowed schemes', () => {
        expect(SANITIZE_OPTIONS.allowedSchemes).not.toContain('javascript')
    })

    it('allows https, http, mailto, and data schemes', () => {
        expect(SANITIZE_OPTIONS.allowedSchemes).toEqual(
            expect.arrayContaining(['http', 'https', 'mailto', 'data'])
        )
    })

    it('does not include script in allowed tags', () => {
        expect(SANITIZE_OPTIONS.allowedTags).not.toContain('script')
        expect(SANITIZE_OPTIONS.allowedTags).not.toContain('style')
    })
})
