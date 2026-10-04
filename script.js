/* =========================================
   FAITHPOSTER AI
   VERSION 1
========================================= */


/* =========================================
   GET HTML ELEMENTS
========================================= */

const canvas =
    document.getElementById("posterCanvas");

const ctx =
    canvas.getContext("2d");


const churchName =
    document.getElementById("churchName");

const eventTitle =
    document.getElementById("eventTitle");

const eventDate =
    document.getElementById("eventDate");

const verse =
    document.getElementById("verse");

const theme =
    document.getElementById("theme");

const posterSize =
    document.getElementById("posterSize");

const logoInput =
    document.getElementById("logo");

const locationsContainer =
    document.getElementById("locations");


let logoImage = null;


/* =========================================
   GET LOCATIONS
========================================= */

function getLocations() {

    const locationRows =
        document.querySelectorAll(".location");

    const locations = [];

    locationRows.forEach(row => {

        const place =
            row.querySelector(".place").value;

        const start =
            row.querySelector(".start").value;

        const end =
            row.querySelector(".end").value;


        if (place.trim() !== "") {

            locations.push({

                place: place,

                start: start,

                end: end

            });

        }

    });


    return locations;
}


/* =========================================
   ADD LOCATION
========================================= */

document
    .getElementById("addLocation")
    .addEventListener(
        "click",
        function () {

            const location =
                document.createElement("div");

            location.className =
                "location";


            location.innerHTML = `

                <label>
                    Place

                    <input
                        class="place"
                        placeholder="Village / Church">
                </label>

                <label>
                    Start

                    <input
                        class="start"
                        placeholder="08:00 AM">
                </label>

                <label>
                    End

                    <input
                        class="end"
                        placeholder="10:00 AM">
                </label>

                <button
                    class="remove-button">

                    ✕

                </button>
            `;


            locationsContainer
                .appendChild(location);


            addLocationEvents(location);


            drawPoster();

        }
    );


/* =========================================
   LOCATION EVENTS
========================================= */

function addLocationEvents(location) {

    const inputs =
        location.querySelectorAll("input");


    inputs.forEach(input => {

        input.addEventListener(
            "input",
            drawPoster
        );

    });


    const removeButton =
        location.querySelector(
            ".remove-button"
        );


    removeButton.addEventListener(
        "click",
        function () {

            location.remove();

            drawPoster();

        }
    );

}


/* =========================================
   INITIAL LOCATION EVENTS
========================================= */

document
    .querySelectorAll(".location")
    .forEach(addLocationEvents);


/* =========================================
   INPUT EVENTS
========================================= */

churchName.addEventListener(
    "input",
    drawPoster
);


eventTitle.addEventListener(
    "input",
    drawPoster
);


eventDate.addEventListener(
    "input",
    drawPoster
);


verse.addEventListener(
    "input",
    drawPoster
);


theme.addEventListener(
    "change",
    drawPoster
);


posterSize.addEventListener(
    "change",
    drawPoster
);


/* =========================================
   LOGO UPLOAD
========================================= */

