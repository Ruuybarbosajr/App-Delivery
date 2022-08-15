import removeItem from './removeItem';

export default function addItem(arr, id, object) {
  return [...removeItem(arr, id), object];
}
