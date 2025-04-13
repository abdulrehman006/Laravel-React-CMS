import { Icon } from '@iconify/react'
import React, {useState} from 'react'
import {router, usePage} from "@inertiajs/react";

export default function SearchWidget({title}) {
    const {props} = usePage();
    const [searchQuery, setSearchQuery] = useState(props.search ?? "");
    // handle search
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('blog.index', {search: searchQuery}))
    }
  return (
    <>
      <h4 className="cs-sidebar_widget_title">{title}</h4>
      <form className="cs-sidebar_search" onSubmit={handleSearch}>
        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button type="submit" className="cs-sidebar_search_btn">
          <Icon icon="material-symbols:search-rounded" />
        </button>
      </form>
    </>
  )
}
