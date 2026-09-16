export function CheckIcon() {
    return (
        <svg
            className="ps-menu__check-svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <polyline className="ps-menu__check-path" points="4 12 9 17 20 6" />
        </svg>
    );
}

export function DotIcon() {
    return <span className="ps-menu__dot" aria-hidden="true" />;
}
