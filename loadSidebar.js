fetch('https://raw.githubusercontent.com/Dzendys/HeroHero/main/KONTROVERZN%C3%8D.json')
  .then(response => response.json())
  .then(data => {
    const sidebar = document.querySelector('.side-bar');
    data.forEach(post => {
      
      //Creating a side-bar-item
      const sidebarItem = document.createElement('div');
      sidebarItem.classList.add('side-bar-item');

      //Parsing info from json
      const description = post.description;
      const name = description.split('\n')[0];
      const id = post.id;

      //Setting info
      sidebarItem.textContent = name;
      sidebarItem.id = id;
      
      //Appending to side-bar
      sidebar.appendChild(sidebarItem);

      //Click event
      sidebarItem.addEventListener('click', () => {

        //Selection in side-bar
        document.querySelectorAll('.side-bar-item-selected')
          .forEach(Item => {
            Item.classList.remove('side-bar-item-selected');
        });
        sidebarItem.classList.add('side-bar-item-selected');

        //Set up videoplayer
        loadPosts(id);
      });
    });

    //Initial selection and videoplayer set up
    firstSidebarItem = document.querySelector('.side-bar-item').click();
  })
  .catch(error => console.error('Nepodařilo se načíst epizody:', error));