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

const loadVideoContentHandler = (arrayOfVideos) =>{
  const videoContainer = document.getElementById("video-container");
  videoContainer.textContent="";
    arrayOfVideos.forEach((element) => {
        const authorsInfo = element.authors[0];
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="flex justify-center items-center gap-5">
            <div class="max-w-md rounded-lg overflow-hidden shadow-lg bg-white">
              <div class="relative">
                <img src="${element.thumbnail}" alt="Video Thumbnail" class="w-full h-48 object-cover">
                <span class="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded opacity-75">10:25</span>
              </div>
              <div class="p-4">
                <div class="flex items-center">
                  <img src="${authorsInfo?.profile_picture}" alt="Author Profile" class="w-10 h-10 rounded-full">
                  <div class="ml-2">
                    <h2 class="text-xl font-semibold">${element.title}</h2>
                    <div class="flex items-center mt-1">
                    <p class="text-gray-600">${authorsInfo.profile_name}</p>
                    <span class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M7.7094 1.20637L4.14065 4.77512L2.29065 2.92668C1.88909 2.52512 1.23752 2.52512 0.835962 2.92668C0.434399 3.32824 0.434399 3.97981 0.835962 4.38137L3.43127 6.97668C3.8219 7.36731 4.45627 7.36731 4.8469 6.97668L9.16253 2.66106C9.56409 2.25949 9.56409 1.60793 9.16253 1.20637C8.76096 0.804807 8.11096 0.804807 7.7094 1.20637Z" fill="#FFFCEE"/>
                    </svg>

                    </span>
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

}





// calling load data function
loadDataHandler();
