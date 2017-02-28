
const invertedIndex = new InvertedIndex();
const testData = [
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
];


describe('Inverted Index Test', () => {
  describe('It returns the right index', () => {
    it('it should return the right index for an array of files',
     () => {
       expect(invertedIndex.getSelectedIndex(['book1.json', 'book2.json', 'book3.json'], 'book2.json')).toBe(1);
     });
  });
});
