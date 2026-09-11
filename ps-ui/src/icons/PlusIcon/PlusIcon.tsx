export const PlusIcon = ({
    size,
    height,
    width,
    ...props
}: {
    size?: number;
    height?: number;
    width?: number;
}) => {
    return (
        <svg
            fill="none"
            height={size || height || 24}
            width={size || width || 24}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M6 12H18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
            />
            <path
                d="M12 18V6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
            />
        </svg>
    );
};
