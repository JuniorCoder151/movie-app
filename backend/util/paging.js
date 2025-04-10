const paginate = (array, page) => {
  const pageSize = 20; // Number of results per page
  const offset = (page - 1) * pageSize; // Calculate the starting index
  const paginatedArray = array.slice(offset, offset + pageSize); // Slice the array for current page
  const totalPages = Math.ceil(array.length / pageSize); // Calculate total number of pages
  return { results: paginatedArray, page, total_pages: totalPages }; // Return paginated data
};

module.exports = { paginate };
