//loading data from the api
const loadDataHandler = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const dataInfo = data.data;
  showCategory(dataInfo);
};
// Showing Tab name according to the api object dynamically
const showCategory = (dataInfo) => {
  const tabContainer = document.getElementById("tab-container");
  dataInfo.forEach((category) => {
    // console.log(category);
    const div = document.createElement("div");
    div.innerHTML = `
        
        <a onclick="findContentHandler('${category.category_id}')" class="tab font-semibold">${category.category}</a>
        `;
    tabContainer.appendChild(div);
  });
};
// Loading videos when the any video category is clicked
const findContentHandler = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  const arrayOfVideos = data.data;
  loadVideoContentHandler(arrayOfVideos);
};

const loadVideoContentHandler = (arrayOfVideos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.textContent = "";
  arrayOfVideos.forEach((element) => {
    const authorsInfo = element.authors[0];
    let viewsInSecond = parseFloat(element.others.posted_date);
    viewsInSecond = secondsToHoursMinute(viewsInSecond);
    const verifiedCheck = authorsInfo?.verified;
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="flex justify-center items-center">
            <div class="max-w-md rounded-lg overflow-hidden shadow-lg bg-white">
              <div class="relative">
                <img src="${
                  element.thumbnail
                }" alt="Video Thumbnail" class="w-full h-48 object-cover">
                <span class="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded opacity-75">${
                  viewsInSecond ? viewsInSecond : ""
                }</span>
              </div>
              <div class="p-4">
                <div class="flex items-center">
                  <img src="${
                    authorsInfo?.profile_picture
                  }" alt="Author Profile" class="w-10 h-10 rounded-full">
                  <div class="ml-2">
                    <h2 class="text-xl font-semibold">${element.title}</h2>
                    <div class="flex items-center mt-1 gap-2">
                    <p class="text-gray-600">${authorsInfo.profile_name}</p>
                    <div id="verifiedBadge" >${verifiedCheck}</div>
                    </div>
                    <p class="text-gray-500">${element.others.views}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
            `;

    videoContainer.appendChild(div);
  });
};
/* Function for show How many times ago the video was posted converting the 
seconds into Hours and Minutes  */
function secondsToHoursMinute(seconds) {
  if (isNaN(seconds)) {
    return;
  } else {
    const hr = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);

    return `${hr} hrs ${min} min ago`;
  }
}




// calling load data function
loadDataHandler();
