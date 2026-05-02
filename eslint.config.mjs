import nextConfig from 'eslint-config-next'

export default [
    ...nextConfig,
    {
        ignores: [
            'node_modules/',
            '.next/',
            'out/',
            'playwright-report/',
            'test-results/'
        ]
    }
]
