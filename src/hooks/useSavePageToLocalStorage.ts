import { useNavigate } from 'react-router-dom';
import { useAppSelector } from './index';

export default function useSavePageToLocalStorage() {
  const page = useAppSelector((state) => state.textbook.page);
  const navigate = useNavigate();

  const savePageAndGoToGamePage = (value:string) => {
    localStorage.setItem('pageForGame', JSON.stringify(page));
    navigate(`${value}`);
  };
  return { savePageAndGoToGamePage };
}
