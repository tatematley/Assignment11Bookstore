import bookShelfImage from '../images/Bookshelf.jpg';

function WelcomeBand() {
    return (
        <div 
            className="position-relative text-white text-center" 
            style={{ 
                height: '200px', 
                backgroundImage: `url(${bookShelfImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
            }}
        >
            {/* Overlay for readability */}
            <div className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <h1 className="fw-bold">Book List</h1>
            </div>
       </div>
    );   
}

export default WelcomeBand;
