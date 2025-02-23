const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY;
const page = 1;

export const imgGenerator = async (query) => {
    if (!query) return;

    query = query.replace(/\bundefined\b/g, "");

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}&per_page=12`;
    const res = await fetch(url);
    const data = await res.json();

    const randomNum = Math.floor(Math.random() * data.results.length);
    if (data.results.length > 0) {
        const results = data.results[randomNum]?.urls.regular;
        return results;
    }
    return null;
}
