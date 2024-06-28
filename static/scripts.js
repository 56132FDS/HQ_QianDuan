document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('button.delete');
    const updateButtons = document.querySelectorAll('button.update');

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const type = button.closest('table').querySelector('thead th').textContent === '姓名' ? 'student' : 'teacher';
            if (confirm(`确定要删除ID为${id}的记录吗？`)) {
                const form = document.createElement('form');
                form.method = 'post';
                form.action = `/delete_${type}/${id}`;
                document.body.appendChild(form);
                form.submit();
            }
        });
    });

    updateButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const type = button.closest('table').querySelector('thead th').textContent === '姓名' ? 'student' : 'teacher';
            const name = prompt(`请输入新的${type === 'student' ? '学生' : '教师'}姓名:`);
            const courseid = prompt('请输入新的选课情况:');
            const signin = type === 'student' ? prompt('请输入新的签到情况:') : '';
            if (name && courseid && (type === 'teacher' || signin)) {
                const form = document.createElement('form');
                form.method = 'post';
                form.action = `/update_${type}/${id}`;
                form.innerHTML = `
                    <input type="hidden" name="name" value="${name}">
                    <input type="hidden" name="courseid" value="${courseid}">
                    ${type === 'student' ? `<input type="hidden" name="signin" value="${signin}">` : ''}
                `;
                document.body.appendChild(form);
                form.submit();
            }
        });
    });

    document.getElementById('add-student').addEventListener('click', () => {
        const name = prompt('请输入学生姓名:');
        const courseid = prompt('请输入选课情况:');
        const signin = prompt('请输入签到情况:');
        if (name && courseid && signin) {
            const form = document.createElement('form');
            form.method = 'post';
            form.action = '/add_student';
            form.innerHTML = `
                <input type="hidden" name="name" value="${name}">
                <input type="hidden" name="courseid" value="${courseid}">
                <input type="hidden" name="signin" value="${signin}">
            `;
            document.body.appendChild(form);
            form.submit();
        }
    });

    document.getElementById('add-teacher').addEventListener('click', () => {
        const name = prompt('请输入教师姓名:');
        const courseid = prompt('请输入开课ID:');
        if (name && courseid) {
            const form = document.createElement('form');
            form.method = 'post';
            form.action = '/add_teacher';
            form.innerHTML = `
                <input type="hidden" name="name" value="${name}">
                <input type="hidden" name="courseid" value="${courseid}">
            `;
            document.body.appendChild(form);
            form.submit();
        }
    });
});