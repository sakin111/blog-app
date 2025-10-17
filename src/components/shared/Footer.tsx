

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
 <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          

          <div>
            <h2 className="text-2xl font-bold mb-4">Blogs</h2>
            <p className="text-gray-400">
              Sharing insights, ideas, and knowledge. Stay updated with the latest trends in tech, health, and lifestyle.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>


          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300 transition">Home</a></li>
              <li><a href="#" className="hover:text-gray-300 transition">About</a></li>
              <li><a href="#" className="hover:text-gray-300 transition">Categories</a></li>
              <li><a href="#" className="hover:text-gray-300 transition">Blog</a></li>
              <li><a href="#" className="hover:text-gray-300 transition">Contact</a></li>
            </ul>
          </div>

          {/* Popular Tags */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {["Technology", "Health", "Lifestyle", "Programming", "Travel"].map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

       <div>
        <h1 className="text-2xl">BookMark</h1>
        <p className="text-sm text-gray-100 my-6">book mark our site to stay updated and free to explore the new  thoughts unheard stories</p>
       </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
          © {currentYear} Blogs. All rights reserved.
        </div>
      </div>
    </footer>

  );
}