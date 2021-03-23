export const PaginationWrapper = ({ children, currentPage, handleFirstPage, handleLastPage, onPreviousClick, onNextClick, totalPages }) => {
    const handlePrevClick = () => {
        if (currentPage - 1 > 0) {
            onPreviousClick && onPreviousClick(currentPage - 1);
        }
    }

    const handleNextClick = () => {
        if (currentPage + 1 <= totalPages) {
            onNextClick && onNextClick(currentPage + 1);
        }
    }

    const handleFirstPageClick = () => {
        handleFirstPage && handleFirstPage(1);
    }

    const handleLastPageClick = () => {
        handleLastPage && handleLastPage(totalPages);
    }

    return (
        <div>
            <div>
                <button disabled={currentPage === 1} onClick={handleFirstPageClick}>first page</button>
                <button disabled={currentPage - 1 === 0} onClick={handlePrevClick}>prev page</button>
                <span>{currentPage} of {totalPages}</span>
                <button disabled={currentPage + 1 > totalPages} onClick={handleNextClick}>next page</button>
                <button disabled={currentPage === totalPages} onClick={handleLastPageClick}>last page</button>
            </div>
            {children}
        </div>
    )
}

