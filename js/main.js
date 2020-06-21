const jsonData = "../data/share-of-individuals-using-the-internet.json";
var json;

var app = new Vue({
  el: "#app",
  data: {
    datas: [],
    years: [],
    dataCountry: [],
  },
  methods: {
    activate: function () {},
    key: function (item) {
      return item.country + "-" + item.year;
    },
    roundFloat(float) {
      val = parseFloat(float);
      return val.toFixed(1);
    },
    filterCountry: function () {
      $(".filter-country").on("keyup", function () {
        var value = $(this).val().toLowerCase();

        $("a.country").filter(function () {
          var countryName = $(this).text().toLowerCase().trim();
          $(this)
            .parent()
            .toggle(countryName.indexOf(value) > -1);
        });
      });
    },
    myChart: function () {
      var ctx = document.getElementById("myChart").getContext("2d");
      var allYears = this.years;

      var fullCountries = [];
      var newCountry;
      var lastCountry = "";
      var n = 0;

      
      function random_rgba() {
          var o = Math.round, r = Math.random, s = 255;
          return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ', 0.2)';
      }

      setTimeout(() => {
        this.datas.forEach((element) => {
          if (n < 5) {
            if (element.country != lastCountry) {
              n++;

              if (typeof newCountry != "undefined") {
                fullCountries.push(newCountry);
              }

              newCountry = {
                label: element.country,
                data: [element.percent],
                backgroundColor: [
                  random_rgba()
                ],
                borderColor: [
                  random_rgba()
                ],
                borderWidth: 1,
              };
            } else {
              newCountry.data.push(element.percent);
            }
          }

          lastCountry = element.country;
        });

        fullCountries.push(newCountry);
      }, 2000);

      setTimeout(() => {
        console.log(fullCountries);

        var myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: allYears,
            datasets: fullCountries,
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });
      }, 2000);
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
    uniqueYear() {
      return this.datas.reduce((seed, current) => {
        return Object.assign(seed, {
          [current.year]: current.year,
        });
      }, {});
    },
  },
  mounted: function () {
    axios.get(jsonData).then(function (response) {
      app.datas = response.data;
    });

    setTimeout(() => {
      this.datas.forEach((element) => {
        // console.log(element);
      });
    }, 500);

    setTimeout(() => {
      this.datas.reduce((seed, current) => {
        if (this.years.indexOf(current.year) == -1) {
          app.years.push(current.year);
        }
      }, {});

      setTimeout(() => {
        this.years.sort();
      }, 1000);
    }, 1000);
  },
});
