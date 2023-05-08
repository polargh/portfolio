import type { NativeTimeout } from './types';

export function debounce<F extends Function>(func: F, ms: Number) {
    let timeout: NativeTimeout | null = null;

    const debounced = (...args: any) => {
        if (timeout != null) {
            clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
            func(...args),
            ms
        })
    }
}