app.component('message-list', {
  template:
  /*html*/
  `<div class="row" v-for="msg in messages" :key="msg.Id">
    <div class="card" style="width: 36rem; margin-top: 8px;">
      <div class="card-body">
        <div class="text-muted"
          style="float: right; cursor: pointer"
          @click="deleteMessage(msg.id)" >x</div>
        <h5 class="card-title"> {{ msg.name }} </h5>
        <h6 class="card-subtitle mb-2 text-muted"> {{ msg.createdAt }} </h6>
        <p class="card-text"> {{ msg.content }} </p>
      </div>
    </div>
  </div>`,
  data() {
    return {
      messages: []
    }
  },
  methods: {
    greet() {
      console.log('hello');
    },
    deleteMessage(id) {
      console.log(id);
      msgIndex = this.messages.findIndex(m => m.id === id);
      if (msgIndex < 0) { return; }
      return fetch(`${Config.apiUrl}/${id}`, { method: 'DELETE' }).then(response => {
        console.log(response);
      })
    },
    handleCreated(msg) {
      console.log(msg);
      this.messages.unshift({
        id: msg.Id,
        name: msg.Name,
        createdAt: msg.CreatedAt,
        content: msg.Content
      })
    },
    handleDeleted(msg) {
      msgIndex = this.messages.findIndex(m => m.id === msg.Id);
      if (msgIndex < 0) { return; }
      this.messages.splice(msgIndex, 1);
    }
  },
  mounted() {
    fetch(`${Config.apiUrl}/`).then(response => {
      if (!response.ok) { return; }
      return response.json()
    }).then(data => {
      data.reverse();
      this.messages = data;
      console.log(data);
    });
    sseClient = this.$sse.create();
    sseClient.on('created', this.handleCreated);
    sseClient.on('deleted', this.handleDeleted);
    sseClient.connect().then(sse => { console.log("sse connected") });
  },
  beforeUnmount() {
    sseClient.disconnect();
  }
})
