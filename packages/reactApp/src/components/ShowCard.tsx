export const ShowCard = ({
                             title = "The Walking Dead",
                             date = "31-10-2010",
                             rating = "8.092",
                             country = "US",
                             genres = ["Action & Adventure", "Drama"],
                             viewlink = '',
                             imageurl  = "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=500&fit=crop",
                             onView = () => {
                                 document.location.href = viewlink
                             }
                         }) => {
    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg font-sans">
            {/* Image Container */}
            <div className="relative h-96">
                <img
                    src={imageurl}
                    alt={title}
                    className="w-full h-full object-cover"
                />

                {/* Date Badge */}
                <div
                    className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span className="font-semibold">{date}</span>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-12 bg-black bg-opacity-70 p-6">
                    <h2 className="text-white text-4xl font-light m-0">{title}</h2>
                </div>
            </div>

            {/* Info Section */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="2">
                            <path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span className="text-red-500 text-4xl font-bold">{rating}</span>
                    </div>

                    {/* Country */}
                    <div className="flex items-center gap-2">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path
                                d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <span className="text-amber-900 text-4xl font-bold">{country}</span>
                    </div>
                </div>

                {/* Dotted Line */}
                <div className="border-t-2 border-dotted border-gray-300 mb-6"></div>

                {/* View Button */}
                <button
                    onClick={onView}
                    className="w-full max-w-xs mx-auto flex items-center justify-center gap-3 bg-cyan-400 hover:bg-cyan-500 text-white font-bold text-xl py-4 px-8 rounded transition-colors border-0 cursor-pointer"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                    <span>VIEW</span>
                </button>
            </div>


            {/* Side Label */}
            <div
                style={{
                    height: '383px',
                    width: '20px',
                    position: 'absolute',
                    right: ' -5px'
                }}
                className="absolute top-0 right-0 h-full w-12 bg-cyan-400 flex items-center justify-center">
                <div
                    className="transform -rotate-90 whitespace-nowrap text-white font-bold text-lg tracking-widest">
                    {genres.map((genre, index) => (
                        <span key={genre} className={index > 0 ? "ml-16" : ""}>
                {genre}
              </span>
                    ))}
                </div>
            </div>

        </div>
    );
}