logoInput.addEventListener(
    "change",
    function (event) {

        const file =
            event.target.files[0];


        if (!file) {

            logoImage = null;

            drawPoster();

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function (e) {

                logoImage =
                    new Image();


                logoImage.onload =
                    function () {

                        drawPoster();

                    };


                logoImage.src =
                    e.target.result;

            };


        reader.readAsDataURL(file);

    }
);


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(dateString) {

    if (!dateString) {

        return "";

    }


    const date =
        new Date(
            dateString + "T00:00:00"
        );


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const year =
        date.getFullYear();


    return `${day}/${month}/${year}`;

}


/* =========================================
   ROUND RECTANGLE
========================================= */

function roundedRectangle(
    x,
    y,
    width,
    height,
    radius,
    fillColor,
    strokeColor = null
) {

    ctx.beginPath();

    ctx.roundRect(
        x,
        y,
        width,
        height,
        radius
    );


    ctx.fillStyle =
        fillColor;

    ctx.fill();


    if (strokeColor) {

        ctx.strokeStyle =
            strokeColor;

        ctx.lineWidth = 3;

        ctx.stroke();

    }

}


/* =========================================
   CENTER TEXT
========================================= */

function centerText(
    text,
    x,
    y,
    size,
    color,
    weight = "700"
) {

    ctx.font =
        `${weight} ${size}px "Noto Sans Telugu", "Nirmala UI", Arial, sans-serif`;

    ctx.fillStyle =
        color;

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";


    ctx.fillText(
        text,
        x,
        y
    );

}


/* =========================================
   TEXT FITTING
========================================= */

function fitText(
    text,
    maxWidth,
    startingSize
) {

    let size =
        startingSize;


    while (size > 18) {

        ctx.font =
            `800 ${size}px "Noto Sans Telugu", "Nirmala UI", Arial, sans-serif`;


        if (
            ctx.measureText(text).width
            <= maxWidth
        ) {

            return size;

        }


        size -= 2;

    }


    return size;

}


/* =========================================
   WRAP TEXT
========================================= */

function wrapText(
    text,
    maxWidth,
    fontSize
) {

    ctx.font =
        `600 ${fontSize}px "Noto Sans Telugu", "Nirmala UI", Arial, sans-serif`;


    const words =
        text.split(" ");


    const lines = [];

    let currentLine = "";


    words.forEach(word => {

        const testLine =
            currentLine
                ? currentLine + " " + word
                : word;


        const width =
            ctx.measureText(
                testLine
            ).width;


        if (width > maxWidth) {

            lines.push(
                currentLine
            );

            currentLine =
                word;

        } else {

            currentLine =
                testLine;

        }

    });


    if (currentLine) {

        lines.push(
            currentLine
        );

    }


    return lines.slice(0, 3);

}


/* =========================================
   BACKGROUND
========================================= */

function drawBackground() {

    const W =
        canvas.width;

    const H =
        canvas.height;


    let gradient;


    if (theme.value === "prayer") {

        gradient =
            ctx.createLinearGradient(
                0,
                0,
                W,
                H
            );


        gradient.addColorStop(
            0,
            "#243b65"
        );


        gradient.addColorStop(
            1,
            "#b7d7e8"
        );

    }


    else if (theme.value === "youth") {

        gradient =
            ctx.createLinearGradient(
                0,
                0,
                W,
                H
            );


        gradient.addColorStop(
            0,
            "#38145e"
        );


        gradient.addColorStop(
            1,
            "#e579aa"
        );

    }


    else if (theme.value === "christmas") {

        gradient =
            ctx.createLinearGradient(
                0,
                0,
                W,
                H
            );


        gradient.addColorStop(
            0,
            "#15533a"
        );


        gradient.addColorStop(
            1,
            "#d4b15c"
        );

    }


    else if (theme.value === "easter") {

        gradient =
            ctx.createLinearGradient(
                0,
                0,
                W,
                H
            );


        gradient.addColorStop(
            0,
            "#4c3d76"
        );


        gradient.addColorStop(
            1,
            "#e8c8ef"
        );

    }


    else if (theme.value === "dark") {

        gradient =
            ctx.createLinearGradient(
                0,
                0,
                W,
                H
            );


        gradient.addColorStop(
            0,
            "#101827"
        );


        gradient.addColorStop(
            1,
            "#34445a"
        );

    }


    else {

        /* SUNRISE */

        gradient =
            ctx.createLinearGradient(
                0,
                0,
                0,
                H
            );


        gradient.addColorStop(
            0,
            "#15427a"
        );


        gradient.addColorStop(
            0.45,
            "#e6b856"
        );


        gradient.addColorStop(
            1,
            "#fff4d5"
        );

    }


    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        W,
        H
    );


    /* SUN */

    const sun =
        ctx.createRadialGradient(
            W * .75,
            H * .18,
            10,
            W * .75,
            H * .18,
            230
        );


    sun.addColorStop(
        0,
        "rgba(255,255,220,.9)"
    );


    sun.addColorStop(
        1,
        "rgba(255,255,220,0)"
    );


    ctx.fillStyle =
        sun;


    ctx.fillRect(
        0,
        0,
        W,
        H
    );

}


