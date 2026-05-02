import { test, expect } from '@playwright/test'

// Card grid uses headings inside <a href="/<slug>">. Counting heading
// elements is a stable, semantic way to measure the visible result set.
const cards = page => page.getByRole('heading', { level: 3 })

test.describe('home — filter & search', () => {
    test('renders the full dataset list on first paint', async ({ page }) => {
        await page.goto('/')
        await expect(
            page.getByRole('heading', { name: 'Simula Datasets' })
        ).toBeVisible()
        const total = await cards(page).count()
        expect(total).toBeGreaterThan(0)
        // Header text should mention the same number of datasets.
        await expect(
            page.getByText(new RegExp(`Browse ${total} research datasets`))
        ).toBeVisible()
    })

    test('search narrows the list and updates the URL', async ({ page }) => {
        await page.goto('/')
        const initial = await cards(page).count()
        const search = page.getByLabel('Search datasets')
        await search.fill('zzznoresult-shouldfindnothing')
        await expect(page.getByText('No datasets found')).toBeVisible()
        await expect(page).toHaveURL(/[?&]q=zzznoresult/)

        // Clear via the in-input X button restores the full list.
        await page.getByRole('button', { name: 'Clear search' }).click()
        await expect(cards(page)).toHaveCount(initial)
    })

    test('search state survives reload via the URL', async ({ page }) => {
        await page.goto('/')
        const search = page.getByLabel('Search datasets')
        await search.fill('soccer')
        // wait for URL to settle
        await expect(page).toHaveURL(/[?&]q=soccer/)
        const filteredCount = await cards(page).count()
        await page.reload()
        await expect(search).toHaveValue('soccer')
        await expect(cards(page)).toHaveCount(filteredCount)
    })

    test('clicking a tag filters and toggles via URL', async ({ page }) => {
        await page.goto('/')
        // Pick the first available filter tag in the bar (aria-pressed
        // indicates it's a tag toggle button, not a card-internal tag).
        // The button renders <span>{tag}</span><span>{count}</span>, so
        // read the tag name from the first child span only.
        const tagButton = page.locator('button[aria-pressed]').first()
        const tagName = (
            await tagButton.locator('span').first().textContent()
        )?.trim()
        expect(tagName).toBeTruthy()
        await tagButton.click()
        await expect(page).toHaveURL(
            new RegExp(`[?&]tag=${encodeURIComponent(tagName)}(?:&|$)`)
        )
        await expect(tagButton).toHaveAttribute('aria-pressed', 'true')

        // Toggle off — URL drops the tag.
        await tagButton.click()
        await expect(page).not.toHaveURL(
            new RegExp(`tag=${encodeURIComponent(tagName)}`)
        )
        await expect(tagButton).toHaveAttribute('aria-pressed', 'false')
    })

    test('direct URL hit on /?tag=... applies the filter on load', async ({
        page
    }) => {
        // First visit / to discover an actual tag in the dataset corpus,
        // so the test is robust against tag-list changes.
        await page.goto('/')
        const tagButton = page.locator('button[aria-pressed]').first()
        const tagName = (
            await tagButton.locator('span').first().textContent()
        )?.trim()
        await tagButton.click()
        await expect(page).toHaveURL(
            new RegExp(`tag=${encodeURIComponent(tagName)}`)
        )
        const filteredCount = await cards(page).count()

        // Now hit the URL directly in a fresh navigation. The grid must
        // converge on the same filtered count once hydration completes.
        await page.goto(`/?tag=${encodeURIComponent(tagName)}`)
        await expect(cards(page)).toHaveCount(filteredCount)
        // The matching tag-bar button should reflect the filter as
        // active, confirming that the URL was actually consumed.
        await expect(
            page
                .locator('button[aria-pressed="true"]')
                .filter({ hasText: tagName })
        ).toBeVisible()
    })

    test('sort dropdown reorders and updates URL only when non-default', async ({
        page
    }) => {
        await page.goto('/')
        const sort = page.getByRole('combobox')
        // Switching to az puts ?sort=az in URL.
        await sort.selectOption('az')
        await expect(page).toHaveURL(/[?&]sort=az/)

        // Back to the default 'recent' clears the sort param.
        await sort.selectOption('recent')
        await expect(page).not.toHaveURL(/sort=/)
    })

    test('"Clear all" resets search and tags', async ({ page }) => {
        await page.goto('/')
        // Each filter mutation is async (router.replace/push), so wait
        // for the URL to settle between actions to avoid one update
        // clobbering the other.
        await page.getByLabel('Search datasets').fill('soccer')
        await expect(page).toHaveURL(/q=soccer/)
        await page.locator('button[aria-pressed]').first().click()
        await expect(page).toHaveURL(/q=soccer.*tag=|tag=.*q=soccer/)

        await page.getByRole('button', { name: 'Clear all' }).click()
        await expect(page).not.toHaveURL(/q=/)
        await expect(page).not.toHaveURL(/tag=/)
        await expect(page.getByLabel('Search datasets')).toHaveValue('')
    })

    test('"/" keyboard shortcut focuses the search input', async ({ page }) => {
        await page.goto('/')
        // Make sure focus is somewhere outside the input.
        await page.locator('body').click()
        await page.keyboard.press('/')
        await expect(page.getByLabel('Search datasets')).toBeFocused()
    })

    test('"/" keyboard shortcut does not preventDefault inside an input', async ({
        page
    }) => {
        await page.goto('/')
        const search = page.getByLabel('Search datasets')
        // Focus the input directly. The "/" handler in src/pages/index.js
        // checks `document.activeElement.tagName === 'INPUT'` and returns
        // early without preventing the default, so the slash should land
        // in the input as a normal character.
        await search.focus()
        await expect(search).toBeFocused()
        await page.keyboard.press('/')
        await expect(search).toBeFocused()
        await expect(search).toHaveValue('/')
    })

    test('empty-state CTA clears filters back to the full grid', async ({
        page
    }) => {
        await page.goto('/?q=zzznoresult-shouldfindnothing')
        await expect(page.getByText('No datasets found')).toBeVisible()
        await page
            .getByRole('button', { name: 'Clear all filters' })
            .click()
        await expect(page).not.toHaveURL(/q=/)
        const restored = await cards(page).count()
        expect(restored).toBeGreaterThan(0)
    })
})
