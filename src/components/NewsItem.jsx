import React, { useState } from 'react';
import { sampleDescriptiopn } from '../data';

function NewsItem({ title, description, imageUrl, newsUrl }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const maxLength = 150; // Maximum characters to display initially
  description =( description ? description : sampleDescriptiopn)
  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription = description.length > maxLength ? description.substring(0, maxLength) + "..." : description;

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex-1">
        <img
          src={!imageUrl ? "https://images.moneycontrol.com/static-mcnews/2021/06/2021-06-10T144821Z_1_LYNXNPEH590RY_RTROPTP_4_IMF-WORLDBANK-OUTLOOK-653x435.jpg" : imageUrl}
          className="w-full h-56 object-cover"
          alt="News"
        />
        <div className="p-4 flex flex-col h-full justify-between">
          <h5 className="text-xl font-bold mb-2">{title}</h5>
          <p className="text-gray-700 mb-4 flex-1">
            {showFullDescription ? description : truncatedDescription}
            {!showFullDescription && description.length > maxLength &&
              <button
                onClick={handleToggleDescription}
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                Show More
              </button>
            }

            <br/>
            <br/>

          <a
            href={newsUrl}
            rel="noreferrer"
            target="_blank"
            className="bg-gray-800 pt-[30px] text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-300"
          >
            Read More
          </a>
          </p>


        </div>
      </div>
    </div>
  );
}

export default NewsItem;
