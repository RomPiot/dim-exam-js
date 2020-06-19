const jsonData = "../data/share-of-individuals-using-the-internet.json";
var json;

var app = new Vue({
  el: "#app",
  data: {
    datas: [],
  },
  methods: {
    key: function (item) {
      return item.country + "-" + item.year;
    },
    roundFloat(float) {
      val = parseFloat(float);
      return val.toFixed(1);
    },
  },
  computed: {
    highestYear() {
      if (this.datas.length == 0) return;
      return this.datas.reduce((a, b) =>
        Number(a.year) > Number(b.year) ? a.year : b.year
      );
    },
    // TODO : lowestYear
      lowestYear() {
      if (this.datas.length == 0) return;
      return this.datas.reduce((a, b) => {
        if (a && b) {
          Number(a.year) > Number(b.year) ? a.year : b.year;
        }
      });
    },
    uniqueCountry() {
      return this.datas.reduce((seed, current) => {
        return Object.assign(seed, {
          [current.country]: current,
        });
      }, {});
    },
  },
  mounted: function () {
    axios.get(jsonData).then(function (response) {
      app.datas = response.data;
    });
  },
});
