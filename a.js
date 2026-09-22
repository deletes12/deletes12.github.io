
const todoItems = document.querySelectorAll('.todo-item');

todoItems.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('done');
  });
});