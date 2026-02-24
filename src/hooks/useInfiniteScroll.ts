import { useState, useEffect, useCallback, useRef } from "react";

function useInfiniteScroll<T>(items: T[], batchSize = 10) {
    //step 1:- define state and ref
    const [visibleCount, setVisibleCount] = useState(batchSize);
    const bottomRef = useRef<HTMLDivElement>(null) //null bcoz it is reference 

    //step 2:- load more
    const loadMore = useCallback(function () {
        setVisibleCount(function(currentCount) {
            const nextCount = currentCount + batchSize;
            if (nextCount > items.length) {
                return items.length;
            }
            return nextCount
        });
    }, [batchSize, items.length]);

    //step 3:- observer
    useEffect(function () {
        const bottomDiv = bottomRef.current;
        if (bottomDiv === null) {
            return;
        }

        const observer = new IntersectionObserver(function(entries) {
            const entry = entries[0];
            if (entry.isIntersecting === true) {
                loadMore();
            }
        });
        observer.observe(bottomDiv);

        return function() {
            observer.disconnect();
        }
    }, [loadMore]);

    //step 4:- return
    const visibleItems = items.slice(0, visibleCount);
    const hasMore = visibleCount < items.length;

    return {visibleItems, bottomRef, hasMore};
}

export default useInfiniteScroll;