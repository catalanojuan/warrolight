const _ = require("lodash");
const createMultiProgram = require("../base-programs/MultiPrograms");
const animateParamProgram = require("../base-programs/AnimatePrograms");
const programsByShape = require("../base-programs/ProgramsByShape");
const Mix = require("./mix");
const baseTime = 1 * 1000;

function getFilePresets(presetFileName, duration  = 30, programName, shape = 'all') {
    const presetsByProgram = require(`../../../setups/program-presets/${presetFileName}`);
    const presets = [];
    const ProgramClass = require(`./${programName}.js`);

    _.each(presetsByProgram[programName], (config, name) => {
        if(name !== 'DebugShapeParticle') {
            presets.push({
                duration: duration * baseTime,
                program: programsByShape({[shape]: [ProgramClass, config]}, name)
            });
            console.log(`Loaded preset ${programName.green} ${name.yellow} from ${presetFileName}`)
        }
    })
    return presets;
}

const schedule = [
    ...getFilePresets('default.json', 60, 'mix'),
];

// las formas que se pueden usar están definidas en Transformation

module.exports = createMultiProgram(schedule, true);
