app.component('message-form', {
  template:
  /*html*/
  `<div class="row">
    <div class="card" style="width: 36rem; margin-top: 8px;">
      <form @submit.prevent="createMessage">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" v-model="name">
        </div>
        <div class="mb-3">
          <label for="content" class="form-label">Name</label>
          <textarea name="content" rows="3"
            class="form-control" v-model="content">
          </textarea>
        </div>
        <div class="mb-3">
          <input type="submit" value="Send" class="btn btn-primary">
        </div>
      </form>
    </div>
  </div>`,
  data() {
    return {
      name: "",
      content: ""
    }
  },
  methods: {
    createMessage() {
      console.log(`name: ${this.name}, content: ${this.content}`);
      fetch(`${Config.apiUrl}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.name, content: this.content })
      }).then(response => {
        console.log(response);
        this.content = ""
      })
    }
  }
})
