import { Book } from '../types/book';

interface FetchBookResponse {
    books: Book[];
    totalNumBooks: number;
}

const API_URL = 'https://bookstore-tate-backend.azurewebsites.net/Book';

export const fetchBooks = async (
    pageSize: number, 
    pageNumber: number,
    ascending: boolean, 
    selectedCategories: string[]
): Promise<FetchBookResponse> => {

    try{
        const categoryParams = selectedCategories
        .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
        .join('&');

        const response = await fetch(
            `${API_URL}?pageSize=${pageSize}&pageNumber=${pageNumber}&ascending=${ascending}${selectedCategories.length ? `&${categoryParams}` : ''}`
        );
    if (!response.ok) {
        throw new Error('Failed to fetch books');
    }
        return await response.json();
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    };

    export const addBook = async (newBook: Book): Promise<Book> => {
        try {
            const response = await fetch(`${API_URL}/AddBook`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                }, 
                body: JSON.stringify(newBook)
            });
            if (!response.ok) {
                throw new Error("Failed to add book");
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding book', error);
            throw error;
        }
    }; 
    
    export const updateBook = async (
        bookID: number,
        updateBook: Book, 
    ) : Promise<Book> => {
        try {
            const response = await fetch (`${API_URL}/UpdateBook/${bookID}`,  {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(updateBook), 
            });
    
            return await response.json();
        } catch (error) {
            console.error('Error updating book:', error);
            throw error;
        }
    }; 
    
    export const deleteBook = async (bookID: number): Promise<void> => {
        try {
            const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, 
                {
                    method: 'DELETE'
                }
            );
    
            if (!response.ok) {
                throw new Error("Failed to delete book"); 
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            throw error;
        }
    };