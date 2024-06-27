document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('button.delete');
    const updateButtons = document.querySelectorAll('button.update');

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            if (confirm(`确定要删除ID为${id}的记录吗？`)) {
                const form = document.createElement('form');
                form.method = 'post';
                form.action = `/delete_student/${id}`;
                document.body.appendChild(form);
                form.submit();
            }
        });
    });

    updateButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const name = prompt('请输入新的姓名:');
            const courseid = prompt('请输入新的选课情况:');
            const signin = prompt('请输入新的签到情况:');
            if (name && courseid && signin) {
                const form = document.createElement('form');
                form.method = 'post';
                form.action = `/update_student/${id}`;
                form.innerHTML = `
                    <input type="hidden" name="name" value="${name}">
                    <input type="hidden" name="courseid" value="${courseid}">
                    <input type="hidden" name="signin" value="${signin}">
                `;
                document.body.appendChild(form);
                form.submit();
            }
        });
    });
});