/* =========================================
   DRAW CROSS
========================================= */

function drawCross() {

    const W =
        canvas.width;

    const H =
        canvas.height;


    const x =
        W / 2;


    const y =
        170;


    ctx.strokeStyle =
        "#ffffff";

    ctx.lineWidth =
        18;

    ctx.lineCap =
        "square";


    ctx.beginPath();


    ctx.moveTo(
        x,
        y - 70
    );


    ctx.lineTo(
        x,
        y + 70
    );


    ctx.moveTo(
        x - 50,
        y - 15
    );


    ctx.lineTo(
        x + 50,
        y - 15
    );


    ctx.stroke();

}


/* =========================================
   DRAW LOGO
========================================= */

function drawLogo() {

    if (!logoImage) {

        return;

    }


    const W =
        canvas.width;


    const maxSize =
        120;


    const ratio =
        Math.min(
            maxSize / logoImage.width,
            maxSize / logoImage.height
        );


    const width =
        logoImage.width * ratio;


    const height =
        logoImage.height * ratio;


    ctx.drawImage(

        logoImage,

        W / 2 - width / 2,

        70,

        width,

        height

    );

}


/* =========================================
   DRAW LOCATION CARD
========================================= */

function drawLocationCard(
    location,
    x,
    y,
    width,
    height,
    color
) {

    roundedRectangle(

        x,
        y,

        width,
        height,

        22,

        "#ffffff",

        color

    );


    /* PIN */

    ctx.fillStyle =
        color;


    ctx.beginPath();


    ctx.arc(
        x + width / 2,
        y + 45,
        28,
        0,
        Math.PI * 2
    );


    ctx.fill();


    centerText(

        "✝",

        x + width / 2,

        y + 45,

        25,

        "#ffffff"

    );


    /* PLACE */

    const placeSize =
        fitText(
            location.place,
            width - 30,
            30
        );


    centerText(

        location.place,

        x + width / 2,

        y + 100,

        placeSize,

        "#153d70",

        "800"

    );


    /* TIME */

    centerText(

        `${location.start} - ${location.end}`,

        x + width / 2,

        y + 150,

        22,

        color,

        "700"

    );


    centerText(

        "సంఘ ఆరాధన",

        x + width / 2,

        y + 195,

        17,

        "#153d70",

        "600"

    );

}


/* =========================================
   DRAW POSTER
========================================= */

