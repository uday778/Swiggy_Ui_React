import { useState, useEffect } from 'react';

const ImageFetcher = () => {
  const [imageIds, setImageIds] = useState([]);
//   const [value, setValue] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(
          "https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=28.5355161&lng=77.3910265&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );

        const response = await data.json();
        console.log(response); // Make sure data is logged and structured as expected

        const cards = response.data.cards; // Access cards
        const ids = cards.flatMap(card => 
          card.card.card.imageGridCards?.info?.map(info => info.imageId) || []
        ); // Extract imageIds and handle missing properties with optional chaining
        
        console.log("Extracted Image IDs:", ids); // Log the imageIds to verify

        setImageIds(ids); // Update the state with extracted imageIds
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []); // Empty dependency array means this runs only once when the component mounts

  return (
    <div>
      <h1>Image IDs</h1>
      <ul>
        {imageIds.map((id, index) => (
          <li key={index}>{id}</li>
        ))}
      </ul>
    </div>
  );
};

export default ImageFetcher;
