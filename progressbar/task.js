document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('form').addEventListener('submit', function(e) {
        e.preventDefault();

        const progress = document.getElementById('progress');
        const formData = new FormData(this);
        const fileInput = this.querySelector('input[type="file"]');

        if (!fileInput.files.length) {
            alert('Выберите файл для загрузки');
            return;
        }

        const file = fileInput.files[0];
        console.log(`Загружаем файл: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);

        progress.value = 0;

        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', function(e) {
            console.log(e)
            if (e.lengthComputable) {
                const percentComplete = e.loaded / e.total;
                progress.value = percentComplete;

                console.log(`Отправлено: ${(e.loaded / 1024 / 1024).toFixed(2)} MB / ${(e.total / 1024 / 1024).toFixed(2)} MB (${(percentComplete * 100).toFixed(1)}%)`);
            }
        });

        xhr.addEventListener('load', function() {
            if (xhr.status === 201) {
                console.log('✅ Файл успешно загружен!');
                progress.value = 1.0;

                setTimeout(() => {
                    progress.value = 0;
                    form.reset();
                }, 2000);
            } else {
                console.error('❌ Ошибка сервера:', xhr.status);
                alert('Ошибка загрузки файла');
            }
        });

        xhr.addEventListener('error', function() {
            console.error('❌ Ошибка сети');
            alert('Ошибка сети при загрузке файла');
        });

        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
        xhr.send(formData);
    });
})