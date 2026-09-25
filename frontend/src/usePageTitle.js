import { useEffect } from "react";

export const SITE_TITLE = "Free AI Cover Letter Generator – Tailored Cover Letters in Minutes";

// Sets the browser tab title for the current page and restores the default on unmount
export default function usePageTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} · Cover Letter Generator` : SITE_TITLE;
        return () => {
            document.title = SITE_TITLE;
        };
    }, [title]);
}
