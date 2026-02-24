import { useEffect, useState, useRef } from "react";

interface VirtualListOptions {
    rowHeight: number;
    visibleRows: number;
    overscan?: number;
}

function useVirtualList<T>(items: T[], options: VirtualListOptions) {
    const rowHeight = options.rowHeight;
    const visibleRows = options.visibleRows;
    const overscan = options.overscan ?? 3;

    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(function() {
        const container = containerRef.current;
        if (!container) return;

        function onScroll() {
            //handle this case carefully as even after type definition can give error as null or undefined
            setScrollTop(container?.scrollTop as number); //container is null at start of the page
            //setScrollTop(container?.scrollTop ?? 0) this or above
        }

        container.addEventListener('scroll', onScroll);
        return function() {
            container.removeEventListener('scroll', onScroll);
        }
    }, []);

    const firstRow = Math.floor(scrollTop/rowHeight);
    const startIndex = Math.max(0, firstRow - overscan);
    const endIndex = Math.min(items.length, firstRow+visibleRows+overscan);
    const spaceAbove = startIndex * rowHeight;
    const spaceBelow = (items.length - endIndex)*rowHeight;

    return {
        visibleItems: items.slice(startIndex, endIndex),
        containerRef,
        spaceAbove,
        spaceBelow,
        startIndex
    }
}

export default useVirtualList;