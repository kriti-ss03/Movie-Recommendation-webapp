const makeSwipe = () => {
    const conainter = [...document.querySelectorAll('.movie-container')];
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
    const preBtn = [...document.querySelectorAll('.pre-btn')];

    
    conainter.forEach((item, i) => {
        
        //TO GET CONTAINER'S DIMENSION
        let containerSize = item.getBoundingClientRect();
        let containerWidth = containerSize.width;
        
        //INDIVIDUAL BUTTONS' EVENT LISTENER
        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })
    })
}