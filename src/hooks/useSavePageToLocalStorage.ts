import { useDispatch } from 'react-redux';
import { addCurrentGroup, addCurrentPage } from './../store/textbook.actions';
import { useAppSelector } from './index';

export default function useWorkWithPageAndGroup() {
  const page = useAppSelector((state) => state.textbook.page);
  const group = useAppSelector((state) => state.textbook.group);
  const dispatch = useDispatch();
  const savePageToLocalStore = () => {
    localStorage.setItem('bookGroup', JSON.stringify(group));
    localStorage.setItem('bookPage', JSON.stringify(page));
  };

  const resetPageAndGroupOnExit =()=> {
    localStorage.setItem('bookGroup', JSON.stringify(0));
    localStorage.setItem('bookPage', JSON.stringify(0));
    dispatch(addCurrentGroup(0));
    dispatch(addCurrentPage(0));
  }
  return { savePageToLocalStore, resetPageAndGroupOnExit };
}
