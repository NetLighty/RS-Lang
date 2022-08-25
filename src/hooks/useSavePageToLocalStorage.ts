import { useAppSelector } from './index';

export default function useSavePageToLocalStorage() {
  const page = useAppSelector((state) => state.textbook.page);
  const group = useAppSelector((state) => state.textbook.group);
  const savePageToLocalStore = () => {
    localStorage.setItem('bookGroup', JSON.stringify(group));
    localStorage.setItem('bookPage', JSON.stringify(page));
  };
  return { savePageToLocalStore };
}
