const color1 = "#253F6D";
const color2 = "#F8A24F";
const color3 = "#F59293";
const color4 = '#00B0B8';
const colors = [color1, color2, color3, color4]

export const particlesConfig = {
  "detectRetina": true,
  "fpsLimit": 90,
  "interactivity": {
    "detectsOn": "window",
    "events": {
      "onClick": {
        "enable": true,
        "mode": "push"
      },
      "onHover": {
        "enable": true,
        "mode": "grab",
        "parallax": {
          "enable": true,
          "force": 50,
          "smooth": 10
        }
      },
    },
    "modes": {
      "grab": {
        "distance": 350,
        "links": {
          "opacity": 1
        }
      },
      "push": {
        "default": true,
        "quantity": 2
      },
    }
  },
  "particles": {
    "color": {
      "value": colors,
    },
    "move": {
      "enable": true,
      "random": true,
    },
    "number": {
      "limit": {
        "mode": "delete",
        "value": 100
      },
      "value": 100
    },
    "opacity": {
      "value": {
        "min": 0.3,
        "max": 0.5
      },
    },
    "reduceDuplicates": true,
    "shape": {
      "type": "circle"
    },
    "size": {
      "value": {
        "min": 5,
        "max": 10
      },
    },
    "links": {
      "enable": true,
      "color": {
        "value": color4,
      },
    },
  },
  "pauseOnBlur": true,
  "pauseOnOutsideViewport": true,
  "zLayers": 10,
}
