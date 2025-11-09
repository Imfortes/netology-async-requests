document.addEventListener("DOMContentLoaded", function(e) {
    const url = 'https://students.netoservices.ru/nestjs-backend/upload'

    async function loadData(url) {
        try {
            const response = await fetch(url, {
                method: 'POST',
            })

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