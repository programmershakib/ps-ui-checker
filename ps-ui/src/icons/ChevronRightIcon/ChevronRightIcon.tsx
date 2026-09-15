import type { SVGProps } from "react";

export const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            height="1em"
            width="1em"
            role="presentation"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M6 3.5 10.5 8 6 12.5" />
        </svg>
    );
}