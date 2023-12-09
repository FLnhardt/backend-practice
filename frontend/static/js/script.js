console.log('loaded')

const formComponent = document.querySelector ("#root") => `
<form>
    <input type="text" name="name" placeholder="enter password"></input>
    <input type="password" name="password" placeholder="enter pasword"></input>
    <button type="button"></button>
</form>
`

rootElement.insertAdjacentHTML(beforeend, formComponent)

const formEelment = document.querySelector('form')
formEelment.addEventListener('submit', (event) => {
    event.preventDefault()

    const userName = document.querySelector(`input[name="name"]`)

    const userPasswort = document.querySelector(`input[name="password"]`).value

   fetch('/users/new-user', {
    method: 'POST', 
    headers: {
        'Content-Type' : 'application/json'
    }, 
    body: JSON.stringify({
        name: userName, 
        password: userPasswort
    })
   })
   .then(res => res.json())
   .then(resJson => console.log(resJson))
})