const config = {
    canvas: {
        width: 720,
        height: 480
    },
    world: [64, 64],
    unit: 16
}

config.camera = [config.canvas.width / config.unit, config.canvas.height / config.unit];

export default config;