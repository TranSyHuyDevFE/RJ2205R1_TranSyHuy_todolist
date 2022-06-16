function getQuery(id) {
  return document.querySelector(id);
}

var toShow = getQuery("#listTodo");

const addTodoAxios = async () => {
  try {
    return await axios.get(`https://jsonplaceholder.typicode.com/todos`);
  } catch (error) {
    console.log(error);
  }
};

function buildTodo() {
  const promise = addTodoAxios();
  promise.then((response) => {
    const responseList = response.data;
    responseList.forEach((item, index) => {
      let checked = "";
      if (item.completed) {
        checked = "checked";
      }
      let listItem = document.createElement("li");
      listItem.innerHTML += `
      <div class="d-flex align-items-center context">
      <input class="form-check-input me-2 " type="checkbox" value="" aria-label="..." ${checked} />
     ${index + 1}.  ${item.title}
      <button type="button" class="btn btn-danger" onclick="deleteTodo()">
            -
          </button>
     </div>
          `;
      toShow.appendChild(listItem);
    });
  });
}
buildTodo();
function Addtodo() {
  var inputAddtodo = getQuery("#input-add").value;
  let listItem = document.createElement("li");
  listItem.innerHTML = `
  <div class="d-flex align-items-center context">
    <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
    ${inputAddtodo} 
    <button type="button" onclick="deleteTodo()" class="btn btn-danger">
            -
    </button>
     </div>`;
  toShow.prepend(listItem);
  getQuery("#input-add").value = "";
}
function deleteTodo() {
  var listItem = getQuery("li");

  swal({
    title: "Bạn có muốn xóa không?",
    text: "Nếu xóa bạn sẽ không thu hồi lại được đâu !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      listItem.remove();
      swal("Xóa thành công !", {
        icon: "success",
      });
    } else {
    }
  });
}
