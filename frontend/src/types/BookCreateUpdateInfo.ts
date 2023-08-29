interface BookCreateUpdateInfo {
  title: string;
  isbn: string;
  description: string;
  publishedDate: string;
  authorIds: string[];
  quantity: number;
}
export default BookCreateUpdateInfo;
