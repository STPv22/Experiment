import { data, getAiData, saveAiData, updateData } from "./AiData";

var shouldStopRunning = false;
export var goal = [62, 4, 1038];
export var start = [62, 4, 1030];
export var loop = true;

var explorationRate = 0.2;
export function setTempature(temp) {
    explorationRate = temp;
}

function determineValue(chance, out) {
    let randomNum = Math.random();
    if (randomNum > chance) {
        var best = 0;
        var bestReward = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].outputs[out] !== undefined && data[i].reward > bestReward) {
                if (data[i].posX == Math.floor(ModAPI.player.posX) && data[i].posY == Math.floor(ModAPI.player.posY) && data[i].posZ == Math.floor(ModAPI.player.posZ)) {
                    best = data[i].outputs[out];
                    bestReward = data[i].reward;
                }
            }
        }
        return best;
    } else {
        var output = Math.random();
        if (output > 0.5) {
            return 1;
        } else {
            return 0;
        }
    }
}

function determineValueMotion(chance, out) {
    let randomNum = Math.random();
    if (randomNum > chance) {
        var best = 0;
        var bestReward = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].outputs[out] !== undefined && data[i].reward > bestReward) {
                if (data[i].posX == Math.floor(ModAPI.player.posX) && data[i].posY == Math.floor(ModAPI.player.posY) && data[i].posZ == Math.floor(ModAPI.player.posZ)) {
                    best = data[i].outputs[out];
                    bestReward = data[i].reward;
                }
            }
        }
        return best;
    } else {
        return Math.random() * (30 + 30) - 30;
    }
}

export function stopProcess() {
    shouldStopRunning = true;
}

export function setGoal(x, y, z) {
    goal = [parseInt(x), parseInt(y), parseInt(z)];
}

export function setStart(x, y, z) {
    start = [parseInt(x), parseInt(y), parseInt(z)];
}

export function setLoop(bool) {
    loop = bool;
}

export function RunAI() {
    shouldStopRunning = false;
    getAiData();

    //alert(Object.keys(ModAPI.player));
    var settings = ModAPI.settings;
    var player = ModAPI.player;

    var interval = setInterval(() => {
        var rewardCalc = 0;

        settings.keyBindForward.pressed = determineValue(explorationRate, 'forward');
        settings.keyBindLeft.pressed = determineValue(explorationRate, 'left');
        settings.keyBindRight.pressed = determineValue(explorationRate, 'right');
        settings.keyBindBack.pressed = determineValue(explorationRate, 'back');
        settings.keyBindJump.pressed = determineValue(explorationRate, 'jump');
        settings.keyBindSprint.pressed = determineValue(explorationRate, 'sprint');
        var mYaw = determineValueMotion(explorationRate, 'motionYaw');
        var mPitch = determineValueMotion(explorationRate, 'motionPitch');
        player.rotationYaw += mYaw;
        //player.rotationPitch += mPitch;

        //check x position
        if (player.posX < goal[0]) {
           if (player.posX > data[data.length - 1].posX) {
               rewardCalc += (Math.abs(player.motionX) / 5) * 100;
           } else if (player.posX < data[data.length - 1].posX) {
               rewardCalc -= Math.abs(player.motionX);
           }
        } else if (player.posX > goal[0]) {
            if (player.posX < data[data.length - 1].posX) {
                rewardCalc += (Math.abs(player.motionX) / 5) * 100;
            } else if (player.posX > data[data.length - 1].posX) {
                rewardCalc -= Math.abs(player.motionX);
            }
        }

        //check y position
        if (player.posY < goal[1]) {
            if (player.posY > data[data.length - 1].posY) {
                rewardCalc += (Math.abs(player.motionY) / 5) * 100;
            } else if (player.posY < data[data.length - 1].posY) {
                rewardCalc -= Math.abs(player.motionY);
            }
         } else if (player.posY > goal[1]) {
             if (player.posY < data[data.length - 1].posY) {
                rewardCalc += (Math.abs(player.motionY) / 5) * 100;
             } else if (player.posY > data[data.length - 1].posY) {
                 rewardCalc -= Math.abs(player.motionY);
             }
         }

         //check z position
         if (player.posZ < goal[2]) {
            if (player.posZ > data[data.length - 1].posZ) {
                rewardCalc += (Math.abs(player.motionZ) / 5) * 100;
            } else if (player.posZ < data[data.length - 1].posZ) {
                rewardCalc -= Math.abs(player.motionZ);
            }
         } else if (player.posZ > goal[2]) {
             if (player.posZ < data[data.length - 1].posZ) {
                rewardCalc += (Math.abs(player.motionZ) / 5) * 100;
             } else if (player.posZ > data[data.length - 1].posZ) {
                 rewardCalc -= Math.abs(player.motionZ);
             }
         }

        if (player.posX == goal[0] && player.posY == goal[1] && player.posZ == goal[2]) {
            rewardCalc += 10;
        }

        var runData = {
            endGoal: goal,
            outputs: {
                motionYaw: mYaw,
                motionPitch: mPitch,
                forward: settings.keyBindForward.pressed,
                left: settings.keyBindLeft.pressed,
                right: settings.keyBindRight.pressed,
                back: settings.keyBindBack.pressed,
                jump: settings.keyBindJump.pressed,
                sprint: settings.keyBindSprint.pressed,
            },
            posX: Math.floor(player.posX),
            posY: Math.floor(player.posY),
            posZ: Math.floor(player.posZ),
            yaw: player.rotationYaw,
            pitch: player.rotationPitch,
            reward: rewardCalc,
        }
        console.log("Reward: " + rewardCalc);

        updateData(runData);

        if (shouldStopRunning == true) {
            saveAiData();
            ModAPI.player.sendChatMessage(ModAPI.util.str(`/tp @a ${start[0]} ${start[1]} ${start[2]}`));
            player.rotationYaw = 0;
            player.rotationPitch = 0;
            clearInterval(interval);
            if (loop == true) {
                RunAI();
            } else {
                clearInterval(interval);
                return;
            }
        }
    }, 1000 / 30);

    setTimeout(() => {
        shouldStopRunning = true;
    }, 5000);
}