document.addEventListener('DOMContentLoaded', function () {
    const getData = document.querySelector('#btn-info')
    const cardContainer = document.querySelector('#container')
    let isShowing = false

    getData.addEventListener('click', () => {
        if (!isShowing) {
            getData.textContent = 'Скрыть'
            getData.disabled = true

            const xhr = new XMLHttpRequest()
            xhr.open('GET', '../data/persons.json')
            xhr.setRequestHeader('Content-type', 'application/json')
            xhr.send()

            xhr.onload = function () {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText)
                    renderCards(data)
                    getData.disabled = false
                    isShowing = true
                } else {
                    console.error('Ошибка при получении данных')
                    getData.disabled = false
                }
            }

            xhr.onerror = function () {
                console.error('Произошла ошибка запроса')
                getData.disabled = false
            }
        } else {
            getData.textContent = 'Открыть снова'
            cardContainer.innerHTML = ''
            isShowing = false
        }
    })

    function renderCards(data) {
        data.forEach((person) => {
            const personCard = document.createElement('div')
            personCard.classList.add('person-card')

            const avatar = document.createElement('img')
            avatar.classList.add('avatar')
            avatar.src = person.photo

            const nameDiv = document.createElement('div')
            nameDiv.textContent =` Name: ${person.name}`
            personCard.appendChild(avatar)
            personCard.appendChild(nameDiv)

            const ageDiv = document.createElement('div')
            ageDiv.textContent = `Age: ${person.age}`
            personCard.appendChild(ageDiv)

            cardContainer.appendChild(personCard)
        })
    }
})