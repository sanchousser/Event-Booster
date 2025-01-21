export function renderPagination(totalPages, currentPage, onPageClick) {
    const paginationList = document.querySelector('.pagination__list');

    paginationList.innerHTML = '';

    const paginationBtns = getPaginationBtns(totalPages, currentPage);


    const buttonsMarkUp = paginationBtns.map(page => {
        if (page === '...') {
            return `<li class="pagination__list__item">
                <span class="pagination__dots">...</span>
            </li>`;
        }

        return ` <li class="pagination__list__item">
                <button class="pagination__list__button ${page === currentPage ? 'active' : ''}" data-page=${page}>${page+1}</button>
            </li>`
    }).join('');

    paginationList.insertAdjacentHTML('beforeend', buttonsMarkUp);

    paginationList.addEventListener('click', onPaginationClick)

    function onPaginationClick(e) {
        if(e.target.tagName !== 'BUTTON') return;
        const newPage = Number(e.target.dataset.page);
        if(newPage === currentPage) return;
        onPageClick(newPage);
    }

}

function getPaginationBtns(totalPages, currentPage) {
    const buttons = [];
    const maxVisibleButtons = 5;

    if (totalPages <= maxVisibleButtons) {
        for (let i = 0; i < totalPages; i++) {
            buttons.push(i)
        }
    } else {
        if (currentPage > 1) buttons.push(0)
        if (currentPage > 2) buttons.push('...')

        const start = Math.max(0, currentPage - 1);
        const end = Math.min(totalPages, currentPage + 2);

        for (let i = start; i < end; i++) {
            buttons.push(i)
        }


        if (currentPage < totalPages - 3) buttons.push('...')
        if (currentPage < totalPages - 1) buttons.push(totalPages - 1)
    }

    return buttons;
}