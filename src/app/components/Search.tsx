import React from "react";
import { Project, Blog } from "../types";
import { sanitize_to_slug } from "@/utils/utils";
import Link from "next/link";

interface SearchProps {
    cards: Project[] | Blog[];
    quote: React.ReactNode;
    type: string;
}

const Search: React.FC<SearchProps> = ({ cards, quote, type }) => {

    function get_unique_tags(cards: Project[] | Blog[]) {
        const all_tags = cards.flatMap(card => card.tags);
        return new Set(all_tags);
    }

    function get_unique_years(cards: Project[] | Blog[]) {
        const all_years = cards.flatMap(card => card.year);
        return new Set(all_years);
    }

    return (
        <div className="mt-16 p-4 pl-0">
            <h2 className="text-4xl font-bold" >SEARCH.</h2>
            <blockquote className="mt-10 mb-6">
                <a target="_blank" href={type == 'projects' ? "https://www.imdb.com/title/tt2013293/quotes/" : "https://www.goodreads.com/author/quotes/12618081.Uncle_Iroh"}>{quote}</a>
            </blockquote>
            
            { /* Search by tag */ }
            <p className="text-sm">BY TAG:</p>
            <div className="grid gap-1.5 mt-3 pl-10">
                {[...get_unique_tags(cards)].map((tag, index) => (
                    <p key={index}>
                        <Link 
                            key={index} 
                            href={`/${type}/tags/${sanitize_to_slug(tag)}`}
                            className="animated-underline"
                            scroll={false} 
                        >
                            {tag}
                        </Link>
                    </p>
                ))}
            </div>

            { /* Search by year */ }
            <p className="mt-6 text-sm">BY YEAR:</p>
            <div className="grid gap-1.5 mt-3 pl-10">
                {[...get_unique_years(cards)].map((year, index) => (
                    <p key={index}>
                        <Link 
                            key={index} 
                            href={`/${type}/year/${sanitize_to_slug(year.toString())}`}
                            className="animated-underline"
                            scroll={false}
                        >
                            {year}
                        </Link>
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Search