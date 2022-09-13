import { IAggregated, IAggregatedResponse } from '~/models/IAggregated';
import { IWord } from '~/models/IWord';
import { getAggregatedWordsForGame, getWordsOnPage } from '~/utils/aggregatedWordsFunc';

export default async function generateArrayGameFunc(
  userId: string,
  group: string,
  page: string,
) {
  let learnedWords: IAggregated[] = [];
  let pageWords: IWord[] = [];
  async function generateArrayGame(page1: string): Promise<IWord[]> {
    let resultArr: IWord[] = [];
    let pageNumber = page1 as unknown as number;
    const filter = `{"$and":[{"userWord.optional.page":${pageNumber}, "userWord.optional.learned":true}]}`;
    const aggregated = (await getAggregatedWordsForGame(userId, filter, group, '20'));
    const aggreg: IAggregatedResponse[] = aggregated as IAggregatedResponse[];
    learnedWords = learnedWords.concat(aggreg[0].paginatedResults);
    const getWords = (await getWordsOnPage(group, page1));
    pageWords = pageWords.concat(getWords as IWord[]);
    if (learnedWords.length === 0) {
      return pageWords;
    }
    resultArr = pageWords.filter((x) => !learnedWords.some(
      (y) => x.word === y.word,
    ));
    if (resultArr.length < 10) {
      if (pageNumber.toString() !== '0') {
        pageNumber -= 1;
        return (generateArrayGame(pageNumber.toString()));
      }
      return resultArr;
    }
    return resultArr;
  }
  const words = (await generateArrayGame(page));
  return words;
}
