document.addEventListener("DOMContentLoaded", function(e) {
    const url = 'https://students.netoservices.ru/nestjs-backend/poll'

    async function loadData(url) {
        try {
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(response.status)
            }

            const data = await response.json()
            console.log(data)

        } catch (e) {

        }
    }

    loadData(url)

})