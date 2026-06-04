import { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { PAYMENT_METHOD_OPTIONS } from '../../data/paymentMethods.js';

function PaymentMethodSelect({ value, onChange }) {
  const listboxId = useId();
  const containerRef = useRef(null);
  const searchRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(0);

  const selected = useMemo(
    () => PAYMENT_METHOD_OPTIONS.find((m) => m.id === value) ?? PAYMENT_METHOD_OPTIONS[0],
    [value]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PAYMENT_METHOD_OPTIONS;
    return PAYMENT_METHOD_OPTIONS.filter(
      (m) =>
        m.label.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
    );
  }, [search]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearch('');
    setHighlightIndex(0);
  }, []);

  const selectMethod = useCallback(
    (id) => {
      onChange(id);
      close();
    },
    [onChange, close]
  );

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) {
      setHighlightIndex(0);
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    setHighlightIndex((i) => Math.min(i, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        close();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setHighlightIndex((i) => (i + 1) % filtered.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightIndex((i) => (i - 1 + filtered.length) % filtered.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (filtered[highlightIndex]) selectMethod(filtered[highlightIndex].id);
        break;
      default:
        break;
    }
  };

  const SelectedIcon = selected.Icon;

  return (
    <div ref={containerRef} className="relative mb-6 min-w-0">
      <label
        id={`${listboxId}-label`}
        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
      >
        Payment method
      </label>

      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-labelledby={`${listboxId}-label`}
        onClick={() => setIsOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        className={[
          'flex w-full min-h-[52px] items-center gap-3 rounded-xl border bg-white px-4 py-3 text-left shadow-sm transition-all duration-200',
          'hover:border-emerald-300 hover:shadow-md',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2',
          'dark:bg-slate-800 dark:focus-visible:ring-offset-slate-900',
          isOpen
            ? 'border-emerald-500 ring-2 ring-emerald-500/20 dark:border-emerald-500'
            : 'border-slate-200 dark:border-slate-600',
        ].join(' ')}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
          <SelectedIcon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold text-slate-900 dark:text-white">
            {selected.label}
          </span>
          <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
            {selected.description}
          </span>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none"
          role="presentation"
        >
          <div className="border-b border-slate-100 p-2 dark:border-slate-800">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                ref={searchRef}
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search payment methods..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                aria-label="Search payment methods"
                autoComplete="off"
              />
            </div>
          </div>

          <ul
            id={listboxId}
            role="listbox"
            aria-labelledby={`${listboxId}-label`}
            className="max-h-64 overflow-y-auto p-1.5"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-6 text-center text-sm text-slate-500" role="status">
                No payment methods match your search.
              </li>
            ) : (
              filtered.map((method, index) => {
                const Icon = method.Icon;
                const isSelected = method.id === value;
                const isHighlighted = index === highlightIndex;

                return (
                  <li key={method.id} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onMouseEnter={() => setHighlightIndex(index)}
                      onClick={() => selectMethod(method.id)}
                      className={[
                        'flex w-full min-h-[48px] items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-150',
                        isHighlighted || isSelected
                          ? 'bg-emerald-50 dark:bg-emerald-950/40'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/80',
                        isSelected ? 'ring-1 ring-inset ring-emerald-500/30' : '',
                      ].join(' ')}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white text-emerald-700 shadow-sm dark:bg-slate-800 dark:text-emerald-400">
                        <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">
                          {method.label}
                        </span>
                        <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                          {method.description}
                        </span>
                      </span>
                      {isSelected && (
                        <Check className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      )}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default memo(PaymentMethodSelect);
