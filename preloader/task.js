document.addEventListener("DOMContentLoaded", function(e) {
    const url = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses'

    function saveToCache(data) {
        if (data && data.length) {
            localStorage.setItem('items', JSON.stringify(data))
        }
    }

    function loadFromCache(data) {
        if (data && data.length) {
            const cached = localStorage.getItem('items')
            if (!cached) return null
        }
    }

    async function loadData(url) {
        const items = document.querySelector('#items')
        const loader = document.querySelector('.loader')

        try {
            const response = await fetch(url)
            const data = await response.json()

            if (!response.ok) {
                throw new Error(response.status)
            }
            if (!loader || !items) {
                console.error('Не найдены необходимые элементы DOM')
                return
            }
            if (!data.response || !data.response.Valute) {
                throw new Error('Некорректная структура данных')
            }

            items.innerHTML = ''

            const coursesHTML = Object.values(data.response.Valute).map(val => `
                    <div class="item">
                        <div class="item__code">
                            ${val.CharCode} - ${val.Name}
                        </div>
                        <div class="item__value">
                            ${val.Value}
                        </div>
                        <div class="item__currency">
                            руб.
                        </div>
                    </div>
                `).join('')

                items.innerHTML = coursesHTML
                // items.insertAdjacentHTML('beforeend', coursesHTML)


            loader.classList.remove('loader_active')

        } catch (e) {
            console.error('Ошибка загрузки:', e)
            loader.classList.remove('loader_active')

            items.innerHTML = '<div class="error">Ошибка загрузки данных</div>'
        }
    }

    loadData(url)

})