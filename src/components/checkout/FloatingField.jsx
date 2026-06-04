import { memo, useState } from 'react';

const inputClass =
  'peer w-full rounded-xl border bg-white px-4 pb-2.5 pt-6 text-sm text-slate-900 outline-none transition-all duration-200 placeholder-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-400';

function FloatingField({
  id,
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder = ' ',
  autoComplete,
  maxLength,
  inputMode,
  as = 'input',
  children,
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(value);
  const floated = focused || hasValue;

  const borderClass = error
    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
    : 'border-slate-200 dark:border-slate-600';

  const labelClass = floated
    ? 'top-2 text-[11px] text-emerald-600 dark:text-emerald-400'
    : 'top-1/2 -translate-y-1/2 text-sm text-slate-400';

  return (
    <div className="relative min-w-0">
      {as === 'select' ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${inputClass} ${borderClass} appearance-none`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          {children}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          maxLength={maxLength}
          inputMode={inputMode}
          className={`${inputClass} ${borderClass}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}

      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 z-10 origin-left font-medium transition-all duration-200 ${labelClass}`}
      >
        {label}
      </label>

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default memo(FloatingField);