function drawPoster() {

    /* SIZE */

    if (posterSize.value === "story") {

        canvas.width =
            1080;

        canvas.height =
            1920;

    }

    else {

        canvas.width =
            1080;

        canvas.height =
            1350;

    }


    const W =
        canvas.width;

    const H =
        canvas.height;


    /* BACKGROUND */

    drawBackground();


    /* WHITE CARD */

    roundedRectangle(

        50,
        50,

        W - 100,
        H - 100,

        35,

        "rgba(255,255,255,.91)"

    );


    /* CROSS */

    drawCross();


    /* LOGO */

    drawLogo();


    /* CHURCH NAME */

    const titleStart =
        logoImage
            ? 245
            : 225;


    centerText(

        churchName.value ||
        "మన సంఘం",

        W / 2,

        titleStart,

        34,

        "#153d70",

        "700"

    );


    /* EVENT TITLE */

    const eventSize =
        fitText(

            eventTitle.value,

            W - 160,

            62

        );


    centerText(

        eventTitle.value ||
        "ఆదివారం సంఘ ఆరాధన",

        W / 2,

        titleStart + 75,

        eventSize,

        "#a7192e",

        "800"

    );


    /* DATE */

    roundedRectangle(

        260,

        titleStart + 120,

        560,
        72,

        36,

        "#153d70"

    );


    centerText(

        formatDate(
            eventDate.value
        ),

        W / 2,

        titleStart + 156,

        32,

        "#ffffff",

        "800"

    );


    /* VERSE */

    const verseY =
        titleStart + 260;


    const verseLines =
        wrapText(

            verse.value ||
            "రండి... కలిసి ఆరాధిద్దాం...",

            W - 220,

            27

        );


    verseLines.forEach(
        (line, index) => {

            centerText(

                line,

                W / 2,

                verseY +
                index * 40,

                27,

                "#153d70",

                "600"

            );

        }
    );


    /* LOCATIONS */

    const locations =
        getLocations();


    const startY =
        verseY +
        verseLines.length * 40 +
        65;


    const gap =
        18;


    const cardWidth =
        (
            W -
            150 -
            gap * 2
        ) / 3;


    const cardHeight =
        230;


    const colors = [

        "#1769aa",

        "#18864b",

        "#b31859"

    ];


    locations
        .slice(0, 3)
        .forEach(
            (location, index) => {

                const x =
                    75 +
                    index *
                    (
                        cardWidth +
                        gap
                    );


                drawLocationCard(

                    location,

                    x,

                    startY,

                    cardWidth,

                    cardHeight,

                    colors[index]

                );

            }
        );


    /* MORE LOCATIONS */

    if (locations.length > 3) {

        centerText(

            `+ ${locations.length - 3} more locations`,

            W / 2,

            startY +
            cardHeight +
            35,

            20,

            "#153d70",

            "700"

        );

    }


    /* BOTTOM LINE */

    const bottomY =
        H - 120;


    ctx.strokeStyle =
        "#d3a638";

    ctx.lineWidth =
        3;


    ctx.beginPath();


    ctx.moveTo(
        150,
        bottomY - 30
    );


    ctx.lineTo(
        W - 150,
        bottomY - 30
    );


    ctx.stroke();


    /* FINAL MESSAGE */

    centerText(

        "రండి... కలిసి ఆరాధిద్దాం...",

        W / 2,

        bottomY + 5,

        28,

        "#a7192e",

        "800"

    );


    centerText(

        "దేవుని కృప మీతో ఉండును",

        W / 2,

        bottomY + 48,

        20,

        "#153d70",

        "600"

    );

}


/* =========================================
   DOWNLOAD POSTER
========================================= */

document
    .getElementById("downloadButton")
    .addEventListener(
        "click",
        function () {

            canvas.toBlob(
                function (blob) {

                    if (!blob) {

                        alert(
                            "Poster could not be created."
                        );

                        return;

                    }


                    const url =
                        URL.createObjectURL(
                            blob
                        );


                    const link =
                        document.createElement(
                            "a"
                        );


                    link.href =
                        url;


                    link.download =
                        "faithposter.png";


                    link.click();


                    URL.revokeObjectURL(
                        url
                    );

                },

                "image/png"

            );

        }
    );


/* =========================================
   RESET
========================================= */

document
    .getElementById("resetButton")
    .addEventListener(
        "click",
        function () {

            churchName.value =
                "మన సంఘం";


            eventTitle.value =
                "ఆదివారం సంఘ ఆరాధన";


            eventDate.value =
                "2026-10-04";


            verse.value =
                "యెహోవాను సంతోషముతో సేవించుడి; ఆనందగానముతో ఆయన సన్నిధికి రండి.";


            theme.value =
                "sunrise";


            posterSize.value =
                "portrait";


            logoInput.value =
                "";


            logoImage =
                null;


            drawPoster();

        }
    );


/* =========================================
   START APPLICATION
========================================= */

drawPoster();