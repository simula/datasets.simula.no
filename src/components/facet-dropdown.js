import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { FiChevronDown, FiCheck } from 'react-icons/fi'

// Single-facet checkbox dropdown. Closed: trigger button with active count.
// Open: list of options with counts; clicking toggles. Outside click and
// Escape close the panel.
export default function FacetDropdown({ label, options, selected, onChange }) {
    const [open, setOpen] = useState(false)
    const [alignRight, setAlignRight] = useState(false)
    const containerRef = useRef(null)
    const buttonRef = useRef(null)
    const panelRef = useRef(null)
    const panelId = useId()

    useEffect(() => {
        if (!open) return
        const onPointer = e => {
            if (!containerRef.current?.contains(e.target)) setOpen(false)
        }
        const onKey = e => {
            if (e.key === 'Escape') {
                setOpen(false)
                buttonRef.current?.focus()
            }
        }
        document.addEventListener('mousedown', onPointer)
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('mousedown', onPointer)
            document.removeEventListener('keydown', onKey)
        }
    }, [open])

    // Flip the panel to right-align if a left-aligned panel would clip
    // past the right edge of the viewport (common on mobile when the
    // trigger sits in the middle/end of its row).
    useLayoutEffect(() => {
        if (!open) {
            setAlignRight(false)
            return
        }
        const panel = panelRef.current
        if (!panel) return
        const rect = panel.getBoundingClientRect()
        const margin = 16 // keep at least 1rem from the viewport edge
        if (rect.right > window.innerWidth - margin) setAlignRight(true)
    }, [open])

    const selectedSet = new Set(selected)
    const activeCount = selected.length
    const isActive = activeCount > 0

    const toggle = tag => {
        if (selectedSet.has(tag)) onChange(selected.filter(t => t !== tag))
        else onChange([...selected, tag])
    }

    return (
        <div ref={containerRef} className="relative inline-block text-left">
            <button
                ref={buttonRef}
                type="button"
                onClick={() => setOpen(o => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={panelId}
                className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isActive
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
            >
                <span>{label}</span>
                {isActive && (
                    <span
                        className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white/20 px-1 text-xs font-medium"
                        aria-label={`${activeCount} selected`}
                    >
                        {activeCount}
                    </span>
                )}
                <FiChevronDown
                    className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                />
            </button>

            {open && (
                <div
                    ref={panelRef}
                    id={panelId}
                    role="listbox"
                    aria-multiselectable="true"
                    aria-label={label}
                    className={`absolute z-20 mt-2 w-60 max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white py-1 shadow-lg focus:outline-hidden ${
                        alignRight ? 'right-0' : 'left-0'
                    }`}
                >
                    {options.map(opt => {
                        const checked = selectedSet.has(opt.tag)
                        const disabled = !checked && opt.count === 0
                        return (
                            <button
                                key={opt.tag}
                                type="button"
                                role="option"
                                aria-selected={checked}
                                disabled={disabled}
                                onClick={() => toggle(opt.tag)}
                                className={`flex min-h-11 w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors focus:outline-hidden focus-visible:bg-gray-50 ${
                                    disabled
                                        ? 'cursor-not-allowed text-gray-300'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <span className="flex min-w-0 items-center gap-2">
                                    <span
                                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                                            checked
                                                ? 'border-primary bg-primary text-white'
                                                : 'border-gray-300 bg-white'
                                        }`}
                                        aria-hidden="true"
                                    >
                                        {checked && (
                                            <FiCheck className="h-3 w-3" />
                                        )}
                                    </span>
                                    <span className="truncate">{opt.label}</span>
                                </span>
                                <span className="shrink-0 text-xs text-gray-400">
                                    {opt.count}
                                </span>
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
