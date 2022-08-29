import { IAggregated } from '~/models/IAggregated';

export default function removeDuplicates(array: IAggregated[]) {
  const result: IAggregated[] = array.filter(
    (v, i, a) => a.findIndex((t) => (t.userWord.optional?.id === v.userWord.optional?.id)) === i,
  );
  return result;
}
