import { useEffect, useState } from 'react';
import { Book } from './types/book'

export function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNum] = useState<number>(1);
    const [totalBooks, setTotalBooks] = useState<number>(0);
    const [ascending, setAscending] = useState<boolean>(true); // default true 
    

    // Fetch all books by making multiple API calls if needed
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(`https://localhost:5000/Book?pageSize=${pageSize}&pageNumber=${pageNumber}&ascending=${ascending}`);
            const data = await response.json();
            
            setBooks(data.books);
            setTotalBooks(data.totalNumBooks);
        };  

        fetchBooks();
    }, [pageSize, pageNumber, ascending]);

    const toggleSort = () => {
        setAscending(!ascending);
        setPageNum(1);
    };


    const totalPages = Math.ceil(totalBooks / pageSize);

    return (
        <>
            <h1>Book List</h1>
            <br />
            <button onClick={toggleSort}>
                Sort by Title {ascending ? '(A-Z)' : '(Z-A)'}
            </button>
            <br />
            <br />
            {books.map((b) => (
                <div id="bookCard" className="card mb-3" key={b.bookID}>
                    <h3 className="card-title">{b.title}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li>
                                <strong>Author:</strong> 
                                {b.author}
                            </li>
                            <li>
                                <strong>Publisher:</strong> 
                                {b.publisher} 
                            </li>
                            <li>
                                <strong>ISBN:</strong> 
                                {b.isbn} 
                            </li>
                            <li>
                                <strong>Classification/Category:</strong> 
                                {b.classification}/{b.category}
                            </li>
                            <li>
                                <strong>Number of Pages:</strong> 
                                {b.pageCount}
                            </li>
                            <li>
                                <strong>Price: </strong>
                                {b.price}
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
            

            <button disabled={pageNumber === 1} onClick={() => setPageNum(pageNumber - 1)}>Previous</button>

            {[...Array(totalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => setPageNum(i + 1)} disabled={pageNumber === i + 1}>
                    {i + 1}
                </button>
            ))}

            <button disabled={pageNumber === totalPages} onClick={() => setPageNum(pageNumber + 1)}>Next</button>
            
            <br />
            <label>
                Results per page: 
                <select 
                    value={pageSize} 
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPageNum(1);
                    }} >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </label>
        </>
    );
    }