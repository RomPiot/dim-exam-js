const jsonData = "../data/share-of-individuals-using-the-internet.json";

var app = new Vue({
  el: "#app",
  data: {
    datas: [],
    years: [],
    dataCountries: [],
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
    myChart: function (country) {
      var canvas = document.getElementById("myChart");

      canvas.remove();
      $(".chart-container").append(
        '<canvas id="myChart" width="400" height="200"></canvas>'
      );

      var canvas = document.getElementById("myChart");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      app.dataCountries.forEach((element) => {
        if (element.name === country) {
          Chart.defaults.global.defaultFontColor = "#cfcfcf";

          var myChart = new Chart(ctx, {
            type: "line",
            data: {
              labels: element.years,
              datasets: [
                {
                  label: element.name,
                  data: element.percents,
                  backgroundColor: element.backgroundColor,
                  borderColor: element.borderColor,
                  borderWidth: 1,
                },
              ],
            },
            options: {
              legend: {
                labels: {
                  fontColor: "white",
                },
              },
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
        }
      });
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
      this.datas.reduce((seed, current) => {
        if (this.years.indexOf(current.year) == -1) {
          app.years.push(current.year);
        }
      }, {});

      setTimeout(() => {
        this.years.sort();
      }, 1000);
    }, 1000);

    var newCountry;
    var lastCountry = "";

    function random_rgba() {
      var o = Math.round,
        r = Math.random,
        s = 255;
      return (
        "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ", 0.4)"
      );
    }

    setTimeout(() => {
      this.datas.forEach((element) => {
        if (element.country != lastCountry) {
          if (typeof newCountry != "undefined") {
            newCountry.percents.push(100);

            app.dataCountries.push(newCountry);
          }

          newCountry = {
            name: element.country,
            years: [element.year],
            percents: [element.percent],
            backgroundColor: [random_rgba()],
            borderColor: [random_rgba()],
            borderWidth: 1,
          };
        } else {
          newCountry.years.push(element.year);
          newCountry.percents.push(element.percent);
        }

        lastCountry = element.country;
      });

      newCountry.percents.push(100);

      app.dataCountries.push(newCountry);

      $(".loader").remove();
      Chart.defaults.global.defaultFontColor = "#cfcfcf";

      var ctx = document.getElementById("myChart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [1990, 2017],
          datasets: [
            {
              label: "Selectionnez un pays",
              data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
              backgroundColor: [],
              borderColor: [],
              borderWidth: 1,
            },
          ],
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
});
