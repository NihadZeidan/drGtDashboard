const options = {
  chart: {
    id: "radial-bar",
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        showOn: "always",
        value: {
          color: "black",
          fontSize: "1.3em",
          show: true,
          offsetY: -15,
        },
      },
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: [""],
};

export default options;
