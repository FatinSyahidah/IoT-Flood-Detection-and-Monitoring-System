export const GaugeChart = [
    {
        renderTo: 'canvas-id',
        width: 120,
        height: 400,
        units: "°C",
        minValue: 0,
        maxValue: 220,
        majorTicks: [
            "0",
            "20",
            "40",
            "60",
            "80",
            "100",
            "120",
            "140",
            "160",
            "180",
            "200",
            "220"
        ],
        minorTicks: 2,
        strokeTicks: true,
        highlights: [
            {
                "from": 100,
                "to": 220,
                "color": "rgba(200, 50, 50, .75)"
            }
        ],
        colorPlate: "#fff",
        borderShadowWidth: 0,
        borders: false,
        needleType: "arrow",
        needleWidth: 2,
        animationDuration: 1500,
        animationRule: "linear",
        tickSide: "left",
        numberSide: "left",
        needleSide: "left",
        barStrokeWidth: 7,
        barBeginCircle: false,
        value: 75
    }
];