import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DatasetCard from '../../../src/components/dataset-card'

const baseDataset = {
    slug: 'alpha',
    frontmatter: {
        title: 'Alpha Dataset',
        desc: 'A medical video dataset.',
        thumbnail: '/thumbnails/alpha.png',
        publication: 'https://example.com/alpha-paper',
        github: 'https://github.com/example/alpha',
        domain: ['health'],
        modality: ['video'],
        tasks: [],
        mtime: '2024-06-15T12:00:00Z'
    }
}

const make = overrides => ({
    ...baseDataset,
    frontmatter: { ...baseDataset.frontmatter, ...(overrides || {}) }
})

describe('DatasetCard', () => {
    it('renders the title and description', () => {
        render(<DatasetCard dataset={baseDataset} />)
        expect(
            screen.getByRole('heading', { name: 'Alpha Dataset' })
        ).toBeInTheDocument()
        expect(
            screen.getByText('A medical video dataset.')
        ).toBeInTheDocument()
    })

    it('links the card to /[slug]', () => {
        render(<DatasetCard dataset={baseDataset} />)
        const cardLink = screen
            .getByRole('heading', { name: 'Alpha Dataset' })
            .closest('a')
        expect(cardLink).toHaveAttribute('href', '/alpha')
    })

    it('renders an <img> with the thumbnail src and a webp <source> srcset', () => {
        const { container } = render(<DatasetCard dataset={baseDataset} />)
        const img = container.querySelector('img')
        expect(img).toHaveAttribute('src', '/thumbnails/alpha.png')

        const source = container.querySelector('source[type="image/webp"]')
        expect(source).not.toBeNull()
        expect(source.getAttribute('srcset')).toContain(
            '/thumbnails/optimized/alpha-320.webp 320w'
        )
        expect(source.getAttribute('srcset')).toContain(
            '/thumbnails/optimized/alpha-960.webp 960w'
        )
    })

    it('falls back to a placeholder when no thumbnail is provided', () => {
        const dataset = make({ thumbnail: undefined })
        const { container } = render(<DatasetCard dataset={dataset} />)
        expect(container.querySelector('img')).toBeNull()
        expect(container.querySelector('picture')).toBeNull()
        // The fallback wraps the FiFolder icon — assert via the SVG
        // rendered into the placeholder slot.
        expect(container.querySelector('svg')).not.toBeNull()
    })

    it('eager-loads the image when priority is true, lazy by default', () => {
        const eagerRender = render(
            <DatasetCard dataset={baseDataset} priority />
        )
        expect(eagerRender.container.querySelector('img')).toHaveAttribute(
            'loading',
            'eager'
        )
        expect(eagerRender.container.querySelector('img')).toHaveAttribute(
            'fetchpriority',
            'high'
        )
        eagerRender.unmount()

        const lazyRender = render(<DatasetCard dataset={baseDataset} />)
        expect(lazyRender.container.querySelector('img')).toHaveAttribute(
            'loading',
            'lazy'
        )
    })

    it('renders up to 3 tag buttons across all facets and an overflow chip when there are more', () => {
        const dataset = make({
            domain: ['health', 'sports'],
            modality: ['video', 'images'],
            tasks: ['segmentation']
        })
        render(<DatasetCard dataset={dataset} />)
        // Domain first, then modality, then tasks. So first 3 visible
        // are: health, sports, video. Labels are the friendly form.
        expect(
            screen.getByRole('button', { name: 'Health & medical' })
        ).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Sports' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Video' })).toBeInTheDocument()
        expect(screen.queryByRole('button', { name: 'Images' })).toBeNull()
        expect(screen.getByText('+2')).toBeInTheDocument()
    })

    it('does not show the overflow chip when there are 3 or fewer tags total', () => {
        const dataset = make({
            domain: ['health'],
            modality: ['video'],
            tasks: ['segmentation']
        })
        render(<DatasetCard dataset={dataset} />)
        expect(screen.queryByText(/^\+\d/)).toBeNull()
    })

    it('omits the tag bar entirely when there are no tags in any facet', () => {
        const dataset = make({ domain: [], modality: [], tasks: [] })
        render(<DatasetCard dataset={dataset} />)
        // No tag buttons render at all.
        const buttons = screen.queryAllByRole('button')
        expect(buttons).toHaveLength(0)
    })

    it('calls onTagClick({ tag, facet }) when a tag button is clicked', async () => {
        const onTagClick = vi.fn()
        const user = userEvent.setup()
        render(
            <DatasetCard dataset={baseDataset} onTagClick={onTagClick} />
        )

        await user.click(
            screen.getByRole('button', { name: 'Health & medical' })
        )
        expect(onTagClick).toHaveBeenCalledWith({
            tag: 'health',
            facet: 'domain'
        })
        expect(onTagClick).toHaveBeenCalledTimes(1)
    })

    it('does not throw when a tag is clicked with no onTagClick handler', async () => {
        const user = userEvent.setup()
        render(<DatasetCard dataset={baseDataset} />)
        await expect(
            user.click(
                screen.getByRole('button', { name: 'Health & medical' })
            )
        ).resolves.not.toThrow()
    })

    it('renders publication and github icon links with the correct href', () => {
        render(<DatasetCard dataset={baseDataset} />)
        expect(
            screen.getByRole('link', {
                name: /publication for Alpha Dataset/i
            })
        ).toHaveAttribute('href', 'https://example.com/alpha-paper')
        expect(
            screen.getByRole('link', {
                name: /GitHub repository for Alpha Dataset/i
            })
        ).toHaveAttribute('href', 'https://github.com/example/alpha')
    })

    it('omits publication and github links when not provided in frontmatter', () => {
        const dataset = make({ publication: undefined, github: undefined })
        render(<DatasetCard dataset={dataset} />)
        expect(
            screen.queryByRole('link', { name: /publication for/i })
        ).toBeNull()
        expect(
            screen.queryByRole('link', { name: /GitHub repository for/i })
        ).toBeNull()
    })

    it('renders the formatted month-year for the mtime', () => {
        // "Last updated" appears alongside the formatted mtime in the
        // footer. Use a mid-month UTC time to avoid TZ rollover flakes.
        const dataset = make({ mtime: '2024-06-15T12:00:00Z' })
        render(<DatasetCard dataset={dataset} />)
        expect(screen.getByText('Jun 2024')).toBeInTheDocument()
    })
})
