let submit = {
  dom: document.currentScript.closest('soci-route'),
  init() {
    soci.registerPage(submit)
  },
  form: null, 
  onActivate() {
    submit.form = document.querySelector('#submit form')

    document.title = 'Submit post to Nonio'
    let title = submit.dom.querySelector('input[name="title"]')
    title.setCustomValidity("A title is required.")
    title.addEventListener('input', submit.checkTitleValidity)
    title.focus()

    submit.submitButton = submit.dom.querySelector('soci-button')
    submit.submitButton.addEventListener('click', submit.submit)
  },
  checkTitleValidity(e) {
    e.target.setCustomValidity(e.target.value.length ? '' : "A title is required.")
  },
  async submit(e) {
    if(submit.form.reportValidity()){
      let data = new FormData(submit.form)
      let type = submit.dom.querySelector('soci-tab[active]').getAttribute('name').toLowerCase()
      let fileUploader = submit.dom.querySelector(`soci-${type}-uploader`)
      if(fileUploader){
        let newPath = await fileUploader.move(data.get('url'))
        if(newPath == null) {
          console.error("Error moving file to its new url")
          return 0
        }
      }
      soci.postData('post/create', {
        title: data.get('title'),
        url: data.get('url'),
        content: data.get('description'),
        type: type,
        width: fileUploader?.width,
        height: fileUploader?.height
      }).then(e=>{
        if(e.url){
          submit.submitButton.success()
          window.history.pushState(null, null, e.url)
          window.dispatchEvent(new HashChangeEvent('hashchange'))
        }
        else {
          submit.submitButton.error()
        }
      })
    }
    else {
      submit.submitButton.error()
    }
  }
}

submit.init()