const app = Vue.createApp({});
app.use(VueSSE, {
  format: 'json',
  polyfill: true,
  url: Config.sseUrl,
  withCredentials: false
});
let sseClient;
