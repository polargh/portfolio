import { type DependencyList, useEffect } from "react";

export function useInterval(ms: number, options: { callback: () => void; deps: DependencyList }) {
    useEffect(() => {
        const id = setInterval(options.callback, ms);
        return () => clearInterval(id);
    }, [ms, options.callback]);
}