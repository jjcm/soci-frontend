let submit = {
  init() {
  },
  form: null, 
  onActivate() {
    submit.form = document.querySelector('#submit form')

    let title = document.querySelector('#submit input[name="title"]')
    title.focus()

    let submitButton = document.querySelector('#submit button')
    submitButton.addEventListener('click', submit.submit)
  },
  submit(e) {
    if(submit.form.checkValidity()){
      e.preventDefault()
      let data = new FormData(submit.form)

      soci.postData('post/create', {
        title: data.get('title'),
        url: data.get('url'),
        content: data.get('description'),
        type: document.querySelector('#submit soci-tab[active]').getAttribute('name').toLowerCase()
      })
    }
  }
}

soci.registerPage(submit, document.currentScript.closest('soci-route'))