document.addEventListener("DOMContentLoaded", function(e) {
    const url = 'https://students.netoservices.ru/nestjs-backend/poll'
    let currentPollId = null

    async function loadData(url) {
        try {
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(response.status)
            }

            const data = await response.json()
            console.log(data)

            const { id, data: {title ,answers }} = data
            currentPollId = id

            console.log(answers, title)

            const poll = `
                <div class="poll">
                    <div class="poll__title" id="${id}">
                        ${title}
                    </div>
                    <div class="poll__answers poll__answers_active" id="poll__answers">
                        ${answers.map((answer, index) => `
                            <button class="poll__answer" data-id="${index}">${answer}</button>                        
                        `
                        ).join('')}
                    </div>
                </div>
            `

            document.querySelector('.card').innerHTML = poll

            document.addEventListener('click', function (e) {
                if (e.target.classList.contains('poll__answer')) {
                    e.preventDefault()
                    handleClickSend(e.target)
                }
            })

        } catch (e) {
            console.log(`Ошибка ${e}`)
        }
    }

    async function handleClickSend(btn) {
        try {
            const url = 'https://students.netoservices.ru/nestjs-backend/poll'
            const answer = btn.textContent.trim()
            const answerIndex  = btn.dataset.id

            document.querySelectorAll('.poll__answer').forEach(el => el.classList.remove('poll__answer-active'))
            btn.classList.add('poll__answer-active')

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                body: `vote=${currentPollId}&answer=${answerIndex}`
            })

            if (!response.ok) throw new Error(response.status)

            const result = await response.json()
            console.log('Результат голосования:', result)

            let votesCounter = result.stat.reduce((acc, cur) => acc + cur.votes, 0)

            // result.stat.forEach(el => parseInt(votesCounter += el.votes))

            const poll = `
                <div class="response">
                    <div class="response__answers">
                        ${result.stat.map(item => `
                            <span class="response__answer">${item.answer}: ${item.votes} - ${parseFloat(item.votes / votesCounter * 100).toFixed(2)}%</span>
                        `).join('')}
                        <div class="total">Всего голосов: ${votesCounter}</div>
                    </div>                
                </div>
            `

            document.querySelector('.card').insertAdjacentHTML('beforeend', poll)


        } catch (e) {
            console.log(e)
        }



    }

    loadData(url)




})