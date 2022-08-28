import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index-reducers';
import SETTINGS from '~/utils/settings';
import { addCurrentPage } from '../../store/textbook.actions';
import PaginationButton from './paginationButton';

const Pagination = () => {
  const dispatch = useDispatch();
  const pageText = useSelector((state: RootState) => state.textbook.page + 1);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [lastDisabled, setLastDisabled] = useState(false);

  function setPage(event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) {
    const target = event.target as HTMLButtonElement;
    if (target.classList.contains('book__pagination__button')) {
      switch (target.dataset.direction) {
        case SETTINGS.FIRST_PAGE:
          dispatch(addCurrentPage(0));
          localStorage.setItem('bookPage', JSON.stringify(0));
          break;
        case SETTINGS.LAST_PAGE:
          dispatch(addCurrentPage(SETTINGS.PAGES - 1));
          localStorage.setItem('bookPage', JSON.stringify(SETTINGS.PAGES - 1));
          break;
        case SETTINGS.PREVIOUS_PAGE:
          dispatch(addCurrentPage(pageText - 2));
          localStorage.setItem('bookPage', JSON.stringify(pageText - 2));
          break;
        case SETTINGS.NEXT_PAGE:
          dispatch(addCurrentPage(pageText));
          localStorage.setItem('bookPage', JSON.stringify(pageText));
          break;
        default:
          break;
      }
    }
  }

  useEffect(() => {
    if (pageText === 1) {
      setPrevDisabled(true);
      setLastDisabled(false);
    } else if (pageText === SETTINGS.PAGES) {
      setLastDisabled(true);
      setPrevDisabled(false);
    } else {
      setPrevDisabled(false);
      setLastDisabled(false);
    }
  }, [pageText]);

  return (
    <div className="book__pagination" onClick={setPage} onKeyDown={setPage} role="presentation">
      <PaginationButton text="<<" direction={SETTINGS.FIRST_PAGE} disabledValue={prevDisabled} />
      <PaginationButton text="<" direction={SETTINGS.PREVIOUS_PAGE} disabledValue={prevDisabled} />
      <PaginationButton text={pageText.toString()} direction={SETTINGS.CURRENT_PAGE} />
      <PaginationButton text=">" direction={SETTINGS.NEXT_PAGE} disabledValue={lastDisabled} />
      <PaginationButton text=">>" direction={SETTINGS.LAST_PAGE} disabledValue={lastDisabled} />
    </div>
  );
};

export default Pagination;
