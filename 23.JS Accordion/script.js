let accordionItems = document.querySelectorAll('.accordion-item')

accordionItems.forEach((item) => {
  let header = item.querySelector('.accordion-header')
  let content = item.querySelector('.accordion-content')
  let arrow = item.querySelector('.arrow')

  header.addEventListener('click', () => {
    accordionItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove('active')
        otherItem.querySelector('.accordion-content').style.display = "none"
        otherItem.querySelector('.arrow').classList.remove('opened')
      }
    })

    item.classList.toggle('active')
    if (item.classList.contains('active')) {
      content.style.display = 'block'
      arrow.classList.add('opened')
    } else {
      content.style.display = 'none'
      arrow.classList.remove('opened')
    }


  })
})