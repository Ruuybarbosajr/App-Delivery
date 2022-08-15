export default function removeItem(arr, id) {
  return arr.filter((element) => element.id !== id);
}
