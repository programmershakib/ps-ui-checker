"use client";

/* eslint-disable react-refresh/only-export-components */
import { PopoverContent } from "./PopoverContent";
import { PopoverTrigger } from "./PopoverTrigger";
import { PopoverRoot } from "./PopoverRoot";
import "./Popover.css";

export { PopoverContent, PopoverRoot, PopoverTrigger };

export const Popover = Object.assign(PopoverRoot, {
    Trigger: PopoverTrigger,
    Content: PopoverContent,
});

export default Popover;
