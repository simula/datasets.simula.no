import { test, expect } from '@playwright/test'

test.describe('dataset detail page', () => {
    test('navigating from a card lands on /[slug] with the dataset content', async ({
        page
    }) => {
        await page.goto('/')
        // Use the first card heading to locate its enclosing link.
        const firstCardHeading = page
            .getByRole('heading', { level: 3 })
            .first()
        const title = (await firstCardHeading.textContent())?.trim()
        expect(title).toBeTruthy()
        await firstCardHeading.click()

        await expect(
            page.getByRole('heading', { level: 1, name: title })
        ).toBeVisible()
        await expect(page).toHaveURL(/^http:\/\/[^/]+\/[a-z0-9-]+/)
    })

    test('breadcrumb returns to the home grid', async ({ page }) => {
        await page.goto('/')
        await page.getByRole('heading', { level: 3 }).first().click()
        await page
            .getByRole('link', { name: 'Back to all datasets' })
            .click()
        await expect(page).toHaveURL(/\/$/)
        await expect(
            page.getByRole('heading', { name: 'Simula Datasets' })
        ).toBeVisible()
    })

    test('tag link from detail navigates back to filtered home', async ({
        page
    }) => {
        // Find a card on home, navigate to its detail, click first tag.
        await page.goto('/')
        await page.getByRole('heading', { level: 3 }).first().click()
        const tagLink = page
            .locator('header a[href*="/?tag="]')
            .first()
        const href = await tagLink.getAttribute('href')
        expect(href).toMatch(/\/\?tag=/)
        await tagLink.click()
        await expect(page).toHaveURL(/\/\?tag=/)
    })

    test('detail page emits a JSON-LD Dataset schema script', async ({
        page
    }) => {
        await page.goto('/')
        await page.getByRole('heading', { level: 3 }).first().click()
        const script = page.locator(
            'script[type="application/ld+json"]'
        )
        await expect(script).toHaveCount(1)
        const json = await script.textContent()
        const parsed = JSON.parse(json)
        expect(parsed['@context']).toBe('https://schema.org')
        expect(parsed['@type']).toBe('Dataset')
        expect(parsed.name).toBeTruthy()
        expect(parsed.url).toMatch(/^https:\/\/datasets\.simula\.no\//)
        expect(parsed.creator.name).toBe('Simula Research Laboratory')
        expect(parsed.isAccessibleForFree).toBe(true)
    })

    test('rendered markdown body has no <script> tags (sanitized)', async ({
        page
    }) => {
        await page.goto('/')
        await page.getByRole('heading', { level: 3 }).first().click()
        // The markdown is injected into a <article>...<div> with the
        // sanitized HTML; assert no inline <script> ended up there.
        const articleScripts = await page
            .locator('article script')
            .count()
        expect(articleScripts).toBe(0)
    })
})
