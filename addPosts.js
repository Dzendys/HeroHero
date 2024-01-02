function loadThumbnail(videoContainer, animatedSrc, stationarySrc) {
    const thumbnail = new Image();
    thumbnail.src = animatedSrc;
  
    thumbnail.onload = function () {
      videoContainer.poster = animatedSrc;
    };
  
    thumbnail.onerror = function () {
      videoContainer.poster = stationarySrc;
    };
  }
  
  fetch(
    "https://raw.githubusercontent.com/Dzendys/HeroHero/main/KONTROVERZN%C3%8D.json",
  )
    .then((response) => response.json())
    .then((data) => {
      const postsContainer = document.querySelector(".feed");
  
      data.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.id = post.id;
  
        let videosHTML = "";
        if (post.videos && post.videos.length > 0) {
          videosHTML = post.videos
            .map(
              (video) => `
              <div class="video-container">
                <video class="video-js vjs-16-9" controls preload="auto" data-setup="{}">
                  <source src="${video}" type="application/x-mpegURL" />
                </video>
              </div>
            `,
            )
            .join("");
        }
  
        let imagesHTML = "";
        if (post.images && post.images.length > 0) {
          imagesHTML = post.images
            .map(
              (image) => `
              <div class="image-container">
                <img class="image-js" src="${image}">
              </div>
            `,
            )
            .join("");
        }
  
        const dateHTML = `<p>${post.date}</p>`;
        const descriptionHTML = `<h1>${post.description.replace(
          /\n/g,
          "<br>",
        )}</h1>`;

        postDiv.innerHTML = videosHTML + imagesHTML + descriptionHTML + dateHTML;
        if (videosHTML === "" && imagesHTML === "") {
          postDiv.innerHTML = "<p></p>" + postDiv.innerHTML; 
        }
        postsContainer.appendChild(postDiv);
  
        const videoContainers = postDiv.querySelectorAll(".video-container");
        videoContainers.forEach((container, index) => {
          const animatedThumbnail = post.thumbnails[0];
          const stationaryThumbnail = post.thumbnails[1];
  
          if (index === 0 && animatedThumbnail) {
            const video = container.querySelector("video");
            loadThumbnail(video, animatedThumbnail, stationaryThumbnail);
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  
