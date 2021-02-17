class UserController {

  constructor(formId, tableId) {
    this.formEl = document.getElementById(formId); // form id
    this.tableEl = document.getElementById(tableId); // who will add new line

    this.onSubmit();
  }

  onSubmit() {

    this.formEl.addEventListener('submit', (event) => {
      
      event.preventDefault();

      let values = this.getValues();

      this.getPhoto().then(
        (content)=>{
          values.photo = content;
          this.addLine(values);
        },
        (event)=>{
          console.error(event)
        }
      );

    });
  };

  getPhoto() {

    return new Promise((resolve, reject)=>{

      let fileReader = new FileReader();
    
      //search in the elements which is photo
      let elements = [...this.formEl.elements].filter(item => {
        if (item.name === 'photo') {
          return item;
        }
      });

      let file = elements[0].files[0];

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (event) => {
        reject(event);
      }

      fileReader.readAsDataURL(file);


      });

  };

  getValues() {

    let user = {};

    [...this.formEl.elements].forEach(function(field, index) {
      if(field.name == "gender" ) {
    
        if(field.checked) {
          //JSON get field.names = values
          user[field.name] = field.value;
        }
    
      } else {
        user[field.name] = field.value;
      }
    });
  
    return new User(
      user.name,
      user.gender,
      user.birth,
      user.country,
      user.email,
      user.password,
      user.photo,
      user.admin
    );

  };

  addLine(dataUser) { 

    this.tableEl.innerHTML = `
      <tr>
      <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
      <td>${dataUser.name}</td>
      <td>${dataUser.email}</td>
      <td>${dataUser.admin}</td>
      <td>${dataUser.birth}</td>
      <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
      </td>
    </tr>
    `;
  
  };

}