import { test, expect } from '@playwright/test'

// Card grid uses headings inside <a href="/<slug>">. Counting heading
// elements is a stable, semantic way to measure the visible result set.
const cards = page => page.getByRole('heading', { level: 3 })

// Open the first facet dropdown that has at least one option, return the
// first option's tag (the on-click writes ?<facet>=<tag> to the URL).
async function openFirstFacet(page) {
    const trigger = page
        .getByRole('button', { expanded: false })
        .filter({ hasText: /^(Domain|Modality|Task)/ })
        .first()
    const facetName = (await trigger.textContent())?.trim().toLowerCase()
    await trigger.click()
    return { trigger, facetName }
}

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
        await expect(page).toHaveURL(/[?&]q=soccer/)
        const filteredCount = await cards(page).count()
        await page.reload()
        await expect(search).toHaveValue('soccer')
        await expect(cards(page)).toHaveCount(filteredCount)
    })

    test('selecting a facet option filters and toggles via URL', async ({
        page
    }) => {
        await page.goto('/')
        const { trigger, facetName } = await openFirstFacet(page)

        // Pick the first available option in the open panel.
        const option = page.getByRole('option').first()
        const optionLabel = (await option.textContent())?.trim()
        expect(optionLabel).toBeTruthy()
        await option.click()

        // URL gains ?<facet>=<tag>; trigger now shows an active state
        // (count badge appears alongside the label).
        await expect(page).toHaveURL(new RegExp(`[?&]${facetName}=`))
        await expect(trigger).toContainText('1')

        // Re-open and toggle off.
        await trigger.click()
        await page.getByRole('option').first().click()
        await expect(page).not.toHaveURL(new RegExp(`${facetName}=`))
    })

    test('direct URL hit on /?domain=... applies the filter on load', async ({
        page
    }) => {
        // Discover an actual selected state by clicking through the UI,
        // then revisit the URL fresh and verify hydration converges.
        await page.goto('/')
        const { facetName } = await openFirstFacet(page)
        const option = page.getByRole('option').first()
        await option.click()

        await expect(page).toHaveURL(new RegExp(`${facetName}=`))
        const filteredCount = await cards(page).count()
        const url = page.url()

        await page.goto(url)
        await expect(cards(page)).toHaveCount(filteredCount)
    })

    test('sort dropdown reorders and updates URL only when non-default', async ({
        page
    }) => {
        await page.goto('/')
        const sort = page.getByRole('combobox')
        await sort.selectOption('az')
        await expect(page).toHaveURL(/[?&]sort=az/)

        await sort.selectOption('recent')
        await expect(page).not.toHaveURL(/sort=/)
    })

    test('"Clear all" resets search and facet filters', async ({ page }) => {
        await page.goto('/')
        await page.getByLabel('Search datasets').fill('soccer')
        await expect(page).toHaveURL(/q=soccer/)

        const { facetName } = await openFirstFacet(page)
        await page.getByRole('option').first().click()
        await expect(page).toHaveURL(new RegExp(`${facetName}=`))

        await page.getByRole('button', { name: 'Clear all' }).click()
        await expect(page).not.toHaveURL(/q=/)
        await expect(page).not.toHaveURL(new RegExp(`${facetName}=`))
        await expect(page.getByLabel('Search datasets')).toHaveValue('')
    })

    test('"/" keyboard shortcut focuses the search input', async ({ page }) => {
        await page.goto('/')
        await page.locator('body').click()
        await page.keyboard.press('/')
        await expect(page.getByLabel('Search datasets')).toBeFocused()
    })

    test('"/" keyboard shortcut does not preventDefault inside an input', async ({
        page
    }) => {
        await page.goto('/')
        const search = page.getByLabel('Search datasets')
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
