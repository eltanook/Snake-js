document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')
  
    const width = 10
    let currentIndex = 0 
    let appleIndex = 0 
    let currentSnake = [2,1,0] 
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0
  
  
    //para iniciar / reiniciar el juego.
    function startGame() {
      currentSnake.forEach(index => squares[index].classList.remove('snake'))
      squares[appleIndex].classList.remove('apple')
      clearInterval(interval)
      score = 0
      randomApple()
      direction = 1
      scoreDisplay.innerText = score
      intervalTime = 1000
      currentSnake = [2,1,0]
      currentIndex = 0
      currentSnake.forEach(index => squares[index].classList.add('snake'))
      interval = setInterval(moveOutcomes, intervalTime)
    }
  
  
    function moveOutcomes() {
  
      if (
        (currentSnake[0] + width >= (width * width) && direction === width ) || //si toca abajo
        (currentSnake[0] % width === width -1 && direction === 1) || //si toca a la derecha
        (currentSnake[0] % width === 0 && direction === -1) || //si toca a la izquierda
        (currentSnake[0] - width < 0 && direction === -width) ||  //si toca arriba
        squares[currentSnake[0] + direction].classList.contains('snake') //si se toca a ella misma
      ) {
        return (clearInterval(interval) + alert("Game over :("));
         //para cuando perdes
        
      }
  
      const tail = currentSnake.pop() 
      squares[tail].classList.remove('snake')  
      currentSnake.unshift(currentSnake[0] + direction) 
  
      //mecanismo de la alimentacion de la snake
      if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
      }
      squares[currentSnake[0]].classList.add('snake')
    }
  
  
    //generacion de la comida
    function randomApple() {
      do{
        appleIndex = Math.floor(Math.random() * squares.length)
      } 
      while(squares[appleIndex].classList.contains('snake'))
      squares[appleIndex].classList.add('apple')
    }
  
  
    //funciones de las teclas
    function control(e) {
      squares[currentIndex].classList.remove('snake')
  
      if(e.keyCode === 39) {
        direction = 1 //flecha de la derecha
      } else if (e.keyCode === 38) {
        direction = -width // flecha de arriba
      } else if (e.keyCode === 37) {
        direction = -1 //flecha de la izquierda
      } else if (e.keyCode === 40) {
        direction = +width //flecha de abajo
      }
    }
  
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
  })