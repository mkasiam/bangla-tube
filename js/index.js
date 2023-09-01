//loading categories data from the api
const loadDataHandler = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const dataInfo = data.data;
  // calling showCategory function for getting tab name
  showCategory(dataInfo);
};
// Showing Tab name according to the api object dynamically
const showCategory = (dataInfo) => {
  const tabContainer = document.getElementById("tab-container");
  dataInfo.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <a onclick="findContentHandler('${category.category_id}')" id="${category.category_id}" class="tab font-semibold">${category.category}</a>
        `;
    tabContainer.appendChild(div);
  });
};
// Loading videos when the any video category is clicked
const findContentHandler = async (categoryId="1000") => {
  //fetching data according to the categoryId
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  const arrayOfVideos = data?.data;
  //calling loadVideoContentHandler() function to show the video
  loadVideoContentHandler(arrayOfVideos);
  //calling setActiveTab() function and passing id so that I can show active tab
  setActiveTab(categoryId);
};

const loadVideoContentHandler = (arrayOfVideos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.textContent = "";
  //Condition if length of array is zero
  if(arrayOfVideos.length === 0){
    const div = document.createElement("div");
    div.classList.add("col-span-4");
    div.innerHTML=`
    <div
      class=" flex flex-col justify-center items-center text-center mt-5 md:mt-10 lg:mt-18"
    >
      <div><img src="./Images/Icon.png" alt="" /></div>
      <div>
        <h1 class="text-xl md:text-2xl lg:text-4xl text-center font-semibold">
          Oops!! Sorry, There is no <br />
          content here
        </h1>
      </div>
    </div>
    `
    videoContainer.appendChild(div);

  }
  else{
    arrayOfVideos.forEach((element) => {
      const authorsInfo = element.authors[0];
      // getting initial postedDateInSeconds
      let postedDateInSeconds = parseFloat(element.others.posted_date);
      // updating the postedDateInSeconds according to the function
      postedDateInSeconds = secondsToHoursMinute(postedDateInSeconds);
      //declaring verifiedCheck
      const verifiedCheck = authorsInfo?.verified;
      const div = document.createElement("div");
      div.classList.add("m-2","cursor-pointer");
      div.innerHTML = `
              <div class="flex justify-center items-center">
              <div class="max-w-md rounded-lg overflow-hidden shadow-lg bg-white">
                <div class="relative">
                  <img src="${
                    element.thumbnail
                  }" alt="Video Thumbnail" class="w-full h-48 object-cover">
                  ${postedDateInSeconds ? 
                    `<span class="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded opacity-75">${postedDateInSeconds}</span>` 
                    : ''
                  }
                </div>
                <div class="p-4">
                  <div class="flex items-center">
                    <img src="${
                      authorsInfo?.profile_picture
                    }" alt="Author Profile" class="w-10 h-10 rounded-full">
                    <div class="ml-2">
                      <h2 class="text-lg md:text-lg lg:text-xl font-semibold">${element.title}</h2>
                      <div class="flex items-center mt-1 gap-2">
                      <p class="text-lg text-gray-600">${authorsInfo.profile_name}</p>
                      <div>
                      ${verifiedCheck === true ? '<div><img class="badge-img" src="./Images/blue-badge.png"/></div>' : ''}
                      </div>
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
};
/* Function for show How many times ago the video was posted , converting the 
seconds into Hours and Minutes  */
function secondsToHoursMinute(seconds) {
  // setting condition if seconds is NaN , if it's true than return
  if (isNaN(seconds)) {
    return;
  }
   else {
    const hr = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);

    return `${hr} hrs ${min} min ago`;
  }
}
// Function for loading default content for id="1000"
const loadDefaultVideoContent = async () => {
  await findContentHandler(); 
};
// Calling loadDefaultVideoContent() function
loadDefaultVideoContent();


// function for sorting videos according to their views
const sortVideosByViews = () => {
  const videoContainer = document.getElementById("video-container");
  const videos = Array.from(videoContainer.children); // Converting the videos to an array for sorting

  videos.sort((a, b) => {
    // Extracting the view 
    const viewCountA = parseInt(a.querySelector(".text-gray-500").textContent, 10);
    const viewCountB = parseInt(b.querySelector(".text-gray-500").textContent, 10);

    // Comparing the views in descending order
    return viewCountB - viewCountA;
  });

  // Reattach sorted videos to the video container
  videos.forEach((video) => {
    videoContainer.appendChild(video);
  });
};

// Add click event listener to the "Sort by view" button
const sortButton = document.getElementById("sort-by-view");
sortButton.addEventListener("click", sortVideosByViews);



// Add an active class to the clicked tab , and remove it from other tabs
const setActiveTab = (tabId) => {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach((tab) => {
    if (tab.id === tabId) {
      tab.classList.add('active-tab');
    } else {
      tab.classList.remove('active-tab');
    }
  });
};


const blogButton = document.getElementById("blog-btn");

// Add a click event listener to the button
blogButton.addEventListener("click", function () {
  window.open("blog.html", "_blank");
});

// calling load data function for loading categories data
loadDataHandler();
