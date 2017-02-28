class InvertedIndex {
	// 1. check if json file is Invalid.
	// 2. check if file name already exists 
	// 3. create index of file(book)
	      // -- get selected index of book
		  // -- get the content of the selected book
		  // -- check if content is valid

	getSelectedIndex(booknames_arr, book_name) {
		return booknames_arr.indexOf(book_name);
	}

	generateToken(text) {
		return text.toLowerCase()
		.replace(/[^\w\s]|_/g, '')
		.split(/\s+/);
  	}

	removeDuplicateWords(words_arr) {
		let new_arr = [];
		for(let i = 0; i < words_arr.length; i++) {
			if(words_arr.lastIndexOf(words_arr[i]) == i){
			new_arr.push(words_arr[i]);
			}
		}
		return new_arr;
	}

	getAllWords(books) {
		// books is an array of objects that contain each book with their title and text.
		// This method returns an array that contains all the words in the book without duplication

		let words = "";
		for(let i = 0; i < books.length; i++) {
			words +=   books[i]['title'] + " " + books[i]['text'] + " ";
		}
		//console.log(words);
		words = this.generateToken(words).slice(0, words.length-1);
		words = this.removeDuplicateWords(words);

		return words
	}
	
	getTitlesOfEachBook(books) {
		let titles = [];
		for(let i = 0; i < books.length; i++) {
			titles.push(books[i]['title']);
		}
		return titles;
	}

	getAllWordsInEachBook(books) {
		let doc = [];
		let bookContent;
		for(let i = 0; i < books.length; i++) {
			bookContent = books[i]['title'] + " " + books[i]['text'] + " ";
			bookContent = this.generateToken(bookContent);
			bookContent = this.removeDuplicateWords(bookContent);
			doc.push(bookContent);
		}
		return doc;
	}

	checkOccurenceOfWords(words_arr, doc_arr) {
		// words_arr contains all the words in the book without duplication
		// doc_arr contains all the  words in a given document
		var checked = [];

		words_arr.forEach((word) => {
			for(let i = 0; i < doc_arr.length; i++) {
				if(doc_arr[i].indexOf(word) === -1){
					checked.push(false);
				}else {
					checked.push(true);
				}
			}
		});
		return checked;
	}

	getWordOccurenceForEachBooks(arr, size) {
		let new_arr = [];
		let stop = Math.ceil(arr.length / size);

		for(let i = 0; i <= stop; i++) {
			let startRange = i * size;
			let endRange = (i + 1) * size;

			if(endRange < arr.length) {
				new_arr.push(arr.slice(startRange, endRange));
			}

		}
		return new_arr;
	}

	mapWordsWithOccurence(words_arr, words_occur) {
		for(let i = 0; i < words_arr.length; i++) {
			words_occur[i].unshift(words_arr[i]);
		}
		return words_occur;
	}

	createIndex(books) {
		let words_arr = this.getAllWords(books);
		let books_arr = this.getAllWordsInEachBook(books);
		let titles_arr = this.getTitlesOfEachBook(books);
		let books_length = titles_arr.length;
		let checked = this.checkOccurenceOfWords(words_arr, books_arr);
		let bookschecked_arr = this.getWordOccurenceForEachBooks(checked, books_length);

		words_arr = words_arr.slice(0, words_arr.length-1);
		let wordWIthMatch = this.mapWordsWithOccurence(words_arr, bookschecked_arr);

		let indexTable = {
			'words': wordWIthMatch,
			'title': titles_arr,
		}
		return indexTable;


		//console.log(words_arr);
		//console.log(wordWIthMatch);
		//console.log(bookschecked_arr);;
	}


}