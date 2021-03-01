document.addEventListener('DOMContentLoaded', () => {
  const btnRules = document.querySelector('.btn-rules')
  const scoreCount = document.querySelector('.header-score__count')
  const modal = document.querySelector('.modal')
  const popup = document.querySelector('.popup')
  const btnClose = document.querySelector('.btn-close')
  const btns = document.querySelectorAll('.btn-circle')
  const main = document.querySelector('.main')
  const selection = document.querySelector('.selection')
  const btnRefresh = document.querySelector('.btn-refresh')
  const result = document.querySelector('#result')
  const userSelect = document.querySelector('#user')
  const pcSelect = document.querySelector('#pc')
  const pickBns = document.querySelectorAll('.pick')
  
  const choice = ['paper', 'rock', 'scissors']
  let userChoice = null
  
  
  let score = +localStorage.getItem('score') || 0
  scoreCount.innerText = score.toString()
  
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      userChoice = btn.dataset.choice
      selection.style.display = 'flex'
      main.style.display = 'none'
      checkWinner()
      pickBns.forEach(el => {
        el.setAttribute("disabled", "disabled")
      })
    })
  })
  
  const updateSelect = (el, choice) => {
    el.classList.remove('btn-rock')
    el.classList.remove('btn-scissors')
    el.classList.remove('btn-rock')

    el.classList.add(`btn-${choice}`)
    el.querySelector('img').src = `../images/icon-${choice}.svg`
  }

  const checkWinner = () => {
    const pcChoice = randomChoice()
    
    updateSelect(userSelect, userChoice)
    updateSelect(pcSelect, pcChoice)

    if (userChoice === 'paper' && pcChoice === 'rock' || userChoice === 'rock' && pcChoice === 'scissors' ||
    userChoice === 'scissors' && pcChoice === 'paper') {
      updateScore(1)
      result.innerText = 'You win'
    } else if (userChoice === pcChoice) {
      result.innerText = 'Tie'
    } else {
      updateScore(-1)
      result.innerText = ' You loose'
    }
  }
  
  const updateScore = val => {
    score += val
    localStorage.setItem('score', score.toString())
    scoreCount.innerText = score
  }

  btnRefresh.addEventListener('click', () => {
    selection.style.display = 'none'
    main.style.display = 'flex'
    pickBns.forEach(el => {
        el.removeAttribute("disabled")
      })
  })
  btnRules.addEventListener('click', () => {
    modal.style.display = 'flex'
    popup.style.display = 'block'
    btnRules.style.opacity = '.5'
    btnRules.style.userSelect = 'none'
    
  })
  btnClose.addEventListener('click', () => {
    modal.style.display = 'none'
    popup.style.display = 'none'
    btnRules.style.opacity = '1'
    btnRules.style.userSelect = 'auto'
   
  })

  const randomChoice = () => choice[Math.floor(Math.random() * choice.length)]
})