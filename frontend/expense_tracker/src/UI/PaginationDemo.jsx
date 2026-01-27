import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react";

export function PaginationDemo() {
  const [currentPage, setcurrentPage] = useState(1)
  const [totalPages, settotalPages] = useState(5)
   const pages = [];

  // Show first 3 pages, ellipsis if more, and last page
  for (let i = 1; i <= totalPages; i++) {
    if (i <= 3 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== 'ellipsis') {
      pages.push('ellipsis');
    }
  }
  return (
    
     <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious  onClick={()=>setcurrentPage((prev)=>prev-1)} isDisabled={currentPage === 1} />
        </PaginationItem>

        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink size="sm" href="#" isActive={page === currentPage }>
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext isActive={currentPage < totalPages} href="#" onClick={()=>setcurrentPage((prev)=>prev<totalPages?prev+1:prev)} isDisabled={currentPage === totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
