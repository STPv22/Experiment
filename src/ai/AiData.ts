export var data = [
    {   
        endGoal: [62, 4, 1038],
        outputs: {
            motionYaw: 0,
            motionPitch: 0,
            forward: 0,
            back: 0,
            left: 0,
            right: 0,
            jump: 0,
            sprint: 0,
        },
        posX: 0,
        posY: 0,
        posZ: 0,
        yaw: 0,
        pitch: 0,
        reward: 0,
    }
];

export function updateData(inf) {
    data.push(inf);
    saveAiData();
}


export function saveAiData() {
    localStorage.setItem("aiData", JSON.stringify(data));
    data = JSON.parse(localStorage.getItem("aiData"));
}

export function getAiData() {
    let aiData = localStorage.getItem("aiData");
    if (!aiData || aiData == "[]" || aiData == undefined) {
        aiData = JSON.stringify(data);
        localStorage.setItem("aiData", aiData);
    } else {
        data = JSON.parse(aiData);
    }
    return aiData;
}

export function deleteData() {
    localStorage.removeItem("aiData");
    data = [
        {   
            endGoal: [62, 4, 1038],
            outputs: {
                motionYaw: 0,
                motionPitch: 0,
                forward: 0,
                back: 0,
                left: 0,
                right: 0,
                jump: 0,
                sprint: 0,
            },
            posX: 0,
            posY: 0,
            posZ: 0,
            yaw: 0,
            pitch: 0,
            reward: 0,
        }
    ];
}