'use client';

import { useEffect, useState } from "react";
import { SidebarSearchType } from "@/types/sidebarSearch";
import Icons from "./Icons";

const SidebarSearch = ({
    id,
    title,
    label,
    placeholder,
    name,
    action,
    defaultValue,
}: SidebarSearchType) => {
    const [query, setQuery] = useState(defaultValue ?? "");

    useEffect(() => {
        setQuery(defaultValue ?? "");
    }, [defaultValue]);

    return (
        <div className="sidebar-widget radius18" data-aos="fade-up">
            {title && <h2 className="sidebar-heading heading text-24">{title}</h2>}
            <form action={action} method="get" className="form-blog-search">
                <label htmlFor={id} className="visually-hidden">
                    {label}
                </label>
                <input
                    type="text"
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    className="text-18"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button
                    type="submit"
                    className="button button--primary"
                    aria-label={label}
                >
                    <Icons.SearchBlog />
                </button>
            </form>
        </div>
    )
}

export default SidebarSearch;
